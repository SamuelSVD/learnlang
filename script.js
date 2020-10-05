var language = "jap";
var alphabet = [];
var numbers = [];

function getRandomListItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function getNotSoRandomListItem(list, historyList, maxItems) {
  var clean = false;
  while (!clean) {
    var _item = getRandomListItem(alphabet);
    clean = true;
    if (historyList.length != 0) {
      for (var i = 0; i < historyList.length; i++) {
        var previous_item = historyList[i];
        if (_item.id === previous_item.id) {
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
    char_history.push(item);
    item = getNotSoRandomListItem(alphabet, char_history, history_limit);
    hideAnswer();
    buildCharacterGUI(item);
    item_revealed = false;
  } else {
    history_index -= 1;
    if (history_index > 0) {
      var temp_item = char_history[char_history.length - history_index];
      buildCharacterGUI(temp_item);
    } else {
      if (!item_revealed) {
        hideAnswer();
      }
      buildCharacterGUI(item);
    }
  }
}
function previous() {
  history_index += 1;
  if (history_index > char_history.length) history_index = char_history.length;
  if (history_index != 0) {
    var temp_item = char_history[char_history.length - history_index];
    revealAnswer();
    buildCharacterGUI(temp_item);
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
function buildCharacterGUI(item) {
  document.getElementById("main").innerHTML = item.character;
  document.getElementById("detail1").innerHTML = item.pronunciation;
  document.getElementById("detail2").innerHTML = item.example;
}
function init() {
  load_lang(language);
}
function load_lang(lang) {
  var alphabetGET = new XMLHttpRequest();
  alphabetGET.onreadystatechange = function() {
    if (alphabetGET.readyState == 4 && alphabetGET.status == 200) {
      alphabet = JSON.parse(alphabetGET.responseText);
      hideAnswer();
      item = getNotSoRandomListItem(alphabet, char_history, history_limit);
      buildCharacterGUI(item);
    }
  };
  alphabetGET.open(
    "GET",
    "https://learn-lang.glitch.me/assets/" + lang + "-alphabet.JSON",
    true
  ); // true for asynchronous
  alphabetGET.send(null);

  var numbersGET = new XMLHttpRequest();
  numbersGET.onreadystatechange = function() {
    if (numbersGET.readyState == 4 && numbersGET.status == 200) {
      numbers = JSON.parse(numbersGET.responseText);
      console.log(numbers);
    }
  };
  numbersGET.open(
    "GET",
    "https://learn-lang.glitch.me/assets/" + lang + "-numbers.JSON",
    true
  ); // true for asynchronous
  numbersGET.send(null);
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
  console.log(e.options[e.selectedIndex].text);
}
var char_history = new Array();
var history_limit = 10;
var history_index = 0;
char_history.length = 0;
var item = { character: " ", pronunciation: " ", example: " " };
var item_revealed = false;
init();
