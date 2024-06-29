const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_title: {
      type: String,
      required: true,
    },
    event_description: {
      type: String,
      required: true,
    },
    event_venue: {
      type: String,
      required: true,
    },
    event_startdate: {
      type: Date,
      required: true,
    },
    event_enddate: {
      type: String,
      required: true,
    },
    event_starttime: {
      type: String,
      required: true,
    },
    event_endtime: {
      type: String,
      required: true,
    },
    event_image: {
      type: String,
      required: true,
    },
    event_price: {
      type: Number,
      required: true,
    },
    organizer: {
      type: "String",
      required: true,
    },
    organizer_contact: {
      type: String,
      required: true,
    },
    form_link: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    event_status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
