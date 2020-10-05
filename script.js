var alphabet = [];

function getRandomListItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function getNotSoRandomListItem(list, historyList, maxItems) {
  var clean = false;
  while (!clean) {
    var _item = getRandomListItem(alphabet);
    clean = true;
    if (historyList.length != 0) {
      if (_item.example.includes("no longer used")) {
        clean = false;
      } else {
        for (var i = 0; i < historyList.length; i++) {
          var previous_item = historyList[i];
          if (_item === previous_item) {
            clean = false;
            break;
          }
        }
      }
    }
  }
  while (historyList.length > maxItems) {
    historyList.shift();
  }
  return _item;
}
function retry() {
  console.log("retry");
}
function next() {
  if (history_index === 0) {
    char_history.push(item);
    item = getNotSoRandomListItem(alphabet, char_history, history_limit);
    hideAnswer();
    buildGUI(item);
    item_revealed = false;
  } else {
    history_index -= 1;
    if (history_index > 0) {
      var temp_item = char_history[char_history.length - history_index];
      buildGUI(temp_item);
    } else {
      if (!item_revealed) {
        hideAnswer();
      }
      buildGUI(item);
    }
  }
}
function previous() {
  history_index += 1;
  if (history_index > char_history.length) history_index = char_history.length;
  if (history_index != 0) {
    var temp_item = char_history[char_history.length - history_index];
    revealAnswer();
    buildGUI(temp_item);
  }
}
function reveal() {
  item_revealed = true;
  revealAnswer();
}
function revealAnswer() {
  document.getElementById("pronunciation").classList.remove("hidden");
  document.getElementById("example").classList.remove("hidden");
}
function hideAnswer() {
  document.getElementById("pronunciation").classList.add("hidden");
  document.getElementById("example").classList.add("hidden");
}
function buildGUI(item) {
  document.getElementById("character").innerHTML = item.character;
  document.getElementById("pronunciation").innerHTML = item.pronunciation;
  document.getElementById("example").innerHTML = item.example;
}
function init() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log(alphabet);
      alphabet = JSON.parse(xmlHttp.responseText);
      hideAnswer();
      item = getNotSoRandomListItem(alphabet, char_history, history_limit);
      buildGUI(item);
    }
  };
  xmlHttp.open(
    "GET",
    "http://learn-lang.glitch.me/assets/jap-alphabet.JSON",
    true
  ); // true for asynchronous
  xmlHttp.send(null);
}
function recursiveCall(func, delay, level, max_level) {
  if (level < max_level) {
     setTimeout(function() {
       func();
       recursiveCall(func, delay, level + 1, max_level);
     }, delay);
  }
}
var char_history = new Array();
var history_limit = 10;
var history_index = 0;
char_history.length = 0;
var item = { character: " ", pronunciation: " ", example: " " };
var item_revealed = false;
buildGUI(item);
init();
