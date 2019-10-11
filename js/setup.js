'use strict';

(function () {

  var Setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };
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
  var colors = {
    coatColor: wizardCoat.style.fill,
    eyesColor: Setup.EYES_COLORS[0]
  };

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
    wizardCoat.style.fill = Setup.COAT_COLORS[Math.floor(Math.random() * Setup.COAT_COLORS.length)];
    inputCoatColor.value = wizardCoat.style.fill;
    colors.coatColor = wizardCoat.style.fill;
  };

  var wizardEyesClickHandler = function () {
    wizardEyes.style.fill = Setup.EYES_COLORS[Math.floor(Math.random() * Setup.EYES_COLORS.length)];
    inputEyesColor.value = wizardEyes.style.fill;
    colors.eyesColor = wizardEyes.style.fill;
  };

  var setupFireballClickHandler = function () {
    var fireballColor = Setup.FIREBALL_COLOR[Math.floor(Math.random() * Setup.FIREBALL_COLOR.length)];
    setupFireball.style.backgroundColor = fireballColor;
    inputFireball.value = fireballColor;
  };

  var getStartPosition = function () {
    userDialog.style.left = StartPositionSetup.LEFT;
    userDialog.style.top = StartPositionSetup.TOP;
  };

  var eyesClickHandler = window.debounce(function () {
    window.render.updateWizards();
  });

  var coatClickHandler = window.debounce(function () {
    window.render.updateWizards();
  });

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', popupEscHandler);
    inputUserName.addEventListener('focus', inputUserNameFocusHandler);
    inputUserName.addEventListener('blur', inputUserNameBlurHandler);
    setupForm.addEventListener('submit', setupFormSubmitHandler);
    wizardCoat.addEventListener('click', wizardCoatClickHandler);
    wizardCoat.addEventListener('click', coatClickHandler);
    wizardEyes.addEventListener('click', wizardEyesClickHandler);
    wizardEyes.addEventListener('click', eyesClickHandler);
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
    wizardCoat.removeEventListener('click', coatClickHandler);
    wizardEyes.removeEventListener('click', wizardEyesClickHandler);
    wizardEyes.removeEventListener('click', eyesClickHandler);
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
    colors: colors,
    errorHandler: errorHandler
  };

})();
