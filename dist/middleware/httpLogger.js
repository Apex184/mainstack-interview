import pinoHttp from 'pino-http';
export const httpLogger = pinoHttp({
    quietReqLogger: true,
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
        }
        else if (res.statusCode >= 500 || err) {
            return 'error';
        }
        else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
        }
        return 'info';
    },
    transport: {
        target: 'pino-http-print',
        options: {
            all: true,
            translateTime: 'SYS:standard',
            relativeUrl: true,
        },
    },
});
//# sourceMappingURL=httpLogger.js.map