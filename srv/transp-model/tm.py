__author__ = 'kolovsky'
from graph_tool.all import *
import settings as s
import numpy as np
import db
import time
#import pickle

class TransModel:
    def __init__(self):

        self.g = MyGraph()
        self.g.create_graph()
        print "graph has",self.g.g.num_edges(), "edges"
        #a = time.time()
        #shortest_path(self.g.g,self.g.id_to_index(1353691), self.g.id_to_index(424189), self.g.edge_property_cost)
        #print time.time() -a
        #exit()
        self.general_info = self.g.db.general_information(s.area_name)

        self.O = self.g.db.getOD() #origin zones
        self.D = self.g.db.getOD() #destination zones
        self.OD_type = self.g.db.getOD_type() #type for OD zones
        self.C = self.g.get_c(False) # cost matrix
        self.T = np.ndarray(shape=(self.O.size, self.D.size)) # transpotation matrix

        self.prepare_od() #only for testing

        #self.id_map = None
    #olny for test!!
    def prepare_od(self):
        sum_home = 0
        non_home_count = 0
        for i in xrange(0, len(self.O)):
            if self.OD_type[i] == "home":
                sum_home += self.O[i]
            else:
                non_home_count += 1

        for i in xrange(0, len(self.O)):
            if self.OD_type[i] != "home":
                self.O[i] = sum_home/float(non_home_count)
                self.D[i] = sum_home/float(non_home_count)

    def is_enable_comb(self, source_type, target_type):
        if target_type in s.enable_type_comb[source_type]:
            return True

    def _model(self, i, j):
        if self.is_enable_comb(self.OD_type[i],self.OD_type[j]):
            Ti = self.O[i]
            Tj = self.D[j]
            return Ti * Tj * self._f(self.C[i][j])
        return 0

    def _f(self, c):
        if c == 0:
            return 0
        return c**(-2)

    def _for_all_cell_T(self,function):
        Tn = np.ndarray(shape=self.T.shape)
        for i in xrange(0, self.T.shape[0]):
            for j in xrange(0, self.T.shape[1]):
                Tn[i][j] = function(i, j)
        return Tn

    def trip_destination(self):
        self.T = self._for_all_cell_T(self._model)
        #print self.T

        nf_row = np.ndarray(shape=(self.T.shape[0]))

        delta = 100
        delta_mid = 100
        numiter = 0
        while delta_mid > 0.3:
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
            print self.T

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
            print self.T
        print "number of iteration is:", numiter

    def writeT(self,filename):
        np.save(filename, self.T)
        print "Ulozeno do: ", filename

    def count_transport(self, use_cache = False):
        #if use_cache:
        #    f = file("cache/n_to_n_path", "rb")
        #    n_to_n_path = pickle.load(f)
        #else:
        n_to_n_path = []

        zones = self.g.db.getZonesNodeId()
        i = 0
        for node_id in zones:
            #if use_cache:
            #    paths = n_to_n_path[i]
            #else:
            paths = self.g.find_paths(node_id, zones)
            #    n_to_n_path.append(paths)
            for path in paths:
                for edge in path[3]:
                    self.g.edge_property_traffic[edge] += self.T[i][path[4]]
            i += 1
            print i

            #if use_cache == False:
            #    f = file("cache/n_to_n_path","wb")
            #    pickle.dump(n_to_n_path, f, 2)
            #    print "n_to_n_path was added to cache"


    def save_traffic(self):
        ids = map(lambda x: int(x), list(self.g.edge_property_id.get_array()))
        traffic = map(lambda x: float(x), list(self.g.edge_property_traffic.get_array()))
        self.g.db.save_traffic(ids, traffic)

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
        a = time.time()
        dist_map, pred_map = dijkstra_search(self.g, self.id_to_index(s), self.edge_property_cost)
        print time.time() - a

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
            print "make C:", i
            i += 1
            if(i == t):
                break

    def get_c(self, use_temp):
        if use_temp:
            self.C = np.load("C.npy")
            return self.C
        zones = self.db.getZonesNodeId()
        self.C = np.ndarray(shape=(len(zones), len(zones)))
        #interval = int(len(zones) / s.number_threads)
        self._get_row_c(zones, 0, len(zones))
        np.save("C", self.C)
        return self.C

    def find_paths(self,s , t_list):
        a = time.time()
        dist_map, pred_map = self.dijkstra(s)
        print time.time() - a
        all_path = []
        i = 0
        #a = time.time()
        #============rewrite==============
        for t in t_list:
            t_vertex = self.id_to_index(t)

            vl, el = shortest_path(self.g, self.id_to_index(s), t_vertex, pred_map = pred_map)

            all_path.append((s, t, float(dist_map[t_vertex]), el, i))
            i += 1
        #=============rewrite==============
        #np_t_list = np.array(t_list)
        #np_pred_map = np.array(pred_map)
        #np_id_map = np.array(self.vertex_property_id)
        #self.g.edges(5)
        #==================================
        #print time.time() - a
        return all_path


if __name__ == "__main__":
    tm = TransModel()
    tm.trip_destination()
    tm.count_transport()
    tm.save_traffic()
