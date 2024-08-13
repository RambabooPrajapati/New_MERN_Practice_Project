const adminMiddleware = (Permissions)=>{
    return (req, res, next)=>{
        if(req.user.role !== 'admin'){
            return res. status(403).json({
                message: 'Access denied, because admin can access only'
            });
        }
        if (Permissions && !Permissions.every((perm) => req.user.Permissions.includes(perm))) {
            return res.status(403).json({ message: 'Access denied, insufficient permissions' });
        }
        
        next();
    };
};

export default adminMiddleware;