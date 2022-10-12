import React, { useState } from "react";
import Modal from "../component/utils/Modal";

const useModal = size => {
  // 모달에 필요한 기본 로직, 상태를 함께 제공
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = () => {
    setIsOpen(true);
  };

  const setClose = () => {
    setIsOpen(false);
  };

  const [config, setConfig] = useState({
    afterClose: () => {},
  });

  const modalElement = ({ children }) => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={setClose} size={size}>
            {children}
          </Modal>
        )}
      </>
    );
  };
  return { isOpen, setOpen, setClose, config, setConfig, Modal: modalElement };
};

export default useModal;
