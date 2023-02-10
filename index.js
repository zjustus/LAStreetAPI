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
  let output;

  output = Object.keys(streetData['features'][0]['properties'])
  res.send(output)
})

// Gets feature details by ID
app.get('/feature', (req, res) =>{
  let output;

  // console.log(req.query)
  const params = req.query;

  output = streetData["features"].find(o => o['properties']["SECT_ID"] == params.id);
  console.log(output)
  console.log(streetData['features'][1])

  // TODO: If error, send error!
  res.send(output ?? {
    "Error":"ID Not Found"
  })
})

app.get('/findFeatures', (req, res) =>{
  let output;

  const params = req.query;
  const ParamKeys = Object.keys(params)
  const featureKeys = Object.keys(streetData['features'][0]['properties'])
  
  output = streetData['features']
  for(let i in ParamKeys){
    if(!featureKeys.includes(i)) continue;

    output = output.filter(feature => {
      return false;
    })

  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})