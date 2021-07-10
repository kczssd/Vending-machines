import React,{useEffect} from 'react'
import { useReady } from '@tarojs/taro'

import './app.less'

function App({children}){
  useReady(()=>{
    console.log(1);//小程序
  })
  useEffect(()=>{
    
  },[])
  return (
    <div>
    {children}
    </div>
  )
}

export default App
