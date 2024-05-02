// Function to add a row to a specific table
function addRowToTable(tableId) {
  var table = document.getElementById(tableId);
  var newRow = table.insertRow(-1); // Insert new row at the end of the table

  // Add cells to the new row
  for (var i = 0; i < table.rows[0].cells.length; i++) {
    var cell = newRow.insertCell(i);
    var input = document.createElement("input");
    input.type = "text";
    input.style.width = "90px"; // Set width of input box
    cell.appendChild(input);
  }
}


// Function to remove the last row from a specific table
function removeRowFromTable(tableId) {
  var table = document.getElementById(tableId);
  var lastRowIndex = table.rows.length - 1; // Get index of last row
  if (lastRowIndex > 1) { // Ensure there are at least two rows (header and one data row)
    table.deleteRow(lastRowIndex); // Delete last row
  }
}

// Function to add a row to the table of the current active tab
function addRow() {
  var activeTabId = document.querySelector(".tablinks.active").id;
  addRowToTable("table" + activeTabId);
}

// Function to remove the last row from the table of the current active tab
function removeRow() {
  var activeTabId = document.querySelector(".tablinks.active").id;
  removeRowFromTable("table" + activeTabId);
}

function openDay(evt, dayName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(dayName).style.display = "block";
  evt.currentTarget.className += " active";

  // Set width of input fields to 90px
  var inputFields = document.querySelectorAll("#" + dayName + " input[type='text']");
  for (i = 0; i < inputFields.length; i++) {
    inputFields[i].style.width = "90px";
  }
}

// Function to save table data to local storage
function saveData() {
  // Create an object to store the table data
  var tableData = {};

  // Loop through each table and save its data
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  days.forEach(function(day) {
    var tableId = 'table' + day;
    var table = document.getElementById(tableId);
    var rowData = [];

    // Loop through each row of the table
    for (var i = 1; i < table.rows.length; i++) { // Start from index 1 to skip the header row
      var row = table.rows[i];
      var cellData = {};

      // Loop through each cell of the row
      for (var j = 0; j < row.cells.length; j++) {
        var cell = row.cells[j];
        var input = cell.querySelector('input');

        // Store the value of the input field in the cell data object
        cellData['input' + (j + 1)] = input.value;
      }

      // Push the cell data to the row data array
      rowData.push(cellData);
    }

    // Store the row data in the table data object
    tableData[day] = rowData;
  });

  // Convert the table data object to JSON
  var jsonData = JSON.stringify(tableData);

  // Save the JSON data to local storage
  localStorage.setItem('tableData', jsonData);

  // Inform the user that data has been saved
  alert('Data saved successfully!');
}

// Function to load table data from local storage
function loadData() {
  // Retrieve the JSON data from local storage
  var jsonData = localStorage.getItem('tableData');

  // Parse the JSON data
  var tableData = JSON.parse(jsonData);

  // Check if there is any data stored
  if (tableData) {
    // Loop through each day and load its data into the corresponding table
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(function(day) {
      var tableId = 'table' + day;
      var table = document.getElementById(tableId);
      var rowData = tableData[day];

      // Loop through the rows of the table and populate them with the saved data
      rowData.forEach(function(cellData) {
        var newRow = table.insertRow(-1); // Insert new row at the end of the table

        // Loop through each cell data and create cells in the row
        for (var key in cellData) {
          if (cellData.hasOwnProperty(key)) {
            var cell = newRow.insertCell(-1); // Insert new cell at the end of the row
            cell.innerHTML = '<input type="text" value="' + cellData[key] + '">';
          }
        }
      });
    });
  }
}

// Function to clear saved data from local storage
function clearData() {
  localStorage.removeItem('tableData');
  alert('Data cleared successfully!');
}

function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
  } else {
    sidebar.style.left = '0px';
  }
}
