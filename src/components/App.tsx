import React, { useState } from 'react';

export const App = () => {

    const [count, setCount] = useState(0);

    const increment = () => setCount(prev => prev + 1)
    return (
        <div>
            {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
};


