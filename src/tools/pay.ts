import Taro ,{ navigateTo } from '@tarojs/taro';
import request from './request'

export async function getPay(sku: number, id: string): Promise<void> {
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

export async function checkSku(sku:number,id:string):Promise<void>{
    let {data:{qrcodeAddress,userId}} = await request({
        method:"POST",
        url:"/checkSkuAvailability",
        data:{
        machineId:id,
        sku
        }
    })
    navigateTo({
        url:`/pages/pay/index?QRCode=${qrcodeAddress}&sku=${sku}&id=${userId}`
    })
}