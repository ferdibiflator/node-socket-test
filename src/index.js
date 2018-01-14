const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)

const Generator = require('./Generator');


const generator = new Generator();

generator.subscribeOnList((list) => {
	io.emit('list', list);
});

app.get('/', (req, res) =>{
	res.sendFile(path.resolve('static/index.html'));
});

io.on('connect', (socket) => {
	socket.on('toggleSpeed', generator.toggleSpeed.bind(generator));
});

http.listen(3000, () => {
	console.log('Server listen on *:3000');

	generator.start();
});