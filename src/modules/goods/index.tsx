import React from "react";
import styles from "./index.module.less";
import { View,Text,Image, Button } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
import {Goods} from "../../interface/type"
import {getPay} from '../../tools/pay'
import useInfo from '../../tools/basicInfo'

export default ({
  sku,
  name,
  stock,
  price,
  type,
  imageUrl,
  imageDetailUrl
}: Goods) => {
  const { MachineID } = useInfo();
  return (
    <View className={styles.content} >
      <Image mode="widthFix" className={styles.img} src={imageUrl} onClick={()=>navigateTo({
          url:`/pages/detail/index?sku=${sku}&name=${name}&stock=${stock}&price=${price}&type=${type}&imageUrl=${imageDetailUrl}`
        })}/>
      <View className={styles.cold}>
      Cold
      </View>
      <View className={styles.info}>
        <View className={styles.textGroup}>
          <Text className={styles.name}>{name}</Text>
          <View className={styles.price}>
            {(price/100).toFixed(2)}
          </View>
        </View>
        <Button className={styles.buy} 
        onClick={()=>getPay(sku,MachineID)}
        >购买</Button>
      </View>
    </View>
  );
};
