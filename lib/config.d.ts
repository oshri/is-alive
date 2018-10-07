interface IEnv {
    httpPort: number;
    httpsPort: number;
    envName: string;
}
declare const enviromentToExport: IEnv;
export default enviromentToExport;
