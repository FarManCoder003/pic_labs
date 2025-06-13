import asyncHandler from '../utils/asyncHandler';

const checkPermission = (permissions = []) =>
  asyncHandler(async (req, res, next) => {
    const { roles } = req.user;
  });

export default checkPermission;
