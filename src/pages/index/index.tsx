import React from 'react'
import { View,Picker,Text} from '@tarojs/components'
import styles from './index.module.less'
import {Post} from 'react-axios'
import GoodsItem from '@/modules/goods/index'

export default (props)=>{
  const MachineID = localStorage.getItem('MachineID');
  const state = ["价格从高到低","价格从低到高","库存从多到少"];
  function sortKind(e):void{
    console.log(e.detail.value);
  }
  
  return (
    <View className='index'>
        <View className={styles.head}>
          <Picker mode="selector" range={state} onChange={sortKind} className={styles.sort}>排序方式</Picker>
        </View>
        <main>
          <Post url="/api/getInventory" params={{MachineID}} >
            {(e,res,isLoading)=>{
              let data = res?.data.data;
              console.log(data);
              if(e){
                return <Text>网络出现了错误</Text>
              }
              if(data){
                  return data.map((item,index)=>{
                    console.log(item);
                    return <GoodsItem {...item} key={index}></GoodsItem>
                  })
              }
              return <></>
            }}
          </Post>
        </main>
    </View>
  )
}