import React from 'react';
import { useParams } from 'react-router-dom';
import GetAllSpots from './GetAllSpots';
import GetDetailsSpot from './GetDetailsSpot';

const SpotBrowser = () => {
    const { id } = useParams();
    console.log('FROM SPOTBROWSER',id)
    if (id) {
        console.log('im entering this statemnet')
      return <GetDetailsSpot/>;

    }
    console.log('I am not entering getdetailsspot')
    return <GetAllSpots />;
  };

export default SpotBrowser;
