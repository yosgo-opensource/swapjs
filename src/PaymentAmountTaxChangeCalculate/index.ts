// 含稅 => 未稅
export const taxAmtToAmt = (code: string, value: number): number => {
  if (code === "50") {
    return Math.round(Math.round(Number(value) / 1.05) / 1.0211);
  }
  return Math.round(Number(value) / 1.05);
};
// 未稅 => 含稅
export const amtToTaxAmt = (code: string, value: number): number => {
  if (code === "50") {
    return Math.round(Math.round(Number(value) * 1.0211) * 1.05);
  }
  return Math.round(Number(value) * 1.05);
};