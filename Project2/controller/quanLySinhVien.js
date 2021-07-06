// tạo obj chứa thông tin request về api từ BE
var objectAjax = {
  url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
  method: "GET",
  responseType: "json",
};

//dngf thư viện axios gửi thông tin yeeu ầu BE trả dữ liệu
var loadDanhSachSinhVien = function () {
  var promise = axios(objectAjax);

  promise
    .then(function (res) {
      var noiDungTable = "";
      for (var i = 0; i < res.data.length; i++) {
        var sinhVien = res.data[i];
        noiDungTable += `
         <tr>
            <td>${sinhVien.MaSV}</td>
            <td>${sinhVien.HoTen}</td>
            <td>${sinhVien.Email}</td>
            <td>${sinhVien.SoDT}</td>
            <td>${sinhVien.DiemToan}</td>
            <td>${sinhVien.DiemLy}</td>
            <td>${sinhVien.DiemHoa}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xóa</button>
                <button class="btn btn-warning" onclick="suaSinhVien('${sinhVien.MaSV}')">Sửa</button>
            </td>
         </tr>
        `;
      }
      document.getElementById("tblSinhVien").innerHTML = noiDungTable;
    })
    .catch(function (error) {
      console.log(error);
    });
};

var xoaSinhVien = function (MaSV) {
  var obAjaxXoaSinhVien = {
    url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
    method: "DELETE",
  };
  axios(obAjaxXoaSinhVien)
    .then(function (res) {
      console.log(res);
      loadDanhSachSinhVien();
    })
    .catch(function (err) {
      console.log(err);
      loadDanhSachSinhVien();
    });
};

loadDanhSachSinhVien();
//======================chức năng thêm sinh viên=================

document.getElementById("btnThemSinhVien").onclick = function () {
  var sv = new SinhVien();

  sv.MaSV = document.getElementById("MaSV").value;
  sv.HoTen = document.getElementById("HoTen").value;
  sv.Email = document.getElementById("Email").value;
  sv.SoDT = document.getElementById("SoDT").value;
  sv.DiemToan = document.getElementById("diemToan").value;
  sv.DiemLy = document.getElementById("diemLy").value;
  sv.DiemHoa = document.getElementById("diemHoa").value;

  var obAxios = {
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: sv,
  };
  //dùng axios đưa dữ liệu về BE
  axios(obAxios)
    .then(function (res) {
      console.log(res);
      loadDanhSachSinhVien();
    })
    .catch(function (err) {
      console.log(err);
      loadDanhSachSinhVien();
    });

  // gọi phương thức reload lại trang
};

document.getElementById("btnCapNhatSV").onclick = function () {
  var sv = new SinhVien();
  sv.MaSV = document.getElementById("MaSV").value;
  sv.HoTen = document.getElementById("HoTen").value;
  sv.Email = document.getElementById("Email").value;
  sv.SoDT = document.getElementById("SoDT").value;
  sv.DiemToan = document.getElementById("diemToan").value;
  sv.DiemLy = document.getElementById("diemLy").value;
  sv.DiemHoa = document.getElementById("diemHoa").value;

  console.log(sv);
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien`,
    method: "PUT",
    data: sv,
  })
    .then(function (res) {
      console.log(res.data);
      loadDanhSachSinhVien();
    })
    .catch(function (err) {
      console.log(err.response.data);
      loadDanhSachSinhVien();
    });
};

var suaSinhVien = function (maSV) {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSV}`,
    method: "GET",
  })
    .then(function (res) {
      console.log(res.data);
      var sinhVien = res.data;
      document.getElementById("MaSV").value = sinhVien.MaSV;
      document.getElementById("HoTen").value = sinhVien.HoTen;
      document.getElementById("Email").value = sinhVien.Email;
      document.getElementById("SoDT").value = sinhVien.SoDT;
      document.getElementById("diemToan").value = sinhVien.DiemToan;
      document.getElementById("diemLy").value = sinhVien.DiemLy;
      document.getElementById("diemHoa").value = sinhVien.DiemHoa;
    })
    .catch(function (err) {
      console.log(err);
    });
};
