const { rawListeners } = require("process");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Learning Node.js Assignment</title></head>');
        res.write('<body>Hello, this is node</body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="user-name"><button type="submit">Send</button></form></body>');
        res.write('</html>');
		return res.end();
    }
    if(url === '/users'){
        res.write('<html>');
        res.write('<ul><li>User 1 </li><li>User 2</li><li>User 3</li></ul>')
        res.write('</html>');
    }
    if(url === '/create-user'  && method === 'POST'){
        const body = [];
		req.on('data', chunk => {
			console.log(chunk);
			body.push(chunk);
		});
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
			return res.end();
		});
    }
}

exports.handler = requestHandler;
