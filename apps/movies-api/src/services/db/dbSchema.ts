import { ObjectId } from "mongodb";
import { z } from "zod";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    verified: z.boolean().default(false),
});

const fullUserSchema = userSchema.extend({
    createdAt: z.date(),
    updatedAt: z.date(),
});

const userWithPasswordSchema = userSchema.extend({
    password: z.string().min(8),
});

const passwordSchema = z.object({
    userId: z.string(),
    password: z.string().min(8),
});

type IUserSchema = z.infer<typeof userSchema>;
type IFullUserSchema = z.infer<typeof fullUserSchema>;
type IUserWithPasswordSchema = z.infer<typeof userWithPasswordSchema>;
type IPasswordSchema = {
    userId: ObjectId;
    password: string;
};

export {
    userSchema,
    IUserSchema,
    fullUserSchema,
    IFullUserSchema,
    userWithPasswordSchema,
    IUserWithPasswordSchema,
    passwordSchema,
    IPasswordSchema,
};
