import { app } from '@/app';
import request from 'supertest';
it('should return 200 status code', async () => {
    await request(app).get('/').expect(200);
});
//# sourceMappingURL=healthCheck.test.js.map