
import * as puppeteer from "puppeteer";
import * as request from "request";
import * as fs from "fs";
import * as https from "https";

export async function download(uri: string, catalog: string, filename: any) {
  return new Promise(resolve => {
    if (!fs.existsSync(catalog)) {
      let arrayDir: fs.PathLike[] = ('portal-images\/images\/' + catalog + '\/').split('\/');
      arrayDir.reduce((accumulator, currentValue, index) => {
        if (index === 1) accumulator = `../${accumulator}`;
        if (!fs.existsSync(`${accumulator}`)) fs.mkdirSync(accumulator);
        return `${accumulator}\/${currentValue}`;
      })
    }

    if (fs.existsSync(catalog + filename + '_z.png')) return resolve(true);
    request.head(uri, async (_err, _res, _body) => {
      const fileStream = fs.createWriteStream(`..\/portal-images\/images\/${catalog}${filename.toLowerCase()}_z.png`);
      request(uri).pipe(fileStream).on('close', () => {
        fileStream.close()
        return resolve(this);
      })
    })
  });
};

export async function downloadPDF(filename: void | String, page: puppeteer.Page) {

  await page.goto(`https://www.villeroy-boch.ru/poisk.html?q=${filename}#/q/${filename}/`);

  let url = await page.evaluate(() => {
    return document.querySelector('.epoq_resultrow.epoq_grid').querySelector('a').href;
  });
  await page.goto(url);

  url = await page.evaluate(() => {
    const link: any = document.querySelector('a.internal-link');
    return link.href;
  })

  await page.goto(url);

  url = await page.evaluate(() => {
    for (let elem of document.querySelectorAll('a')) {
      if (elem.textContent.trim() == 'Технический паспорт (PDF)') return elem.href;
    }
    return null
  })

  if (!fs.existsSync(`/Villeroy/${filename}`)) {
    let arrayDir: fs.PathLike[] = (`Villeroy/${filename}\/`).split('\/');
    await arrayDir.reduce((accumulator, currentValue, index) => {
      if (index === 1) accumulator = accumulator;
      if (!fs.existsSync(accumulator)) fs.mkdirSync(accumulator);
      return `${accumulator}\/${currentValue}`;
    })
  }

  return new Promise(resolve => {
    request.head(url, async (_err, _res, _body) => {
      const fileStream = fs.createWriteStream(`Villeroy/${filename}/${filename}.pdf`);
      request(url).pipe(fileStream).on('close', () => {
        resolve(fileStream.close());
      })
    })
  })
}

export async function downloadArrayImage(filename: void | String, arrayLinkImage: any) {
  
  if (!fs.existsSync(`/Villeroys/`)) {
    let arrayDir: fs.PathLike[] = (`Villeroys\/`).split('\/');
    await arrayDir.reduce((accumulator, currentValue, index) => {
      if (index === 1) accumulator = accumulator;
      if (!fs.existsSync(accumulator)) fs.mkdirSync(accumulator); // создаем каталог
      return `${accumulator}\/${currentValue}`;
    })
  }
  

  return new Promise((resolve, _reject) => {
    for (let index = arrayLinkImage.length - 1; index--;) {

      let url = arrayLinkImage[index];
      console.log('url');
      console.log(`https://santehnika-online.ru${url}`);
      console.log('url');
      fs.createWriteStream(`Villeroys/${filename}_${index}.png`);

      const fileStream = fs.createWriteStream(`Villeroys/${filename}_${index}.png`);
      https.get(`https://santehnika-online.ru${url}`, (resp) => {
        resp.pipe(fileStream)
      })
    }
    resolve('done!');
  })

} 
