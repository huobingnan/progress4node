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

  previousProgressValue = 0;

  constructor(params) {
    this.options = Object.assign(this.options, params);
    this.render();
  }

  render() {
    if (this.options.value === this.options.total) {
      this.previousProgressValue = 0;
    }
    if (this.options.value > this.options.total) {
      return;
    }
    const progress = this.options.value / this.options.total;
    const progressValue = (progress * 100).toFixed(0);
    if (progressValue === this.previousProgressValue) {
      return;
    } else {
      this.previousProgressValue = progressValue;
    }

    const progressWidth = Math.ceil(progress * this.options.width);
    const symbols = new Array(this.options.width);
    for (let i = 0; i < progressWidth; ++i) {
      symbols.push(chalk.hex(this.options.color)(this.options.completedSymbol));
    }
    for (let i = 0; i < this.options.width - progressWidth; ++i) {
      symbols.push(this.options.uncompletedSymbol);
    }
    if (this.options.clearConsole) {
      console.clear();
    }
    process.stdout.write(
      `\r${this.options.title} ${symbols.join("")} ${progressValue}% [${
        this.options.value
      } / ${this.options.total}]`
    );
  }

  tick(times = 1) {
    this.options.value += times;
    this.render();
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
}

export { Progress };
