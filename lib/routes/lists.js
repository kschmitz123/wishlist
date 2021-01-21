const {
  setWishlist,
  getWishlists,
  getWishlistById,
  deleteWishlistById,
} = require("../models/wishlists");

const { Router } = require("express");
const router = Router();

router.post("/", async (request, response) => {
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

router.get("/", async (request, response) => {
  const { lists } = request.params;
  try {
    const listCollection = await getWishlists(lists);
    response.send(listCollection);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const wishlist = await getWishlistById(id);
    response.status(200).send(wishlist);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await deleteWishlistById(id);
    response.status(200).send();
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occured");
  }
});
module.exports = router;
