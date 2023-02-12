import { handleUnblockUser } from './../controllers/user.controller';
import { authMiddleware } from "./../middlewares/auth.middleware";
import { Router } from "express";
import {
  handleDeletetOneUsers,
  handleBlockUser,
  handleGetAllUsers,
  handleGetAllUsersAndAccounts,
  handleGetOneUsers,
  handleGetUserAccount,
} from "../controllers/user.controller";
import config from "./../configs";

const router = Router();
const { roles } = config;

// Register Route
router.get(
  "/accounts",
  authMiddleware(roles.ADMIN),
  handleGetAllUsersAndAccounts
);
router.get("/", authMiddleware(roles.ADMIN), handleGetAllUsers);
router.get("/:id", handleGetOneUsers);
router.delete("/:id", authMiddleware(roles.ADMIN), handleDeletetOneUsers);
router.get("/:id/account", authMiddleware(roles.USERS), handleGetUserAccount);
router.get("/:userId/block", authMiddleware(roles.ADMIN), handleBlockUser);
router.get("/:userId/unblock", authMiddleware(roles.ADMIN), handleUnblockUser);

export default router;
