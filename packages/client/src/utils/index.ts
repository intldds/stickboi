// decode uint24 to formula
export function decodeDoorContent(
  currentValue?: number,
  changeData?: number
): string {
  if (!currentValue || !changeData) {
    return "";
  }

  // get first uint8
  const operator = changeData >> 16;
  const change = changeData & 0xff;

  const result = operator === 0 ? currentValue + change : currentValue - change;

  // raffle to show one of + - * /
  const r = Math.random();
  if (r < 0.25) {
    // show +
    const anoNumber = result - currentValue;
    if (anoNumber >= 0) {
      return `x + ${anoNumber}`;
    } else {
      return `x + (${anoNumber})`;
    }
  } else if (r < 0.5) {
    // show -
    const anoNumber = currentValue - result;
    if (anoNumber >= 0) {
      return `x - ${anoNumber}`;
    } else {
      return `x - (${anoNumber})`;
    }
  } else if (r < 0.75) {
    // show *
    const anoNumber = result / currentValue;
    if (anoNumber >= 0) {
      return `x * ${Number(anoNumber.toFixed(4))}`;
    } else {
      return `x * (${Number(anoNumber.toFixed(4))})`;
    }
  } else {
    // show /
    const anoNumber = currentValue / result;
    if (anoNumber > 0) {
      return `x / ${Number(anoNumber.toFixed(4))}`;
    } else {
      return `x / (${Number(anoNumber.toFixed(4))})`;
    }
  }
}

/**
 * 1: Dog
 * 2: Nouns
 * 3: Shiba
 * 4: Milady
 * 5: Pepe
 * 6: Mfers
 * 7: Wojak
 * 8: Stickman
 */

const weights: { [x: string]: number } = {
  dog: 5000,
  nouns: 625,
  shiba: 500,
  milady: 125,
  pepe: 50,
  mfers: 25,
  wojak: 5,
  stickman: 1,
};

export function valueToCharArray(value: number): string[] {
  const arr: string[] = [];
  let rest = value;

  Object.keys(weights).forEach((key: string) => {
    const count = Math.floor(rest / weights[key]);

    rest = rest - count * weights[key];

    for (let i = 1; i <= count; i++) {
      arr.push(key);
    }
  });

  return arr;
}
