import { useState } from "react";

function ClickEvents() {
    const [message, setMessage] = useState("Chưa click");
    const [clickCount, setClickCount] = useState(0);

    // Thử thách: Đếm riêng từng nút
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const [countC, setCountC] = useState(0);

    // Thử thách: Đổi màu ngẫu nhiên
    const [bgColor, setBgColor] = useState("#ffffff");

    // Thử thách: Like toggle
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42);

    function handleClick() {
        setMessage("Đã click lúc " + new Date().toLocaleTimeString());
        setClickCount(clickCount + 1);
    }

    function handleReset() {
        setMessage("Đã reset!");
        setClickCount(0);
    }

    // Thử thách: Hàm đổi màu ngẫu nhiên
    function handleRandomColor() {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        setBgColor(randomColor);
    }

    // Thử thách: Toggle like
    function handleLike() {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Click Events</h2>
            <p>{message}</p>
            <p>Số lần click: {clickCount}</p>

            <button onClick={handleClick}>Click me!</button>
            <button onClick={handleReset}>Reset</button>

            <hr />

            {/* Thử thách: Đổi màu ngẫu nhiên */}
            <h3>Đổi màu ngẫu nhiên</h3>
            <div style={{
                width: "200px",
                height: "100px",
                backgroundColor: bgColor,
                border: "2px solid #333",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
                transition: "background-color 0.3s ease",
            }}>
                {bgColor}
            </div>
            <button onClick={handleRandomColor}>Đổi màu ngẫu nhiên</button>

            <hr />

            {/* Thử thách: Đếm riêng từng nút */}
            <h3>Đếm riêng từng nút</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button onClick={() => setCountA(countA + 1)}>
                    Nút A ({countA})
                </button>
                <button onClick={() => setCountB(countB + 1)}>
                    Nút B ({countB})
                </button>
                <button onClick={() => setCountC(countC + 1)}>
                    Nút C ({countC})
                </button>
            </div>
            <p>Tổng: {countA + countB + countC} lần click</p>

            <hr />

            {/* Thử thách: Like toggle */}
            <h3>Like toggle</h3>
            <button onClick={handleLike} style={{
                fontSize: "20px",
                background: "none",
                border: "1px solid #ddd",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
            }}>
                {isLiked ? "❤️" : "🤍"} {likeCount}
            </button>
        </div>
    );
}

export default ClickEvents;
