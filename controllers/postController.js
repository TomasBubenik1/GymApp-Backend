const prisma = require("../lib/prisma");
const imagekit = require("../lib/imagekit");
const upload = require("../utils/multer");
const multer = require("multer");
const crypto = require("crypto");

async function createPost(req, res) {
  const { content, video } = req.body;
  const creatingUser = req.session.user;

  if (!creatingUser) {
    res.status(400).json({ message: "You must be logged in to create post!" });
  } else {
    if (req.file) {
      try {
        const randomName = crypto.randomBytes(32).toString("hex");
        const uploadResponse = await imagekit.upload({
          file: req.file.buffer.toString("base64"),
          fileName: randomName,
          folder: "PostImages",
        });

        const NewPost = await prisma.post.create({
          data: {
            userId: creatingUser.id,
            content: content,
            image: uploadResponse.name,
            video: video,
            createdById: creatingUser.id,
          },
        });
        res.status(200).json({ NewPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading file" });
      }
    } else {
      try {
        const NewPost = await prisma.post.create({
          data: {
            userId: creatingUser.id,
            content: content,
            createdById: creatingUser.id,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating new post" });
      }
    }
  }
}

async function deletePost(req, res) {
  const { postId } = req.body;
  const user = req.session.user;
  if (!postId) {
    res
      .status(400)
      .json({ message: "You must specify the postId you want to comment on!" });
  } else if (!user) {
    res.status(400).json({ message: "You must be logged in to delete post!" });
  } else {
    post = await prisma.post.findUnique({
      where: { postId: postId },
    });
    if (post.createdById != user.id) {
      res
        .status(400)
        .json({ message: "You cant delete a post you didnt create!" });
    } else if ((post.createdById = user.id)) {
      await prisma.post.delete({
        where: { post: postId },
      });
    }
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: {
          select: {
            username: true,
            nickname: true,
            profilepicture: true,
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("There was error getting posts");
  }
}

async function postComment(req, res) {
  const { content, image, video, postId } = req.body;
  const creatingUser = req.session.user;

  if (!postId) {
    res
      .status(400)
      .json({ message: "You must specify the postId you want to comment on!" });
  } else if (!content) {
    if (!image) {
      if (!video) {
        res.status(400).json({ message: "You cant create an empty post!" });
      }
    }
  } else if (!creatingUser) {
    res.status(400).json({ message: "You must be logged in to create post!" });
  } else {
    const NewComment = await prisma.comment.create({
      data: {
        userId: creatingUser.id,
        content: content,
        image: image,
        video: video,
        createdById: creatingUser.id,
        postId: postId,
      },
    });
    res.status(200).json({ NewComment });
  }
}
async function toggleLike(req, res) {
  const { postId } = req.body;
  const user = req.session.user;

  if (!postId) {
    res
      .status(400)
      .json({ message: "You must specify the postId you want to like!" });
  } else if (!user) {
    res
      .status(400)
      .json({ message: "You need to be logged in to like a post!" });
  }

  try {
    const likedPost = await prisma.likedPost.findUnique({
      where: { postId: postId, userId: user.id },
    });
    if (likedPost) {
      await prisma.likedPost.delete({
        where: { postId, userId: user.id },
      });
      res.status(200).json({ message: "Sucesfully unliked post" });
    } else {
      await prisma.likedPost.create({
        data: {
          userId: user.id,
          postId: postId,
        },
      });
      res.status(200).json({ message: "Sucesfully liked post" });
    }
  } catch (erorr) {
    res.status(500).json({ message: "There was error liking the post!" });
  }
}

module.exports = {
  createPost,
  postComment,
  deletePost,
  toggleLike,
  getAllPosts,
};
