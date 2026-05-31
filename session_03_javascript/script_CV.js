// ── LẤY CÁC PHẦN TỬ DOM ──
var btnMoForm   = document.getElementById('btn-mo-form');
var btnLuu      = document.getElementById('btn-luu');
var danhSach    = document.getElementById('danh-sach');
var thongBao    = document.getElementById('thong-bao');
var modalTieuDe = document.getElementById('modal-tieu-de');

var inputTitle    = document.getElementById('f-title');
var inputDesc     = document.getElementById('f-desc');
var inputDeadline = document.getElementById('f-deadline');
var inputPriority = document.getElementById('f-priority');
var editIndex     = document.getElementById('f-edit-index');

var errTitle    = document.getElementById('err-title');
var errDeadline = document.getElementById('err-deadline');

// ── DỮ LIỆU ──
var STORAGE_KEY = 'danh_sach_cong_viec';
var tasks = [];
var bsModal = new bootstrap.Modal(document.getElementById('modal-form'));

// ── LOAD / SAVE localStorage ──
function loadTasks() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    tasks = JSON.parse(raw);
  } else {
    tasks = [
      { title: 'Ôn tập Toán rời rạc', desc: 'Chương 3 và 4',        deadline: '2025-06-10', priority: 'cao',   done: false },
      { title: 'Nộp bài tập lớn',     desc: 'Môn CNPM',             deadline: '2025-06-15', priority: 'trung', done: false },
      { title: 'Đọc sách lập trình',  desc: 'Clean Code',           deadline: '',           priority: 'thap',  done: true  },
      { title: 'Làm bài tập DOM',     desc: 'Bài thực hành tuần 5', deadline: '2025-06-20', priority: 'cao',   done: false },
      { title: 'Họp nhóm đồ án',      desc: 'Phân công công việc',  deadline: '2025-06-18', priority: 'trung', done: false },
    ];
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ── HIỂN THỊ DANH SÁCH ──
function renderTasks() {
  if (tasks.length === 0) {
    danhSach.innerHTML = '<p class="text-muted">Chưa có công việc nào.</p>';
    return;
  }

  var html = '';
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var tenUuTien = t.priority === 'cao' ? 'Cao' : t.priority === 'trung' ? 'Trung bình' : 'Thấp';
    var ngayHan   = t.deadline ? '📅 ' + new Date(t.deadline).toLocaleDateString('vi-VN') + ' &nbsp;' : '';
    var moTa      = t.desc ? '<p class="card-text text-muted small mb-1">' + t.desc + '</p>' : '';
    var nutXong   = t.done
      ? '<button class="btn btn-secondary btn-sm" onclick="doiTrangThai(' + i + ')">↩ Chưa xong</button>'
      : '<button class="btn btn-success btn-sm" onclick="doiTrangThai(' + i + ')">✓ Xong</button>';

    html += '<div class="card mb-2 priority-' + t.priority + (t.done ? ' task-done' : '') + '">';
    html += '<div class="card-body d-flex justify-content-between align-items-start">';
    html += '<div>';
    html += '<h6 class="card-title task-title mb-1">' + t.title + '</h6>';
    html += moTa;
    html += '<small class="text-muted">' + ngayHan + '🏷️ Ưu tiên: ' + tenUuTien + '</small>';
    html += '</div>';
    html += '<div class="d-flex gap-2 flex-shrink-0 ms-3">';
    html += nutXong;
    html += '<button class="btn btn-warning btn-sm" onclick="moFormSua(' + i + ')">Sửa</button>';
    html += '<button class="btn btn-danger btn-sm" onclick="xoaCongViec(' + i + ')">Xóa</button>';
    html += '</div>';
    html += '</div></div>';
  }
  danhSach.innerHTML = html;
}

// ── THỐNG KÊ ──
function updateTaskSummary() {
  var tong = tasks.length;
  var xong = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done) xong++;
  }
  document.getElementById('stat-tong').textContent = tong;
  document.getElementById('stat-xong').textContent = xong;
  document.getElementById('stat-chua').textContent = tong - xong;
}

// ── THÔNG BÁO ──
function showMessage(msg, type) {
  if (!type) type = 'success';
  thongBao.className = 'alert alert-' + type;
  thongBao.textContent = msg;
  setTimeout(function () {
    thongBao.classList.add('d-none');
  }, 3000);
}

// ── RESET FORM ──
function resetForm() {
  inputTitle.value    = '';
  inputDesc.value     = '';
  inputDeadline.value = '';
  inputPriority.value = 'trung';
  editIndex.value     = '-1';
  modalTieuDe.textContent = 'Thêm Công Việc';
  btnLuu.textContent      = 'Lưu';
  errTitle.textContent    = '';
  errDeadline.textContent = '';
}

// ── VALIDATION ──
function validate() {
  var hopLe = true;
  errTitle.textContent    = '';
  errDeadline.textContent = '';

  if (inputTitle.value.trim() === '') {
    errTitle.textContent = 'Vui lòng nhập tiêu đề công việc.';
    hopLe = false;
  }

  if (inputDeadline.value !== '') {
    var homNay = new Date();
    homNay.setHours(0, 0, 0, 0);
    var ngayChon = new Date(inputDeadline.value);
    if (ngayChon < homNay) {
      errDeadline.textContent = 'Hạn hoàn thành không được là ngày trong quá khứ.';
      hopLe = false;
    }
  }

  return hopLe;
}

// ── MỞ FORM SỬA ──
function moFormSua(idx) {
  var t = tasks[idx];
  resetForm();
  inputTitle.value    = t.title;
  inputDesc.value     = t.desc;
  inputDeadline.value = t.deadline;
  inputPriority.value = t.priority;
  editIndex.value     = idx;
  modalTieuDe.textContent = 'Cập Nhật Công Việc';
  btnLuu.textContent      = 'Cập Nhật';
  bsModal.show();
}

// ── ĐỔI TRẠNG THÁI ──
function doiTrangThai(idx) {
  tasks[idx].done = !tasks[idx].done;
  saveTasks();
  renderTasks();
  updateTaskSummary();
  var msg = tasks[idx].done ? 'Đã đánh dấu hoàn thành!' : 'Đã đánh dấu chưa xong.';
  showMessage(msg, 'info');
}

// ── XÓA CÔNG VIỆC ──
function xoaCongViec(idx) {
  var ten = tasks[idx].title;
  if (!confirm('Bạn có chắc muốn xóa "' + ten + '"?')) return;
  tasks.splice(idx, 1);
  saveTasks();
  renderTasks();
  updateTaskSummary();
  showMessage('Đã xóa công việc "' + ten + '".', 'warning');
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
    title:    inputTitle.value.trim(),
    desc:     inputDesc.value.trim(),
    deadline: inputDeadline.value,
    priority: inputPriority.value,
    done:     false,
  };

  if (idx === -1) {
    tasks.push(data);
    showMessage('Đã thêm công việc "' + data.title + '"!');
  } else {
    data.done = tasks[idx].done;
    tasks[idx] = data;
    showMessage('Đã cập nhật "' + data.title + '"!');
  }

  saveTasks();
  renderTasks();
  updateTaskSummary();
  bsModal.hide();
});

// ── KHỞI TẠO ──
loadTasks();
renderTasks();
updateTaskSummary();
