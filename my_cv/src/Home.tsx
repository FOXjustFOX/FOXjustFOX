import React, { useState } from "react";

const Home: React.FC = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("John Doe");
    return (
        <div className="page">
            <h1>Home</h1>
            <p>Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <div >
                <h1>Enter Your Name</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p>Your name is: {name}</p>
            </div>
        </div>
    );
};

export default Home;
