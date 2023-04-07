/**
 * selection location filter
 * This Filter removes data that is not part of the given designation
 * 
 */

function filter(data, parameters){
    if(!('location' in parameters)) return data;
    
    let output = [];

    let maximum_lat = 0;
    let minimum_lat = 0;

    if(parameters['location'] == 'northla'){
        maximum_lat = 91; // Maximum lat + 1
        minimum_lat = 34.1935;
    }
    else if(parameters['location'] == 'centralla'){
        maximum_lat = 34.1935;
        minimum_lat = 33.911;
    }
    else if(parameters['location'] == 'southla'){
        maximum_lat = 33.911;
        minimum_lat = -91; // Minimum lat - 1
    }
    else return data; // return blank if invalid input

    try{
        for(const feature of data){
            let newFeature = feature;        
            
            if(newFeature.properties['centroid_lat'] > minimum_lat && newFeature.properties['centroid_lat'] < maximum_lat)
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