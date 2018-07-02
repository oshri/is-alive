interface IHandler {
	(data: any, cb: Function): void;
}

interface IHandlers {
	ping: IHandler;
	notFound: IHandler;
}

// Define Router Handlers
const handlers: IHandlers = {
	ping: (data, cb) => {
		cb(406, { name: 'Hi i am Ping Handler' });
	},
	notFound: (data, cb) => {
		cb(404);
	}
};

// Define Request router

const router = {
	ping: handlers.ping
};

export { handlers, router };
