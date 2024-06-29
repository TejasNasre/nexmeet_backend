const express = require("express");
const router = express.Router();
const {
  createevent,
  getallevents,
  geteventbyid,
  updateevent,
  deleteevent,
} = require("../controllers/event");

router.post("/createevent", createevent);
router.get("/getallevents", getallevents);
router.get("/getevent/:id", geteventbyid);
router.put("/updateevent/:id", updateevent);
router.delete("/deleteevent/:id", deleteevent);

module.exports = router;
