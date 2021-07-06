//Tạo lớp đối tượng Sinh Viên
function SinhVien(_maSV, _tenSV, _email, _password, _ngaySinh, _khoaHoc, _math, _physical, _chemistry
){
    //Hàm khởi tạo những thuộc tính & phường thức
    //key = value
    this.maSV = _maSV;
    this.tenSV = _tenSV;
    this.email = _email;
    this.matKhau = _password;
    this.ngaySinh = _ngaySinh;
    this.khoaHoc = _khoaHoc;
    this.math = _math;
    this.physical = _physical;
    this.chemistry = _chemistry;
    this.diemTB = 0;

    this.average = function(){
        this.diemTB = (parseFloat(this.math) + parseFloat(this.physical) + parseFloat(this.chemistry)) /3;
    };
}
