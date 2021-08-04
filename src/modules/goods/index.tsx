import React from "react";
import styles from "./index.module.less";
import { View,Text,Image, Button } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
import {Goods} from "../../interface/type"

export default ({
  sku,
  name,
  stock,
  price,
  type,
  imageUrl,
  imageDetailUrl
}: Goods) => {
  return (
    <View className={styles.content} >
      <Image className={styles.img} src={imageUrl} />
      <View className={styles.cold}>
      Cold
      </View>
      <View className={styles.info}>
        <View>
          <Text className={styles.name}>{name}</Text>
          <View className={styles.price}>
            {(price/100).toFixed(2)}
          </View>
        </View>
        <Button className={styles.buy} 
        onClick={()=>navigateTo({
          url:`/pages/detail/index?sku=${sku}&name=${name}&stock=${stock}&price=${price}&type=${type}&imageUrl=${imageDetailUrl}`
        })}
        >购买</Button>
      </View>
    </View>
  );
};
