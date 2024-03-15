declare type BackendData = any;
declare type Dict = Record<string | number, any>;
declare type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

declare type Plant = {
  id: number;
  name: string;
  plantname: string;
  token: string;
  isLoggedIn?: boolean;
};
