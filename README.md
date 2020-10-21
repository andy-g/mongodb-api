# MongoDB API Example
_A super simple persistent API using MongoDB_

## Environment Setup
The `docker-compose.yml` file has been setup to run the whole stack without anything required on the host other than docker. Just run:
```sh
docker-compose up
```
Having **npm** & **nodejs** installed on the host can streamline development, as you can then bring up the app on the host using `node src/index.js`, or install **nodemon** (`npm install -g nodemon`), and run `nodemon src/index.js` to restart the node process when any file changes are detected. If you want to run the node app locally (as outlined above), then only bring up the other services using docker:
```sh
docker-compose up mongo mongo-express
```

Once this has been done, you should have the following docker containers running:  

### Services
* **mongo** _(The MongoDB database server)_
* **mongo-express** _(web interface to view and interact with the MongoDB database, accessible at http://localhost:8081)_
* **time-logger** _(The dockerised nodejs application that runs the web api)_

When making changes and running the application in docker, you may need to rebuild the docker image to reflect code changes:
```sh
docker-compose up --build
```

### Example Requests
Once all the services are running, you can start making requests against the API. It'll be easiest to use VS Code and install the [Rest Client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), and then use the `requests.rest` file to initiate the example API requests.
