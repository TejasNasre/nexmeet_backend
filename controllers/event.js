const Event = require("../models/event");
const { validationResult } = require("express-validator");

const createevent = async (req, res, next) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      event_title,
      event_description,
      event_venue,
      event_startdate,
      event_enddate,
      event_starttime,
      event_endtime,
      event_image,
      event_price,
      organizer,
      organizer_contact,
      form_link,
      category,
      tags,
      event_status,
    } = req.body;

    const event = await Event.create({
      event_title,
      event_description,
      event_venue,
      event_startdate,
      event_enddate,
      event_starttime,
      event_endtime,
      event_image,
      event_price,
      organizer,
      organizer_contact,
      form_link,
      category,
      tags,
      event_status,
    });

    res
      .status(201)
      .json({ success: "Event Successfully Created!", Event: event });
  } catch (error) {
    console.error(error);
    // Pass the error to the error handling middleware
    next(error);
  }
};

const getallevents = async (req, res, next) => {
  try {
    // Fetch all events from the database
    const events = await Event.find();
    // Send the events as a JSON response
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    // If an error occurs, pass the error to the error handling middleware
    next(new Error("Failed to fetch events"));
  }
};

const geteventbyid = async (req, res, next) => {
  try {
    // Extract the event ID from the request parameters
    const { id } = req.params;
    // Find the event with the given ID
    const event = await Event.findById(id);
    // If the event is not found, return a 404 status code
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Send the event as a JSON response
    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    // If an error occurs, pass the error to the error handling middleware
    next(new Error("Failed to fetch event"));
  }
};

const updateevent = async (req, res, next) => {
  try {
    // Extract the event ID from the request parameters
    const { id } = req.params;
    // Find the event with the given ID and update it
    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // If the event is not found, return a 404 status code
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Send the updated event as a JSON response
    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    // If an error occurs, pass the error to the error handling middleware
    next(new Error("Failed to update event"));
  }
};

const deleteevent = async (req, res, next) => {
  try {
    // Extract the event ID from the request parameters
    const { id } = req.params;
    // Find the event with the given ID and delete it
    const event = await Event.findByIdAndDelete(id);
    // If the event is not found, return a 404 status code
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Send a success message as a JSON response
    res.status(200).json({ success: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    // If an error occurs, pass the error to the error handling middleware
    next(new Error("Failed to delete event"));
  }
};
module.exports = {
  createevent,
  getallevents,
  geteventbyid,
  updateevent,
  deleteevent,
};
