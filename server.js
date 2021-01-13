require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require("./lib/database");
const {
  setWishlist,
  getWishlistById,
  updateWishlist,
  getWishlists,
  deleteWishlistById,
} = require("./lib/wishlists");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(express.json());

app.post("/api/lists/", async (request, response) => {
  const wishlist = request.body;
  try {
    const insertResult = await setWishlist(wishlist);
    const newWishlistId = insertResult.insertedId;
    response.status(200).json(newWishlistId);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

app.get("/api/lists/", async (request, response) => {
  const { lists } = request.params;
  try {
    const listCollection = await getWishlists(lists);
    response.send(listCollection);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

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

app.get("/api/lists/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const wishlist = await getWishlistById(id);
    response.send(wishlist);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

app.delete("/api/lists/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await deleteWishlistById(id);
    response.status(200).send();
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
