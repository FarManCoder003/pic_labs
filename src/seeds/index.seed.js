import { dbConnect } from '../db/index.js';
import { adminSeeder } from './seedAdmin.seed.js';
import { roleAndPermissionSeeder } from './seedRolesAndPermissions.seed.js';

const runSeeders = async () => {
  try {
    await dbConnect();
    await roleAndPermissionSeeder();
    await adminSeeder();
    process.exit(1);
  } catch (error) {
    console.log('Error running seeders', error);
    process.exit(1);
  }
};

runSeeders();
