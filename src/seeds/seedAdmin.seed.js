import { adminDetails } from '../constants.js';
import { Role } from '../models/role.model.js';
import { User } from '../models/user.model.js';

export const adminSeeder = async () => {
  try {
    await User.deleteOne({ username: adminDetails.username });
    const admin = await User.insertOne(adminDetails);
    const adminRoleID = await Role.findOne({ name: 'admin' });
    await User.findOneAndUpdate(admin._id, { $push: { roles: [adminRoleID._id] } });
    console.log('Admin seeded successfully');
  } catch (error) {
    logger.error('Error seeding admin', error);
  }
};
