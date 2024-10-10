const pixelsToRem = (pixels: number) => `${pixels / 16}rem`;

const sizes = {
  globalLateralPadding: pixelsToRem(160),
  size1: `1px`,
  size2: `2px`,
  size4: pixelsToRem(4),
  size8: pixelsToRem(8),
  size10: pixelsToRem(10),
  size12: pixelsToRem(12),
  size14: pixelsToRem(14),
  size16: pixelsToRem(16),
  size18: pixelsToRem(18),
  size20: pixelsToRem(20),
  size24: pixelsToRem(24),
  size36: pixelsToRem(36),
  size48: pixelsToRem(48),
  size64: pixelsToRem(64),
  size72: pixelsToRem(72),
  size96: pixelsToRem(96),
};

export default sizes;
