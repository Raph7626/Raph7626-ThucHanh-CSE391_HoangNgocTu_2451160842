import { useState } from "react";

function GoodCounter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>✅ Bộ đếm đúng (dùng useState)</h2>
            <p>Số lần nhấn: {count}</p>
            <button onClick={handleClick}>Nhấn thử đi</button>
            <p style={{ color: "green" }}>
                Nhấn xong là số trên màn hình thay đổi ngay!
            </p>
        </div>
    );
}

export default GoodCounter;
