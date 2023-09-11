<script>
// Listen for 'Folloze.ctaSubmit' custom event when a user submits a form on the website
window.addEventListener('Folloze.ctaSubmit', function (e) {
  function sendData(data) {
    console.log('Sending data');

    // Create a new instance of XMLHttpRequest
    const XHR = new XMLHttpRequest();

    // Create an array of URL-encoded key/value pairs from the data object
    const urlEncodedDataPairs = [];
    for (const [name, value] of Object.entries(data)) {
      urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
    }

    // Combine the pairs into a single string and replace any '%20' encoded spaces with '+' characters
    const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // Set up the request
    XHR.open('POST', 'https://seamlessreg.on24.com/');

    XHR.onreadystatechange = function(){
      if(FollozeState.initialState.board.custom_attributes.on24_redirect == 'true'){
        window.open(`https://seamlessreg.on24.com/?eventid=${FollozeState.initialState.board.custom_attributes.on24_event_id}&key=${FollozeState.initialState.board.custom_attributes.on24_event_key}&firstname=${e.detail.ctaData.name}&lastname=${e.detail.ctaData.last_name}&company=${e.detail.ctaData.company}&email=${e.detail.ctaData.email}&jobtitle=${e.detail.ctaData.headline}`,'_blank');
        location.reload();
      }
    }

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Send the data
    XHR.send(urlEncodedData);
    console.log("Data sent:", urlEncodedData);
  }

  if(e.detail.ctaType == 'registration'){
    // Call the 'sendData' function with the form data object. Make sure that it corresponds to the ON24 fields.
    sendData({
      eventid: FollozeState.initialState.board.custom_attributes.on24_event_id,
      key: FollozeState.initialState.board.custom_attributes.on24_event_key,
      firstname: e.detail.ctaData.name,
      lastname: e.detail.ctaData.last_name,
      email: e.detail.ctaData.email,
      company: e.detail.ctaData.company,
      phone: e.detail.ctaData.phone,
      jobtitle: e.detail.ctaData.headline
    });
  }
}, false);
</script>
