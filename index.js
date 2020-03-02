const userContainer = document.getElementById("js-userContainer");
const errorMessage = document.getElementById("js-errorMessage");
const avatar = document.getElementById("js-avatar");
const name = document.getElementById("js-name");
const login = document.getElementById("js-login");
const bio = document.getElementById("js-bio");
const reposContainer = document.getElementById("js-repos");
const button = document.getElementById("js-button");
const inputContent = document.getElementById("js-input");

const handleSearch = () => {
  const input = inputContent.value;
  if (input !== "") {
    getGithubUser(input);
    getGithubRepos(input);
  }
};

const handleKey = ev => {
  if (ev.key === "Enter") {
    handleSearch();
  }
};

const getGithubUser = input => {
  const url = `https://api.github.com/users/${input}`;
  const xhrUser = new XMLHttpRequest();
  xhrUser.open("GET", url, true);
  xhrUser.onreadystatechange = function() {
    if (xhrUser.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        displayUser(xhrUser);
      } else {
        displayError();
      }
    }
  };
  xhrUser.send();
};

const getGithubRepos = input => {
  const url = `https://api.github.com/users/${input}/repos`;
  const xhrRepos = new XMLHttpRequest();
  xhrRepos.open("GET", url, true);
  xhrRepos.onreadystatechange = function() {
    if (xhrRepos.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        displayRepos(xhrRepos);
      }
    }
  };
  xhrRepos.send();
};

const displayUser = xhrUser => {
  const user = JSON.parse(xhrUser.responseText);
  userContainer.classList.add("is-shown");
  errorMessage.classList.remove("is-shown");
  avatar.src = user.avatar_url;
  name.textContent = user.name;
  bio.textContent = user.bio;
  login.textContent = `@${user.login}`;
};

const displayRepos = xhrRepos => {
  let reposList = "";
  const repos = JSON.parse(xhrRepos.responseText);
  repos.forEach(repo => {
    reposList += `<li>${repo.name}<div class="user__repositories__list__stats"><ion-icon name="star"></ion-icon>
    <span>${repo.stargazers_count}</span><ion-icon name="git-branch-outline"></ion-icon>
    <span>${repo.forks}</span></div>
    </li>`;
  });
  reposContainer.innerHTML = reposList;
};

const displayError = () => {
  errorMessage.classList.add("is-shown");
  userContainer.classList.remove("is-shown");
};

button.addEventListener("click", handleSearch);
inputContent.addEventListener("keydown", handleKey);
