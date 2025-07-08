const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//ROUTE 1: CREATION OF A USER using GET: /api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Some error Occured" });
  }
});

//ROUTE 2: Adding a new Note POST: /api/notes/addnote. Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description,tag} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user:req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error Occured" });
    }
  }
);

//ROUTE 3: Updating an existing Note PUT: /api/notes/updatenote. Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description,tag} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //creating a new note object , update krne ke liye
      const newNote={};//ye aput req mei body fill krega
      if(title){newNote.title=title}//updating values
      if(description){newNote.description=description}
      if(tag){newNote.tag=tag}
      let note=await Notes.findById(req.params.id)
      if(!note){
        return res.status(404).send("Not found");
      }
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("User Not allowed")
      }

      note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({note});
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error Occured" });
    }
  }
);


//ROUTE 4: Deleting a Note DELETE: /api/notes/deletenote. Login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      let note=await Notes.findById(req.params.id)
      if(!note){
        return res.status(404).send("Not found");
      }
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("User Not allowed")
      }
      note=await Notes.findByIdAndDelete(req.params.id)
      res.json({"Success":"Deleted note successfully",note:note});
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error Occured" });
    }
  }
);

module.exports = router;
