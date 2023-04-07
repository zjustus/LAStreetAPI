/**
 * Width Rating Filter
 * This Filter Appends Width Rating to the data
 * 
 */

function filter(data, parameters){
    let output = [];
    for(const feature of data){
        let newFeature = feature;        
        let curb_ratio = newFeature.properties['curb_ratio'];
        
        let curb_rating;
        if(curb_ratio > 0.25) curb_rating = 1;
        else if(curb_ratio < 0) curb_rating = 0.1;
        else curb_rating = 14.4 * curb_ratio ** 2 + 0.1;
        curb_rating = Math.round(curb_rating * 1e4) / 1e4;
        newFeature.properties['curb_rating'] = curb_rating;
        
        output.push(newFeature)
    }

    return output
}

module.exports = {
    filter,
    "priority":0
}