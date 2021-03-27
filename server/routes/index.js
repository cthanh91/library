var express = require("express");
var router = express.Router();
const user = require("../controller/user");
const authentication = require("../controller/authentication");
const book = require("../controller/book");
const borrowing = require("../controller/borrowing");
const {
  isLoggedIn,
  isAdmin
} = require("../middleware/authorization");

router.post("/login", authentication.login);
router.post("/logout", isLoggedIn, authentication.logout);

router.get("/book", isLoggedIn, isAdmin, book.getAll);
router.post("/book", isLoggedIn, isAdmin, book.create);
router.put("/book/:id", isLoggedIn, isAdmin, book.update);
router.delete("/book/:id", isLoggedIn, isAdmin, book.destroy);
router.get("/book/search", isLoggedIn, book.search);
router.post("/book/:id/borrow", isLoggedIn, book.borrow);

router.get("/borrowing", isLoggedIn, borrowing.getAll);
router.delete("/borrowing/:id", isLoggedIn, borrowing.destroy);

router.get("/user", isLoggedIn, isAdmin, user.getAll);
router.post("/user", isLoggedIn, isAdmin, user.create);
router.put("/user/:id", isLoggedIn, isAdmin, user.update);
router.delete("/user/:id", isLoggedIn, isAdmin, user.destroy);
router.get("/user/barcode/:barcode", isLoggedIn, isAdmin, user.getByBarcode);

router.get("/identity", isLoggedIn, authentication.checkIdentity);

module.exports = router;
