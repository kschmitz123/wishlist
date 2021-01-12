export async function getLists() {
  const response = await fetch("http://localhost:5000/lists");
  const lists = await response.json();
  return lists;
}
export async function getListById(id) {
  const response = await fetch(`http://localhost:5000/lists/${id}`);
  const list = await response.json();
  return list;
}
export async function deleteListById(id) {
  await fetch(`http://localhost:5000/lists/${id}`, {
    method: "DELETE",
  });
}
export async function postList(title) {
  const response = await fetch(`http://localhost:5000/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(title),
  });
  const newList = await response.json();
  return newList;
}
export async function patchListItem(id, wish) {
  await fetch(`http://localhost:5000/lists/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      wishes: wish,
    }),
  });
}
