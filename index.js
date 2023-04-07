const express = require('express')
const cors = require('cors')
const Fs = require('fs/promises')
const {glob, globSync} = require("glob")
// const { filter } = require('./filters/width_rating')

const app = express()
const port = 3001

// Get App Data
let streetData;
Fs.readFile("./data/hillside_inventory_LA_centrality_full.geojson").then((data)=>{
  const geoJson = data;
  streetData = JSON.parse(geoJson);
});

// Load Filters dynamically
let filters = []
globSync('./filters/*.js').forEach(file => {
  const filter = require(`./${file}`);
  filters.push(filter);
})

// Set Cors headers
app.use(cors({origin:'*'}))

// Heartbeat
app.get('/heartbeat', (req, res) => {
    let dummy = {
        "Status":200
    };
    res.send(dummy);
})

// Gets a list of features that can be filtered. 
app.get('/filters', async (req, res) =>{
  let output = await Fs.readFile("./parameters.json");
  output = JSON.parse(output);
  res.send(output)
})

// Gets Filtered Data
app.get('/filteredData', async (req, res) =>{
  let geoData = streetData.features;
  console.log("Running Filters");
  
  filters
  .sort((a,b) => {a.priority - b.priority}) // Sort by priority
  .forEach(filter =>{ // Loop Through the filters
    geoData = filter.filter(geoData, req.query);
  })

  res.send(geoData);
});


// This is deprecated
// Gets feature details by ID
app.get('/feature', (req, res) =>{
  let output;

  // console.log(req.query)
  const params = req.query;

  output = streetData["features"].find(o => o['properties']["SECT_ID"] == params.id);
  // console.log(output)
  console.log(streetData['features'][1])

  // TODO: If error, send error!
  res.send(output ?? {
    "Error":"ID Not Found"
  })
})


// This is deprecated
app.get('/findFeatures', (req, res) =>{
  let output;

  const params = req.query;
  const paramKeys = Object.keys(params)
  const featureKeys = Object.keys(streetData['features'][0]['properties'])

  output = streetData['features']

  let numOfFilters = 0
  for(const i of paramKeys){
    if(!featureKeys.includes(i)) continue;

    numOfFilters ++
    output = output.filter(feature => {
      if(typeof feature['properties'][i] === 'string'){
        return feature['properties'][i] === params[i]
      }
      else if(typeof feature['properties'][i] === 'number'){
        return feature['properties'][i] <= params[i]
      }
    })

    if(numOfFilters == 0){
      // TODO: If error, send error!
      res.send({
        "Error":"ID Not Found"
      })
      return
    }

    res.send(output)

  }

})

// Start the Application
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})