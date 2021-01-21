const {
  setWishlist,
  getWishlists,
  getWishlistById,
  deleteWishlistById,
} = require("../models/wishlists");

const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  const wishlist = req.body;
  try {
    const insertResult = await setWishlist(wishlist);
    const newWishlistId = insertResult.insertedId;
    res.status(200).json(newWishlistId);
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal server error occured");
  }
});

router.get("/", async (req, res) => {
  const { lists } = req.params;
  try {
    const listCollection = await getWishlists(lists);
    res.send(listCollection);
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal server error occured");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await getWishlistById(id);
    res.status(200).send(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal server error occured");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteWishlistById(id);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal server error occured");
  }
});
module.exports = router;
