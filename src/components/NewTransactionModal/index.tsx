import Modal from 'react-modal'
import { useState } from "react"
import { useTransactionModal } from '../../context/transactionModal.context'

type NewTransactionModalProps = {
  setIsOpen: boolean,
  onRequestClose: () => void,
}

export function NewTransactionModal () {
  const { isOpen, handleCloseNewTransactionModal } = useTransactionModal()
  const [type, setType] = useState( 'deposit' )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => { handleCloseNewTransactionModal }}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div>
        <h1>OK this is modal where you work</h1>
        <button onClick={() => handleCloseNewTransactionModal()}> click here to close modal </button>
      </div>
    </Modal>
  )

}