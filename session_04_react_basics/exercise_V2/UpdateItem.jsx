import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");

    // Thử thách: Thông báo đã lưu
    const [savedMsg, setSavedMsg] = useState("");

    // Thử thách: Highlight khi đang sửa
    const [nameError, setNameError] = useState(false);

    // Bắt đầu sửa
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setNameError(false);
    }

    // Lưu sửa
    function saveEdit() {
        // Thử thách: Không cho lưu nếu tên trống
        if (editName.trim() === "") {
            setNameError(true);
            return;
        }

        setItems(
            items.map((item) =>
                item.id === editingId
                    ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                    : item
            )
        );

        // Thử thách: Hiển thị "Đã lưu!"
        const savedName = editName.trim();
        setSavedMsg(`✅ Đã lưu "${savedName}" thành công!`);
        setTimeout(() => setSavedMsg(""), 3000);

        setEditingId(null);
    }

    // Hủy sửa
    function cancelEdit() {
        setEditingId(null);
        setNameError(false);
    }

    // Xử lý phím
    function handleKeyPress(event) {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") cancelEdit();
    }

    // Kiểm tra tên khi nhập
    function handleNameChange(e) {
        setEditName(e.target.value);
        if (e.target.value.trim() !== "") {
            setNameError(false);
        }
    }

    return (
        <div style={{ padding: "20px", maxWidth: "500px" }}>
            <h2>Sửa thông tin sinh viên</h2>

            {/* Thử thách: Thông báo đã lưu */}
            {savedMsg && (
                <p style={{
                    color: "#27ae60",
                    fontWeight: "bold",
                    background: "#e8f5e9",
                    padding: "10px",
                    borderRadius: "4px",
                    margin: "10px 0",
                }}>
                    {savedMsg}
                </p>
            )}

            {items.map((item) => (
                <div
                    key={item.id}
                    style={{
                        padding: "12px",
                        margin: "8px 0",
                        background: editingId === item.id ? "#e3f2fd" : "#f9f9f9",
                        // Thử thách: Highlight khi đang sửa
                        border: editingId === item.id ? "2px solid #2196f3" : "2px solid transparent",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                    }}
                >
                    {editingId === item.id ? (
                        // Chế độ sửa
                        <div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                                <div>
                                    <input
                                        value={editName}
                                        onChange={handleNameChange}
                                        onKeyDown={handleKeyPress}
                                        autoFocus
                                        placeholder="Tên..."
                                        style={{
                                            padding: "6px 10px",
                                            border: nameError ? "2px solid red" : "2px solid #2196f3",
                                            borderRadius: "4px",
                                            backgroundColor: nameError ? "#ffebee" : "#fff",
                                        }}
                                    />
                                    {/* Thử thách: Không cho lưu nếu tên trống */}
                                    {nameError && (
                                        <p style={{ color: "red", fontSize: "12px", margin: "4px 0 0 0" }}>
                                            Tên không được để trống!
                                        </p>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    value={editAge}
                                    onChange={(e) => setEditAge(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Tuổi..."
                                    style={{
                                        padding: "6px 10px",
                                        width: "70px",
                                        border: "2px solid #2196f3",
                                        borderRadius: "4px",
                                    }}
                                />
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
                                    ✓ Lưu
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
                                    ✕ Hủy
                                </button>
                            </div>
                            <p style={{ fontSize: "11px", color: "#888", margin: "6px 0 0 0" }}>
                                Enter để lưu · Escape để hủy
                            </p>
                        </div>
                    ) : (
                        // Chế độ xem
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>
                                <strong>{item.name}</strong> — {item.age} tuổi
                            </span>
                            <button
                                onClick={() => startEdit(item)}
                                style={{
                                    background: "#3498db",
                                    color: "white",
                                    border: "none",
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UpdateItem;
