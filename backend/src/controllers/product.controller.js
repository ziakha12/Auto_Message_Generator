import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
    const {productName, price, quantity} = req.body;
    const vendorId = req.user._id

    if([productName, price, quantity].some(e => e?.trim() === "")){
        throw new ApiError(401, "all feilds are required")
    }

    const product = await Product.create({
        userId : vendorId,
        productName,
        price,
        quantity
    })
})