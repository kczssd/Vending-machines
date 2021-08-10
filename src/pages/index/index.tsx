import React, { useEffect, useState } from 'react'
import {getUserProfile} from '@tarojs/taro'
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
  const positionArray = ["m100","m102"];
  const {MachineID,setMachineID} = useInfo();
  const Types = ["水", "罐装", "果汁", "牛奶", "茶", "酒"];
  const { goods, setgoods } = useGoods();
  const [Avatar,setAvater] = useState(person)

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
        <Image mode="aspectFit" onClick={()=>{
          getUserProfile({
            desc: '用于完善个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              const {userInfo:{avatarUrl}} = res;
              setAvater(avatarUrl)
            }
          })
        }} src={Avatar} className={styles.person}></Image>
        <View>
          <Picker className={styles.picker} range={positionArray} onChange={(e)=>{
            setMachineID(positionArray[e.detail.value])
          }}>
            <Image mode="aspectFit" src={location} className={styles.positionIcon}></Image>
            <View className={styles.position}>{MachineID}  &gt;</View>
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
                    for={item}
                    className={index===current?styles.typeActive:styles.type}
                    onClick={() => {
                      setcurrent(index);
                    }}
                  >
                    <Image mode="aspectFit" className={index===current?styles.iconActive:styles.icon} src={imgArray[current === index ? 'light' : 'dark'][index]} />
                    <View className={current === index?styles.textActive:styles.text} >{item}</View>
                  </Label>
                </RadioGroup>)
            }
            )
          }
        </View>
      </View>
      <View className={styles.goodsContent}>
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
    </View>
  )
}