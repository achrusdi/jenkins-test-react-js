import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const HomePage = () => {
    const count = useSelector((state) => state.counter.count);

    return (<>
        <Helmet>
            <title>Home Page</title>
        </Helmet>
        <h1>Home Page</h1>
        <p>Home</p>
        <p>Count: {count}</p>
    </>);
}

export default HomePage;