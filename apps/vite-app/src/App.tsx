import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState("hello");

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
