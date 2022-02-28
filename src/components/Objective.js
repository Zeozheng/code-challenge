import { Button } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect, useState } from 'react';
import CardBox from './CardBox';
import Tab from './Tab';

// const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
//   // convert everything to a string!
//   const [value, setValue] = useState(localStorage.getItem(localStorageKey) || defaultValue);
//   //console.log(value,"111")
//   useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value, localStorageKey]);

//   return [value, setValue];
// };

const Objective = () => {
  const tab = [
    { id: '1', tabTitle: 'Mission & Vision', tabContent: '' },
    { id: '2', tabTitle: 'Strategic Business Objectives', tabContent: '' }
  ];
  const [count1, setCount1] = useState(0);
  const [objectives, setObjectives] = useState([]);
  const [maxObjectives, setMaxObjectives] = useState(0);
  const [objectiveData, setObjectiveData] = useState([]);

  const handleMeasureAdd = () => {
    if (count1 < 3) {
      setCount1(count1 + 1);
      localStorage.setItem('Objectives', JSON.stringify(objectives));
      setObjectives([...objectives, '']);
    } else {
      setMaxObjectives(1);
    }
  };
  //console.log(count1);

  useEffect(() => {
    const localData = localStorage.getItem('localData');

    if (!localData) {
      return;
    }

    try {
      const local = JSON.parse(localData);
      setObjectiveData([local]);
      console.log(local, '222222');
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <React.Fragment style={{ marginTop: '20rpx', marginLeft: '10rpx' }}>
      <h1 className='title'>Set Security Strategy </h1>
      <br />
      <Tab tab={tab} />
      <CardBox count1={count1 - 1} style={{ marginBottom: '20px' }}></CardBox>
      {(objectiveData || []).map((objective, index) => (
        <CardBox data={objective} key={index} index={index} />
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
