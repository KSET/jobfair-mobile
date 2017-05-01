// This file is managed by Shoutem CLI
// You should not change it
import pack from './package.json';
import Image from './screens/Image';

export const screens = {
  Image
};

export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}
