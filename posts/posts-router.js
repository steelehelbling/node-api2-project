const express = require("express");
const Posts = require("../data/db.js");
const router = express.Router();

router.post("/", (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.insert(postInfo)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const commentInfo = { ...request.body, post_id: id };

  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!request.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.insertComment(commentInfo)
      .then((comment) => {
        res.status(201).json(comment);
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      });
  }
});
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({
        message: "The post information could not be retrieved.",
      });
    });
});
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then((post) => {
      if (post.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});
router.delete("/:id", (req, res) => {
  const { id } = request.params;
  Posts.remove(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "The post could not be removed" });
    });
});
router.put("/:id", (req, res) => {
  const { id } = Number(req.params);
  const updates = request.body;
  Posts.update(id, updates)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!updates.title || !updates.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});
module.exports = router;
