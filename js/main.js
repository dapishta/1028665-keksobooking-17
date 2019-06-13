/* eslint-disable semi */
'use strict';

// Constants & global variables
var NUMBER_OF_ADS = 8;
var mapTag = document.querySelector('.map');

// Create random number from min max range.
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min)
};

// Get a string from array.
var getString = function (array, min, max) {
  var randomNumber = getRandomNumber(min, max);
  return array[randomNumber];
};

// Insert tag inside other tag
var insertTag = function (tagToBeInserted, tagWhereToInsert) {
  tagWhereToInsert.appendChild(tagToBeInserted);
};

// Remove class
var removeClass = function (tag, className) {
  tag.classList.remove(className);
}


// Create mock data

var types = ['palace', 'flat', 'house', 'bungalo'];

var createMockData = function (numberOfObjects) {
  var array = [];
  var mapWidth = mapTag.offsetWidth;
  for (var i = 0; i < numberOfObjects; i++) {
    array[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': getString(types, 0, types.length - 1)
      },

      'location': {
        'x': getRandomNumber(0, mapWidth),
        'y': getRandomNumber(130, 630),
      }
    }
  }
  return array;
};


// Найти ширину и высоту пина
var findObjectFromTemplateSize = function (object, whereToInsert, className) {
  whereToInsert.appendChild(object.cloneNode(true));
  var objects = whereToInsert.querySelectorAll(className);
  var objectSize = {
    width: objects[1].offsetWidth,
    height: objects[1].offsetHeight
  };
  whereToInsert.removeChild(objects[1]);
  return objectSize;
}

// Create DOM Elements
var createDOMElements = function (array) {
  var fragmentTag = document.createDocumentFragment();
  var pinTag = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var pinAvatarTag = pinTag.querySelector('img');
  var pinSize = findObjectFromTemplateSize(pinTag, mapTag, '.map__pin');


  for (var i = 0; i < array.length; i++) {
    pinAvatarTag.src = array[i].author.avatar;
    pinTag.style.left = array[i].location.x + pinSize.width / 2 + 'px';
    pinTag.style.top = array[i].location.y + pinSize.height + 'px';
    pinAvatarTag.alt = array[i].offer.type;
    fragmentTag.appendChild(pinTag.cloneNode(true));
  }
  return fragmentTag;
}

// Execute all
var renderPins = function (numberOfObjects) {
  var pinsListTag = document.querySelector('.map__pins');
  var pins = createMockData(numberOfObjects);
  var createdPinsFragmentTag = createDOMElements(pins);
  insertTag(createdPinsFragmentTag, pinsListTag);
  removeClass(mapTag, '.map--faded');
};

renderPins(NUMBER_OF_ADS);

