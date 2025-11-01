import express from "express";
import { acceptRequest, createEvent, getSwapEvents, swapRequest } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.post("/swap-request", swapRequest)
router.post("/swap-response/:id", acceptRequest);;
router.get("/swappable-slots", getSwapEvents);

export default router;
