import React from 'react'
import FormButton from '../Form/FormButton';
import Modal from '../Modal/Modal';

function ConfirmDialog({ title, id , onClose , formAction, isLoading}: any) {

  const handleSubmit = (e : any)=> {
    e.preventDefault();
    formAction(id);
  }

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col px-5">
        <p>
          Are You Sure ?
        </p>
        <div className="flex">
          <button
            className="my-5 bg-white w-1/2 flex items-center justify-center h-10 rounded-md text-textGreen font-bold hover:border"
            onClick={() => onClose(false)}
            type="button"
          >
            Cancel
          </button>

          <FormButton
            loading={isLoading}
            text="Confirm"
            className="w-1/2 mx-1"
          />
        </div>
      </form>
    </Modal>

  )
}

export default ConfirmDialog;