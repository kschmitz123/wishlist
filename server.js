require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require("./lib/database");
const { setWishlist } = require("./lib/wishlists");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(express.json());

app.post("/api/lists/", async (request, response) => {
  const wishlist = request.body;
  try {
    await setWishlist(wishlist);
    response.status(200).send("Successfully uploaded");
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
