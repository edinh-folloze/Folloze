/*
 * Copyright Folloze. Licensed under the MIT License.
 * See license text at https://github.com/edinh-folloze/Folloze/blob/main/LICENSE.md
 */

document.addEventListener('Folloze.ctaSubmit', function (e) {
  // Create the new request
  var xhr = new XMLHttpRequest();
  
  // Configure HubSpot Form Submit endpoint
  var hsHubId = 'HUBSPOT_PORTAL_ID';
  var hsFormId = 'HUBSPOT_FORM_ID';
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/' + hsHubId + '/' + hsFormId;

  // Create a JSON object containing Form POST data
  var data = {
    "fields": [
      {
        "name": "email",
        "value": e.detail.ctaData.email
      },
      {
        "name": "firstname",
        "value": e.detail.ctaData.name
      },
      {
        "name": "lastname",
        "value": e.detail.ctaData.last_name
      }
    ],
    "context": {
      "pageUri": document.URL,
      "pageName": FollozeState.initialState.board.name
    }
  }

  xhr.open('POST', url);
  
  // Set the 'Content-Type' HTTP request header to 'application/json'
  xhr.setRequestHeader('Content-type', 'application/json');

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      // Returns a 200 response if the submission is successful.
      console.log("Form Submit", xhr.responseText);  
    } 
    else if (xhr.readyState == 4 && xhr.status == 400){
      // Returns a 400 error if the submission is rejected.
      console.log("Form Submit", xhr.responseText);  
    } 
    else if (xhr.readyState == 4 && xhr.status == 403){
      // Returns a 403 error if the portal isn't allowed to post submissions.
      console.log("Form Submit", xhr.responseText);  
    } 
    else if (xhr.readyState == 4 && xhr.status == 404){
      //Returns a 404 error if the hsFormId isn't found
      console.log("Form Submit", xhr.responseText);  
    }
  }

  // Translate JSON object to a string and sends the request to HubSpot
  xhr.send(JSON.stringify(data))

  // Log form submission data to console for debugging
  console.log("Form Submit", data);
}, false);