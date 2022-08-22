const express = require("express");
const router = express.Router();
const { accessChat } = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, creatGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, dremoveFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;

