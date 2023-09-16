import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <h1>Welcome to the Homepage!</h1>
            <Link to="/Weather/Trondheim"> Click here!</Link>
        </>
    );
};

export default HomePage;
