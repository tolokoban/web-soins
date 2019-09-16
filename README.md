# web-soins
Statistics collector for remote hostpitals
[See it in action](https://tolokoban.github.io/web-soins/).

# Local web server with Docker image

We use a docker image from [mettrayner](https://github.com/mattrayner/docker-lamp/edit/master/README.md).

```
docker run -p "8888:80" -v ~/www:/app -v ~/mysql:/var/lib/mysql mattrayner/lamp:latest-1804
firefox localhost:8888/phpMyAdmin
```

* Apache 2.4.29
* MySQL 5.7.26
* PHP 7.3.6
* phpMyAdmin 4.9.0.1

### MySQL Databases
By default, the image comes with a `root` MySQL account that has no password. This account is only available locally, i.e. within your application. It is not available from outside your docker image or through phpMyAdmin.

When you first run the image you'll see a message showing your `admin` user's password. This user can be used locally and externally, either by connecting to your MySQL port (default 3306) and using a tool like MySQL Workbench or Sequel Pro, or through phpMyAdmin.

If you need this login later, you can run `docker logs CONTAINER_ID` and you should see it at the top of the log.

#### Creating a database
So your application needs a database - you have two options...

1. PHPMyAdmin
2. Command line

##### PHPMyAdmin
Docker-LAMP comes pre-installed with phpMyAdmin available from `http://DOCKER_ADDRESS/phpmyadmin`.

**NOTE:** you cannot use the `root` user with PHPMyAdmin. We recommend logging in with the admin user mentioned in the introduction to this section.

##### Command Line
First, get the ID of your running container with `docker ps`, then run the below command replacing `CONTAINER_ID` and `DATABASE_NAME` with your required values:
```bash
docker exec CONTAINER_ID  mysql -uroot -e "create database DATABASE_NAME"
```


## Adding your own content
The 'easiest' way to add your own content to the lamp image is using Docker volumes. This will effectively 'sync' a particular folder on your machine with that on the docker container.

The below examples assume the following project layout and that you are running the commands from the 'project root'.
```
/ (project root)
/app/ (your PHP files live here)
/mysql/ (docker will create this and store your MySQL data here)
```

In english, your project should contain a folder called `app` containing all of your app's code. That's pretty much it.

### Adding your app
The below command will run the docker image `mattrayner/lamp:latest` interactively, exposing port `80` on the host machine with port `80` on the docker container. It will then create a volume linking the `app/` directory within your project to the `/app` directory on the container. This is where Apache is expecting your PHP to live.
```bash
docker run -i -t -p "80:80" -v ${PWD}/app:/app mattrayner/lamp:latest
```

### Persisting your MySQL
The below command will run the docker image `mattrayner/lamp:latest`, creating a `mysql/` folder within your project. This folder will be linked to `/var/lib/mysql` where all of the MySQL files from container lives. You will now be able to stop/start the container and keep your database changes.

You may also add `-p 3306:3306` after `-p 80:80` to expose the mysql sockets on your host machine. This will allow you to connect an external application such as SequelPro or MySQL Workbench.
```bash
docker run -i -t -p "80:80" -v ${PWD}/mysql:/var/lib/mysql mattrayner/lamp:latest
```

### Doing both
The below command is our 'recommended' solution. It both adds your own PHP and persists database files. We have created a more advanced alias in our `.bash_profile` files to enable the short commands `ldi` and `launchdocker`. See the next section for an example.
```bash
docker run -i -t -p "80:80" -v ${PWD}/app:/app -v ${PWD}/mysql:/var/lib/mysql mattrayner/lamp:latest
```

#### `.bash_profile` alias examples
The below example can be added to your `~/.bash_profile` file to add the alias commands `ldi` and `launchdocker`. By default it will launch the 16.04 image - if you need the 14.04 image, simply change the `docker run` command to use `mattrayner/lamp:latest-1404` instead of `mattrayner/lamp:latest`.
```bash
# A helper function to launch docker container using mattrayner/lamp with overrideable parameters
#
# $1 - Apache Port (optional)
# $2 - MySQL Port (optional - no value will cause MySQL not to be mapped)
function launchdockerwithparams {
    APACHE_PORT=80
    MYSQL_PORT_COMMAND=""
    
    if ! [[ -z "$1" ]]; then
        APACHE_PORT=$1
    fi
    
    if ! [[ -z "$2" ]]; then
        MYSQL_PORT_COMMAND="-p \"$2:3306\""
    fi

    docker run -i -t -p "$APACHE_PORT:80" $MYSQL_PORT_COMMAND -v ${PWD}/app:/app -v ${PWD}/mysql:/var/lib/mysql mattrayner/lamp:latest
}
alias launchdocker='launchdockerwithparams $1 $2'
alias ldi='launchdockerwithparams $1 $2'
```

##### Example usage
```bash
# Launch docker and map port 80 for apache
ldi

# Launch docker and map port 8080 for apache
ldi 8080

# Launch docker and map port 3000 for apache along with 3306 for MySQL
ldi 3000 3306
```
