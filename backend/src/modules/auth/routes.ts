import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { loginUser, registerUser } from "../../services/auth-service";
import { loginSchema, registerSchema } from "../../validators/auth-validator";

/**
 * Auth module routes.
 */
export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    data: {
      userId: result.user.userId,
      email: result.user.email,
      displayName: result.user.displayName,
      createdAt: result.user.createdAt,
    },
    meta: {
      tokenType: result.tokenType,
      expiresIn: result.expiresIn,
      accessToken: result.accessToken,
    },
  });
});

authRouter.post("/login", validateBody(loginSchema), async (req, res) => {
  const result = await loginUser(req.body);

  res.json({
    data: {
      accessToken: result.accessToken,
      tokenType: result.tokenType,
      expiresIn: result.expiresIn,
      user: result.user,
    },
  });
});

authRouter.post("/logout", (_req, res) => {
  res.status(204).send();
});
