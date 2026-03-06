import './HomePage.css';

function HomePage(props) {
    return (
        <div className="home-page">
            <div className="home-content">
                <h1 className="home-title">Expense Tracker</h1>
                <p className="home-tagline">Track Your Spending Effortlessly</p>
                <p className="home-description">
                    Manage your income and expenses with ease.
                    Categorize transactions, filter by category,
                    and view your financial summary at a glance.
                </p>
                <button
                    onClick={props.onGetStarted}
                    className="get-started-button"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default HomePage;