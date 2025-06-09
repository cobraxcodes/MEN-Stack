const winston = require ('winston')

const logger = winston.createLogger({ // creating logger instance
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(), // colorizes log in terminal
        winston.format.timestamp(), // adds timestamp
        winston.format.printf(({timestamp, level, message}) =>{
            return ` ${timestamp} | ${level}: ${message}`
        })
    ),
    transports: [
        new winston.transports.Console(), // prints message in terminal
        // new winston.transports.file({  __filename: ''}) // logs to file
    ]
})

module.exports = logger