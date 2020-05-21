import * as fs from 'fs';


let array = [...JSON.parse(fs.readFileSync('urlSantech3.json', 'utf-8')), ...JSON.parse(fs.readFileSync('urlSantech31.json', 'utf-8'))];

const newArray = [];

array.map(val => {
    if(!(newArray.indexOf(val) + 1) && (val.indexOf('komplekt') + 1)){
        newArray.push(val);
    }
})

fs.writeFileSync('komplect.json', JSON.stringify(newArray));