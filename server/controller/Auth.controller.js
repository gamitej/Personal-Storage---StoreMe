import { z, ZodError } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number and special character"
    ),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(1, "Name is required"),
});

// =============================== Controller Functions ===============================

export const LoginUser = async (req, res) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    console.log("Login attempt:", email);

    return res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    return res.status(400).json({
      error: "Invalid request data",
      message:
        error instanceof ZodError
          ? error.issues[0].message
          : "Something Went Wrong!",
    });
  }
};

export const SignupUser = async (req, res) => {
  try {
    const parsedData = signupSchema.parse(req.body);
    const { email, password, name } = parsedData;

    console.log("Signup attempt:", email);

    return res
      .status(200)
      .json({ message: "Signup successful", success: true });
  } catch (error) {
    return res.status(400).json({
      error: "Invalid request data",
      message:
        error instanceof ZodError
          ? error.issues[0].message
          : "Something Went Wrong!",
    });
  }
};
