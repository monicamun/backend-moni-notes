const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const noteController = require("../controllers/noteController");
const { catchErrors } = require("../handlers/errorHandler");
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/", authController.validateIdToken, catchErrors(noteController.readNotes));

router.get("/:id",authController.validateIdToken, catchErrors(noteController.readNote));

router.post("/",authController.validateIdToken, catchErrors(noteController.createNote));

router.put("/:id",authController.validateIdToken, catchErrors(noteController.updateNote));

router.delete("/:id",authController.validateIdToken, catchErrors(noteController.deleteNote));

module.exports = router;
