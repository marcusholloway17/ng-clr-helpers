export function containsElement(array_a: string[], array_b: string[]): boolean {
  return array_a.some((element) => array_b.includes(element));
}
