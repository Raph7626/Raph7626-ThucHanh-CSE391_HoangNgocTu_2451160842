Câu 1.1:
    +Lí do component chỉ render 1 lần:
    - Không có state thay đổi
    - Không có props thay đổi
    - Không có gì ép React gọi lại function

    -> Function chạy 1 lần duy nhất rồi dừng.

    +Được render lại khi:
    +có "tín hiệu" báo rằng dữ liệu đã thay đổi:
    + Gọi setState (Bài 1.2 sẽ nói)
    + Props từ component cha thay đổi
    + Component cha re-render (truyền props mới)

Câu 1.2:
                        Bản gốc                 Bản mới
                    ─────────               ─────────
Tiêu đề             Counter "tệ"            Bộ đếm lỗi
                    Counter "tốt"           Bộ đếm đúng

Hiển thị            Bộ đếm:                 Số lần nhấn:

Nút bấm             Tăng (+1)               Nhấn thử đi

Log console         Count:                  Giá trị thực:

Thông báo           Tại đây console...      Mở Console xem số...
                    Nhấn nút → Số trên...   Nhấn xong là số trên...
