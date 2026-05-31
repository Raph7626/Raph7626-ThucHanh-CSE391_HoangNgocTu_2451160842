import { useState, useRef } from "react";

function CrudApp() {
    const [items, setItems] = useState([
        { id: 1, name: "React", category: "Frontend" },
        { id: 2, name: "Node.js", category: "Backend" },
        { id: 3, name: "MongoDB", category: "Database" },
    ]);

    // Form thêm mới
    const [newName, setNewName] = useState("");
    const [newCategory, setNewCategory] = useState("Frontend");

    // Chế độ sửa
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCategory, setEditCategory] = useState("");

    // Thông báo
    const [message, setMessage] = useState({ text: "", type: "" });

    const inputRef = useRef(null);

    // Hiển thị thông báo
    function showMessage(text, type = "success") {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }

    // CREATE — Thêm
    function handleAdd() {
        if (newName.trim() === "") return;

        const newItem = {
            id: Date.now(),
            name: newName.trim(),
            category: newCategory,
        };

        setItems([...items, newItem]);
        showMessage(`✅ Đã thêm "${newItem.name}"`);
        setNewName("");
        inputRef.current.focus();
    }

    // DELETE — Xóa
    function handleDelete(id, name) {
        if (!window.confirm(`Xóa "${name}"?`)) return;
        setItems(items.filter((item) => item.id !== id));
        showMessage(`🗑 Đã xóa "${name}"`, "warning");
    }

    // UPDATE — Bắt đầu sửa
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditCategory(item.category);
    }

    // UPDATE — Lưu
    function saveEdit() {
        if (editName.trim() === "") return;

        setItems(
            items.map((item) =>
                item.id === editingId
                    ? { ...item, name: editName.trim(), category: editCategory }
                    : item
            )
        );
        showMessage(`✏️ Đã cập nhật "${editName.trim()}"`);
        setEditingId(null);
    }

    // UPDATE — Hủy
    function cancelEdit() {
        setEditingId(null);
    }

    function handleAddKeyPress(e) {
        if (e.key === "Enter") handleAdd();
    }

    function handleEditKeyPress(e) {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") cancelEdit();
    }

    const categories = ["Frontend", "Backend", "Database", "DevOps", "Mobile"];

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Quản lý Công nghệ</h2>

            {/* Thông báo */}
            {message.text && (
                <div style={{
                    padding: "10px 15px",
                    borderRadius: "4px",
                    marginBottom: "15px",
                    background: message.type === "warning" ? "#fff3cd" : "#d4edda",
                    color: message.type === "warning" ? "#856404" : "#155724",
                }}>
                    {message.text}
                </div>
            )}

            {/* Form thêm mới */}
            <div style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                padding: "15px",
                background: "#f5f5f5",
                borderRadius: "8px",
                flexWrap: "wrap",
            }}>
                <input
                    ref={inputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleAddKeyPress}
                    placeholder="Tên công nghệ..."
                    style={{ padding: "8px", flex: "1", minWidth: "150px" }}
                />
                <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ padding: "8px" }}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button
                    onClick={handleAdd}
                    style={{
                        padding: "8px 20px",
                        background: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    ➕ Thêm
                </button>
            </div>

            {/* Danh sách */}
            <p style={{ color: "#666", marginBottom: "10px" }}>
                Tổng: {items.length} công nghệ
            </p>

            {items.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center", padding: "30px" }}>
                    Chưa có công nghệ nào. Hãy thêm ở trên!
                </p>
            ) : (
                items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            padding: "12px 15px",
                            margin: "6px 0",
                            background: editingId === item.id ? "#e3f2fd" : "white",
                            border: editingId === item.id ? "2px solid #2196f3" : "1px solid #eee",
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                        }}
                    >
                        {editingId === item.id ? (
                            // Chế độ sửa
                            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onKeyDown={handleEditKeyPress}
                                    autoFocus
                                    style={{
                                        padding: "6px 10px",
                                        border: "2px solid #2196f3",
                                        borderRadius: "4px",
                                        flex: "1",
                                        minWidth: "120px",
                                    }}
                                />
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    style={{ padding: "6px" }}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={saveEdit}
                                    style={{
                                        background: "#27ae60",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✓
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    style={{
                                        background: "#95a5a6",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            // Chế độ xem
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <span style={{
                                        marginLeft: "10px",
                                        padding: "2px 8px",
                                        background: "#e8eaf6",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        color: "#3f51b5",
                                    }}>
                                        {item.category}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "6px" }}>
                                    <button
                                        onClick={() => startEdit(item)}
                                        style={{
                                            background: "#3498db",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "13px",
                                        }}
                                    >
                                        ✏️ Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, item.name)}
                                        style={{
                                            background: "#e74c3c",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "13px",
                                        }}
                                    >
                                        🗑 Xóa
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default CrudApp;
