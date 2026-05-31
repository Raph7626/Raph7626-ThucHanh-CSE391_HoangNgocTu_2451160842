import { useState } from "react";

function InputEvents() {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);

    // Thử thách: Email validation
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    // Thử thách: Preview realtime
    const [previewName, setPreviewName] = useState("");
    const [previewBio, setPreviewBio] = useState("");

    // Thử thách: Đếm số từ
    const [paragraph, setParagraph] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setText(newValue);
        setCharCount(newValue.length);
    }

    // Thử thách: Xử lý email
    function handleEmailChange(event) {
        const value = event.target.value;
        setEmail(value);

        if (value && !value.includes("@")) {
            setEmailError("Email phải có ký tự @");
        } else if (value && !value.includes(".")) {
            setEmailError("Email phải có dấu chấm (.)");
        } else {
            setEmailError("");
        }
    }

    // Thử thách: Đếm số từ
    function getWordCount(str) {
        const trimmed = str.trim();
        if (trimmed === "") return 0;
        return trimmed.split(/\s+/).length;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Input Events</h2>

            <input
                value={text}
                onChange={handleChange}
                placeholder="Nhập gì đó..."
                maxLength={100}
                style={{ padding: "8px", width: "300px" }}
            />

            <p>Ký tự: {charCount}/100</p>
            <p>Bạn đang nhập: {text}</p>

            {charCount > 80 && (
                <p style={{ color: "red" }}>⚠️ Sắp hết ký tự!</p>
            )}

            <hr />

            {/* Thử thách: Email validation */}
            <h3>Email Validation</h3>
            <input
                value={email}
                onChange={handleEmailChange}
                placeholder="Nhập email..."
                style={{
                    padding: "8px",
                    width: "300px",
                    borderColor: emailError ? "red" : "#ccc",
                }}
            />
            {emailError && (
                <p style={{ color: "red", fontSize: "14px" }}>✗ {emailError}</p>
            )}
            {email && !emailError && (
                <p style={{ color: "green", fontSize: "14px" }}>✓ Email hợp lệ</p>
            )}

            <hr />

            {/* Thử thách: Preview realtime */}
            <h3>Preview realtime</h3>
            <div style={{ marginBottom: "10px" }}>
                <input
                    value={previewName}
                    onChange={(e) => setPreviewName(e.target.value)}
                    placeholder="Nhập tên..."
                    style={{ padding: "8px", width: "300px", marginBottom: "5px" }}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <textarea
                    value={previewBio}
                    onChange={(e) => setPreviewBio(e.target.value)}
                    placeholder="Nhập giới thiệu bản thân..."
                    rows={3}
                    style={{ padding: "8px", width: "300px" }}
                />
            </div>
            {(previewName || previewBio) && (
                <div style={{
                    background: "#f0f0f0",
                    padding: "15px",
                    borderRadius: "8px",
                    marginTop: "10px",
                }}>
                    <h4>📋 Preview:</h4>
                    {previewName && <p><strong>Tên:</strong> {previewName}</p>}
                    {previewBio && <p><strong>Giới thiệu:</strong> {previewBio}</p>}
                </div>
            )}

            <hr />

            {/* Thử thách: Đếm số từ */}
            <h3>Đếm số từ</h3>
            <textarea
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                placeholder="Nhập đoạn văn..."
                rows={4}
                style={{ padding: "8px", width: "400px" }}
            />
            <p>Số từ: <strong>{getWordCount(paragraph)}</strong> | Số ký tự: <strong>{paragraph.length}</strong></p>
        </div>
    );
}

export default InputEvents;
