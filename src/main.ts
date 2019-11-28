
import * as puppeteer from "puppeteer";
// import * as fs from "fs";
// import { download } from './download';
import * as oracleConnect from "./oracle-connect";
// import { compare } from 'gm';
// import * as fs  from 'fs';
// import { arrayExpression } from '@babel/types';
// import * as oracledb from "oracledb";

export const getArrayLink: any = async (page) => {
    try {
        // console.log('getArrayLink');
        const pretier = await page.$('.ptb-new-left-menu-firts');
        const postsSelector = 'a';
        await page.waitForSelector(postsSelector, {
            timeout: 0
        });

        // console.log(pretier);
        // console.log('pretier');
        return (await pretier.$$eval( // запрос списка ссылок
            postsSelector, postLinks => postLinks.map((link, _arrayJson) => {
                return link.href;
            }))).filter(value => value.indexOf('section.php') + 1);
    } catch (error) {
        console.log(error);
        console.log('getArrayLink')
    }
}

export async function initPageCategory(page, araayLinkCategory) {
    console.log('initPageCategory');
    const arrayElementLinks = [];
    const oracleConnetcObject: oracleConnect.CreateImg = new oracleConnect.DataBaseOracleAccess();
    await oracleConnetcObject.initialObjectconstructor()
    for (let elementLink = araayLinkCategory.length; elementLink--;) {
        try {
            console.log('iter - ' + araayLinkCategory[elementLink]);
            console.log(araayLinkCategory[elementLink]);
            await page.goto(araayLinkCategory[elementLink]);

            const selImg = '.image';
            const arrayElementImage = await page.evaluate(
                () => !document.querySelector('.image') || document.querySelector('.image').classList.length - 1
            )
            if (typeof arrayElementImage === 'boolean') return console.log("не найдены элементы image");
            await page.waitForSelector(selImg, {
                timeout: 0
            });
            const arrayLink = await page.$$eval( // запрос списка ссылок
                selImg, postLinks => postLinks.map((link, _arrayJson) => {
                    return link.href;
                }));


            const arrLinkElement = await initPageElement(page, arrayLink);

            await oracleConnetcObject.getCollection(arrLinkElement);

            for (let increment = oracleConnetcObject.dbObjectClassProtoGet.length; increment--;) {
                let elem = oracleConnetcObject.dbObjectClassProtoGet[increment];
                console.log(elem.ARTICLE)
                // await download(elem.URL, `KeramaMarazzi\/any`, `\/${elem.ARTICLE.replace(/[\\,\/]/gim, '*')}`);
                console.log('done -' + elem.URL);
                console.log(elem);
            }

            await oracleConnetcObject.setCollection();

            arrayLink.map((value, _index) => {
                arrayElementLinks.push(value);
            })


        } catch (error) {
            console.log(error);
            console.log('getArrayLink')
        }
    }
    return arrayElementLinks;
}


async function initPageElement(page, arrayLinkElement) {
    const jsonArray = []
    for (let elementLink = arrayLinkElement.length; elementLink--;) {
        try {
            console.log(arrayLinkElement[elementLink])
            console.log('arrayLinkElement[elementLink]')
            await page.goto(arrayLinkElement[elementLink]);

            const urlImage = await page.evaluate(
                () => !document.querySelector('a.fancybox') ?
                    document.querySelector('#gallery-carousel').querySelector('img').src :
                    document.querySelector('a.fancybox')["href"]
            );

            // const originName = urlImage.slice(urlImage.lastIndexOf('/') + 1, urlImage.length)
            const originName = urlImage;

            const artikuls = await page.evaluate(
                () => !document.querySelector('.km-detail-new-props-two') ?
                    document.querySelector('#element-info').querySelector('strong').textContent :
                    document.querySelector('.km-detail-new-props-two').querySelector('span').textContent);



            jsonArray.push({
                ARTICLE: artikuls.toLowerCase().trim(),
                PATH: `/image/${artikuls}.png`.toLowerCase().trim(),
                FILENAME: originName.toLowerCase().trim().slice(originName.lastIndexOf('/') + 1, originName.length),
                URL: originName.toLowerCase().trim()
            })

        } catch (error) {
            console.log(error);
            console.log('getArrayLink')
        }
    }
    return jsonArray;
}


(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://santehnika-online.ru/unitazy/brand-villeroy__and__boch_/');
    // const arrayCategory = await getArrayLink(page);
    // const ales = await page.$('.ptb-new-left-menu-firts')


    const postsSelector = '.b-preview-product__title';
    await page.waitForSelector(postsSelector, {
        timeout: 0
    });

    // console.log(pretier);
    // console.log('pretier');
    const ales = await page.$$eval( // запрос списка ссылок
        postsSelector, postLinks => postLinks.map((link: any, _arrayJson) => {
            return link.href;
        }));


    console.log(ales);
    await browser.close();
})();


// (async () => {

//     const browser = await puppeteer.launch({
//         headless: true
//     });
//     const page = await browser.newPage();
//     await page.goto('https://krasnodar.kerama-marazzi.com/ru/production/');


//     const pretier = await page.$('.ptb-new-left-menu-firts');


//     // const ales = await page.$('div');
//     console.log(pretier)
//     await browser.close();

// })();
