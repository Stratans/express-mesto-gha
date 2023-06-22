const router = require('express').Router();
const {
  getUsers,
  // createUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
// router.post('/', createUser);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
