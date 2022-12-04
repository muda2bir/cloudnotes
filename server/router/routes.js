const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");

router.post("/register", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  if (!name || !email || !password || !confirm_password)
    return res.status(422).json({ error: "Please Fill all the Details!!" });

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists)
      return res.status(422).json({ error: "User Already Exists!!" });

    if (password !== confirm_password)
      return res.status(422).json({ error: "Password are not matching!!" });

    const user = new User({ name, email, password, confirm_password });
    await user.save();

    const token = await user.generateAuthToken();

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2589200000),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({ message: "User Registered Successfully!!" });
  } catch (error) {
    res.send(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ error: "Please Fill all the Details!!" });

  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).json({ error: "Email or Password is Incorrect!!" });

  // Verifying the Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ error: "Email or Password is Incorrect!!" });

  // Generating Token
  const token = await user.generateAuthToken();

  res.cookie("jwtoken", token, {
    expires: new Date(Date.now() + 2589200000),
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({ message: "User Logged In Successfully!!" });
});

router.get("/notes", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/home", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged Out!!");
});

router.post("/savenote", authenticate, async (req, res) => {
  const { title, note } = req.body;

  if (!title)
    return res
      .status(422)
      .json({ error: "Please Give the title to the note!!" });

  const user = await User.findOne({ _id: req.UserID });

  await user.saveNote(title, note);

  res.json({ message: "Note Saved Successfully!!" });
});

router.put("/updatenotes", authenticate, async (req, res) => {
  const { title, noteContent, noteID } = req.body;

  if (!title)
    return res
      .status(422)
      .json({ error: "Please Give the title to the note!!" });

  await User.updateOne(
    { _id: req.UserID, "notes._id": noteID },
    {
      $set: {
        "notes.$.title": title,
        "notes.$.note": noteContent,
      },
    }
  );

  res.json({ message: "Note Updated Successfully!!" });
});

router.delete("/deletenotes", authenticate, async (req, res) => {
  const { noteID } = req.body;

  await User.updateOne(
    { _id: req.UserID, "notes._id": noteID },
    {
      $pull: { notes: { _id: noteID } },
    }
  );
  res.json({ message: "Note Deleted Successfully!!" });
});

module.exports = router;
