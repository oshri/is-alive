export declare class JsonFile {
    baseUrl: string;
    create(dir: string, fileName: string, data: object, cb: Function): void;
    reade(dir: string, fileName: string, cb: Function): void;
    update(dir: string, fileName: string, data: any, cb: Function): void;
    delete(dir: string, fileName: string, cb: Function): void;
    error(message: string, cb: Function): any;
}
