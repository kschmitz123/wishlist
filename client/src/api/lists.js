export async function getLists() {
  const res = await fetch("/api/lists");
  const lists = await res.json();
  return lists;
}
export async function getListById(id) {
  const res = await fetch(`/api/lists/${id}`);
  const list = await res.json();
  return list;
}
export async function deleteListById(id) {
  await fetch(`/api/lists/${id}`, {
    method: "DELETE",
  });
}
export async function postList(data) {
  const res = await fetch(`/api/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const newList = await res.json();
  return newList;
}
export async function patchListItem(data) {
  return await fetch(`/api/wishlist/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
