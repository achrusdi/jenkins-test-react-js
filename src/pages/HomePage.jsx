import { Helmet } from "react-helmet";

const HomePage = () => {

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <h1 className="text-3xl font-bold">Home Page</h1>
        </div>
    );
}

export default HomePage;