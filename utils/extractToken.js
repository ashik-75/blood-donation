const extractToken = (headers) => {
    const token = headers?.authorization?.startsWith('Bearer')
        ? headers?.authorization?.split(' ')[1]
        : null;

    return token;
};

export default extractToken;
