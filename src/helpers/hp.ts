import { Dimensions } from 'react-native';

const { height: viewportHeight } = Dimensions.get('window');

export const DEVICE_HEIGHT = viewportHeight;

/**
 * Calcular el porciento respecto a la altura del viewport
 * @param percentage Value to calcule
 */
export default function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
