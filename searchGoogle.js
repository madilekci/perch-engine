const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const parseSearchResults = async (rawData) => {
    const $ = cheerio.load(rawData);

    const searchResultsList = [];
    $('[data-sokoban-container]')
        .each((index, element) => {
            searchResultsList.push($(element));
        });
    
    // parse searchResultsList
    let parsedSearchList = [];
    searchResultsList.forEach(searchResult => {
        const pageName = searchResult.find('[data-header-feature=0] div a h3').text();
        const description = searchResult.find('[data-content-feature=1] div').text();
        const url = searchResult.find('[data-header-feature=0] div a').attr().href;

        parsedSearchList.push({
            pageName,
            description,
            url
        })
    });
    
    return parsedSearchList
};

const searchGoogle = async (searchQuery) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    //if the page makes a  request to a resource type of image or stylesheet then abort that request
    page.on('request', request => {
        if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
        request.abort();
        else
        request.continue();
    });

    await page.goto(`https://google.com/search?q=${searchQuery}`,  { waitUntil: 'networkidle0' });

    const rawData = await page.evaluate(() => document.querySelector('#rso').outerHTML);
    const results = await parseSearchResults(rawData);

    browser.close();

    return results;
};

module.exports = searchGoogle;