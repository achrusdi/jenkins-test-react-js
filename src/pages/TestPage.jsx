import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../slices/counterSlice";

const TestPage = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    
    return (
        <>
            <h1>Test Page</h1>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(increment(5))}>Increment 5</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </>
    );
}
 
export default TestPage;