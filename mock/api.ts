import {mock,Random} from 'mockjs'

export default {
    'POST /api/getInventory': mock({
        status: 200,
        info: "success",
        "inventories|28-40": [{
            "sku|+1": 1,
            name: "可乐",
            "stock|0-4": 5,
            "price|2000-6000": 3000,
            "type|0-5":1,
            "imageUrl|1":[
                Random.image('100x200', '#02adea', 'img'),
                Random.image('100x300', '#02adea', 'img2'),
                Random.image('100x100', '#02adea', 'img3'),
                Random.image('100x150', '#02adea', 'img4'),
                Random.image('100x250', '#02adea', 'img5'),
            ],
            imageDetailUrl:Random.image('200x200', '#02adea', 'img'),
        }],
    }),
    'POST /api/checkSkuAvailability':mock({
        status : 200,
        info : "success",
        "qrcodeAddress" : Random.image('200x200', '#02adea', 'QR'),
        "userId": 1
    }),
    'POST /api/getLogin':mock({
        status:200,
        info:"success",
        "userId":1,
        
    })
  }