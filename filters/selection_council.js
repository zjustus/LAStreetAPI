/**
 * selection Council filter
 * This Filter removes data that is not part of the given designation
 * Note: This could/should be a slider
 */

function filter(data, parameters){
    if(!('council' in parameters)) return data;
    
    let output = [];
    const council = Number(parameters['council']);

    try{
        for(const feature of data){
            let newFeature = feature;        
            
            if(newFeature.properties['CD'] == council)
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