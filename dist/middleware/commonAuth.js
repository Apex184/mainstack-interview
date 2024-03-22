import { logger, validateSignature } from "../utills/index.js";
export const Authentication = async (req, res, next) => {
    try {
        const validate = await validateSignature(req, res);
        if (validate) {
            next();
        }
        else {
            logger.error(req.headers, "Authentication failed. Request headers:");
            return res.status(403).json({
                success: false,
                message: "User is not authorized",
            });
        }
    }
    catch (error) {
        logger.error(error, "Error occurred during authentication:");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
//# sourceMappingURL=commonAuth.js.map