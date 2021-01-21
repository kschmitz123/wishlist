const { updateWishlist } = require("../models/wishlists");
const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const insertResult = await updateWishlist(data);
    const newWishlistId = insertResult.insertedId;
    res.status(200).json(newWishlistId);
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal server error occured");
  }
});
module.exports = router;
