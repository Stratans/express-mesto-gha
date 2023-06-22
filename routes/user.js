const router = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
