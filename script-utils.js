var timeout = null;
function recursiveCall(func, donefunc, delay, level, max_level, done_on_last) {
  if (level < max_level) {
    if (func) {
      func(level);
    }
    timeout = setTimeout(function() {
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
function interrupt() {
  clearTimeout(timeout);
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
