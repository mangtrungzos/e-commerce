import { Product } from "../../models/Product";
import { Request, Response, NextFunction } from "express";

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    }
    catch(err) {
        next(err);
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        res.status(200).json(product);
    }
    catch(err) {
        next(err);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch(err) {
        next(err);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // if category is null, use $unset toremove it
        if(updateData.category === null) {
            updateData.$unset = { category: "" };
            delete updateData.category;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if(!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch(err) {
        next(err);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch(err) {
        next(err);
    }
}

