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
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var inputUserName = userDialog.querySelector('.setup-user-name');
var isInputUserNameInFocus = false;
var setupForm = userDialog.querySelector('.setup-wizard-form');
var wizardCoat = userDialog.querySelector('.wizard-coat');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var setupFireball = userDialog.querySelector('.setup-fireball-wrap');
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var inputFireball = setupFireball.querySelector('.setup-fireball-wrap input');

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

var inputUserNameFocusHandler = function () {
  isInputUserNameInFocus = true;
};

var inputUserNameBlurHandler = function () {
  isInputUserNameInFocus = false;
};

var setupFormSubmitHandler = function (evt) {
  if (isInputUserNameInFocus) {
    evt.preventDefault();
  }
};

var popupEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !isInputUserNameInFocus) {
    closePopup();
  }
};

var wizardCoatClickHandler = function () {
  wizardCoat.style.fill = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

var wizardEyesClickHandler = function () {
  wizardEyes.style.fill = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
};

var setupFireballClickHandler = function () {
  var fireballColor = FIREBALL_COLOR[Math.floor(Math.random() * FIREBALL_COLOR.length)];
  setupFireball.style.backgroundColor = fireballColor;
  inputFireball.value = fireballColor;
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscHandler);
  inputUserName.addEventListener('focus', inputUserNameFocusHandler);
  inputUserName.addEventListener('blur', inputUserNameBlurHandler);
  setupForm.addEventListener('submit', setupFormSubmitHandler);
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  setupFireball.addEventListener('click', setupFireballClickHandler);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscHandler);
  inputUserName.removeEventListener('focus', inputUserNameFocusHandler);
  inputUserName.removeEventListener('blur', inputUserNameBlurHandler);
  setupForm.removeEventListener('submit', setupFormSubmitHandler);
  wizardCoat.removeEventListener('click', wizardCoatClickHandler);
  wizardEyes.removeEventListener('click', wizardEyesClickHandler);
  setupFireball.removeEventListener('click', setupFireballClickHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
