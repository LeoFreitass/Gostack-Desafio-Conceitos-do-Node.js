const express = require("express");
const cors = require("cors");

 const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs } = request.body;

  const repository = {
    id: uuid(), 
    url, 
    title,
    techs,
    likes: 0,

  }

    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const findrepositoryindex = repositories.findIndex(repository =>
    repository.id ===id
   );
   
   if (findrepositoryindex === -1) {
     return response.status(400).json({ error:'repository does not exist.' });
   }
  
  const repository ={
     id,
     title,
     url,
     techs,
     likes: repositories[findrepositoryindex].likes,
   };

   repositories[findrepositoryindex] = repository
   return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
 const { id } = request.params;

 const findrepositoryindex = repositories.findIndex(repository =>
  repository.id ===id
 );

  if (findrepositoryindex >= 0) {
      repositories.splice(findrepositoryindex, 1);
  } else {
        return response.status(400).json({ error: 'error: repository does not exist.' })
      }

  return response.status(204).send();
});



app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findrepositoryindex = repositories.findIndex(repository => 
    repository.id === id
);

  if (findrepositoryindex === -1) {
   return response.status(400).json({ error: 'error: repository does not exist.' });
  }

  repositories[findrepositoryindex].likes++;

  return response.json( repositories[findrepositoryindex]);
});

module.exports = app;
