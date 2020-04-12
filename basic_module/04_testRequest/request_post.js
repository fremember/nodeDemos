let request = require('request')

request.post('http://127.0.0.1:3000', { form: { name: 'pxy', book: 'node.js' } }, (error, response, result) => {
	console.log(result)
})