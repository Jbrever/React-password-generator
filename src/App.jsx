import { useState ,useCallback , useEffect} from 'react'
import './App.css'


function App() {
  const [length , setLength] = useState(8);
  const [password , setPassword] = useState('');
  const [numbers , setNumbers] = useState(false);
  const [symbols , setSymbols] = useState(false);
  // function generatePassword(){
  //      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //      if(numbers){
  //       str += '1234567890'
  //      }
  //      if(symbols){
  //       str += '!@#$%^&*(){}~';
  //      }

  // }
    
  const generatePassword = useCallback(()=>{
       let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       let value = '';
       if(numbers){
        console.log(numbers);
        str += '1234567890'
       }
       if(symbols){
        str += '!@#$%^&*(){}~';
       }
       for(let i = 0; i<length; i++){
          let charInd = Math.floor(Math.random()* str.length);
          let char = str.charAt(charInd);
          value += char;
       }
       setPassword(value);
  },[length , numbers , symbols ,setPassword]);
  
  useEffect(()=>{
     generatePassword();
  },[length , numbers , symbols ,setPassword])
  // this hook is important before use of it updation had been delayed 

  const range = (e) =>{
    let val = e.target.value;
    setLength(val);
    generatePassword();
  }
  

  const generateNumbers = (e)=>{
     let val = e.target.checked
     setNumbers(val);
     generatePassword();
  }

//   const generateSymbols = (e)=>{
//     let val = e.target.checked
//     setSymbols(val);
//     generatePassword();
//  }
   
  return (
  <>
       <div className='container'>
          <div className='inp-box'>
             <input  onChange={()=>generateNumbers()}
               className='inp'
               type="text" 
               value={password}
               placeholder='Password Generate'
              />
              <button onClick={generatePassword} className='copyBtn'>Copy</button>
          </div>
          <div className='check-box-container'>
             <input onChange={range} type="range" min={5} max={20} value={length}/>Lenght: {length}
             <label><input  onChange={(e)=>generateNumbers(e)} defaultChecked={numbers} type="checkbox" />Numbers</label>
             <label><input onChange={()=>setSymbols((previousState)=> !previousState)} type="checkbox" />Characters</label>
          </div>
        </div>  
    </>
  )
}

export default App
