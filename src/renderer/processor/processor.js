import mexp from 'math-expression-evaluator';

const KEYWORDS = [
  'Mod',
  'Sigma',
  'Pi',
  'pi',
  'n',
  'e',
  'C',
  'P',
  'log',
  'ln',
  'pow',
  'root',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'sinh',
  'cosh',
  'tanh',
  'asinh',
  'acosh',
  'atanh'
];

let variables = {};

export default class Processor {
  constructor() {}

  static parseEditor(text) {
    variables = {};

    const value = text.split('\n').map(line => {
      return Processor.parseLine(line);
    }).join('\n');

    return {
      value,
      variables
    };
  }

  static parseLine(line) {
    const parts = line.split('=').map(p => p.trim());

    if(parts.length === 2) {
      const result = `${Processor.calcExp(parts[1])}`;
      variables[parts[0]] = result;

      return result;
    } else if(parts.length === 1) {
      try {
        return `${Processor.calcExp(line)}`;
      } catch(ex) {
        return `Unknown`;
      }
    } else {
      throw new Error('Bad Line');
    }
  }

  static calcExp(exp) {
    Object.keys(variables).forEach(v => {
      exp = exp.replace(v, variables[v]);
    });

    try {
      return mexp.eval(exp);
    } catch(ex) {
      return '';
    }
  }
}