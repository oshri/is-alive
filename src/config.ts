/*
* Export App configuration variables
*/

interface IEnv {
    httpPort: number;
    httpsPort: number;
    envName: string;
}

const enviroments:any = {};

// Staging (default enviroment)
enviroments.development = {
    httpPort: 3000,
    httpsPort: 5001,
    envName: 'development'
};

enviroments.production = {
    httpPort: 8080,
    httpsPort: 5001,
    envName: 'production'
};

const currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

const enviromentToExport: IEnv = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.development;

export default enviromentToExport;