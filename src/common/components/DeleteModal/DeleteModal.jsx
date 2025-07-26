
import './DeleteModal.scss'; 
import Modal from '../modal/Modal';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName = "this item" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
        <div className="delete-modal__buttons">
          <button className="btn cancel" onClick={onClose}>Cancel</button>
          <button className="btn confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
