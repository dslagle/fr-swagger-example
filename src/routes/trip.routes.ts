import * as express from "express";
import { Router } from "express";

export const router: Router = express.Router();

router.get("/:id", (request, response) => {
    response.json({ name: "test", id: request.params.id });
});

router.post("/", (request, response) => {
    response.json({ success: true, trip: request.body });
});
