import { useSelector } from "react-redux";
export const RegisterSelector = () => {
  const selecte = useSelector((state) => state.RegisterSlice);
  return {
    isLoading: selecte.isLoading,
    error: selecte.error,
    data: selecte.value,
  };
};
export const LoginSelector = () => {
  const selecte = useSelector((state) => state.LoginSlice);
  return {
    isLoading: selecte.isLoading,
    error: selecte.error,
    data: selecte.data,
  };
};
export const LogOutSelector=()=>{
  const selecte=useSelector((state)=>state.LogOutSlice)
}