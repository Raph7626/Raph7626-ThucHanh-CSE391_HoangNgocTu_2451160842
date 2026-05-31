import { useState, useEffect } from "react";

function KeyboardEvents() {
    const [lastKey, setLastKey] = useState("");
    const [log, setLog] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // Thử thách: Game đoán phím
    const [targetKey, setTargetKey] = useState("");
    const [gameScore, setGameScore] = useState(0);
    const [gameMessage, setGameMessage] = useState("Bấm 'Bắt đầu' để chơi!");

    // Thử thách: Di chuyển ô vuông
    const [squarePos, setSquarePos] = useState({ x: 0, y: 0 });
    const STEP = 20;

    // Thử thách: Phím tắt Ctrl+D
    const [shortcutBg, setShortcutBg] = useState("#ffffff");

    // Danh sách phím cho game
    const gameKeys = ["A", "S", "D", "F", "J", "K", "L", "G", "H"];

    function handleKeyDown(event) {
        setLastKey(event.key);
        setLog((prev) => [...prev.slice(-4), event.key]);

        // Thử thách: Di chuyển ô vuông bằng mũi tên
        if (event.key === "ArrowUp") {
            setSquarePos((prev) => ({ ...prev, y: prev.y - STEP }));
        } else if (event.key === "ArrowDown") {
            setSquarePos((prev) => ({ ...prev, y: prev.y + STEP }));
        } else if (event.key === "ArrowLeft") {
            setSquarePos((prev) => ({ ...prev, x: prev.x - STEP }));
        } else if (event.key === "ArrowRight") {
            setSquarePos((prev) => ({ ...prev, x: prev.x + STEP }));
        }

        // Thử thách: Game đoán phím
        if (targetKey && event.key.toUpperCase() === targetKey) {
            setGameScore((prev) => prev + 1);
            setGameMessage("✅ Chính xác! Nhấn tiếp...");
            const randomKey = gameKeys[Math.floor(Math.random() * gameKeys.length)];
            setTargetKey(randomKey);
        } else if (targetKey && event.key !== "Control" && event.key !== "Shift") {
            if (targetKey) {
                setGameMessage("❌ Sai rồi! Thử lại...");
            }
        }

        // Thử thách: Ctrl+D đổi màu
        if (event.ctrlKey && event.key === "d") {
            event.preventDefault();
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
            setShortcutBg(randomColor);
        }
    }

    function handleInputKeyDown(event) {
        if (event.key === "Enter") {
            if (inputValue.trim() !== "") {
                alert("Bạn nhập: " + inputValue);
                setInputValue("");
            }
        }

        if (event.key === "Escape") {
            setInputValue("");
        }
    }

    // Bắt đầu game
    function startGame() {
        const randomKey = gameKeys[Math.floor(Math.random() * gameKeys.length)];
        setTargetKey(randomKey);
        setGameScore(0);
        setGameMessage("Nhấn phím được yêu cầu!");
    }

    return (
        <div
            style={{ padding: "20px", backgroundColor: shortcutBg, minHeight: "500px" }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <h2>Keyboard Events</h2>

            <p>Phím cuối cùng: <strong>{lastKey || "Chưa nhấn"}</strong></p>
            <p>Log: {log.join(" → ")}</p>

            <hr />

            <h3>Nhập và nhấn Enter:</h3>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Nhập rồi nhấn Enter..."
                style={{ padding: "8px", width: "300px" }}
            />
            <p style={{ fontSize: "12px", color: "#666" }}>
                Nhấn Escape để xóa | Nhấn Enter để gửi
            </p>

            <hr />

            {/* Thử thách: Game đoán phím */}
            <h3>Game đoán phím</h3>
            <p>{gameMessage}</p>
            {targetKey && (
                <p style={{ fontSize: "40px", fontWeight: "bold", color: "#e91e63" }}>
                    Nhấn phím: [{targetKey}]
                </p>
            )}
            <p>Điểm: <strong>{gameScore}</strong></p>
            <button onClick={startGame}>Bắt đầu</button>

            <hr />

            {/* Thử thách: Di chuyển ô vuông */}
            <h3>Di chuyển ô vuông (phím mũi tên ↑↓←→)</h3>
            <p style={{ fontSize: "12px", color: "#666" }}>Click vào vùng bên dưới rồi dùng phím mũi tên</p>
            <div style={{
                width: "300px",
                height: "200px",
                border: "2px dashed #999",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#2196f3",
                    borderRadius: "4px",
                    position: "absolute",
                    left: `${squarePos.x + 135}px`,
                    top: `${squarePos.y + 85}px`,
                    transition: "left 0.1s, top 0.1s",
                }} />
            </div>
            <p>Vị trí: ({squarePos.x}, {squarePos.y})</p>

            <hr />

            {/* Thử thách: Ctrl+D đổi màu */}
            <h3>Phím tắt Ctrl + D để đổi màu nền</h3>
            <p style={{ fontSize: "14px", color: "#666" }}>
                Nhấn Ctrl+D trong vùng này. Màu hiện tại: {shortcutBg}
            </p>
        </div>
    );
}

export default KeyboardEvents;
