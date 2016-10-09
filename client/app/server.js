
function sendXHR(verb, resource, body, type, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      cb(xhr);
    } else {
      var responseText = xhr.responseText;
      console.log('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    console.log('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    console.log('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (type) {
    case 'none':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    case 'image':
      xhr.setRequestHeader("Content-Type", "image/png");
      xhr.send(body);
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

/**
* Posts a new idea scrap.
*/
export function postScrap(image, cb){
  sendXHR("POST", "/scraps", {"image": image}, "image", (xhr) => {
    cb(xhr.responseText);
  });
}

/**
* Posts a finished version of a scrap.
*/
export function postFinishedIdea(scrapID, image, cb){
  sendXHR("POST", "/scraps/" + scrapID, {"image": image}, "image", (xhr) => {
    cb(xhr.responseText);
  });
}

/**
* Gets image URLS for a scrap as well as its finished versions.
*/
export function getScrapData(scrapID,cb){
  sendXHR("Get", "/scraps/" + scrapID, undefined, "none", (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
* Requests a random scrap ID.
*/
export function getRandomScrap(cb){
  sendXHR("Get", "/scraps", undefined, "none", (xhr) => {
    cb(xhr.responseText);
  });
}
