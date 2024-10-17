import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import {
  Button,
  ButtonGroup,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

const CustomAlert = forwardRef(
  ({ header, text, isOpen, onClose, onClick }, ref) => {
    return (
      <AlertDialog
        motionPreset="slideInTop"
        leastDestructiveRef={ref}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{text}</AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={ref} onClick={onClose} colorScheme="red">
                No
              </Button>
              <Button colorScheme="blue" onClick={onClick}>
                Yes
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

const MemoizedCustomAlert = React.memo(CustomAlert);

CustomAlert.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

CustomAlert.displayName = "Custom Alert";

export default MemoizedCustomAlert;
