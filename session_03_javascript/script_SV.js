// ── LẤY CÁC PHẦN TỬ DOM ──
var btnMoForm   = document.getElementById('btn-mo-form');
var btnLuu      = document.getElementById('btn-luu');
var tbody       = document.getElementById('tbody');
var thongBao    = document.getElementById('thong-bao');
var modalTieuDe = document.getElementById('modal-tieu-de');

var inputId     = document.getElementById('f-id');
var inputName   = document.getElementById('f-name');
var inputDob    = document.getElementById('f-dob');
var inputClass  = document.getElementById('f-class');
var inputGpa    = document.getElementById('f-gpa');
var inputEmail  = document.getElementById('f-email');
var editIndex   = document.getElementById('f-edit-index');

var errId    = document.getElementById('err-id');
var errName  = document.getElementById('err-name');
var errDob   = document.getElementById('err-dob');
var errClass = document.getElementById('err-class');
var errGpa   = document.getElementById('err-gpa');
var errEmail = document.getElementById('err-email');

// ── DỮ LIỆU ──
var STORAGE_KEY = 'danh_sach_sinh_vien';
var students = [];
var bsModal = new bootstrap.Modal(document.getElementById('modal-form'));

// ── LOAD / SAVE localStorage ──
function loadStudents() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    students = JSON.parse(raw);
  } else {
    students = [
      { id: 'SV001', name: 'Nguyễn Thị Lan Anh', dob: '2003-05-12', cls: 'CNTT-K47A', gpa: 8.5, email: 'lananh@email.com' },
      { id: 'SV002', name: 'Trần Minh Khoa',     dob: '2002-11-30', cls: 'CNTT-K47A', gpa: 7.2, email: 'minhkhoa@email.com' },
      { id: 'SV003', name: 'Phạm Quốc Bảo',      dob: '2003-03-20', cls: 'CNTT-K47B', gpa: 8.6, email: 'baopq@email.com' },
      { id: 'SV004', name: 'Lê Thị Hồng',        dob: '2003-07-15', cls: 'CNTT-K47B', gpa: 6.8, email: 'hongle@email.com' },
      { id: 'SV005', name: 'Đặng Văn Tuấn',      dob: '2002-09-01', cls: 'CNTT-K47A', gpa: 9.0, email: 'tuandv@email.com' },
    ];
    saveStudents();
  }
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// ── HIỂN THỊ BẢNG ──
function renderStudents() {
  if (students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">Chưa có sinh viên nào.</td></tr>';
    return;
  }

  var html = '';
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    var ngaySinh = s.dob ? new Date(s.dob).toLocaleDateString('vi-VN') : '—';
    var hangClass = s.gpa >= 8 ? 'gpa-cao' : (s.gpa < 5 ? 'gpa-thap' : '');

    html += '<tr class="' + hangClass + '">';
    html += '<td>' + s.id + '</td>';
    html += '<td>' + s.name + '</td>';
    html += '<td>' + ngaySinh + '</td>';
    html += '<td>' + s.cls + '</td>';
    html += '<td>' + parseFloat(s.gpa).toFixed(1) + '</td>';
    html += '<td>' + (s.email || '—') + '</td>';
    html += '<td>';
    html += '<button class="btn btn-warning btn-sm me-1" onclick="moFormSua(' + i + ')">Sửa</button>';
    html += '<button class="btn btn-danger btn-sm" onclick="xoaSinhVien(' + i + ')">Xóa</button>';
    html += '</td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

// ── THỐNG KÊ ──
function updateStatistics() {
  var total = students.length;
  var avg = '—';
  if (total > 0) {
    var tong = 0;
    for (var i = 0; i < students.length; i++) {
      tong += parseFloat(students[i].gpa);
    }
    avg = (tong / total).toFixed(2);
  }
  document.getElementById('total-score').textContent = total;
  document.getElementById('average-score').textContent = avg;
}

// ── THÔNG BÁO ──
function showThongBao(msg, type) {
  if (!type) type = 'success';
  thongBao.className = 'alert alert-' + type;
  thongBao.textContent = msg;
  setTimeout(function () {
    thongBao.classList.add('d-none');
  }, 3000);
}

// ── RESET FORM ──
function resetForm() {
  inputId.value    = '';
  inputName.value  = '';
  inputDob.value   = '';
  inputClass.value = '';
  inputGpa.value   = '';
  inputEmail.value = '';
  editIndex.value  = '-1';
  inputId.removeAttribute('readonly');
  modalTieuDe.textContent   = 'Thêm Sinh Viên';
  btnLuu.textContent        = 'Lưu';
  errId.textContent    = '';
  errName.textContent  = '';
  errDob.textContent   = '';
  errClass.textContent = '';
  errGpa.textContent   = '';
  errEmail.textContent = '';
}

// ── VALIDATION ──
function validate() {
  var hopLe = true;
  errId.textContent = errName.textContent = errDob.textContent = '';
  errClass.textContent = errGpa.textContent = errEmail.textContent = '';

  var id    = inputId.value.trim();
  var name  = inputName.value.trim();
  var dob   = inputDob.value;
  var cls   = inputClass.value.trim();
  var gpa   = inputGpa.value;
  var email = inputEmail.value.trim();
  var isEdit = parseInt(editIndex.value) !== -1;

  // Mã SV
  if (id === '') {
    errId.textContent = 'Vui lòng nhập mã sinh viên.';
    hopLe = false;
  } else if (!isEdit) {
    for (var i = 0; i < students.length; i++) {
      if (students[i].id.toLowerCase() === id.toLowerCase()) {
        errId.textContent = 'Mã sinh viên đã tồn tại.';
        hopLe = false;
        break;
      }
    }
  }

  // Họ tên
  if (name === '') {
    errName.textContent = 'Vui lòng nhập họ và tên.';
    hopLe = false;
  }

  // Ngày sinh
  if (dob !== '') {
    var ngaySinh = new Date(dob);
    var homNay = new Date();
    if (ngaySinh >= homNay) {
      errDob.textContent = 'Ngày sinh phải nhỏ hơn ngày hiện tại.';
      hopLe = false;
    }
  }

  // Lớp
  if (cls === '') {
    errClass.textContent = 'Vui lòng nhập lớp học.';
    hopLe = false;
  }

  // Điểm
  if (gpa === '') {
    errGpa.textContent = 'Vui lòng nhập điểm trung bình.';
    hopLe = false;
  } else if (parseFloat(gpa) < 0 || parseFloat(gpa) > 10) {
    errGpa.textContent = 'Điểm phải từ 0 đến 10.';
    hopLe = false;
  }

  // Email
  if (email !== '') {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errEmail.textContent = 'Email không đúng định dạng.';
      hopLe = false;
    }
  }

  return hopLe;
}

// ── MỞ FORM SỬA ──
function moFormSua(idx) {
  var s = students[idx];
  resetForm();
  inputId.value    = s.id;
  inputName.value  = s.name;
  inputDob.value   = s.dob || '';
  inputClass.value = s.cls;
  inputGpa.value   = s.gpa;
  inputEmail.value = s.email || '';
  editIndex.value  = idx;
  inputId.setAttribute('readonly', true);
  modalTieuDe.textContent = 'Cập Nhật Sinh Viên';
  btnLuu.textContent      = 'Cập Nhật';
  bsModal.show();
}

// ── XÓA SINH VIÊN ──
function xoaSinhVien(idx) {
  var ten = students[idx].name;
  if (!confirm('Bạn có chắc muốn xóa sinh viên "' + ten + '"?')) return;
  students.splice(idx, 1);
  saveStudents();
  renderStudents();
  updateStatistics();
  showThongBao('Đã xóa sinh viên "' + ten + '".', 'info');
}

// ── SỰ KIỆN: Nút mở form thêm ──
btnMoForm.addEventListener('click', function () {
  resetForm();
  bsModal.show();
});

// ── SỰ KIỆN: Nút Lưu ──
btnLuu.addEventListener('click', function () {
  if (!validate()) return;

  var idx = parseInt(editIndex.value);
  var data = {
    id:    inputId.value.trim(),
    name:  inputName.value.trim(),
    dob:   inputDob.value,
    cls:   inputClass.value.trim(),
    gpa:   parseFloat(inputGpa.value),
    email: inputEmail.value.trim(),
  };

  if (idx === -1) {
    students.push(data);
    showThongBao('Đã thêm sinh viên "' + data.name + '"!');
  } else {
    students[idx] = data;
    showThongBao('Đã cập nhật thông tin "' + data.name + '"!');
  }

  saveStudents();
  renderStudents();
  updateStatistics();
  bsModal.hide();
});

// ── KHỞI TẠO ──
loadStudents();
renderStudents();
updateStatistics();
