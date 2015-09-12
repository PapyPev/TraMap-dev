#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Filename: json-file.py
__author__ = "Pev"
import json

# #############################################################################
# FUNCTIONS
# #############################################################################

def makeJSON():
   """
   Create Sample JSON file and write on output
   """

   # JSON variable
   jsonVariable = []

   # Mise en forme du JSON
   jsonVariable.append({
      "status":"success",
      "toc":[
         {
            "id":0,
            "pos":1,
            "attr":"tiles",
            "alias":"Tiles",
            "type":"radio",
            "content":[{
               "id":1,
               "pos":1,
               "attr":"osm-street",
               "alias":"OSM Street Map",
               "checked":"checked",
               "ws":"http://www.google.com"
            },
            {
               "id":0,
               "pos":0,
               "attr":"osm-sat",
               "alias":"OSM Sat Map",
               "checked":"",
               "ws":"http://www.google.com"
            }]
         },
         {
            "id":1,
            "pos":0,
            "attr":"vector",
            "alias":"Vectors",
            "type":"checkbox",
            "content":[{
               "id":1,
               "pos":1,
               "attr":"vect1",
               "alias":"Vector Data 1",
               "checked":"checked",
               "ws":"http://www.google.com"
            },
            {
               "id":0,
               "pos":1,
               "attr":"vect2",
               "alias":"Vector Data 2",
               "checked":"",
               "ws":"http://www.google.com"
            }]
         }
      ]
   })

   print "Content-type: application/json; charset=UTF-8"
   print #end of headers
   # Print JSON
   print json.dumps(jsonVariable)
   pass



# #############################################################################
# MAIN
# #############################################################################

if __name__ == "__main__":
   makeJSON();
