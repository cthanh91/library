module.exports = (req, res, next) => {
  const user = req.session.user;
  if (!user || !user.username) {
    res.status(401).send();
    return;
  }
  next();
};
