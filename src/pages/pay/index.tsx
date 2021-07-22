import React,{useEffect,useState} from 'react'
import { View, Text } from '@tarojs/components'
import useGoods from '../../tools/status'
import weChat from '@/img/weChat.png'
import styles from './index.module.less'
import { connectSocket, navigateBack, navigateTo, useRouter } from '@tarojs/taro';

export default function Payment(){
  const {goods}= useGoods();
  const {params:{sku,QRCode,id}} = useRouter();
  const [filish, setfilish] = useState(false)
  const productInfo = goods!.filter((item)=>item.sku===parseInt(sku as string))[0];
  async function onSocket():Promise<void>{
    let socket = await connectSocket({
      url:`ws://47.110.77.252:8080/websocket/${id}`,
    })
    socket.onMessage(function({data}:{data:string}){
      console.log('onMessage',data);
      if(data==="success"){
        setfilish(true);
        let timer = setTimeout(()=>{
          navigateBack();
          clearTimeout(timer)
        },2000)
      }
    })
  }
  useEffect(() => {
    onSocket()
  }, [])
  return (
    <View className={styles.back}>
      <View className={styles.main}>
        <View className={styles.left}>
          <img className={styles.img} src={productInfo.imageUrl} />
          <View className={styles.name}>{productInfo.name}</View>
          {
            filish?
            <Text className={styles.price}>支付成功</Text>:
            <Text className={styles.price}>{(productInfo.price/100).toFixed(2)}￥</Text>
          }
        </View>
        <View className={styles.right}>
          <img className={styles.img} src={QRCode} />
          {
            filish?
            <Text className={styles.message}>支付成功</Text>
            :
            <Text className={styles.message}>等待支付中</Text>
          }
          <img className={styles.weChat} src={weChat}/>
        </View>
      </View>
    </View>
  )
}