import  React , {useState} from "react"
import { useSelector , useDispatch } from "react-redux"
import { decrement, increment , incrementByAmount , reset } from "./feature/Counter/Counter";


export default function App(){
  
    const [number , setNumber ] = useState(0);

    const count = useSelector((state)=>{
        return state.saurabh.value;

    })

    const dispatch = useDispatch();

    console.log(count);

    function handleDecrement(){
        dispatch(decrement());
    }

    function handleIncrement(){
        dispatch(increment());
    }

    function handleInput(e){
        setNumber(e.target.value);
    }
    function handleReset(){
       dispatch(reset())
    }

    function incrementByAmountFn(){
        dispatch(incrementByAmount(Number(number)));
    }

    return(
     <>
       <h2>Count : {count}</h2>
       <button onClick={handleIncrement}>Increment</button>
       <br /><br />
       <button onClick={handleDecrement}>Decrement</button>
       <br /><br />

       <input type="number" onChange={handleInput} />
       <button onClick={incrementByAmountFn}>Inc by Amount</button>
        <br /><br />
        <button onClick={handleReset}>Reset</button>
     </>
    )

}