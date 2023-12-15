const User = require('./models/user.js'); // Replace with your User model path

(async () => {
  try {
    const users = await User.findAll();
    console.log('Fetched all users successfully:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})();
