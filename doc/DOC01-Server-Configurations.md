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

<h4>Install PostgreSQL</h4>
<p><i>Installing libraries</i><br>
<b>$</b> <code>sudo apt-get install postgresql postgresql-client postgresql-common</code></p>

<h4>Configure PostgreSQL</h4>
<p><i>Edit PostgreSQL Configuration</i><br>
set in pg_hba.conf superuser and linten adress (from 127.0.0.1/32 to 0.0.0.0/0)<br>
set in postrgesql.conf listen addres from 'localhost' to '*'</p>

<h4>Prepare for PostGIS extension</h4>
<p>To avoid security problems with only one user "postgres", we need to create a new Administrator profile. To do this, we will create a new user, give it the rights, and create a new database for geometric data it will administer.<br><br>
<i>Connexion to postgres user</i><br>
<b>$</b> <code>sudo su postgres</code><br><br>
<i>Create YOUR user</i><br>
<b><i>postgres</i>$</b> <code>createuser USER_NAME</code><br><br>
<i>Open PostgreSQL command</i><br>
<b><i>postgres</i>$</b> <code>psql</code><br><br>
<i>Add password to your username</i><br>
<b><i>postgres/psql</i>$</b> <code>ALTER ROLE username WITH password 'your password';</code><br><br>
<i>You declare your username as superuser</i><br>
<b><i>postgres/psql</i>$</b> <code>ALTER ROLE username WITH superuser;</code><br><br>
<i>Exit psql</i><br>
<b><i>postgres/psql</i>$</b> <code>\q</code><br><br>
<i>Exit postgres user</i><br>
<b><i>postgres</i>$</b> <code>exit</code><br>
</p>
<i>Create database for PostGIS extension</i><br>
<b>$</b> <code>createdb postgis</code><br>

<h2>PostGIS</h2>
<b>$</b> <code>sudo add-apt-repozitory ppa:ubuntugis/ubuntugis-unstable</code><br>
<b>$</b> <code>sudo apt-get update</code><br>
<b>$</b> <code>sudo apt-get install postgis</code><br>
<b>$</b> <code>psql postgis</code><br>
<b>psql=</b> <code>CREATE EXTESION postgis;</code><br>

<h2>tomcat and Geoserver</h2>

<b>$</b> <code>sudo apt-get install openjdk-jre-7</code><br>
<b>$</b> <code>sudo apt-get install tomcat7</code><br>
<i>dowload latest version of geoserver</i><br>
<i>copy file 'geoserver.war'to tomcat application directory (depend on your configuration)</i><br>
<i>geoserver run on localhost:8080</i><br>

<h2>Apache2</h2>
<b>$</b> <code>sudo apt-get install apache2</code><br>
<i>add to apache configuration file this lines (to virtual server):</i><br>
<code>
ProxyRequests Off
ProxyPreserveHost On
<Proxy *>
	Order deny,allow
	Allow from all
</Proxy>
ProxyPass /geoserver "http://localhost:8080/geoserver"
ProxyPassReverse /geoserver "http://localhost:8080/geoserver"
</code>
	


