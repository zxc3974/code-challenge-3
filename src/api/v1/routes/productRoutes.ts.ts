import express, { Router } from "express";
// import { validateRequest } from "../middleware/validate";
// import { itemSchemas } from "../validations/itemValidation";
// import * as itemController from "../controllers/itemController";
import { validateRequest } from "../middleware/middleware.js";
import { itemSchemas } from "../validations/itemValidation.js";
import { createItem } from "../controllers/productController.js";

const router = Router()

// router.get("/test", (req, res) => {
//     res.json({
//         test:"testok"
//     })
// })

router.post(
    "/api/v1/products",
    validateRequest(itemSchemas.create),
    createItem
);

export default router