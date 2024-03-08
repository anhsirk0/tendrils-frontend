import {
  useMutation,
  UseMutationOptions,
  MutateFunction,
  QueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface UseApiOptions
  extends Omit<UseMutationOptions, "mutationFn" | "onSuccess" | "onError"> {
  fn: MutateFunction<AxiosResponse<Dict>>;
  onSuccess?: (data: Dict) => void;
  onError?: (data?: Dict) => void;
}

function useApi(
  { fn, onError, onSuccess, ...rest }: UseApiOptions,
  client?: QueryClient
) {
  return useMutation<AxiosResponse<Dict>, AxiosError<Dict>>(
    {
      mutationFn: fn,
      onSuccess: (resp) => onSuccess && onSuccess(resp?.data),
      onError: (err) => onError && onError(err?.response?.data),
      ...rest,
    },
    client
  );
}

export default useApi;
