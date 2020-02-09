import mexp from 'math-expression-evaluator';

export default class Processor {
  constructor() {}

  static parseEditor(text, variables) {
    return text.split('\n').map(line => {
      return Processor.parseLine(line, variables);
    });
  }

  static parseLine(line, variables) {
    const parts = line.split('=').map(p => p.trim());

    if(parts.length === 2) {
      return {
        number: `${Processor.calcExp(parts[1], variables)}`,
        variable: parts[0]
      }
    } else if(parts.length === 1) {
      try {
        return {
          number: `${Processor.calcExp(line, variables)}`,
          variable: null
        }
      } catch(ex) {
        return `Unknown`;
      }
    } else {
      throw new Error('bad line');
    }
  }

  static calcExp(exp, variables) {
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