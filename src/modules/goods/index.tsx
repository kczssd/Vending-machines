import React,{MouseEventHandler} from "react";
import styles from "./index.module.less";
import { ITouchEvent, View } from "@tarojs/components";
export default ({
  sku,
  name,
  stock,
  price,
  type,
  imageUrl,
  onClick:click
}: {
  sku: number;
  name: string;
  stock: number;
  price: number;
  type: string;
  imageUrl: string;
  onClick:(e:ITouchEvent,sku:number)=>void;
}) => {
  return (
    <View className={styles.content}>
      {
        stock===0?
        <View>
          <View className={styles.cover}>
            <img className={styles.img} src={imageUrl} />
            <View className={styles.info}>
              <p className={styles.name}>{name}</p>
              <p>
                <span>暂无库存</span>
                <span>{type}</span>
              </p>
              <span className={styles.price}>{(price/100).toFixed(2)}￥</span>
            </View>
          </View>
          <svg className={styles.nostock} width="150" height="150">
            <circle cx="75" cy="75" r="75" fill="#e4e4e4"></circle>
            <text fill="black" x="36" y="86">无货</text>
          </svg>
        </View>
        :
        <View style={{height:"7.46667rem"}} onClick={(e)=>click(e,sku)}>
          <img className={styles.img} src={imageUrl} />
          <View className={styles.info}>
            <p className={styles.name}>{name}</p>
            <p>
              <span>库存:{stock}</span>
              <span>{type}</span>
            </p>
            <span className={styles.price}>{(price/100).toFixed(2)}￥</span>
          </View>
        </View>
      }
      
    </View>
  );
};
