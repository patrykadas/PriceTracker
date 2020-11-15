import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { animated, Spring } from 'react-spring/renderprops';
import { Canvas } from 'react-three-fiber';
import { useCountUp } from 'react-countup';
import Icon from '../Icon/Icon';
import Model from '../Model/Model';
import TokenChooseMenu from '../TokenChooseMenu/TokenChooseMenu';
import SvgRain from '../SvgRain/SvgRain';
import toFixedNoRounding from '../../utils/helpers/toFixedNoRounding';
import darkenLighten from '../../utils/helpers/darkenLighten';
import usePrevious from '../../hooks/usePrevious';

const path = '/models';

const REMOVE = 'remove';
const CHANGE = 'change';
const GOING_UP = 'going-up';
const GOING_DOWN = 'going-down';
const READY = 'ready';

const MAGNIFIER = 'magnifier';
const HORIZONTAL_SCROLL = 'horizontal-scroll';
const CLOSE = 'close';

const decimals = 3;

const MenuIcon = styled(Icon)``;
const MenuButtonsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 24px;
  justify-content: space-around;
  @media (min-width: 768px) {
    width: auto;
    flex-direction: column;
    padding-top: 0;
  }
`;
const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  padding: 0;
  background-color: transparent;
  font-size: 24px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  padding-bottom: 24px;
  ${MenuIcon} {
    margin-right: 0.75rem;
  }
  @media (min-width: 768px) {
    margin-top: 0;
    :not(:last-child) {
      padding-bottom: 24px;
    }
  }
`;
const EditMenu = styled(animated.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: rgba(255, 255, 255, 0.8);
`;
const ChooseMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  border-radius: inherit;
`;
const ContentWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: auto;
  margin-bottom: 30px;
  align-self: flex-start;
  width: 50%;
  @media (min-width: 768px) {
    align-self: unset;
    width: initial;
  }
`;
const AnimatedWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 170px;
  border-radius: 12px;
  margin: 0.5rem;
  padding: 0.5rem;
  position: relative;
  will-change: transform;
  @media (min-width: 768px) {
    height: 710px;
  }
`;
const MainWrapper = styled.div`
  flex-basis: 250px;
  min-width: 250px;
  flex: 1;
  width: 100%;
  @media (min-width: 768px) {
    width: initial;
  }
`;
const Amount = styled(animated.h1)`
  word-break: break-word;
  color: ${({ status }) => status === GOING_UP && 'green'};
  color: ${({ status }) => status === GOING_DOWN && 'red'};
`;
const CanvasWrapper = styled(animated.div)`
  width: 50%;
  height: 200%;
  position: absolute;
  top: -50%;
  right: 0;
  z-index: 1;
  margin-left: auto;
  overflow: hidden;
  @media (min-width: 768px) {
    align-self: unset;
    height: 100%;
    top: 0;
    width: 100%;
    left: 0;
  }
`;
const LinesWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
`;

const convertColor = (color) => parseInt(Number(`0x${color.slice(1)}`), 10);

const TokenTile = ({
  name,
  price,
  currencySymbol,
  changeLastDay,
  color,
  onClick,
  cryptoCurrencies,
  setCryptoCurrencies,
  index,
}) => {
  const lighterColor = darkenLighten(color, 160);
  const modelColor = convertColor(color);
  const initialAnimationState = {
    blur: 0,
    scale: 1,
    opacity: 0,
    background: darkenLighten(color, 60),
  };

  const handleUpdate = () => {
    const newFixedPrice = parseFloat(toFixedNoRounding(price, decimals));
    const oldFixedPrice = parseFloat(toFixedNoRounding(currentPrice, decimals));
    // console.log({ price, newFixedPrice, currentPrice, oldFixedPrice, name });

    if (newFixedPrice > oldFixedPrice) setStatus(GOING_UP);
    if (newFixedPrice < oldFixedPrice) setStatus(GOING_DOWN);
  };

  const [animationStyles, setAnimationStyles] = useState(initialAnimationState);
  const [showChooseMenu, setShowChooseMenu] = useState(false);
  const [status, setStatus] = useState(READY);
  const prevStatus = usePrevious(status);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const { update: updateCounter, countUp } = useCountUp({
    start: currentPrice,
    end: currentPrice,
    decimals: decimals,
    prefix: currencySymbol,
    onUpdate: handleUpdate,
    onEnd: () => setStatus(READY),
    duration: 2,
  });

  const handleClick = (action) => {
    if (action === CHANGE) setShowChooseMenu(!showChooseMenu);
    onClick({ action, name });
  };
  const handleTokenChange = (token) => {
    if (cryptoCurrencies.includes(token)) return;
    const newList = Array.from(cryptoCurrencies);
    const tokenIndex = cryptoCurrencies.indexOf(name);
    newList.splice(tokenIndex, 1);
    newList.splice(tokenIndex, 0, token);
    setCryptoCurrencies(newList);
    setShowChooseMenu(false);
  };

  const handleAnimationChange = (e) => {
    if (e.type === 'mouseenter') {
      setAnimationStyles({
        blur: 5,
        scale: 1.02,
        opacity: 1,
        background: 'white',
      });
    } else if (e.type === 'mouseleave') {
      setAnimationStyles(initialAnimationState);
    }
  };

  useEffect(() => {
    if (price !== currentPrice) setCurrentPrice(price);
    updateCounter(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  useEffect(() => {
    if (changeLastDay > 10)
      console.log(`Price of ${name} went 10% up in last 24 hours`);
    if (changeLastDay < -10)
      console.log(`Price of ${name} went 10% down in last 24 hours`);
  }, [changeLastDay, name]);

  return (
    <Spring native to={animationStyles}>
      {({ blur, scale, opacity, background }) => (
        <Draggable draggableId={name} index={index} isDragDisabled={false}>
          {(provided, snapshot) => (
            <MainWrapper ref={provided.innerRef} {...provided.draggableProps}>
              <AnimatedWrapper
                background={color}
                style={{
                  background: background.interpolate(
                    (color) =>
                      `linear-gradient(180deg, ${lighterColor} 0%, ${color} 100%)`
                  ),
                  transform: scale.interpolate(
                    (scale) => `scale(${snapshot.isDragging ? 0.96 : scale})`
                  ),
                }}
                onMouseEnter={handleAnimationChange}
                onMouseLeave={handleAnimationChange}
                onMouseDown={handleAnimationChange}
                onMouseUp={handleAnimationChange}
              >
                {isModelLoaded && (
                  <LinesWrapper>
                    <SvgRain
                      isGoingUp={
                        status === GOING_UP ||
                        (prevStatus === GOING_UP && status !== GOING_DOWN)
                      }
                    />
                  </LinesWrapper>
                )}
                <ContentWrapper
                  style={{
                    filter: blur.interpolate((blur) => `blur(${blur}px)`),
                  }}
                >
                  <Amount status={status}>{countUp}</Amount>
                  <h2>{name}</h2>
                </ContentWrapper>
                <EditMenu
                  style={{
                    opacity: opacity.interpolate((opacity) => opacity),
                  }}
                >
                  <MenuButtonsWrapper>
                    <MenuButton onClick={() => handleClick(REMOVE)}>
                      <MenuIcon name={CLOSE} />
                      Remove
                    </MenuButton>
                    <MenuButton as="div" {...provided.dragHandleProps}>
                      <MenuIcon name={HORIZONTAL_SCROLL} />
                      Move
                    </MenuButton>
                    <MenuButton onClick={() => handleClick(CHANGE)}>
                      <MenuIcon name={MAGNIFIER} />
                      Change
                    </MenuButton>
                  </MenuButtonsWrapper>
                </EditMenu>
                {showChooseMenu && (
                  <ChooseMenu>
                    <TokenChooseMenu
                      onClick={handleTokenChange}
                      onClose={() => setShowChooseMenu(false)}
                      cryptoCurrencies={cryptoCurrencies}
                    />
                  </ChooseMenu>
                )}
                <CanvasWrapper
                  style={{
                    filter: blur.interpolate((blur) => `blur(${blur}px)`),
                  }}
                >
                  <Canvas colorManagement camera={{ position: [0, 0, 100] }}>
                    <ambientLight intensity={2} color={modelColor} />
                    <directionalLight
                      intensity={2}
                      position={[-50, 150, 100]}
                      color={modelColor}
                    />
                    <directionalLight
                      intensity={2}
                      position={[50, -150, 100]}
                      color={modelColor}
                    />

                    <directionalLight color={modelColor} intensity={2} />
                    {/* <spotLight
                      position={[0, 0, 100]}
                      args={['red']}
                      intensity={1}
                    /> */}
                    <Model
                      url={`${path}/${name}.obj`}
                      color={modelColor}
                      setIsModelLoaded={setIsModelLoaded}
                    />
                  </Canvas>
                </CanvasWrapper>
              </AnimatedWrapper>
            </MainWrapper>
          )}
        </Draggable>
      )}
    </Spring>
  );
};

TokenTile.defaultProps = {
  color: '#608bff',
};
TokenTile.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  changeLastDay: PropTypes.number.isRequired,
};

export default TokenTile;
