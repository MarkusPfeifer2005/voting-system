function activateImg (idx) {
  document.getElementById("btn_" + idx + "0").style.visibility = "hidden";
  document.getElementById("btn_" + idx + "1").style.visibility = "hidden";
  document.getElementById("overlay_" + idx).style.background = "rgba(0, 0, 0, 0)";
  document.getElementById("overlay_" + idx).style.zIndex = "-1";
  document.getElementById("overlay_" + idx).style.opacity = "0";
};

function deactivateImg (idx) {
  document.getElementById("btn_" + idx + "0").style.visibility = "hidden";
  document.getElementById("btn_" + idx + "1").style.visibility = "hidden";
  document.getElementById("overlay_" + idx).style.background = "rgba(0, 0, 0, 0.5)";
  document.getElementById("overlay_" + idx).style.zIndex = "1";
  document.getElementById("overlay_" + idx).style.opacity = "1";
};

function cancelvoting () {
  for (inactive in inactives) {
    if (! inactives[inactive]) {
      activateImg(inactive);
    };
  };
};

function voteforPerson (personIdx) {
  scores[personIdx]++;
  cancelvoting();
};

function displayScores () {
  scoresIsOn = true;
  document.getElementById("dropdownMenuButton1").disabled = false;
  document.getElementById("table").style.visibility = "visible";
  document.getElementById("btn_new_initiate").innerHTML = "START";
  document.getElementById("btn_new_initiate").onclick = newRound;
  for (row in scores) {
    document.getElementById("rank_" + row).innerHTML = scores[row];
    document.getElementById("user_" + row).innerHTML = users[row];
    if (scores[row] === Math.max.apply(Math, scores)) {
      document.getElementById("row_" + row).className = "table-danger";
    };
  };
  for (idx in users) {
    deactivateImg(idx);
  };
};

function newRound () {
  scoresIsOn = false;
  document.getElementById("dropdownMenuButton1").disabled = true;
  document.getElementById("table").style.visibility = "hidden";
  scores = [0, 0, 0, 0, 0, 0, 0, 0];
  cancelvoting();
  document.getElementById("btn_new_initiate").innerHTML = "END";
  document.getElementById("btn_new_initiate").onclick = displayScores;
  for (row in scores) {
    document.getElementById("rank_" + row).innerHTML = "_";
    document.getElementById("user_" + row).innerHTML = "_";
    document.getElementById("row_" + row).classList.remove("table-danger");
  };
};

function clickImage (imageIdx) {
  for (i in scores) {
    if (i != imageIdx) {
      document.getElementById("btn_" + i + "0").style.visibility = "hidden";
      document.getElementById("btn_" + i + "1").style.visibility = "hidden";
      document.getElementById("overlay_" + i).style.background = "rgba(0, 0, 0, 0.5)";
      document.getElementById("overlay_" + i).style.zIndex = "1";
      document.getElementById("overlay_" + i).style.opacity = "1";
    } else {
      document.getElementById("btn_" + imageIdx + "0").style.visibility = "visible";
      document.getElementById("btn_" + imageIdx + "1").style.visibility = "visible";
      document.getElementById("overlay_" + imageIdx).style.zIndex = "1";
      document.getElementById("overlay_" + imageIdx).style.opacity = "1";
    };
  };
};

function changeUserStatus(idx) {
  if (inactives[idx]) {
    inactives[idx] = false;  // false means unlocked
    document.getElementById("lock_" + idx).className = "bi bi-unlock";
    document.getElementById("p_" + idx).setAttribute("d", "M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z");
    if (!scoresIsOn) {
      activateImg(idx);
    };
    document.getElementById("row_" + idx).className = "";
    document.getElementById("rank_" + idx).innerHTML = scores[idx];
    document.getElementById("user_" + idx).innerHTML = users[idx];
    for (row in scores) {
      document.getElementById("rank_" + row).innerHTML = scores[row];
      document.getElementById("user_" + row).innerHTML = users[row];
      if (scores[row] === Math.max.apply(Math, scores) && !inactives[row]) {
        document.getElementById("row_" + row).className = "table-danger";
      };
    };
    } else {
    inactives[idx] = true;  // true means locked
    document.getElementById("lock_" + idx).className = "bi bi-lock";
    document.getElementById("p_" + idx).setAttribute("d", "M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z");
    deactivateImg(idx);
    document.getElementById("row_" + idx).className = "table-secondary";
    document.getElementById("rank_" + idx).innerHTML = scores[idx];
    document.getElementById("user_" + idx).innerHTML = users[idx];
  };
};
