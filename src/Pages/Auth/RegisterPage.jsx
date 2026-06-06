import { useEffect, useState } from "react";
import checkCircle from "../../Assets/Icons/checkbox-circle-line.svg";
import {
  RegisterThunk,
  ResetRegister,
} from "../../Store/AsyncThunk/Auth/RegisterThunk";
import { useDispatch } from "react-redux";
import { RegisterSelector } from "../../Store/Selectors/UserSelector";
import { Link, useNavigate } from "react-router";
import loadingImage from "../../Assets/Images/Loading_Img.gif";
import { toast } from "react-toastify";
import mailIcon from "../../Assets/Icons/mail-ai-line.svg";
import passwordIcon from "../../Assets/Icons/lock-password-line.svg";
import userIcon from "../../Assets/Icons/user.svg";
import eyeCloseIcon from "../../Assets/Icons/eye-off-line.svg";
import eyeOpenIcon from "../../Assets/Icons/eye-line.svg";
const RegisterPage = () => {
  const stateData = RegisterSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const HandleSubmit = (event) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      dispatch(
        RegisterThunk({
          username: name.toLocaleLowerCase(),
          email: email.toLocaleLowerCase(),
          password: password.toLocaleLowerCase(),
        }),
      );
    } else {
      toast.error("password not match");
    }
  };
  useEffect(() => {
    if (stateData?.data?.success) {
      toast.success(stateData?.data?.msg);
      dispatch(ResetRegister());
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [stateData.data]);

  useEffect(() => {
    const error = stateData?.error?.msg || stateData?.error?.errors?.[0]?.msg;
    if (error) {
      toast.error(error);
    }
  }, [stateData.error]);
  return (
    <div className="flex caret-green-400 justify-center selection:text-green-400 items-center min-h-screen">
      <div className="max-w-80  shadow-2xl rounded-2xl p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              className="p-2 max-w-18 "
              src={checkCircle}
              alt="check circle image logo"
            />
          </div>
          <p className="text-2xl font-bold ">
            Welcome To <span className="text-green-500">TodoApp</span>
          </p>
          <p className="text-center text-xs py-1">
            Register To Manage Your Task
          </p>
        </div>
        <div>
          <form onSubmit={HandleSubmit}>
            <div className="flex gap-1 items-center rounded-2xl w-full outline-green-400 outline-2 p-2 my-4 text-md">
              <img src={userIcon} width={15} alt="user icon image" />
              <input
              autoFocus
                className="outline-none w-full"
                type="text"
                placeholder="Name"
                required
                value={name}
                minLength={3}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-1 items-center rounded-2xl w-full outline-green-400 outline-2 p-2 my-4 text-md">
              <img src={mailIcon} width={15} alt="mail icon image" />

              <input
                className="outline-none w-full"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-1 items-center rounded-2xl w-full outline-green-400 outline-2 p-2 my-4 text-md">
              <img src={passwordIcon} width={15} alt="password icon image" />

              <input
                className="outline-none w-full"
                               type={showPassword ? "password" : "text"}

                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
 <img
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
                src={showPassword ? eyeCloseIcon : eyeOpenIcon}
                width={15}
                alt="eye open and close icon image"
              />
            </div>
            <div className="flex gap-1 items-center rounded-2xl w-full outline-green-400 outline-2 p-2 my-4 text-md">
              <img src={passwordIcon} width={15} alt="password icon image" />

              <input
                className="outline-none w-full"
                type="password"
                placeholder="Confirm Password"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                minLength={8}
              />

            </div>

            <div className="text-center">
              <button className="disabled:bg-green-700 flex justify-center bg-green-400 hover:bg-green-500 text-white font-bold my-2 hover:bg-green-5400 w-full p-2 rounded-2xl">
                {stateData?.isLoading ? (
                  <img width={25} src={loadingImage} alt="loading icon image spinner" />
                ) : (
                  <span>Register</span>
                )}
              </button>
            </div>
          </form>
          <div className="text-xs text-center">
            Already have an account ?
            <span className="text-green-400">
              <Link to={"/login"}> Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
