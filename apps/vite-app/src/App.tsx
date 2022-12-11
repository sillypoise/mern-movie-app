import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState("hello");

    return (
        <div>
            <h1>React App</h1>
            <p>testing</p>
            <p>{data}</p>
        </div>
    );
}

export default App;
