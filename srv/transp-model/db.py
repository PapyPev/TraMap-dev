__author__ = 'kolovsky'
import psycopg2
import numpy as np
import settings as s

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(database=s.database, user=s.username, password=s.password,host=s.host)
        self.cur = self.conn.cursor()
        sql = "SELECT geometry from general_area_information where name = %s"
        self.cur.execute(sql,[s.area_name])
        self.area_geometry = self.cur.fetchall()[0][0]

    def _execute(self, sql, data):
        self.cur.execute(sql, data)
        return self.cur.fetchall()

    def getOD(self):
        sql = "SELECT people from zones where ST_Intersects(geometry,%s) order by id "
        self.cur.execute(sql ,[self.area_geometry])
        out = np.array(self.cur.fetchall())
        return out.reshape((len(out)))

    def getOD_type(self):
        sql = "SELECT type from zones where ST_Intersects(geometry,%s) order by id"
        self.cur.execute(sql, [self.area_geometry])
        out = self.cur.fetchall()
        ret = []
        for i in xrange(0,len(out)):
            ret.append(out[i][0])
        return ret

    def getIdZones(self):
        sql = "SELECT id from zones where ST_Intersects(geometry,%s) order by id"
        self.cur.execute(sql, [self.area_geometry])
        out = np.array(self.cur.fetchall())
        return out.reshape((len(out)))

    def getZonesNodeId(self):
        sql = "SELECT node_id from zones where ST_Intersects(geometry,%s) order by id"
        self.cur.execute(sql, [self.area_geometry])
        out = np.array(self.cur.fetchall(), 'int')
        return out.reshape((len(out))).tolist()

    def getRoads(self):
        sql = "SELECT id, source, target, cost, reverse_cost from roads where ST_Intersects(geometry,%s)"
        self.cur.execute(sql, [self.area_geometry])
        return (self.cur.fetchall(), {"id": 0, "source": 1, "target": 2, "cost":3 ,"reverse_cost": 4})

    def general_information(self,area_name):
        sql = "SELECT * from general_area_information where name = %s"
        self.cur.execute(sql,[area_name])
        return (self.cur.fetchall()[0], {"id": 0, "male": 2, "female": 3, "age1": 4, "age2": 5, "age3": 6, "age4": 7,
                                      "age5": 8, "age6": 9, "walking": 10, "cycling": 11, "driver": 12})

    def save_traffic(self,ids,traffic):
        self.cur.execute("UPDATE roads SET traffic=0 WHERE true")
        self.conn.commit()
        sql = "UPDATE roads SET traffic = traffic + %s WHERE id = %s"
        for i in xrange(0, len(ids)):
            self.cur.execute(sql, [traffic[i], ids[i]])
        self.conn.commit()


