import {
    createKegiatan,
    createManyTestItem,
    createManyTestParticipant,
    createTestUser, removeAllParticipant, removeAllTestKegiatan,
    removeTestItem, removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";

describe('POST /api/kegiatan/:kegiatanId/summary ' ,() => {

    beforeEach(async () => {
        await createTestUser();
        await createKegiatan();
        await createManyTestParticipant();
        await createManyTestItem();
    })

    afterEach(async () => {
        await removeTestItem();
        await removeAllParticipant();
        await removeAllTestKegiatan();
        await removeTestUser();
    })


    it('ini untuk summary nya ', async () => {
        const result = await supertest(web)
            .get(`/api/kegiatan/${1}/summary`)
            .set('Authorization', 'test')

        console.log(result.body)
        console.log(result.body.data.participants)
        logger.info(result.body)

        expect(result.status).toBe(200);

    });

})