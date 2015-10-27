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


import web
try:
    import simplejson as json
except ImportError:
    import json
import mimerender

mimerender = mimerender.WebPyMimeRender()

render_xml = lambda message: '<message>%s</message>'%message
render_json = lambda **args: json.dumps(args)
render_html = lambda message: '<html><body>%s</body></html>'%message
render_txt = lambda message: message

urls = (
    '/(.*)', 'greet'
)
app = web.application(urls, globals())

class greet:
    @mimerender(
        default = 'html',
        html = render_html,
        xml  = render_xml,
        json = render_json,
        txt  = render_txt
    )
    def GET(self, name):
        if not name: 
            name = 'world'
        return {'message': 'Hello, ' + name + '!'}

if __name__ == "__main__":
    app.run()




