import React,{useEffect,useState} from 'react'
import { View,Picker, ITouchEvent} from '@tarojs/components'
import styles from './index.module.less'
import GoodsItem from '../../modules/goods/index'
import useGoods from '../../tools/status'
import { navigateTo, request } from '@tarojs/taro'

export default ()=>{
  const MachineID = localStorage?.getItem('MachineID');
  const state = ["价格从高到低","价格从低到高","库存从多到少"];
  const {goods,setgoods,priceHight2Low,priceLow2Hight,stockHight2low}= useGoods();
  const [refresh, setrefresh] = useState([]);
  console.log(goods);
  
  function sortKind(e):void{
    let kind = e.detail.value;
    switch(kind){
      case 0:
        priceHight2Low();
        setrefresh(refresh.slice())
        break;
      case 1:
        priceLow2Hight();
        setrefresh(refresh.slice())
        break;
      case 2:
        stockHight2low();
        setrefresh(refresh.slice())
        break;
    }
  }
  async function checkSku(e:ITouchEvent,sku:number):Promise<void>{
    let {data:{QRCodeAddress}} = await request({
      method:"POST",
      url:API+"/checkSkuAvailability",
      data:{
        sku
      }
    })
    navigateTo({
      url:`/pages/pay/index?QRCode=${QRCodeAddress}&sku=${sku}`
    })
  }
  async function getGoods():Promise<void>{
    let {data:{data}} = await request({
      method:"POST",
      url:API+"/getInventory",
      data:{MachineID}
    });
    setgoods(data);
  }
  useEffect(()=>{
    getGoods();
  },[])
  return (
    <View className={styles.mainPage}>
        <View className={styles.head}>
          <Picker mode="selector" range={state} onChange={sortKind} className={styles.sort}>排序方式</Picker>
        </View>
        <main className={styles.goodsList}>
          {
            goods?
              goods.map((item,index)=>{
                return <GoodsItem {...item} onClick={checkSku} key={index}></GoodsItem>
              })
            :
            <></>
          }
        </main>
    </View>
  )
}