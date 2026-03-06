import './Summary.css';

function Summary(props) {

    // Destructure transactions from props
    const { transactions } = props;
    
    // Calculate total income, total expense, and net balance
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce((sum, transaction) => sum + transaction.totalAmount, 0);
    
    // Calculate total expenses and balance
    const totalExpense = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce((sum, transaction) => sum + transaction.totalAmount, 0);
    
    // Calculate net balance
    const netBalance = totalIncome - totalExpense;

    return (
        <div className={`summary-card ${netBalance >= 0 ? 'income-summary' : 'expense-summary'}`}>
            <h2>Summary</h2>
            <p>Total Income: <span className="income-value">${totalIncome.toFixed(2)}</span></p>
            <p>Total Expense: <span className="expense-value">${totalExpense.toFixed(2)}</span></p>
            <p>Net Balance: <span className={netBalance >= 0 ? 'positive-value' : 'negative-value'}>{netBalance >= 0 ? `+$${netBalance.toFixed(2)}` : `-$${Math.abs(netBalance).toFixed(2)}`}</span></p>
        </div>
    );
}

export default Summary;