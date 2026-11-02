import { Request, Response, NextFunction } from "express";
// import { HTTP_STATUS } from "../../../constants/httpConstants";
// import * as itemService from "../services/itemService";
// import { Item } from "../models/itemModel";
// import { successResponse } from "../models/responseMod
import { HTTP_STATUS } from "../../../constants/httpConstatns.js";
import * as itemService from "../services/productServices.js"
import { ProductModels } from "../models/productModel.js";
import { successResponse } from "../models/responseModel.js";




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