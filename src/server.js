const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posts', (req, res) => {
  let data = '';
  fs.readFile(path.resolve(__dirname, 'data.json'), (err, resp) => {
    if (err) return console.log('Error::reading data from data.json file ', err);
    data = JSON.parse(resp);
    res.send(data.posts);
  });
});

app.post('/posts', (req, res) => {
  fs.readFile(path.resolve(__dirname, 'data.json'), (err, resp) => {
    if (err) return console.log('Error::reading data from data.json file ', err);
    let json = JSON.parse(resp);
    json.posts.push(req.body);
    fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(json), err => {
      if (err) return console.log('Error::writing data to the data.json file ', err);
    });
  });
  res.send({ message: 'Success' });
});

app.use('/', express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app
  .listen(port, () => {
    console.info(`Doraemon is running on http://localhost:${port}`);
  })
  .on('error', () => {
    console.error('Error::server ', error);
  });
