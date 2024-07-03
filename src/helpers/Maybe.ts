import { ReactElement, Fragment, createElement } from "react";

export type Just<T> = { value: T; _tag: "just" };
export type Nothing = { _tag: "nothing" };
const nothing: Nothing = { _tag: "nothing" };

type MaybeData<T> = Just<T> | Nothing;
function isJust(m: MaybeData<any>): m is Just<any> {
  return m._tag === "just";
}

export class Maybe<T> {
  private data: MaybeData<T>;

  constructor(value?: T | undefined | null) {
    this.data =
      value === undefined || value === null ? nothing : { value, _tag: "just" };
  }

  get isJust() {
    return isJust(this.data);
  }

  get isNothing() {
    return !isJust(this.data);
  }

  run<U>(fn: (val: T) => U): Maybe<U> {
    if (isJust(this.data)) return new Maybe(fn(this.data.value));
    return new Maybe<U>();
  }

  prop<U extends NonNullable<T[K]>, K extends keyof T = keyof T>(key: K) {
    return this.run<U>((v) => v[key] as U);
  }

  get(msg?: any): T {
    if (isJust(this.data)) return this.data.value;
    throw Error(msg ?? "No value to unwrap");
  }

  getOr(fallback: T): T {
    return isJust(this.data) ? this.data.value : fallback;
  }

  getUndef(): T | undefined {
    return isJust(this.data) ? this.data.value : undefined;
  }

  Render(fn: (val: T) => ReactElement): ReactElement {
    return isJust(this.data) ? fn(this.data.value) : createElement(Fragment);
  }
}
