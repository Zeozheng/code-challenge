import { Button, Grid, TextField } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect, useState } from 'react';
import './styles.css';

const CardBox = ({ objective, index }) => {
  // const [localData, setLocalData] = useStateWithLocalStorage(
  //   'localData',
  //   JSON.stringify([
  //     { startDate: '', endDate: '', objective: '', keyMeasures: [''] },
  //     { startDate: '', endDate: '', objective: '', keyMeasures: [''] },
  //     { startDate: '', endDate: '', objective: '', keyMeasures: [''] }
  //   ])
  // );

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [objectiveName, setObjectiveName] = useState('');
  const [keyMeasures, setKeyMeasures] = useState([]);
  const [maxMeasures, setMaxMeasures] = useState(0);
  const [count, setCount] = useState(0);
  const [localData, setLocalData] = useState({});

  const primaryColor = { color: '#25397D', fontSize: '12px' };

  // console.log(index, 'what is index');

  useEffect(() => {
    if (!objective) {
      return;
    }
    const { objectiveName, startDate, endDate } = objective || {};
    console.log({ objective });
    setKeyMeasures(objective.keyMeasures);
    setStartDate(startDate);
    setEndDate(endDate);
    setObjectiveName(objectiveName);
  }, [objective]);

  const handleMeasureAdd = () => {
    // const keyMeasures = {
    //   keyMeasures: []
    // };
    if (count < 3) {
      setCount(count + 1);

      setKeyMeasures([...keyMeasures, '']);
    } else {
      setMaxMeasures(1);
    }
  };

  const handleUpdate = () => {
    // if (new Date(startDate) >= new Date(endDate)) {
    //   console.error('Start date can not be greater or equal to end date');
    //   return;
    // } else if (!keyMeasures.length) {
    //   console.error('Atleast one key measure required');
    //   return;
    // }

    const localObjective = {
      id: index || 0,
      startDate,
      endDate,
      objectiveName,
      keyMeasures
    };

    const localObjectives = JSON.parse(localStorage.getItem('Objective')) || [];
    const objectiveExists = localObjectives.find((objective) => objective?.id === index);
    if (!objectiveExists) {
      // This just adds
      localObjectives.push(localObjective);
    } else {
      localObjectives[index] = localObjective;
    }
    localStorage.setItem('Objective', JSON.stringify(localObjectives));
  };

  return (
    <div className='box'>
      <div className='container'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <label htmlFor='Objective' className='insideTitle'>
              Objective {(index || 0) + 1}
            </label>
            <TextField
              fullWidth
              type='text'
              variant='outlined'
              // value={localData?.objectiveName || ''}
              // onChange={(e) => {
              //   console.log(localData.objectiveName, 'lol');
              //   setLocalData({ objectiveName: e.target.value });
              // }}
              value={objectiveName}
              onChange={(e) => setObjectiveName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <label className='insideTitle'>Start Date</label>
            <input id='date' type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', height: '50px' }} />
          </Grid>
          <Grid item xs={12} md={3}>
            <label className='insideTitle'>End Date</label>
            <input
              id='date'
              type='date'
              defaultValue=''
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '100%', height: '50px' }}
              disabled={!startDate}
            />
          </Grid>
          <Grid container item xs={6} md={6} spacing={1}>
            <Grid item xs={7} md={7}>
              <label className='insideTitle'>Key Mearsures </label>
            </Grid>
            <Grid item xs={5} md={5}>
              <Button style={primaryColor} onClick={handleMeasureAdd}>
                Add additional key measures <AddCircleIcon style={{ marginLeft: '5px', display: 'flex', textAlignVertical: 'center' }}></AddCircleIcon>
              </Button>
            </Grid>
            {/* {console.log('222', keyMeasures)} */}
            {keyMeasures.map((measure, ind) => (
              <Grid
                xs={12}
                md={12}
                className='list-item'
                key={`key-measure-${ind}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <TextField
                  fullWidth
                  variant='outlined'
                  type='text'
                  value={measure}
                  onChange={(e) => {
                    // console.log('111', e.target.value);
                    const newKeyMeasure = keyMeasures;
                    newKeyMeasure[ind] = e.target.value;
                    setKeyMeasures([...newKeyMeasure]);
                  }}
                  required
                />
              </Grid>
            ))}

            <Button variant='contained' style={{ backgroundColor: '#25397D', marginTop: '5px', color: 'white' }} onClick={handleUpdate}>
              Update
            </Button>
            {maxMeasures === 1 ? (
              <Grid xs={6} md={6} style={{ color: 'red', marginLeft: 'auto', marginTop: '5px' }}>
                The maximum Key Measures is 3
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CardBox;
