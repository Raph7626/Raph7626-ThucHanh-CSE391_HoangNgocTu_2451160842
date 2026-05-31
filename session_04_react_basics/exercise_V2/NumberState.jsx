import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);

    // Thử thách: Xác định màu dựa vào count
    const getColor = () => {
        if (count > 0) return "green";
        if (count < 0) return "red";
        return "black";
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Bộ đếm: <span style={{ color: getColor() }}>{count}</span></h2>

            {/* Thử thách: Hiển thị "Số dương" hoặc "Số âm" */}
            <p style={{ color: getColor(), fontWeight: "bold" }}>
                {count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Bằng không"}
            </p>

            <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setCount(count + 1)}>
                    Tăng (+1)
                </button>

                <button onClick={() => setCount(count - 1)}>
                    Giảm (-1)
                </button>

                {/* Thử thách: Nút Tăng 5 */}
                <button onClick={() => setCount(count + 5)}>
                    Tăng 5 (+5)
                </button>

                <button onClick={() => setCount(count * 2)}>
                    Nhân đôi
                </button>

                <button onClick={() => setCount(0)}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default NumberState;
