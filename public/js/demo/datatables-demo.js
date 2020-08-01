// Call the dataTables jQuery plugin
$(document).ready(function () {
  $("#dataTable").DataTable({
  });
});

$(document).ready(function () {
  $("#dataTable2").DataTable({
  });
});


$(document).ready(function () {
  $('#scheduleTable').DataTable({
    "searching": false,
    "ordering": false,
    "paging": false,
    "info":     false
  })
})
$(document).ready(function () {
  $('#resultTable').DataTable({
    "searching": false,
    "ordering": true,
    "paging": false,
    "info":     false
  })
})

