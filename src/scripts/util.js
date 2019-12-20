/* Helper Functions */

async function getAuthStatus() {
    // const fetchURL = 'http://localhost:8000/auth/google'; // INCORRECT: This is incorrect because you can't fetch the literal route where you login! It returns the html page of the provider's login screen
    const fetchURL = 'http://localhost:8000/auth/login/success'; // In this route the back end tells us whether or not they have the user logged in and update the variables if so!
    return fetch(fetchURL, {    // Needs to return the whole promise or else it skips over and returns 'undefined'
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }     
    }).then(response => {
      if (response.status === 200) return response.json();
      throw new Error("failed to authenticate user");
    })
    .then(responseJson => {
      return {
        authenticated: true,
        user: responseJson.user
      }
    })
    .catch(error => {
      return {
        authenticated: false,
        error: "Failed to authenticate user"
      }
    });
}

/* Exports */
module.exports = {
    getAuthStatus: getAuthStatus,
}