const isLoggedIn = (req, res, next) => {
  const user = req.session.user;
  if (!user || !user.username) {
    res.status(401).send();
    return;
  }
  next();
};

const isAdmin = (req, res, next) => {
  const user = req.session.user;
  if (!user || !user.role.includes("Administrator")) {
    res.status(403).send();
    return;
  }
  next();
};

module.exports = {
  isLoggedIn,
  isAdmin
};
