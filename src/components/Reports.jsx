import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Reports.css';

const COLORS = ['#4CAF50', '#FF6F61', '#00ACC1', '#FFA726', '#AB47BC', '#26A69A', '#EC407A', '#7E57C2'];

function Reports({ transactions }) {

    // State to track active type filter
    const [activeType, setActiveType] = useState('All');

    // Filter transactions based on active type
    const filtered = activeType === 'All' ? transactions : transactions.filter(t => t.type === activeType);

    // Group transactions by category and calculate total
    const grouped = filtered.reduce((acc, t) => {
        const cat = t.category || 'Uncategorized';
        acc[cat] = (acc[cat] || 0) + Number(t.totalAmount);
        return acc;
    }, {});

    // Convert grouped data into format suitable for recharts
    const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

    // Calculate total for percentage calculation
    const total = data.reduce((sum, d) => sum + d.value, 0);

    // Custom label renderer to show percentage on the pie chart
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (percent < 0.04) return null;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="reports">
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

            {data.length === 0 ? (
                <p className="empty-reports">No {activeType === 'All' ? '' : activeType.toLowerCase() + ' '}transactions to display.</p>
            ) : (
                <>
                    <p className="reports-subtitle">Breakdown by category</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                dataKey="value"
                                labelLine={false}
                                label={renderLabel}
                            >
                                {data.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>

                    <ul className="reports-legend-list">
                        {data.map((entry, index) => (
                            <li key={entry.name} className="legend-item">
                                <span className="legend-dot" style={{ background: COLORS[index % COLORS.length] }} />
                                <span className="legend-name">{entry.name}</span>
                                <span className="legend-value">${entry.value.toFixed(2)}</span>
                                <span className="legend-pct">{total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0}%</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Reports;
