interface IHandler {
    (data: any, cb: Function): void;
}
interface IHandlers {
    ping: IHandler;
    notFound: IHandler;
}
declare const handlers: IHandlers;
declare const router: {
    ping: IHandler;
};
export { handlers, router };
