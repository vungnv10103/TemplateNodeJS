'use strict'

const { SuccessResponse, CREATED } = require("../core/success.response");
const AccessService = require("../services/access");

class AccessController {

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        })
    }
    signUp = async (req, res, next) => {
        new CREATED({
            message: "Registed OK!",
            metadata: await AccessService.signUp(req.body)
        }).send(res);
    }

}

module.exports = new AccessController();