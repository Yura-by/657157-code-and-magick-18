'use strict';

(function () {

  var EYES_DEFAULT_COLOR = 'black';
  var StartPositionSetup = {
    LEFT: '50%',
    TOP: '80px'
  };
  var KeyCodeName = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var inputUserName = userDialog.querySelector('.setup-user-name');
  var isInputUserNameInFocus = false;
  var setupForm = userDialog.querySelector('.setup-wizard-form');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var setupFireball = userDialog.querySelector('.setup-fireball-wrap');
  var inputFireball = setupFireball.querySelector('.setup-fireball-wrap input');
  var formSetup = userDialog.querySelector('.setup-wizard-form');
  var inputCoatColor = formSetup.querySelector('input[name="coat-color"]');
  var inputEyesColor = formSetup.querySelector('input[name="eyes-color"]');
  var wizardDefaultName = userDialog.querySelector('.setup-user-name');
  var defaultWizard = {
    name: wizardDefaultName.value,
    colorCoat: wizardCoat.style.fill,
    colorEyes: EYES_DEFAULT_COLOR,
    colorFireball: inputFireball.value
  };

  var wizard = new window.Wizard(defaultWizard);
  wizard.onChange = window.debounce(function () {
    window.render.updateWizards();
  });

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

    var wizardCopy = document.querySelector('svg');
    wizardCopy.querySelector('#wizard-coat').style.fill = wizard.coatColor;
    wizardCopy.querySelector('#wizard-eyes').style.fill = wizard.eyesColor;
    var wizardBase64Right = window.svg2base64(wizardCopy);

    wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');
    var wizardBase64Left = window.svg2base64(wizardCopy);
    window.wizardBase64Left = wizardBase64Left;
    window.restartGame(wizardBase64Right, wizardBase64Left);

  });

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
    if (evt.keyCode === KeyCodeName.ESC_KEYCODE && !isInputUserNameInFocus) {
      closePopup();
    }
  };

  var wizardCoatClickHandler = function () {
    wizardCoat.style.fill = wizard.changeCoatColor();
    inputCoatColor.value = wizardCoat.style.fill;
  };

  var wizardEyesClickHandler = function () {
    wizardEyes.style.fill = wizard.changeEyesColor();
    inputEyesColor.value = wizardEyes.style.fill;
  };

  var setupFireballClickHandler = function () {
    setupFireball.style.backgroundColor = wizard.changeFireballColor();
    inputFireball.value = setupFireball.style.backgroundColor;
  };

  var getStartPosition = function () {
    userDialog.style.left = StartPositionSetup.LEFT;
    userDialog.style.top = StartPositionSetup.TOP;
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
    window.render.startWizards();
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
    if (evt.keyCode === KeyCodeName.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCodeName.ENTER_KEYCODE) {
      closePopup();
    }
  });

  window.setup = {
    userDialog: userDialog,
    errorHandler: errorHandler,
    wizard: wizard
  };

})();
