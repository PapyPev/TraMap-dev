#!/usr/bin/env python
# -*- coding: utf-8 -*- enable debugging

"""
rest.py
This file is a REST deamon for server.
When you want some informations on database, you call this script from URL.

:Example:
On web browser, URL : http://domain:8082/api/hello
"""

__author__ = "Pev"
__version__ = "1.0"
__email__ = "pev.arfan@gmail.com"
__status__ = "Progress"


# IMPORT
# =============================================================================

from flask import Flask
import json
import mimerender
import classDatabase


# INIT
# =============================================================================

# Create instance of mimerender from Flask framework
mimerender = mimerender.FlaskMimeRender()

# Prepare prototype of response
render_xml = lambda message: '<message>%s</message>'%message
render_json = lambda **args: json.dumps(args)
render_html = lambda message: '<html><body>%s</body></html>'%message
render_txt = lambda message: message

# Init the deamon app
app = Flask(__name__)

# Get routing from URL
#@app.route('/')
@app.route('/api/')
@app.route('/api/<service>')
@app.route('/api/<service>/<param>')
@mimerender(
  default = 'html',
  html = render_html,
  xml  = render_xml,
  json = render_json,
  txt  = render_txt
)

# ROOTING FUNCTION
# =============================================================================

def api(service='default', param='default'):
  """
    Rooting function, return a message containing REST awnser

    :Parameters:
      service
        The REST service name (keyword)
  """

  # Dictionnary of REST services
  # keyword : function
  result = {
    'default' : rest_default(),
    'simpleText' : rest_simpleText(),
    'metatables' : rest_metatables(),
    'interests' : rest_interests(param),
  }.get(service, rest_default())

  # Return message
  return {'message': result}


# REST FUNCTIONS
# =============================================================================

# REST - API
# -----------------------------------------------------------------------------
def rest_default():
  """
    REST Service function, return list of all services.
  """
  value = '<h1>API REST Services</h1>' \
    'Welcome to the API REST Services ! Check all REST services :' \
    '<ul>' \
      '<li><a href="./">/api</a></li>' \
        '<ul><li>Return HTML message</li></ul>' \
      '<li><a href="./simpleText">/api/simpleText</a></li>' \
        '<ul><li>Return a simple Text message</li></ul>' \
      '<li><a href="./metatables">/api/metatables</a></li>' \
        '<ul><li>Return all table\'s names from database</li></ul>' \
      '<li><a href="./interests/default">/api/interests/[table]</a></li>' \
        '<ul><li>Return points of interests from the table</li></ul>' \
    '</ul>'
  return value

# REST - SIMPLE TEXT
# -----------------------------------------------------------------------------
def rest_simpleText():
  """
    REST Service function, return a simple text.
  """
  return 'Test ok'


# REST - ALL TABLES
# -----------------------------------------------------------------------------
def rest_metatables():
  """
    Return all table's names from database without geographic tables.

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
      "WHERE table_schema='public' " \
      "ORDER BY table_name ASC"
  # Execute the query
  rows = db._execute(sql)

  ### ----- RESULTS

  # Prepare variables
  names = []  # List of tables names
  data = {}   # Json object to return

  # Test if the list is empty
  if not rows:
    data['status'] = 'nok'
    data['result'] = ['Warning: No tables.']

  # If the list is not empty
  else:
    # Set status
    data['status'] = 'ok'

    # Loops results to get names
    for row in rows:
      if row[0] != 'geography_columns' \
        and row[0] != 'geometry_columns' \
        and row[0] != 'spatial_ref_sys' \
        and row[0] != 'raster_columns' \
        and row[0] != 'raster_overviews':
        names.append(row[0])

    # Save the result
    data['result'] = names

  # Prepare the JSON object
  json_data = json.loads(json.dumps(data))

  # Return the json object
  return json_data


# REST - INTERESTS BY TABLE
# -----------------------------------------------------------------------------

def rest_interests(table):
  """
    Return points of interests from the table in parameter.

    :Parameters:
      table
        The table name

    :Example:
    >>> get_interests('osm_amenities')
    {
      "status" : "ok",
      "result" : [
        {
            "type": 1,
            "alias" : "interest1"
        },
        {
            "type": 2,
            "alias" : "interest2"
        }
      ]
    }
  """

  ### ----- INIT

  # Prepare variables
  names = []  # List of tables names
  data = {}   # Json object to return

  # Test if it's default value
  if table=='default':
    data['status'] = 'nok'
    data['result'] = ['Error: Table parameter is missing.']
  
  ### ----- DATABASE : GET DISTINCT TYPE
  
  # If not, just execute query
  else:

    print("not default")

    # Create default database connexion object
    db = classDatabase.Database()

    # Connexion to the database
    db._connect()

    # Prepare the SQL query
    sql = "SELECT DISTINCT type " \
        "FROM " + table + " " \
        "ORDER BY type ASC"

    # Execute the query
    rows = db._execute(sql)

    # Test if the list is empty
    if not rows:
      data['status'] = 'nok'
      data['result'] = ['Warning: No interests on this table.']

    ### ----- DATABASE : GET TYPE ALIAS

    # If not
    else:

      # Prepare the table name
      strTable = "{}{}".format("type_", table)

      # Get all tyoe from table
      sql2 = "SELECT * FROM " + strTable + " " \
        + "ORDER BY name ASC"

      # Execute the second query
      rows2 = db._execute(sql2)

      print("ok")

      # Test the query result
      if not rows2:
        data['status'] = 'nok'
        data['result'] = ['Warning: No matching type on this table.']


      ### ----- MATCHING TYPE-NAME

      # If the type_table contains something
      else:

        # Set status
        data['status'] = 'ok'

        
        print(rows2)
        names.append(['test'])

        # Save the result
        data['result'] = names

  # Prepare the JSON object
  json_data = json.loads(json.dumps(data))

  # Return the json object
  return json_data


# MAIN
# =============================================================================

if __name__ == "__main__":
  app.run(port=8082)


