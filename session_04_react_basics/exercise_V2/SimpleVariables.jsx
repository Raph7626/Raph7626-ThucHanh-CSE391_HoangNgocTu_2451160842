function SimpleVariables() {
    const ten = "Hoàng Ngọc Tú";
    const tuoi = 20;
    const queQuan = "Hải Dương";

    const gioHienTai = new Date().getHours();
    let loiChao = "";
    if (gioHienTai < 12) {
        loiChao = "Chào buổi sáng";
    } else if (gioHienTai < 18) {
        loiChao = "Chào buổi chiều";
    } else {
        loiChao = "Chào buổi tối";
    }


    const chieuCao = 1.72; 
    const bmi = canNang / (chieuCao * chieuCao);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
            <h1 style={{ color: "#2c3e50" }}>{loiChao}, {ten}!</h1>
            
            <hr />
            <h2>Thông tin cá nhân</h2>
            <p><strong>Tuổi:</strong> {tuoi}</p>
            <p><strong>Quê quán:</strong> {queQuan}</p>
            <hr />

            <h2>Chỉ số sức khỏe (BMI)</h2>
            <p><strong>Cân nặng:</strong> {canNang} kg</p>
            <p><strong>Chiều cao:</strong> {chieuCao} m</p>
            <p>
                <strong>Chỉ số BMI:</strong> {bmi.toFixed(2)} — Ngưỡng: {
                    bmi < 18.5 ? "Gầy" : bmi < 24.9 ? "Bình thường" : "Thừa cân"
                }
            </p>
        </div>
    );
}

export default SimpleVariables;