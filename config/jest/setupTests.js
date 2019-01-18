import { JSDOM } from 'jsdom';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const exposedProperties = ['window', 'navigator', 'document'];
const { document } = new JSDOM('').window;
global.document = document;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});