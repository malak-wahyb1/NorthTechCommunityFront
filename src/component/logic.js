export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? users[1].first_name
    : users[0].first_name;
};
export const getImage = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? `http://localhost:5000/${users[1].media}`
    : `http://localhost:5000/${users[0].media}`;
};
export const Friendacc = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? users[1].first_name
    : users[0].first_name;
};
export const getId = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1]._id : users[0]._id;
};
export const newChat = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
