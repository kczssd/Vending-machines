import React,{useEffect,useState} from 'react'
import { View,Picker, ITouchEvent, Input, Icon} from '@tarojs/components'
import styles from './index.module.less'
import GoodsItem from '../../modules/goods/index'
import useGoods from '../../tools/status'
import { navigateTo, request } from '@tarojs/taro'
import sliders from '../../img/sliders.png'
import slide from '../../img/slide.png'


export default ()=>{
  const MachineID = localStorage?.getItem('MachineID');
  const state = ["价格从高到低","价格从低到高","库存从多到少"];
  const Types = ["Water","Can","Tea","Juice","milk"];
  const showMode = ["auto","showAll","showSlide"];
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
  async function getGoods():Promise<void>{
    let {data:{inventories}} = await request({
      method:"POST",
      url:API+"/getInventory",
      data:{machineId:MachineID}
    });
    setgoods(inventories);
  }
  useEffect(()=>{
    getGoods();
  },[])
  return (
    <View className={styles.mainPage}>
        <View className={styles.head}>
          <View  className={styles.search}>
            <Icon className={styles.icon} size='20' type='search' />
            <input className={styles.input} placeholder="Search" type='text' />
            <Picker mode="selector" range={state} onChange={sortKind} className={styles.sort}>
              <img src={sliders} />
            </Picker>
          </View>
        </View>
        <View className={styles.swiper}>
          <View className={styles.content}>
            {
              Types.map((item,index)=>{
                return (
                <div key={"type"+index}>
                  <input id={item} style={{display:'none',position:'absolute'}} type="radio" name="swiper" defaultChecked={index===0}/><label htmlFor={item} className={styles.type}>{item}</label>
                </div>)
                }
              )
            }
          </View>
          <Picker className={styles.slide} range={showMode} onChange={(e)=>{console.log(e);
          }}>
            <img src={slide} />
          </Picker>
        </View>
        <main className={styles.goodsList}>
          {
            goods?
              goods.map((item,index)=>{
                return <GoodsItem {...item} key={index}></GoodsItem>
              })
            :
            <></>
          }
        </main>
    </View>
  )
}