let getUserRepos = function (user) {
  //Format the github api url:
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  //Make a request to the URL:
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

//Created a variable called response to fetch and display the info in the console log.
//   let response = fetch("https://api.github.com/users/octocat/repos");
//   console.log(response);
// };

//Insert GitHub username into the () below to see that user's github repositories.
getUserRepos("jeffgoji");
