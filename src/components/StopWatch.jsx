import { useEffect, useState } from "react";

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 13);
            }, 10);
        }
        return () => clearInterval(interval);
    })

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = time % 1000;

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1>Stop Watch</h1>
            <div className="">
                {hours.toString().padStart(2, '0')}: {minutes.toString().padStart(2, '0')}: {seconds.toString().padStart(2, '0')}: {milliseconds.toString().padStart(2, '0')}
            </div>
            <div className="buttons flex gap-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setTime(0)}>Reset</button>
            </div>
        </div>
    );
}

export default StopWatch;