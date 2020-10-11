function buildSelect(id, list) {
  var innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    innerHTML += makeOption(
      list[i].value,
      list[i].description,
      list[i].disabled
    );
  }
  document.getElementById(id).innerHTML = innerHTML;
}
function makeOption(value, description, disabled) {
  var option = "<option value='" + value + "'";
  if (disabled) {
    option += " disabled";
  }
  option += ">" + description + "</option>";
  return option;
}
function buildGUI(item, type) {
  if (type === "character") {
    buildCharacterGUI(item);
  } else if (type === "numeric") {
    buildNumberGUI(item);
  } else if (type === "words") {
    recursiveCall(
      function(i) {
        buildCharacterGUI(
          getCharItemByCharacter(item.characters.charAt(i - 1))
        );
      },
      function() {
        buildWordGUI(item);
      },
      1000,
      1,
      item.characters.length + 1,
      true
    );
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
function buildWordGUI(item) {
  document.getElementById("main").classList.remove("medium");
  document.getElementById("main").classList.remove("large");
  document.getElementById("main").classList.add("small");
  document.getElementById("detail1").classList.remove("offset");
  document.getElementById("detail2").classList.remove("offset");
  document.getElementById("main").innerHTML = item.characters;
  document.getElementById("detail1").innerHTML = getPronunciationString(
    item.characters
  );
  document.getElementById("detail2").innerHTML = item.english;
}
function revealAnswer() {
  document.getElementById("detail1").classList.remove("hidden");
  document.getElementById("detail2").classList.remove("hidden");
}
function hideAnswer() {
  document.getElementById("detail1").classList.add("hidden");
  document.getElementById("detail2").classList.add("hidden");
}
function enableRetry() {
  document.getElementById("retry").disabled = false;
}
function disableRetry() {
  document.getElementById("retry").disabled = true;
}
