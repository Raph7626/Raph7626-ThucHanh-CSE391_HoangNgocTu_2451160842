function BadCounter() {
    let count = 0;

    function handleClick() {
        count = count + 1;
        console.log("Giá trị thực:", count);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>❌ Bộ đếm lỗi (biến thường)</h2>
            <p>Số lần nhấn: {count}</p>
            <button onClick={handleClick}>Nhấn thử đi</button>
            <p style={{ color: "red" }}>
                Mở Console xem số tăng thật, nhưng giao diện đứng yên!!
            </p>
        </div>
    );
}

export default BadCounter;
