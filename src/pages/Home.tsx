import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">signUp</Link>
    </div>
  );
};
