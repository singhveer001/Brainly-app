"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ContentSchema = new mongoose_2.Schema({
    title: {
        type: String,
        default: ""
    },
    link: {
        type: String
    },
    type: {
        type: String
    },
    tags: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tags",
            default: null
        }
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
});
const LinkSchema = new mongoose_2.Schema({
    hash: {
        type: String
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.Content = (0, mongoose_2.model)("Content", ContentSchema);
exports.LinkModel = (0, mongoose_2.model)("Links", LinkSchema);
