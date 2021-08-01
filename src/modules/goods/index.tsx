import React,{MouseEventHandler} from "react";
import styles from "./index.module.less";
import { ITouchEvent, View } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
export default ({
  sku,
  name,
  stock,
  price,
  type,
  imageUrl
}: {
  sku: number;
  name: string;
  stock: number;
  price: number;
  type: string;
  imageUrl: string;
}) => {
  const MachineID = localStorage?.getItem('MachineID');
  return (
    <View className={styles.content} onClick={()=>navigateTo({
    url:`/pages/detail/index?sku=${sku}&name=${name}&stock=${stock}&price=${price}&type=${type}&imageUrl=${imageUrl}`
    })}>
      <img className={styles.img} src={imageUrl} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>￥{(price/100).toFixed(2)}</span>
      </div>
    </View>
  );
};
