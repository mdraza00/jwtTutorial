import mongoose from "mongoose";
import app from "./app";

// Connecting to mongoDB server
(async function () {
  await mongoose
    .connect(
      "mongodb+srv://mohammed-raza:LxYn6E7cJCcmxH9Q@forlearning.3bjh336.mongodb.net/?retryWrites=true&w=majority&appName=forLearning"
    )
    .then(() => {
      console.log("Database connencted successfully.");
    });
})();

// Server is listening on 127.0.0.1:3000 or localhost:3000
app.listen(3000, () =>
  console.log("***** Server is listening on port 3000 *****")
);
