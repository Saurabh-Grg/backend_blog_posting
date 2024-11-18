const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { blog_title, blog_description } = req.body;

  if (!blog_title || !blog_description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const blog = await Blog.create({ blog_title, blog_description, user_id: req.user.user_id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    // Check if pagination parameters are provided in the query
    const page = parseInt(req.query.page); // If page is provided, it will be a number or NaN
    const limit = parseInt(req.query.limit); // If limit is provided, it will be a number or NaN

    // Default behavior: If no pagination parameters, fetch all blogs
    if (isNaN(page) || isNaN(limit)) {
      const blogs = await Blog.findAll();
      return res.status(200).json(blogs); // Return all blogs
    }

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Fetch blogs with pagination
    const blogs = await Blog.findAll({
      limit: limit,
      offset: offset,
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blog_id } = req.params;

    // Fetch the blog by ID
    const blog = await Blog.findOne({ where: { blog_id } });

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const updateBlog = async (req, res) => {
  const { blog_id } = req.params;
  const { blog_title, blog_description } = req.body;

  try {
    const blog = await Blog.findByPk(blog_id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.user_id !== req.user.user_id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    blog.blog_title = blog_title || blog.blog_title;
    blog.blog_description = blog_description || blog.blog_description;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { blog_id } = req.params;

  try {
    const blog = await Blog.findByPk(blog_id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.user_id !== req.user.user_id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog , getBlogById };