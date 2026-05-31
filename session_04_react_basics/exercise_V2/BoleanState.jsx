import { useState } from "react";

function BooleanState() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Thử thách: Hiện/ẩn mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // Thử thách: Accordion
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    // Thử thách: Bật/tắt bóng đèn
    const [isLightOn, setIsLightOn] = useState(false);

    const themeStyle = {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#333",
        padding: "20px",
        minHeight: "400px",
    };

    return (
        <div style={themeStyle}>
            <h2>Toggle Demo</h2>

            {/* Toggle ẩn/hiện */}
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Ẩn nội dung" : "Hiện nội dung"}
            </button>

            {isVisible && (
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd" }}>
                    <p>Đây là nội dung có thể ẩn/hiện!</p>
                </div>
            )}

            <hr />

            {/* Toggle dark mode */}
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <hr />

            {/* Toggle like */}
            <button onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>

            <hr />

            {/* Thử thách 1: Hiện/ẩn mật khẩu */}
            <h3>Thử thách: Ẩn/Hiện mật khẩu</h3>
            <input
                type={showPassword ? "text" : "password"}
                defaultValue="matkhau123"
                style={{ marginRight: "8px" }}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈 Ẩn" : "👁 Hiện"}
            </button>

            <hr />

            {/* Thử thách 2: Accordion */}
            <h3>Thử thách: Accordion</h3>
            <div style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                <div
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{
                        padding: "10px",
                        cursor: "pointer",
                        background: isDarkMode ? "#555" : "#f5f5f5",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <strong>Bấm để mở/đóng</strong>
                    <span>{isAccordionOpen ? "▲" : "▼"}</span>
                </div>
                {isAccordionOpen && (
                    <div style={{ padding: "10px" }}>
                        <p>Nội dung bên trong accordion. Bấm tiêu đề phía trên để đóng lại.</p>
                    </div>
                )}
            </div>

            <hr />

            {/* Thử thách 3: Bật/Tắt bóng đèn */}
            <h3>Thử thách: Bóng đèn</h3>
            <div style={{
                textAlign: "center",
                padding: "20px",
                background: isLightOn ? "#fffde7" : "#1a1a1a",
                borderRadius: "8px",
            }}>
                <p style={{ fontSize: "60px", margin: "0" }}>
                    {isLightOn ? "💡" : "🔌"}
                </p>
                <button
                    onClick={() => setIsLightOn(!isLightOn)}
                    style={{
                        marginTop: "10px",
                        padding: "8px 20px",
                        background: isLightOn ? "#ffc107" : "#555",
                        color: isLightOn ? "#333" : "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {isLightOn ? "Tắt đèn" : "Bật đèn"}
                </button>
            </div>
        </div>
    );
}

export default BooleanState;
