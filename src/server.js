'use strict';

const express = require('express');
const capitalize = require('./capitalize/capitalize');
const getState=require('./readState/readState')
const { updateState }=require('./updateState/updateState');
const  togglePiState = require('./togglePiState/togglePiState')
const postPlantStatus = require('./postPlantStatus/postPlantStatus')
const getPlants = require('./getPlants/getPlants')

const serverErr = require('./error/500')
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(serverErr)
app.use(express.json())

// what parameters are defined in express functions ??
app.get('/capitalize-me', function(request, response, next) {
  // I want to send a message as a query parameter??
  if (request.query.message) {
    let upperMessage = capitalize(request.query.message);
    response.send(upperMessage);
  } else {
    response.send('Please attach a message');
  }
});

app.get('/state', async function(request, response, next) {
  let currentState = await getState();
  console.log(currentState);
  response.send(currentState);
});

app.post('/state', async function(request, response, next) {
  console.log(request.query)
  let time = null;
  try {
    if (request.query.time) {time = request.query.time}
    if (request.query.state === 'on'|| request.query.state === 'off'){
      let updated = await updateState(request.query.state)
      await togglePiState(request.query.state, request.query.time);
      response.send(updated);
    }
    else {
      response.send('YOUR PI IS', request.query.state)
    }
  }
  catch(e) {
    next(e)
  }
});

app.get('/status/day', async function (request, response, next) {
  console.log(request.query)
  try{
    const plantStatusResult = await getPlants('/day', request.query);
    response.send(plantStatusResult)
  }catch(e){
    // console.error(e)
  }
})

app.get('/status', async function (request, response, next) {
  console.log(request.query)
  try{
    const plantStatusResult = await getPlants();
    response.send(plantStatusResult)
  }catch(e){
    console.error(e)
  }
})

app.post('/status', async function (request, response, next) {
  try {
    let newPlant = request.body;
    console.log('NEW PLANT TO BE POSTED' , newPlant)
    const postedPlant = await postPlantStatus(newPlant);
    console.log('POSTED', postedPlant);
    response.send(postedPlant)
  }
  catch(e) {
    next(e)
  }
})



module.exports = app;