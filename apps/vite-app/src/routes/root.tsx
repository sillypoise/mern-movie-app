import { useEffect, useState } from "react";

export default function Root() {
    const [data, setData] = useState("hello");

    useEffect(() => {
        fetch("http://localhost:8000/health")
            .then((res) => res.json())
            .then((d) => console.log(d))
            .catch((err) => console.log(err));
    });

    return (
        <main className="center mbs-xl">
            <article>
                <h1>React</h1>
                {/* <p>{data}</p> */}
            </article>
        </main>
    );
}
