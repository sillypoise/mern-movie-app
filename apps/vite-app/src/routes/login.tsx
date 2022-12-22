import { Form, LoaderFunctionArgs, useActionData } from "react-router-dom";

export async function action({ request }: LoaderFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email && !password) {
        return { message: "incorrect form input" };
    }

    const val = await fetch("http://localhost:8000/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
    }).then((res) => res.json());

    return val;
}

function Login() {
    const test = useActionData();
    console.log(test);

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
