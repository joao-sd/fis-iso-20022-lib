import 'reflect-metadata';
import { container } from 'tsyringe';
import { PACSValidator } from './validator/PACSValidator';

export * from './parser/index';

export const pacsValidator = container.resolve(PACSValidator);
