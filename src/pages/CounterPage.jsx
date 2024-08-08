import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { Button } from "@nextui-org/react";
import { increment } from "../slices/counterSlice";

const CounterPage = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    
    return (
        <>
            <h1>Counter Page</h1>
            {/* <h2>Count is: {count}</h2>
            <Button onClick={() => dispatch(increment())}>Increment</Button> */}
            <Counter />
        </>
    );
}
 
export default CounterPage;