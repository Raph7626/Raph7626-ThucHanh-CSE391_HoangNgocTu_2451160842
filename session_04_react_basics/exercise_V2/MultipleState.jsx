import { useState } from "react";

function MultipleStates() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit() {
        // Thử thách: Validate tuổi phải > 0 và < 100
        if (name.trim() === "" || email.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const ageNum = Number(age);
        if (ageNum <= 0 || ageNum >= 100) {
            alert("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }

        setSubmitted(true);
    }

    function handleReset() {
        setName("");
        setEmail("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Form đăng ký</h2>

            {!submitted ? (
                <div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tên: </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên..."
                        />
                    </div>

                    {/* Thử thách: Thêm trường Email */}
                    <div style={{ marginBottom: "10px" }}>
                        <label>Email: </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email..."
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Tuổi: </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Nhập tuổi..."
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isStudent}
                                onChange={(e) => setIsStudent(e.target.checked)}
                            />
                            Là sinh viên
                        </label>
                    </div>

                    {/* Thử thách: Hiển thị "Xin chào [tên]!" khi nhập xong */}
                    {name.trim() && (
                        <p style={{ color: "blue", fontStyle: "italic" }}>
                            Xin chào {name}!
                        </p>
                    )}

                    <button onClick={handleSubmit}>Đăng ký</button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p>Tên: {name}</p>
                    <p>Email: {email}</p>
                    <p>Tuổi: {age}</p>
                    <p>Sinh viên: {isStudent ? "Có" : "Không"}</p>
                    <button onClick={handleReset}>Đăng ký lại</button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;
