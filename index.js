/**
 * A termial progress bar tools for node js
 * @author huobn
 * @version 0.0.1
 */

import chalk from "chalk";

class Progress {
  options = {
    width: 50,
    uncompletedSymbol: "░",
    completedSymbol: "█",
    value: 0,
    total: 100,
    color: "#fff",
    title: "progress-bar:",
    clearConsole: false,
  };

  $$previousProgressWidth = 0;

  constructor(params) {
    this.options = Object.assign(this.options, params);
    this._render = this._renderItr();
    this.tick(0);
  }

  *_renderItr() {
    const progressBar = new Array(this.options.width).fill(
      this.options.uncompletedSymbol
    );
    this.$$previousProgressWidth = 0;
    for (;;) {
      if (this.options.value > this.options.total) break;

      const progressValue = this.options.value / this.options.total;
      const progressWidth = Math.ceil(progressValue * this.options.width);
      // fill completed symbol
      for (let i = this.$$previousProgressWidth; i < progressWidth; ++i) {
        progressBar[i] = chalk.hex(this.options.color)(
          this.options.completedSymbol
        );
      }
      if (this.options.clearConsole) {
        console.clear();
      }
      // write to console
      const title = this.options.title;
      const pvalue = Math.ceil(progressValue * 100);
      const v = this.options.value;
      const t = this.options.total;
      process.stdout.write(
        `\r${title} ${progressBar.join("")} ${pvalue}% [${v} / ${t}]`
      );
      this.$$previousProgressWidth = progressWidth;
      yield;
    }
  }

  tick(times = 1) {
    if (this.done) {
      // destory generator
      this._render.return();
      return;
    }
    if (this.options.value + times > this.options.total) {
      this.options.value = this.options.total;
    } else {
      this.options.value += times;
    }
    this._render.next();
  }

  reset(params) {
    this.options = Object.assign(this.options, params);
    this._render = this._renderItr();
    this.tick(0);
  }

  get done() {
    return this.options.value === this.options.total;
  }

  get value() {
    return this.options.value;
  }

  get total() {
    return this.options.total;
  }

  get width() {
    return this.options.width;
  }
}

export { Progress };
