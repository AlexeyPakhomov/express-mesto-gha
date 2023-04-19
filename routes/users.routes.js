const router = require('express').Router();
const {
  joiGetUserById,
  joiUpdateProfile,
  joiUpdateAvatar,
} = require('../middlewares/joiValidation');

const {
  getUsers,
  getInfAboutUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getInfAboutUser);
router.get('/:userId', joiGetUserById, getUserById);
router.patch('/me', joiUpdateProfile, updateProfile);
router.patch('/me/avatar', joiUpdateAvatar, updateAvatar);

module.exports = router;
