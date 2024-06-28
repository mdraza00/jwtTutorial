"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// Connecting to mongoDB server
(async function () {
    await mongoose_1.default
        .connect("mongodb+srv://mohammed-raza:LxYn6E7cJCcmxH9Q@forlearning.3bjh336.mongodb.net/?retryWrites=true&w=majority&appName=forLearning")
        .then(() => {
        console.log("Database connencted successfully.");
    });
})();
// Server is listening on 127.0.0.1:3000 or localhost:3000
app_1.default.listen(3000, () => console.log("***** Server is listening on port 3000 *****"));
