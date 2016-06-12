var request = require('request');


module.exports = function(serviceId) {
  return new Promise(function(resolve, reject) {
    request(`http://api.citybik.es/v2/networks/${serviceId}`, function(error, response, body) {
      if (error) {
        return reject(error);
      }
      
      if (response.statusCode === 200) {
        resolve(true);
      } else if (response.statusCode === 404) {
        resolve(false);
      } else {
        reject(response.statusCode);
      }

    });
  });
}

