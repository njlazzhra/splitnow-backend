import Joi from "joi";

const addKegiatanValidasi = Joi.object({
    eventNames: Joi.string().required().min(5).max(100),
    eventDate: Joi.date().required(),
    location: Joi.string().required().min(5).max(100)
})

const addParticipantsValidasi = Joi.object({
    username: Joi.string().required().min(5).max(100)
})

const addItemValidasi = Joi.object({
    itemName: Joi.string().required().min(5).max(100),
    cost: Joi.number().required(),
    amount: Joi.number().required()
})

const getParticipantValidasi = Joi.number().required();

const getBill = Joi.number().required();


export {
    addKegiatanValidasi,
    addItemValidasi,
    addParticipantsValidasi,
    getParticipantValidasi,
    getBill

}