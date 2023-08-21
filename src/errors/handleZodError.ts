import { error } from "console";

const handleZodError = (error: ZodError) => {
    const errors = IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message,
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: "Zod validation error",
        errorMessages: error
    }
};

export default handleZodError;