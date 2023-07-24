export const getReceiverId = (myId, users) => {
  return users[0]._id === myId ? users[1]._id : users[0]._id;
};

export const getReceiverName = (myId, users) => {
  return users[0]._id === myId
    ? `${users[1].firstName} ${users[1].lastName}`
    : `${users[0].firstName} ${users[0].lastName}`;
};

export const getReceiverPicture = (myId, users) => {
  return users[0]._id === myId ? users[1].picture : users[0].picture;
};

export const checkOnlineStatus = (onlineUsers, myId, users) => {
  const receiverId = getReceiverId(myId, users);
  const checkOnline = onlineUsers.find(
    (onlineUser) => onlineUser.userId === receiverId
  );

  return checkOnline?.userId ? true : false;
};
