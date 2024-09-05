import { HttpStatus } from '@nestjs/common';

export const sendSuccessResponse = (
    res: any,
    message: string,
    data?: any,
    status: number = HttpStatus.CREATED,
) => {
    res.status(status).json({
        code: 0,
        message,
        data,
    });
};
