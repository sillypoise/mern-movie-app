import { Form, LoaderFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";

export async function action({ request }: LoaderFunctionArgs) {
    try {
        const formData = await request.formData();
        let email = formData.get("email");
        let password = formData.get("password");

        if (!email || !password) return { message: "incorrect form input" };

        email = z.string().parse(email);
        password = z.string().parse(password);

        const res = await fetch("http://localhost:8000/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ email, password }),
            credentials: "include",
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function loader({}: LoaderFunctionArgs) {
    const res = await fetch("http://localhost:8000/v1/auth/login", {
        credentials: "include",
    }).then((res) => res.json());

    if (res["message"] === "logged in") {
        return redirect("/home");
    }
    return {};
}

function Login() {
    return (
        <article className="mlb-l center stack">
            <h2 className="text-3">Login</h2>
            <Form method="post">
                <fieldset className="stack items-start">
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
                        />
                    </label>
                    <button type="submit">Login</button>
                </fieldset>
            </Form>
        </article>
    );
}

export { Login };
