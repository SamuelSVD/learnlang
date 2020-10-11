class Character {
  constructor(id, character, pronunciation, example) {
    this.id = id;
    this.character = character;
    this.pronunciation = pronunciation;
    this.example = example;
  }
}
class Numeric {
  constructor(id,numeric, characters, pronunciation, english) {
    this.id = id;
    this.numeric = numeric;
    this.characters = characters;
    this.pronunciation = pronunciation;
    this.english = english;
  }
}
class Word {
  constructor(id, characters, english) {
    this.id = id;
    this.characters = characters;
    this.english = english;
  }
}
class Section {
  constructor(title, type) {
    this.title = title;
    this.list = [];
    this.type = type;
  }
}