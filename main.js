function addDayBody() {
  // Get all buttons with the class "tablinks"
  var tabButtons = document.querySelectorAll('.tablinks');

  // Loop through each button
  for (var i = 0; i < tabButtons.length; i++) {
      // Check if the current button has the "active" class
      if (tabButtons[i].classList.contains('active')) {
          // Return the id of the button if it's active
          var dayId = tabButtons[i].id;
      }
  }

  // Get the dayMonday div
  var initial_dayBody = document.getElementById('day' + dayId);

  // Create a new div element with the class "dayBody"
  var lineBreak = document.createElement('br');
  var dayBodyDiv = document.createElement('div');
  dayBodyDiv.classList.add('dayBody');

  // Create an input element with the class "inputField"
  var inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.classList.add('inputField');
  inputField.style.width = '95%'; // Set the width inline style

  // Create an hr element with the class "separator"
  var separator = document.createElement('hr');
  separator.classList.add('separator');

  // Create a textarea element with the class "textArea"
  var textArea = document.createElement('textarea');
  textArea.classList.add('textArea');
  textArea.setAttribute('rows', '4');
  textArea.setAttribute('cols', '50');

  // Append the input field, separator, and textarea to the dayBody div
  dayBodyDiv.appendChild(inputField);
  dayBodyDiv.appendChild(separator);
  dayBodyDiv.appendChild(textArea);

  // Append the dayBody div to the dayMonday div
  initial_dayBody.appendChild(dayBodyDiv);
  initial_dayBody.appendChild(lineBreak);
}

function removeDayBody() {
  // Get all buttons with the class "tablinks"
  var tabButtons = document.querySelectorAll('.tablinks');

  // Loop through each button
  for (var i = 0; i < tabButtons.length; i++) {
      // Check if the current button has the "active" class
      if (tabButtons[i].classList.contains('active')) {
          // Return the id of the button if it's active
          var dayId = tabButtons[i].id;
      }
  }

  // Get the initial_dayBody div
  var initial_dayBody = document.getElementById('day' + dayId);

  // Get all elements inside initial_dayBody
  var children = initial_dayBody.children;

  // Start removing from the last child
  for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      // Check if the child is a <div> with class "dayBody"
      if (child.classList.contains('dayBody')) {
          // Remove the <div> with class "dayBody"
          child.remove();
          // Exit the loop after removing the first <div> with class "dayBody"
          break;
      } else if (child.tagName === 'BR') {
          // Remove the <br> element if found before a .dayBody
          child.remove();
          // If there's another <br> before a .dayBody, remove it as well and exit the loop
          if (i > 0 && children[i - 1].classList.contains('dayBody')) {
              children[i - 1].remove();
              break;
          }
      }
  }
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
}

// Function to clear saved data from local storage
function clearData() {
  localStorage.removeItem('tableData');
  alert('Data cleared successfully!');
}

