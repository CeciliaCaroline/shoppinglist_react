// import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';


configure({adapter: new Adapter()});


let localStorageMock = ( () => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key];
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });