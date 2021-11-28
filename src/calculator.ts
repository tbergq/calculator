type OperationFn = (a: number, b: number) => number;
export type Operation = '+' | '-' | '*' | '/';

const operations: Record<Operation, OperationFn> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
};

export default function calculate(operation: Operation, input: ReadonlyArray<number>) {
  return input.reduce(operations[operation]);
}
