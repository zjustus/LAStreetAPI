# HSPA API 
Hill Side Prioritization Application API  
This API is designed to perform analytics on a given set of street data  
This is an API-ed version of https://github.com/elainelin313/LAstreet

# How to Run
`npm install`: Installs the packages
`npm start`: Starts the server

Example URL: `http://localhost:3001/filteredData?widthRW=0.2&pciRW=0.2&curbRW=0.2&sidewalkRW=0.2&distanceW=0.2&timeW=0.2&widthW=0.2&populationW=0.2&`

# Endpoints
## get: heartbeat
Returns true if the server is running

## get: filters
Returns a json list of all available filters that can be used on the filteredData endpoint  
EX: 
```JSON
{
    "FeatureA":{
        "type": "number",
        "default":0.3,
        "min": 0,
        "max": 1,
    },
    "FeatureB":{
        "type": "select",
        "values":["A","B","C"],
    }
}
```

## get: filteredData?filterA={value}...
Returns a filtered geojson list of streets given set parameters

# Current Parameters
- width_rating - select
- pci_rating - select
- curb_rating - select
- sidewalk_rating - select
- centrality_distance - select
- centrality_time - select
- centrality_width - select
- centrality_population - select
- community - selection
- withdrawn - selection
- maintain - selection
- location - selection
- council - selection
- designation - selection

# File Structure
- parameters.json - this file defines the parameters that this application can receive
- data/ - this folder can hold the geoJSON data file
- filters/ - this folder holds extensions that tell this server how to filter and process the data.

# Filter.js structure
all .js filters within the filters/ folder must return an object containing two properties
1. function: filter(data:geoJson, parameters:associativeArray) return: filteredData:geoJson
2. int: priority
the filter function defines a method on how to filter the data, this could be append, remove, modify  
the priority int defines what order to execute this filter in; 0 being the first to execute. It is recommended to use a lower priority number for filters that are not dependant on other filter data first.