import React, { useState } from "react";
const Counter = function () {
    const [count, setCount] = useState(0)
    function incr() {
        setCount(count + 1)
    }

    function decr() {
        setCount(count - 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={incr}>Incr</button>
            <button onClick={decr}>Decr</button>
        </div>

    )
}

export default Counter;