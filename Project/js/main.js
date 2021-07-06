function getEle(id) {
    return document.getElementById(id);
};
function hienThiThongTin() {
    var _ten = getEle("txtTenSV").value;
    var _mssv = getEle("txtMaSV").value;
    var _loaiSv = getEle("loaiSV").value;
    var _diemToan = getEle("txtDiemToan").value;
    var _diemVan = getEle("txtDiemVan").value;
    var _diemAnh = getEle("txtDiemAnh").value;

    var sinhVien = {
        tenSV: _ten,
        mssv: _mssv,
        loaiSV: _loaiSv,
        diemToan: _diemToan,
        diemVan: _diemVan,
        diemAnh: _diemAnh,
        diemTB: 0,
        xepLoaiSV: "",

        tinhTB: function () {
            this.diemTB = (parseFloat(this.diemToan) + parseFloat(this.diemVan) + parseFloat(this.diemAnh)) / 3;
        },
        xepLoai_1: function () {
            if (this.diemTB >= 8 && this.diemTB < 10) {
                this.xepLoaiSV = "Giỏi";
            } else if (this.diemTB >= 6 && this.diemTB < 8) {
                this.xepLoaiSV = "Khá";
            } else if (this.diemTB > 5 && this.diemTB < 6) {
                this.xepLoaiSV = "Trung Bình";
            } else {
                this.xepLoaiSV = "yếu";
            }
        }
    };
    getEle("spanTenSV").innerHTML = sinhVien.tenSV;
    getEle("spanMaSV").innerHTML = sinhVien.mssv;
    getEle("spanLoaiSV").innerHTML = sinhVien.loaiSV;
    sinhVien.tinhTB();
    getEle("spanDTB").innerHTML = sinhVien.diemTB;
    sinhVien.xepLoai_1();
    getEle("spanXepLoai").innerHTML = sinhVien.xepLoaiSV;
}