export class Utils {

  /**
   * Generates random integer between min (inclusive) and max (exclusive).
   * Returns 0 if min and max are incorrect.
   * @param min
   * @param max
   */
  public static randomInt = (min: number, max: number): number => {
    if (min >= max) {
      return 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  };
}
