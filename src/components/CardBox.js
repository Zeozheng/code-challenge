import React, {useState, useEffect} from "react";
import "./styles.css";
import { Container, Grid, TableRow, TextField, Button } from "@material-ui/core";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import _ from 'lodash';


// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );

//   useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  // convert everything to a string!
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey)||
      defaultValue
  );
  //console.log(value,"111")
  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};


const CardBox = (props) =>{
  const [startDate, setStartDate] = useStateWithLocalStorage('startDate', '');
  const [endDate, setEndDate] = useStateWithLocalStorage('endDate', '');
  const [objective, setObjective] = useStateWithLocalStorage('objective', '');
  const [measureInput, setMeasureInput] = useStateWithLocalStorage('measure', ['']);
  const [measureList, setMeasureList] = useState([{measure:''}]);
  const maxObj = 3;
  const [count, setCount] = useState(0);
  const [maxMeasures, setMaxMeasures] = useState(0);
  const [keyMeasures, setKeyMeasures] = useStateWithLocalStorage('keyMeasures',['']);

  const primaryColor = {color: '#25397D', fontSize: '12px' };
  // const ttt = props.index;
  // console.log(ttt); 
  


  const handleMeasureAdd = ()=>{
    if (count <2){
      setCount(count + 1) 
      setMeasureList([...measureList, ['']])
    }else{setMaxMeasures(1)}
  }
  const handleMeasureAdd2 = ()=>{
    if (count <2){
      setCount(count + 1) 
      setKeyMeasures([...keyMeasures, ''])
    }else{setMaxMeasures(1)}
  }
  const handleMeasureChange = (e, index)=>{
    const {name, value} = e.target;
    const list = [...measureList];
    list[index][name] = value;
    setMeasureList(list);
  }

    return( 
    <div className = 'box'>
      <div className="container" 
      >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <label htmlFor = 'Objective' className="insideTitle">Objective 1</label>
          <TextField 
          fullWidth 
          type = 'text'
          variant="outlined" 
          value = {objective}
          onChange = {(e) => {setObjective(e.target.value)}}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <label className="insideTitle">Start Date</label>         
          <TextField
            id="date"
            type="date"
            value = {startDate}
            onChange={(e) => {setStartDate(e.target.value)
              // console.log(e.target.value)
            }}
            fullWidth variant="outlined"
          />

        </Grid>
        <Grid item xs={12} md={3}>
          <label className="insideTitle">End Date</label>
          {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          <TextField
            id="date"
            type="date"
            defaultValue=""
            value = {endDate}
            onChange={(e) => {setEndDate(e.target.value)
              // console.log(e.target.value)
            }}
            fullWidth variant="outlined"
          />
        </Grid>
        {/* <Grid item xs={4} md={4}>
          Key Mearsures                   
        </Grid>
        <Grid item xs={2} md={2} style = {{ textAlign: "right"}}>
          Add additional key measures                 
        </Grid>
        <Grid item xs={12} md={12}>
            
        </Grid>
        <Grid item xs={6} md={6}>               
          <TextField fullWidth label="" variant="outlined" />
        </Grid> */}
        <Grid container item xs={6} md={6} spacing={1}>
            <Grid item xs={7} md={7} 
            >
              <label className="insideTitle">Key Mearsures </label>                  
            </Grid>
            <Grid item xs={5} md={5} >
              <Button style = {primaryColor} 
              // onClick={() => setCount(count + 1)}
              onClick={
                //handleMeasureAdd
                handleMeasureAdd2
                } >
                Add additional key measures  <AddCircleIcon style = {{marginLeft: '5px', display: "flex", textAlignVertical: 'center'}}></AddCircleIcon>    
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
            {console.log('keyMeasures',keyMeasures)}
            {typeof(keyMeasures) != 'string'? 
            keyMeasures.map((a, i) => (
              <Grid xs = {12} md= {12}
                className='list-item'
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                <TextField
                  fullWidth 
                  variant="outlined" 
                  type='text'
                  value={a}
                  onChange={(e) => {
                    const newKeyMeasure = keyMeasures
                    newKeyMeasure[i] = e.target.value;
                    setKeyMeasures([...newKeyMeasure]);
                  }}
                  required
                />
                
                </Grid>
              ))
              :
              //console.log("nimasile")}
              keyMeasures.split(",").map((a, i) => (
                <Grid xs = {12} md= {12}
                className='list-item'
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                <TextField
                  fullWidth 
                  variant="outlined" 
                  type='text'
                  value={a}
                  onChange={(e) => {
                    const newKeyMeasure = keyMeasures.split(",")
                    newKeyMeasure[i] = e.target.value;
                    setKeyMeasures([...newKeyMeasure]);
                  }}
                  required
                />
                
                </Grid>
              ))}

            <Button variant="contained" style = {{backgroundColor: '#25397D', marginTop: '5px', color:'white'}}>Update</Button> 
            {maxMeasures === 1 ?<Grid xs = {6} md={6} style = {{color: 'red', marginLeft: 'auto', marginTop: '5px'}}>The maximum Key Measures is 3</Grid>:''} 
        </Grid>
        { (new Date(startDate)).getTime() > (new Date(endDate)).getTime()? 
        <Grid xs = {6} md = {6} style = {{textAlign: "center", color:'red'}}>
          End date cannot before start date!
        </Grid>:''}
       {/* {console.log("chongxin",bef)} */}
      </Grid>
    </div>

    </div>);
}

export default CardBox;