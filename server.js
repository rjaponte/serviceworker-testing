const express = require('express');
const fetch = require('node-fetch');
const API_BASE = "https://en.wikipedia.org/api/rest_v1/page/mobile-sections";

const app = express();

const port = process.env.production !== 'production' ? 8080 : process.env.PORT;

// route for service worker
app.get(/service-worker\.js/, function(request, response) {
  response.sendFile(__dirname + `/dist/service-worker.js`);
});

// route for wiki API requests
app.get('/api/wiki/:pageTitle', async(req, res, next) => {
  const pageTitle = req.params.pageTitle;

  const requestURL = new URL(`${API_BASE}/${pageTitle}`);

  let response = await fetch(requestURL, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
    console.error('Issue with data being returned: ', response);
    res.send(`<h1>Search not valid!</h1>`);
    return;
  }
  
  let responseText = await response.json();
  
  let responseArticle = responseText.lead.sections[0].text;
  
  responseArticle += responseText.remaining.sections.map(section => `<h${section.toclevel}>${section.line}</h${section.toclevel}>` + section.text).reduce((a,b) => a + b);
  
  //responseArticle += remainingArticles;

  // rewrite relative links
  responseArticle = responseArticle.replace(/src="\/\//g, 'src="https://');
  // add crossorigin attribute so SW can handle requests
  responseArticle = responseArticle.replace(/<img /g, '<img crossorigin="anonymous" ');

  res.send(responseArticle);
});

app.use(express.static('dist'));

// return index file to all other navigation requests
app.get(/.*/, function(request, response) {
  if (request.get('Referrer') === undefined)
    response.sendFile(__dirname + `/dist/index.html`);
});

const listener = app.listen(port, function() {
  console.log('Your server is running on port ' + listener.address().port);
  console.log('Your site is running on ' + listener.address());
});