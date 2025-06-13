import { dbConnect } from '../db/index.js';
import { Permission } from '../models/permission.model.js';
import { Role } from '../models/role.model.js';
dbConnect();

const permissionList = [
  { name: 'manage_users', description: 'Manage all users' },
  { name: 'assign_roles', description: 'Assign roles to users' },
  { name: 'view_assets', description: 'View all assets' },
  { name: 'edit_assets', description: 'Edit asset details' },
  { name: 'delete_assets', description: 'Delete asset' },
  { name: 'publish_asset', description: 'Publish asset' },
  { name: 'upload_asset', description: 'Upload asset' },
  { name: 'view_own_assets', description: 'View own uploaded assets' },
  { name: 'view_own_sales', description: 'View own sales data' },
  { name: 'purchase_asset', description: 'Purchase asset' },
  { name: 'download_asset', description: 'Download asset' },
  { name: 'refund_order', description: 'Refund customer order' },
  { name: 'view_reports', description: 'View reports and analytics' },
  { name: 'respond_to_support', description: 'Respond to support tickets' },
  { name: 'configure_settings', description: 'Configure site settings' },
  { name: 'moderate_reviews', description: 'Moderate reviews and comments' },
  { name: 'feature_assets', description: 'Feature selected assets on homepage' },
];

const roleList = [
  {
    name: 'Admin',
    permissions: [
      'manage_users',
      'assign_roles',
      'view_assets',
      'edit_assets',
      'delete_assets',
      'publish_asset',
      'upload_asset',
      'view_own_assets',
      'view_own_sales',
      'purchase_asset',
      'download_asset',
      'refund_order',
      'view_reports',
      'respond_to_support',
      'configure_settings',
      'moderate_reviews',
      'feature_assets',
    ],
  },
  {
    name: 'Vendor',
    permissions: [
      'edit_assets',
      'delete_assets',
      'upload_asset',
      'view_own_assets',
      'view_own_sales',
      'respond_to_support',
    ],
  },
  {
    name: 'Customer',
    permissions: ['view_assets', 'purchase_asset', 'download_asset'],
  },
];

const seed = async () => {
  try {
    await Permission.deleteMany({});
    await Role.deleteMany({});

    const insertedPermissions = await Permission.insertMany(permissionList);
    const permissionMap = {};
    insertedPermissions.forEach((p) => {
      permissionMap[p.name] = p._id;
    });

    for (const role of roleList) {
      const rolePermissions = role.permissions.map((name) => permissionMap[name]);
      await Role.create({
        name: role.name,
        permissions: rolePermissions,
      });
    }
    console.log('Roles and permissions seeded successfully');
    process.exit();
  } catch (error) {
    console.log('Error seeding roles and permissions', error);
    process.exit(1);
  }
};

seed();
