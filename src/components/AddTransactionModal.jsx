import TransactionForm from './TransactionForm';
import './AddTransactionModal.css';

function AddTransactionModal({ onClose, onAddTransaction, categories }) {

    // Handle adding a transaction
    const handleAdd = (transaction) => {
        onAddTransaction(transaction);
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Transaction</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <TransactionForm onAddTransaction={handleAdd} categories={categories} />
            </div>
        </div>
    );
}

export default AddTransactionModal;
