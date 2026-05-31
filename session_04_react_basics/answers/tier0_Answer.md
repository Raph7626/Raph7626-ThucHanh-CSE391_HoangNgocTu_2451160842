Câu 0.1:
    1.Sự khác nhau giữa js và javascript thuần:
    +.js  -> JavaScript thuần, không hiểu được cú pháp HTML bên trong
    +.jsx -> JavaScript + được phép viết HTML trực tiếp (gọi là JSX)

    2.lí do phải export default App:
    + App là component chính của file nên cần được xuất ra để file khác sử dụng.
    +Thông thường main.jsx sẽ import component này rồi render nó lên trang web.

    3. Xóa export default thì chuyện gì sẽ xảy ra:
    Xóa dòng "export default App" ->
    main.jsx tìm import App -> KHÔNG TÌM THẤY
    -> Console báo lỗi:
    "The requested module './App.jsx' does not provide
    an export named 'default'"
    -> Trang trắng, app sập

Câu 0.2:
    ┌──────────────────┬─────────────────────┬──────────────────────┐
    │     HTML gốc     │      JSX sửa lại    │      Lý do           │
    ├──────────────────┼─────────────────────┼──────────────────────┤
    │ class="card"     │ className="card"    │ class là từ khóa JS  │
    │ for="email"      │ htmlFor="email"     │ for là từ khóa JS    │
    │ <img src="...">  │ <img src="..." />   │ Mọi thẻ phải đóng    │
    │ <br>             │ <br />              │   lại (self-close)   │
    │ <input>          │ <input />           │                      │
    └──────────────────┴─────────────────────┴──────────────────────┘

