import * as url from 'url';
import * as stringDecoder from 'string_decoder';

import { handlers, router } from './router';
import { JsonFile } from './utils/JsonFile';

const StringDecoder = stringDecoder.StringDecoder;
const _jsonFile = new JsonFile();

const handleServer = (req, res) => {
	// Handle Path & Query String
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');

	// Get Query string as an Object
	const queryStringObject = parsedUrl.query;

	// Get Req Method
	const method = req.method.toLocaleLowerCase();

	// Get Req Headers
	const headers = req.headers;

	// Get Payload Stream
	const decoder = new StringDecoder('utf-8');
	let buffer: any = '';

	req.on('data', (data: any) => {
		buffer += decoder.write(data);
	});

	req.on('end', () => {
		buffer += decoder.end();

		// Constrat the Data Object From Req
		const data = {
			path: trimmedPath,
			query: queryStringObject,
			method: method,
			headers: headers,
			payload: buffer
		};

		// Choose the right handler request
		let chosenRouterHandler =
			typeof router[trimmedPath] !== 'undefined'
				? router[trimmedPath]
				: handlers.notFound;

		chosenRouterHandler(data, (statusCode, payload) => {
			// Handle empty status code as 200 OK
			statusCode = typeof statusCode === 'number' ? statusCode : 200;

			// Handle empty payload
			payload = typeof payload === 'object' ? payload : {};

			// Convert payload Object into a string
			const payloadString = JSON.stringify(payload);

			// Return The Response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			console.log('Returning this response:', statusCode, payloadString);
		});
	});
};

export default handleServer;
