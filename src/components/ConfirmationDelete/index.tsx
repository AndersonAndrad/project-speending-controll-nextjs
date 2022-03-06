import Modal from 'react-modal'
import style from './styles.module.scss'
import { useTransactionModal } from '../../context/transactionModal.context'
import { useTransactions } from '../../context/transaction.context'

export function ConfirmationDeleteModal () {
  const { isOpenDeleteModal, handleCloseConfirmationDeleteModal } = useTransactionModal()
  const { deleteTransaction } = useTransactions()

  return (
    <Modal
      isOpen={isOpenDeleteModal}
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