const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
} = require('../controllers/user');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);

module.exports = router;
