import React, { useRef } from "react";

function Modal({ children,text }) {
    const modalRef = useRef(null);

   
    const showModal = () => {
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    };
  
    // Function to close the modal
    const closeModal = () => {
      if (modalRef.current) {
        modalRef.current.close();
      }
    };
  return (
    <>
     <button
        className="btn btn-outline btn-secondary flex-none w-full lg:block"
        onClick={showModal}
      >
       {text}
      </button>

      <dialog ref={modalRef}  className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {children}
          <div className="modal-action">
            {/* Close the modal when the button is clicked */}
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
