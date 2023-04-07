/**
 * selection Community filter
 * This Filter removes data that is not part of the given designation
 * 
 */

function filter(data, parameters){
    if(!('community' in parameters)) return data;
    
    let output = [];

    let searchField = 0;
    let lookingFor = 0;

    if(parameters['community'] == 'disadvantage'){
        searchField = "DAC"
        lookingFor = 1;
    }
    else if(parameters['community'] == 'nondisadvantage'){
        searchField = "DAC"
        lookingFor = 0;
    }
    else if(parameters['community'] == 'lowincome'){
        searchField = "lowincome"
        lookingFor = 1;
    }
    else return data; // return blank if invalid input

    try{
        for(const feature of data){
            let newFeature = feature;        
            
            if(newFeature.properties[searchField] == lookingFor)
                output.push(newFeature)
        }
    } catch(err){
        console.log("designation.js Filter Error: possible running out of order or missing dependencies", err);
        return data;
    }

    // return output
    return output
}

module.exports = {
    filter,
    "priority":2
}