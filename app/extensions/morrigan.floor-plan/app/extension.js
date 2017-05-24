// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';
import Plan from './screens/Plan';

export const screens = {
  Plan
};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
