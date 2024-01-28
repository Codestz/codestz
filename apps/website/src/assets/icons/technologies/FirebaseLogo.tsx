import { SVGAttributes } from 'react';

export function FirebaseLogo(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={120}
      height={60}
      {...props}
    >
      <filter height={2} width={2} y={-0.5} x={-0.5} id="A">
        <feGaussianBlur in="SourceAlpha" stdDeviation={3.5} />
        <feOffset dy={-9} dx={1} />
        <feComposite k3={1} operator="arithmetic" in2="SourceAlpha" k2={-1} k1={0} k4={0} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" />
      </filter>
      <filter height={2} width={2} y={-0.5} x={-0.5} id="B">
        <feGaussianBlur in="SourceAlpha" stdDeviation={17.5} />
        <feOffset />
        <feComposite k3={1} operator="arithmetic" in2="SourceAlpha" k2={-1} k1={0} k4={0} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
      </filter>
      <g transform="matrix(.090203 0 0 .090203 11.921255 15.418666)">
        <path
          d="M0 282.998l2.123-2.973L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.846 43.114 6.95z"
          fill="#ffc24a"
        />
        <use xlinkHref="#D" fill="#ffa712" />
        <g fill="#f4bd62" filter="url(#B)">
          <use xlinkHref="#D" />
        </g>
        <path
          d="M135.005 150.38l32.955-33.75-32.964-62.93c-3.13-5.957-11.867-5.974-14.963 0L102.42 87.3v2.86z"
          fill="#f4bd62"
        />
        <use xlinkHref="#C" fill="#ffa50e" />
        <g filter="url(#A)">
          <use xlinkHref="#C" />
        </g>
        <path
          d="M102.513 87.105L0 282.998l.962-.968 3.496-1.42 128.478-128 1.626-4.43z"
          fill="#f6820c"
        />
        <path
          d="M139.12 347.55l116.275-64.848L222.2 78.2c-1.04-6.398-8.888-8.928-13.467-4.34L0 282.998l115.608 64.548a24.13 24.13 0 0 0 23.513.005"
          fill="#fde068"
        />
        <path
          d="M254.354 282.16L221.402 79.218c-1.03-6.35-7.56-8.977-12.104-4.424L1.3 282.6l114.338 63.9c7.25 4.048 16.08 4.05 23.334.006z"
          fill="#fcca3f"
        />
        <path
          d="M139.12 345.64c-7.3 4.076-16.207 4.074-23.513-.006L.93 282.015l-.93.983 115.608 64.548c7.306 4.08 16.204 4.08 23.513.005l116.275-64.848-.285-1.752z"
          fill="#eeab37"
        />
      </g>
      <path
        d="M42.9 38.237h-1.785V24.345h8.1v1.707H42.9v4.56h5.705v1.67H42.9zm9.453-11.894c-.246.246-.543.37-.892.37a1.21 1.21 0 0 1-.892-.37 1.22 1.22 0 0 1-.37-.892 1.21 1.21 0 0 1 .37-.892 1.22 1.22 0 0 1 .892-.37 1.21 1.21 0 0 1 .892.37 1.22 1.22 0 0 1 .37.892 1.21 1.21 0 0 1-.37.892zm0 11.894h-1.785V28.73h1.785zm3.853 0H54.42V28.73h1.707v1.552h.077c.18-.517.553-.944 1.116-1.28s1.1-.505 1.64-.505.977.078 1.34.233l-.68 1.67c-.233-.1-.55-.136-.95-.136-.647 0-1.22.255-1.717.766s-.747 1.18-.747 2.008v5.2zm8.788.3c-1.436 0-2.603-.478-3.502-1.436s-1.35-2.166-1.35-3.628c0-1.384.436-2.574 1.3-3.57s2-1.494 3.347-1.494c1.4 0 2.538.46 3.386 1.378s1.27 2.147 1.27 3.687l-.02.33h-7.5c.052.957.372 1.714.96 2.27a2.91 2.91 0 0 0 2.067.834c1.28 0 2.147-.543 2.6-1.63l1.6.66c-.3.737-.822 1.355-1.533 1.853s-1.585.747-2.62.747zm2.56-6.2c-.04-.543-.288-1.06-.747-1.552s-1.142-.737-2.047-.737c-.66 0-1.232.207-1.717.62s-.818.97-1 1.67h5.5zm8.363 6.2c-.725 0-1.375-.155-1.95-.466s-1.006-.698-1.3-1.164H72.6v1.32h-1.707V24.345h1.785v4.385l-.078 1.32h.078c.285-.466.715-.854 1.3-1.164s1.226-.466 1.95-.466c1.23 0 2.3.485 3.182 1.455s1.34 2.173 1.34 3.6-.446 2.64-1.34 3.6-1.953 1.455-3.182 1.455zm-.3-1.63c.828 0 1.54-.314 2.134-.94s.892-1.458.892-2.493-.298-1.866-.892-2.493-1.307-.94-2.134-.94a2.81 2.81 0 0 0-2.144.93c-.588.63-.883 1.455-.883 2.503s.294 1.882.883 2.503 1.303.932 2.144.932zm9.513 1.63c-1 0-1.853-.3-2.532-.873s-1.02-1.352-1.02-2.3c0-1.035.4-1.846 1.203-2.435s1.792-.883 2.97-.883c1.048 0 1.908.194 2.58.582v-.272c0-.7-.24-1.258-.718-1.678s-1.067-.63-1.766-.63c-.518 0-.987.123-1.407.37a1.9 1.9 0 0 0-.863 1.009l-1.63-.698c.22-.57.653-1.096 1.3-1.58s1.5-.728 2.56-.728c1.216 0 2.225.356 3.027 1.067s1.203 1.714 1.203 3.007v5.743H88.34v-1.32h-.078c-.712 1.086-1.753 1.63-3.124 1.63zm.3-1.63c.737 0 1.407-.275 2.008-.825s.902-1.2.902-1.95c-.504-.414-1.26-.62-2.27-.62-.867 0-1.52.188-1.96.563s-.66.815-.66 1.32c0 .466.2.834.602 1.106s.86.408 1.378.408zm9.8 1.63c-1.06 0-1.937-.26-2.63-.776a4.59 4.59 0 0 1-1.523-1.94l1.6-.66c.504 1.2 1.365 1.785 2.58 1.785.556 0 1.012-.123 1.368-.37s.534-.57.534-.97c0-.62-.433-1.04-1.3-1.26l-1.92-.466c-.608-.155-1.184-.45-1.727-.883S91.4 32 91.4 31.252c0-.84.372-1.523 1.116-2.047s1.627-.786 2.65-.786c.84 0 1.6.2 2.25.572s1.132.928 1.417 1.64l-1.552.64c-.35-.84-1.074-1.26-2.173-1.26-.53 0-.977.1-1.34.33s-.543.517-.543.892c0 .543.42.912 1.26 1.106l1.882.446c.892.207 1.552.563 1.98 1.067s.64 1.074.64 1.707c0 .854-.35 1.565-1.048 2.134s-1.598.854-2.697.854zm9.507 0c-1.436 0-2.604-.478-3.502-1.436s-1.35-2.166-1.35-3.628c0-1.384.436-2.574 1.3-3.57s2-1.494 3.347-1.494c1.4 0 2.538.46 3.386 1.378s1.27 2.147 1.27 3.687v.33h-7.5c.05.957.372 1.714.96 2.27a2.91 2.91 0 0 0 2.066.834c1.28 0 2.147-.543 2.6-1.63l1.6.66c-.3.737-.822 1.355-1.533 1.853s-1.585.747-2.62.747zm2.56-6.2c-.04-.543-.288-1.06-.747-1.552s-1.142-.737-2.047-.737a2.56 2.56 0 0 0-1.717.621c-.485.414-.818.97-1 1.67h5.5z"
        fill="#c2bfbf"
      />
      <defs>
        <path
          id="C"
          d="M134.417 148.974l32.038-32.812-32.038-61.007c-3.042-5.8-10.433-6.398-13.443-.6l-17.705 34.1-.53 1.744z"
        />
        <path
          id="D"
          d="M1.253 280.73l1.605-3.13L102.2 89.083 58.062 5.608c-3.67-6.892-12.987-5.135-14.2 2.58z"
        />
      </defs>
    </svg>
  );
}