import { ReactElement, Fragment, createElement } from "react";

export type Just<T> = { value: T; _type: "just" };
export type Nothing = { _type: "nothing" };

function toJust<T>(value: T): Just<T> {
  return { value: value, _type: "just" };
}

const nothing: Nothing = { _type: "nothing" };

type GetOnMaybe<T> = <U extends NonNullable<T[K]>, K extends keyof T>(
  key: K
) => Maybe<U>;

type RunOnMaybe<T> = <U>(fn: (val: T) => U) => Maybe<NonNullable<U>>;

export type Maybe<T> = {
  value: Just<T> | Nothing;
  run: RunOnMaybe<T>;
  get: GetOnMaybe<T>;
  unwrap: () => T;
  unwrapOr: (fallback: T) => T;
  unwrapUndef: () => T | undefined;
  unwrapNull: () => T | null;
  isJust: () => boolean;
  isNothing: () => boolean;
  Render: (fn: (val: T) => ReactElement) => ReactElement;
};

function run<T, U>(
  value: Maybe<T>["value"],
  fn: (val: T) => U
): Maybe<NonNullable<U>> {
  if (value._type === "nothing") return toMaybe<NonNullable<U>>(undefined);
  return toMaybe<NonNullable<U>>(fn(value.value) as NonNullable<U>);
}

export function toMaybe<T>(val?: T | undefined | null): Maybe<T> {
  const value: Maybe<T>["value"] =
    val === undefined || val === null ? nothing : toJust(val);
  const isJust = value._type === "just";

  return {
    value,
    run: <U>(fn: (val: T) => U) => run(value, fn),
    get: <U extends NonNullable<T[K]>, K extends keyof T = keyof T>(key: K) =>
      run<T, U>(value, (v) => v[key] as U),
    unwrap: () => {
      if (isJust) return value.value;
      throw Error("No value to unwrap");
    },
    unwrapOr: (fallback: T) => (isJust ? value.value : fallback),
    unwrapUndef: () => (isJust ? value.value : undefined),
    unwrapNull: () => (isJust ? value.value : null),
    isJust: () => isJust,
    isNothing: () => !isJust,
    Render: (fn: (val: T) => ReactElement) =>
      isJust ? fn(value.value) : createElement(Fragment),
  };
}
