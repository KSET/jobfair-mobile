import GridScreen from './screens/GridScreen';
import DetailsScreen from './screens/DetailsScreenWithMediumPhoto';
import DetailsScreenWithLargePhoto from './screens/DetailsScreenWithLargePhoto';
import ListScreen from './screens/ListScreen';
import reducer from './redux';

export {
  reducer,
};

export const screens = {
  ListScreen,
  GridScreen,
  DetailsScreen,
  DetailsScreenWithLargePhoto,
};
