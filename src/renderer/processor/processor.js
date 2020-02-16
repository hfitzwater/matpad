import mexp from 'math-expression-evaluator';

export const KEYWORDS = [
  {
    symbol: 'Mod',
    description: 'Modulus Operator eg. 3 Mod 2 results 1'
  },
  {
    symbol: 'Sigma',
    description: 'Summation eg. Sigma(1,100,n) results 5050'
  },
  {
    symbol: 'Pi',
    description: 'Product eg. Pi(1,10,n) results 3628800'
  },
  {
    symbol: 'pi',
    description: 'Math constant pi returns 3.14'
  },
  {
    symbol: 'n',
    description: 'Variable for Summation or Product'
  },
  {
    symbol: 'e',
    description: 'Math constant e returns 2.71'
  },
  {
    symbol: 'C',
    description: 'Combination operator eg. 4C2 returns 6'
  },
  {
    symbol: 'P',
    description: 'Permutation operator eg. 4P2 returns 12'
  },
  {
    symbol: 'log',
    description: 'logarithmic function with base 10 eg. log 1000 returns 3'
  },
  {
    symbol: 'ln',
    description: 'natural log function with base e eg. ln 2 returns .3010'
  },
  {
    symbol: 'pow',
    description: 'power function with two operator pow(2,3) returns 8'
  },
  {
    symbol: 'root',
    description: 'underroot function root 4 returns 2'
  },
  {
    symbol: '+',
    description: 'Addition Operator eg. 2+3 results 5'
  },
  {
    symbol: '-',
    description: 'Subtraction Operator eg. 2-3 results -1'
  },
  {
    symbol: '/',
    description: 'Division operator eg 3/2 results 1.5'
  },
  {
    symbol: '\\',
    description: 'Multiplication Operator eg. 23 results 6'
  },
  {
    symbol: '(',
    description: 'Opening Parenthesis'
  },
  {
    symbol: ')',
    description: 'Closing Parenthesis'
  },
  {
    symbol: 'sin',
    description: 'trig sin'
  },
  {
    symbol: 'cos',
    description: 'trig cos'
  },
  {
    symbol: 'tan',
    description: 'trig tan'
  },
  {
    symbol: 'asin',
    description: 'trig asin'
  },
  {
    symbol: 'acos',
    description: 'trig acos'
  },
  {
    symbol: 'atan',
    description: 'trig atan'
  },
  {
    symbol: 'sinh',
    description: 'trig sinh'
  },
  {
    symbol: 'cosh',
    description: 'trig cosh'
  },
  {
    symbol: 'tanh',
    description: 'trig tanh'
  },
  {
    symbol: 'asinh',
    description: 'trig asinh'
  },
  {
    symbol: 'acosh',
    description: 'trig acosh'
  },
  {
    symbol: 'atanh',
    description: 'trig atanh'
  }
];

let variables = {};

export default class Processor {
  constructor() {}

  static parseEditor(text) {
    variables = {};

    const value = text.split('\n').map(line => {
      line = line.trim();

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
      if( exp && exp.trim().length && !exp.includes('//') ) {
        return '⚠️';
      } else {
        return '';
      }
    }
  }
}