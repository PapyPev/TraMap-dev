Database model
=============

Database model contains 6 table.

roads
------

This table contains roadlink (topology clean)

<br>id - identificator
<br>osm_id - OSM identificator
<br>osm_name - OSM name
<br>osm_source_id - OSM source node identification
<br>osm target_id - OSM target node identificator
<br>type - type of roads (number) more information in srv/data/osm2po.config
<br>source - source node of edge (FK)
<br>target - target node of edge (FK)
<br>length - edge (link) length in km
<br>speed - avarage speed (not accurate)
<br>cost - cost for shortest path search (computed from speed and length)
<br>reverse_cost - cost in reverse direction
<br>X1 .. Y2 - node coordinates for A* search
<br>geometry - geometry of edge

nodes
------
contains all nodes in graph (all junkers)

<br>id - identificator
<br>geometry - geometry of node

zones
-----
This table contains point of interest for transport modeling like shop, school, ... and home type point (for living)

<br>id - identificator
<br>node_id - id of node (nearest node) (FK)
<br>name - node name
<br>num_of_people - number of people who live in the zones (for type home) or travel to the zones (for other type)
<br>type - zones type
<br>subtype - zones subtype
<br>age_FROM_TO - number of people split by age category [0,1] (sum of all category must be 1)
<br>geometry - point

traffic
--------
Trafic for roads.

<br>id - identificator
<br>road_id - road edge (FK)
<br>traffic - traffic value
<br>direction - true - posutive direction , false - reverse direction

od_pairs
---------
This table contains number of trip from origin to destination zones

<br>id - identificator
<br>origin - origin zone (O)
<br>destination - destination zone (D)
<br>num_of_trip - number of trip from O to D

general_area_information
------------------------
<br>Information about area for transport modeling.
<br>id - identificator
<br>name - area name
<br>walking - number of trip per day on one person (by foot)
<br>cycling - number of trip per day on one person (by bike)
<br>driver - number of trip per day on one person (by car)
<br>geometry - area definition (Polygon)