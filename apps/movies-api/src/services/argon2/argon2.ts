import argon2 from "argon2";

async function validatePassword(hash: string, password: string) {
    try {
        if (await argon2.verify(hash, password)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("error verifying a2", err);
    }
}

async function hashPassword(password: string) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        console.log("a2 error", err);
    }
}

export { hashPassword, validatePassword };
