// routes/blogRoutes.js
const express = require("express");
const blogController = require("../controllers/blogController");
const authenticateUser = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * /api/blog/post:
 *   post:
 *     summary: Create a new blog post
 *     description: This API allows authenticated users to create a new blog post by providing a title and description.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_title:
 *                 type: string
 *                 description: The title of the blog
 *                 example: My First Blog
 *               blog_description:
 *                 type: string
 *                 description: The description or content of the blog
 *                 example: This blog is about my experiences as a developer.
 *             required:
 *               - blog_title
 *               - blog_description
 *     responses:
 *       "201":
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blog_id:
 *                   type: integer
 *                   description: The unique ID of the created blog
 *                   example: 1
 *                 blog_title:
 *                   type: string
 *                   description: The title of the created blog
 *                   example: My First Blog
 *                 blog_description:
 *                   type: string
 *                   description: The description of the created blog
 *                   example: This blog is about my experiences as a developer.
 *                 user_id:
 *                   type: integer
 *                   description: The ID of the user who created the blog
 *                   example: 42
 *       "400":
 *         description: Title and description are required
 *       "401":
 *         description: Unauthorized, user not authenticated
 *       "500":
 *         description: Server error
 */
router.post("/post", authenticateUser, blogController.createBlog);

/**
 * @swagger
 * /api/blog/all:
 *   get:
 *     summary: This API is used to get all blogs.
 *     description: This API is used to get all blogs.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: List of blogs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_id:
 *                     type: integer
 *                     description: ID of the blog
 *                     example: 101
 *                   blog_title:
 *                     type: string
 *                     description: Title of the blog
 *                     example: "My first blog"
 *                   blog_description:
 *                     type: text
 *                     description: Description of the blog
 *                     example: "This is the description of my blog"
 *                   user_id:
 *                     type: integer
 *                     description: ID of the user who posted the blog
 *                     example: 123
 *       "500":
 *         description: Server error
 */
router.get("/all", authenticateUser, blogController.getBlogs);

/**
 * @swagger
 * /api/blog/{blog_id}:
 *   put:
 *     summary: Update a blog
 *     description: Update the title and description of a specific blog.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_title:
 *                 type: string
 *                 description: The new title of the blog
 *                 example: Updated Blog Title
 *               blog_description:
 *                 type: string
 *                 description: The new description of the blog
 *                 example: This blog content has been updated to reflect recent changes.
 *             required:
 *               - blog_title
 *               - blog_description
 *     responses:
 *       "200":
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blog_id:
 *                     type: integer
 *                     description: ID of the blog
 *                     example: 101
 *                   blog_title:
 *                     type: string
 *                     description: Title of the blog
 *                     example: "My first blog"
 *                   blog_description:
 *                     type: text
 *                     description: Description of the blog
 *                     example: "This is the description of my blog"
 *                   user_id:
 *                     type: integer
 *                     description: ID of the user who posted the blog
 *                     example: 123
 *       "500":
 *         description: Server error
 */
router.put("/:blog_id", authenticateUser, blogController.updateBlog);

/**
 * @swagger
 * /api/blog/{blog_id}:
 *   delete:
 *     summary: This API is used to delete a blog.
 *     description: This API is used to delete a blog.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         required: true
 *         description: Numeric blog ID required
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful deletion
 *       "404":
 *         description: Blog not found
 */
router.delete("/:blog_id", authenticateUser, blogController.deleteBlog);

// Fetch a specific blog by ID
router.get('/:blog_id', authenticateUser, blogController.getBlogById);

module.exports = router;