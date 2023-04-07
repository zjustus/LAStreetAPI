/**
 * condition Filter
 * This Filter Appends the condition to the data
 * 
 * Dependencies:
 * curb_rating.js
 * pci_rating.js
 * sidewalk_rating.js
 * width_rating.js
 * 
 */

function filter(data, parameters){
    let output = [];
    // console.log(parameters)

    // This Filter must contain these parameters
    if(
        !('widthRW' in parameters) ||
        !('pciRW' in parameters) ||
        !('curbRW' in parameters) ||
        !('sidewalkRW' in parameters)
    ) return data

    let sumUserInput = 
        parameters['widthRW'] + 
        parameters['pciRW'] + 
        parameters['curbRW'] + 
        parameters['sidewalkRW'];

    try{
        for(const feature of data){
            let newFeature = feature;        
    
            let condition = 0;
            condition += newFeature['width_rating'] * parameters['widthRW'];
            condition += newFeature['pci_rating'] * parameters['pciRW'];
            condition += newFeature['curb_rating'] * parameters['curbRW'];
            condition += newFeature['sidewalk_rating'] * parameters['sidewalkRW'];
            condition /= sumUserInput
            newFeature['condition'] = condition;
            
            output.push(newFeature)
        }
    } catch(err){
        console.log("Condition.js Filter Error: possible running out of order or missing dependencies", err);
        return data;
    }

    // return output
    return output
}

module.exports = {
    filter,
    "priority":1
}