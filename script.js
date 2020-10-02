var alphabet = [
  { character: "あ", pronunciation: "a", example: "as in acute" },
  { character: "い", pronunciation: "i", example: "as in ink" },
  { character: "う", pronunciation: "oo", example: "as in tool" },
  { character: "え", pronunciation: "e", example: "as in elephant" },
  { character: "お", pronunciation: "o", example: "as in Omega" },
  { character: "は", pronunciation: "ha", example: "as in Hanukkah" },
  { character: "ひ", pronunciation: "hi", example: "as in history" },
  { character: "ふ", pronunciation: "fu", example: "as in Fuji" },
  { character: "へ", pronunciation: "he", example: "as in help" },
  { character: "ほ", pronunciation: "ho", example: "as in home" },
  { character: "か", pronunciation: "kka", example: "as in Hanukkah" },
  { character: "き", pronunciation: "ki", example: "as in kiss" },
  { character: "く", pronunciation: "ko", example: "as in cook" },
  { character: "け", pronunciation: "ke", example: "as in kept" },
  { character: "こ", pronunciation: "ko", example: "as in Korea" },
  { character: "ま", pronunciation: "ma", example: "as in machine" },
  { character: "み", pronunciation: "mi", example: "as in ministry" },
  { character: "む", pronunciation: "mu", example: "as in moon" },
  { character: "め", pronunciation: "me", example: "as in melody" },
  { character: "も", pronunciation: "mo", example: "as in Monaco" },
  { character: "さ", pronunciation: "sa", example: "as in sauna" },
  { character: "し", pronunciation: "shi", example: "as in ship" },
  { character: "す", pronunciation: "su", example: "as in Sumatra" },
  { character: "せ", pronunciation: "se", example: "as in Senegal" },
  { character: "そ", pronunciation: "so", example: "as in Somalia" },
  { character: "や", pronunciation: "ya", example: "as in yard" },
  { character: "ゆ", pronunciation: "yu", example: "as in you" },
  { character: "よ", pronunciation: "yo", example: "as in yoga" },
  { character: "た", pronunciation: "ta", example: "as in taught" },
  { character: "ち", pronunciation: "chi", example: "as in chin" },
  { character: "つ", pronunciation: "tsu", example: "as in tsunami" },
  { character: "て", pronunciation: "te", example: "as in telephone" },
  { character: "と", pronunciation: "to", example: "as in Toshiba" },
  { character: "ら", pronunciation: "ra", example: "as in Sahara" },
  { character: "り", pronunciation: "ri", example: "as in ring" },
  { character: "る", pronunciation: "ru", example: "as in ruby" },
  { character: "れ", pronunciation: "re", example: "as in rest" },
  { character: "ろ", pronunciation: "ro", example: "as in Romania" },
  { character: "な", pronunciation: "na", example: "as in knot" },
  { character: "に", pronunciation: "ni", example: "as in knit" },
  { character: "ぬ", pronunciation: "nu", example: "as in nuke" },
  { character: "ね", pronunciation: "ne", example: "as in nest" },
  { character: "の", pronunciation: "no", example: "as in Norway" },
  { character: "わ", pronunciation: "wa", example: "as in Washington" },
  {
    character: "ゐ",
    pronunciation: "wi",
    example: "as in Wii (no longer used)"
  },
  { character: "ん", pronunciation: "n", example: "as in ton" },
  {
    character: "ゑ",
    pronunciation: "we",
    example: "as in west (no longer used)"
  },
  { character: "を", pronunciation: "wo", example: "as in wolf" }
];

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
  while(historyList.length > maxItems) {
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
      var temp_item = char_history[char_history.length-history_index];
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
    var temp_item = char_history[char_history.length-history_index];
	revealAnswer();
    buildGUI(temp_item);
  }
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
var char_history = new Array();
var history_limit = 10;
var history_index = 0;
char_history.length = 0;
var item = getNotSoRandomListItem(alphabet, char_history, history_limit);
var item_revealed = false;
hideAnswer();
buildGUI(item);
