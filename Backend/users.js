let users = [];

function addUser(user) {
  users.push(user);
}

function removeUser(id) {
  users = users.filter(user => user.id !== id);
}

function getUsersByRoom(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  addUser,
  removeUser,
  getUsersByRoom
};