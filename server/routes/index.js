var express = require("express");
var router = express.Router();
const user = require("../controller/user");
const authentication = require("../controller/authentication");
const book = require("../controller/book");
const borrowing = require("../controller/borrowing");
const authorization = require("../middleware/authorization");

router.post("/login", authentication.login);
router.post("/logout", authorization, authentication.logout);

router.get("/book", authorization, book.getAll);
router.post("/book", authorization, book.create);
router.put("/book/:id", authorization, book.update);
router.delete("/book/:id", authorization, book.destroy);
router.get("/book/search", authorization, book.search);
router.post("/book/:id/borrow", authorization, book.borrow);

router.get("/borrowing", authorization, borrowing.getAll);
router.delete("/borrowing/:id", authorization, borrowing.destroy);

router.get("/user", authorization, user.getAll);
router.post("/user", authorization, user.create);
router.put("/user/:id", authorization, user.update);
router.delete("/user/:id", authorization, user.destroy);

router.get("/identity", authorization, authentication.checkIdentity);

module.exports = router;
