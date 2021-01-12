const { collection } = require("./database");

async function setWishlist({ name, wishes }) {
  await collection("wishlist").insertOne({ name: name, wishes: wishes });
}
exports.setWishlist = setWishlist;
