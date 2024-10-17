import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { resetMessages } from "@redux/slices/productSlice";

function useShowAlert() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { success, message } = useSelector((state) => state.products);

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: success ? "success" : "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      
      dispatch(resetMessages()); // delete all message in redux state
    }
  }, [message, success, toast, dispatch]);
}

export default useShowAlert;
