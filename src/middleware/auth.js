import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "shhhh-its-a-secret";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.sendStatus(401).json({ error: "Token no proporcionado"});
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403).json({ error: "Token inválido o expirado" });
        }

        req.user = user; // { id, role, iat, exp }
        next();
    });
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403).json({ error: "Acceso denegado" });
        }
        next();
    };
};