/*
 * Copyright Folloze. Licensed under the MIT License.
 * See license text at https://github.com/edinh-folloze/Folloze/blob/main/LICENSE.md
 */

/*
 * Replace FORM_HANDLER_URL:
 * https://help.salesforce.com/s/articleView?id=sf.pardot_form_handlers_integrate_form_handler.htm
 */
var formUrl = 'FORM_HANDLER_URL';

// Start Script
// Listen for 'Folloze.ctaSubmit' custom event when a user submits a form on the website
document.addEventListener('Folloze.ctaSubmit', function (e) {

  // Function to send data to the server
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
    XHR.open('POST', formUrl);

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Define what happens on successful data submission
    XHR.addEventListener('load', (event) => {
      console.log('Data sent and response loaded');
    });

    // Define what happens in case of error
    XHR.addEventListener('error', (event) => {
      console.error('Error sending data');
    });

    // Send the data
    XHR.send(urlEncodedData);
    console.log("Data sent:", urlEncodedData);
  }

  // Get URL parameters such as UTM params
  const urlParams = new URLSearchParams(window.location.search);

  /*
   * Call sendData and replace the Javascript object with the fields corresponding to your Pardot fields.
   *
   * Refer to documentation for creating the form data object:
   * 
   */
  sendData({
    first_name: e.detail.ctaData.name ?? '',
    last_name: e.detail.ctaData.last_name ?? '',
    email: e.detail.ctaData.email ?? '',
    phone: e.detail.ctaData.phone ?? '',
    company: e.detail.ctaData.company ?? '',
    job_title: e.detail.ctaData.job_title ?? '',
    country: e.detail.ctaData.country ?? '',
    state: e.detail.ctaData.state ?? '',
    referral_source: e.detail.ctaData.referral_source ?? '',
    form_type: FollozeState.initialState.board.custom_attributes.form_type ?? '';
    campaign_id: FollozeState.initialState.board.custom_attributes.campaign_id ?? '';
    utm_content: urlParams.get('utm_content') ?? '',
    utm_medium: urlParams.get('utm_medium') ?? '',
    utm_source: urlParams.get('utm_source') ?? ''
  });
}, false);
