export default class Delay {
  private delay: number;

  private timerId: number | undefined;

  constructor(delay: number) {
    this.delay = delay;
  }

  public start(fn: Function) {
    this.stop();
    this.timerId = setTimeout(() => {
      fn();
    }, this.delay);
  }

  public stop() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
  }
}
