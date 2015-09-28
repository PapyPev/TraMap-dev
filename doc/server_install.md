<h1>Server Configurations</h1>

<p>This documentation explains how to install a web server, a database, a mapping extension to the database, a map server, and configure the web server to return to the map server.</p>

<h2>Prerequisite</h2>

<p>You must have a server containing at least the following configurations:<ul>
	<li>OS: Ubuntu 15.04+</li>
	<li>RAM: 4GB</li>
</ul></p>

<h2>Actualizate System</h2>
<p>Before any configuration, make sure that the system is correctly updated.</p>
<i>Fetches the list of available updates</i><br>
<b>$</b> <code>sudo apt-get update</code><br>
<i>Strictly upgrades the current packages</i><br>
<b>$</b> <code>sudo apt-get upgrade</code>

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
	


