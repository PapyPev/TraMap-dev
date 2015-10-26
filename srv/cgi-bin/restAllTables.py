#!/usr/bin/env python
# -*- coding: utf-8 -*- enable debugging

"""
  restAllTables.py
  This file is a REST service : return all tables name in database
"""

__author__ = "Pev"
__version__ = "1.1"
__email__ = "pev.arfan@gmail.com"
__status__ = "Progress"


# IMPORT
# =============================================================================
import cgitb
import classDatabase


# FUNCTIONS
# =============================================================================

def get_allTables():
    """
        Return all table's names from database
    """

    # Create default database connexion object
    db = classDatabase.Database()

    # Connexion to the database
    db._connect()

    # Prepare the SQL query
    sql = "SELECT table_name " \
        "FROM information_schema.tables " \
        "WHERE table_schema='public'"

    # Execute the query
    rows = db._execute(sql)
    
    for row in rows:
      print(row)

    #print res
    

# MAIN
# =============================================================================

if __name__ == "__main__":
  cgitb.enable()
  #print("Content-Type: application/json")
  print('Content-Type: text/html;charset=utf-8')
  print("") # Space End header
  result = get_allTables()
  print result
