import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { ProductModels } from "../models/productModel.js";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository.js";

// reference to the firestore collection name
const COLLECTION: string = "items";

/**
 * Retrieves all items from storage
 * @returns Array of all items
 */
export const getAllItems = async (): Promise<ProductModels[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const items: ProductModels[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
            } as ProductModels;
        });

        return items;
    } catch (error: unknown) {
        throw error;
    }
};


/**
 * Creates a new item
 * @param itemData - The data for the new item (name and description)
 * @returns The created item with generated ID
 */
export const createItem = async (itemData: {
    name: string;
    description: string;
    price?: number;
}): Promise<ProductModels> => {
    const dateNow = new Date();
    const newItem: Partial<ProductModels> = {
        ...itemData,
        createdAt: dateNow,
        updatedAt: dateNow,
    };

    const itemId: string = await createDocument<ProductModels>(COLLECTION, newItem);

    return structuredClone({ id: itemId, ...newItem } as ProductModels);
};
