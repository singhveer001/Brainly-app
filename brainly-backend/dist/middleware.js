"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("kjsdgfjhsdvj", process.env.SECRET_TOKEN);
const userMiddleware = (req, res, next) => {
    var _a;
    const header = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log("header", header);
    const decoded = jsonwebtoken_1.default.verify(header, process.env.SECRET_TOKEN);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            msg: "You are not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
