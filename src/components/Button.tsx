import { forwardRef, Ref } from "react";
import { Button as Btn, ButtonProps as BtnProps } from "@headlessui/react";
import { clsx } from "clsx";
import { Loading } from "@/components";

export type ButtonProps = BtnProps & { loading?: boolean };

const ButtonElement = (props: ButtonProps, ref?: Ref<HTMLButtonElement>) => {
  const { loading = false, className, ...rest } = props;

  return (
    <Loading
      on={loading}
      as={Btn}
      disabled={loading}
      className={clsx("btn", className)}
      ref={ref}
      {...rest}
    />
  );
};

const Button = forwardRef(ButtonElement);
export default Button;
