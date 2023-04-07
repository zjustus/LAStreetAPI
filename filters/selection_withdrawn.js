/**
 * selection withdrawn filter
 * This Filter removes data that is not part of the given designation
 * 
 */

function filter(data, parameters){
    if(!('withdrawn' in parameters)) return data;
    
    let output = [];

    let withdrawn = 0
    if(parameters['withdrawn'] == 'withdrawn') withdrawn = 1;
    else if(parameters['withdrawn'] == 'notwithdrawn'){} //its already set
    else return data; // return blank if invalid input

    try{
        for(const feature of data){
            let newFeature = feature;        
            
            if(newFeature.properties['withdrawn'] == withdrawn)
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