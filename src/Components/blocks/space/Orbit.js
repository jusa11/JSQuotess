import React, { forwardRef } from 'react';

const Orbit = forwardRef(({ id, width, height, d }, ref) => {
  return (
    <div className={`orbit orbit-${id}`}>
      <svg
        className="orbit__path"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id={`orbit__path-${id}`}
          opacity="0.3"
          d={d}
          ref={ref}
          stroke="url(#paint0_linear_53_2473)"
          strokeWidth="1.70914"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_53_2473"
            x1="351.408"
            y1="0.509208"
            x2="351.408"
            y2="706.369"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.492" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});

export default Orbit;
