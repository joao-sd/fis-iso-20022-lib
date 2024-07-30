import 'reflect-metadata';
import { container } from 'tsyringe';
import { PacsFileParserFactory } from './parser/PacsFileParserFactory';
import { PACSValidator } from './validator/PACSValidator';

export const pacsValidator = container.resolve(PACSValidator);

export { PacsFileParserFactory };
