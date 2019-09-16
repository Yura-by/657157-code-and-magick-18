'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var HAT_GAP = 20;
var HAT_HEIGHT = 60;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_BETWEEN_GAP = 40;
var GRAPH_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255)');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText('Ура, вы победили!', CLOUD_X + HAT_GAP, HAT_HEIGHT - FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + HAT_GAP, HAT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + BAR_BETWEEN_GAP + ((BAR_BETWEEN_GAP + BAR_WIDTH) * i), CLOUD_HEIGHT - GAP);
    var columnHeight = GRAPH_HEIGHT * times[i] / maxTime;
    ctx.fillStyle = 'hsl(210, ' + Math.random() * 100 + '%' + ', 50%)';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(CLOUD_X + BAR_BETWEEN_GAP + ((BAR_BETWEEN_GAP + BAR_WIDTH) * i), HAT_HEIGHT + GAP + FONT_GAP + (GRAPH_HEIGHT - columnHeight), BAR_WIDTH, columnHeight);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_BETWEEN_GAP + ((BAR_BETWEEN_GAP + BAR_WIDTH) * i), HAT_HEIGHT + FONT_GAP + (GAP / 2) + (GRAPH_HEIGHT - columnHeight));
  }
};
