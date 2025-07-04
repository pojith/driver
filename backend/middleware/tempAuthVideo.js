import jwt from "jsonwebtoken";
import User, {UserInterface} from "../models/user";
import env from "../enviroment/env";
import {Request, Response, NextFunction} from "express";


interface RequestType extends Request {
    user?: UserInterface,
    auth?: boolean,
    encryptedTempToken?: string,
}

type jwtType = {
    iv: Buffer,
    _id: string,
    cookie: string
}

const tempAuthVideo = async(req: RequestType, res: Response, next: NextFunction) => {

    try {

        const token = req.params.tempToken;

        const decoded = jwt.verify(token, env.passwordAccess!) as jwtType;

        const iv = decoded.iv;

        if (req.params.uuid !== decoded.cookie) {

            throw new Error("Cookie mismatch")
        }

        const user = await User.findOne({_id: decoded._id}) as UserInterface;
        const encrpytionKey = user.getEncryptionKey();

        const encryptedToken = user.encryptToken(token, encrpytionKey, iv);

        let tokenFound = false;
        for (let i = 0; i < user.tempTokens.length; i++) {

            const currentToken = user.tempTokens[i].token;

            if (currentToken === encryptedToken) {
                tokenFound = true;
                break;
            }
        }

        if (!user || !tokenFound) {

            throw new Error("User not found");

        } else {

            await user.save();

            req.user = user;
            req.auth = true;
            req.encryptedTempToken = encryptedToken;
            next();
        }

    } catch (e) {
        console.log(e);
        res.status(401).send();
    }
}

export default tempAuthVideo;