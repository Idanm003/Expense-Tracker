import { useEffect, useState } from "react";
import './TransactionForm.css';

function TransactionForm(props) {


    const initialFormData = {
        description: "",
        pricePerUnit: 0,
        quantity: 1,
        totalAmount: 0,
        paymentMethod: "",
        category: "",
        date: "",
        type: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (formData.pricePerUnit && formData.quantity) {
            const total = parseFloat(formData.pricePerUnit) * parseInt(formData.quantity);
            setFormData((prevData) => ({
                ...prevData,
                totalAmount: total
            }));
        }
    }, [formData.pricePerUnit, formData.quantity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const buttonValue = e.nativeEvent.submitter.value;
        const transactionData = {
            ...formData,
            type: buttonValue
        };
        props.onAddTransaction(transactionData);
        setFormData(initialFormData); // Reset form after submission

        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}
            id="form"
            className="form-container">
            <label>Description: </label>
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <label>Price per Unit: </label>
            <input
                type="number"
                name="pricePerUnit"
                placeholder="Price per Unit"
                min={0}
                value={formData.pricePerUnit}
                onChange={handleChange}
            />
            <label>Quantity: </label>
            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                min={0}
                max={99}
                value={formData.quantity}
                onChange={handleChange}
            />
            <label>Total Amount: </label>
            <input
                type="number"
                name="totalAmount"
                placeholder="Total Amount"
                value={formData.totalAmount}
                readOnly
                onChange={handleChange}
            />
            <label>Payment Method: </label>
            <select
                type="select"
                name="paymentMethod"
                placeholder="Payment Method"
                value={formData.paymentMethod}
                onChange={handleChange}
            >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
            </select>
            <label>Category: </label>
            <select
                type="select"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
            >
                <option value="">Select Category</option>
                {props.categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <label>Date: </label>
            <input
                type="date"
                name="date"
                placeholder={new Date().toISOString().split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
            />
            <button type="submit"
                className="btn-expense"
                value={"Expense"}
            >
                Add Expense
            </button>
            <button type="submit"
                className="btn-income"
                value={"Income"}>
                Add Income
            </button>
            <button type="reset"
                className="btn-reset"
                onClick={() => setFormData(initialFormData)}>
                Reset
                </button>
        </form>
    );
}

export default TransactionForm;