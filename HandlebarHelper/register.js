const flagClass = require("../ModelClass/Helper/resource/Flag");

const registerSideBar = (handlebars) => {
  handlebars.registerHelper("sideBar", function (user, block) {
    switch (user.typeUser) {
      case flagClass.TYPE_USER.ADMIN:
        return new handlebars.SafeString(
          `<li class="nav-item">` +
            `<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePrincipal" aria-expanded="true" aria-controls="collapsePrincipal">` +
            `<span>Admin</span>` +
            `</a>` +
            `<div id="collapsePrincipal" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">` +
            `<div class="bg-white py-2 collapse-inner rounded">` +
            `<a class="collapse-item" href="/admin/employee">Quản lí nhân viên</a>` +
            `<a class="collapse-item" href="/admin/semester">Quản lí năm học</a>` +
            `</div>` +
            `</div>` +
            `</li>`
        );
        break;

      case flagClass.TYPE_USER.STUDENT:
        return new handlebars.SafeString(
          `<li class="nav-item">` +
            `<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"` +
            `aria-controls="collapseTwo">` +
            `<span>Học sinh</span>` +
            `</a>` +
            `<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">` +
            `<div class="bg-white py-2 collapse-inner rounded">` +
            `<a class="collapse-item" href="/student/schedule">Thời khoá biểu</a>` +
            `<a class="collapse-item" href="/student/examtable">Lịch thi</a>` +
            `<a class="collapse-item" href="/student/resulttable">Kết quả học tập</a>` +
            `</div>` +
            `</div>` +
            `</li>"`
        );
        break;

      case flagClass.TYPE_USER.TEACHER:
        return new handlebars.SafeString(
          `<li class="nav-item">` +
            `<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTeacher" aria-expanded="true" aria-controls="collapseTeacher" >` +
            `<span>Giáo viên</span>` +
            `</a>` +
            `<div id="collapseTeacher" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">` +
            `<div class="bg-white py-2 collapse-inner rounded">` +
            `<a class="collapse-item" href="/teacher/class">Quản lý lớp học</a>` +
            `<a class="collapse-item" href="/teacher/exam">Lịch coi thi</a>` +
            `<a class="collapse-item" href="/teacher/schedule">Lịch giảng dạy</a>` +
            `<a class="collapse-item" href="/teacher/reExamine">Đơn phúc khảo</a>` +
            `</div>` +
            `</div>` +
            `</li>`
        );
        break;

      case flagClass.TYPE_USER.HOMEROOM_TEACHER:
        return new handlebars.SafeString(
          `<li class="nav-item">` +
            `<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTeacher" aria-expanded="true" aria-controls="collapseTeacher" >` +
            `<span>Giáo viên</span>` +
            `</a>` +
            `<div id="collapseTeacher" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">` +
            `<div class="bg-white py-2 collapse-inner rounded">` +
            `<a class="collapse-item" href="/teacher/managerClass">Quản lý lớp chủ nhiệm</a>` +
            `<a class="collapse-item" href="/teacher/class">Quản lý lớp học</a>` +
            `<a class="collapse-item" href="/teacher/exam">Lịch coi thi</a>` +
            `<a class="collapse-item" href="/teacher/schedule">Lịch giảng dạy</a>` +
            `<a class="collapse-item" href="/teacher/reExamine">Đơn phúc khảo</a>` +
            `</div>` +
            `</div>` +
            `</li>`
        );
        break;

      case flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT:
        return new handlebars.SafeString(
          `<li class="nav-item">` +
            `<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"` +
            `aria-controls="collapseTwo">` +
            `<span>Giáo vụ</span>` +
            `</a>` +
            `<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">` +
            `<div class="bg-white py-2 collapse-inner rounded">` +
            `<a class="collapse-item" href="/staff/class">Quản lý lớp học</a>` +
            `<a class="collapse-item" href="/staff/exam">Lịch thi</a>` +
            `<a class="collapse-item" href="/staff/room-exam">Phòng thi</a>` +
            `<a class="collapse-item" href="/staff/report">Báo cáo</a>` +
            `<a class="collapse-item" href="/staff/survey">Khảo sát</a>` +
            `</div>` +
            `</div>` +
            `</li>"`
        );
        break;
    }
  });
};

const registerProfile = (handlebars) => {
  handlebars.registerHelper("profile", function (user, block) {
    switch (user.typeUser) {
      case flagClass.TYPE_USER.ADMIN:
        return new handlebars.SafeString(
          `<div class="row">` +
            `<div class="col-md-4">` +
            `<div class="profile-img">` +
            `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />` +
            `<div class="file btn btn-lg btn-primary">` +
            `Change Photo` +
            `<input type="file" name="file" />` +
            `</div>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<div class="profile-head">` +
            `<h5>` +
            `${user.fullName}` +
            `</h5>` +
            `</h6>` +
            `<ul class="nav nav-tabs" id="myTab" role="tablist">` +
            `<li class="nav-item">` +
            `<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>` +
            `</li>` +
            `</ul>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-2">` +
            `<input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-2">` +
            `</div>` +
            `<div class="col-md-8">` +
            `<div class="tab-content profile-tab" id="myTabContent">` +
            `<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Mã học sinh</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.id}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Họ và tên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.fullName}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Ngày sinh</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.dob.getDate()}/${
              user.dob.getMonth() + 1
            }/${user.dob.getFullYear()}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>CMND</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.identityCard}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Địa chỉ</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.address}</p>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>`
        );
        break;

      case flagClass.TYPE_USER.STUDENT:
        {
          return new handlebars.SafeString(
            `<div class="row">` +
              `<div class="col-md-4">` +
              `<div class="profile-img">` +
              `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />` +
              `<div class="file btn btn-lg btn-primary">` +
              `Change Photo` +
              `<input type="file" name="file" />` +
              `</div>` +
              `</div>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<div class="profile-head">` +
              `<h5>` +
              `${user.fullName}` +
              `</h5>` +
              `<h6>` +
              `${user.className}` +
              `</h6>` +
              `<h6>` +
              `${user.classID}` +
              `</h6>` +
              `<ul class="nav nav-tabs" id="myTab" role="tablist">` +
              `<li class="nav-item">` +
              `<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Thông tin</a>` +
              `</li>` +
              `<li class="nav-item">` +
              `<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Người thân</a>` +
              `</li>` +
              `</ul>` +
              `</div>` +
              `</div>` +
              `<div class="col-md-2">` +
              `<input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-4"></div>` +
              `<div class="col-md-8">` +
              `<div class="tab-content profile-tab" id="myTabContent">` +
              `<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>Mã học sinh</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>${user.id}</p>` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>Họ và tên</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>${user.fullName}</p>` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>Ngày sinh</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>${user.dob.getDate()}/${
                user.dob.getMonth() + 1
              }/${user.dob.getFullYear()}</p>` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>CMND</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>${user.identityCard}</p>` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>Địa chỉ</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>${user.address}</p>` +
              `</div>` +
              `</div>` +
              `</div>` +
              `<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>Họ tên</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>Trần Văn B</p>` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>Quan hệ</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>Bố</p>` +
              `</div>` +
              `</div>` +
              `<div class="row">` +
              `<div class="col-md-6">` +
              `<label>SĐT</label>` +
              `</div>` +
              `<div class="col-md-6">` +
              `<p>0909090808</p>` +
              `</div>` +
              `   </div>` +
              `</div>` +
              `</div>` +
              `</div>` +
              `</div>`
          );
        }
        break;

      case flagClass.TYPE_USER.TEACHER:
        return new handlebars.SafeString(
          `<div class="row">` +
            `<div class="col-md-4">` +
            `<div class="profile-img">` +
            `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />` +
            `<div class="file btn btn-lg btn-primary">` +
            `Change Photo` +
            `<input type="file" name="file" />` +
            `</div>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<div class="profile-head">` +
            `<h5>` +
            `${user.fullName}` +
            `</h5>` +
            `<h6>` +
            `${user.subjectName}` +
            `</h6>` +
            `<h6>` +
            `${user.subjectID}` +
            `</h6>` +
            `<ul class="nav nav-tabs" id="myTab" role="tablist">` +
            `<li class="nav-item">` +
            `<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>` +
            `</li>` +
            `</ul>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-2">` +
            `<input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-2">` +
            `</div>` +
            `<div class="col-md-8">` +
            `<div class="tab-content profile-tab" id="myTabContent">` +
            `<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Mã giáo viên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.id}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Họ và tên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.fullName}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Ngày sinh</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.dob.getDate()}/${
              user.dob.getMonth() + 1
            }/${user.dob.getFullYear()}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>CMND</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.identityCard}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Địa chỉ</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.address}</p>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>`
        );
        break;

      case flagClass.TYPE_USER.TEACHER:
        return new handlebars.SafeString(
          `<div class="row">` +
            `<div class="col-md-4">` +
            `<div class="profile-img">` +
            `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />` +
            `<div class="file btn btn-lg btn-primary">` +
            `Change Photo` +
            `<input type="file" name="file" />` +
            `</div>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<div class="profile-head">` +
            `<h5>` +
            `${user.fullName}` +
            `</h5>` +
            `<h6>` +
            `${user.subjectName}` +
            `</h6>` +
            `<h6>` +
            `${user.subjectID}` +
            `</h6>` +
            `<ul class="nav nav-tabs" id="myTab" role="tablist">` +
            `<li class="nav-item">` +
            `<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>` +
            `</li>` +
            `</ul>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-2">` +
            `<input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-2">` +
            `</div>` +
            `<div class="col-md-8">` +
            `<div class="tab-content profile-tab" id="myTabContent">` +
            `<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Mã giáo viên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.id}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Họ và tên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.fullName}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Ngày sinh</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.dob.getDate()}/${
              user.dob.getMonth() + 1
            }/${user.dob.getFullYear()}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>CMND</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.identityCard}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Địa chỉ</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.address}</p>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>`
        );
        break;

      case flagClass.TYPE_USER.HOMEROOM_TEACHER:
        return new handlebars.SafeString(
          `<div class="row">` +
            `<div class="col-md-4">` +
            `<div class="profile-img">` +
            `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />` +
            `<div class="file btn btn-lg btn-primary">` +
            `Change Photo` +
            `<input type="file" name="file" />` +
            `</div>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<div class="profile-head">` +
            `<h5>` +
            `${user.fullName}` +
            `</h5>` +
            `<h6>` +
            `${user.subjectName}` +
            `</h6>` +
            `<h6>` +
            `${user.subjectID}` +
            `</h6>` +
            `<ul class="nav nav-tabs" id="myTab" role="tablist">` +
            `<li class="nav-item">` +
            `<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>` +
            `</li>` +
            `</ul>` +
            `</div>` +
            `</div>` +
            `<div class="col-md-2">` +
            `<input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-2">` +
            `</div>` +
            `<div class="col-md-8">` +
            `<div class="tab-content profile-tab" id="myTabContent">` +
            `<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Mã giáo viên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.id}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Họ và tên</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.fullName}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Ngày sinh</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.dob.getDate()}/${
              user.dob.getMonth() + 1
            }/${user.dob.getFullYear()}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>CMND</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.identityCard}</p>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-md-6">` +
            `<label>Địa chỉ</label>` +
            `</div>` +
            `<div class="col-md-6">` +
            `<p>${user.address}</p>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `</div>`
        );
        break;

      case flagClass.TYPE_USER.EMPLOYEE_TRAINING_DEPARTMENT:
        return new handlebars.SafeString();
        break;
    }
  });
};

const registerAll = (handlebars) => {
  registerSideBar(handlebars);
  registerProfile(handlebars);
};

module.exports = registerAll;
