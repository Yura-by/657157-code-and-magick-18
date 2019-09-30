'use strict';

(function () {

  var upLoad = window.setup.userDialog.querySelector('.upload');
  var inputAvatar = upLoad.querySelector('input');

  upLoad.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.userDialog.style.left = (window.setup.userDialog.offsetLeft) - shift.x + 'px';
      window.setup.userDialog.style.top = (window.setup.userDialog.offsetTop) - shift.y + 'px';

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var inputAvatarClickHandler = function (clickEvt) {
          clickEvt.preventDefault();

          inputAvatar.removeEventListener('click', inputAvatarClickHandler);
        };

        inputAvatar.addEventListener('click', inputAvatarClickHandler);
      }
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

})();
