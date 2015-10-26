#!/usr/bin/env python
# -*- coding: utf-8 -*- enable debugging

"""
  rest_Interests.py
  This file is a REST service : return interests, filter by table
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

def get_interests(table):
  """
    Return all table's names from database (JSON format).

    :Parameters:
      table
        The table name

    :Example:
    >>> get_interests('osm_amenities')
    {
      "status": "ok",
      "result": [
        ...
      ]
    }
  """

  ### ----- DATABASE

  # Create default database connexion object
  db = classDatabase.Database()
  # Connexion to the database
  db._connect()

  # Prepare the SQL query
  sql = "SELECT DISTINCT type FROM " + table \
    "ORDER BY type ASC"
  # Execute the query
  rows = db._execute(sql)


  ### ----- RESULTS

  # Prepare variables
  interests = []  # List of interests
  data = {}   # Json object to return

  # Test if the list is empty
  if not rows:
    data['status'] = 'nok'
    data['result'] = []

  # If the list is not empty
  else:
    # Set status
    data['status'] = 'ok'

    # Loops results to get interests
    for row in rows:
      if row[0] != 'geography_columns' \
        and row[0] != 'geometry_columns' \
        and row[0] != 'spatial_ref_sys' \
        and row[0] != 'raster_columns' \
        and row[0] != 'raster_overviews':
        interests.append(row[0])

    # Save the result
    data['result'] = interests

  # Prepare the JSON object
  json_data = json.dumps(data)

  # Return the json object
  return json_data
    

# MAIN
# =============================================================================

if __name__ == "__main__":

  # Define as cgi script
  cgitb.enable()

  # Get Parameters from URL
  params = cgi.FieldStorage()

  # Test if "table" is not in the URL
  if "table" not in params:
    print ("Status: 400 Bad Request")
    print ("Content-Type: text/plain")
    print ("")
    print ("Bad request: missing id in query string.")
    sys.exit()

  else:
    print ("Ok")
    #print("Content-Type: application/json")
    print("") # Space End header
    #result = get_interests()
    #print result
