'use strict'

const moment = require('moment');

const { BadRequestError } = require("../core/error.response");
const { modelEnglish } = require('../models/english.model');
const { modelVietnamese } = require('../models/vietnamese.model');



class AvatarService {
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
                    return { message: "error get answer english", code: 0, timestamp: timestamp };
                }
                return { answer: dataEN.answer, message: "get answer success", code: 1, timestamp: timestamp };
                break;
            case "vi":
                const dataVI = await modelVietnamese.findOne({ question }).lean();
                if (!dataVI) {
                    return { message: "error get answer vietnamese", code: 0, timestamp: timestamp };
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
                    return { id: recordEN._id, message: " record exist", code: 1, timestamp: timestamp };
                } else {
                    const newRecord = new modelEnglish({
                        question: question,
                        answer: answer
                    });
                    await newRecord.save();
                    return { id: newRecord._id, message: "add new record english success", code: 1, timestamp: timestamp };
                }
                break;
            case "vi":
                const recordVI = await modelVietnamese.findOne({ question }).lean();
                if (recordVI) {
                    return { id: recordVI._id, message: " record exist", code: 1, timestamp: timestamp };
                } else {
                    const newRecord = new modelVietnamese({
                        question: question,
                        answer: answer
                    });
                    await newRecord.save();
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