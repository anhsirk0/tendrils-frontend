declare type BackendData = any;
declare type Dict = Record<string | number, any>;
declare type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

declare type Fn0<R = void> = () => R;
declare type Fn1<T, R = void> = (a: T) => R;
declare type Fn2<T, U, R = void> = (a1: T, a2: U) => R;
declare type Fn3<T, U, V, R = void> = (a1: T, a2: U, a3: V) => R;

declare type Plant = {
  id: number;
  name: string;
  plantname: string;
  token: string;
};
