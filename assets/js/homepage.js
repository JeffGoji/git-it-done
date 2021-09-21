//query selector for userform on html page
const userFormEl = document.querySelector("#user-form");
//query selector for username on html page
const nameInputEl = document.querySelector("#username");
//Variables to refference DOM events to the HTML page:
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

let formSubmitHandler = function (event) {
  event.preventDefault();
  //Console log firs tto make sure stuff works before proceeding: console.log(event);

  //get value from input element:
  let username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub Username");
  }
};

let getUserRepos = function (user) {
  //Format the github api url:
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  //Make a request to the URL:
  fetch(apiUrl)
    .then(function (response) {
      //If/else statement for if response ok display data, else display error message:
      if (response.ok) {
        response.json().then(function (data) {
          //This logs the data and user to the console:
          console.log(user, data);
          //Displays the data and user on the page:
          displayRepos(data, user);
        });
      } else {
        alert("Error: Github User Not Found");
      }
    })

    //If connectivity issues displays message:
    .catch(function (error) {
      //Notice, this '.catch () getting chained onto the end of the '.then()
      alert("Unable to connect to Github");
    });

  //Create a function to DISPLAY THE REPOS, you are looking for a searchterm called "name".
  let displayRepos = function (repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    //Clears old content:
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //Check if the API returned any repos:
    if (repos.length === 0) {
      repoContainerEl.textContent = "No Repositories Found.";
      return;
    }

    //Loop over repos with a For loop
    for (let i = 0; i < repos.length; i++) {
      //format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;

      //Create a container for each repo in the DOM and also styles it:
      let repoEl = document.createElement("div");
      repoEl.classList =
        "list-item flex-row justify-space-between align center";

      //Create a span element to hol the repository name:
      let titleEl = document.createElement("span");
      titleEl.textContent = repoName;

      //Append the above to a container:
      repoEl.appendChild(titleEl);

      //added this last to display a little icon next to the number of issues to help indentify which repositories need help.
      //Create a status element:
      let statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";

      //Check if the current repo has issues or not:
      if (repos[i].open_issues_count > 0) {
        //danger icon displayed
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" +
          repos[i].open_issues_count +
          "issue(s)";
      } else {
        //Success icon displayed
        statusEl.innerHTML =
          "<i class='fas fa-check-square status-icon icon-success'></i>";
      }

      //Append the above statusEl icons to the container:
      repoEl.appendChild(statusEl);

      //Append the container to the DOM:
      repoContainerEl.appendChild(repoEl);
    }
  };
};
//Created a variable called response to fetch and display the info in the console log.
//   let response = fetch("https://api.github.com/users/octocat/repos");
//   console.log(response);
// };

//Insert GitHub username into the () below to see that user's github repositories.
//getUserRepos("jeffgoji");

userFormEl.addEventListener("submit", formSubmitHandler);
