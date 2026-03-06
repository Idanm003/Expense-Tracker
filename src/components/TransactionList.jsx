import Transaction from './Transaction';
import CategoryManager from './CategoryManager';
import './TransactionList.css';

function TransactionList(props) {
    return (
        <div className="transaction-list-container">
            <div className="transactions-header">
                <h2>Transactions</h2>
                <div className="header-controls">
                    <button
                        onClick={props.onToggleCategoryManager}
                        className="manage-categories-button"
                    >
                        Manage Categories
                    </button>

                    <select
                        className="category-filter"
                        value={props.selectedCategory}
                        onChange={props.onCategoryChange}
                    >
                        <option value="all">
                            All Categories
                        </option>
                        {props.categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {props.isCategoryManagerOpen && (
                <CategoryManager
                    categories={props.categories}
                    onAddCategory={props.onAddCategory}
                    onDeleteCategory={props.onDeleteCategory}
                    onClose={props.onToggleCategoryManager}
                />
            )}

            <div>
                {props.transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                        onDelete={() => props.onDeleteTransaction(transaction.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default TransactionList;