const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const letters = alpha.map((x) => String.fromCharCode(x));

const numbers = [...Array(99).keys()];

export { letters, numbers };
