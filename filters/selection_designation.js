/**
 * selection designation filter
 * This Filter removes data that is not part of the given designation
 * 
 */

function filter(data, parameters){
    if(!('designation' in parameters)) return data;
    
    let output = [];
    try{
        for(const feature of data){
            let newFeature = feature;        
    
            if(newFeature.properties['Street_Designation'] == parameters['designation'])            
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