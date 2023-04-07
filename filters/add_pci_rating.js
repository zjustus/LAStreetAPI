/**
 * Width Rating Filter
 * This Filter Appends Width Rating to the data
 * 
 */

function filter(data, parameters){
    let output = [];
    for(const feature of data){
        let newFeature = feature;        
        let pci = newFeature.properties['pci'];
        
        let pci_rating;
        pci_rating = (pci / 100) ** 2;
        pci_rating = Math.round(pci_rating * 1e4) / 1e4;
        newFeature.properties['pci_rating'] = pci_rating;
        
        output.push(newFeature)
    }

    return output
}

module.exports = {
    filter,
    "priority":0
}