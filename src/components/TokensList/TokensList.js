import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TokenTile from '../TokenTile/TokenTile';
import useTokens from '../../hooks/useTokens';
import useWindowSize from '../../hooks/useWindowSize';
import { availableTokens } from '../../config';

const REMOVE = 'remove';
const MOVE = 'move';
const CHANGE = 'change';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  max-width: 1480px;
  height: auto;
  margin: 0 auto;
  flex-direction: column;
  @media (min-width: 768px) {
    height: 100%;
    flex-direction: row;
  }
`;
const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

class InnerList extends React.PureComponent {
  render() {
    const {
      tokensData,
      cryptoCurrencies,
      currencySymbol,
      handleClick,
      setCryptoCurrencies,
    } = this.props;
    return cryptoCurrencies.map((currency, index) => {
      const token = tokensData.find((token) => token.name === currency);
      if (!token)
        return (
          <div style={{ flexBasis: 250, flex: 1 }} key={`${currency}-loading`}>
            Loading...
          </div>
        );
      const { name, price, changeLastDay } = token;
      return (
        <TokenTile
          key={name}
          name={name}
          price={price}
          changeLastDay={changeLastDay}
          currencySymbol={currencySymbol}
          color={availableTokens[name]}
          onClick={handleClick}
          setCryptoCurrencies={setCryptoCurrencies}
          cryptoCurrencies={cryptoCurrencies}
          index={index}
        />
      );
    });
  }
}

const TokensList = ({ initialCryptoCurrencies, initialCurrency }) => {
  const [tokensData, setTokensData] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [cryptoCurrencies, setCryptoCurrencies] = useState(
    initialCryptoCurrencies
  );
  const screenSize = useWindowSize();
  const { tokens, isError } = useTokens(initialCurrency, cryptoCurrencies);

  if (isError) console.log(isError);

  const handleRemove = (name) => {
    if (cryptoCurrencies.length === 1) return;
    setCryptoCurrencies(cryptoCurrencies.filter((item) => item !== name));
  };
  const handleChange = (name) => {
    console.log(`Editing ${name}`);
  };
  const handleMove = (name) => {
    console.log(`Moving ${name}`);
  };
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const newList = Array.from(cryptoCurrencies);
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggableId);

    setCryptoCurrencies(newList);
  };

  const handleClick = ({ action, name }) => {
    console.log(`You want to ${action} token ${name}`);
    if (action === REMOVE) handleRemove(name);
    if (action === CHANGE) handleChange(name);
    if (action === MOVE) handleMove(name);
  };

  useEffect(() => {
    if (tokens) {
      const tokensList = Object.entries(tokens.RAW).map(([name, data]) => ({
        name,
        price: data[initialCurrency].PRICE,
        changeLastDay: data[initialCurrency].CHANGEPCT24HOUR,
      }));
      setTokensData(tokensList);
      setCurrencySymbol(
        tokens.DISPLAY[cryptoCurrencies[0]][initialCurrency].TOSYMBOL
      );
    }
  }, [tokens, cryptoCurrencies, initialCurrency]);

  useEffect(() => {
    window.history.replaceState(
      {},
      '',
      cryptoCurrencies.join('-').toLowerCase()
    );
  }, [cryptoCurrencies]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {tokensData.length > 0 ? (
        <Droppable
          droppableId="tokens-list"
          direction={screenSize.width > 768 ? 'horizontal' : 'vertical'}
        >
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              <InnerList
                tokensData={tokensData}
                cryptoCurrencies={cryptoCurrencies}
                currencySymbol={currencySymbol}
                handleClick={handleClick}
                setCryptoCurrencies={setCryptoCurrencies}
              />
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      ) : (
        <LoadingScreen>
          <h1>Loading...</h1>
        </LoadingScreen>
      )}
    </DragDropContext>
  );
};

TokensList.propTypes = {
  initialCryptoCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialCurrency: PropTypes.string.isRequired,
};

export default TokensList;
