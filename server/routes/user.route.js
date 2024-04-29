import express from "express";
import {
  bookEventHandler,
  createEvent,
  deleteEvent,
  getBookedEvents,
  getEvents,
  getUserEvent,
  cancelBooking
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/event", createEvent);
router.get("/event", getUserEvent);
router.patch("/bookEvent", bookEventHandler);
router.delete("/deleteEvent/:_id", deleteEvent);
router.get("/allEvents", getEvents);
router.get("/bookedEvents", getBookedEvents);
router.patch('/cancelbooking',cancelBooking)

export default router;
