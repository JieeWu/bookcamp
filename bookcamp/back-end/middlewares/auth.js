// 認證用的 middleware 
// session用auth的方式
export default function auth(req, res, next) {
  if (req.session.userId) {
    console.log("authenticated");
    next();
  } else {
    console.log("Unauthenticated");
    return res.status(401).json({ message: "Unauthorized" });
  }
}
