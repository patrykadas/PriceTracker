import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as Svg from './Icons/Icons';

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

const iconSizes = {
  [SMALL]: '2rem',
  [MEDIUM]: '3rem',
  [LARGE]: '5rem',
};

const ICON = 'Icon';
const MAGNIFIER_ICON = 'MagnifierIcon';

const iconsList = Object.keys(Svg);

const getIconComponentName = (name) => {
  // Converts "unicef-pure-logo" to "UnicefPureLogoIcon"
  if (!name) return MAGNIFIER_ICON;
  const iconName = name
    .replace(/(\b|-)\w/g, function (m) {
      return m.toUpperCase().replace(/-/, '');
    })
    .concat(ICON);
  if (iconsList.includes(iconName)) {
    return iconName;
  } else {
    return MAGNIFIER_ICON;
  }
};

const IconWrapper = styled.div`
  ${({ width, height, size }) => {
    if (width || height) {
      return css`
        width: ${({ width }) => width};
        height: ${({ height }) => height};
      `;
    } else if (size) {
      return css`
        width: ${({ size }) => iconSizes[size]};
        height: ${({ size }) => iconSizes[size]};
      `;
    }
  }}
  svg {
    width: ${({ width, height }) => (height && !width ? 'auto' : '100%')};
    /* max-width: 100%; */
    height: 100%;
  }
`;

const Icon = ({ color, height, width, size, name, className }) => {
  const IconSvg = Svg[getIconComponentName(name)];

  return (
    <IconWrapper
      height={height}
      width={width}
      size={size}
      className={className}
    >
      <IconSvg color={color} />
    </IconWrapper>
  );
};

Icon.defaultProps = {
  size: SMALL,
  color: undefined,
  height: undefined,
  width: undefined,
  className: '',
};
Icon.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf([SMALL, MEDIUM, LARGE]),
  className: PropTypes.string,
};

export default Icon;
