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
  var initial_dayBody = document.getElementById('day' + dayId + "Form");

  var existingDayBodyCount = document.querySelectorAll('#day' + dayId + "Form .dayBody").length;

  // Create a new div element with the class "dayBody"
  var lineBreak = document.createElement('br');
  var dayBodyDiv = document.createElement('div');
  dayBodyDiv.classList.add('dayBody');

  // Create a text node for "Exercise: "
  var exerciseLabel = document.createTextNode('Exercise: ');

  // Create an input element with the class "inputField"
  var inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('name', dayId + "Exercise_" + (existingDayBodyCount + 1));
  inputField.classList.add('inputField');
  inputField.style.width = '95%'; // Set the width inline style

  // Create a text node for "Sets: "
  var setsLabel = document.createTextNode('Sets: ');

  // Create an input element with the class "inputField"
  var inputField_2 = document.createElement('input');
  inputField_2.setAttribute('type', 'text');
  inputField_2.setAttribute('name', dayId + "Sets_" + (existingDayBodyCount + 1));
  inputField_2.classList.add('inputField');
  inputField_2.style.width = '95%'; // Set the width inline style

  // Create an hr element with the class "separator"
  var separator = document.createElement('hr');
  separator.classList.add('separator');

  // Append the labels and input fields to the dayBody div
  dayBodyDiv.appendChild(exerciseLabel);
  dayBodyDiv.appendChild(inputField);
  dayBodyDiv.appendChild(separator);
  dayBodyDiv.appendChild(setsLabel);
  dayBodyDiv.appendChild(inputField_2);

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
  var initial_dayBody = document.getElementById('day' + dayId  + "Form");

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

// Function to add form inside each day div
function addFormsToDays() {
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  days.forEach(function(day) {
      var dayDiv = document.getElementById("day" + day);
      var form = document.createElement("form");
      form.setAttribute("id", "day" + day + "Form");
      dayDiv.appendChild(form);
  });
}

// Call the function to add forms to days
addFormsToDays();

function captureFormData() {
  // Initialize an empty object to store the captured data
  var formData = {};

  // Get all forms with IDs starting with "day"
  var forms = document.querySelectorAll('form[id^="day"]');

  // Loop through each form
  forms.forEach(function(form) {
      // Get the form ID (e.g., "dayMondayForm")
      var formId = form.id;

      // Initialize an object to store the form data
      var formValues = {};

      // Get all input fields and text areas inside the form
      var inputs = form.querySelectorAll('input');

      // Loop through each input field and text area
      inputs.forEach(function(input) {
          // Get the name and value of the input field or text area
          var name = input.name;
          var value = input.value;

          // Add the name-value pair to the form data object
          formValues[name] = value;
      });

      // Add the form data to the main formData object
      formData[formId] = formValues;
  });

  // Convert the formData object to JSON
  var jsonData = JSON.stringify(formData);

  // Return the JSON data if needed
  return jsonData;
}

function loadFormData(jsonData) {
  // Parse the JSON data
  var formData = JSON.parse(jsonData);

  // Loop through each form in the formData object
  for (var formId in formData) {
      if (formData.hasOwnProperty(formId)) {
          // Get the form element
          var form = document.getElementById(formId);
          console.log(form)
          // Get the form data for the current form
          var formValues = formData[formId];

          // Loop through each input field and textarea in the form data
          for (var fieldName in formValues) {
              if (formValues.hasOwnProperty(fieldName)) {
                  // Get the input field or textarea by name
                  var field = form.querySelector('[name="' + fieldName + '"]');

                  // If the field exists, set its value
                  if (field) {
                      field.value = formValues[fieldName];
                  }
              }
          }
      }
  }
}

// Function to capture form data and save it
function saveFormData() {
  // Capture form data
  var savedData = captureFormData();

  // Store the captured data in local storage
  localStorage.setItem('savedData', savedData);
}

// Function to load saved data back into the form
function loadSavedData() {
  // Retrieve saved data from local storage
  var savedData = localStorage.getItem('savedData');

  // If saved data exists, load it into the form
  if (savedData) {
      loadFormData(savedData);
  }
}

