function getCharItemByCharacter(char) {
  var c = null;
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].type = "character") {
      c = sections[i].list.find(element => element.character === char);
      if (c) return c;
    }
  }
  if (!c) {
    c = new Character(0, '', '', '');
  }
  return c;
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
function load_lang(language, sections) {
  var first_section_initialized = false;
  for (var i = 0; i < language.sections.length; i++) {
    var temp_section = new Section(language.sections[i].value, language.sections[i].type);
    sections.push(temp_section);
    if (!language.sections[i].disabled) {
      if (!first_section_initialized) {
        section = temp_section.title;
        load_section(language.value, temp_section, function() {
          hideAnswer();
          item = getNotSoRandomListItem(temp_section.list, item_history, history_limit);
          buildGUI(item, getActiveSection().type);
        })
        first_section_initialized = true;
      } else {
        load_section(language.value, temp_section)
      }
    }
  }
}
function load_section(lang, section, custom_function) {
  load_asset(
    "https://learn-lang.glitch.me/assets/" + lang + "-" + section.title + ".JSON",
    section.list,
    custom_function
  );
}
