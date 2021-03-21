var express = require("express");
var router = express.Router();
const user = require("../controller/user");
const authentication = require("../controller/authentication");
const book = require("../controller/book");
const borrowing = require("../controller/borrowing");
const isLoggedIn = require("../middleware/authorization");

router.post("/login", authentication.login);
router.post("/logout", isLoggedIn, authentication.logout);

router.get("/book", isLoggedIn, book.getAll);
router.post("/book", isLoggedIn, book.create);
router.put("/book/:id", isLoggedIn, book.update);
router.delete("/book/:id", isLoggedIn, book.destroy);
router.get("/book/search", isLoggedIn, book.search);
router.post("/book/:id/borrow", isLoggedIn, book.borrow);

router.get("/borrowing", isLoggedIn, borrowing.getAll);
router.delete("/borrowing/:id", isLoggedIn, borrowing.destroy);

router.get("/user", isLoggedIn, user.getAll);
router.post("/user", isLoggedIn, user.create);
router.put("/user/:id", isLoggedIn, user.update);
router.delete("/user/:id", isLoggedIn, user.destroy);

router.get("/identity", isLoggedIn, authentication.checkIdentity);

module.exports = router;
