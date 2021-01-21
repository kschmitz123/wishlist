const { updateWishlist } = require("../models/wishlists");
const { Router } = require("express");
const router = Router();

router.post("/", async (request, response) => {
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
module.exports = router;
