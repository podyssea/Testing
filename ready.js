$(document).ready(function(){
    savedData = localStorage.getItem('jsonData')
    var retrievedData = JSON.parse(savedData);

    // Loop through each day
    for (var day in retrievedData) {
        if (retrievedData.hasOwnProperty(day)) {
            var initial_dayBody = document.getElementById(day);

            // Get the form data for the current day
            var formData = retrievedData[day];

            // Loop through each form field in the current day's form
            for (var field in formData) {
                if (!(formData === undefined)) {
                    // Create a new div element with the class "dayBody"
                    var lineBreak = document.createElement('br');
                    var dayBodyDiv = document.createElement('div');
                    dayBodyDiv.classList.add('dayBody');

                    var separator = document.createElement('hr');
                    separator.classList.add('separator');

                    // Convert both the field name and the substring to lowercase for case-insensitive search
                    var fieldName = field.toLowerCase();
                    var substring = 'Exercise'.toLowerCase();

                    if (fieldName.indexOf(substring) !== -1) { 
                        var exercise_name = field;
                        
                        // Create a text node for "Exercise: "
                        var exerciseLabel = document.createTextNode('Exercise: ');
                        
                        // Create an input element with the class "inputField"
                        var inputField = document.createElement('input');
                        inputField.setAttribute('type', 'text');
                        inputField.setAttribute('name', exercise_name);
                        inputField.classList.add('inputField');
                        inputField.style.width = '95%'; // Set the width inline style
                        inputField.value = formData[field]

                        dayBodyDiv.appendChild(exerciseLabel);
                        dayBodyDiv.appendChild(inputField);
                        initial_dayBody.appendChild(dayBodyDiv);
                    } else {
                        // If 'Exercise' is not found, check for 'Set'
                        substring = 'Set'.toLowerCase();
                        if (fieldName.indexOf(substring) !== -1) { 
                            var sets_name = field;  
                            // Create a text node for "Sets: "
                            var setsLabel = document.createTextNode('Sets: ');
                            
                            // Create an input element with the class "inputField"
                            var inputField_2 = document.createElement('input');
                            inputField_2.setAttribute('type', 'text');
                            inputField_2.setAttribute('name', sets_name);
                            inputField_2.classList.add('inputField');
                            inputField_2.style.width = '95%'; // Set the width inline style
                            inputField_2.value = formData[field]

                            dayBodyDiv.appendChild(setsLabel);
                            dayBodyDiv.appendChild(inputField_2);
                            initial_dayBody.appendChild(dayBodyDiv);
                            initial_dayBody.appendChild(lineBreak);
                        }
                    }
                }
            }
        }
    }
});