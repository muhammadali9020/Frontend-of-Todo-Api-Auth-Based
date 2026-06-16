import { useEffect, useState } from "react";
import deleteIcon from "../Assets/Icons/delete-bin-line.svg";
import EditIcon from "../Assets/Icons/editIcon.svg";
import { toast } from "react-toastify";

const TodoList = (props) => {
  const [isChecked, setIsChecked] = useState(props.isCompleted);
  const HandleCheckBox = (e) => {
    const newStatus = e.target.checked;
    setIsChecked(newStatus);
    props.MakeIsCompleted({
      TodoId: props.todoId,
      TodoStatus: e.target.checked,
      TodoText: props.text,
    });
    isChecked?toast.success("Todo unchecked successfully!"):toast.success("Todo completed successfully!")
  };
  useEffect(() => {
    setIsChecked(props.isCompleted);
  }, []);

  return (
    <div style={{backgroundColor:localStorage.getItem("theme")?"rgba(128, 128, 128, 0.07)":""}} className="flex justify-between my-2 py-4 ">
      <div className="flex rounded-2xl gap-3 py-4 px-2 w-full shadow-2xl ">
        <input
          className="scale-140   cursor-pointer accent-green-400 "
          type="checkbox"
          required
          checked={isChecked}
          onChange={HandleCheckBox}
        />
        <div  className="overflow-y-auto">
        <div className="text-md font-bold max-w-50 ">
          {props.text} 
        </div>
      <div className="mt-2">
        {isChecked ? (
          <span
            className="
              inline-flex
              items-center
              text-xs sm:text-sm
              px-2 sm:px-3
              py-1
              rounded-full
              bg-green-100 text-green-700
            "
          >
            Completed
          </span>
        ) : (
          <span
            className="
              inline-flex
              items-center
              text-xs sm:text-sm
              px-2 sm:px-3
              py-1
              rounded-full
              bg-blue-100 text-blue-700
            "
          >
            Pending
          </span>
        )}
      </div>
        </div>
      </div>
      <img
        onClick={() => {props.deleteTodo(props.todoId);toast.warn("Todo removed successfully")}}
        className="w-6 cursor-pointer  hover:scale-110"
        src={deleteIcon}
        alt="delete icon"
        
      />{" "}
      <img
        onClick={() => props.funcForUpdateTodo({id:props.todoId,text:props.text,completed:isChecked})}
        className="w-6 cursor-pointer  hover:scale-110"
        src={EditIcon}
        alt="delete icon"
      />
    </div>
  );
};

export default TodoList;
