//Tạo đối tượng danh sách sinh viên từ lớp DanhSachSinhVien
var dssv = new DanhSachSinhVien();
//Tạo đối tượng từ lớp đối tượng validation
var validation = new Validation();

function getEle(id){
    return document.getElementById(id);
}

//Lấy data từ local storage hiển thị ra màn hình
getLocalStorage();

function layDuLieuDauVao(isAdd){
    var _maSV = getEle("txtMaSV").value;
    var _tenSV = getEle("txtTenSV").value;
    var _email = getEle("txtEmail").value;
    var _password = getEle("txtPass").value;
    var _ngaySinh = getEle("txtNgaySinh").value;
    var _khoaHoc = getEle("khSV").value;
    var _math = getEle("txtDiemToan").value;
    var _physical = getEle("txtDiemLy").value;
    var _chemistry = getEle("txtDiemHoa").value;

    //Tạo biến isValid = true => cho phép thêm sinh viên vào mảng
    var isValid = true;

    // //Tạo biến isValid = true => cho phép thêm sinh viên vào mảng
    if (isAdd){
    isValid &= validation.kiemTraRong(
        _maSV, 
        "maError", 
        "(*) Vui lòng nhập mã sinh viên") 
        && validation.kiemTraDoDaiKyTu(
            _maSV, 
            "maError", 
            "(*) Mã sinh viên từ 6 - 32 ký tự", 6, 32)
            && validation.kiemTraMsvTrung(
                _maSV, "maError", "(*) Mã sinh viên đã tồn tại", dssv.list);
    }

    isValid &= validation.kiemTraRong(
        _tenSV, 
        "tenError", 
        "(*) Vui lòng nhập tên sinh viên") 
        && validation.kiemTraKyTuNhap(
            _tenSV,
            "tenError", 
            "(*) Không nhập số và ký tự đặc biệt");

    isValid &= validation.kiemTraRong(
        _email, 
        "emailError", 
        "(*) Vui lòng nhập email")
        && validation.kiemTraEmail(
            _email, 
            "emailError", 
            "(*) Email không đúng định dạng!" );

    isValid &= validation.kiemTraRong(
        _password, 
        "passError", 
        "(*) Vui lòng nhập mật khẩu") 
        && validation.kiemTraDoDaiKyTu(
            _password, 
            "passError", 
            "(*) Mật khẩu từ 6 - 32 ký tự", 6, 32)
            && validation.kiemTraPassword(
                _password, 
                "passError", 
                "(*) Mật khẩu phải bao gồm chữ in hoa, số và ký tự đặc biệt");

    isValid &= validation.kiemTraRong(
        _ngaySinh, 
        "ngaySinhError", 
        "(*) Nhập ngày tháng năm sinh")
        && validation.kiemTraNgaySinh(
            _ngaySinh, 
            "ngaySinhError", 
            "(*) Ngày sinh không đúng định dạng");

    isValid &= validation.kiemTraKH(
        "khSV",
        "khoaHocError",
        "(*) Vui lòng chọn lớp học");

    isValid &= validation.kiemTraRong(
        _math, 
        "mathError", 
        "(*) Nhập điểm Toán")
        && validation.kiemTraDiemSo (
            _math, 
            "mathError", 
        "(*) Chỉ nhập số");
    isValid &= validation.kiemTraRong(
        _physical, 
        "physicalError", 
        "(*) Nhập điểm Lý")
        && validation.kiemTraDiemSo (
            _physical, 
            "physicalError", 
        "(*) Chỉ nhập số");
    isValid &= validation.kiemTraRong(
        _chemistry, 
        "chemistryError", 
        "(*) Nhập điểm Hoá")
        && validation.kiemTraDiemSo (
            _chemistry, 
            "chemistryError", 
        "(*) Chỉ nhập số");

    //Tạo đối tượng sinhVien từ lớp đối tượng SinhVien
    //Từ khoá new: tạo đối tượng từ lớp đối tượng
    if (isValid){
        var sinhVien = new SinhVien(
            _maSV,
            _tenSV,
            _email,
            _password,
            _ngaySinh,
            _khoaHoc,
            _math,
            _physical,
            _chemistry
        );
        return sinhVien;
    }
    return null;
}

//callback function: tham số của 1 hàm là 1 hàm khác
getEle("btnAdd").addEventListener("click", function(event){
    event.preventDefault();
    var sinhVien = layDuLieuDauVao(true);

    // Kiểm tra nếu thông tin hợp lệ => add sinh viên
    if (sinhVien){
        sinhVien.average();
        dssv.themSinhVien(sinhVien);
        taoBang(dssv.list);

        //Lưu danh sách xuống local storage
        setLocalStorage();
    }
});

function taoBang(arr){
    //reset tbody
    getEle("tbodySinhVien").innerHTML="";

    for(var i = 0; i < arr.length; i++){

        //Tạo dòng (tr)
        var tagTR = document.createElement("tr");

        //Tạo 8 cột (td)
        var tagTD_MaSV = document.createElement("td");
        var tagTD_TenSV = document.createElement("td");
        var tagTD_Email = document.createElement("td");
        var tagTD_NgaySinh = document.createElement("td");
        var tagTD_KhoaHoc = document.createElement("td");
        var tagTD_DTB = document.createElement("td");
        var tagTD_BtnEdit = document.createElement("td");
        var tagTD_BtnDel = document.createElement("td");
        
        //Tạo nội dung cho 8 cột
        tagTD_MaSV.innerHTML = arr[i].maSV;
        tagTD_TenSV.innerHTML = arr[i].tenSV;
        tagTD_Email.innerHTML = arr[i].email;
        tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
        tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;
        tagTD_DTB.innerHTML = arr[i].diemTB;
        tagTD_BtnEdit.innerHTML ='<button class="btn btn-info" onclick="suaSinhVien(\'' + arr[i].maSV + '\')"> Sửa </button>';
        tagTD_BtnDel.innerHTML ='<button class="btn btn-danger" onclick="xoaSinhVien(\'' + arr[i].maSV + '\')"> Xoá </button>';
        
        //appendChild 8 cột vào dòng
        tagTR.appendChild(tagTD_MaSV);
        tagTR.appendChild(tagTD_TenSV);
        tagTR.appendChild(tagTD_Email);
        tagTR.appendChild(tagTD_NgaySinh);
        tagTR.appendChild(tagTD_KhoaHoc);
        tagTR.appendChild(tagTD_DTB);
        tagTR.appendChild(tagTD_BtnEdit);
        tagTR.appendChild(tagTD_BtnDel);

        //appendChild dòng vào tbody
        getEle("tbodySinhVien").appendChild(tagTR);
    }
    
}
//////////////////// Sửa Sinh viên //////////////////
function suaSinhVien(maSV){
    var sinhVien = dssv.layThongTinSV(maSV);

    getEle("txtMaSV").value = sinhVien.maSV;
    getEle("txtMaSV").disabled = true;
    getEle("btnReset").style.display = "inline-block"; 
    getEle("txtTenSV").value = sinhVien.tenSV;
    getEle("txtEmail").value = sinhVien.email;
    getEle("txtPass").value = sinhVien.matKhau;
    getEle("txtNgaySinh").value = sinhVien.ngaySinh;
    getEle("khSV").value = sinhVien.khoaHoc;
    getEle("txtDiemToan").value = sinhVien.math;
    getEle("txtDiemLy").value = sinhVien.physical;
    getEle("txtDiemHoa").value = sinhVien.chemistry;
}
//////////////////// Xoá Sinh viên /////////////////
function xoaSinhVien(maSV){
    dssv._xoaSinhVien(maSV);
    taoBang(dssv.list);
    setLocalStorage();
}

// Lưu danh sách vào local Storage
function setLocalStorage(){
    //Chuyển kiểu JSON => String (JSON.Stringify)
    var arrString = JSON.stringify(dssv.list);
    localStorage.setItem("DSSV", arrString);
}

// Lấy danh sách từ Local Storage
function getLocalStorage(){
    if (localStorage.getItem("DSSV")) {
        //Chuyển kiểu dữ liệu String => JSON
        var data = localStorage.getItem("DSSV");
        dssv.list = JSON.parse(data);
        taoBang(dssv.list);
    }
}   

    //Cập nhật sinh viên
    getEle("btnUpdate").addEventListener("click", function(){
        //Gọi lại hàm lấy dữ liệu đầu vào
        var sinhVien = layDuLieuDauVao(false);
        dssv.capNhatSinhVien(sinhVien);
        sinhVien.average();
        taoBang(dssv.list);
        setLocalStorage();
    });

    //reset form
    getEle("btnReset").addEventListener("click",function(){
    getEle("formSV").reset();
    getEle("txtMaSV").disabled = false;
    getEle("btnUpdate").style.display = "none";
    });

    //Search sinh viên
    getEle("txtSearch").addEventListener("keyup", function(){
        var keyword = getEle("txtSearch").value;
        var mangTimKiem = dssv.timKiemSinhVien(keyword);
        taoBang(mangTimKiem);
    });
