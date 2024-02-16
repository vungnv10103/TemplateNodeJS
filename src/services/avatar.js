'use strict'

require('dotenv').config();
const moment = require('moment');
const API_KEY_AVT = process.env.API_KEY_AVT;

const { BadRequestError } = require("../core/error.response");
const { modelEnglish } = require('../models/english.model');
const { modelVietnamese } = require('../models/vietnamese.model');



class AvatarService {

    static getAllAV = async ({ key, language }) => {
        let date = new Date();
        let timestamp = moment(date).format('YYYY-MM-DD-HH:mm:ss');

        if (key === undefined || key.toString().trim().length === 0) {
            throw new BadRequestError("Error: key require");
        }
        if (language === undefined || language.toString().trim().length === 0) {
            throw new BadRequestError("Error: language require");
        }
        if (key !== API_KEY_AVT) {
            throw new BadRequestError("Error: vefify fail");
        }

        switch (language) {
            case "en":
                const dataEN = await modelEnglish.find({}, { _id: 0, question: 1, answer: 1 });
                return { data: dataEN, message: "get allav en success", code: 1, timestamp: timestamp };
                break;
            case "vi":
                const dataVN = await modelVietnamese.find({}, { _id: 0, question: 1, answer: 1 });
                return { data: dataVN, message: "get allav vi success", code: 1, timestamp: timestamp };
                break;
            default:
                throw new BadRequestError("Error: limit language");
        }


    }

    static getAV = async ({ question, language }) => {

        let date = new Date();
        let timestamp = moment(date).format('YYYY-MM-DD-HH:mm:ss');

        if (question === undefined || question.toString().trim().length === 0) {
            throw new BadRequestError("Error: question require");
        }
        if (language === undefined || language.toString().trim().length === 0) {
            throw new BadRequestError("Error: language require");
        }

        switch (language) {
            case "en":
                const dataEN = await modelEnglish.findOne({ question }).lean();
                if (!dataEN) {
                    console.log("not found: ", question);
                    return { message: "no data", code: 0, timestamp: timestamp };
                }
                return { answer: dataEN.answer, message: "get answer success", code: 1, timestamp: timestamp };
                break;
            case "vi":
                const dataVI = await modelVietnamese.findOne({ question }).lean();
                if (!dataVI) {
                    console.log("not found: ", question);
                    return { message: "no data", code: 0, timestamp: timestamp };
                }
                return { answer: dataVI.answer, message: "get answer success", code: 1, timestamp: timestamp };
                break;
            default:
                throw new BadRequestError("Error: limit language");
        }

    }
    static saveAV = async ({ question, answer, language }) => {
        let date = new Date();
        let timestamp = moment(date).format('YYYY-MM-DD-HH:mm:ss');

        if (question === undefined || question.toString().trim().length === 0) {
            throw new BadRequestError("Error: question require");
        }
        if (answer === undefined || answer.toString().trim().length === 0) {
            throw new BadRequestError("Error: answer require");
        }
        if (language === undefined || language.toString().trim().length === 0) {
            throw new BadRequestError("Error: language require");
        }

        switch (language) {
            case "en":
                const recordEN = await modelEnglish.findOne({ question }).lean();
                if (recordEN) {
                    if (recordEN.answer !== answer) {
                        await modelEnglish.findOneAndUpdate({ question }, { answer }, { new: true });
                        console.log("Answer updated successfully.");
                        return { id: recordEN._id, message: " Answer updated successfully.", code: 1, timestamp: timestamp };
                    }
                    console.log("record exist");
                    return { id: recordEN._id, message: " record exist", code: 1, timestamp: timestamp };
                } else {
                    const newRecord = new modelEnglish({
                        question: question,
                        answer: answer
                    });
                    await newRecord.save();
                    console.log("add new record english success");
                    return { id: newRecord._id, message: "add new record english success", code: 1, timestamp: timestamp };
                }
                break;
            case "vi":
                const recordVI = await modelVietnamese.findOne({ question }).lean();
                if (recordVI) {
                    console.log("record exist");
                    return { id: recordVI._id, message: "record exist", code: 1, timestamp: timestamp };
                } else {
                    const newRecord = new modelVietnamese({
                        question: question,
                        answer: answer
                    });
                    await newRecord.save();
                    console.log("add new record vietnamese success");
                    return { id: newRecord._id, message: "add new record vietnamese success", code: 1, timestamp: timestamp };
                }
                break;

            default:
                break;
        }
    }
}

module.exports = AvatarService


// const saveRecord = async (Model, query, messageSuccess, messageFail, res) => {
//     let date = new Date();
//     let timestamp = moment(date).format('YYYY-MM-DD-HH:mm:ss');
//     try {
//         const record = await Model.findOne({ question: query.question });

//         if (record) {
//             return res.send({ id: record._id, message: " record exist", code: 1, timestamp: timestamp });
//         } else {
//             const newRecord = new Model({
//                 question: query.question,
//                 answer: query.answer
//             });
//             await newRecord.save();
//             return res.send({ id: newRecord._id, message: messageSuccess, code: 1, timestamp: timestamp });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.send({ message: messageFail, code: 0, timestamp: timestamp });
//     }
// };