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
@mimerender(
  default = 'html',
  html = render_html,
  xml  = render_xml,
  json = render_json,
  txt  = render_txt
)

# ROOTING FUNCTIONS
# =============================================================================

def api(service='default'):
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
    'test' : rest_test(),
  }.get(service, rest_default())

  # Return message
  return {'message': result}


# REST FUNCTIONS
# =============================================================================

def rest_default():
  """
    REST Service function, return list of all services.
  """
  value = '<h1>API REST Services</h1>'
  value += 'Welcome to the API REST Services ! Check all REST services :'
  value += '<ul>'
  value += '<li><a href="./test">REST-Test</a> : Return a simple text</li>'
  value += '</ul>'
  return value

def rest_test():
  """
    REST Service function, return a simple text.
  """
  return 'Test ok'


# MAIN
# =============================================================================

if __name__ == "__main__":
  app.run(port=8082)


