import { useState } from "react";
import { useDispatch } from "react-redux";
import { TodoSetCompletedThunk } from "../Store/AsyncThunk/Todo/TodoUpdateThunk";
import { GetTodoThunk } from "../Store/AsyncThunk/Todo/TodoGetThunk";
import { toast } from "react-toastify";
export const PopUp = (props) => {
  const [todoInfo, setTodoInfo] = useState(props.TodoInfo);
  const [UpdatedText, setUpdatedText] = useState(todoInfo.text);
  const dispatch = useDispatch();
  const handleTodoUpdate = async (e) => {
    e.preventDefault();
    await dispatch(
      TodoSetCompletedThunk({
        TodoId: todoInfo.id,
        TodoStatus: todoInfo.completed,
        TodoText: UpdatedText,
      }),
    );
    toast.success("Todo updated successfully!")

    dispatch(GetTodoThunk());
    props.hideStateFunc(false);
  };
  return (
    <div className="flex justify-center items-center backdrop-blur-2xl h-screen">
      <form
        onSubmit={handleTodoUpdate}
        className="border rounded-2xl border-green-400 shadow-2xl p-4 py-8 w-2xs gap-2 flex justify-center flex-col  accent-green-400 caret-green-400"
      >
        <h1 className="font-bold text-center text-2xl">Update</h1>
        <input
          required
          value={UpdatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          type="text"
          id="updateInput"
         autoFocus
          className="rounded-2xl my-2  w-full p-2"
          placeholder="Enter Text"
        />
        <div className="flex ">
          <button className="rounded-2xl hover:bg-green-500  bg-green-400 w-full text-white p-1 text">
            Update
          </button>
          <button
            onClick={(e) => {
              props.hideStateFunc(false);
              e.stopPropagation();
            }}
            className="rounded-2xl hover:bg-red-500  bg-red-400 w-full text-white p-1 text"
          >
            Exit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopUp;
