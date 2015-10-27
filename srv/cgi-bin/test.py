#!/usr/bin/env python
# -*- coding: utf-8 -*- enable debugging

import web

urls = (
    'http://172.18.138.171/hamk-map-project/srv/cgi-bin/test.py', 'index'
)

class index:
    def GET(self):
        return "Hello, world!"

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()