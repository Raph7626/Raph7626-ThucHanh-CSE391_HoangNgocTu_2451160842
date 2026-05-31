import { useState } from "react";

function ListBasics() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);

    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 },
    ]);

    // Thử thách: Tính tuổi trung bình
    const averageAge = students.reduce((sum, s) => sum + s.age, 0) / students.length;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách trái cây</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>

            <h2>Danh sách sinh viên</h2>

            {/* Thử thách: Tuổi trung bình */}
            <p style={{ color: "#666", fontStyle: "italic" }}>
                Tuổi trung bình: <strong>{averageAge.toFixed(1)}</strong> tuổi
            </p>

            {students.map((student, index) => (
                <div
                    key={student.id}
                    style={{
                        padding: "10px",
                        margin: "5px 0",
                        // Thử thách: Tuổi >= 20 màu xanh
                        background: student.age >= 20 ? "#e8f5e9" : "#fff3e0",
                        borderLeft: student.age >= 20 ? "4px solid #4caf50" : "4px solid #ff9800",
                        borderRadius: "4px",
                    }}
                >
                    {/* Thử thách: Hiển thị STT */}
                    <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                        #{index + 1}
                    </span>
                    {student.name} - {student.age} tuổi
                    {student.age >= 20 && (
                        <span style={{ marginLeft: "10px", color: "#4caf50", fontSize: "12px" }}>
                            ● Đủ tuổi
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ListBasics;
