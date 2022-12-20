import { ObjectId } from "mongodb";
import { z } from "zod";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    verified: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const userWithPasswordSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    verified: z.boolean().default(false),
});

const passwordSchema = z.object({
    userId: z.string(),
    password: z.string().min(8),
});

type IUserSchema = z.infer<typeof userSchema>;
type IUserWithPasswordSchema = z.infer<typeof userWithPasswordSchema>;
type IPasswordSchema = {
    userId: ObjectId;
    password: string;
};

export {
    userSchema,
    IUserSchema,
    userWithPasswordSchema,
    IUserWithPasswordSchema,
    passwordSchema,
    IPasswordSchema,
};
