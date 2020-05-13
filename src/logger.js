import { createLogger, format, transports } from 'winston';
// logger from console "console.log or process.stdout.write"
const outputLog = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.Console()
    ]
});
// logger from file 
const fileLog = createLogger({
    level: 'error',
    format: format.json(),
    transports: [
        new transports.File({ filename: 'logs/error.log' })
    ]
});

const info = outputLog.info;

const error = fileLog.error;

export { 
    info, 
    error 
};