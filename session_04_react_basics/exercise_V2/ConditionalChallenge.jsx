function Challenge() {
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thử thách Conditional Rendering</h2>

            {/* 1. Icon trạng thái online/offline */}
            <p>
                Trạng thái: {isOnline ? "🟢 Đang trực tuyến" : "🔴 Ngoại tuyến"}
            </p>

            {/* 2. Hiện/ẩn menu dựa vào isLoggedIn */}
            {isLoggedIn && (
                <nav style={{ background: "#e8f5e9", padding: "10px", marginBottom: "10px" }}>
                    <a href="#home" style={{ marginRight: "15px" }}>Trang chủ</a>
                    <a href="#profile" style={{ marginRight: "15px" }}>Hồ sơ</a>
                    <a href="#settings">Cài đặt</a>
                </nav>
            )}
            {!isLoggedIn && (
                <p style={{ color: "gray" }}>Vui lòng đăng nhập để xem menu</p>
            )}

            {/* 3. Hiển thị "Hết hàng" khi stock = 0 */}
            <p>
                {stock === 0 ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>Hết hàng</span>
                ) : (
                    <span style={{ color: "green" }}>Còn {stock} sản phẩm</span>
                )}
            </p>
        </div>
    );
}

export default Challenge;
