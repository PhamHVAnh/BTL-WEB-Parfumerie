document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formData').addEventListener('submit', function (event) {
        event.preventDefault();
        add();
    });
});

function addData() {
    document.getElementById('formaddData').style.display = 'block';
    document.getElementById('formaddData').scrollIntoView({ behavior: 'smooth' });
}

function closeForm() {
    document.getElementById('formaddData').style.display = 'none';
}

function validateForm(STT, Ten, DanhMuc, DungTinh, SoLuong, Gia, IMG) {
    const sttRegex = /^[0-9]+$/;
    const tenRegex = /^[a-zA-ZÀ-ỹ\s0-9]+$/;
    const dungTinhRegex = /^[0-9]+$/;
    const soLuongRegex = /^[0-9]+$/;
    const giaRegex = /^[0-9.đ]+$/;



    if (!STT || !Ten || !DanhMuc || !DungTinh || !SoLuong || !Gia || !IMG) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return false;
    }

    if (!sttRegex.test(STT)) {
        alert('STT phải là số.');
        return false;
    }

    if (!tenRegex.test(Ten)) {
        alert('Tên không được chứa ký tự đặc biệt.');
        return false;
    }

    if (!dungTinhRegex.test(DungTinh)) {
        alert('Dung Tích phải là số.');
        return false;
    }

    if (!soLuongRegex.test(SoLuong)) {
        alert('Số Lượng phải là số.');
        return false;
    }

    if (!giaRegex.test(Gia)) {
        alert('Giá phải là số.');
        return false;
    }

    return true;
}

function add() {
    const STT = document.getElementById('STT').value;
    const Ten = document.getElementById('Ten').value;
    const DanhMuc = document.getElementById('DanhMuc').value;
    const DungTinh = document.getElementById('DungTinh').value;
    const SoLuong = document.getElementById('SoLuong').value;
    const Gia = document.getElementById('Gia').value;
    const IMG = document.getElementById('IMG').files[0];

    if (!validateForm(STT, Ten, DanhMuc, DungTinh, SoLuong, Gia, IMG)) {
        return;
    }

    const table = document.getElementById('table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = STT;
    newRow.insertCell(1).textContent = Ten;
    newRow.insertCell(2).textContent = DanhMuc;
    newRow.insertCell(3).textContent = DungTinh;
    newRow.insertCell(4).textContent = SoLuong;
    newRow.insertCell(5).textContent = Gia;

    const IMGCell = newRow.insertCell(6);
    const img = document.createElement('img');
    img.src = URL.createObjectURL(IMG);
    img.width = 150;
    IMGCell.appendChild(img);

    newRow.insertCell(7).innerHTML = '<button type="button" onclick="editData(this)"><i class="fa-duotone fa-pen-to-square"></i></button>';
    newRow.insertCell(8).innerHTML = '<button type="button" onclick="deleteData(this)"><i class="fa-solid fa-trash-can-xmark"></i></button>';

    document.getElementById('formData').reset();
    closeForm();
}

function deleteData(button) {
    const row = button.closest('tr');
    row.remove();
}

function editData(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}">`;
    cells[2].innerHTML = `<select>
                                <option value="Nước hoa nam" ${cells[2].innerText === 'Nước hoa nam' ? 'selected' : ''}>Nước hoa nam</option>
                                <option value="Nước hoa nữ" ${cells[2].innerText === 'Nước hoa nữ' ? 'selected' : ''}>Nước hoa nữ</option>
                                <option value="Nước hoa unisex" ${cells[2].innerText === 'Nước hoa unisex' ? 'selected' : ''}>Nước hoa unisex</option>
                            </select>`;
    cells[3].innerHTML = `<input type="text" value="${cells[3].innerText}">`;
    cells[4].innerHTML = `<input type="text" value="${cells[4].innerText}">`;
    cells[5].innerHTML = `<input type="text" value="${cells[5].innerText}">`;
    cells[7].innerHTML = `<button type="button" onclick="saveEdit(this)"><i class="fa-regular fa-circle-check"></i></button>`;
}

function saveEdit(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const newName = cells[1].querySelector('input').value;
    const newCategory = cells[2].querySelector('select').value;
    const newDungTinh = cells[3].querySelector('input').value;
    const newSoLuong = cells[4].querySelector('input').value;
    const newPrice = cells[5].querySelector('input').value;

    if (!validateForm(cells[0].innerText, newName, newCategory, newDungTinh, newSoLuong, newPrice, true)) {
        return;
    }

    cells[1].innerText = newName;
    cells[2].innerText = newCategory;
    cells[3].innerText = newDungTinh;
    cells[4].innerText = newSoLuong;
    cells[5].innerText = newPrice;

    cells[7].innerHTML = '<button type="button" onclick="editData(this)"><i class="fa-duotone fa-pen-to-square"></i></button>';
}

function Search(event) {
    // Lấy nội dung nhập vào từ ô tìm kiếm và loại bỏ các khoảng trắng ở đầu và cuối chuỗi
    const searchText = event.target.value.trim(); 
    // Tạo biểu thức chính quy từ nội dung tìm kiếm với cờ 'i' để không phân biệt chữ hoa chữ thường
    const regex = new RegExp(searchText, 'i'); 
    // Lấy danh sách các hàng trong tbody của bảng có id là 'table'
    const rows = document.querySelectorAll('#table tbody tr');

    // Duyệt qua từng hàng của bảng
    rows.forEach(row => {
        // Lấy danh sách các ô dữ liệu (td) trong từng hàng
        const cells = row.querySelectorAll('td');
        let found = false;

        cells.forEach(cell => {
            // Lấy nội dung của ô dữ liệu và loại bỏ các khoảng trắng ở đầu và cuối chuỗi
            const text = cell.textContent.trim();
            // Kiểm tra xem nội dung của ô dữ liệu có khớp với biểu thức chính quy không
            if (regex.test(text)) {
                found = true;
            }
        });

        if (found) {
            row.style.display = ''; // Hiển thị hàng
        } else {
            row.style.display = 'none'; // Ẩn hàng đi
        }
    });
}

