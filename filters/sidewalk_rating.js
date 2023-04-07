/**
 * Width Rating Filter
 * This Filter Appends Width Rating to the data
 * 
 */

function filter(data, parameters){
    let output = [];
    for(const feature of data){
        let newFeature = feature;        
        let sidewalk_ratio = newFeature.properties['sidewalk_ratio'];
        
        let sidewalk_rating;
        if(sidewalk_ratio > 0.19) sidewalk_rating = 1;
        else if(sidewalk_ratio < 0) sidewalk_rating = 0.1;
        else sidewalk_rating = 24.931 * sidewalk_ratio ** 2 + 0.1;
        sidewalk_rating = Math.round(sidewalk_rating * 1e4) / 1e4;
        newFeature.properties['sidewalk_rating'] = sidewalk_rating;
        
        output.push(newFeature)
    }

    return output
}

module.exports = {
    filter,
    "priority":0
}