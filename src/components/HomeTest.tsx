import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";

function HomeTest() {
  const name = useAppSelector((state) => state.users.usernameOrEmail);

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button onClick={() => localStorage.clear()}>Clear Local Storage</button>
      <NavLink to="/parameter">Parameter Table</NavLink>
    </div>
  );
}

export default HomeTest;
