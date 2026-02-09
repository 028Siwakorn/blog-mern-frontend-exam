import { Cookies } from "react-cookie";
const cookie = new Cookies();

const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const getUser = () => {
  const user = cookie.get("user");
  return user;
};

const removeUser = () => {
  cookie.remove("user", { path: "/" });
};

const setUser = (user) => {
  if (user) {
    cookie.set(
      "user",
      JSON.stringify({
        id: user?.id,
        username: user?.username,
        accessToken: user?.accessToken,
      }),
      {
        path: "/",
        expires: new Date(Date.now() + 86400), // 24*60*60 = 1 day
      }
    );
  } else {
    removeUser();
  }
};

const TokenService = {
  getAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
