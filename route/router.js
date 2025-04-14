const { randomID } = require("@suryaannadurai/required_package");
const express = require("express");

const fs = require("node:fs");
const path = require("node:path");
// import express from "express"
// import { nanoid } from "nanoid";
// import fs from "fs"
// import path  from "path";

const filePath = path.join(__dirname, "urlData.json");

const router = express.Router();
router.use(express.urlencoded());

router.post("/post", (req, res) => {
  let inputUrl = req.body.longurl;
  let id = randomID();
  let shortUrl = `http://localhost:3000/${id}`;

  const file = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  file[id] = inputUrl;
  console.log(file, "file");
  console.log(filePath, "file");

  fs.writeFileSync(filePath, JSON.stringify(file), "utf-8");
  console.log("File written successfully");

  res.send({
    message: "Short URL Created successfully",
    shortUrl,
  });
});


router.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.dirname("") });
});



router.get("/:shorturl", (req, res) => {
  const val = req.params.shorturl;
  const file = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const link = file[val];
  res.redirect(link);
});

// export default router;
module.exports = router;
