export const parseObject = (obj: { [key: string]: any }): string => {
  const str = [];

  // eslint-disable-next-line
  for (const p in obj)
    if (p) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p]) || ''}`);
    }

  return `${str.length > 0 ? '?' : ''}${str.join('&')}`;
};

export default {};
