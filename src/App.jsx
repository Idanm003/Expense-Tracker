import { useEffect, useState } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import HomePage from './components/HomePage';

function App() {

    //States

    // State to toggle between home page and app
    const [showHome, setShowHome] = useState(true);

    // State to track if data has been loaded from localStorage
    const [isLoaded, setIsLoaded] = useState(false);

    // State for transactions and handler to add new transaction
    const [transactions, setTransactions] = useState([]);

    // Initial categories
    const defaultCategories = ["Food", "Lifestyle", "Personal", "Utilities"];
    const [categories, setCategories] = useState(["Food", "Lifestyle", "Personal", "Utilities"]);

    // Category filter state and handler
    const [selectedCategory, setSelectedCategory] = useState('all');

    // State and handler for category manager
    const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

    //Effects

    // Load transactions and categories from localStorage on mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem('transactions');
        const savedCategories = localStorage.getItem('categories');

        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        }
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
        setIsLoaded(true);
    }, []);

    // Save transactions to localStorage when they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }
    }, [transactions, isLoaded]);

    // Save categories to localStorage when they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }, [categories, isLoaded]);

    //Waits for data to load before rendering
    if (!isLoaded) {
        return <div className="loading">Loading...</div>;
    }

    // Functions

    // Handle adding a new transaction
    const handleAddTransaction = (newTransaction) => {
        const transactionsWithId = {
            id: Date.now(),
            ...newTransaction
        };
        setTransactions([...transactions, transactionsWithId]);
        console.log(transactionsWithId);
    };

    // Handle deleting a transaction
    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };

    // Handle category filter change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Filter transactions based on selected category
    const filteredTransactions = selectedCategory === 'all'
        ? transactions
        : transactions.filter(transaction => transaction.category === selectedCategory);

    // Toggle category manager visibility
    const toggleCategoryManager = () => {
        setIsCategoryManagerOpen(!isCategoryManagerOpen);
    };

    // Handle adding a new category
    const addCategory = (newCategory) => {
        const trimmed = newCategory.trim();

        if (trimmed.length < 5) {
            alert("Category name must be at least 5 characters long.");
            return;
        }

        if (categories.includes(trimmed)) {
            alert("Category already exists.");
            return;
        }
        setCategories([...categories, trimmed]);
    };

    // Handle deleting a category
    const deleteCategory = (categoryToDelete) => {
        if (defaultCategories.includes(categoryToDelete)) {
            alert("Cannot delete default categories.");
            return;
        }
        if (window.confirm(`Are you sure you want to delete the category "${categoryToDelete}"? This will also delete all transactions in this category.`)) {
            setCategories(categories.filter(category => category !== categoryToDelete));
        }
    };

    return (
        <div className="App">
            {showHome ? (
                <HomePage onGetStarted={() => setShowHome(false)} />
            ) : (
                <div>
                    <h1>Expense Tracker</h1>
                    <TransactionForm
                        onAddTransaction={handleAddTransaction}
                        categories={categories}
                    />
                    <TransactionList
                        transactions={filteredTransactions}
                        onDeleteTransaction={deleteTransaction}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        isCategoryManagerOpen={isCategoryManagerOpen}
                        onToggleCategoryManager={toggleCategoryManager}
                        onAddCategory={addCategory}
                        onDeleteCategory={deleteCategory}
                    />
                    <Summary
                        transactions={transactions}
                    />
                </div>
            )}
        </div>
    );
}

export default App;