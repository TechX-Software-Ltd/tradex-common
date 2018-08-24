"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const LOG_FORMAT = {
    JSON: (conf) => winston_1.format.combine(winston_1.format.label({ service: conf.serviceName }), winston_1.format.timestamp(), winston_1.format.splat(), winston_1.format.json()),
    FLAT: (conf) => winston_1.format.combine(winston_1.format.label({ service: conf.serviceName }), winston_1.format.timestamp(), winston_1.format.splat(), winston_1.format.simple()),
};
const createTransports = (conf) => {
    if (!conf.transports || conf.transports.length === 0) {
        return [new winston_1.transports.Console({ level: 'info' })];
    }
    const transport = [];
    for (let i = 0; i < conf.transports.length; i++) {
        if (conf.transports.type === 'console') {
            transport.push(new winston_1.transports.Console(conf.transports[i].data));
        }
        else if (conf.transports.type === 'file') {
            transport.push(new winston_1.transports.File(conf.transports[i].data));
        }
    }
    return transport;
};
const createLogger = (conf) => {
    return winston_1.createLogger({
        level: conf.level,
        format: LOG_FORMAT[conf.format](conf),
        transports: createTransports(conf)
    });
};
class Logger {
    constructor() {
        this.create = (conf) => {
            if (this.log == null) {
                this.log = createLogger(conf);
            }
        };
        this.logError = (message, err) => {
            if (!err) {
                this.log.error({
                    message: message.message,
                    stackTrace: this.getStackTrace(message),
                });
            }
            else {
                this.log.error({
                    message: message,
                    stackTrace: this.getStackTrace(err),
                });
            }
        };
        this.getStackTrace = (err) => {
            if (!err.stack) {
                return '';
            }
            let result = '';
            for (let i = 0; i < 10 || i < err.stack.length; i++) {
                result += err.stack[i];
            }
            return result;
        };
        this.logger = this;
    }
    info(...args) {
        if (this.log != null) {
            this.log.info.call(this.log, ...args);
        }
    }
    warn(...args) {
        if (this.log != null) {
            this.log.warn.call(this.log, ...args);
        }
    }
    error(...args) {
        if (this.log != null) {
            this.log.error.call(this.log, ...args);
        }
    }
}
const logger = new Logger();
exports.logger = logger;
//# sourceMappingURL=logger.js.map