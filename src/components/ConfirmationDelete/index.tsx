import Modal from 'react-modal'
import style from './styles.module.scss'
import { useConfirmationDeleteModal } from "../../context/confirmationDelete.context"
import { useTransactions } from '../../context/transaction.context'

export function ConfirmationDeleteModal () {
  const { isOpen, handleCloseConfirmationDeleteModal } = useConfirmationDeleteModal()
  const { deleteTransaction } = useTransactions()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseConfirmationDeleteModal}
      contentLabel="Confirmation Delete Modal"
      className="react-modal-confirmation-delete"
      overlayClassName="react-modal-overlay-confirmation-delete"
    >
      <div className={style.content}>
        <h2>Are you sure you want to delete this item?</h2>
        <div>
          <button className={style.secondaryButton} onClick={handleCloseConfirmationDeleteModal}>Cancel</button>
          <button className={style.primaryButton} onClick={() => { deleteTransaction(), handleCloseConfirmationDeleteModal() }}>Delete</button>
        </div>
      </div>
    </Modal>
  )
}