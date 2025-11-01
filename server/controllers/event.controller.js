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
    const userId = req.user?._id.toString();

    const { friendEventID, userEventId } = req.body;

    if (!userEventId || !friendEventID) {
      return res.status(400).json({
        message: "Both userEventId and friendEventId are required.",
      });
    }

    const UserEvent = await Event.findById(userEventId);

    const friendEvent = await Event.findById(friendEventID);
    console.log(friendEventID);
    if (!UserEvent || !friendEvent) {
      return res.status(400).json({
        message: "No event are present.",
      });
    }

    try {
      const request = await SwapSlot.create({
        fromUserId: userId,
        toUserId: friendEvent.userId,
        fromEventId: UserEvent?._id.toString(),
        toEventId: friendEvent?._id.toString(),
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

export const acceptRequest = async (req, res) => {
  try {
    const { requestState } = req.body;
    const { slotId } = req.params;
    if (!slotId) {
      return res.status(400).json({
        message: "Slot Id required",
      });
    }

    const findslot = await SwapSlot.findById(slotId);

    if (!findslot) {
      return res.status(400).json({
        message: "No slot exists",
      });
    }

    const fromEventId = findslot.fromEventId;
    const toEventId = findslot.toEventId;

    const toUserId = findslot.toUserId;
    const fromUserId = findslot.fromUserId;

    const fromEvent = await Event.findById(fromEventId);
    const toEvent = await Event.findById(toEventId);

    const fields = ["title", "startTime", "endTime", "date"];

    const temp = {};
    fields.forEach((f) => (temp[f] = fromEvent[f]));

    fields.forEach((f) => (fromEvent[f] = toEvent[f]));
    fields.forEach((f) => (toEvent[f] = temp[f]));

    await fromEvent.save();
    await toEvent.save();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
