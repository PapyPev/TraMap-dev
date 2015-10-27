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

def api(service='default', param=''):
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
    'allTables' : rest_allTables(),
  }.get(service, rest_default())

  # Return message
  if service != 'default':
    return result
  else:
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
      '<li><a href="./allTables">/api/allTables</a></li>' \
        '<ul><li>Return all table\'s names from database</li></ul>' \
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
def rest_allTables():
  """
    Return all table's names from database.

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
    data['result'] = []

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
  json_data = json.dumps(data)

  # Return the json object
  return json_data

# REST - INTERESTs BY TABLE
# -----------------------------------------------------------------------------

# MAIN
# =============================================================================

if __name__ == "__main__":
  app.run(port=8082)


