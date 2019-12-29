var rowDataObj = null;
document.getElementById("nameValidation").classList.add("d-none");
function onFormSubmit() {
  event.preventDefault();
  let formData = getEmployeeData();
  if (validateForm()) {
    if (rowDataObj === null) {
      insertNewRow(formData);
    } else {
      updateRow(formData);
    }
    resetForm();
  }
}

function validateForm() {
  let isValid = true;
  if (document.getElementById("fullName").value === "") {
    isValid = false;
    document.getElementById("nameValidation").classList.remove("d-none");
    document.getElementById("nameValidation").classList.add("text-danger");
  } else {
    isValid = true;
    document.getElementById("nameValidation").classList.add("d-none");
  }
  return isValid;
}

function getEmployeeData() {
  let empObj = {};
  empObj["name"] = document.getElementById("fullName").value;
  empObj["salary"] = document.getElementById("salary").value;
  empObj["location"] = document.getElementById("location").value;
  localStorage.setItem("empObj", JSON.stringify(empObj));
  return empObj;
}

function insertNewRow(formData) {
  let tbodyData = document
    .getElementById("empList")
    .getElementsByTagName("tbody")[0];
  var rowData = tbodyData.insertRow(tbodyData.rows.length);
  rowData.insertCell(0).innerHTML = formData.name;
  rowData.insertCell(1).innerHTML = formData.salary;
  rowData.insertCell(2).innerHTML = formData.location;
  rowData.insertCell(
    3
  ).innerHTML = `<a href="#" onclick="onRowEdit(this)">Edit</a> | <a href="#" onclick="onRowDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("location").value = "";
}

function onRowEdit(obj) {
  rowDataObj = obj.parentElement.parentElement;
  document.getElementById("fullName").value = rowDataObj.cells[0].innerHTML;
  document.getElementById("salary").value = rowDataObj.cells[1].innerHTML;
  document.getElementById("location").value = rowDataObj.cells[2].innerHTML;
}

function updateRow(formData) {
  rowDataObj.cells[0].innerHTML = formData.name;
  rowDataObj.cells[1].innerHTML = formData.salary;
  rowDataObj.cells[2].innerHTML = formData.location;
  rowDataObj = null;
}

function onRowDelete(obj) {
  let rowDataObjRes = obj.parentElement.parentElement;
  document.getElementById("empList").deleteRow(rowDataObjRes.rowIndex);
}
