import { Button } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect, useState } from 'react';
import CardBox from './CardBox';
import Tab from './Tab';

const Objective = () => {
  const tab = [
    { id: '1', tabTitle: 'Mission & Vision', tabContent: '' },
    { id: '2', tabTitle: 'Strategic Business Objectives', tabContent: '' }
  ];
  const [count1, setCount1] = useState(0);
  // const [objectives, setObjectives] = useState([]);
  const [maxObjectives, setMaxObjectives] = useState(0);
  const [objectiveData, setObjectiveData] = useState([]);

  const handleObjectiveAdd = () => {
    if (count1 < 3) {
      setCount1(count1 + 1);
      // console.log(count1, '11111111');
      const objectiveData = JSON.parse(localStorage.getItem('Objective'));

      const defaultData = {
        id: objectiveData.length,
        startDate: '',
        endDate: '',
        objectiveName: '',
        keyMeasures: []
      };
      setObjectiveData([...objectiveData, defaultData]);
      localStorage.setItem('Objective', JSON.stringify([...objectiveData, defaultData]));

      console.log(objectiveData, 'what is in the objective');
    } else {
      setMaxObjectives(1);
    }
  };
  //console.log(count1);

  useEffect(() => {
    try {
      const localData = JSON.parse(localStorage.getItem('Objective'));
      if (!localData) {
        return;
      }
      setObjectiveData(localData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <React.Fragment>
      <div style={{ marginTop: '20rpx', marginLeft: '10rpx' }}>
        <h1 className='title'>Set Security Strategy </h1>
        <br />
        <Tab tab={tab} />
        {console.log(objectiveData)}
        {!objectiveData.length ? (
          <CardBox style={{ marginBottom: '20px' }}></CardBox>
        ) : (
          <React.Fragment>
            {(objectiveData || []).map((objective, index) => (
              <CardBox objective={objective} key={index + 1} index={index} />
            ))}
          </React.Fragment>
        )}
        <Button
          variant='contained'
          style={{ display: 'flex', marginLeft: 'auto', backgroundColor: '#25397D', marginTop: '5px', color: 'white' }}
          onClick={handleObjectiveAdd}
        >
          {/* {console.log(objectives)} */}
          <AddCircleIcon style={{ margin: '0 3px' }}></AddCircleIcon>
          Add Objective
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Objective;
