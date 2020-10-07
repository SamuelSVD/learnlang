var language = "jap";
var section = "alphabet";
var alphabet = [];
var numbers = [];
var item_history = new Array();
var history_limit = 10;
var history_index = 0;
var item = { id: 0, character: " ", pronunciation: " ", example: " " };
var item_revealed = false;

function resetActive() {
  item_history = [];
  history_limit = 10;
  history_index = 0;
  item = { id: 0, character: " ", pronunciation: " ", example: " " };
  item_revealed = false;
}
function getRandomListItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function getNotSoRandomListItem(list, historyList, maxItems) {
  var clean = false;
  while (!clean) {
    var _item = getRandomListItem(getActiveList());
    clean = true;
    if (historyList.length != 0) {
      for (var i = 0; i < historyList.length; i++) {
        var previous_item = historyList[i];
        if (_item === previous_item) {
          clean = false;
          break;
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
    item_history.push(item);
    console.log(item_history);
    item = getNotSoRandomListItem(getActiveList(), item_history, history_limit);
    hideAnswer();
    buildGUI(item);
    item_revealed = false;
  } else {
    history_index -= 1;
    if (history_index > 0) {
      var temp_item = item_history[item_history.length - history_index];
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
  if (history_index > item_history.length) history_index = item_history.length;
  if (history_index != 0) {
    var temp_item = item_history[item_history.length - history_index];
    revealAnswer();
    buildGUI(temp_item);
  }
}
function reveal() {
  item_revealed = true;
  revealAnswer();
}
function revealAnswer() {
  document.getElementById("detail1").classList.remove("hidden");
  document.getElementById("detail2").classList.remove("hidden");
}
function hideAnswer() {
  document.getElementById("detail1").classList.add("hidden");
  document.getElementById("detail2").classList.add("hidden");
}
function buildGUI(item) {
  if (section === "alphabet") {
    buildCharacterGUI(item);
  } else if (section === "numbers") {
    buildNumberGUI(item);
  }
}
function buildCharacterGUI(item) {
  document.getElementById("main").classList.remove("medium");
  document.getElementById("main").classList.add("large");
  document.getElementById("detail1").classList.add("offset");
  document.getElementById("detail2").classList.add("offset");
  document.getElementById("main").innerHTML = item.character;
  document.getElementById("detail1").innerHTML = item.pronunciation;
  document.getElementById("detail2").innerHTML = item.example;
}
function buildNumberGUI(item) {
  document.getElementById("main").classList.remove("large");
  document.getElementById("main").classList.add("medium");
  document.getElementById("detail1").classList.remove("offset");
  document.getElementById("detail2").classList.remove("offset");
  document.getElementById("main").innerHTML = item.characters;
  document.getElementById("detail1").innerHTML = item.pronunciation;
  document.getElementById("detail2").innerHTML =
    item.numeric + ":" + item.english;
}
function init() {
  load_lang(language);
}
function load_asset(url, outputList, customFunction = null) {
  var httpGET = new XMLHttpRequest();
  httpGET.onreadystatechange = function() {
    if (httpGET.readyState == 4 && httpGET.status == 200) {
      outputList.push.apply(outputList, JSON.parse(httpGET.responseText));
      if (customFunction) {
        customFunction();
      }
    }
  };
  httpGET.open("GET", url, true); // true for asynchronous
  httpGET.send(null);
}
function load_lang(lang) {
  load_asset(
    "https://learn-lang.glitch.me/assets/" + lang + "-alphabet.JSON",
    alphabet,
    function() {
      hideAnswer();
      item = getNotSoRandomListItem(alphabet, item_history, history_limit);
      buildGUI(item);
    }
  );
  load_asset(
    "https://learn-lang.glitch.me/assets/" + lang + "-numbers.JSON",
    numbers
  );
}
function recursiveCall(func, delay, level, max_level) {
  if (level < max_level) {
    setTimeout(function() {
      func();
      recursiveCall(func, delay, level + 1, max_level);
    }, delay);
  }
}
function sectionChange() {
  var e = document.getElementById("section");
  section = e.options[e.selectedIndex].text;
  resetActive();
  item = getRandomListItem(getActiveList());
  hideAnswer();
  buildGUI(item);
}
function getActiveList() {
  if (section === "alphabet") {
    return alphabet;
  } else if (section === "numbers") {
    return numbers;
  } else {
    return [];
  }
}
init();
