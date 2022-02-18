import QRCode from 'qrcode';

export const currentTime = (): number => Date.now();
export const currentTimeString = (): string => String(new Date());

export const getQrCode = async (text: string) => {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const generateRandom = (max: number) => Math.floor(Math.random() * max);

export const incrementNumber = (number: number, max: number) => {
  return (number + 1) % max;
};

// Format strings with %s
export const strFormat = (str: string, ...args: any) =>
  args.reduce((s: string, v: string) => s.replace('%s', v), str);

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  // Grab the prefers reduced media query.
  const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
};

export const queryParamString = (param?: string | string[]): string => {
  let result = param;
  if (Array.isArray(param)) {
    result = param.join('');
  }
  if (typeof result === 'string') {
    return result;
  }
  return '';
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
