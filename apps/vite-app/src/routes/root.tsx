import { Link, Outlet, useLoaderData } from "react-router-dom";

export async function loader() {
    return { message: "weeeee" };
}

function Root() {
    const { message } = useLoaderData();
    return (
        <main className="center mbs-xl">
            <nav>
                <ul>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <pre>{message}</pre>
            <Outlet />
        </main>
    );
}

export { Root };
