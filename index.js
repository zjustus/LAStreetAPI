const express = require('express')
const Fs = require('fs/promises')

const app = express()
const port = 3001

let streetData;
Fs.readFile("./lacounty.geojson").then((data)=>{
  const geoJson = data;
  streetData = JSON.parse(geoJson);
});

app.get('/', (req, res) => {
//   res.send('Hello World!')
    let dummy = {
        "Hello":"Json Has Returned"
    };
    res.send(streetData);
})


app.get('/feature', (req, res) =>{
  let output;

  // console.log(req.query)
  const params = req.query;

  output = streetData["features"].find(o => o['properties']["SECT_ID"] == params.id);
  console.log(output)
  console.log(streetData['features'][1])
  res.send(output ?? streetData['features'][1]['properties'])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})