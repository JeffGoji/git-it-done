let repoNameEl = document.querySelector("#repo-name");
let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");
let queryString = document.location.search;

let getRepoIssues = function (repo) {
  // format the github api url
  let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        // check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      //If not successful, redicrect to homepage:
      console.log(response);
      //Alert first to tell them what is happening:
      alert(
        "There was a problem with your request! Sending you back to homepage"
      );
      // Send them back to homepage:
      document.location.replace("./index.html");
    }
  });
};

let displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  // loop over given issues
  for (let i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    let issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // create span to hold issue title
    let titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    let typeEl = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);

    // append to the dom
    issueContainerEl.appendChild(issueEl);
  }
};

let displayWarning = function (repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  // create link element
  let linkEl = document.createElement("a");
  linkEl.textContent = "GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

//Using the split method to extract the query value:
let repoName = queryString.split("=")[1];
console.log(repoName);

let getRepoName = function () {
  let queryString = document.location.search;
  let repoName = queryString.split("=")[1];
  getRepoIssues(repoName);
  repoNameEl.textContent = repoName;
  //Handle errors for correct query:
  if (repoName) {
    //displays repo name on teh page of query worked.
    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
    //if no repor was given it will redirect to homepage:
  } else {
    document.location.replace("./index.html");
  }
};

getRepoIssues(repoName);
