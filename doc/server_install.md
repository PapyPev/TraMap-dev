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
<b>$</b> <code>sudo apt-get update</code><br><br>
<i>Strictly upgrades the current packages</i><br>
<b>$</b> <code>sudo apt-get upgrade</code>

<h2>Database: PostgreSQL</h2>
<p>To back up our data, attribute and geometric, we need a container of data. PostgreSQL allow us to manage data schemas, users and extensions like PostGIS for the cartographic data.</p>

<p><i>Installing PostgreSQL libraries</i><br>
<b>$</b> <code>sudo apt-get install postgresql postgresql-client postgresql-common</code></p>

<p><i>Edit PostgreSQL Configuration</i><br>
set in pg_hba.conf superuser and linten adress (from 127.0.0.1/32 to 0.0.0.0/0)<br>
set in postrgesql.conf listen addres from 'localhost' to '*'</p>

<p>set usernmae and password for main user:<br>

<i>Connexion to postgres user</i><br>
<b>$</b> <code>sudo su postgres</code><br>
<i>Create YOUR user</i><br>
<b>$<i>postgres</i></b> <code>createuser USER_NAME</code><br>
<i>Add password to your username</i><br>
<b>$<i>postgres</i></b> <code>ALTER ROLE username WITH password 'your password';</code><br>
<i>You declare your username as superuser</i><br>
<b>$<i>postgres</i></b> <code>ALTER ROLE username WITH superuser;</code><br>

</p>

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
	


