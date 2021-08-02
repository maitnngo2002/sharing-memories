import jwt from 'jsonwebtoken';

// next : do something and then move to the next thing
const auth = async (req, res, next) => {
    try {
        // check if the user is authenticated
        const token = req.headers.authorization.split(' ')[1];

        // check if it's google auth or jwt auth
        const isCustomAuth = token.length < 500;

        let decodedData; // data we want to get from the token

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;