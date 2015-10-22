<h1>Database model</h1>
<p>
    In this documentation we will explain how the data are structured and how it's use for the application. We will describe their structure, types and field names. This database model contains six tables.
</p>

<h2>Table : roads</h2>
<p>
    This table contains roadlink (topology clean)
</p>

| Attribute     | Type      | Description           |
| ------------- |:---------:| --------------------- |
| id            | PK integer| identificator |
| osm_id        | bigint    | OSM identificator |
| osm_name      | char      | OSM name |
| type          | integer   | type of roads |
| source_id     | FK integer| source node of edge |
| target_id     | FK integer| target node of edge |
| length        | double    | edge (link) length in km |
| speed         | integer   | avarage speed (not accurate) |
| cost          | double    | cost for shortest path search |
| reverse_cost  | double    | cost in reverse direction |
| X1 .. Y2      | double    | node coordinates for A* search |
| geometry      | gemotery  | line |

<u>Information</u> :<br> 
<ul>
    <li>type : more information in <code>srv/data/osm2po.config</code></li>
    <li>cost : computed from speed and length</li>
</ul>

<h2>Table : nodes</h2>
<p>
    This table contains all nodes in graph (all junkers)
</p>

| Attribute     | Type      | Description           |
| ------------- |:---------:| --------------------- |
| id            | PK bigint | identificator         |
| geometry      | geometry  | gemotery of node      |
| osm_id        | bigint    | OSM node ID           |


<h2>Table : zones</h2>
<p>
    This table contains point of interest for transport modeling like shop, school, ... and home type point (for living)
</p>

| Attribute     | Type      | Description           |
| ------------- |:---------:| --------------------- |
| id            | PK integer| identificator |
| node_id       | FK bigint | id of node (nearest node) |
| names         | text      | node name |
| num_of_people | integer   | number of people who live in the zones |
| type          | char      | zones type |
| subtype       | char      | zones subtype |
| age_FROM_TO   | double    | percentage of people split by age category |
| geometry      | geometry  | point |

<u>Information</u> : <br>
<ul>
    <li>num_of_people : number of people who live in the zones (for type home) or travel to the zones (for other type)</li>
</ul>

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
<br>origin_id - origin zone (O)
<br>destination_id - destination zone (D)
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