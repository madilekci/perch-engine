import puppeteer from'puppeteer';
import cheerio from 'cheerio';

const parseSearchResults = async (rawData) => {
    const $ = cheerio.load(rawData);

    const searchResultsList = [];
    const searchResultsSelectorString = 'div > style + div';
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
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(`https://google.com/search?q=${searchQuery}`,  { waitUntil: 'networkidle0' });

    const rawData = await page.evaluate(() => document.querySelector('*').outerHTML);
    const results = await parseSearchResults(rawData);

    await browser.close();

    return results;
};

module.exports = searchGoogle;