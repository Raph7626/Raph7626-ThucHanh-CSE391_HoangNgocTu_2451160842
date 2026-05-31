import { useState } from "react";

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" },
    ]);

    // Thử thách: Hoàn tác
    const [deletedItem, setDeletedItem] = useState(null);
    const [undoTimer, setUndoTimer] = useState(null);
    const [deleteMsg, setDeleteMsg] = useState("");

    // Thử thách: Chỉ cho xóa khi confirm
    function handleDelete(id, name) {
        const confirmDelete = window.confirm(`Bạn có chắc muốn xóa "${name}"?`);
        if (!confirmDelete) return;

        const item = items.find((i) => i.id === id);
        setItems(items.filter((item) => item.id !== id));

        // Thử thách: Hiển thị "Đã xóa [tên]"
        setDeleteMsg(`🗑 Đã xóa "${name}"`);

        // Thử thách: Hoàn tác trong 5 giây
        setDeletedItem(item);
        if (undoTimer) clearTimeout(undoTimer);
        const timer = setTimeout(() => {
            setDeletedItem(null);
            setDeleteMsg("");
        }, 5000);
        setUndoTimer(timer);
    }

    // Hoàn tác
    function handleUndo() {
        if (deletedItem) {
            setItems([...items, deletedItem]);
            setDeletedItem(null);
            setDeleteMsg("");
            if (undoTimer) clearTimeout(undoTimer);
        }
    }

    function handleDeleteAll() {
        if (window.confirm("Xóa tất cả sinh viên?")) {
            setItems([]);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Xóa sinh viên</h2>

            {items.length > 0 && (
                <button
                    onClick={handleDeleteAll}
                    style={{
                        marginBottom: "10px",
                        background: "#e74c3c",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    🗑 Xóa tất cả
                </button>
            )}

            {/* Thử thách: Thông báo đã xóa + nút hoàn tác */}
            {deleteMsg && (
                <div style={{
                    padding: "10px 15px",
                    background: "#fff3cd",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <span>{deleteMsg}</span>
                    {deletedItem && (
                        <button
                            onClick={handleUndo}
                            style={{
                                background: "#27ae60",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            ↩ Hoàn tác
                        </button>
                    )}
                </div>
            )}

            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Danh sách trống</p>
            ) : (
                items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            margin: "5px 0",
                            background: "#f9f9f9",
                            borderRadius: "4px",
                        }}
                    >
                        <span>{item.name}</span>
                        <button
                            onClick={() => handleDelete(item.id, item.name)}
                            style={{
                                background: "#e74c3c",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}

            <p style={{ marginTop: "10px", color: "#666" }}>
                Còn lại: {items.length} sinh viên
            </p>
        </div>
    );
}

export default DeleteItem;
