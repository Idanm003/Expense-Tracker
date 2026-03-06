import './NavBar.css';

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'details', label: 'Details', icon: '☰' },
    { id: 'reports', label: 'Reports', icon: '◑' },
];

function NavBar({ activeTab, onTabChange }) {
    return (
        <nav className="navbar">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default NavBar;
