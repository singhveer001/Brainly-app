"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
const mongoose_1 = require("mongoose");
const TagSchema = new mongoose_1.Schema({
    title: {
        Type: String,
        default: null
    }
});
exports.TagModel = (0, mongoose_1.model)("Tags", TagSchema);
