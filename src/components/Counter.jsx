import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset, setCount } from "../slices/counterSlice";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const Counter = () => {
    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(0);

    const handleSubmit = () => {
        if (!isNaN(inputValue)) {
            dispatch(setCount(inputValue));
        }
        setInputValue(0);
    };

    return (
        <>
            <p>Counter: {count}</p>
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>
            <Button onClick={() => dispatch(increment(5))}>Increment 5</Button>
            <Button onClick={() => dispatch(reset())}>Reset</Button>
            <Input
                type="number"
                label="Set Count"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    );
}

export default Counter;