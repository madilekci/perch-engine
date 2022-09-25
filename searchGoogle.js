import puppeteer from'puppeteer';
import cheerio from 'cheerio';

const parseSearchResults = async (rawData) => {
    const $ = cheerio.load(rawData);

    const searchResultsList = [];
    const searchResultsSelectorString = 'div > style + div';
    $('#rso [data-sokoban-container]')
        .each((index, element) => {
            searchResultsList.push($(element));
        });
    
    // parse searchResultsList
    let parsedSearchList = [];
    searchResultsList.forEach(searchResult => {
        // Kot - Vikipedi
        const pageName = searchResult.find('[data-header-feature=0] div a h3').text();

        // Türk Dil Kurumu tarafından "giysi yapılan bir tür mavi, kaba pamuklu kumaş, blucin" olarak tanımlanmaktadır.. (Amerikan) Kovboy tarzı Kot pantolon ...
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
    /**
     * It would be more ideal if we went to search page directly
     * by using query parameter like this :  
     * await page.goto(`https://google.com/search?q=${searchQuery}`);
     * We won't use that way since all point of this project is 
     * to try puppeter more.
     * */ 
    await page.goto('https://google.com');

    //Find input element with name 'q' and type searchQuery
    await page.type('input[name="q"]', searchQuery);
    /**
     * Again would be more ideal if we pressed Enter but 
     * in this example project, we will press the button instead.
     * await page.keyboard.press('Enter');
    */
    // Click to 'Google Search' button
    await page.$eval('input[name=btnK]', button => button.click());
    await page.waitForNavigation();

    const rawData = await page.evaluate(() => document.querySelector('*').outerHTML);
    const results = await parseSearchResults(rawData);

    await browser.close();

    return results;
};

module.exports = searchGoogle;