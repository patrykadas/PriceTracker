import React from 'react';
import PropTypes from 'prop-types';
import { animated, Keyframes } from 'react-spring/renderprops';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const amount = getRandomInt(6, 9);
const items = Array.from({ length: amount }, (v, k) => k);

const AnimationLoop = Keyframes.Spring(async (next, _, ownProps) => {
  while (true) {
    await next({
      to: { y: 100, display: 'inline' },
      from: { y: ownProps.posY },
      config: { duration: ownProps.duration },
    });
    await next({
      from: { y: 100, display: 'inline' },
      to: { y: ownProps.posY, display: 'none' },
      config: { duration: ownProps.duration },
    });
  }
});

const Lines = ({ amount, isGoingUp }) => {
  return (
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${isGoingUp ? '180' : '360'}deg)` }}
    >
      {items.map((_, i) => {
        return (
          <Line key={i} amount={amount} position={i} isGoingUp={isGoingUp} />
        );
      })}
    </svg>
  );
};
const Line = ({ amount, position, isGoingUp }) => {
  let height = getRandomInt(50, 120);
  let width = getRandomInt(3, 5);
  let posX = (100 / (amount + 1)) * (position + 1) + '%';
  let posY = getRandomInt(-50, -30);
  let duration = getRandomInt(900, 1500);

  return (
    <AnimationLoop native posY={posY} duration={duration}>
      {({ y, display }) => {
        return (
          <animated.svg
            x={posX}
            y={y.interpolate((y) => `${y}%`)}
            style={{ display: display.interpolate((display) => display) }}
          >
            <line
              x1="0"
              x2="0"
              y1="0"
              y2={height}
              stroke="#fff"
              strokeWidth={width}
            />
          </animated.svg>
        );
      }}
    </AnimationLoop>
  );
};

class SvgRain extends React.PureComponent {
  render() {
    const { isGoingUp } = this.props;
    return <Lines amount={amount} isGoingUp={isGoingUp} />;
  }
}

SvgRain.defaultProps = {
  isGoingUp: false,
};
SvgRain.propTypes = {
  isGoingUp: PropTypes.bool,
};

export default SvgRain;
