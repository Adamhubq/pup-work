import * as puppeteer from "puppeteer";
import * as fs from "fs";
import * as download from "./download";
// import * as request from "request";

export const transl = {
    'А': 'A',
    'а': 'a',
    'Б': 'B',
    'б': 'b',
    'В': 'V',
    'в': 'v',
    'Г': 'G',
    'г': 'g',
    'Д': 'D',
    'д': 'd',
    'Е': 'E',
    'е': 'e',
    'Ё': 'Yo',
    'ё': 'yo',
    'Ж': 'Zh',
    'ж': 'zh',
    'З': 'Z',
    'з': 'z',
    'И': 'I',
    'и': 'i',
    'Й': 'J',
    'й': 'j',
    'К': 'K',
    'к': 'k',
    'Л': 'L',
    'л': 'l',
    'М': 'M',
    'м': 'm',
    'Н': 'N',
    'н': 'n',
    'О': 'O',
    'о': 'o',

    'П': 'P',
    'п': 'p',
    'Р': 'R',
    'р': 'r',
    'С': 'S',
    'с': 's',
    'Т': 'T',
    'т': 't',
    'У': 'U',
    'у': 'u',
    'Ф': 'F',
    'ф': 'f',
    'Х': 'X',
    'х': 'x',
    'Ц': 'C',
    'ц': 'c',
    'Ч': 'Ch',
    'ч': 'ch',
    'Ш': 'Sh',
    'ш': 'sh',
    'Щ': 'Shh',
    'щ': 'shh',
    'Ъ': 'y',
    'ъ': 'y',
    'Ы': "Y'",
    'ы': "y'",
    'Ь': "y",
    'ь': "y",
    'Э': "E'",
    'э': "e'",
    'Ю': 'Yu',
    'ю': 'yu',
    'Я': 'Ya',
    'я': 'ya',
    ' ': '_',
    '-': '-',
    ',': '',
    '*': '',
    '\\': '',
    '\/': '',
    '+': '',
    '(': '',
    ')': '',
    ':': '',
}


export async function getLinkElement(page: puppeteer.Page, bossLink: string) {
    await page.goto(bossLink);
    let increment = await page.evaluate(
        () => +document.querySelectorAll('.b-pagination__item-text')[document.querySelectorAll('.b-pagination__item-text').length - 2].textContent + 1
    )
    let arrayElementLink = [];
    for (; increment--;) {
        try {

		
	    if (increment > 711) continue;
            if (!(increment % 5)) await timeoutPromise();

            console.log(increment);
            await timeoutPromise2s();
            console.log(increment);

            console.log(`${bossLink}?PAGEN_1=${increment}`);
            await page.goto(`${bossLink}?PAGEN_1=${increment}`);
            console.log('end times');

            const postsSelector = '.b-preview-product__title';
            await page.waitForSelector(postsSelector, {
                timeout: 35000
            });
            console.log('postsSelector');
            const add = await page.$$eval(
                postsSelector, postLinks => postLinks.map((link: any, _arrayJson) => {
                    return link.href;
                }));

            console.log('postsSelector');
            if (!fs.existsSync('urlSantech.json')) fs.writeFileSync('urlSantech.json', '[]');

            let json = [];
            console.log('prev-open');
            let arr = JSON.parse(fs.readFileSync('urlSantech.json', 'utf-8'));
            console.log('open');

            if (arr.length) { json = arr.map(val => val) };
            json = json.concat(add);
            console.log('prev-write');
            fs.writeFileSync('urlSantech.json', JSON.stringify(json));
            console.log('write');

        } catch (error) {
            console.log(error);
            console.log(increment);
            increment++;
            await timeoutPromise();
        }
    }
    return arrayElementLink;
}

export function tranlit(str) {
    let result = '';
    for (let i = 0; str.length > i; i++) {
        if (transl[str[i]] != undefined) result += transl[str[i]];
        else { result += str[i]; }
    }
    return result;
}

export async function getArrayName(pageSantehnika) {
    return await pageSantehnika.$$eval(
        '.p-card-b-spec__property', arr => arr.map(el => {
            return el.querySelector('.p-card-b-spec__property-name--text').textContent;
            // switch (el.querySelector('.p-card-b-spec__property-name--text').textContent) {
            //     case 'Тип унитаза': // у Артура
            //         return 'ToiletTypeMount'
            //     case 'Режим слива воды':
            //         return 'TankDrain'
            //     case 'Направление выпуска':
            //         return 'uToiletDirection'
            //     case 'Организация смывающего потока':
            //         return 'TankDrain'
            //     case 'Материал унитаза':
            //         return 'uToiletMaterial'
            //     case 'Длина, см':
            //         return 'cToiletLength'
            //     case 'Ширина, см':
            //         return 'fToiletWidth'
            //     case 'Высота, см':
            //         return 'fullToiletHeight'
            //     case 'Высота чаши, см':
            //         return 'fToiletHeight'
            //     case 'Механизм слива':
            //         return 'cToiletGear'
            //     case 'Метод установки сливного бачка':
            //         return 'BoilerMount'
            //     case 'Материал сиденья':
            //         return 'CapMaterial'
            //     case 'Гарантия':
            //         return 'TankWarranty'
            //     case 'Страна':
            //         return 'CeraTileProduction'
            //     case 'Цвет':
            //         return 'SetButtomColorToilet'
            //     case 'Стилистика дизайна':
            //         return 'uToiletDesign'
            //     case 'Цвет сиденья':
            //         return 'cToiletColorCap'
            //     case 'Форма':
            //         return 'TreshForm'
            //     case 'Сиденье в комплекте':
            //         return 'wCabinSit'
            //     case 'Сиденье с микролифтом':
            //         return 'fToiletMicrolift'
            //     case 'Материал':
            //         return 'CapMaterial'
            //     case 'Быстросъемное сиденье':
            //         return 'ToiletFast'
            //     case 'Система антивсплеск':
            //         return 'uToiletAntisplash'
            //     case 'Материал':
            //         return 'CapMaterial'
            //     case 'Объем смывн. бачка, л':
            //         return 'TankVolume'
            //     case 'Артикул':
            //         return 'article'
            //     case 'Область применения':
            //         return 'TankArea'
            //     case 'Безободковый':
            //         return 'uToiletRimless'
            //     case 'Функция биде':
            //         return 'ToiletBidet'
            //     case 'Подвод воды':
            //         return 'BidetDirection'
            //     case 'Межосевое расстояние под крепеж. шпильки':
            //         return 'ToiletFurnitureW'
            //     default:
            //         return '';
            // }
        })
    );
}
export async function getArrayValue(pageSantehnika) {
    return await pageSantehnika.$$eval(
        '.p-card-b-spec__property', arr => arr.map(el => el.querySelector('.p-card-b-spec__property-value').textContent)
    );
}

export async function log(str) {
    console.log('0000000');
    console.log(str);
    console.log('0000000');
    if (!fs.existsSync('log.json')) await fs.writeFileSync('log.json', '[]');
    let arr = await JSON.parse(fs.readFileSync('log.json', 'utf-8'));
    let json = [];
    if (arr.length) { json = arr.map(val => val) };
    json.push(str);
    fs.writeFileSync('log.json', JSON.stringify(json));
}

export async function initialJsonArray(browser: puppeteer.Browser, arrayLink: string[]) {
    try {
        console.log('initialJsonArray');
        let arrayPushJson: Array<Object> = new Array();
        let pageSantehnika = await browser.newPage();
        // let pageVilleroyBoch = await browser.newPage();
        let incr = 0;
        console.log('initialJsonArray---iterable');
        for (let i = arrayLink.length - 1; i--;) {
            let iterator = arrayLink[i];
            try {
                try {
                    console.log(incr);
		    
                    incr++;

		    if (incr < 364) continue;


                    if (incr > 8000) continue;
                    if (!(incr % 5)) await timeoutPromise2s();
		    if (!(incr % 10)) await timeoutPromise();
 
                    if (!(incr % 500)) {
                        for (let i = 3;i--;) {
                            await timeoutPromise();
                        }
                    }

                    await pageSantehnika.goto(iterator);
                    await pageSantehnika.evaluate(() => {
                        return document.querySelector('.p-card-b-prices__row.p-card-b-prices__row--unavailable') ?
                            document.querySelector('.p-card-b-prices__row.p-card-b-prices__row--unavailable').textContent : ''
                    });

                    console.log('iterator');
                    console.log(iterator);
                    console.log('iterator');

                    
                    await timeoutPromise2s();
                    // const button1 = 
		    const postsSelectot = '.b-simple-button--style-default.p-card-b-spec__header-button.b-simple-button.b-simple-button--margin-auto.b-simple-button--status-initial';
                    
		    await pageSantehnika.waitForSelector(postsSelectot, {
                        timeout: 350000
                    });


                    // const button2 = 
                    await pageSantehnika.$eval('.p-card-b-media__main-content-event',
                        (el: any) => el.click()
                    );
                } catch (err) {
                    console.log(err);
                    console.log('err');
                    await log(iterator);
                    continue;
                }

                // await button1.evaluate((button: any) => button.click());
                // await button2.evaluate((button: any) => button.click());

                let model: any = await getArticle(pageSantehnika) || `no_model-${incr}`;
                model = tranlit(model);

                const brand = await pageSantehnika.evaluate(() => {
                    let bran: String;
                    document.querySelectorAll('.p-card-b-info-model__row').forEach(val => {
                        if (val.querySelector('.p-card-b-info-model__property-cell').textContent !== 'Бренд') return;
                        bran = val.querySelector('.p-card-b-info-model__property-value').textContent;
                    })
                    return bran;
                })
                const kollektion = await pageSantehnika.evaluate(() => {
                    let koll: String;
                    document.querySelectorAll('.p-card-b-info-model__row').forEach(val => {
                        if (val.querySelector('.p-card-b-info-model__property-cell').textContent !== 'Коллекция') return;
                        koll = val.querySelector('.p-card-b-info-model__property-value').textContent;
                    })
                    return koll;
                })
                // const modl = await pageSantehnika.evaluate(() => {
                //     let modl: String;
                //     document.querySelectorAll('.p-card-b-info-model__row').forEach(val => {
                //         if (val.querySelector('.p-card-b-info-model__property-cell').textContent !== 'Модель') return;
                //         modl = val.querySelector('.p-card-b-info-model__property-value').textContent;
                //     })
                //     return modl;
                // })
                const country = await pageSantehnika.evaluate(() => {
                    let countr: String;
                    document.querySelectorAll('.p-card-b-info-model__row').forEach(val => {
                        if (val.querySelector('.p-card-b-info-model__property-cell').textContent !== 'Страна') return;
                        countr = val.querySelector('.p-card-b-info-model__property-value').textContent;
                    })
                    return countr;
                })

                const category = await pageSantehnika.evaluate(() => {
                    // let categ: String;
                    return document.querySelector('h1').textContent.split(' ')[0].split('-')[0];
                })

                const linksImage = await pageSantehnika.$$eval(
                    '.p-card-b-media__photo-big', arr => arr.map(el => el.getAttribute('src'))
                );

                // const propertiesName = await pageSantehnika.$$eval(
                //     '.p-card-b-spec__property-name--text', arr => arr.map(el => el.textContent)
                // );
                // const propertiesVal = await pageSantehnika.$$eval(
                //     '.p-card-b-spec__property-value', arr => arr.map(el => el.textContent)
                // );


                const prevpropertiesName = await getArrayName(pageSantehnika);
                const prevpropertiesValue = await getArrayValue(pageSantehnika);
                const name = await pageSantehnika.$eval('h1', el => el.textContent);


                download.downloadArrayImage(model, linksImage)
                    .then(() => console.log('good'))
                    .catch(er => (console.log(er), console.log('er')));


                let obj = {
                    name: name,
                    brand: brand,
                    model: model,
                    MerchFVidGId: category,
                    kollektion: kollektion,
                    country: country,
                    // allProperty: ,
                    imageFile: `${model}.png`
                };

                prevpropertiesName.map((val, index) => {

                    if (!val) return;
                    const objT = {};
                    objT[val] = +prevpropertiesValue[index] == +prevpropertiesValue[index] ?
                        +prevpropertiesValue[index] : prevpropertiesValue[index];
                    Object.assign(obj, objT);
                })


                if (!fs.existsSync('products.json')) {
                    await fs.writeFileSync('products.json', '[]');
                }


		if (!fs.existsSync('finish.json')) {
                    await fs.writeFileSync('finish.json', '[]');
                }


                let lastArray: Object[] = JSON.parse(fs.readFileSync("products.json", "utf8"));
                let newArray = [];


                if (lastArray.length)
                    lastArray.map(val => newArray.push(val));

                console.log(obj)
                newArray.push(obj);

                fs.writeFileSync('products.json', JSON.stringify(newArray));


		let lastArrayFinish: Object[] = JSON.parse(fs.readFileSync("finish.json", "utf8"));
                let newArrayFinish = [];
                

		if (lastArrayFinish.length)
                    lastArrayFinish.map(val => newArrayFinish.push(val));

                console.log(obj)
                newArrayFinish.push(obj);

                fs.writeFileSync('finish.json', JSON.stringify(newArrayFinish));





            } catch (error) {
                console.log(error);
                i++
                await timeoutPromise();
            }
        }

        return arrayPushJson;
    } catch (error) {
        console.log('-----');
        console.log(error);
        console.log('-----');
        return {};
    }
}
// ———————————————-----__---------------------------------------- image-modal
export async function put2File(page: puppeteer.Page, link: string) {
    await page.goto(link);
    await page.evaluate(() => {
        const button: any = document.querySelector('.p-card-b-media__main-content-event');
        button.click();
    });
    const postsSelector = '.b-card-p-card-gallery__image';
    await page.waitForSelector(postsSelector, {
        timeout: 0
    });
    const add = await page.$$eval( // запрос списка ссылок
        postsSelector, postLinks => postLinks.map((link: any, _arrayJson) => {
            return link.src;
        }));
    fs.writeFileSync('test.json', JSON.stringify(add));
}

export function trimStr(str) {
    let arrstr = str.replace(/ alpin/gim, '').split(' ');
    switch (arrstr[arrstr.length - 1].length) {
        case 8:
            return arrstr[arrstr.length - 1]
        case 2:
            return arrstr[arrstr.length - 3] + arrstr[arrstr.length - 2] + arrstr[arrstr.length - 1]
        case 4:
            return arrstr[arrstr.length - 2] + arrstr[arrstr.length - 1]
    }
    return null;
}

export async function timeoutPromise() {
    return new Promise(res => {
        setTimeout(() => {
            res('prop');
        }, 60000)
    })
}
export async function timeoutPromise2s() {
    return new Promise(res => {
        setTimeout(() => {
            res('prop');
        }, 5000)
    })
}


export async function getArticle(page: puppeteer.Page) {
    try {
        const models = await page.evaluate(
            () => {
                let model: String;
                document.querySelectorAll('.p-card-b-info-model__row').forEach(val => {
                    if (val.querySelector('.p-card-b-info-model__property-cell').textContent !== 'Модель') return;
                    model = val.querySelector('.p-card-b-info-model__property-value').textContent;
                })
                return model;
            }
        )
        return models;
    } catch (er) {
        return console.log(er);
    }
}

(async () => {
    const browser: puppeteer.Browser = await puppeteer.launch({
        headless: true,
	args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const cookie: puppeteer.SetCookie[] = [ // cookie exported by google chrome plugin
        {
            "domain": "httpsbin.org",
            "httpOnly": false,
            "name": "abracham",
            "path": "/",
            "secure": false,
            "session": true,
            "value": "value!"
        }
    ];
    const page: puppeteer.Page = await browser.newPage();

    await page.setCookie(...cookie);

   // await getLinkElement(page, 'https://santehnika-online.ru/santehnika/');

    // const urls = ["https://santehnika-online.ru/product/unitaz_podvesnoy_villeroy_boch_memento_5628_10r1_alpin/"];
    // console.log(urls.length);
    try {
        let urls = fs.readFileSync("urlSantech.json", "utf8");
        // fs.writeFileSync('testUrls.json', JSON.stringify(urls));l
        const jspo = await initialJsonArray(browser, JSON.parse(urls));
        fs.writeFileSync('test22.json', JSON.stringify(jspo));
        await browser.close();
    } catch (error) {
    }
})();
