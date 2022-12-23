import { useEffect, useRef } from "react";
import {
    ActionFunctionArgs,
    Form,
    LoaderFunctionArgs,
    redirect,
    useActionData,
} from "react-router-dom";
import { z } from "zod";

export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        let name = formData.get("name");
        let email = formData.get("email");
        let password = formData.get("password");
        let confirmPassword = formData.get("confirmPassword");

        if (!email || !password || !confirmPassword || !name) {
            return { message: "incorrect form input" };
        }

        name = z.string().parse(name);
        email = z.string().parse(email);
        password = z.string().parse(password);
        confirmPassword = z.string().parse(confirmPassword);

        if (password !== confirmPassword) {
            return { message: "passwords don't match" };
        }

        const res = await fetch("http://localhost:8000/v1/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: new URLSearchParams({ name, email, password }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function loader({}: LoaderFunctionArgs) {
    const res = await fetch("http://localhost:8000/v1/auth/sign-up", {
        credentials: "include",
    }).then((res) => res.json());

    if (res["message"] === "logged in") {
        return redirect("/home");
    }
    return {};
}

function SignUp() {
    const signUpFormRef = useRef<HTMLFormElement | null>(null);
    const data = useActionData();
    console.log(data);

    useEffect(() => {
        if (data) signUpFormRef.current?.reset();
    }, [data]);

    return (
        <article className="mlb-l center stack">
            <h2 className="text-3">Sign Up</h2>
            <Form method="post" ref={signUpFormRef}>
                <fieldset className="stack items-start">
                    {/* {data ? (
                        <p>There was an error signing up, try again</p>
                    ) : null} */}
                    <label>
                        <input
                            required
                            name="name"
                            type="text"
                            placeholder="Name"
                            minLength={4}
                        />
                    </label>
                    <label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                    </label>
                    <label>
                        <input
                            required
                            name="password"
                            type="password"
                            placeholder="Password"
                            minLength={8}
                        />
                    </label>
                    <label>
                        <input
                            required
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            minLength={8}
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                </fieldset>
            </Form>
        </article>
    );
}

export { SignUp };
