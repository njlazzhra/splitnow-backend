import Joi from "joi";

const addKegiatanValidasi = Joi.object({
    name: Joi.string().required().min(1).max(100),
    event_date: Joi.date().required().iso(),
    location: Joi.string().required().min(5).max(100),
    taxPercentage: Joi.number().required()
})

const addParticipantsValidasi = Joi.object({
    name: Joi.string().required().min(1).max(100)
})

const addItemValidasi = Joi.object({
    item_name: Joi.string().required().min(1).max(100),
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