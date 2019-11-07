'use strict';

(function () {

  var WIZARD_QUANTITY = 4;
  var similarWizardTemplte = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = [];

  var renderWizard = function (element) {
    var wizardElement = similarWizardTemplte.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.eyesColor;

    return wizardElement;
  };

  var addElement = function (arr) {
    var takeNumber = arr.length > WIZARD_QUANTITY ? WIZARD_QUANTITY : arr.length;
    arr.slice(0, takeNumber).map(function (it) {
      return new window.Wizard(it);
    }).forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
  };

  var renderWizards = function (data) {
    addElement(data);
    if (similarListElement.children.length > 0) {
      similarListElement.innerHTML = '';
    }
    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var successHandler = function (data) {
    wizards = data;
    window.render.wizards = wizards;
    updateWizards(wizards);
  };

  var startWizards = function () {
    if (similarListElement.children.length === 0) {
      window.backend.load(successHandler, window.setup.errorHandler);
    }
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.setup.wizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.setup.wizard.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(window.render.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.render = {
    startWizards: startWizards,
    updateWizards: updateWizards
  };

})();
