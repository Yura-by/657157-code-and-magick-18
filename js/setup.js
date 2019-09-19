'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplte = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();



similarListElement.appendChild(fragment);



var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var getRandomWizards = function (names, surnames, coats, eyes) {
  var wizards = [];

  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    var wizard = {};

    result.name = names[Math.floor(Math.random() * names.length)] +' '+ surnames[Math.floor(Math.random() * surnames.length)];
    result.coatColor = coats[Math.floor(Math.random() * coats.length)];
    result.eyesColor = eyes[Math.floor(Math.random() * eyes.length)];

    wizards.push(wizard);
  }

  return wizards;
}

var renderWizard = function() {
  var wizard = getRandomWizards(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);
  var wizardElement = similarWizardTemplte.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

var wizard = renderWizard();

