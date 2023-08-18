import {NextFunction, Request, Response} from "express";

export const checkQueryParams = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.filename || !req.query.width || !req.query.height) {
        res.status(400).send('Missing one or more query parameters!' +
            ' Please specify the image filename, desired resize width, and desired resize height!');
    } else if (isNonNumericCheck(req.query.width as string)) {
        res.status(400).send('Please enter a valid width value!');
    } else if (isNonNumericCheck(req.query.height as string)) {
        res.status(400).send('Please enter a valid height value!');
    } else {
        next();
    }
}


function isNonNumericCheck(numberStr: string) {
    return isNaN(Number(numberStr));
}
module.exports = {checkQueryParams};
