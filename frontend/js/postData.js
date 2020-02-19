// process & post form data
function postData(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "X-CSRFToken": csrftoken,
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  }).then( response => response.json())
  .then(response => console.log('Success: ', JSON.stringify(response)))
  .catch(e => console.log('Error: ', e));
}
