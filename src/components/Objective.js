import React, { useState } from 'react';
import Tab from './Tab';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardBox from './CardBox';

const Objective = () => {
  const data = [
    { id: '1', tabTitle: 'Mission & Vision', tabContent: '' },
    { id: '2', tabTitle: 'Strategic Business Objectives', tabContent: '' }
  ];
  const [count, setCount] = useState(1);
  const [objindex, setObjindex] = useState(1);

  return (
    <React.Fragment style={{ marginTop: '20rpx', marginLeft: '10rpx' }}>
      <h1 className='title'>Set Security Strategy </h1>
      <br />
      <Tab data={data} />
      <CardBox style={{ marginBottom: '20px' }}></CardBox>
      {[...Array(count - 1)].map((_, i) => (
        <CardBox key={i - 1} />
      ))}
      <Button
        variant='contained'
        style={{ display: 'flex', marginLeft: 'auto', backgroundColor: '#25397D', marginTop: '5px', color: 'white' }}
        onClick={() => setCount(count + 1)}
      >
        <AddCircleIcon style={{ margin: '0 3px' }}></AddCircleIcon>
        Add Objective
      </Button>
    </React.Fragment>
  );
};

export default Objective;
