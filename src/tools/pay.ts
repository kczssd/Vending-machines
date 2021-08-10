import Taro from '@tarojs/taro';
import request from './request'

const debounce = (fn:Function,delay:number):Function=>{
    let timer:NodeJS.Timeout;
    return (...args:any)=>{
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn(...args)
        },delay)
    }
}

async function Pay(sku: number, id: string): Promise<void> {
    let codeData = await Taro.login();
    let { data: { status, payMini } } = await request({
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

export const getPay = debounce(Pay,500)

// export async function checkSku(sku:number,id:string):Promise<void>{
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