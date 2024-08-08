import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset, setCount } from "../slices/counterSlice";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(0);
  
    const handleSubmit = () => {
      console.log('Submitting value:', inputValue);
      if (!isNaN(inputValue)) {
        dispatch(setCount(inputValue));
      }
      setInputValue(0);
    };
  
    return (
      <>
        <p>Counter: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increment(5))}>Increment 5</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
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