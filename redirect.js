var country_code = "JP";
var destination_domain = 'domain.jp';

if(findGetParameter('ref') === country_code) {
  document.cookie = "noredirect=true";
}

getJSON('redirect_json.php', function(err, data) {

  var destination = 'DESTINATION_URL_HERE';
  var noredirect = document.cookie.replace(/(?:(?:^|.*;\s*)noredirect\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  console.log(window.location);
  
  /* redirect country_code to destination, and set a cookie to only redirect one time. */
  if(data.country_code === country_code &&
    window.location.pathname !== destination &&
    noredirect !== 'true' &&
    window.location.hostname !== destination_domain) { // check that we are not already at destination domain/hostname
    document.cookie = "noredirect=true"; // only redirect once
    window.location = destination; // redirect to destination
  }

});

// function to grab the json data from url.
var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

// function to retrieve a url get parameter by name.
var findGetParameter = function(parameterName) {
  var result = null,
    tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}
