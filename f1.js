let users = [];

async function fetchUsers() {
  const count = +document.getElementById("userCount").value; 
  const errorMsg = document.getElementById("errorMsg");
  const userList = document.getElementById("userList");

  errorMsg.textContent = "";
  document.getElementById("header").style.display = "none";
  userList.innerHTML = "";

  if (!count || count < 1 || count > 1000) {
    errorMsg.textContent = "Enter a number between 1 and 1000.";
    return;
  }

  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();
    users = data.results;
    renderUsers();
  } catch {
    errorMsg.textContent = "Could not fetch users. Check internet connection.";
  }
}

function renderUsers() {
  const nameType = document.getElementById("nameType").value;
  const userList = document.getElementById("userList");

  userList.innerHTML = users.map(user => `
    <div class="row">
      <div class="cell">${user.name[nameType]}</div>
      <div class="cell">${user.gender}</div>
      <div class="cell">${user.email}</div>
      <div class="cell">${user.location.country}</div>
    </div>
  `).join("");

  if (users.length) document.getElementById("header").style.display = "flex";
}
