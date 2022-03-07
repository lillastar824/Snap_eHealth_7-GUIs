const alpha = Array.from(Array(26)).map((_, i) => i + 65);
const letters = alpha.map((x) => String.fromCharCode(x));

const numbers = [...Array(99)].map((_, index) => index + 1);

export { letters, numbers };
