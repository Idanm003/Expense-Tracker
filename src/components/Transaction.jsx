import './Transaction.css';

function Transaction(props) {
    const { transaction } = props;

    return (
        <div className={`transaction-card ${transaction.type === 'Income' ? 'income-card' : 'expense-card'}`}>
            <button onClick={props.onDelete} className="delete-button">
                Delete
            </button>
            <h3 className="transaction-title">
                {transaction.description}
            </h3>
            <div className="transaction-details">
                <p className="transaction-info">
                    <span className="label">Price per Unit:</span> ${transaction.pricePerUnit}
                </p>
                <p className="transaction-info">
                    <span className="label">Quantity:</span> {transaction.quantity}
                </p>
                <p className="transaction-info">
                    <span className="label">Total Amount:</span> ${transaction.totalAmount}
                </p>
                <p className="transaction-info">
                    <span className="label">Payment Method:</span> {transaction.paymentMethod}
                </p>
                <p className="transaction-info">
                    <span className="label">Category:</span> {transaction.category}
                </p>
                <p className="transaction-info">
                    <span className="label">Date:</span> {transaction.date}
                </p>
                <p className="transaction-info transaction-type">
                    <span className="label">Type:</span> {transaction.type}
                </p>
            </div>
        </div>
    );
}

export default Transaction;