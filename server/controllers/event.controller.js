import { Event } from "../models/event.model.js";
import { SwapSlot } from "../models/swap_slot.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime, date, status, userId } = req.body;
    const newEvent = new Event({
      title,
      startTime,
      endTime,
      date,
      status,
      userId,
    });

    const existingEvent = await Event.findOne(req.body);
    if (existingEvent) {
      return res.status(409).json({ message: "Event already exists!" });
    }

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSwapEvents = async (req, res) => {
  try {
    const getSwapEvents = await Event.find({ status: "swappable" });

    const userId = req.user._id;
    const filteredEvents = getSwapEvents.filter(
      (event) => event.userId.toString() !== userId.toString()
    );

    res.status(200).json(filteredEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const swapRequest = async (req, res) => {
  try {
    const userId = req.user._id;
     console.log(userId)
    const { friendEventID, userEventId } = req.body;

    if (!userEventId || !friendEventID) {
      throw new Error();
    }

    const UserEvent = await Event.findOne({ userEventId });

    const friendEvent = await Event.findOne({ friendEventID });

    try {
      const request = await SwapSlot.create({
        fromUserId: userId,
        toUserId: friendEvent.userId,
        fromEventId: UserEvent,
        toEventId: friendEvent,
        status: "pending",
      });
      return res.status(200).json(request);
    } catch (error) {
      console.log("Error creating event", error);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
