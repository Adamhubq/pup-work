import * as fs from "fs";

(async () => {
    const arrprevObject: Array<Object> = await JSON.parse(fs.readFileSync('products.json', 'utf-8'));
    
    let arrayKeys = [''];
     

    arrprevObject.map( val => {
        Object.keys(val).map( keys => {
            return (arrayKeys.indexOf(keys) + 1) ? '' : arrayKeys.push(keys);
        })
    })
    
    fs.writeFileSync('property.json', JSON.stringify(arrayKeys))

})();