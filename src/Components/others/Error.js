import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import {
  selectErrorMessage,
  selectSuccessMessage,
  clearError,
} from '../redux/slices/notificationsSlice';

const Error = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    if (errorMessage) {
      toast.warn(errorMessage);
      dispatch(clearError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearError());
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Zoom}
    />
  );
};

export default Error;
