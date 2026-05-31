import { useState } from "react";

function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    // Thử thách: Đếm ký tự
    const MAX_CHARS = 100;

    // Thử thách: Kiểm tra email hợp lệ
    const isEmailValid = email.includes("@") && email.includes(".");

    return (
        <div style={{ padding: "20px" }}>
            <h2>Nhập thông tin</h2>

            <div style={{ marginBottom: "10px" }}>
                <label>Tên: </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên..."
                    maxLength={MAX_CHARS}
                />
                {/* Thử thách: Đếm ký tự */}
                <span style={{ marginLeft: "10px", color: name.length >= MAX_CHARS ? "red" : "gray" }}>
                    {name.length}/{MAX_CHARS}
                </span>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Email: </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                />
                {/* Thử thách: Hiển thị email hợp lệ */}
                {email && (
                    <span style={{ marginLeft: "10px", color: isEmailValid ? "green" : "red" }}>
                        {isEmailValid ? "✓ Email hợp lệ" : "✗ Email phải có @ và ."}
                    </span>
                )}
            </div>

            {/* Thử thách: Ô nhập mật khẩu với nút ẩn/hiện */}
            <div style={{ marginBottom: "10px" }}>
                <label>Mật khẩu: </label>
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ marginLeft: "5px" }}
                >
                    {showPassword ? "🙈 Ẩn" : "👁 Hiện"}
                </button>
            </div>

            <h3>Thông tin đã nhập:</h3>
            <p>Tên: {name || "(chưa nhập)"}</p>
            <p>Email: {email || "(chưa nhập)"}</p>
            <p>Mật khẩu: {password ? "••••••••" : "(chưa nhập)"}</p>

            {/* Preview realtime */}
            {name && (
                <p style={{ background: "#f0f0f0", padding: "10px" }}>
                    Xin chào <strong>{name}</strong>! Email của bạn là {email || "(chưa nhập)"}
                </p>
            )}
        </div>
    );
}

export default StringState;
