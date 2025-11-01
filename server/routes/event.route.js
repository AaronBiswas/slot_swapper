import express from "express";
import { createEvent, getSwapEvents, swapRequest } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.post("/request", swapRequest);
router.get("/swappable-slots", getSwapEvents);

export default router;
