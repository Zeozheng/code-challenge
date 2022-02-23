import { Button, Grid, TextField } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect, useState } from 'react';
import './styles.css';

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  // convert everything to a string!
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || defaultValue);
  //console.log(value,"111")
  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};

const CardBox = (props) => {
  const [localData, setLocalData] = useStateWithLocalStorage(
    'localData',
    JSON.stringify([
      { startDate: '', endDate: '', objective: '', keyMeasures: [''] },
      { startDate: '', endDate: '', objective: '', keyMeasures: [''] },
      { startDate: '', endDate: '', objective: '', keyMeasures: [''] }
    ])
  );

  const [startDate, setStartDate] = useStateWithLocalStorage('startDate', '');
  const [endDate, setEndDate] = useStateWithLocalStorage('endDate', '');
  const [objective, setObjective] = useStateWithLocalStorage('objective', '');
  const [measureInput, setMeasureInput] = useStateWithLocalStorage('measure', ['']);
  // const [measureList, setMeasureList] = useState([{ measure: '' }]);
  const maxObj = 3;
  const [count, setCount] = useState(0);
  const [maxMeasures, setMaxMeasures] = useState(0);
  const [keyMeasures, setKeyMeasures] = useStateWithLocalStorage('keyMeasures', ['']);
  //console.log('111', localData);
  const primaryColor = { color: '#25397D', fontSize: '12px' };
  // const objNumber = props.i ? props.i + 1 : 0;

  const handleMeasureAdd = () => {
    if (count < 2) {
      setCount(count + 1);
      console.log('111', localData);
      const data = JSON.parse(localData);
      //console.log('op', data, localData, ['123'].push(''));
      data[0]['keyMeasures'].push('');
      const result = JSON.stringify(data);
      // console.log('gg', result);
      setLocalData(result);
    } else {
      setMaxMeasures(1);
    }
  };

  console.log('cccc', count);

  return (
    <div className='box'>
      <div className='container'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <label htmlFor='Objective' className='insideTitle'>
              Objective 1
            </label>
            <TextField
              fullWidth
              type='text'
              variant='outlined'
              value={JSON.parse(localData)[0]['objective']}
              onChange={(e) => {
                const data = JSON.parse(localData);
                data[0]['objective'] = e.target.value;
                const result = JSON.stringify(data);
                setLocalData(result);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <label className='insideTitle'>Start Date</label>
            <input
              id='date'
              type='date'
              value={JSON.parse(localData)[0]['startDate']}
              onChange={(e) => {
                //setStartDate(e.target.value);
                const data = JSON.parse(localData);
                data[0]['startDate'] = e.target.value;
                const result = JSON.stringify(data);
                setLocalData(result);
              }}
              style={{ width: '100%', height: '50px' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <label className='insideTitle'>End Date</label>
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            <input
              id='date'
              type='date'
              defaultValue=''
              value={JSON.parse(localData)[0]['endDate']}
              min={JSON.parse(localData)[0]['startDate']}
              onChange={(e) => {
                const data = JSON.parse(localData);
                data[0]['endDate'] = e.target.value;
                const result = JSON.stringify(data);
                setLocalData(result);
                // console.log(e.target.value)
              }}
              style={{ width: '100%', height: '50px' }}
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

            {/* {
            (measureList.map((singleMeasure, index)=>(
              <Grid key = {index} item xs={12} md={12}>               
              <TextField fullWidth 
              name = "measure"
              variant="outlined"       
              // value = {singleMeasure.measure} 
              value = {measureInput}
              onChange = {(e) => {setMeasureInput(e.target.value)}} 
              />
            </Grid>
            )))
            } */}
            {console.log('keyMeasures', JSON.parse(localData)[0]['keyMeasures'])}
            {JSON.parse(localData)[0]['keyMeasures'].map((a, i) => (
              <Grid
                xs={12}
                md={12}
                className='list-item'
                key={i}
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
                  value={a}
                  onChange={(e) => {
                    const data = JSON.parse(localData);
                    data[0]['keyMeasures'][i] = e.target.value;
                    const result = JSON.stringify(data);
                    //console.log('gg', result);
                    setLocalData(result);
                  }}
                  required
                />
              </Grid>
            ))}

            <Button variant='contained' style={{ backgroundColor: '#25397D', marginTop: '5px', color: 'white' }}>
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
