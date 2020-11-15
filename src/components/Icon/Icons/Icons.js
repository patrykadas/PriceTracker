/*
  To convert icons downloaded from figma use this website:
  https://svg2jsx.com
*/

import React from 'react';
import PropTypes from 'prop-types';

export const MagnifierIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M30.707 26.293l-5.863-5.863a14.07 14.07 0 01-4.414 4.414l5.863 5.863a1 1 0 001.414 0l3-3a1 1 0 000-1.414zM13 25a12 12 0 1112-12 12.013 12.013 0 01-12 12zm0-22a10 10 0 1010 10A10.011 10.011 0 0013 3z"
      ></path>
    </svg>
  );
};
MagnifierIcon.defaultProps = {
  color: '#000',
};
MagnifierIcon.propTypes = {
  color: PropTypes.string,
};

export const HorizontalScrollIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M32 9l-6-5v4h-6v2h6v4l6-5zM0 9l6-5v4h4v2H6v4L0 9z"
      ></path>
      <path
        fill={color}
        d="M25.128 15.478L17 14V6a2 2 0 00-4 0v14h-1v-3h-1a2 2 0 00-2 2v2.895a6 6 0 001.315 3.749L13 29h13l1.556-10.114a3 3 0 00-2.428-3.408z"
      ></path>
    </svg>
  );
};
HorizontalScrollIcon.defaultProps = {
  color: '#000',
};
HorizontalScrollIcon.propTypes = {
  color: PropTypes.string,
};

export const CloseIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M27.314 7.515l-2.829-2.829L16 13.172 7.515 4.686 4.686 7.515 13.172 16l-8.486 8.485 2.829 2.829L16 18.828l8.485 8.486 2.829-2.829L18.828 16l8.486-8.485z"
      ></path>
    </svg>
  );
};
CloseIcon.defaultProps = {
  color: '#000',
};
CloseIcon.propTypes = {
  color: PropTypes.string,
};

export const EthIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="22"
      fill="none"
      viewBox="0 0 14 22"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M6.95 16.406L.28 12.467l6.67 9.4 6.674-9.4-6.676 3.94h.002zM7.05.133L.38 11.2l6.67 3.943 6.67-3.939L7.05.133z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
EthIcon.defaultProps = {
  color: '#0E103C',
};
EthIcon.propTypes = {
  color: PropTypes.string,
};

export const SntIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        fill={color}
        d="M13.508 11.221c.302.406.173.693.123.967-.88 4.705-5.526 7.852-9.958 6.972-1.99-.394-3.142-1.695-3.293-3.708-.168-2.22.737-3.497 2.75-4.207 1.196-.421 2.43-.456 3.667-.386 2.27.132 4.517.69 6.71.362zM4.356 8.896C4.576 4.56 8.228.934 12.393.711c.684-.038 1.369-.032 2.045.132 2.02.49 3.12 1.847 3.197 3.956.075 2.025-.817 3.393-2.736 4.086-1.05.38-2.142.505-3.241.447-2.408-.123-3.92-.723-7.302-.436z"
      ></path>
    </svg>
  );
};
SntIcon.defaultProps = {
  color: '#4763D7',
};
SntIcon.propTypes = {
  color: PropTypes.string,
};

export const DaiIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      fill="none"
      viewBox="0 0 22 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M2.89.976h7.356c4.475 0 7.867 2.386 9.13 5.858h2.29v2.1h-1.808c.035.33.054.669.054 1.013v.051c0 .387-.023.768-.068 1.14h1.822v2.1h-2.334c-1.296 3.423-4.662 5.786-9.086 5.786H2.89v-5.787H.333v-2.1H2.89V8.932H.333v-2.1H2.89V.977zm2.056 12.261v3.903h5.3c3.271 0 5.7-1.563 6.832-3.903H4.946zm12.762-2.1H4.948V8.933h12.764c.047.347.07.702.07 1.065v.052c0 .37-.023.734-.074 1.087zm-7.461-8.281c3.285 0 5.722 1.605 6.846 3.978H4.946V2.856h5.3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
DaiIcon.defaultProps = {
  color: '#F2B350',
};
DaiIcon.propTypes = {
  color: PropTypes.string,
};

export const OmgIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M5.032 10.089c.623 0 1.214.124 1.774.372a4.563 4.563 0 012.41 2.4c.249.558.373 1.147.373 1.767 0 .633-.118 1.222-.355 1.768a4.96 4.96 0 01-.99 1.441c-.41.416-.89.741-1.438.977a4.531 4.531 0 01-1.774.354 4.443 4.443 0 01-1.774-.354A4.618 4.618 0 01.83 16.396a4.395 4.395 0 01-.355-1.768c0-.62.118-1.209.355-1.767a4.486 4.486 0 01.98-1.433c.417-.409.9-.738 1.448-.986a4.443 4.443 0 011.774-.353zm0 7.497c.81 0 1.503-.288 2.082-.865a2.845 2.845 0 00.869-2.093c0-.806-.29-1.497-.869-2.074a2.846 2.846 0 00-2.082-.865c-.822 0-1.522.288-2.101.865a2.824 2.824 0 00-.869 2.074c0 .819.29 1.517.869 2.093.579.577 1.28.865 2.101.865zM15.042.116c.636 0 1.227.119 1.775.354a4.616 4.616 0 012.428 2.419c.237.546.355 1.135.355 1.767 0 .62-.118 1.21-.355 1.768a4.486 4.486 0 01-.98 1.432c-.418.41-.9.738-1.448.986a4.442 4.442 0 01-1.774.354 4.53 4.53 0 01-1.774-.354 4.854 4.854 0 01-1.438-.986c-.411-.41-.741-.887-.99-1.432a4.482 4.482 0 01-.355-1.768c0-.632.118-1.221.355-1.767a4.96 4.96 0 01.99-1.442c.41-.415.89-.74 1.438-.977a4.53 4.53 0 011.774-.353zm0 7.48c.823 0 1.523-.289 2.102-.865a2.824 2.824 0 00.869-2.075c0-.818-.29-1.516-.869-2.093a2.868 2.868 0 00-2.101-.865c-.81 0-1.504.289-2.083.865a2.845 2.845 0 00-.868 2.093c0 .807.29 1.498.868 2.075a2.846 2.846 0 002.083.865zM4.454.116h5.192v1.582H8.487c.336.397.6.844.794 1.34.193.496.29 1.023.29 1.581v.037c0 .633-.125 1.222-.374 1.768a4.54 4.54 0 01-.98 1.46c-.418.416-.9.741-1.448.977a4.577 4.577 0 01-1.793.353 4.443 4.443 0 01-1.774-.353 4.452 4.452 0 01-1.457-.977 4.887 4.887 0 01-.99-1.46A4.395 4.395 0 01.4 4.656c0-.595.118-1.153.355-1.674A5.048 5.048 0 012.977.601 3.93 3.93 0 014.453.136v-.02zm3.53 4.54c0-.818-.29-1.516-.869-2.093a2.846 2.846 0 00-2.082-.865c-.822 0-1.522.289-2.101.865a2.845 2.845 0 00-.869 2.093c0 .807.29 1.498.869 2.075.579.576 1.28.865 2.1.865.81 0 1.504-.289 2.083-.865a2.824 2.824 0 00.869-2.075z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
OmgIcon.defaultProps = {
  color: '#706EFF',
};
OmgIcon.propTypes = {
  color: PropTypes.string,
};
