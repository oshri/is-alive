interface IHandler {
	(data: any, cb: Function): void;
}

interface IHandlers {
	ping: IHandler;
	notFound: IHandler;
}

// Define Router Handlers
const handlers: IHandlers = {
	ping: (data, callback) => {
		callback(null, { name: 'Hi i am Ping Handler' });
	},
	notFound: (data, callback) => {
		callback(404);
	}
};

// Define Request router

const router = {
	ping: handlers.ping
};

export { handlers, router };
