DROP TABLE IF EXISTS roads;
DROP TABLE IF EXISTS nodes;

CREATE TABLE roads
(
  id integer NOT NULL PRIMARY KEY,
  osm_id bigint,
  osm_name character varying,
  osm_source_id bigint,
  osm_target_id bigint,
  clazz integer,
  source integer references nodes(id),
  target integer references nodes(id),
  length double precision,
  speed integer,
  cost double precision,
  reverse_cost double precision,
  geometry geometry(LineString,4326)
);

CREATE TABLE nodes
(
  id integer NOT NULL PRIMARY KEY,
  geometry geometry(Point,4326),
)


