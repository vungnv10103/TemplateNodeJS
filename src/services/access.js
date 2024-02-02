'use strict'

const shopModel = require("../models/shop.model");
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const KeyTokenService = require("./keyToken");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, ConflictRequestError } = require("../core/error.response");



class AccessService {
    static signUp = async ({ name, email, password }) => {
        // try {
        const holderShop = await shopModel.findOne({ email }).lean();
        if (holderShop) {
            throw new BadRequestError("Error: Shop already registered");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({
            name, email, password: passwordHash, role: ["Shop"]
        });
        // return {message: "sign up success", code: 1};
        if (newShop) {
            // TODO create privateKey, publicKey
            // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: "pkcs1",
            //         format: "pem"
            //     },
            //     privateKeyEncoding: {
            //         type: "pkcs1",
            //         format: "pem"
            //     }
            // });
            const publicKey = crypto.randomBytes(64).toString('hex');
            const privateKey = crypto.randomBytes(64).toString('hex');
            console.log("key: ", { privateKey, publicKey });

            const keyStore = await KeyTokenService.createTokenKey({
                userID: newShop._id,
                publicKey,
                privateKey
            });

            if (!keyStore) {
                throw new BadRequestError("Error: keyStore error");
            }
            const tokens = await createTokenPair({ userID: newShop._id, email }, publicKey, privateKey);
            console.log("token pair: ", tokens);
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ field: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
        // } catch (error) {
        //     console.log(error);
        //     return {
        //         code: 0,
        //         message: error.message,
        //         status: 'error'
        //     }
        // }
    }
}

module.exports = AccessService