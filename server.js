require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require("./lib/database");
const lists = require("./lib/routes/lists");
const { updateWishlist } = require("./lib/models/wishlists");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(express.json());

app.use("/api/lists", lists);

app.post("/api/wishlist/", async (request, response) => {
  const data = request.body;
  try {
    const insertResult = await updateWishlist(data);
    const newWishlistId = insertResult.insertedId;
    response.status(200).json(newWishlistId);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));
// app.use(
//   "/storybook",
//   express.static(path.join(__dirname, "client/storybook-static"))
// );

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function run() {
  try {
    await connect(process.env.MONGODB_URL, process.env.MONGODB);
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
run();
