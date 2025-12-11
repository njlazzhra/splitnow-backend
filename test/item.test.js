import {
    createKegiatan, createManyTestItem,
    createManyTestParticipant,
    createTestUser, removeAllParticipant,
    removeAllTestKegiatan, removeTestItem,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";

describe('POST /api/kegiatan/:kegiatanId/participant/:participantId/item' ,() => {
    beforeEach(async () => {
        await createTestUser();
        await createKegiatan();
        await createManyTestParticipant();
    })
    afterEach(async () => {
        await removeTestItem();
        await removeAllParticipant();
        await removeAllTestKegiatan();
        await removeTestUser();
    })

    it('should can add itemm', async () => {
        const result = await supertest(web)
            .post(`/api/kegiatan/${1}/participant/${1}/item`)
            .set('Authorization', 'test')
            .send({
                item_name: 'mie aceh ',
                amount:  2,
                cost: 15000,
            })
        console.log(result.body)
        logger.info(result.body)

        expect(result.status).toBe(201);
        expect(result.body.data.item_name).toBe("mie aceh ");
    });

})

//ini get all item

describe('POST /api/kegiatan/:kegiatanId/participant/:participantId/items get all' ,() => {
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

    it('should can get all items', async () => {
        const result = await supertest(web)
            .get(`/api/kegiatan/${1}/participant/${1}/items`)
            .set('Authorization', 'test')

        console.log(result.body)
        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
    });

})