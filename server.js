const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const superagent = require('superagent');

app.use(express.static('./public'));
app.use(cors());

//Proxy route for github API requests
app.get('/github/*', (request, response) => {
  console.log(`Routing A GitHub API request for ${request.params[0]}`);
  const url = `https://api.github.com/${request.params[0]}`;
  superagent(url)
    .set(`Authorization`, `token ${process.env.GITHUB_TOKEN}`)
    .then(repos => response.send(repos.text),
      err => response.send(err));
})

app.get('/', (req, res) => {
  res.sendFile('index.html')
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
