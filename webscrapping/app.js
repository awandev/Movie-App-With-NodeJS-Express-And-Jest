const express = require('express');
const app = express();
const path = require('path')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

let browser;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(express.static('public'))

async function scrapeData(url, page) {
    try {
        await page.goto(url, {waitUntil: 'load', timeout: 0});
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        let title = $("h2").text();
        let releaseDate = $(".release_date").text();
        let overview = $(".overview > p").text();
        let userScore = $(".user_score_chart").attr("data-percent");
        let imgUrl = $("#original_header > div.poster_wrapper.false > div > div.image_content.backdrop > img").attr("src")

        browser.close();

        return {
            title,
            releaseDate,
            overview,
            userScore,
            imgUrl
        }
    } catch (error) {
        console.log(error)
    }
}



app.get('/results', async(req, res) => {
    let url = req.query.search;

    browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
        executablePath: '/usr/bin/google-chrome-stable'
    });
    const page = await browser.newPage();

    let data = await scrapeData(url, page);
    res.render('results', {data:data})
})

app.get('/search', (req,res) => {
    res.render('search')
})



app.listen(3000, () => {
    console.log('Server started at port 3000')
})

