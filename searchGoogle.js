const puppeteer = require('puppeteer');
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