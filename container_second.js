const http = require('http');
const csv = require('csv-parser');
const fs = require('fs');

const PORT = 7000;
//const fileName = 
function calculateSum(fileName, product) {
  try {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const rows = fileContent.split('\n');
    let sum = 0;
    
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(',');

      if (columns[0] === product) {
        sum += parseInt(columns[1]);
      }
    }

    return { file: fileName, sum: sum };
  } catch (error) {
    return { file: fileName, error: 'Input file not in CSV format.' };
  }
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/calculate') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });

    req.on('end', () => {
      const jsonData = JSON.parse(requestBody);
      const fileName = `./file/${requestBody.file}`;
      const product = requestBody.product;
      const sumResult = calculateSum(fileName, product);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(sumResult));
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
