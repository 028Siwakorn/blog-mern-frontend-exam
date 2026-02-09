import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Header = () => {
  //   const menuItems = [
  //     { text: "Login", link: "/login" },
  //     { text: "Register", link: "/register" },
  //     // { text: "Create new Post", link: "/create" },
  //   ];
  const { userInfo, logOut } = useContext(UserContext);
  const username = userInfo?.username;
  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {/* <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item) => (
              <li>
                <a href={item.link}>{item.text}</a>
              </li>
            ))}
          </ul> */}
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          SE NPRU Blog
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li>
              <a href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul> */}
      </div>
      {username ? (
        <div className="navbar-end space-x-2">
          <a className="btn" href="/create">
            Create a new post
          </a>
          <button className="btn" href="register" onClick={logOut}>
            Logout ({username})
          </button>
        </div>
      ) : (
        <div className="navbar-end space-x-2">
          <a className="btn" href="login">
            Login
          </a>
          <a className="btn" href="register">
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
