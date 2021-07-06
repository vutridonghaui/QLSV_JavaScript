function DanhSachSinhVien(){
    this.list = [];
    this.themSinhVien = function(sv){
        this.list.push(sv);
    };

    this._timViTriSV = function(maSV) {
        /**
         * Tìm vị trí mã vinh viên cần xoá trong mảng list
         * 0. var index = -1;
         * 1. duyệt mnảng this.list
         * 2. If item.maSV == maSV => lấy index (i)
         * 3.splice(index,1);
         */
         var index = -1;
         for(var i = 0; i < this.list.length; i++){
             if (this.list[i].maSV == maSV){
                 index = i;
                 break;
             }
         }
         return index;
    };

    //Xoá SV
    this._xoaSinhVien = function(maSV){
        var index = this._timViTriSV(maSV);
        if (index !== -1){
        this.list.splice(index,1);
        }
    };

    //lấy thông tin sinh viên
    this.layThongTinSV = function(maSV){

    //Hiển thị nút cập nhật
    getEle("btnUpdate").style.display = "inline-block";   
        var index = this._timViTriSV(maSV);
        if (index !== -1){
            return this.list[index];
        }
    };

    //Cập nhật sinh viên
    this.capNhatSinhVien = function(sinhVien){
        var index = this._timViTriSV(sinhVien.maSV);
        if(index !== -1){
            this.list[index] = sinhVien;
        }
    };
}
    //Tìm kiếm sinh viên - function nằm ngoài lớp đối tượng
    DanhSachSinhVien.prototype.timKiemSinhVien = function(keyword){
        /**
         * Tạo ra mangTimKiem = []'
         * 1. Duyệt mảng
         * 
         * 2. Nếu keyword trùng với sinhVien.tenSV
         *  => Tìm thấy: thêm sinh viên vào mangTimKiem
         * 
         * 3. trả về mangTimKiem
         */
        var mangTimKiem = [];
        for (var i = 0; i < this.list.length; i++){
            if (this.list[i].tenSV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
                mangTimKiem.push(this.list[i]);
            }
        }
        return mangTimKiem;
    }