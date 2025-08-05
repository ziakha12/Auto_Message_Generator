import e from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating token")
    }
}

const createUser = asyncHandler(async (req, res) => {

    const {username, email, password, phoneNumber} = req.body;
    if([username, email, password, phoneNumber].some(e => e?.trim() === " ")){
        throw new ApiError(401, "All feilds are required")
    }
    const existedUser = await User.findOne({
        $or : [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with same email or username is already exist try another one")
    }
    const user = await User.create({
        username,
        email,
        password,
        phoneNumber
    })

    const registerUser = await User.findById(user?._id).select('-password')

    return res.status(200)
    .json(new ApiResponse(200, registerUser, "Vendor is created successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
       throw new ApiError(401, "All feilds are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "vendor not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        throw new ApiError(409, "incorrect password")
    }

    const accessToken = await generateToken(user._id)

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
    .cookie('accessToken', accessToken, options)
    .json(new ApiResponse(200, {
        user,
        accessToken
    }, 'Vendor logged in successfully'))
})

const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const options = {
        httpOnly : true,
        secure : true
    }
    return res.status(200)
    .clearCookie('accessToken', options)
    .json(new ApiResponse(200, {}, "vendor logout successfully"))
})

const updateUserDetails = asyncHandler(async (req, res) => {
    const {username, email, phoneNumber} = req.body;
    const user = req.user

    if(!username && !email && !phoneNumber){
        throw new ApiError(409, 'atleast one feild is required')
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set : {
                username,
                email,
                phoneNumber
            }
        },
        {
            new : true
        }
    ).select('-password')

    if(!updatedUser){
        throw new ApiError(500, "something went wrong while updating Vendor")
    }

    return res.status(200)
    .json(new ApiResponse(200, updatedUser, 'vendor is updated successfully'))
})

const changePassword = asyncHandler(async (req, res) => {
    const user = req.user;
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new ApiError(401, "all feilds are required")
    }

    const loggedInUser = await User.findById(user._id)
    
    const isPasswordCorrect = await loggedInUser.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(409, "your old password is incorrect")
    }

    loggedInUser.password = newPassword
   await loggedInUser.save()

    return res.status(200)
    .json(new ApiResponse(200, loggedInUser, "Password updated successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(200)
    .json(new ApiResponse(200, user, 'vendor fetched successfully'))
})

const avatarChange = asyncHandler( async(req, res) => {
    const localFilePath = req?.file.path
    const userId = req.user._id

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath)

    if (!cloudinaryResponse || !cloudinaryResponse.url) {
        throw new ApiError(402, "Avatar Upload failed")
    }
     
    const updateUserAvtar = await User.findByIdAndUpdate(
        userId,
        {avatar:cloudinaryResponse.url},
        {new: true}
    )

     return res.status(200)
     .json(new ApiResponse(200, updateUserAvtar.avatar, "Update Avatar Successfully"))
})

export {
    createUser,
    loginUser,
    logoutUser,
    updateUserDetails,
    changePassword,
    getCurrentUser,
    avatarChange

}