__author__ = 'kolovsky'
import psycopg2
import settings as s

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(database=s.database, user=s.username, password=s.password,host=s.host)
        self.cur = self.conn.cursor()

    def execute(self, sql, data):
        self.cur.execute(sql, data)
        return self.cur.fetchall()

