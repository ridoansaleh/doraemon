const express = require('express');
// const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const port =  4000; //process.env.PORT || 3000;
const data = require('./data.json')

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname)));

// app.use('/api', jsonServer.defaults(), jsonServer.router('data.json'));
// app.get('/api', jsonServer.router('data.json'));
app.get('/posts', (req, res) => {
  // res.json({ name: "Ridoan Saleh Nasution" })
  // console.log('res : ', res)
  console.log('posts : ', data)
  res.status(200).send(data.posts)
});

app.post('/posts', (req, res) => {
  // console.log('req : ', req)
  // console.log('req.body : ', req.body)

  console.log('yes : ', JSON.stringify(req.body))

  let newPost = JSON.stringify(req.body)

  console.log('path : ', __dirname)

  fs.readFile(path.resolve(__dirname, 'data.json'), (err, resp) => {
    if (err) return console.log(err);
    console.log('bef : ', resp)
    let json = JSON.parse(resp)
    console.log('__json : ', json.posts)
    json.posts.push(req.body)

    fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(json))
  });

  res.send({ message: 'Success' })  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.info(`Your app is running on http://localhost:${port}`);
}).on('error', () => {
  console.error('There is an error : ', error);
});