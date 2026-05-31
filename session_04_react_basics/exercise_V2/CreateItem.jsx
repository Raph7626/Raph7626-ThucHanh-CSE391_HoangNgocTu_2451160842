import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" },
    ]);
    const [newName, setNewName] = useState("");

    // Thử thách: Thông báo thành công
    const [successMsg, setSuccessMsg] = useState("");

    // Thử thách: Focus lại input
    const inputRef = useRef(null);

    function handleAdd() {
        // Thử thách: Validate không cho thêm nếu trống
        if (newName.trim() === "") {
            setSuccessMsg("");
            return;
        }

        const newItem = {
            id: Date.now(),
            name: newName.trim(),
        };

        setItems([...items, newItem]);
        setNewName("");

        // Thử thách: Hiển thị "Đã thêm thành công!"
        setSuccessMsg(`✅ Đã thêm "${newItem.name}" thành công!`);
        setTimeout(() => setSuccessMsg(""), 3000);

        // Thử thách: Focus lại input
        inputRef.current.focus();
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleAdd();
        }
    }

    function handleDelete(id) {
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm môn học</h2>

            <div style={{ marginBottom: "15px" }}>
                <input
                    ref={inputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tên môn học..."
                    style={{
                        padding: "8px",
                        marginRight: "10px",
                        border: newName.trim() === "" && newName.length > 0 ? "2px solid red" : "1px solid #ccc",
                    }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
                    ➕ Thêm
                </button>
            </div>

            {/* Thử thách: Thông báo */}
            {successMsg && (
                <p style={{ color: "#27ae60", fontWeight: "bold", margin: "10px 0" }}>
                    {successMsg}
                </p>
            )}

            <h3>Danh sách ({items.length} môn):</h3>
            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Chưa có môn học nào</p>
            ) : (
                items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <span>{item.name}</span>
                        <button
                            onClick={() => handleDelete(item.id)}
                            style={{
                                background: "#e74c3c",
                                color: "white",
                                border: "none",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default CreateItem;
