__author__ = 'kolovsky'
from graph_tool.all import *
import settings as s
import numpy as np
import db

class TransModel:
    def __init__(self):

        self.O = None # original
        self.D = None # destination
        self.C = None # cost matrix
        self.T = None # transpotation matrix

    def _model(self, i, j):
        Ti = self.O[i]
        Tj = self.D[j]
        return Ti * Tj * self._f(self.C[i][j])

    def _f(self, c):
        return c**(-2)

    def _for_all_cell_T(self,function):
        Tn = np.ndarray(shape=self.T.shape)
        for i in xrange(0, self.T.shape[0]):
            for j in xrange(0, self.T.shape[1]):
                Tn[i][j] = function(i,j)
        return Tn

    def trip_destination(self):
        self.T = self._for_all_cell_T(self._model)

        nf_row = np.ndarray(shape=(self.T.shape[0]))

        delta = 1
        numiter = 0
        while delta > 0.01:
            i = 0
            for row in self.T:
                nf_row[i] = float(self.O[i]) / sum(row)
                i += 1

            self.T = self._for_all_cell_T(lambda i,j: self.T[i][j] * nf_row[i])

            sum_array = np.ndarray(shape=(self.T.shape[1]))
            for i in xrange(0, self.T.shape[0]):
                for j in xrange(0, self.T.shape[1]):
                    sum_array[j] += self.T[i][j]
            nf_column =  self.D / sum_array

            self.T = self._for_all_cell_T(lambda i, j: self.T[i][j] * nf_column[j])

            delta =  max(abs(nf_column - 1))
            numiter += 1
        print "number of iteration is:", numiter

class MyGraph:
    def __init__(self):
        self.db = db.Database()
        self.g = Graph(directed=True)
        self.edge_property_cost = self.g.new_edge_property("double")
        self.edge_property_id = self.g.new_edge_property("int")
        self.vertex_property_id = self.g.new_vertex_property("int")
        self.min_vertex_id = -1
        self.max_vertex_id = -1
        self.max_count_vertex = 100000000  # max size of graph

    def _create_vertex(self,table,cn):
        self.min_vertex_id = table[0][cn["source"]]
        self.max_vertex_id = table[0][cn["source"]]
        for row in table:
            if self.min_vertex_id > row[cn["source"]]: self.min_vertex_id = row[cn["source"]]
            if self.min_vertex_id > row[cn["target"]]: self.min_vertex_id = row[cn["target"]]
            if self.max_vertex_id < row[cn["source"]]: self.max_vertex_id = row[cn["source"]]
            if self.max_vertex_id < row[cn["target"]]: self.max_vertex_id = row[cn["target"]]
        # check max size of graph
        if self.max_count_vertex < self.max_vertex_id - self.min_vertex_id:
            raise AttributeError("Too large graph")

        self.g.add_vertex(int(self.max_vertex_id - self.min_vertex_id + 1))

    def id_to_index(self, id):
        """
        Transform ID (node) to vertex(type) (return vertex no vertex id)
        @param id: Node ID
        @return: Vertex
        """
        if id > self.max_vertex_id:
            raise IndexError("ID %i no exist, ID must be in interval [%i, %i]" %(id,self.min_vertex_id,
                                                                                 self.max_vertex_id))
        try:
            return self.g.vertex(id - self.min_vertex_id)
        except OverflowError:
            raise IndexError("ID %i no exist, ID must be in interval [%i, %i]" %(id,self.min_vertex_id,
                                                                               self.max_vertex_id))

    def create_graph(self):
        """
        Create graph from list of row (edges). Column are id, cost, source, target. eg. SELECT id, cost, source, target FROM graph; in PLPython
        @param table: Graph data
        """
        table, cn = self.db.getRoads()
        self._create_vertex(table,cn)
        for row in table:
            e = self.g.add_edge(self.id_to_index(row[cn["source"]]), self.id_to_index(row[cn["target"]]))
            self.edge_property_cost[e] = row[cn["cost"]]
            self.edge_property_id[e] = row[cn["id"]]
            e = self.g.add_edge(self.id_to_index(row[cn["target"]]), self.id_to_index(row[cn["source"]]))
            self.edge_property_cost[e] = row[cn["reverse_cost"]]
            self.edge_property_id[e] = row[cn["id"]]

    def dijkstra(self,s):
        """
        Compute dijkstra (one to n (all))
        @param s: ID source node (vertex)
        @param t_list: List of target node
        @return:  List of path (source, target, cost, [path])
        """
        dist_map, pred_map = dijkstra_search(self.g, self.id_to_index(s), self.edge_property_cost)
        return (dist_map, pred_map)

    def one_to_all(self, source):
        pass

    def getC(self, zones):
        zones = self.db.getZonesId()
        np.ndarray(shape=(len(zones),len(zones)))
        for zone_id in zones:
            self.dijkstra(zone_id)

if __name__ == "__main__":
    tm = TransModel()
    tm.O = np.array([15, 15])
    tm.D = np.array([10, 20])
    tm.T = np.ndarray(shape=(2, 2))
    tm.C = np.array([[2, 5],
                     [5, 2]])
    tm.trip_destination()
    print tm.T

    g = MyGraph()
    g.create_graph()
    g.dijkstra(1)