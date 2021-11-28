import express, { Request, Response } from 'express';

import calculate, { Operation } from './calculator';
import validate from './middleware/validation';

const app = express();
app.use(express.json());

const port = 3000;

type Input = {
  input: ReadonlyArray<number>;
};

const endpointOperatorMap: Record<string, Operation> = {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
