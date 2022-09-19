import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Currency = ({price}) => {
  // const { country, rateTry, rateUsd, rateGbp } = useAppContext();
  const country = useSelector(state => state.locationInfoReducer).locationInfo;
  const rateTry = useSelector(state => state.currencyInfoReducer).rateTry;
  const rateUsd = useSelector(state => state.currencyInfoReducer).rateUsd;
  const rateGbp = useSelector(state => state.currencyInfoReducer).rateGbp;
  const [rate, setRate] = useState(Number(price));
  useEffect(() => {
    switch (country) {
      case 'TR':
        setRate(Number(price) * rateTry);
        break;
      case 'GB':
        setRate(Number(price) * rateGbp);
        break;
      case 'US':
        setRate(Number(price) * rateUsd);
        break;
      default:
        setRate(Number(price));
        break;
    }
  }, [country, rateTry, rateGbp, rateUsd, price]);
  return <>{rate.toFixed(2)}</>;
};

export default Currency;
