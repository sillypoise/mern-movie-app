import { z } from "zod";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

type IUserSchema = z.infer<typeof userSchema>;

export { userSchema, IUserSchema };
