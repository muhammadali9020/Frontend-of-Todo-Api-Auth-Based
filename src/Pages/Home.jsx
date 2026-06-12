import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GetTodoThunk } from "../Store/AsyncThunk/Todo/TodoGetThunk";
import {
  DeleteTodoSelector,
  GetTodoSelector,
  PostTodoSelector,
} from "../Store/Selectors/TodoSelector";
import TodoList from "../Components/TodoList";
import Loading from "../Assets/Images/Loading_Img.gif";
import { TodoPostThunk } from "../Store/AsyncThunk/Todo/TodoPostThunk";
import { TodoDeleteThunk } from "../Store/AsyncThunk/Todo/TodoDeleteThunk";
import { useNavigate } from "react-router";
import { TodoSetCompletedThunk } from "../Store/AsyncThunk/Todo/TodoUpdateThunk";
import PopUp from "../Components/PopUp";
import SunImage from "../Assets/Icons/sun-line.svg";
import MoonImage from "../Assets/Icons/moon-fill.svg";
import notepadImage from "../Assets/Images/notepad.png";
import { toast } from "react-toastify";
const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [todoInfoForUpdate, setTodoInfoForUpdate] = useState("");
  const todoText = useRef(null);
  const { GetIsLoading, GetData, GetIsError } = GetTodoSelector();
  const { PostIsLoading } = PostTodoSelector();
  const { DeleteIsLoading } = DeleteTodoSelector();
  const [ThemeToggle, setThemeToggle] = useState(localStorage.getItem("theme"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    toast.warn("User logout successfully!");
    navigate("/login");
    localStorage.clear()
  };
  const deleteTodo = async (id) => {
    await dispatch(TodoDeleteThunk(id));
    dispatch(GetTodoThunk());
  };
  const postTodo = async (e) => {
    e.preventDefault();
    await dispatch(
      TodoPostThunk({ text: todoText.current.value, completed: false }),
    );
    toast.success("Todo added successfully !");
    todoText.current.value = "";
    dispatch(GetTodoThunk());
  };
  const MakeIsCompleted = (TodoId) => {
    dispatch(TodoSetCompletedThunk(TodoId));
  };
  useEffect(() => {
    if (GetIsError?.msg) {
      toast.error(GetIsError?.msg);
      navigate("/login");
      localStorage.clear()
    }
  }, [GetIsError?.msg]);
  useEffect(() => {
    console.log(localStorage.getItem("token"))
     dispatch(GetTodoThunk());
  }, []);
  const updateTodo = (todoInfo) => {
    setShowPopUp(true);
    setTodoInfoForUpdate(todoInfo);
  };
  {
    ThemeToggle ? localStorage.setItem("theme", "dark") : localStorage.removeItem("theme");
  }

  return (
    <div
      style={{
        background: localStorage.getItem("theme") ? "black" : "white",
        minHeight: "100vh",
        color: localStorage.getItem("theme") ? "white" : "black",
      }}
    >
      {showPopUp ? (
        <PopUp
          TodoInfo={todoInfoForUpdate}
          FuncRun={""}
          hideStateFunc={setShowPopUp}
        />
      ) : (
        <div className="caret-green-400 flex justify-center items-center ">
          <div
            style={{
              border: localStorage.getItem("theme") ? "1px solid green" : "",
            }}
            className="w-110 shadow-2xl m-8 p-5"
          >
            <div className="flex justify-between py-2 shadow-sm">
              <div className="text-lg font-bold">
                Todo<span className="text-green-400">App</span>
              </div>
              <div className="flex gap-2">
                <img
                  onClick={() => {
                    setThemeToggle((prev) => !prev);
                  }}
                  className="cursor-pointer"
                  width={30}
                  src={
                    ThemeToggle
                      ? "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='white'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2018C8.68629%2018%206%2015.3137%206%2012C6%208.68629%208.68629%206%2012%206C15.3137%206%2018%208.68629%2018%2012C18%2015.3137%2015.3137%2018%2012%2018ZM12%2016C14.2091%2016%2016%2014.2091%2016%2012C16%209.79086%2014.2091%208%2012%208C9.79086%208%208%209.79086%208%2012C8%2014.2091%209.79086%2016%2012%2016ZM11%201H13V4H11V1ZM11%2020H13V23H11V20ZM3.51472%204.92893L4.92893%203.51472L7.05025%205.63604L5.63604%207.05025L3.51472%204.92893ZM16.9497%2018.364L18.364%2016.9497L20.4853%2019.0711L19.0711%2020.4853L16.9497%2018.364ZM19.0711%203.51472L20.4853%204.92893L18.364%207.05025L16.9497%205.63604L19.0711%203.51472ZM5.63604%2016.9497L7.05025%2018.364L4.92893%2020.4853L3.51472%2019.0711L5.63604%2016.9497ZM23%2011V13H20V11H23ZM4%2011V13H1V11H4Z'/%3e%3c/svg%3e"
                      : MoonImage
                  }
                  alt="Dark Theme Icon Image"
                />
                <button
                  onClick={logOut}
                  className=" bg-green-400 hover:bg-green-500 text-white font-bold hover:bg-green-5400  py-2 px-3 text-sm  rounded-xs"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="text-center my-10">
              <div className="text-3xl font-bold">
                My <span className="text-green-400">Task</span>
              </div>
              <p className="text-md my-1">Manage Your Daily Todos</p>
            </div>
            <div>
              Total
              <span className="text-green-400 font-bold">
                {" "}
                Todos:{GetData?.todos?.length}
              </span>
            </div>
            <form
              onSubmit={postTodo}
              className="flex gap-1 outline-1 p-1 outline-green-400"
            >
              <input
                autoFocus
                className="w-full px-3 text-sm  outline-none"
                type="text"
                minLength={3}
                maxLength={295}
                required
                ref={todoText}
              />
              <button className=" bg-green-400  hover:bg-green-500 text-white font-bold hover:bg-green-5400  py-1.5 px-4 text-sm  rounded-xs">
                Add
              </button>
            </form>
            <div className="px-4 flex justify-cente flex-col-reverse  my-0">
              {GetData?.todos?.length == 0 && (
                <div className="flex justify-center items-center my-2 m-auto flex-col">
                  <img width={100} src={notepadImage} alt="notepad Image" />
                  <p className="font-bold">Nor more Tasks 🎉</p>
                </div>
              )}
              {GetIsLoading || DeleteIsLoading || PostIsLoading ? (
                <div className=" flex justify-center ">
                  <img width={50} src={Loading} alt="loading spinner image" />
                </div>
              ) : (
                GetData?.todos?.map((val) => (
                  <TodoList
                    key={val?._id}
                    todoId={val?._id}
                    text={val?.text}
                    isCompleted={val?.completed}
                    deleteTodo={deleteTodo}
                    MakeIsCompleted={MakeIsCompleted}
                    funcForUpdateTodo={updateTodo}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
