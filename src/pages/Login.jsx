import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authentication.service";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { logIn, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const handleSubmit = async () => {
    if (!user.username || !user.password) {
      Swal.fire({
        title: "Error",
        text: "Username or Password cannot be empty!",
        icon: "error",
      });
    } else {
      const response = await AuthService.login(user.username, user.password);
      // console.log(response);
      if (response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
        }).then(() => {
          logIn({
            id: response.data.id,
            username: response.data.username,
            accessToken: response.data.accessToken,
          });
          navigate("/");
        });
      }
    }
  };
  return (
    // <form onSubmit={handleSubmit}>
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body space-y-2">
        <h2 className="card-title">Login</h2>
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            type="text"
            className="grow"
            placeholder="username"
            name="username"
            onChange={handleChange}
            value={user.username}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            className="grow"
            placeholder="*****"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-soft btn-success" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
    // </form>
  );
};

export default Login;
