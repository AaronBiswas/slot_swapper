import { Event } from "../models/event.model.js";

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
    console.log(error)
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
