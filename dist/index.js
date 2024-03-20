import 'dotenv/config';
import { app } from './app.js';
import { dbConnect } from './config/index.js';
import { logger } from './utills/index.js';
import dotEnv from 'dotenv';
dotEnv.config();
const PORT = process.env.PORT || 80;
const start = async () => {
    try {
        dbConnect();
        app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT} !!`);
        });
    }
    catch (error) {
        logger.fatal(error, `Error connecting to the Database:`);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map