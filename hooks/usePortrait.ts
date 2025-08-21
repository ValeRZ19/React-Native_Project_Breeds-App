import { useWindowDimensions } from 'react-native';

export const usePortrait = () => {
  const dimensions = useWindowDimensions();
  return dimensions.height >= dimensions.width;
};