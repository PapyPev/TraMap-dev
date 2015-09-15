__author__ = 'kolovsky'
from graph_tool.all import *
import settings as s
import numpy as np
import db
import multiprocessing as mp
import time

class TransModel:
    def __init__(self, c):

        self.g = MyGraph()
        self.g.create_graph()

        self.O = self.g.db.getO()
        self.D = self.g.db.getD()
        self.C = c # cost matrix
        self.T = np.ndarray(shape=(self.O.size, self.D.size)) # transpotation matrix


        self.id_map = None

    def _model(self, i, j):
        Ti = self.O[i]
        Tj = self.D[j]
        return Ti * Tj * self._f(self.C[i][j])

    def _f(self, c):
        if c == 0:
            return 0
        return c**(-2)

    def _for_all_cell_T(self,function):
        Tn = np.ndarray(shape=self.T.shape)
        for i in xrange(0, self.T.shape[0]):
            for j in xrange(0, self.T.shape[1]):
                Tn[i][j] = function(i,j)
        return Tn

    def trip_destination(self):
        self.T = self._for_all_cell_T(self._model)
        print self.T

        nf_row = np.ndarray(shape=(self.T.shape[0]))

        delta = 1
        delta_mid = 1
        numiter = 0
        while delta_mid > 0.01:
            i = 0
            for row in self.T:
                if sum(row) == 0:
                    #print int(self.id_map[i])
                    pass
                try:
                    nf_row[i] = self.O[i] / sum(row)
                except RuntimeWarning:
                    print self.O[i], sum(row)
                i += 1
            #print nf_row

            self.T = self._for_all_cell_T(lambda i,j: self.T[i][j] * nf_row[i])

            sum_array = np.ndarray(shape=(self.T.shape[1]))
            for i in xrange(0, self.T.shape[0]):
                for j in xrange(0, self.T.shape[1]):
                    sum_array[j] += self.T[i][j]
            nf_column =  self.D / sum_array

            self.T = self._for_all_cell_T(lambda i, j: self.T[i][j] * nf_column[j])

            delta =  max(abs(nf_column - 1))
            delta_mid = sum(abs(nf_column - 1)) / len(nf_column)
            numiter += 1
            print "#iteration is %i and delta is %f and delta mid id %f" %(numiter, delta, delta_mid)
            print self.T[10]
        print "number of iteration is:", numiter

    def writeT(self,filename):
        np.save(filename, self.T)
        print "Ulozeno do: ", filename

    def count_transport(self):
        zones = self.g.db.getZonesNodeId()
        i = 0
        for node_id in zones:
            paths = self.g.find_paths(node_id, zones)
            for path in paths:
                for edge in path[3]:
                    self.g.edge_property_traffic[edge] += self.T[i][path[4]]
            i += 1
            print i
    def save_traffic(self,filename):
        np.save(filename+"_id",np.array(list(self.g.edge_property_id.get_array())))
        np.save(filename+"_traffic",np.array(list(self.g.edge_property_id.get_array())))
        print "save is succesful!!"

class MyGraph:
    def __init__(self):
        self.db = db.Database()
        self.g = Graph(directed=True)
        self.edge_property_cost = self.g.new_edge_property("double")
        self.edge_property_id = self.g.new_edge_property("int")
        self.vertex_property_id = self.g.new_vertex_property("int")
        self.edge_property_traffic = self.g.new_edge_property("double")
        self.min_vertex_id = -1
        self.max_vertex_id = -1
        self.max_count_vertex = 100000000  # max size of graph

        self.edge_property_source = self.g.new_edge_property("int")
        self.edge_property_target = self.g.new_edge_property("int")

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

    def _get_row_c(self, zones, f, t):
        #print f, t
        i = f
        for zone_node_id in zones[f:t]:
            dist_map, pred_map = self.dijkstra(zone_node_id)
            j = 0
            for zone_node_id_v in zones:
                self.C[i][j] = dist_map[self.g.vertex(self.id_to_index(zone_node_id_v))]
                j += 1
            print i
            i += 1
            if(i == t):
                break

    def get_c(self):
        zones = self.db.getZonesNodeId()
        self.C = np.ndarray(shape=(len(zones), len(zones)))
        interval = int(len(zones) / s.number_threads)
        self._get_row_c(zones, 0, len(zones))
        np.save("C", self.C)
        return self.C

    def find_paths(self,s , t_list):
        a = time.time()
        dist_map, pred_map = self.dijkstra(s)
        print time.time() - a
        all_path = []
        i = 0
        a = time.time()
        #============rewrite==============
        for t in t_list:
            t_vertex = self.id_to_index(t)

            vl, el = shortest_path(self.g, self.id_to_index(s), t_vertex, pred_map = pred_map)

            all_path.append((s, t, float(dist_map[t_vertex]), el, i))
            i += 1
        #=============rewrite==============
        np_t_list = np.array(t_list)
        np_pred_map = np.array(pred_map)
        np_id_map = np.array(self.vertex_property_id)
        self.g.edges(5)
        #==================================
        print time.time() - a
        return all_path


if __name__ == "__main__":

    tm = TransModel(np.load("C.npy"))
    #tm.id_map = dbb.getIdZones()

    #tm.trip_destination()
    tm.T = np.load("T.npy")
    #print tm.g.edge_property_id.get_array()
    tm.count_transport()
    tm.save_traffic("traf")
