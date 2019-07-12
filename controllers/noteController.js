const mongoose = require("mongoose");
const Note = mongoose.model("Note");
const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

exports.readNotes = async (req, res, next) => {
  var notes = await Note.find({ userId: req.UserData.userId });
  res.json(notes);
};

exports.readNote = async (req, res, next) => {
  var note = await Note.find({
    userId: req.UserData.userId,
    _id: req.params.id
  });
  res.json(note);
};

exports.createNote = async (req, res, next) => {
  console.log("create note")
  let noteFromBody = Object.assign({}, req.body);
  if (typeof noteFromBody.text !== "undefined" && noteFromBody.text) {
    // notes with urls are saved as links, 0 is text, 1 is link
    noteFromBody.noteType = noteFromBody.text.match(urlRegex) != null ? 1 : 0;
  } else if (noteFromBody.title !== "undefined" && noteFromBody.title) {
    noteFromBody.noteType = noteFromBody.title.match(urlRegex) != null ? 1 : 0;
  } else {
    noteFromBody.noteType = 0; // empty note
  }
  noteFromBody.userId = req.UserData.userId;
  const note = new Note(noteFromBody);

  await note.save();
  res.json({
    status: "Note saved"
  });
};

exports.updateNote = async (req, res, next) => {
  var note = await Note.find({
    userId: req.UserData.userId,
    _id: req.params.id
  });

  if (!note) {
    throw "Note wasn't found for current user.";
  }

  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "Note is update"
  });
};

exports.deleteNote = async (req, res, next) => {
  var note = await Note.find({
    userId: req.UserData.userId,
    _id: req.params.id
  });

  if (!note) {
    throw "Note wasn't found for current user.";
  }
  
  await Note.findByIdAndRemove(req.params.id);
  res.json({
    status: "Note deleted"
  });
};
