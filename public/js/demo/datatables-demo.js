// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable({});
});

// $(document).ready(function () {
//   $("#dataTable2").DataTable({});
// });

// $(document).ready(function () {
//   $("#scheduleTable").DataTable({
//     searching: false,
//     ordering: false,
//     paging: false,
//     info: false,
//   });
// });
// $(document).ready(function () {
//   $("#resultTable").DataTable({
//     searching: false,
//     ordering: true,
//     paging: false,
//     info: false,
//   });
// });

// $(document).ready(function () {
//   $("#examTable").DataTable({
//     searching: true,
//     ordering: true,
//     paging: false,
//     info: false,
//   });
// });

// $(document).ready(function () {
//   $("#reExaminationTable").DataTable({
//     searching: true,
//     ordering: true,
//     paging: false,
//     info: false,
//     columnDefs: [{ targets: 1, type: "date-eu" }],
//   });
// });

// $(document).ready(function () {
//   $("#teacherTable").DataTable({
//     searching: false,
//     ordering: true,
//     paging: false,
//     info: false,
//   });
// });
// $(document).ready(function () {
//   $("#staffTable").DataTable({
//     searching: false,
//     ordering: true,
//     paging: false,
//     info: false,
//   });
// });

$(document).ready(function () {
  $(".pass_show").append('<span class="ptxt">Hiện</span>');
});
$(document).on("click", ".pass_show .ptxt", function () {
  $(this).text($(this).text() == "Hiện" ? "Ẩn" : "Hiện");
  $(this)
    .prev()
    .attr("type", function (index, attr) {
      return attr == "password" ? "text" : "password";
    });
});
