import { useState, useRef } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    // State chính (Tier 4)
    const [todos, setTodos] = useState([
        { id: 1, text: "Học React cơ bản", done: true },
        { id: 2, text: "Hoàn thành Todo App", done: false },
        { id: 3, text: "Ôn lại useState", done: false },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    const inputRef = useRef(null);

    // ===== Thêm todo (Tier 6) =====
    function addTodo() {
        if (inputValue.trim() === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            done: false,
        };

        setTodos([...todos, newTodo]);
        setInputValue("");
        inputRef.current.focus();
    }

    // Xử lý phím Enter (Tier 5)
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    }

    // ===== Toggle done (Tier 6) =====
    function toggleTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    }

    // ===== Xóa todo (Tier 6) =====
    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    // ===== Sửa todo =====
    function editTodo(id, newText) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    }

    // ===== Xóa tất cả đã hoàn thành =====
    function clearCompleted() {
        setTodos(todos.filter((todo) => !todo.done));
    }

    // ===== Đánh dấu tất cả =====
    function toggleAll() {
        const allDone = todos.every((todo) => todo.done);
        setTodos(todos.map((todo) => ({ ...todo, done: !allDone })));
    }

    // ===== Lọc todos (Tier 2) =====
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });

    // ===== Đếm số việc (Tier 2) =====
    const activeCount = todos.filter((todo) => !todo.done).length;
    const completedCount = todos.filter((todo) => todo.done).length;
    const totalCount = todos.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div
            style={{
                maxWidth: "550px",
                margin: "40px auto",
                padding: "30px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
        >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <h1 style={{ margin: "0 0 5px 0", fontSize: "28px", color: "#2c3e50" }}>
                    📋 Todo List
                </h1>
                <p style={{ margin: "0", color: "#999", fontSize: "14px" }}>
                    Quản lý công việc hàng ngày
                </p>
            </div>

            {/* Thanh tiến trình */}
            {totalCount > 0 && (
                <div style={{ marginBottom: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "6px",
                            fontSize: "13px",
                            color: "#666",
                        }}
                    >
                        <span>Tiến độ</span>
                        <span>{progress}%</span>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            height: "8px",
                            background: "#ecf0f1",
                            borderRadius: "4px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: `${progress}%`,
                                height: "100%",
                                background:
                                    progress === 100
                                        ? "linear-gradient(90deg, #27ae60, #2ecc71)"
                                        : "linear-gradient(90deg, #3498db, #2ecc71)",
                                borderRadius: "4px",
                                transition: "width 0.4s ease",
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Input (Tier 5) */}
            <div style={{ display: "flex", marginBottom: "15px" }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập công việc mới..."
                    style={{
                        flex: 1,
                        padding: "12px 16px",
                        fontSize: "15px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "8px 0 0 8px",
                        outline: "none",
                        transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3498db")}
                    onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                />
                <button
                    onClick={addTodo}
                    style={{
                        padding: "12px 24px",
                        fontSize: "15px",
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "0 8px 8px 0",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#2980b9")}
                    onMouseOut={(e) => (e.target.style.background = "#3498db")}
                >
                    Thêm
                </button>
            </div>

            {/* Filter (Tier 3) */}
            <TodoFilter filter={filter} setFilter={setFilter} />

            {/* Hành động hàng loạt */}
            {totalCount > 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                        fontSize: "13px",
                    }}
                >
                    <button
                        onClick={toggleAll}
                        style={{
                            background: "none",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "4px 10px",
                            cursor: "pointer",
                            color: "#666",
                            fontSize: "12px",
                        }}
                    >
                        {activeCount === 0 ? "☑ Bỏ chọn tất cả" : "☐ Chọn tất cả"}
                    </button>
                    {completedCount > 0 && (
                        <button
                            onClick={clearCompleted}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#e74c3c",
                                cursor: "pointer",
                                fontSize: "12px",
                                textDecoration: "underline",
                            }}
                        >
                            Xóa {completedCount} việc đã xong
                        </button>
                    )}
                </div>
            )}

            {/* Todo list (Tier 6) */}
            {filteredTodos.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "50px 20px",
                        color: "#bbb",
                    }}
                >
                    <p style={{ fontSize: "48px", margin: "0 0 10px 0" }}>
                        {totalCount === 0 ? "📝" : "🔍"}
                    </p>
                    <p style={{ fontSize: "16px", margin: "0" }}>
                        {totalCount === 0
                            ? "Chưa có công việc nào. Hãy thêm ở trên!"
                            : "Không có công việc phù hợp"}
                    </p>
                </div>
            ) : (
                filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={editTodo}
                    />
                ))
            )}

            {/* Footer (Tier 2) */}
            {totalCount > 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                        padding: "12px 16px",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#666",
                    }}
                >
                    <span>
                        <strong>{activeCount}</strong> việc chưa hoàn thành
                    </span>
                    <span>
                        <strong>{completedCount}/{totalCount}</strong> đã xong
                    </span>
                </div>
            )}
        </div>
    );
}

export default App;
