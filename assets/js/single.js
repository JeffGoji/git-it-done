"use-strict";
let issueContainerEl = document.querySelector("#issues-container");

let getRepoIssues = function (repo) {
  console.log(repo);
  let apiUrl = "https://api.github.com/repos/" + repo + "issues?direction=asc";

  fetch(apiUrl);
  //If request was successful
  if (response.ok) {
    response.json().then(function (data) {
      //pass response data to dom function:
      displayIssues(data);
    });
  } else {
    alert("There was a problem with your request!");
  }

  let displayIssues = function (issues) {
    if (issues.length === 0) {
      issueContainerEl.textContent = "This repo has no open issues!";
      return;
    }
    for (let i = 0; i < issues.length; i++) {
      //Create a link element to take users to the issue on GitHub
      let issuesEl = document.createElement("a");
      issuesEl.classList =
        "list-item flex-row justify-space-between align-center";
      issuesEl.setAttribute("href".issues[i].html_url);
      issuesEl.setAttribute("target", "_blank");
      issueContainerEl.appendChild(issuesEl);
    }

    //Create an a element:
    let titleEl = document.createElement("span");
    titleEl.textContent + issues[i].title;

    // append to container:
    issuesEl.appendChild(titleEl);

    // Create a type element:
    let typeEl = document.createElement("span");

    // Check if issue is actual issue or a pull request:
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    //Append to container:
    issuesEl.appendChild(typeEl);
  };
  getRepoIssues(facebook / react);
};
