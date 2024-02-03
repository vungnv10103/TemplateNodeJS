'use strict'

const AvatarService = require("../services/avatar");

class AvatarController {
    getAV = async (req, res, next) => {
        return res.status(200).json(await AvatarService.getAV(req.body));
    }
    saveAV = async (req, res, next) => {
        return res.status(200).json(await AvatarService.saveAV(req.body));
    }

}

module.exports = new AvatarController();