const asyncHandler  = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = asyncHandler(async(req, res) => {
  const { userId} = req.body;

  if(!userId) {
    res.status(400);
    throw new Error('Please provide all required fields')
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and:[
      { users: { $elemMatch: { $eq: req.user._id} } },
      { users: { $elemMatch: { $eq: userId}}}
    ]
  }).populate("users", "-password").populate("latestMessage", "-message");
  
  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });

  if(isChat.length > 0) {
    res.send(isChat[0])
  } else {
   var chatData = {
    chatName: "sender",
    isGroupChat: "false",
    users:[req.user._id, userId],
   };
   try{
    const createdChat = await Chat.create(chatData);

    const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");

    res.status(200).send(FullChat);
   }
   catch(err){
    res.status(500);
    throw new Error('failed to create user')
   }
  }
}
); 

module.exports = { accessChat };