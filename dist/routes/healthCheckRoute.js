import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    return res.status(200).json('Welcome to Roodi Technology Limited! ✍️');
});
export { router as healthCheckerRouter };
//# sourceMappingURL=healthCheckRoute.js.map