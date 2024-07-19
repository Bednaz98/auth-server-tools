/**
 * This is a debug server for testing, 
 * down below you can edit the config to test the logger settings
*/
import express from "express"
import { defaultFunction } from "./routes/defaultRoutes";






const app = express();
app.use(express.json());
app.disable('x-powered-by');






function getPort() {
    const serverPort = Number(process.env?.["SERVER_PORT"])
    if (!Number.isNaN(serverPort)) {
        console.log("detected sever port: ", serverPort)
        return Number(serverPort)
    }
    console.log("using default port: ", 3000);
    return 3000;
}
function printPackageVersion() {
    const packageJson = require('../package.json')
    console.log(`package json version: ${packageJson.version} `)
}


export default (async () => {
    //initialization function
    console.log('server initiating ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    const env = process.env?.["SYSTEM_ENV"];
    console.log("SYSTEM_ENV", env)
    //testing routes
    if (env?.includes('dev')) {
        console.log("adding testing routes on dev")
        app.get("/*", defaultFunction);
        app.post("/*", defaultFunction);
        app.put("/*", defaultFunction);
        app.patch("/*", defaultFunction);
        app.delete("/*", defaultFunction);
    }



    // Final server steps
    const port = getPort();
    printPackageVersion();
    const server = app.listen(port, () => { console.log(`Starting test server: ${port}`) });
    return server
})();





