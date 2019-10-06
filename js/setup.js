'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  window.setup = {
    userDialog: userDialog
  };
  var similarWizardTemplte = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_QUANTITY = 4;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var keyCodeName = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };
  var startPositionSetup = {
    LEFT: '50%',
    TOP: '80px'
  };
  var inputUserName = userDialog.querySelector('.setup-user-name');
  var isInputUserNameInFocus = false;
  var setupForm = userDialog.querySelector('.setup-wizard-form');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var setupFireball = userDialog.querySelector('.setup-fireball-wrap');
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var inputFireball = setupFireball.querySelector('.setup-fireball-wrap input');
  var formSetup = userDialog.querySelector('.setup-wizard-form');
  var inputCoatColor = formSetup.querySelector('input[name="coat-color"]');
  var inputEyesColor = formSetup.querySelector('input[name="eyes-color"]');


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: black;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    node.classList.add('error-message');
    document.body.insertAdjacentElement('afterbegin', node);
  };


  formSetup.addEventListener('submit', function (evt) {
    var form = new FormData(formSetup);
    window.backend.save(form, closePopup, errorHandler);
    evt.preventDefault();
  });

  var renderWizard = function (element) {
    var wizardElement = similarWizardTemplte.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.colorEyes;

    return wizardElement;
  };

  var addElement = function (wizards) {
    for (var j = 0; j < WIZARD_QUANTITY; j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }
  };

  var inputUserNameFocusHandler = function () {
    isInputUserNameInFocus = true;
  };

  var renderWizards = function () {
    if (similarListElement.children.length === 0) {
      window.backend.load(function (data) {
        addElement(data);
        similarListElement.appendChild(fragment);
        document.querySelector('.setup-similar').classList.remove('hidden');
      }, errorHandler);
    }
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
    if (evt.keyCode === keyCodeName.ESC_KEYCODE && !isInputUserNameInFocus) {
      closePopup();
    }
  };

  var wizardCoatClickHandler = function () {
    wizardCoat.style.fill = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
    inputCoatColor.value = wizardCoat.style.fill;
  };

  var wizardEyesClickHandler = function () {
    wizardEyes.style.fill = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
    inputEyesColor.value = wizardEyes.style.fill;
  };

  var setupFireballClickHandler = function () {
    var fireballColor = FIREBALL_COLOR[Math.floor(Math.random() * FIREBALL_COLOR.length)];
    setupFireball.style.backgroundColor = fireballColor;
    inputFireball.value = fireballColor;
  };

  var getStartPosition = function () {
    userDialog.style.left = startPositionSetup.LEFT;
    userDialog.style.top = startPositionSetup.TOP;
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
    getStartPosition();
    renderWizards();
  };

  var removeErrorMessages = function () {
    var errorMessages = document.body.querySelectorAll('.error-message');
    if (errorMessages.length > 0) {
      for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].remove();
      }
    }
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
    removeErrorMessages();
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keyCodeName.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keyCodeName.ENTER_KEYCODE) {
      closePopup();
    }
  });

})();
