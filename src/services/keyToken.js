'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {

    static createTokenKey = async ({ userID, publicKey, privateKey, refreshToken }) => {
        try {
            // const tokens = await keytokenModel.create({
            //     user: userID,
            //     publicKey,
            //     privateKey
            // });
            const filter = { user: userID },
                update = {
                    publicKey, privateKey, refreshTokenUsed: [],
                    refreshToken
                },
                options = { upsert: true, new: true }
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}


module.exports = KeyTokenService;