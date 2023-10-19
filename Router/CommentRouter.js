const express = require('express');
const commentController = require('../controller/CommnetController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addComment/:productName/:userId', commentController.addComment);
router.post('/addReply/:commentId/:userId/:productName', commentController.addReply);
router.post('/addReplytoReply/:commentId/:userId/:productName', commentController.addReplytoReply);
router.put('/check/:commentId', commentController.check);
router.get('/getCommentsByProduct/:productName', commentController.getCommentsByProduct)
router.get('/getAll', commentController.getAll)
router.delete('/delete/:commentId', authMiddleware , commentController.deleteComment)
module.exports = router;
 