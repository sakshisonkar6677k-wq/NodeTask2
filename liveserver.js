const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(`
            <html>
            <head>
                <title>Node.js Task 2</title>
            </head>

            <body>
                <h1>Node.js Live Server</h1>

                <form action="/submit" method="GET">

                    <label>Enter your name:</label>
                    <input type="text" name="name" required>

                    <br><br>

                    <label>Enter your message:</label>
                    <input type="text" name="message" required>

                    <br><br>

                    <button type="submit">Submit</button>

                </form>
            </body>
            </html>
        `);
    }

    else if (parsedUrl.pathname === '/submit') {

        const name = parsedUrl.query.name;
        const message = parsedUrl.query.message;

        const data = `Name: ${name}, Message: ${message}\n`;

        fs.appendFile('submissions.txt', data, (err) => {

            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error saving data');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.end(`
                <h1>Data Saved Successfully!</h1>
                <p>Thank you, ${name}.</p>
                <a href="/">Go Back</a>
            `);
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});