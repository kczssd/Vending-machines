import { ITouchEvent, View } from '@tarojs/components';
import { navigateTo, request, useRouter } from '@tarojs/taro';
import React from 'react';
import styles from "./index.module.less"
import bottle from '../../img/bottle.png'
import canned from '../../img/canned.png'

export default () => {
    const MachineID = localStorage?.getItem('MachineID');
    const {params:{sku,name,stock,price,type,imageUrl}} = useRouter();
    async function checkSku(sku:number,id:string):Promise<void>{
        let {data:{qrcodeAddress,userId}} = await request({
            method:"POST",
            url:API+"/checkSkuAvailability",
            data:{
            machineId:id,
            sku
            }
        })
        navigateTo({
            url:`/pages/pay/index?QRCode=${qrcodeAddress}&sku=${sku}&id=${userId}`
        })
    }
    return (
        <div className={styles.main}>
            <img className={styles.imgInfo} src={imageUrl} alt="" />
            <main>
                <div className={styles.title}>
                    <h3>
                        {name}
                    </h3>
                    <h6>
                        {name}
                    </h6>
                </div>
                <div className={styles.stock}>
                    剩余{stock}
                </div>
                <div className={styles.type}>
                    <img src={/瓶/.test(type!)?bottle:canned} alt="" />
                    <p>{type}</p>
                </div>
                <div className={styles.price}>
                    {(parseInt(price!)/100).toFixed(2)}
                </div>
                <button onClick={()=>{checkSku(parseInt(sku!),MachineID!)}} className={styles.pay}>Pay</button>
            </main>
        </div>
    );
}

