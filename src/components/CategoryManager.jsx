import { useState } from 'react';
import './CategoryManager.css';

function CategoryManager(props) {

    // State to hold the new category name input
    const [newCategoryName, setNewCategoryName] = useState('');
    const defaultCategories = ['Food', 'Utilities', 'Personal', 'Lifestyle'];

    // Handle adding a new category
    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            props.onAddCategory(newCategoryName);
            setNewCategoryName('');
        }
    };

    return (
        <div className="category-manager">
            <div className="category-manager-header">
                <h3>Manage Categories</h3>
                <button onClick={props.onClose} className="close-button">
                    Close
                </button>
            </div>

            <div className="add-category-section">
                <input
                    type="text"
                    placeholder="New category name (min 5 chars)"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="category-input"
                />
                <button onClick={handleAddCategory} className="add-category-button">
                    Add Category
                </button>
            </div>

            <div className="categories-list">
                {props.categories.map((category) => (
                    <div key={category} className="category-item">
                        <span>{category}</span>
                        {!defaultCategories.includes(category) && (
                            <button
                                onClick={() => props.onDeleteCategory(category)}
                                className="delete-category-button"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryManager;