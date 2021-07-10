import mockjs,{Random} from 'mockjs'

export default {
    'POST /api/getInventory': mockjs.mock({
        status: 200,
        info: "success",
        "data|6-30": [{
            "sku|+1": 1,
            name: "可乐",
            "stock|0-8": 5,
            "price|2000-6000": 3000,
            type: "瓶装",
            imageUrl:Random.image('200x100', '#02adea', 'Hello')
        }],
    }),
  }