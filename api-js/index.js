// dependencies:


// cheerio
// we'll use it to pick up html elements from a web page.
// this is identical to jQuery's selections

// express
// backend framework for node js
// this is the server that will be used to host our web app

// axios 
// (Promise based HTTP client)
// used to make http requests to the web
// we can GET, POST, PUT, DELETE, data from the web

// nodemon
// a tool that will restart the server
// when it detects a change in the code,
// this is a good way to make sure that
// our server is always up to date.



// npm i cherrio axios express nodemon --save
// or
// yarn add cheerio axios express nodemon


const PORT = 6969
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

// to initialize using express. we'll call express funtion.
const app = express()


const articles = []


// when a request comes in, we'll call the function
// app.get() to handle the request.
// the first argument is the route, and the second is the function
// '/' is the root route, home page
app.get('/', (req, res) => {
    res.json('Welcome to CP24 News API')
})


// SCRAPIING FUNCTION

// this will return all html of the url in the request
// then cheerio will parse the html and return the data
// cheerio.load() function will load the html
app.get('/news', (req, res) => {
    const url = 'https://www.cp24.com/'
    // this will return a promise
    axios.get(url).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        // this will allow us to select the html elements
        // the syntax is the same as jQuery
        // example:
        // $('h1').text()
        // this will return the text of the h1 element
        $('li.newUpdate').each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })
        })
        res.json(articles)
    }).catch((err) => console.log(err))
})





// express comes with a listen function
// this function will start the server
// and listen for requests on a specific port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))


