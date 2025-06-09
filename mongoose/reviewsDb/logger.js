const winston = require ('winston') // importing winston package


const logger = winston.createLogger({ // createing winston instance
    level: 'info', // declaring what level the winston log is
    format: winston.format.combine( // the combination of message winston will log
        winston.format.colorize(), // adding color to the log message
        winston.format.timestamp(), // adding timestamp to the log message 
        winston.format.printf(({timestamp, level, message})=>{ // this is the log message that will print
            return `${timestamp} || ${level}, ${message}`
        })
    ),
    transports: [ 
        new winston.transports.Console() // this transports the log into the console
        // new.winston.transport.file({__filename: ' '}) // this is if you want your logs to be stored in a file
    ]
})

module.exports = logger;