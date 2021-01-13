const { collection } = require("./database");
const { ObjectID } = require("mongodb");

async function setWishlist({ name, wishes }) {
  return await collection("wishlist").insertOne({ name: name, wishes: wishes });
}

async function getWishlistById(id) {
  const objectId = new ObjectID.createFromHexString(id);
  return await collection("wishlist").findOne({ _id: objectId });
}
async function updateWishlist({ id, wish }) {
  const objectId = new ObjectID.createFromHexString(id);
  const filter = { _id: objectId };
  const update = {
    $push: { wishes: wish },
  };
  return await collection("wishlist").updateOne(filter, update);
}
exports.setWishlist = setWishlist;
exports.getWishlistById = getWishlistById;
exports.updateWishlist = updateWishlist;
