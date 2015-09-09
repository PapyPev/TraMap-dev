__author__ = 'kolovsky'
import graph_tool
import settings as s
import numpy as np

class TransModel:
    def __init__(self):

        #[zonal id][0 - O, 1 - A]
        self.OA_table = None

        self.F = None # travel time factor matrix
        self.K = None # zonal adjustment factors
        self.C = None # cost matrix
        self.T = np.ndarray(shape=(3,3)) # transpotation matrix
        self.superzones = None

    def _model(self,i,j):
        Oi = self.OA_table[i][0]
        Aj = self.OA_table[j][1]
        Fij = self.F[i][j]
        Kij = self.K[i][j]
        sum = 0
        for m in xrange(0,3):
            sum += self.OA_table[m][1] * self.F[i][m] * self.K[i][m]
        return (Oi * Aj * Fij * Kij)/sum

    def gravity(self):
        for i in xrange(0,3):
            for j in xrange(0,3):
                self.T[i][j] = self._model(i,j)

    def create_superzones(self, delta):
        self.superzones = np.ndarray(shape=(1,1))
        for i in xrange(0,self.C.shape[0]):
            for j in xrange(0,self.C.shape[0]):
                self.superzones[int(self.C[i][j] / delta)] += self.C[i][j]



class Graph:
    def __init__(self):
        pass
    def one_to_all(self,source):
        pass
    def all_to_all_store(self):
        pass


if __name__ == "__main__":
    tm = TransModel()
    tm.OA_table = np.array([[10, 20],
                   [27, 16],
                   [43, 8]])
    tm.F = np.array([[1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]])
    tm.K = np.array([[1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]])
    tm.C = np.array([[1, 2, 3],
                     [2, 1, 4],
                     [3, 4, 1]])
    tm.gravity()
    tm.create_superzones(5)
    print tm.superzones