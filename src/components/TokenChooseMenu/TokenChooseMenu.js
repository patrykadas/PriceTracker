import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import { availableTokens } from '../../config';
import darkenLighten from '../../utils/helpers/darkenLighten';
import useTokens from '../../hooks/useTokens';
import { animated, Spring } from 'react-spring/renderprops';

const USD = 'USD';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: #f6f6ff;
  padding: 32px 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TokensList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
`;
const Token = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  padding: 12px;
  background: transparent;
  z-index: 1;
`;
const TokenName = styled.span`
  font-weight: bold;
`;
const TokenIcon = styled.div`
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  overflow: hidden;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
const CloseButton = styled.button`
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 9px;
  border: none;
  margin-top: 40px;
  height: 52px;
`;
const SelectedItem = styled(animated.div)`
  background: lightgrey;
  border-radius: 8px;
  position: absolute;
  left: 0;
  width: 100%;
  height: 72px;
`;

const getBgPosition = ({ position, itemsAmount }) => {
  return position > 0 ? `${(100 / itemsAmount) * position}%` : '0%';
};

const TokenChooseMenu = ({ onClose, onClick, cryptoCurrencies }) => {
  const [value, setValue] = useState('');
  const [tokensList, setTokensList] = useState(
    Object.keys(availableTokens).filter(
      (token) => !cryptoCurrencies.includes(token)
    )
  );
  const [tokensWithIcons, setTokensWithIcons] = useState([]);
  const [activeItemPosition, setActiveItemPosition] = useState(0);
  const { tokens } = useTokens(USD, Object.keys(availableTokens), true);

  const handleChange = (e) => {
    setActiveItemPosition(0);
    setValue(e.target.value);
    setTokensList(
      Object.keys(availableTokens).filter(
        (token) =>
          token.includes(e.target.value.toUpperCase()) &&
          !cryptoCurrencies.includes(token)
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tokensList.length > 0)
      onClick(tokensList[activeItemPosition]);
    if (e.key === 'ArrowDown' && activeItemPosition < tokensList.length - 1) {
      setActiveItemPosition(activeItemPosition + 1);
    }
    if (e.key === 'ArrowUp' && activeItemPosition > 0) {
      setActiveItemPosition(activeItemPosition - 1);
    }
  };

  useEffect(() => {
    if (tokens) {
      const tokensWithIcons = Object.entries(tokens.RAW).map(
        ([name, data]) => ({
          name,
          icon: `https://www.cryptocompare.com${data[USD].IMAGEURL}`,
        })
      );
      setTokensWithIcons(tokensWithIcons);
    }
  }, [tokens]);

  return (
    <Wrapper>
      <Header>
        <h4>Find a token</h4>
        <CloseButton onClick={onClose}>
          <Icon name="close" color="#7578B5" height="13px" />
        </CloseButton>
      </Header>
      <Input
        type="text"
        placeholder="Try 'ETH'"
        onChange={handleChange}
        value={value}
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <TokensList>
        {tokensWithIcons.length > 0 &&
          tokensList.map((token) => {
            const icon = tokensWithIcons.find(
              (currency) => currency.name === token && currency.icon
            ).icon;
            return (
              <Token onClick={() => onClick(token)} key={token}>
                <TokenIcon
                  backgroundColor={darkenLighten(availableTokens[token], 120)}
                >
                  <img src={icon} alt={`${token} icon`} />
                </TokenIcon>
                <TokenName>{token}</TokenName>
              </Token>
            );
          })}
        {tokensWithIcons.length > 0 && tokensList.length > 0 && (
          <Spring
            native
            to={{
              top: getBgPosition({
                position: activeItemPosition,
                itemsAmount: tokensList.length,
              }),
            }}
          >
            {({ top }) => {
              return <SelectedItem style={{ top }} />;
            }}
          </Spring>
        )}
      </TokensList>
    </Wrapper>
  );
};

TokenChooseMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TokenChooseMenu;
