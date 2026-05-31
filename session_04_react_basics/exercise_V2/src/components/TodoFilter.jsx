function TodoFilter({ filter, setFilter }) {
    const filters = [
        { key: "all", label: "Tất cả", icon: "📋" },
        { key: "active", label: "Chưa xong", icon: "⏳" },
        { key: "completed", label: "Hoàn thành", icon: "✅" },
    ];

    return (
        <div
            style={{
                display: "flex",
                marginBottom: "15px",
                gap: "6px",
            }}
        >
            {filters.map((f) => (
                <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{
                        flex: 1,
                        padding: "8px 12px",
                        background: filter === f.key ? "#3498db" : "#f0f0f0",
                        color: filter === f.key ? "white" : "#555",
                        border:
                            filter === f.key
                                ? "2px solid #3498db"
                                : "2px solid transparent",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: filter === f.key ? "bold" : "normal",
                        transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                        if (filter !== f.key) e.target.style.background = "#e0e0e0";
                    }}
                    onMouseOut={(e) => {
                        if (filter !== f.key) e.target.style.background = "#f0f0f0";
                    }}
                >
                    {f.icon} {f.label}
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;
