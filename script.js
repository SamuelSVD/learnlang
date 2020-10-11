var language = "jap";
var section = "alphabet";
var alphabet = [];
var numbers = [];
var words = [];
var item_history = new Array();
var history_limit = 10;
var history_index = 0;
var item = { id: 0, character: " ", pronunciation: " ", example: " " };
var item_revealed = false;
var scrap_string = '';
function getCharItemByCharacter(char) {
  var c = alphabet.find(element => element.character === char);
  console.log(c);
  return c;
}
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
    if ((historyList.length != 0) && (historyList.length < list.length)) {
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
function enableRetry() {
  document.getElementById("retry").disabled=false;
}
function disableRetry() {
  document.getElementById("retry").disabled=true;
}
function retry() {
  buildGUI(item);
}
function next() {
  if (history_index === 0) {
    item_history.push(item);
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
  } else if (section === "words") {
    disableRetry();
    recursiveCall (
      function(i) {
        buildCharacterGUI(getCharItemByCharacter(item.characters.charAt(i-1)));
      },
      function() {
        buildWordGUI(item);
        enableRetry();
      },
      1000,
      1,
      item.characters.length+1,
      true
    )
  }
}
function buildCharacterGUI(item) {
  document.getElementById("main").classList.remove("small");
  document.getElementById("main").classList.remove("medium");
  document.getElementById("main").classList.add("large");
  document.getElementById("detail1").classList.add("offset");
  document.getElementById("detail2").classList.add("offset");
  document.getElementById("main").innerHTML = item.character;
  document.getElementById("detail1").innerHTML = item.pronunciation;
  document.getElementById("detail2").innerHTML = item.example;
}
function buildNumberGUI(item) {
  document.getElementById("main").classList.remove("small");
  document.getElementById("main").classList.remove("large");
  document.getElementById("main").classList.add("medium");
  document.getElementById("detail1").classList.remove("offset");
  document.getElementById("detail2").classList.remove("offset");
  document.getElementById("main").innerHTML = item.characters;
  document.getElementById("detail1").innerHTML = item.pronunciation;
  document.getElementById("detail2").innerHTML =
    item.numeric + ":" + item.english;
}
function getPronunciationString(word) {
  var _returnString = '';
  for (var i = 0; i < word.length; i++) {
    var _item = getCharItemByCharacter(word.charAt(i));
    if ((_item) && (i != 0)) {
      _returnString += '.';
    }
    if (_item) {
      _returnString += _item.pronunciation;
    } else {
      _returnString += ' ';
    }
  }
  return _returnString;
}
function buildWordGUI(item) {
  document.getElementById("main").classList.remove("medium");
  document.getElementById("main").classList.remove("large");
  document.getElementById("main").classList.add("small");
  document.getElementById("detail1").classList.remove("offset");
  document.getElementById("detail2").classList.remove("offset");
  document.getElementById("main").innerHTML = item.characters;
  document.getElementById("detail1").innerHTML = getPronunciationString(item.characters);
  document.getElementById("detail2").innerHTML = item.english;
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
  load_asset(
    "https://learn-lang.glitch.me/assets/" + lang + "-words.JSON",
    words
  );
}
function recursiveCall(func, donefunc, delay, level, max_level, done_on_last) {
  if (level < max_level) {
    if (func) {
      func(level);
    }
    setTimeout(function() {
      recursiveCall(func, donefunc, delay, level + 1, max_level, done_on_last);
    }, delay);
  } else {
    if ((done_on_last) && (donefunc)) {
       donefunc();
    }
  }
  if (((level+1) === max_level) && !done_on_last){
    if (donefunc) {
       donefunc();
    }
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
  } else if (section === "words")  {
    return words;
  } else {
    return [];
  }
}
init();
