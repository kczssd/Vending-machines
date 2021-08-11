import { Button, View, Image } from '@tarojs/components';
import { useRouter, navigateBack } from '@tarojs/taro';
import {getPay} from '../../tools/pay'
import useInfo from '../../tools/basicInfo'
import React, { useState } from 'react';
import styles from "./index.module.less"
import imgArray from '../../tools/imgArray'
import back from '../../img/back.png'

export default () => {
    const { MachineID } = useInfo();
    const { params: { sku, name, price, type, imageUrl } } = useRouter();
    const Types = ["水", "罐装", "果汁", "牛奶", "茶", "酒"];
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
                            冷
                        </View>
                    </View>
                    <View className={styles.h6}>{name}</View>
                </View>
                <View className={styles.info}>
                    <View className={styles.type}>
                        <Image className={styles.typeIcon} mode="aspectFit" src={imgArray['dark'][parseInt(type!)]} />
                        <View>{Types[parseInt(type!)]}</View>
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
                }} className={styles.pay}>购买</Button>
            </View>
        </View>
    );
}

