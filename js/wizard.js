'use strict';

(function () {

  var Setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var getRandomElement = function (array) {
    return array[Math.floor(array.length * Math.random())];
  };

  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.colorCoat;
    this.eyesColor = data.colorEyes;
    this.fireballColor = data.colorFireball;
  };

  Wizard.prototype = {
    setName: function (name) {
      if (!name) {
        throw new Error('Имя не задано');
      }
      if (name.length > 30) {
        throw new Error('Недопустимое значение имени мага: ' + name);
      }
      this.name = name;
    },
    changeCoatColor: function () {
      var newColor = getRandomElement(Setup.COAT_COLORS);
      this.coatColor = newColor;
      this.onChange(this);
      return newColor;
    },
    changeEyesColor: function () {
      var newColor = getRandomElement(Setup.EYES_COLORS);
      this.eyesColor = newColor;
      this.onChange(this);
      return newColor;
    },
    changeFireballColor: function () {
      var newColor = getRandomElement(Setup.FIREBALL_COLORS);
      this.onChange(this);
      this.fireballColor = newColor;
      return newColor;
    },
    onChange: function (wizard) {
      return wizard;
    }
  };

  window.Wizard = Wizard;

})();
