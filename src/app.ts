import express, { Request, Response } from 'express';

import calculate, { Operation } from './calculator';
import validate from './middleware/validation';

const app = express();
app.use(express.json());

type Input = {
  input: ReadonlyArray<number>;
};

export const endpointOperatorMap: Record<string, Operation> = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
};

for (const [endpoint, operator] of Object.entries(endpointOperatorMap)) {
  app.post(`/${endpoint}`, validate, (req: Request<any, any, Input>, res: Response) => {
    res.json({ sum: calculate(operator, req.body.input) });
  });
}

export default app;
