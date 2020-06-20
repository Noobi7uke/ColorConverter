function getRandomByte() {
  return Math.floor(Math.random() * 0x100);
}

function getRandomColor() {
  return {
    red: getRandomByte(),
    green: getRandomByte(),
    blue: getRandomByte()
  };
}

function toHEX(color) {
  return `#${(
    0x1000000 +
    color.red * 0x10000 +
    color.green * 0x100 +
    color.blue
  )
    .toString(16)
    .substr(1, 6)}`;
}

function toRGB(color) {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

function toHSL(color) {
  color = [color.red / 255, color.green / 255, color.blue / 255];
  let Cmax = Math.max(...color);
  let Cmin = Math.min(...color);
  let delta = Cmax - Cmin;
  let L = ((Cmax + Cmin) / 2).toFixed(2);
  let H = Math.floor(
    (delta === 0
      ? 0
      : Cmax === color[0]
      ? ((color[1] - color[2]) / delta + 6) % 6
      : Cmax === color[1]
      ? (color[2] - color[0]) / delta + 2
      : (color[0] - color[1]) / delta + 4) * 60
  );
  let S = (delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1))).toFixed(2);
  return `hsl(${H}, ${S}, ${L})`;
}

function toCMYK(color) {
  color = [color.red / 255, color.green / 255, color.blue / 255];
  let K = Math.floor(100 * (1 - Math.max(...color))) / 100;
  let C = Math.floor(100 * ((1 - color[0] - K) / (1 - K))) / 100;
  let M = Math.floor(100 * ((1 - color[1] - K) / (1 - K))) / 100;
  let Y = Math.floor(100 * ((1 - color[2] - K) / (1 - K))) / 100;
  return `cmyk(${C}, ${M}, ${Y}, ${K})`;
}

function fromRGB(value) {
  if (/^rgb\((\s*\d+\s*,){2}\s*\d+\s*\)$/i.test(value.trim())) {
    let C = value
      .substr(4, value.length - 5)
      .split(",")
      .map(val => parseInt(val));
    if (C.filter(val => val < 256).length === 3) {
      return { red: C[0], green: C[1], blue: C[2] };
    }
  }
  return null;
}

function fromHEX(value) {
  if (/^#[0-9a-f]{6}$/i.test(value.trim())) {
    return {
      red: parseInt(value.substr(1, 2), 16),
      green: parseInt(value.substr(3, 2), 16),
      blue: parseInt(value.substr(5, 2), 16)
    };
  } else return null;
}

function fromHSL(value) {
  if (
    /^hsl\(\s*\d+(\.\d+)?(\s*,\s*\d+(\.\d+)\s*){2}\s*\)$/gi.test(value.trim())
  ) {
    let [H, S, L] = value
      .trim()
      .substr(4, value.trim().length - 5)
      .split(",")
      .map(val => parseFloat(val));
    if (H >= 0 && H < 360 && S >= 0 && S <= 1 && L >= 0 && L <= 1) {
      let C = (1 - Math.abs(2 * L - 1)) * S;
      let X = C * (1 - Math.abs(((H / 60) % 2) - 1));
      let m = L - C / 2;
      let R, G, B;
      if (H < 60) [R, G, B] = [C, X, 0];
      else if (H < 120) [R, G, B] = [X, C, 0];
      else if (H < 180) [R, G, B] = [0, C, X];
      else if (H < 240) [R, G, B] = [0, X, C];
      else if (H < 300) [R, G, B] = [X, 0, C];
      else [R, G, B] = [C, 0, X];

      let [red, green, blue] = [R, G, B].map(val => (val + m) * 255);
      return { red, green, blue };
    }
  }
  return null;
}

function fromCMYK(value) {
  if (
    /^cmyk\(\s*\d+(\.\d+)?(\s*,\s*\d+(\.\d+)?\s*){3}\s*\)$/gi.test(value.trim())
  ) {
    let [C, M, Y, K] = value
      .trim()
      .substr(5, value.trim().length - 5)
      .split(",")
      .map(val => parseFloat(val));
    console.log("CMYK, ", [C, M, Y, K]);
    if (
      C >= 0 &&
      C <= 1 &&
      M >= 0 &&
      M <= 1 &&
      Y >= 0 &&
      Y <= 1 &&
      K >= 0 &&
      K <= 1
    ) {
      let [red, green, blue] = [
        255 * (1 - C) * (1 - K),
        255 * (1 - M) * (1 - K),
        255 * (1 - Y) * (1 - K)
      ];
      console.log({ red, green, blue });
      return { red, green, blue };
    }
  }
  return null;
}

function getOppositeColor(color) {
  return {
    red: 255 - color.red,
    green: 255 - color.green,
    blue: 255 - color.blue
  };
}

export {
  toHEX,
  toCMYK,
  toRGB,
  toHSL,
  fromRGB,
  fromHEX,
  fromHSL,
  fromCMYK,
  getOppositeColor,
  getRandomColor
};
