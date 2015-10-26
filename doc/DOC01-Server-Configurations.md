<h1>Server Configurations</h1>

<p>
	This documentation explains how to install a web server, a database, a mapping extension to the database, a map server, and configure the web server to return to the map server.
</p>

<h2>Prerequisite</h2>

<p>
	You must have a server containing at least the following configurations:
	<ul>
		<li>OS: Ubuntu 15.04+</li>
		<li>RAM: 4GB</li>
	</ul>
</p>

<h2>Actualizate System</h2>

<p>
	Before any configuration, make sure that the system is correctly updated.<br><br>
	<i>Fetches the list of available updates</i><br>
	<b>$</b> <code>sudo apt-get update</code><br><br>
	<i>Strictly upgrades the current packages</i><br>
	<b>$</b> <code>sudo apt-get upgrade</code>
</p>

<h2>Database: PostgreSQL</h2>

<p>
	To back up our data, attribute and geometric, we need a container of data. PostgreSQL allow us to manage data schemas, users and extensions like PostGIS for the cartographic data.
</p>

<h4>Install PostgreSQL</h4>
<p>
	<i>Installing libraries</i><br>
	<b>$</b> <code>sudo apt-get install postgresql postgresql-client postgresql-common</code>
</p>

<h4>Configure PostgreSQL</h4>
<p>	
	<i>Set in pg_hba.conf superuser and linten adress (from 127.0.0.1/32 to 0.0.0.0/0</i><br>
	<pre><code>
		# Database administrative login by Unix domain socket
		local 	 all 	 postgres 	 peer
		local 	 all 	 YOUR_USERNAME 	 peer
		# TYPE 	 DATABASE 	 USER 	 ADDRESS 	 METHOD
		# "local" is for Unix domain socket connections only
		local 	 sameuser 	 all 	 peer
		# IPv4 local connections:
		host 	 all 	 all 	 0.0.0.0/0 	 md5
		# IPv6 local connections:
		host 	 all 	 all 	 ::1/128 	 md5
	</code></pre>

	<i>Set in postrgesql.conf : Change line :</i><br>
	<code>#listen_addresses = 'localhost'</code>
	to<br>
	<code>listen_addresses = '*'</code>
</p>

<h4>Prepare for PostGIS extension</h4>
<p>
	To avoid security problems with only one user "postgres", we need to create a new Administrator profile. To do this, we will create a new user, give it the rights, and create a new database for geometric data it will administer.<br><br>
	<i>Connexion to postgres user</i><br>
	<b>$</b> <code>sudo su postgres</code><br><br>
	<i>Create YOUR user</i><br>
	<b><i>postgres</i>$</b> <code>createuser USER_NAME</code><br><br>
	<i>Open PostgreSQL command</i><br>
	<b><i>postgres</i>$</b> <code>psql</code><br><br>
	<i>Add password to your username</i><br>
	<b><i>psql</i>=</b> <code>ALTER ROLE username WITH password 'your password';</code><br><br>
	<i>You declare your username as superuser</i><br>
	<b><i>psql</i>=</b> <code>ALTER ROLE username WITH superuser;</code><br><br>
	<i>Exit psql</i><br>
	<b><i>psql</i>=</b> <code>\q</code><br><br>
	<i>Exit postgres user</i><br>
	<b><i>postgres</i>$</b> <code>exit</code><br><br>
	<i>Create YOUR database for PostGIS extension</i><br>
	<b>$</b> <code>createdb DATABASE_NAME</code><br>
</p>

<h2>PostGIS extention</h2>

<p>
	<i>Adding a new repository</i><br>
	<b>$</b> <code>sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable</code><br><br>
	<i>Fetches the list of available updates</i><br>
	<b>$</b> <code>sudo apt-get update</code><br><br>
	<i>Install postgis library</i><br>
	<b>$</b> <code>sudo apt-get install postgis</code><br><br>
	<i>Open your database</i><br>
	<b>$</b> <code>psql DATABASE_NAME</code><br><br>
	<i>Add PostGIS extension on your database</i><br>
	<b><i>psql</i>=</b> <code>CREATE EXTESION postgis;</code><br><br>
	<i>Quit psql</i><br>
	<b><i>psql</i>=</b> <code>\q</code><br>
</p>

<h2>WebServer : Tomcat and Geoserver</h2>
<p>
	Before installing the servers, we need Java JDK for GeoServer. Currently, there are incompatibility with version 1.8 of Java, in fact, we will use version 1.7. Then we can install Tomcat and GeoServer.
</p>
<p>
	<i>Get Java JDK 1.7</i><br>
	<b>$</b> <code>sudo apt-get install openjdk-jre-7</code><br><br>
	<i>Install Tomcat library</i><br>
	<b>$</b> <code>sudo apt-get install tomcat7</code><br><br>
	<i>Dowload latest version of geoserver</i><br>
	<a href="http://geoserver.org/release/2.7.x/">GeoServer Sources 2.7.x</a><br><br>
	<i>Copy file 'geoserver.war' to Tomcat application directory (depend on your configuration). Now, Geoserver run on :</i><br>
	<a href="http://localhost:8080/geoserver/">http://localhost:8080/geoserver/</a>
</p>

<h2>Apache2 : Install and redirections</h2>
<p>
	<i>Install Apache2 library</i><br>
	<b>$</b> <code>sudo apt-get install apache2</code><br><br>
	<i>Add to Apache2 configuration file this lines (to virtual server):</i><br>
	<pre><code>
		ProxyRequests Off
		ProxyPreserveHost On
		&lt;Proxy *&gt;
			Order deny,allow
			Allow from all
		&lt;/Proxy&gt;
		ProxyPass /geoserver "http://localhost:8080/geoserver"
		ProxyPassReverse /geoserver "http://localhost:8080/geoserver"
	</code></pre>
</p>

<h2>Apache 2 : CGI-script configuration</h2>
<p>
	<i>Install library for cgi-script</i><br>
	<code><b>$</b> sudo a2enmod cgi</code><br><br>
	<i>Move to Apache configuration folder and edit apache2.conf</i><br>
	<code><b>$</b> cd /etc/apache2/</code><br>
	<code><b>$</b> sudo nano apache2.conf</code><br><br>
	<i>Add your web repository</i><br>
	<pre><code>
		ScriptAlias /cgi-bin/ /var/www/html/hamk-map-project/srv/cgi-bin/
	    <Directory "/var/www/html/hamk-map-project/srv/cgi-bin">
	        AllowOverride None
	        Options +ExecCGI
	        Allow from all
	        AddHandler cgi-script .py
	    </Directory>
	</code></pre>
	<i>Don't forget run this command for each cgi file :</i><br>
	<code><b>$</b> sudo chmod +x youFile.py</code>
</p>


