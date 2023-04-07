/**
 * Importance Filter
 * This Filter Appends the Importance to the data
 * 
 */

function filter(data, parameters){
    let output = [];

    // This Filter must contain these parameters
    if(
        !('distanceW' in parameters) ||
        !('timeW' in parameters) ||
        !('widthW' in parameters) ||
        !('populationW' in parameters)
    ) return data

    try{
        for(const feature of data){
            let newFeature = feature;      
            
            let importance = 0
            importance += newFeature['centrality_distance'] * parameters['distanceW'];
            importance += newFeature['centrality_time'] * parameters['timeW'];
            importance += newFeature['centrality_width'] * parameters['widthW']; 
            importance += newFeature['centrality_population'] * parameters['populationW'];
            newFeature['importance'] = importance;  
            
            output.push(newFeature)
        }
    } catch(err){
        console.log("importance.js Filter Error: possible running out of order or missing dependencies", err);
        return data;
    }

    // return output
    return output
}

module.exports = {
    filter,
    "priority":1
}