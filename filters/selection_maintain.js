/**
 * selection maintain filter
 * This Filter removes data that is not part of the given designation
 * 
 */

function filter(data, parameters){
    if(!('maintain' in parameters)) return data;
    
    let output = [];

    let maintain = 1
    if(parameters['maintain'] == 'maintain') maintain = 0;
    else if(parameters['maintain'] == 'notmaintain'){} //its already set
    else return data; // return blank if invalid input

    try{
        for(const feature of data){
            let newFeature = feature;        
            
            if(newFeature.properties['Not_maintained'] == maintain)
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