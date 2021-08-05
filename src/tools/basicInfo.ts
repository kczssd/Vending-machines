import {createModel} from 'hox'
import {useState} from 'react'

function useInfo(){
    const [MachineID,setMachineID] = useState("m100");
    return{
        MachineID,
        setMachineID
    }
}
export default createModel(useInfo)