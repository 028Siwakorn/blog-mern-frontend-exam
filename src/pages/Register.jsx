import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authentication.service";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
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
      const response = await AuthService.register(user.username, user.password);
      // console.log(response);
      if (response?.status === 201) {
        Swal.fire({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      }
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body space-y-2">
        <h2 className="card-title">Register</h2>
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
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
