var language = "";
var section = "";
var item_history = new Array();
var history_limit = 10;
var history_index = 0;
var item = { id: 0, character: " ", pronunciation: " ", example: " " };
var item_revealed = false;
var config = [];
var sections = [];

function resetActive() {
  item_history = [];
  history_limit = 10;
  history_index = 0;
  item = { id: 0, character: " ", pronunciation: " ", example: " " };
  item_revealed = false;
}
function retry() {
  interrupt();
  buildGUI(item, getActiveSection().type);
}
function next() {
  interrupt();
  if (history_index === 0) {
    item_history.push(item);
    item = getNotSoRandomListItem(getActiveList(), item_history, history_limit);
    hideAnswer();
    buildGUI(item, getActiveSection().type);
    item_revealed = false;
  } else {
    history_index -= 1;
    if (history_index > 0) {
      var temp_item = item_history[item_history.length - history_index];
      buildGUI(temp_item, getActiveSection().type);
    } else {
      if (!item_revealed) {
        hideAnswer();
      }
      buildGUI(item, getActiveSection().type);
    }
  }
}
function previous() {
  interrupt();
  history_index += 1;
  if (history_index > item_history.length) history_index = item_history.length;
  if (history_index != 0) {
    var temp_item = item_history[item_history.length - history_index];
    revealAnswer();
    buildGUI(temp_item, getActiveSection().type);
  }
}
function reveal() {
  item_revealed = true;
  revealAnswer();
}
function init() {
  load_asset(
    "https://learn-lang.glitch.me/assets/config.JSON",
    config,
    function() {
      buildSelect("language", config);
      buildSelect("section", config[0].sections);
      load_lang(config[0], sections);
    }
  );
}
function sectionChange() {
  var e = document.getElementById("section");
  section = e.options[e.selectedIndex].value;
  console.log("change section -> " + section);
  resetActive();
  item = getRandomListItem(getActiveList());
  hideAnswer();
  buildGUI(item, getActiveSection().type);
}
function getActiveSection() {
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].title === section) {
      return sections[i];
    }
  }
}
function getActiveList() {
  var temp_section = getActiveSection();
  if (temp_section) {
    return temp_section.list;
  } else {
    return [];
  }
}
init();
