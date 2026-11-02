import express, { Router } from "express";
// import { validateRequest } from "../middleware/validate";
// import { itemSchemas } from "../validations/itemValidation";
// import * as itemController from "../controllers/itemController";
import { validateRequest } from "../middleware/middleware.js";
import { itemSchemas } from "../validations/itemValidation.js";
import {
    createItem, getAllItems, updateItem, deleteItem
} from "../controllers/productController.js";

const router = Router()

// router.get("/test", (req, res) => {
//     res.json({
//         test:"testok"
//     })
// })

// "/api/v1/items" prefixes all below routes
router.get("/", getAllItems);
router.post(
    "/",
    validateRequest(itemSchemas.create),
    createItem
);
router.put(
    "/:id",
    validateRequest(itemSchemas.update),
    updateItem
);
router.delete("/:id", deleteItem);

export default router