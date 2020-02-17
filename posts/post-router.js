const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

//  List of POSTS
//  select from POSTS
//  all DB operations return a promise
router.get("/", (req, res) => {
  db.select("*")
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get list of posts." });
    });
});

router.get("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .first() // Grabs first object in the array
    .then(posts => {
      res.status(200).json(posts[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get post." });
    });
});

router.post("/", (req, res) => {
  //  Insert INTO posts () values ()
  db.insert(req.body, "id") // WILL GENERATE WARNING WHEN USING SQLITE, IGNORE
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get post." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("posts")
    .where({ id }) // filter
    .update(changes) // only one column is enough
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to update post." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id
  db('posts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to remove post." });
    });
});

module.exports = router;
