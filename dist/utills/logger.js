import pino from "pino";
const transport = pino.transport({
    targets: [
        {
            target: "pino-pretty",
            options: {
                ignore: "pid,hostname",
                translateTime: "SYS:standard",
            },
        },
    ],
});
export const logger = pino(transport);
//# sourceMappingURL=logger.js.map