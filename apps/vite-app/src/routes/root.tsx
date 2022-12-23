import {
    Link,
    LoaderFunctionArgs,
    Outlet,
    redirect,
    useLoaderData,
} from "react-router-dom";

export async function loader({}: LoaderFunctionArgs) {
    const res = await fetch("http://localhost:8000/v1/auth/session", {
        credentials: "include",
    }).then((res) => res.json());

    if (res["message"]) {
        return redirect("/auth/login");
    }
    return { user: res };
}

function Root() {
    const data = useLoaderData();

    return (
        <main className="center mbs-xl">
            <nav>
                <ul>
                    <li>
                        <Link to="/auth/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/auth/sign-up">Sign-Up</Link>
                    </li>
                </ul>
            </nav>
            <pre>{JSON.stringify(data?.user, null, 4)}</pre>
            <Outlet />
        </main>
    );
}

export { Root };
