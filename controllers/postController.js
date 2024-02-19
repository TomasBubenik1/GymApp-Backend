const prisma = require("../lib/prisma");
const imagekit = require("../lib/imagekit");
const upload = require("../utils/multer");
const multer = require("multer");
const crypto = require("crypto");
const { createLikeNotification } = require("./notificationController");

async function createPost(req, res) {
  const { content, video } = req.body;
  const creatingUser = req.session.user;

  if (!creatingUser) {
    res.status(400).json({ message: "You must be logged in to create post!" });
  } else {
    if (req.file) {
      try {
        const randomImageName = crypto.randomBytes(32).toString("hex");

        const uploadResponse = await imagekit.upload({
          file: req.file.buffer.toString("base64"),
          fileName: randomImageName,
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
  const userId = req.session.user?.id;

  if (!postId) {
    return res.status(400).json({ message: "Post ID must be specified." });
  }

  if (!userId) {
    return res
      .status(401)
      .json({ message: "You need to be logged in to like a post." });
  }

  try {
    const existingLike = await prisma.likedPost.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        userId: true,
        likes: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    var updatedLikes;

    if (existingLike) {
      await prisma.likedPost.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
      updatedLikes = (
        await prisma.post.update({
          where: { id: postId },
          data: { likes: { decrement: 1 } },
        })
      ).likes;
    } else {
      await prisma.likedPost.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });

      updatedLikes = (
        await prisma.post.update({
          where: { id: postId },
          data: { likes: { increment: 1 } },
        })
      ).likes;

      const postCreatedById = (
        await prisma.post.findFirst({
          where: {
            id: postId,
          },
          select: {
            createdById: true,
          },
        })
      ).createdById;
      const doesNotiExist = await prisma.notification.findFirst({
        where: {
          senderId: userId,
          userId: postCreatedById,
          referenceId: postId,
        },
      });
      if (userId !== post.userId && !doesNotiExist) {
        await createLikeNotification(postCreatedById, postId, userId);
      }
    }

    return res
      .status(200)
      .json({ message: "Successfully liked the post.", likes: updatedLikes });
  } catch (error) {
    console.error("Error toggling like", error);
    return res.status(500).json({
      message: "An error occurred while toggling the like.",
      error,
    });
  }
}

async function getSinglePost(req, res) {
  let { postId } = req.body;
  postId = parseInt(postId, 10);
  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID." });
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        comments: true,
        createdBy: {
          select: { username: true, nickname: true, profilepicture: true },
        },
      },
    });
    return res.status(200).json({ post });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

module.exports = {
  getSinglePost,
  createPost,
  postComment,
  deletePost,
  toggleLike,
  getAllPosts,
};
