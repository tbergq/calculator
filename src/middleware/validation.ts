import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = joi.object({
  input: joi.array().items(joi.number().required()).required(),
});

export default async function validate(req: Request, res: Response, next: NextFunction) {
  const { error } = await schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    res.end();
  } else {
    next();
  }
}
