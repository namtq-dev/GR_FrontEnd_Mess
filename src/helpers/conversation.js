export const getReceiverId = (myId, users) => {
  return users[0]._id === myId ? users[1]._id : users[0]._id;
};
