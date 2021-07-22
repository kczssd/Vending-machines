import {mock,Random} from 'mockjs'

export default {
    'POST /api/getInventory': mock({
        status: 200,
        info: "success",
        "inventories|6-8": [{
            "sku|+1": 1,
            name: "可乐",
            "stock|0-4": 5,
            "price|2000-6000": 3000,
            type: "瓶装",
            imageUrl:Random.image('100x200', '#02adea', 'img')
        }],
    }),
    'POST /api/checkSkuAvailability':mock({
        "status|1" : [200,500],
        info : "success",
        "qrcodeAddress" : Random.image('200x200', '#02adea', 'QR')
    })
  }