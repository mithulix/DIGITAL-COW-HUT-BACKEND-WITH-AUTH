import { RequestHandler } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { UserService } from "./user.service";

//------create a new User controller --------------------------------
const createUser:RequestHandler = catchAsync() => {
    async (req:Request, res:Response) => {
        const user = req.body;

        const savedUser = await UserService.createUser(user);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User created successfully',
            data: savedUser
        });
    }
};

//------update a User controller --------------------------------
const updateUser:RequestHandler = catchAsync( async(req:Reuqest, res:Response) => {
    const {id} = req.params;
    const {user} = req.body;

    const 
    )
}