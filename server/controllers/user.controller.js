import Event from "../models/event.model.js";

const createEvent = async (req, res) => {
  try {
    const { eventName, location, avatar, description, userId } = req.body;
    const newEvent = await new Event({
      eventName,
      location,
      avatar,
      description,
      hostedBy: userId,
    }).save();
    
    if (newEvent) {
      res
        .status(201)
        .json({ success: true, message: "event createed succesfully" });
    }
  } catch (error) {
    res.status(404).json("Error creating events");
  }
};
const getUserEvent = async (req, res) => {
  try {
    const { id } = req.query;
    const eventData = await Event.find({ hostedBy: id });
    if (eventData) {
      res.status(201).json({ success: true, data: eventData });
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(404).json({ success: false, message: "can find right now" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { _id } = req.params;

    const response = await Event.deleteOne({ _id });
    if (response.deletedCount === 1) {
      console.log(response);
      return res
        .status(202)
        .json({ success: true, message: "Event deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const { search } = req.query;

    // Define a regular expression for case-insensitive search
    const regex = new RegExp(search, "i");

    // Search for events matching the eventName or location
    const events = await Event.find({
      $or: [{ eventName: { $regex: regex } }, { location: { $regex: regex } }],
    });

    res.status(200).json({ message: "success", events });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const bookEventHandler = async (req, res) => {
  try {
    console.log(req.query);
    const { id, userId } = req.query;
    const responce = await Event.findByIdAndUpdate(
      { _id: id },
      { $push: { bookedBy: userId } },
      { new: true }
    );
    if (responce) {
      res.status(201).json({ message: "event booked" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getBookedEvents = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const events = await Event.find({ bookedBy: { $in: [id] } });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.query;
    const response = await Event.findByIdAndUpdate(
      { _id: bookingId },
      { $pull: { bookedBy: userId } },
      { new: true }
    );
    if (response) {
      res.status(200).json({ message: "Cancelled successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createEvent,
  getUserEvent,
  deleteEvent,
  getEvents,
  bookEventHandler,
  getBookedEvents,
  cancelBooking,
};
