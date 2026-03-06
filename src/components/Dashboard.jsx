import { useState } from 'react';
import './Dashboard.css';

function Dashboard({ transactions }) {

    // State to track active type filter
    const [activeType, setActiveType] = useState('Expense');

    // Filter transactions based on active type
    const filtered = activeType === 'All' ? transactions : transactions.filter(t => t.type === activeType);

    // Calculate total income
    const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + Number(t.totalAmount), 0);

    // Calculate total expenses and balance
    const totalExpense = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + Number(t.totalAmount), 0);

    // Calculate balance
    const balance = totalIncome - totalExpense;

    // Group transactions by category
    const grouped = filtered.reduce((acc, t) => {
        const cat = t.category || 'Uncategorized';
        if (!acc[cat]) acc[cat] = { count: 0, total: 0 };
        acc[cat].count += 1;
        acc[cat].total += Number(t.totalAmount);
        return acc;
    }, {});

    return (
        <div className="dashboard">
            <div className="type-toggle">
                <button
                    className={`toggle-btn all-btn ${activeType === 'All' ? 'active' : ''}`}
                    onClick={() => setActiveType('All')}
                >
                    ALL
                </button>
                <button
                    className={`toggle-btn expense-btn ${activeType === 'Expense' ? 'active' : ''}`}
                    onClick={() => setActiveType('Expense')}
                >
                    EXPENSE
                </button>
                <button
                    className={`toggle-btn income-btn ${activeType === 'Income' ? 'active' : ''}`}
                    onClick={() => setActiveType('Income')}
                >
                    INCOME
                </button>
            </div>

            <div className="budget-label">BUDGET</div>

            {Object.keys(grouped).length === 0 ? (
                <p className="empty-dashboard">No {activeType === 'All' ? '' : activeType.toLowerCase() + ' '}transactions yet.</p>
            ) : (
                <ul className="category-list">
                    {Object.entries(grouped).map(([category, { count, total }]) => (
                        <li key={category} className="category-row">
                            <div className="category-info">
                                <span className="category-name">{category}</span>
                                <span className="category-count">({count})</span>
                            </div>
                            <span className={`category-total ${activeType === 'Expense' ? 'expense-amount' : 'income-amount'}`}>
                                ${Number(total).toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="dashboard-footer">
                {activeType === 'All' ? (
                    <>
                        <div className="footer-row">
                            <span>TOTAL INCOME</span>
                            <span className="income-amount">${totalIncome.toFixed(2)}</span>
                        </div>
                        <div className="footer-row">
                            <span>TOTAL EXPENSE</span>
                            <span className="expense-amount">${totalExpense.toFixed(2)}</span>
                        </div>
                    </>
                ) : (
                    <div className="footer-row">
                        <span>TOTAL {activeType.toUpperCase()}</span>
                        <span className={activeType === 'Expense' ? 'expense-amount' : 'income-amount'}>
                            ${(activeType === 'Expense' ? totalExpense : totalIncome).toFixed(2)}
                        </span>
                    </div>
                )}
                <div className="footer-row balance-row">
                    <span>BALANCE</span>
                    <span className={balance >= 0 ? 'income-amount' : 'expense-amount'}>
                        ${Math.abs(balance).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
