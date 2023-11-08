const express = require('express');
const commentController = require('../controller/CommnetController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addComment/:productName', commentController.addComment);
router.post('/addReply/:commentId/:productName', commentController.addReply);
router.post('/addReplytoReply/:commentId/:productName', commentController.addReplytoReply);
router.put('/check/:commentId',authMiddleware, commentController.check);
router.get('/getCommentsByProduct/:productName', commentController.getCommentsByProduct)
router.get('/getAll', commentController.getAll)
router.delete('/delete/:commentId', authMiddleware , commentController.deleteComment)
module.exports = router;
 