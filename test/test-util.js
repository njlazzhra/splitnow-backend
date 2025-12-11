import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export  const removeTestUser = async () => {
    await prismaClient.users.deleteMany({
        where: {
            username: "bintangaajja@gmail.com"
        }
    });

}

export const createTestUser = async ()=>{
    await prismaClient.users.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia",10),
            name: "test",
            token: "test"
        }
    });
}

export const getTestUser = async ()=>{
    return prismaClient.users.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestKegiatan = async ()=>{
    return prismaClient.kegiatan.delete({
        where: {
            username: "test",
            id:1
        }
    })
}

export const createKegiatan = async () => {
    return prismaClient.kegiatan.create({
        data: {
            id: 1,
            name: "test",
            event_date: "2022-01-01T15:30:00.000Z",
            location: "kota medan",
            taxPercentage: 0.5,
            username: "test"
        }
    })
}

export const getKegiatan = async () => {
    return prismaClient.kegiatan.findFirst({
        where: {
            username: "test"
        }
    })
}

export const removeAllParticipant = async ()=>{
    return prismaClient.participants.deleteMany({
        where: {
            kegiatanId:8
        }
    })
}

export const createManyTestParticipant = async ()=>{
    for (let i = 0; i <15; i++) {
        await prismaClient.participants.create({
            data: {
                id: i,
                name: `test${i}`,
                kegiatanId:1
            }
        })
    }
}

export const createManyTestItem = async ()=>{
    for (let i = 0; i <15; i++) {
        await prismaClient.items.create({
            data: {
                item_name: `mie aceh ${i}`,
                amount: 2,
                cost: 10000,
                participantId: i,

            }
        })
    }
}

export const removeTestItem = async ()=>{
    for (let i = 0; i <15; i++) {
        await prismaClient.items.deleteMany({
            where: {
                participantId: i
            }
        })
    }
}
