// Slider defaults
let sliderInputArray = {
    'widthRW': 0.33,
    'pciRW': 0.33,
    'curbRW': 0.26,
    'sidewalkRW': 0.07,
    'distanceW': 0.25,
    'populationW': 0.25,
    'timeW': 0.25,
    'widthW': 0.25
};

/*** Static Calculation Section
 * 
 * These are calculations that are added to the feature
 * These should not be in the JSON file but do not change for the duration of the application
 * 
 ***/

// width rating = actual width / designation width
let width_ratio = feature.properties['width_ratio'];
let width_rating;
if(width_ratio > 1) width_rating = 1.0;
else if(width_ratio < 0.5) width_rating = 0.1;
else width_rating = 3.6 * (width_ratio - 0.5)**2 + 0.1;
// round to 4 decimal digits
width_rating = Math.round(width_rating * 1e4) / 1e4;
feature.properties['width_rating'] = width_rating;

// pci rating = pci ^ 2 / 100
let pci = feature.properties['pci'];
let pci_rating;
pci_rating = (pci / 100) ** 2;
pci_rating = Math.round(pci_rating * 1e4) / 1e4;
feature.properties['pci_rating'] = pci_rating;

//curb rating = designated curb points / section length
let curb_ratio = feature.properties['curb_ratio'];
let curb_rating;
if(curb_ratio > 0.25) curb_rating = 1;
else if(curb_ratio < 0) curb_rating = 0.1;
else curb_rating = 14.4 * curb_ratio ** 2 + 0.1;
curb_rating = Math.round(curb_rating * 1e4) / 1e4;
feature.properties['curb_rating'] = curb_rating;

//sidewalk rating = designated sidewalk points / section length
let sidewalk_ratio = feature.properties['sidewalk_ratio'];
let sidewalk_rating;
if(sidewalk_ratio > 0.19) sidewalk_rating = 1;
else if(sidewalk_ratio < 0) sidewalk_rating = 0.1;
else sidewalk_rating = 24.931 * sidewalk_ratio ** 2 + 0.1;
sidewalk_rating = Math.round(sidewalk_rating * 1e4) / 1e4;
feature.properties['sidewalk_rating'] = sidewalk_rating;

/*** Dynamic Calculation Section
 * 
 * These are calculations that are dependent upon the slider parameters
 * 
 */

// Condition Calculation
// where i is a street and the values has been calculated above. 
let sumUserInput = 
    sliderInputArray['widthRW'] + 
    sliderInputArray['pciRW'] + 
    sliderInputArray['curbRW'] + 
    sliderInputArray['sidewalkRW'];

let condition = 0;
condition += i['width_rating'] * sliderInputArray['widthRW'];
condition += i['pci_rating'] * sliderInputArray['pciRW'];
condition += i['curb_rating'] * sliderInputArray['curbRW'];
condition += i['sidewalk_rating'] * sliderInputArray['sidewalkRW'];
condition /= sumUserInput
i['condition'] = condition;

// Importance Calculations
// where i is a street and the values are properties there of
let importance = 0
importance += i['centrality_distance'] * sliderInputArray['distanceW'];
importance += i['centrality_time'] * sliderInputArray['timeW'];
importance += i['centrality_width'] * sliderInputArray['widthW']; 
importance += i['centrality_population'] * sliderInputArray['populationW'];
i['importance'] = importance;  


/*** Categorical Classification section
 * These are input arrays for categorizing streets
 * 
 */

const communityDropdown = {
    'Non disadvantage Community': 'nondisadvantage',
    'Disadvantage Community': 'disadvantage',
    'Low Income': 'lowincome',
}

const withdrawnDropdown = {
    'Withdrawn': 'withdrawn',
    'Not Withdrawn': 'notwithdrawn',
}

const maintainDropdown = {
    'Maintained': 'maintain',
    'Not Maintained': 'notmaintain',
}

const locationDropdown = {
    'North Los Angeles': 'northla',
    'Central Los Angeles': 'centralla',
    'South Los Angeles': 'southla',
}

const councilDropdown = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '11': 11,
    '12': 12,
    '13': 13,
    '14': 14,
    '15': 15,
}

const designationDropdown = {
    'Avenue I ': 'Avenue I',
    'Avenue II ': 'Avenue II',
    'Avenue III ': 'Avenue III',
    'Boulevard I ': 'Boulevard I',
    'Boulevard II ': 'Boulevard II',
    'Collector ': 'Collector',
    'Hillside Collector ': 'Hillside Collector',
    'Local Street - Standard ': 'Local Street - Standard',
    'Modified Avenue I ': 'Modified Avenue I',
    'Modified Avenue II ': 'Modified Avenue II',
    'Modified Avenue III ': 'Modified Avenue III',
    'Modified Boulevard II ': 'Modified Boulevard II',
    'Modified Collector ': 'Modified Collector',
    'Modified Local Street Standard ': 'Modified Local Street Standard',
    'Modified Scenic Arterial Mountain ': 'Modified Scenic Arterial Mountain',
    'Mountain Collector ': 'Mountain Collector',
    'Private ': 'Private',
    'Scenic Parkway ': 'Scenic Parkway',
    'Unidentified ': 'Unidentified',
}