import {validate} from "../validation/validation.js";
import {
    addItemValidasi,
    addKegiatanValidasi,
    addParticipantsValidasi,
    getParticipantValidasi
} from "../validation/bill-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import {updateParticipantCost} from "../utility/participant-util.js";

const createKegiatan = async (user, request) => {
    if (request.event_date) {
        // const [day, month, year] = request.event_date.split("-");
        request.event_date = new Date(request.event_date).toISOString();
    }

    request.taxPercentage = parseFloat(request.taxPercentage);
    const validRequest = validate(addKegiatanValidasi, request)
    validRequest.username = user.username;

    return prismaClient.kegiatan.create({
        data: validRequest
    })
}

const addParticipant = async (request,kegiatanId) => {
    const participant = validate(addParticipantsValidasi, request)
    const kegiatan_id = validate(getParticipantValidasi, kegiatanId)

    //count dulu kegiatan nya ada ga
    const count = await prismaClient.kegiatan.count({
        where:{
            id: kegiatan_id
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


const getAllParticipant = async (kegiatanId) => {


    const participant = await prismaClient.participants.findMany({
        where:{
            kegiatanId: kegiatanId
        },
        include : {
            items: true
        }
    })
    if (!participant){
        throw new ResponseError(404,"Participant not found")
    }
    return participant;
}

const addItem = async (request, participantId) => {
    //validasi item nya
    const validItem = validate(addItemValidasi, request)
    validItem.participantId = participantId;
    //kita update cost nya
    const items = await prismaClient.items.create({
        data: validItem,
        select: {
            item_name: true,
            cost: true,
            amount: true,
        }
    })

    await updateParticipantCost(participantId); //atau ini bisa aja si di controller

    return items;
}

const getAllItems = async (participantId) => {
    return prismaClient.items.findMany({
        where: {
            participantId: participantId
        },
        include: {
            participant: true
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
    getAllParticipant,
    addItem,
    getAllItems,
    deleteItem
}