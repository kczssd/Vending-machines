import { Button, View, Image } from '@tarojs/components';
import Taro, { useRouter, navigateBack } from '@tarojs/taro';
import request from '../../tools/request'
import useInfo from '../../tools/basicInfo'
import React from 'react';
import styles from "./index.module.less"
import imgArray from '../../tools/imgArray'
import back from '../../img/back.png'

export default () => {
    const { MachineID } = useInfo();
    const { params: { sku, name, price, type, imageUrl } } = useRouter();
    const Types = ["水", "罐装", "果汁", "牛奶", "茶", "酒"];

    // async function checkSku(sku:number,id:string):Promise<void>{
    //     let {data:{qrcodeAddress,userId}} = await request({
    //         method:"POST",
    //         url:"/checkSkuAvailability",
    //         data:{
    //         machineId:id,
    //         sku
    //         }
    //     })
    //     navigateTo({
    //         url:`/pages/pay/index?QRCode=${qrcodeAddress}&sku=${sku}&id=${userId}`
    //     })
    // }

    async function checkSku(sku: number, id: string): Promise<void> {
        let codeData = await Taro.login();
        console.log(codeData);
        
        let { data: { status, openid, payMini } } = await request({
            method: "POST",
            url: "/getLogin",
            data: {
                code: codeData.code,
                machineId: id,
                sku
            }
        })
        if (status == 200) {
            let {
                timeStamp,
                nonceStr,
                prepayId,
                signType,
                paySign
            } = payMini;
            let payData = await Taro.requestPayment({
                timeStamp:timeStamp,
                nonceStr:nonceStr,
                package: 'prepay_id='+prepayId,
                signType:signType,
                paySign:paySign
            })
            if (payData && payData.errMsg === 'requestPayment:ok') {
                Taro.showModal({
                  title: '操作提示',
                  content: '支付成功,正在出货',
                  showCancel: false,
                  confirmText: '确定'
                })
              } else {
                Taro.showModal({
                  title: '操作提示',
                  content: '支付失败，请重新尝试',
                  showCancel: false,
                  confirmText: '确定'
                })
              }
        } else {
            Taro.showModal({
                title: '操作提示',
                content: '支付失败，请检查网络后重试',
                showCancel: false,
                confirmText: '确定'
            })
        }
    }

    return (
        <View className={styles.main}>
            <View onClick={() => navigateBack()} className={styles.back}>
                <Image className={styles.backIcon} mode="aspectFit" src={back}></Image>
            </View>
            <Image className={styles.imgInfo} src={imageUrl as string} />
            <View className={styles.content}>
                <View className={styles.title}>
                    <View className={styles.h3}>
                        {name}
                        <View className={styles.cold}>
                            Cold
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
                <Button onClick={() => { checkSku(parseInt(sku!), MachineID!) }} className={styles.pay}>Pay</Button>
            </View>
        </View>
    );
}

