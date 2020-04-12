let request = require('request')
request.get('http://127.0.0.1:3000', (err, response, result) => {
	// console.log(err)
	console.log(result)
	// console.log(response)
})