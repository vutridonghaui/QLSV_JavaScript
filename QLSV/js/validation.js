function Validation(){
    this.kiemTraRong = function(input,divId, mess){
        if (input.trim() === ""){
            //thông báo lỗi
            getEle(divId).innerHTML = mess;
            getEle(divId).className = "alert alert-danger";
            return false;
        } else {
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
    };

    this.kiemTraDoDaiKyTu = function(input, divId, mess, min, max) {
        if (input.length >= min && input.length <= max) {
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };

    this.kiemTraKyTuNhap = function(input, divId, mess){
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };

    this.kiemTraEmail = function(input, divId, mess){
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };

    this.kiemTraPassword = function(input, divId, mess){
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };
    this.kiemTraNgaySinh = function(input, divId, mess){
        var letter = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };

    this.kiemTraKH = function(idSelect, divId, mess){
        if (getEle(idSelect).selectedIndex !=0) {
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };

    this.kiemTraDiemSo = function (input, divId, mess){
        var letter = /^[0-9]+$/;
        if (input.match(letter)){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    };

    this.kiemTraMsvTrung = function (input, divId, mess,arr){
        /**
         * 1.Duyệt mảng arr
         * 2. Nếu item.array trùng với input
         * => Error = "Trùng mã sinh viên"
         * 3. else không trùng
         */
        var status = true;
        for (i = 0; i < arr.length; i++){
            if (arr[i].maSV === input){
                status = false;
                break;
            }
        }
        if (status){
            getEle(divId).innerHTML = "";
            getEle(divId).className = "";
            return true;
        }   
        getEle(divId).innerHTML = mess;
        getEle(divId).className = "alert alert-danger";
        return false;
    }
}