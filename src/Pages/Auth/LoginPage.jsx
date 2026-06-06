import { useEffect, useRef, useState } from "react";
import checkCircle from "../../Assets/Icons/checkbox-circle-line.svg";
import { useDispatch } from "react-redux";
import { LoginThunk, ResetLogin } from "../../Store/AsyncThunk/Auth/LoginThunk";
import { LoginSelector } from "../../Store/Selectors/UserSelector";
import { Link, useNavigate } from "react-router";
import loadingImage from "../../Assets/Images/Loading_Img.gif";
import mailIcon from "../../Assets/Icons/mail-ai-line.svg";
import passwordIcon from "../../Assets/Icons/lock-password-line.svg";
import eyeCloseIcon from "../../Assets/Icons/eye-off-line.svg";
import eyeOpenIcon from "../../Assets/Icons/eye-line.svg";
import { toast } from "react-toastify";
const LoginPage = () => {
  const { data, error, isLoading } = LoginSelector();
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const disaptch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const HandleSubmit = (event) => {
    event.preventDefault();
    disaptch(
      LoginThunk({
        email: email.current.value,
        password: password.current.value,
      }),
    );
  };
  useEffect(() => {
    if (data?.success) {
      toast.success(data?.welcome);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const invalidCredentials = error?.msg;
    if (invalidCredentials) {
      toast.warning(invalidCredentials);
    }
    return () => disaptch(ResetLogin());
  }, [error]);
  return (
    <div className="flex caret-green-400 justify-center selection:text-green-400 items-center min-h-screen">
      <div className="max-w-80  shadow-2xl rounded-2xl p-5 ">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              className="p-2 max-w-18 "
              src={checkCircle}
              alt="check circle image"
            />
          </div>
          <p className="text-2xl font-bold ">
            Welcome To <span className="text-green-500">TodoApp</span>
          </p>
          <p className="text-center my-2 text-xs py-1">
            Login To Manage Your Task
          </p>
        </div>
        <div>
          <form onSubmit={HandleSubmit}>
            <div className="flex gap-1 items-center rounded-2xl w-full outline-green-400 outline-2 p-2 my-4 text-md">
              <img src={mailIcon} width={15} alt="mail icon image" />
              <input
              autoFocus
                className="outline-none w-full"
                type="email"
                placeholder="Email"
                required
                disabled={isLoading}
                ref={email}
              />
            </div>
            <div className="flex gap-1  items-center rounded-2xl w-full outline-green-400 outline-2 p-2  text-md">
              <img src={passwordIcon} width={15} alt="password icon image" />
              <input
                className="outline-none w-full"
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                required
                disabled={isLoading}
                ref={password}
              />
              <img
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
                src={showPassword ? eyeCloseIcon : eyeOpenIcon}
                width={15}
                alt="eye open and close icon image"
              />
            </div>
            <div className="text-center">
              <button
                disabled={isLoading}
                className="rounded-2xl my-4 bg-green-400 disabled:bg-green-700 flex justify-center gap-2 items-center hover:bg-green-500 text-white font-bold  hover:bg-green-5400 w-full p-2 "
              >
                {isLoading ? (
                  <img width={25} src={loadingImage} alt="loading icon image spinner" />
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>
          <div className="text-xs text-center">
            Dont't have an account ?
            <span className="text-green-400">
              <Link to={"/register"}> Sign Up</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
