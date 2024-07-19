import { Router, Request, Response } from "express";

const testRoute = Router()

export const defaultFunction = (req: Request, res: Response) => {
    console.debug("method: ", req.method)
    console.debug("url: ", req.url)
    console.debug("cookies: ", req.cookies)
    console.debug("host name: ", req.hostname)
    console.debug("ip: ", req.ip)
    console.debug("headers: ", req.headers);
    console.debug("params: ", req.params)
    console.debug("body: ", req.body)
    res.status(200).send("testing");
}

testRoute.get("*", defaultFunction);
testRoute.post("*", defaultFunction);
testRoute.put("*", defaultFunction);
testRoute.patch("*", defaultFunction);
testRoute.delete("*", defaultFunction);


export default testRoute;