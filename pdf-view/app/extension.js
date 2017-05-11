// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';

// screens imports
import Main from './screens/Main';

// themes imports


export const screens = {
  Main
};

export const themes = {

};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
