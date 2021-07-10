import React from "react";
import styles from "./index.module.less";
import { Image, View } from "@tarojs/components";
export default ({
  sku,
  name,
  stock,
  price,
  type,
  imageUrl,
}: {
  sku: Number;
  name: String;
  stock: Number;
  price: Number;
  type: String;
  imageUrl: string;
}) => {
  return (
    <View className={styles.content}>
      <img className={styles.img} />
      <View className={styles.info}></View>
    </View>
  );
};
