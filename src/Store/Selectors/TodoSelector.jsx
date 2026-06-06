import { useSelector } from "react-redux";
export const GetTodoSelector = () => {
  const select = useSelector((state) => state.GetTodoSlice);
  return {
    GetIsLoading: select.isLoading,
    GetData: select.data,
    GetIsError: select.error,
  };
};
export const PostTodoSelector = () => {
  const select = useSelector((state) => state.TodoPostSlice);
  return {
    PostIsLoading: select.isLoading,
    dataOfPost: select.data,
    errorOfPost: select.error,
  };
};
export const DeleteTodoSelector = () => {
  const select = useSelector((state) => state.TodoDeleteSlice);
  return {
    DeleteIsLoading: select.isLoading,
    dataOfDelete: select.data,
    errorOfDelete: select.error,
  };
};
