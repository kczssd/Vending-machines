import Taro from '@tarojs/taro';
import request from './request'

export class getPay{
    private static instance: getPay|null = null;
    sku: number;
    id: string;
    private constructor(sku:number,id:string) {
        this.sku = sku;
        this.id = id;
        this.pay();
    }
    public static getInstance(sku:number,id:string): getPay {
        if (!getPay.instance) {
            getPay.instance = new getPay(sku,id);
        }
        return getPay.instance;
    }
    public async pay() {
        let codeData = await Taro.login();
        console.log(codeData);
        let { data: { status, payMini } } = await request({
            method: "POST",
            url: "/getLogin",
            data: {
                code: codeData.code,
                machineId: this.id,
                sku:this.sku
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
            await Taro.requestPayment({
                timeStamp:timeStamp,
                nonceStr:nonceStr,
                package: 'prepay_id='+prepayId,
                signType:signType,
                paySign:paySign,
                success:()=>{
                    getPay.instance=null;
                    Taro.showModal({
                        title: '操作提示',
                        content: '支付成功,正在出货',
                        showCancel: false,
                        confirmText: '确定'
                    })
                },
                fail:()=>{
                    getPay.instance=null;
                    Taro.showModal({
                        title: '操作提示',
                        content: '支付失败，请重新尝试',
                        showCancel: false,
                        confirmText: '确定'
                    })
                }
            })
        } else {
            getPay.instance=null;
            Taro.showModal({
                title: '操作提示',
                content: '库存不足',
                showCancel: false,
                confirmText: '确定'
            })
        }
    }
}

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