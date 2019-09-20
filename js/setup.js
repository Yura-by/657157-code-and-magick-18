'use strict';

var userDialog = document.querySelector('.setup');
var similarWizardTemplte = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

userDialog.classList.remove('hidden');

var getRandomWizards = function (names, surnames, coats, eyes) {
  var wizards = [];

  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizard = {};

    wizard.name = names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)];
    wizard.coatColor = coats[Math.floor(Math.random() * coats.length)];
    wizard.eyesColor = eyes[Math.floor(Math.random() * eyes.length)];

    wizards.push(wizard);
  }

  return wizards;
};

var renderWizard = function (element) {
  var wizardElement = similarWizardTemplte.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = element.name;
  wizardElement.querySelector('.wizard-coat').style.fill = element.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = element.eyesColor;

  return wizardElement;
};

var addElement = function (names, surnames, coats, eyes) {
  var wizardsArray = getRandomWizards(names, surnames, coats, eyes);
  for (var j = 0; j < wizardsArray.length; j++) {
    fragment.appendChild(renderWizard(wizardsArray[j]));
  }
};

addElement(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
