import 'dotenv/config';
import { app } from './app';
import { dbConnect } from '@/config';
import { logger } from '@/utills';
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