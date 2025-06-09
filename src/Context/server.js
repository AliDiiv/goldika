const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const path = require('path');

app.get('/gold-prices', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'dl.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('خطای داخلی سرور');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`سرور در حال اجرا در http://localhost:${port}`);
});
