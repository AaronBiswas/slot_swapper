import express from "express";
import { createEvent, getSwapEvents } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/swappable-slots", getSwapEvents);

export default router;
