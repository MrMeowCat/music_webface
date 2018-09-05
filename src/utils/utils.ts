export class Utils {
  public static delay = (() => {
    let timer: number = 0;
    return (cb: Function, ms: number): any => {
      clearTimeout(timer);
      timer = setTimeout(cb, ms);
    };
  })();
}
