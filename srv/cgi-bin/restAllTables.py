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
import json


# FUNCTIONS
# =============================================================================

def get_allTables():
  """
      Return all table's names from database (JSON format).

      :Example:
      >>> get_allTables()
      {
        "status": "ok",
        "result": [
          "osm_buildings",
          "osm_amenities",
          "osm_transports_points"
        ]
      }
  """

  ### ----- DATABASE

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


  ### ----- RESULTS

  # Prepare variables
  names = []  # List of tables names
  data = {}   # Json object to return

  # Test if the list is empty
  if not rows:
    data['status'] = 'nok'
    data['result'] = []

  # If the list is not empty
  else:
    # Set status
    data['status'] = 'ok'

    # Loops results to get names
    for row in rows:
      if row[0] != 'geography_columns' \
        or row[0] != 'geometry_columns' \
        or row[0] != 'spatial_ref_sys' \
        or row[0] != 'raster_columns' \
        or row[0] != 'raster_overviews':
        names.append(row[0])

    # Save the result
    data['result'] = names

  # Prepare the JSON object
  json_data = json.dumps(data)

  # Return the json object
  return json_data
    

# MAIN
# =============================================================================

if __name__ == "__main__":
  cgitb.enable()
  #print("Content-Type: application/json")
  print('Content-Type: text/html;charset=utf-8')
  print("") # Space End header
  result = get_allTables()
  print result
