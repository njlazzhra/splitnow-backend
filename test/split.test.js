import {
    createKegiatan, createManyTestParticipant,
    createTestUser,
    getKegiatan,
    removeAllParticipant,
    removeAllTestKegiatan,
    removeTestUser
} from "./test-util.js";
import {logger} from "../src/application/logging.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe('POST /api/contacts' ,() => {
    beforeEach(async () => {
        await createTestUser();
    })
    afterEach(async () => {
        await removeAllTestKegiatan();
        await removeTestUser();
    })

    it('should can create kegiaatan', async () => {
        const result = await supertest(web)
            .post('/api/kegiatan')
            .set('Authorization', 'test')
            .send({
                name: 'nongkrong pak din',
                event_date: "2022-01-01",
                location: 'kota medan',
            })
        console.log(result.body)
        logger.info(result.body)

        expect(result.status).toBe(201);
        expect(result.body.data.name).toBe("nongkrong pak din");
    });

})



describe('GET /api/kegiatan/:kegiatanId/participants ' , () => {
    beforeEach(async () => {
        await createTestUser();
        await createKegiatan();
        await createManyTestParticipant();
    })
    afterEach(async () => {
        await removeAllParticipant();
        await removeAllTestKegiatan();
        await removeTestUser();
    })

    it('should create participant', async () => {

        const kegiatan = await getKegiatan();
        const result = await supertest(web)
            .post(`/api/kegiatan/`+ kegiatan.id +`/participant`)
            .set('Authorization', 'test')
            .send({
                name: 'lionel messi',
            })

        console.log(result.body)
        logger.info(result.body)

        expect(result.status).toBe(200);


    });
})

describe('GET /api/kegiatan/:kegiatanId/participant/:participantId all' , () => {
    beforeEach(async () => {
        await createTestUser();
        await createKegiatan();
        await createManyTestParticipant();
    })
    afterEach(async () => {
        await removeAllParticipant();
        await removeAllTestKegiatan();
        await removeTestUser();
    })

    it('should get all participant', async () => {

        const kegiatan = await getKegiatan();
        const result = await supertest(web)
            .get(`/api/kegiatan/${1}/participants`)
            .set('Authorization', 'test')

        console.log(result.body)
        logger.info(result.body)

        expect(result.status).toBe(200);


    });
})



