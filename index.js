const express = require('express')
const Fs = require('fs/promises')

const app = express()
const port = 3001
 
let streetData;
Fs.readFile("./lacounty.geojson").then((data)=>{
  const geoJson = data;
  streetData = JSON.parse(geoJson);
});

// Dummy Test
app.get('/', (req, res) => {
//   res.send('Hello World!')
    let dummy = {
        "Hello":"Json Has Returned"
    };
    res.send(dummy);
})

// Gets a list of features that can be filtered. 
app.get('/filterFeatures', (req, res) =>{
  let output = {};

  const featureKeys = Object.keys(streetData['features'][0]['properties'])

  for(i of featureKeys){
    output[i] = typeof streetData['features'][0]['properties'][i]
  }

  res.send(output)
})

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})