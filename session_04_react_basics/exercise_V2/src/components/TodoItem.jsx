import { useState, useRef, useEffect } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const editRef = useRef(null);

    // Focus vào input khi bắt đầu sửa
    useEffect(() => {
        if (isEditing && editRef.current) {
            editRef.current.focus();
            editRef.current.select();
        }
    }, [isEditing]);

    function handleSave() {
        if (editText.trim() === "") {
            setEditText(todo.text);
        } else {
            onEdit(todo.id, editText.trim());
        }
        setIsEditing(false);
    }

    function handleCancel() {
        setEditText(todo.text);
        setIsEditing(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") handleCancel();
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 14px",
                margin: "4px 0",
                background: todo.done ? "#f0fff0" : "#fff",
                border: "1px solid #eee",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{
                    marginRight: "12px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                    accentColor: "#27ae60",
                }}
            />

            {/* Nội dung */}
            {isEditing ? (
                <input
                    ref={editRef}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    style={{
                        flex: 1,
                        padding: "6px 10px",
                        border: "2px solid #3498db",
                        borderRadius: "4px",
                        fontSize: "14px",
                        outline: "none",
                    }}
                />
            ) : (
                <span
                    onDoubleClick={() => {
                        if (!todo.done) setIsEditing(true);
                    }}
                    style={{
                        flex: 1,
                        textDecoration: todo.done ? "line-through" : "none",
                        color: todo.done ? "#999" : "#333",
                        fontSize: "15px",
                        cursor: todo.done ? "default" : "pointer",
                    }}
                >
                    {todo.text}
                </span>
            )}

            {/* Nút hành động */}
            {!isEditing && (
                <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                    {!todo.done && (
                        <button
                            onClick={() => setIsEditing(true)}
                            title="Sửa"
                            style={{
                                background: "#f39c12",
                                color: "white",
                                border: "none",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                            }}
                        >
                            ✏️
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(todo.id)}
                        title="Xóa"
                        style={{
                            background: "#e74c3c",
                            color: "white",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                        }}
                    >
                        🗑
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoItem;
