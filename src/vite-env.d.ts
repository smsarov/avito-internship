/// <reference types="vite/client" />

declare module "@icons/*" {
  import type { FunctionComponent, SVGProps } from "react";
  const Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default Icon;
}
