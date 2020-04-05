import express from 'express';
import morgan from 'morgan';
import bunyan from 'bunyan';
import fs from 'fs';

import healthRoute from './routes/health';
import authRoutes from './routes/auth';

const app = express();

app.use('/health', healthRoute);

const containerInfoFile = "/proc/1/cpuset"
//const containerInfoFile = "/Users/vinodh/Documents/LoginRadius/SimpleNodeApp/cpuset"

const containerId = fs.readFileSync(containerInfoFile, 'utf8').trim().split("/").pop()

const logFileName = 'kubernetes'+process.env["LOG_FILE_PATH"].replace(/\//g, ".")+'.'+process.env["POD_NAME"]+"."+process.env["POD_NAMESPACE"]+"."+process.env["CONTAINER_NAME"]+"."+containerId+".log"

console.log(logFileName);

// Application logging
global.log = bunyan.createLogger({
    name: 'simple-api-service',
    streams: [
    {
        level: process.env.LOG_LEVEL,
        path: logFileName
    }
    ]
});

// Http Requests logging
var accessLogStream = fs.createWriteStream(logFileName, { flags: 'a' })
app.use(morgan(function (tokens, req, res) {
    return JSON.stringify({
        name: 'simple-api-service',
        requestid: req.id,
        subdomain: req.tenant,
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        code: tokens.status(req, res),
        time: tokens.date(req,res,'iso'),
        useragent: tokens.req(req,res,'user-agent'),
        contentlength: tokens.res(req, res, 'content-length'),
        responsetime: tokens['response-time'](req, res)+'ms'
    })
},{ stream: accessLogStream }));

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`api server started on port ${process.env.PORT}`);
  log.info(`api server started on port ${process.env.PORT}`);
});
