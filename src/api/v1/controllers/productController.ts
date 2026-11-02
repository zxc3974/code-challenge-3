import { Request, Response, NextFunction } from "express";
// import { HTTP_STATUS } from "../../../constants/httpConstants";
// import * as itemService from "../services/itemService";
// import { Item } from "../models/itemModel";
// import { successResponse } from "../models/responseMod
import { HTTP_STATUS } from "../../../constants/httpConstatns.js";
import * as itemService from "../services/productServices.js"
import { ProductModels } from "../models/productModel.js";
import { successResponse } from "../models/responseModel.js";




/**
 * Manages requests and reponses to retrieve all items
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: ProductModels[] = await itemService.getAllItems();
        res.status(HTTP_STATUS.OK).json(
            successResponse(items, "Items successfully retireved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, reponses, and validation to create an item
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract only the fields we want (destructuring)
        // const name: string = req.body.name;
        // const description: string = req.body.description;
        const { name, description, price } = req.body;

        const newItem: ProductModels = await itemService.createItem({
            name,
            description,
            price,
        });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newItem, "Item created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to update an item
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // the ":id" route segment is always a single string
        const id = req.params.id as string;

        // Extract update fields
        const { name, description, price } = req.body;

        // create the update item object with the fields to be updated
        const updatedItem: ProductModels = await itemService.updateItem(id, {
            name,
            description,
            price,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedItem, "Item updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to delete an item
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // the ":id" route segment is always a single string
        const id = req.params.id as string;

        await itemService.deleteItem(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Item successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};
