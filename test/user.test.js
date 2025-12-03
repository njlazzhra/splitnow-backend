
import supertest from "supertest";
import {
    createTestUser,
    getTestUser,
    removeTestUser
} from "./test-util.js";
import {logger} from "../src/application/logging.js";
import bcrypt from "bcrypt";
import {web} from "../src/application/web.js";


describe('post /api/users/login' ,() => {

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test a'
            });

        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test a");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should can rejected if not valid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });
});


describe('POST /api/users/login' ,() => {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'rahasia',
            })
        logger.info(result.body)
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");

    });

    it('should reject login if invalid ', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: '',
            })
        logger.info(result.body)
        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();


    });

    it('should reject login if pass is wrong', async () => {

        expect.assertions(2);
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'salahsdsds',
            });
        logger.info(result.body)

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();


    });

    it('should rejected login if username wrong', async () => {

        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test salah',
                password: 'rahasia',
            })
        logger.info(result.body)
        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();


    });
})


describe('GET /api/users/current' ,() => {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    })

    it('should rejected if not login', async () => {
        const result = await supertest(web)
            .get('/api/users/current')

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();
    })

    it('should reject if token invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test salah')

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();

    });

})

describe('PATCH /api/users/current' ,() => {
    beforeEach(async () => {
        await createTestUser();
    })
    afterEach(async () => {
        await removeTestUser();
    })

    it('should can update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'lionel messi',
                password: 'lionel',
            });
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("lionel messi");

        const user = await getTestUser();

        expect(await bcrypt.compare('lionel', user.password)).toBe(true);

    })
})

describe('DELETE /api/users/current' ,() => {
    beforeEach(async () => {
        await createTestUser();
    })
    afterEach(async () => {
        await removeTestUser();
    })
    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/current')
            .set('Authorization', 'test')

        expect(result.status).toBe(200);
    })

    it('should can  reject logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/current')
            .set('Authorization', 'salah')

        expect(result.status).toBe(401);
    })
})



