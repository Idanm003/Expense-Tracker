import { useEffect, useState } from 'react';
import './App.css';
import TransactionList from './components/TransactionList';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import AddTransactionModal from './components/AddTransactionModal';

function App() {

    //States

    // State to toggle between home page and app
    const [showHome, setShowHome] = useState(true);

    // Dark mode state
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

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

    // Active tab and modal state
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Effects

    // Apply dark mode class to body
    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

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
            <button className="theme-toggle" onClick={() => setDarkMode(prev => !prev)}>
                {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            {showHome ? (
                <HomePage onGetStarted={() => setShowHome(false)} />
            ) : (
                <div>
                    <h1>Expense Tracker</h1>
                    <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
                    {activeTab === 'dashboard' && (
                        <Dashboard transactions={transactions} />
                    )}
                    {activeTab === 'details' && (
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
                    )}
                    {activeTab === 'reports' && (
                        <Reports transactions={transactions} />
                    )}
                    <button className="fab" onClick={() => setIsModalOpen(true)}>+</button>
                    {isModalOpen && (
                        <AddTransactionModal
                            onClose={() => setIsModalOpen(false)}
                            onAddTransaction={handleAddTransaction}
                            categories={categories}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default App;