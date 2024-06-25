import { Maybe } from "@/helpers";

function getElementMaybe(id: string): Maybe<HTMLElement> {
  return new Maybe(document.getElementById(id));
}

export default getElementMaybe;
