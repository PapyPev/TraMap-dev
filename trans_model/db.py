__author__ = 'kolovsky'
import psycopg2
import numpy as np
import settings as s

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(database=s.database, user=s.username, password=s.password,host=s.host)
        self.cur = self.conn.cursor()

    def _execute(self, sql, data):
        self.cur.execute(sql, data)
        return self.cur.fetchall()

    def getO(self):
        sql = "SELECT people from %s order by id"
        self.cur.execute(sql %(s.zones_table_name))
        out = self.cur.fetchall()
        return np.array(out.reshape((len(out))))

    def getD(self):
        sql = "SELECT people from %s order by id"
        self.cur.execute(sql% (s.zones_table_name))
        out = self.cur.fetchall()
        return np.array(out.reshape((len(out))))

    def getZonesId(self):
        sql = "SELECT id from %s order by id"
        self.cur.execute(sql % (s.zones_table_name))
        out = self.cur.fetchall()
        return np.array(out.reshape((len(out)))).tolist()

    def getRoads(self):
        sql = "SELECT id, source, target, cost, reverse_cost from %s"
        self.cur.execute(sql % (s.roads_table_name))
        return (self.cur.fetchall(), {"id": 0, "source": 1, "target": 2, "cost":3 ,"reverse_cost": 4})

