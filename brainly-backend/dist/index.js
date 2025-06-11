"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_server_model_1 = require("./models/user.server.model");
const content_server_model_1 = require("./models/content.server.model");
const middleware_1 = require("./middleware");
const db_1 = __importDefault(require("./db"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const secretToken = process.env.SECRET_TOKEN;
console.log("secrettoken", secretToken);
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.default)();
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("helli");
        const { email, password } = req.body;
        const duplicateEntry = yield user_server_model_1.User.findOne({ email });
        console.log("no duplication");
        if (duplicateEntry) {
            res.status(403).json({
                msg: "User Already Exist"
            });
        }
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        console.log("hashed password");
        const newUser = new user_server_model_1.User({
            email,
            password: hashedPass
        });
        yield newUser.save();
        console.log("New entry saved", newUser);
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secretToken, { expiresIn: "24h" });
        console.log("tokennn", token);
        console.log("response");
        res.status(200).json({
            data: "User Created Successfully",
            email: newUser.email,
            token
        });
    }
    catch (error) {
        console.log("server");
        res.status(411).json({
            msg: "Internal Server Error",
            err: error.message
        });
    }
}));
// @ts-ignore
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userData = yield user_server_model_1.User.findOne({ email });
        if (!userData || userData == null || userData == undefined) {
            return res.status(401).json({
                msg: "User Not Found"
            });
        }
        const verifyPassword = yield bcrypt_1.default.compare(password, userData.password);
        if (!verifyPassword) {
            res.status(401).json({
                msg: "Invalid Credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: userData._id }, secretToken, { expiresIn: "24h" });
        res.status(200).json({
            msg: "User Logged in successfully",
            token,
            email
        });
    }
    catch (error) {
        console.log("signIn Error");
        res.status(500).json({
            msg: "Internal server error",
            err: error.message
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, link, type, tags } = req.body;
        yield content_server_model_1.Content.create({
            title,
            type,
            link,
            // @ts-ignore
            userId: req.userId,
            tags
        });
        res.status(200).json({
            msg: "Content Created Successfully"
        });
    }
    catch (error) {
        console.log("contentCreation Error");
        res.status(500).json({
            msg: "Content Creation error",
            err: error.message
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userID = req.userId;
        console.log(userID);
        const content = yield content_server_model_1.Content.find({ userId: userID }).populate([
            { path: "userId", model: "User", select: 'email' },
            // {path : "tags",model :"Tags", select : 'title'}
        ]);
        if (!content) {
            res.status(411).json({
                msg: "No data found"
            });
        }
        res.status(200).json({
            data: content
        });
    }
    catch (error) {
        console.log("getConent Error");
        res.status(500).json({
            msg: "Error Whhile Getting Data",
            err: error.message
        });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        const deleteContent = yield content_server_model_1.Content.findByIdAndDelete(contentId);
        res.status(200).json({
            msg: "Your Content Deleted Successfully"
        });
    }
    catch (error) {
        console.log("Delete Contnet Error");
        res.status(500).json({
            msg: "Error While Deleting Content",
            err: error.message
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield content_server_model_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        console.log("exsisihfiih", existingLink);
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield content_server_model_1.LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.send({
            message: "/share/" + hash
        });
    }
    else {
        yield content_server_model_1.LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.send({
            message: "Removed Link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield content_server_model_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    //userId
    const content = yield content_server_model_1.Content.find({
        userId: link.userId
    });
    const user = yield user_server_model_1.User.findOne({
        _id: link.userId
    });
    console.log("Userrr", user);
    res.json({
        //@ts-ignore
        username: user === null || user === void 0 ? void 0 : user.email,
        content: content
    });
}));
app.listen(5000, () => {
    console.log("Server Started at Port 5000");
});
