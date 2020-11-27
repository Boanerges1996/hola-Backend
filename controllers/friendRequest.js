const FriendRequestModel = require("../model/friendRequest");

const invitation = (io, data) => {
  try {
    let newFriend = new FriendRequestModel({ ...data });
    await newFriend.save();
    let allFriends = await FriendRequestModel.find({
      to_id: req.body.to_id,
    }).populate("from_id", "name email avatar").populate("to_id", "name email avatar");
    io.sockets.in(data.to_id).emit("friend-request", allFriends);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getAllFriendRequest = async(req,res)=>{
    try{
        const id = req.params.id
        let friendReqs = await FriendRequestModel.find({to_id:id}).populate("from_id", "name email avatar").populate("to_id", "name email avatar")
        res.send(friendReqs)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

module.exports ={
    invitation,
    getAllFriendRequest
}
