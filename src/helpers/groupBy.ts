function groupBy<T extends Record<string, any>, K extends keyof T = keyof T>(
  data: Array<T>,
  key: K
): Record<NonNullable<T[K]>, Array<T>> {
  return data.reduce((grouped, d) => {
    let gData = grouped[d[key]];
    return { ...grouped, [d[key]]: gData ? gData.concat(d) : [d] };
  }, {} as Record<NonNullable<T[K]>, Array<T>>);
}
export default groupBy;

/* Example
let data = [
  { name: "a", age: 10 },
  { name: "b", age: 20 },
  { name: "c", age: 10 },
];
console.log(groupBy(data, "age"));
{
  '10': [ { name: 'a', age: 10 }, { name: 'c', age: 10 } ],
  '20': [ { name: 'b', age: 20 } ]
}
*/
