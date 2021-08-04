import React, { useEffect, useState } from 'react'
import { Label, Radio, RadioGroup, View,Image, Picker } from '@tarojs/components'
import styles from './index.module.less'
import GoodsItem from '../../modules/goods/index'
import useGoods from '../../tools/goods'
import request from '../../tools/request'
import useInfo from '../../tools/basicInfo'
import imgArray from '../../tools/imgArray'
import person from '../../img/person.png'
import location from '../../img/location.png'


export default () => {
  const [current, setcurrent] = useState(0);
  const positionArray = ["一号机","二号机"];
  const {MachineID,setMachineID} = useInfo();
  const Types = ["水", "罐装", "果汁", "牛奶", "茶", "酒"];
  const { goods, setgoods } = useGoods();
  
  async function getGoods(): Promise<void> {
    let { data: { inventories } } = await request({
      method: "POST",
      url: "/getInventory",
      data: { machineId: MachineID }
    }); 
    setgoods(inventories);
  }
  useEffect(() => {
    getGoods();
  }, [MachineID])
  return (
    <View className={styles.mainPage}>
      <View className={styles.head}>
        <Image mode="aspectFit" src={person} className={styles.person}></Image>
        <View>
          <Picker className={styles.picker} range={positionArray} onChange={(e)=>{
            setMachineID(e.detail.value as string)
            // getGoods();
          }}>
            <Image mode="aspectFit" src={location} className={styles.positionIcon}></Image>
            <View className={styles.position}>{positionArray[parseInt(MachineID)]}  &gt;</View>
          </Picker>
            <View className={styles.location}>宁静苑10舍</View>
        </View>
      </View>
      <View className={styles.swiper}>
        <View className={styles.content}>
          {

            Types.map((item, index) => {
              return (
                <RadioGroup key={"type" + index} >
                  <Radio id={item} className={styles.radio} checked={index===current}/>
                  <Label
                    style={index===current?{
                      color:'#fff',
                      border:'2px solid #fff'
                    }:{}}
                    for={item}
                    className={styles.type}
                    onClick={(e) => {
                      setcurrent(index);
                    }}
                  >
                    <Image mode="aspectFit" className={styles.icon} src={imgArray[current === index ? 'light' : 'dark'][index]} />
                    <View className={styles.text} style={{ display: current === index ? 'inline' : 'none' }}>{item}</View>
                  </Label>
                </RadioGroup>)
            }
            )
          }
        </View>
      </View>
      <View className={styles.goodsList}>
        {
          goods ?
            goods
            .filter(item=>item.type===current)
            .map((item, index) => {
              return <GoodsItem {...item} key={index}></GoodsItem>
            })
            :
            <></>
        }
      </View>
    </View>
  )
}