const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
/*
function isValidId(request, response, next) {
  const { id } = request.body;
}*/

app.get("/repositories", (request, response) => {       // OK
  //const {} = request.query;

  //const results = owner ? projects.filter(project => project.owner == owner) : projects;
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {        // OK
  const {title, url, techs } = request.body;

  const repository =  { id: uuid(), title, url, techs, likes: 0};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {     // OK
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const rI = repositories.findIndex(repository => repository.id === id);

  if (rI < 0) {
    return response.status(400).json({error: "No repository was found with the given ID"});
  }

  repositories[rI].title = title;
  repositories[rI].url = url;
  repositories[rI].techs = techs;

  return response.json(repositories[rI]);
});

app.delete("/repositories/:id", (request, response) => {    // OK
  const { id } = request.params;

  const rI = repositories.findIndex(repository => repository.id === id);

  if (rI < 0) {
    return response.status(400).json({error:"Repository not found"});
  }

  repositories.splice(rI, 1);

  // At deletion, we usually return a send response, with status 204
  return response.status(204).send(); 
});

app.post("/repositories/:id/like", (request, response) => {   // OK
  const { id } = request.params;

  const rI = repositories.findIndex(repository => repository.id === id);

  if (rI < 0) {
    return response.status(400).json({error:"Repository not found"});
  }

  repositories[rI].likes++;

  return response.json(repositories[rI]);
});

module.exports = app;
