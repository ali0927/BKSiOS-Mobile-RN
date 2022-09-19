import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const CurrencySymbol = () => {
  const country = useSelector(state => state.locationInfoReducer).locationInfo;
  const [symbol, setSymbol] = useState('€');
  useEffect(() => {
    switch (country) {
      case 'TR':
        setSymbol('₺');
        break;
      case 'GB':
        setSymbol('£');
        break;
      case 'US':
        setSymbol('$');
        break;
      default:
        break;
    }
  }, [country]);
  return <>{symbol}</>;
};

export default CurrencySymbol;
