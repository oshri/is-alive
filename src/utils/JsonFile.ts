import * as fs from 'fs';
import * as path from 'path';

export class JsonFile {
    baseUrl = path.join(__dirname, '/../../.data');

    create(dir: string, fileName: string, data: object, cb: Function) {
        const filePath = `${this.baseUrl}/${dir}/${fileName}.json`;

        fs.open(filePath, 'wx', (error, fileDescriptor) => {

            if(!error && fileDescriptor) {
                const stringData = JSON.stringify(data);

                fs.writeFile(filePath, stringData, (writeFile) => {

                    if(!writeFile) {
                        fs.close(fileDescriptor, (closeFile) => {

                            if(!closeFile) {
                                cb(false);
                            } else {
                                this.error('Error Closing new File', cb);
                            }

                        });
                        
                    } else {
                        this.error('Error writing to new file', cb);
                    }
                });
    
            } else {
                this.error('Could not create new file, it may already exist', cb);
            }

        });
    }

    read(dir: string, fileName: string, cb: Function) {
        const filePath = `${this.baseUrl}/${dir}/${fileName}.json`;

        fs.readFile(filePath, 'utf8', (error, data) => {
            cb(error, data);
        });
    }

    update(dir: string, fileName: string, data: any, cb: Function) {
        const filePath = `${this.baseUrl}/${dir}/${fileName}.json`;

        fs.open(filePath, 'r+', (error, fileDescriptor) => {

            if(!error && fileDescriptor) {
                const stringData = JSON.stringify(data);


                fs.truncate(filePath, fileDescriptor, (error) => {
                    
                    fs.writeFile(filePath, stringData, (error) => {

                        if(!error) {

                            fs.close(fileDescriptor, (error) => {
                                if(!error) {
                                    cb(false);
                                } else {
                                    cb('erorr when closing file');
                                }
                            });

                        } else {
                            cb('writing to existing file');
                        }
                    });
                });
                
            } else {
                cb('Could not open the file for updating, it may not exist yet');
            }
        });

    }

    delete(dir: string, fileName: string, cb: Function) {
        const filePath = `${this.baseUrl}/${dir}/${fileName}.json`;

        fs.unlink(filePath, (erorr) => {
            if(!erorr) {
                cb(false);
            } else {
                cb(`Error deleting ${fileName}`);
            }
        })

    }

    error(message: string, cb: Function) {
        return cb(message || 'Internal Error');
    }
}