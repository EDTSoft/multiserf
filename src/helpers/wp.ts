import { Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

export const DEVICE_WIDTH = viewportWidth;

/**
 * Calcular el porciento respecto al ancho del viewport
 * @param percentage Value to calcule
 */
export default function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}