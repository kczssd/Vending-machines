import { Button, View, Image,Text } from '@tarojs/components';
import { useRouter, navigateBack } from '@tarojs/taro';
import {getPay} from '../../tools/pay'
import useInfo from '../../tools/basicInfo'
import React, { useState } from 'react';
import styles from "./index.module.less"
// import imgArray from '../../tools/imgArray'
import back from '../../img/back.png'

export default () => {
    const { MachineID } = useInfo();
    const { params: { sku, name, price, type, imageUrl } } = useRouter();
    const Types = ["水", "饮料", "酒水"];
    const [Loading, setLoading] = useState(false);
    function showLoading(){
        setLoading(true);
        let timer = setTimeout(()=>{
        setLoading(false);
        clearTimeout(timer)
        },1000)
    }
    return (
        <View className={styles.main}>
            <View onClick={() => navigateBack()} className={styles.back}>
                <Image className={styles.backIcon} mode="aspectFit" src={back}></Image>
            </View>
            <View className={styles.img}>
                <Image mode="aspectFit" className={styles.imgInfo} src={imageUrl as string} />
            </View>
            <View className={styles.content}>
                <View className={styles.title}>
                    <View className={styles.h3}>
                        {name}
                        <View className={styles.cold}>
                            冷饮
                        </View>
                    </View>
                    <View className={styles.h6}>{name}</View>
                </View>
                <View className={styles.info}>
                    <View className={styles.type}>
                    {
                     [<View className={`${styles.typeIcon} iconfont`}>&#xe61c;</View>,
                      <View className={`${styles.typeIcon} iconfont`}>&#xe601;</View>,
                      <View className={`${styles.typeIcon} iconfont`}>&#xe739;</View>][parseInt(type!)]
                    }
                        <View style={type=="2"?{transform:"translateX(2px)"}:{}} className={styles.typeText}>{Types[parseInt(type!)]}</View>
                    </View>
                    <View className={styles.price}>
                        {(parseInt(price!) / 100).toFixed(2)}
                        <View>总价</View>
                    </View>
                </View>
                <Button 
                loading={Loading}
                onClick={(e) => { 
                    e.preventDefault();
                    e.stopPropagation();
                    showLoading();
                    getPay.getInstance(parseInt(sku!), MachineID!) 
                }} className={styles.pay}>支付<Text className={`${styles.payIcon} .iconfont`}>&#xe602;</Text></Button>
            </View>
        </View>
    );
}

