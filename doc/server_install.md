actualizate system
-------------------

sudo apt-get update
sudo apt-get upgrade

postgresql
-----------
	sudo apt-get install postgresql postgresql-client postgresql-common
	set in pg_hba.conf superuser and linten adress (from 127.0.0.1/32 to 0.0.0.0/0)
	set in postrgesql.conf listen addres from 'localhost' to '*'
	set usernmae and password for main user:
		sudo su posrgres
		createuser username
		psql
		ALTER ROLE username WITH password 'your password';
		ALTER ROLE username WITH superuser;
	create database:
		createdb postgis
postgis
---------
	add latest ubuntugis repozitory
	sudo apt-get update
	sudo apt-get install postgis
	psql postgis
	CREATE EXTESION postgis;

tomcat and geoserver
---------------------
	sudo apt-get install openjdk-jre-7
	sudo apt-get install tomcat7
	dowload latest version of geoserver
	copy file 'geoserver.war'to tomcat application directory
	geoserver run on port 8080
apache
-------
	sudo apt-get install apache2
	set reverse proxy for geoserver
	


