import { JSDOM } from 'jsdom';
import { Response, Request, Headers, fetch } from 'whatwg-fetch';
import { render, cleanup, fireEvent } from '@testing-library/react'

const exposedProperties = ['window', 'navigator', 'document'];
const { document } = new JSDOM('').window;
global.document = document;
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;
global.render = render;
global.fireEvent = fireEvent

afterEach(cleanup)

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});