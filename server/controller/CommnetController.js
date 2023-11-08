const Comment = require('../Model/CommentModel');
const Product = require('../Model/ProductModel');
const User = require('../Model/UserModel');

const addComment = async (req, res) => {
    try {
      const { productName } = req.params;
      const { userId } = req.query
      const product = await Product.findOne({ name: productName });
      const { author, content } = req.body;
      let user = null;

        if (userId) {
          user = await User.findOne({ _id: userId });
        }
      const comment = new Comment({
        product: product._id,
        user: user ? user._id : null,
        author,
        content,
        check: false,
        isReply: false
      });
      await comment.save();
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
const addReply = async (req, res) => {
    try {
      const {  author, content } = req.body;
      const commentId = req.params.commentId;
      const userId  = req.query.userId
      const productName  = req.params.productName
      const product = await Product.findOne({ name: productName });
      let user = null;
      
      if (userId) {
        user = await User.findOne({ _id: userId });
      }
      
      const parentComment = await Comment.findById(commentId);
      
      if (!parentComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      const reply = new Comment({
        product: product._id,
        user: user ? user._id : null,
        author,
        content,
        check: false,
        isReply: true
      });
      parentComment.replies.push(reply);
      await reply.save(); 
      await parentComment.save();
      return res.status(201).json({ success: true ,message: 'Reply added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  const addReplytoReply = async (req, res) => {
    try {
      const {  author, content } = req.body;
      const commentId = req.params.commentId;
      const userId  = req.query.userId
      const productName  = req.params.productName
      const product = await Product.findOne({ name: productName });
      let user = null;
      
      if (userId) {
        user = await User.findOne({ _id: userId });
      }
      const parentComment = await Comment.findOne({replies: commentId});
      if (parentComment) {
        const reply = new Comment({
          product: product._id,
          user: user ? user._id : null,
          author,
          content,
          check: false,
          isReply: true
        });
        parentComment.replies.push(reply);
        await reply.save(); 
        await parentComment.save();
        return res.status(201).json({ success: true ,message: 'Reply added successfully' });
      }
      const replyy = await Comment.findById(commentId);
      const reply1 = new Comment({
        product: product._id,
        user: user ? user._id : null,
        author,
        content,
        check: false,
        isReply: true
      });
      replyy.replies.push(reply1);
      await reply1.save(); 
      await replyy.save();
      return res.status(201).json({ success: true ,message: 'Reply added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  
  const getCommentsByProduct = async (req, res) => {
    try {
      const { productName } = req.params;
      const product = await Product.findOne({ name: productName });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm với tên này.' });
      }
      const comments = await Comment.find({
        product: product._id,
        check: true,
        isReply: false
      })
      .populate('user')
      .populate({
        path: 'replies',
        model: 'Comment',
        populate: { path: 'user' },
      });
  
      if (!comments) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bình luận nào cho sản phẩm này.' });
      }
  
      return res.status(200).json({ success: true, data: comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lấy danh sách bình luận.' });
    }
  };
  

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    } 
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ success: true ,message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
const getAll = async (req, res) => {
  try {
    const comment = await Comment.find().populate('product').populate('user');
    return res.status(200).json({ data: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
const check = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.check = !comment.check;
    await comment.save(); 
    return res.status(200).json({ success: true, data: comment  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};


module.exports = {addComment, addReply,getCommentsByProduct,deleteComment,getAll,check,addReplytoReply}
