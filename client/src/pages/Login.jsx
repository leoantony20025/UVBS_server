import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import loader from "../assets/loader.svg";
import { getUser, getUserAccessToken } from "../redux/slices/userSlice";
import { memo } from "react";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../graphql/mutation/user";
import iEmpsW from "../assets/iEmpsW.png";
import iEmpsR from "../assets/iEmpsR.png";

function Login() {
  const { login: onLogin, loading, error: errorLogin } = useLogin();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState({
    open: false,
    msg: "",
  });
  const [msg, setMsg] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(newPassword);

  // useEffect(() => {
  //   setMsg("");
  //   window?.google?.accounts?.id?.initialize({
  //     client_id:
  //       "321676839735-hhjotk4qba88iu9qeinb0g1hdo1akkq2.apps.googleusercontent.com",
  //     callback: handleCredentialResponse,
  //   });
  //   //dev - 321676839735-hhjotk4qba88iu9qeinb0g1hdo1akkq2.apps.googleusercontent.com
  //   //prod - 321676839735-hhjotk4qba88iu9qeinb0g1hdo1akkq2.apps.googleusercontent.com
  //   window?.google?.accounts?.id?.renderButton(document.getElementById("gl"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  //   window?.google?.accounts?.id?.prompt();
  // }, []);

  const authenticate = async (response) => {
    // const decoded = await jwtDecode(response.credential);
    // console.log(decoded);
    // let email = decoded?.email;
    if (login.email === "" || login.email === null) {
      setErr({
        open: true,
        msg: "Enter Email!",
      });
    } else {
      try {
        await onLogin({
          variables: {
            email: login.email,
            password: login.password,
          },
        }).then(({ data }) => {
          console.log("USER", data);
          if (data?.login !== null) {
            dispatch(getUser(data?.login));

            if (data?.login !== null) {
              navigate("/admin");
            }
            // dispatch(getUserAccessToken(data.accessToken))
            setLogin({
              email: "",
              password: "",
            });
          }
        });
      } catch (error) {
        setErr({
          open: true,
          msg: error.message,
        });
      }
    }
  };

  // const updateNewPassword = async () => {
  //   if (newPassword.password === "" || newPassword.confirmPassword === "") {
  //     setErr({
  //       open: true,
  //       msg: "Fill all the fields!",
  //     });
  //   } else if (newPassword.password !== newPassword.confirmPassword) {
  //     setErr({
  //       open: true,
  //       msg: "Check password!",
  //     });
  //   } else {
  //     const { data } = await employeePasswordReset({ variables: newPassword });
  //     if (data?.employeePasswordReset !== null) {
  //       dispatch(getUser(data?.employeePasswordReset));
  //       setResetPassword(false);
  //       if (data?.employeePasswordReset?.isAdmin === true) {
  //         navigate("/admin");
  //       } else {
  //         navigate("/employee");
  //       }
  //     } else {
  //       setErr({
  //         open: true,
  //         msg: "Something went wrong!",
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <div className="login">
        <div>
          <div className="l-head">
            <img src={iEmpsR} alt="" />
            <span></span>
            <p>Employee</p>
          </div>
          <div className="l-body">
            <div className="lb-up">
              <img src={iEmpsW} alt="" />
            </div>
            <input
              type="text"
              placeholder="Email"
              onKeyDown={(e) => (e.key === "Enter" ? authenticate() : "")}
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            {loading && <img width={40} src={loader} alt="" />}
            <button disabled={loading} onClick={() => authenticate()}>
              Login
            </button>
            <h6>
              <p></p>
              <span>OR</span>
              <p></p>
            </h6>
            <div id="gl"></div>
            <p style={{ color: "#fc3737a3", maxWidth: "90vw", margin: "auto" }}>
              {msg}
            </p>
          </div>
        </div>
      </div>
      {err.open && <Error err={err} setErr={setErr} />}
    </>
  );
}

export default memo(Login);
