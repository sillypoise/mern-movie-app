import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState("hello");

    useEffect(() => {
        fetch("http://localhost:8000/health")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <main className="center mbs-xl">
            <article>
                <h1>React</h1>
                <p>{data}</p>
            </article>
        </main>
    );
}

export default App;
