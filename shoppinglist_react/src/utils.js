// import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';


configure({adapter: new Adapter()});


let localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });