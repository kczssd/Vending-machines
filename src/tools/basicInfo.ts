import {createModel} from 'hox'
import {useState} from 'react'

function useInfo(){
    const [MachineID,setMachineID] = useState("0");
    return{
        MachineID,
        setMachineID
    }
}
export default createModel(useInfo)