import {validate} from "../validation/validation.js";
import {
    addItemValidasi,
    addKegiatanValidasi,
    addParticipantsValidasi,
    getParticipantValidasi
} from "../validation/bill-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import {updateParticipantCost} from "../../test/util.js";

const createKegiatan = async (user, request) => {
    const kegiatan = validate(addKegiatanValidasi, request)
    kegiatan.username = user.username;

    return prismaClient.kegiatan.create({
        data: kegiatan,
        select: {
            id: true,
            eventNames: true,
            eventDate: true,
            location: true,
            username: true,
        }
    })
}

const addParticipant = async (name,kegiatanId) => {
    const participant = validate(addParticipantsValidasi, name)
    const kegiatan_id = validate(getParticipantValidasi, kegiatanId)

    //count dulu kegiatan nya ada ga
    const count = await prismaClient.kegiatan.count({
        where:{
            id: kegiatanId
        }
    })
    if (!count){
        throw new ResponseError(404,"Kegiatan not found")
    }

    participant.kegiatanId = kegiatan_id;
    return  prismaClient.participants.create({
        data: participant,
        select: {
            name: true,
        }
    })
}


const getParticipant = async (kegiatanId,participantId) => {

    const participant = await prismaClient.participants.findFirst({
        where:{
            id: participantId,
            kegiatanId: kegiatanId
        },
        select: {
            name: true,
            cost_total: true,
        }
    })
    if (!participant){
        throw new ResponseError(404,"Participant not found")
    }
    return participant;
}

const addItem = async (kegiatanId, request, participantId) => {
    //validasi item nya
    const validItem = validate(addItemValidasi, request)
    validItem.participantId = participantId;
    //kita update cost nya
    const items = await prismaClient.items.create({
        data: validItem,
        select: {
            itemName: true,
            cost: true,
            amount: true,
        }
    })

    await updateParticipantCost(participantId); //atau ini bisa aja si di controller

    return items;
}

const getItems = async (participantId) => {
    return prismaClient.items.findMany({
        where:{
            participantId: participantId
        }
    })
}

const deleteItem = async (itemId) => {
    return prismaClient.items.delete({
        where:{
            id: itemId
        }
    })
}

//update item nya ini aga tricky nanti aja


export default {
    createKegiatan,
    addParticipant,
    getParticipant,
    addItem
}