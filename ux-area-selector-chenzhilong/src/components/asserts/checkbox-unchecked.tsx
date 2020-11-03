import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="14px" height="14px" viewBox="0 0 14 14" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={props.color || "#BFC3C7"}>
            <path d="M1.74480274,0 L12.2551973,0 C13.2188252,0 14,0.782699537 14,1.74480274 L14,12.2551973 C14,13.2188252 13.2173005,14 12.2551973,14 L1.74480274,14 C0.781174797,14 0,13.2173005 0,12.2551973 L0,1.74480274 C0,0.781174797 0.782699537,0 1.74480274,0 Z M1,12.1479483 C1,12.6176615 1.38210789,13 1.85205167,13 L12.1479483,13 C12.6176615,13 13,12.6178921 13,12.1479483 L13,1.85205167 C13,1.38233854 12.6178921,1 12.1479483,1 L1.85205167,1 C1.38233854,1 1,1.38210789 1,1.85205167 L1,12.1479483 Z"></path>
        </g>
    </g>
  </svg>
);

export default SvgComponent;