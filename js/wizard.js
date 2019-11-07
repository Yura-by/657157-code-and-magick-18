'use strict';

(function () {

  var Setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var getRandomElement = function (array) {
    return array[Math.floor(array.length * Math.random())];
  };

  console.log(getRandomElement(Setup.COAT_COLORS));

  var Wizard = function (data) {
    this.name = data.name;
    this.colorCoat = data.colorCoat;
    this.colorEyes = data.colorEyes;
  };

  Wizard.prototype = {
    setName: function (name) {
      if (!name) {
        throw new Error("Имя не задано");
      }
      if (name.length > 30) {
        throw new Error('Недопустимое значение имени мага: ' + name);
      }
      this.name = name;
    },
    changeCoatColor: function () {

    }
  }

})();
