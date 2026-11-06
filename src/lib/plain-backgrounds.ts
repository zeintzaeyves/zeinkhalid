// Backgrounds for cards without a picture: a tinted gradient, a soft glow
// and a faint dot grid, so they never read as flat gray boxes.
const dots =
  "radial-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px) 0 0 / 18px 18px";

export const plainBackgrounds = [
  `${dots}, radial-gradient(120% 90% at 100% 0%, rgb(255 255 255 / 0.10) 0%, transparent 60%), linear-gradient(160deg, #1c1c1c 0%, #0e0e0e 70%)`,
  `${dots}, radial-gradient(110% 90% at 0% 100%, rgb(255 255 255 / 0.08) 0%, transparent 60%), linear-gradient(200deg, #1f1f23 0%, #0b0b0d 75%)`,
  `${dots}, radial-gradient(100% 70% at 0% 0%, rgb(255 255 255 / 0.10) 0%, transparent 62%), radial-gradient(90% 60% at 100% 100%, rgb(255 255 255 / 0.05) 0%, transparent 60%), linear-gradient(180deg, #151515 0%, #0b0b0b 80%)`,
];
