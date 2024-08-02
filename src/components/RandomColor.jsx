import { useState } from "react";

const RandomColor = () => {
    const [color, setColor] = useState('#000000');

    const generateColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setColor(color);
    };

    return (
        <div>
            <button onClick={generateColor} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Generate Random Color</button>
            <div style={{ width: '200px', height: '200px', backgroundColor: color }}></div>
        </div>
    );
}

export default RandomColor;