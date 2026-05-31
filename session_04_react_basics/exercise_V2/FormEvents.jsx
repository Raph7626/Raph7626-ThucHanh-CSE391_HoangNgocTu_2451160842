import { useState } from "react";

function FormEvents() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Thử thách: Validate realtime
        validateField(name, value);
    }

    // Thử thách: Validate realtime từng trường
    function validateField(name, value) {
        const newErrors = { ...errors };

        if (name === "email") {
            if (value && !value.includes("@")) {
                newErrors.email = "Email phải có ký tự @";
            } else if (value && !value.includes(".")) {
                newErrors.email = "Email phải có dấu chấm (.)";
            } else {
                delete newErrors.email;
            }
        }

        if (name === "password") {
            if (value && value.length < 6) {
                newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            } else {
                delete newErrors.password;
            }

            // Kiểm tra lại confirm password khi password thay đổi
            if (formData.confirmPassword && value !== formData.confirmPassword) {
                newErrors.confirmPassword = "Mật khẩu không khớp";
            } else if (formData.confirmPassword) {
                delete newErrors.confirmPassword;
            }
        }

        if (name === "confirmPassword") {
            if (value && value !== formData.password) {
                newErrors.confirmPassword = "Mật khẩu không khớp";
            } else {
                delete newErrors.confirmPassword;
            }
        }

        if (name === "name") {
            if (value && value.trim().length < 2) {
                newErrors.name = "Tên phải có ít nhất 2 ký tự";
            } else {
                delete newErrors.name;
            }
        }

        setErrors(newErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Validate tất cả trước khi submit
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Vui lòng nhập tên";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Tên phải có ít nhất 2 ký tự";
        }

        if (!formData.email) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!formData.email.includes("@")) {
            newErrors.email = "Email phải có ký tự @";
        }

        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitted(true);
    }

    function handleReset() {
        setFormData({ name: "", email: "", password: "", confirmPassword: "", message: "" });
        setErrors({});
        setSubmitted(false);
    }

    // Style cho input lỗi
    const inputStyle = (fieldName) => ({
        padding: "8px",
        width: "100%",
        border: errors[fieldName] ? "2px solid red" : "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "4px",
    });

    const errorStyle = {
        color: "red",
        fontSize: "13px",
        marginTop: "4px",
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Form Events</h2>

            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
                    {/* Tên */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Tên: *</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên..."
                            style={inputStyle("name")}
                        />
                        {errors.name && <p style={errorStyle}>{errors.name}</p>}
                    </div>

                    {/* Email - Thử thách: Validate có @ */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Email: *</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email..."
                            style={inputStyle("email")}
                        />
                        {errors.email && <p style={errorStyle}>{errors.email}</p>}
                    </div>

                    {/* Mật khẩu */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Mật khẩu: *</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ít nhất 6 ký tự..."
                            style={inputStyle("password")}
                        />
                        {errors.password && <p style={errorStyle}>{errors.password}</p>}
                    </div>

                    {/* Xác nhận mật khẩu - Thử thách */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Xác nhận mật khẩu: *</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu..."
                            style={inputStyle("confirmPassword")}
                        />
                        {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
                        {formData.confirmPassword && !errors.confirmPassword && (
                            <p style={{ color: "green", fontSize: "13px", marginTop: "4px" }}>
                                ✓ Mật khẩu khớp
                            </p>
                        )}
                    </div>

                    {/* Tin nhắn */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Tin nhắn:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                            placeholder="Nhập tin nhắn (không bắt buộc)..."
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{
                            padding: "10px 24px",
                            background: "#4caf50",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}>
                            Gửi
                        </button>
                        <button type="button" onClick={handleReset} style={{
                            padding: "10px 24px",
                            background: "#999",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}>
                            Xóa
                        </button>
                    </div>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "20px", borderRadius: "8px", maxWidth: "400px" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p><strong>Tên:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Tin nhắn:</strong> {formData.message || "(Không có)"}</p>
                    <button onClick={handleReset} style={{
                        marginTop: "10px",
                        padding: "10px 24px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}>
                        Đăng ký lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormEvents;
