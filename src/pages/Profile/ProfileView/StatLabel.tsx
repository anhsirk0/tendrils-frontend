import { FC, Fragment, createElement } from "react";

interface Props {
  total: number;
  label: string;
  div?: boolean;
}

const StatLabel: FC<Props> = ({ total, label, div }) => {
  return createElement(
    div ? "div" : Fragment,
    {},
    <Fragment>
      {total} <span className="text-60">{label}</span>
    </Fragment>
  );
};

export default StatLabel;
