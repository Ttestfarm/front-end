import ModalContainer from "../../components/UI/Modal";

import React from 'react';

const deliveryModal = ({ onClose }) => {
    const handleClose = () => {
        onClose?.();
    };
    return (
        <ModalContainer>
            <div>
                <div>
                    <div onClick={handleClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                        <h1>This is a Modal Dialog</h1>
                        <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default deliveryModal;