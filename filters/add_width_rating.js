/**
 * Width Rating Filter
 * This Filter Appends Width Rating to the data
 * 
 */

function filter(data, parameters){
    let output = [];
    for(const feature of data){
        let newFeature = feature;
        let width_ratio = newFeature.properties['width_ratio'];
        
        let width_rating;
        if(width_ratio > 1) width_rating = 1.0;
        else if(width_ratio < 0.5) width_rating = 0.1;
        else width_rating = 3.6 * (width_ratio - 0.5)**2 + 0.1;
        
        // round to 4 decimal digits
        width_rating = Math.round(width_rating * 1e4) / 1e4;
        newFeature.properties['width_rating'] = width_rating;
        
        output.push(newFeature)
    }

    return output
}

module.exports = {
    filter,
    "priority":0
}