import { Button } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect, useState } from 'react';
import CardBox from './CardBox';
import Tab from './Tab';

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  // convert everything to a string!
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || defaultValue);
  //console.log(value,"111")
  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};

const Objective = () => {
  const data = [
    { id: '1', tabTitle: 'Mission & Vision', tabContent: '' },
    { id: '2', tabTitle: 'Strategic Business Objectives', tabContent: '' }
  ];
  const [count1, setCount1] = useState(1);
  const [objectives, setObjectives] = useStateWithLocalStorage('objectives', ['']);
  const [maxObjectives, setMaxObjectives] = useState(0);

  const handleMeasureAdd = () => {
    if (count1 < 3) {
      setCount1(count1 + 1);
      setObjectives([...objectives, '']);
    } else {
      setMaxObjectives(1);
    }
  };
  //console.log(count1);

  return (
    <React.Fragment style={{ marginTop: '20rpx', marginLeft: '10rpx' }}>
      <h1 className='title'>Set Security Strategy </h1>
      <br />
      <Tab data={data} />
      {/* {objectives.map((a, i) => ( */}
      <CardBox count1={count1} style={{ marginBottom: '20px' }}></CardBox>
      {/* ))} */}
      {[...Array(count1 - 1)].map((_, i) => (
        <CardBox key={i - 1} />
      ))}
      <Button
        variant='contained'
        style={{ display: 'flex', marginLeft: 'auto', backgroundColor: '#25397D', marginTop: '5px', color: 'white' }}
        onClick={handleMeasureAdd}
      >
        {console.log(objectives)}
        <AddCircleIcon style={{ margin: '0 3px' }}></AddCircleIcon>
        Add Objective
      </Button>
    </React.Fragment>
  );
};

export default Objective;
