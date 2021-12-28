export declare interface ProgressOptions {
  title?: string;
  value?: number;
  total?: number;
  color?: string;
  clearConsole?: boolean;
  width?: number;
  uncompletedSymbol?: string;
  completedSymbol?: string;
}

export declare class Progress {
  constructor(params?: ProgressOptions);
  tick(times?: number): void;
  render(): void;
  get done(): boolean;
  get value(): number;
  get total(): number;
}
