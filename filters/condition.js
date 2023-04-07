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

    const widthRW = Number(parameters['widthRW']);
    const pciRW = Number(parameters['pciRW']);
    const curbRW = Number(parameters['curbRW']);
    const sidewalkRW = Number(parameters['sidewalkRW']);


    let sumUserInput = 
        widthRW +
        pciRW +
        curbRW +
        sidewalkRW;

        
    try{
        for(const feature of data){
            let newFeature = feature;        
    
            let condition = 0;
            condition += newFeature.properties['width_rating'] * widthRW;
            condition += newFeature.properties['pci_rating'] * pciRW;
            condition += newFeature.properties['curb_rating'] * curbRW;
            condition += newFeature.properties['sidewalk_rating'] * sidewalkRW;
            condition /= sumUserInput;
            newFeature.properties['condition'] = condition;
            
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