const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
try{
    console.log("User header:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Authorization header missing" });
}
    const token = authHeader.split(" ")[1];
     if (!token) {
      return res.status(401).send({ message: "Token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}
catch (error) {
    res.status(401).send({ message: "Invalid token" });
}
}