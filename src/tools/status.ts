import {createModel} from 'hox'
import {useState} from 'react'
import {Goods} from '../interface/type'

function useGoods(){
    const [goods, setgoods] = useState<Array<Goods>|null>(null);
    const priceHight2Low = ()=>setgoods(goods!.sort((a,b)=>b.price-a.price))
    const priceLow2Hight = ()=>setgoods(goods!.sort((a,b)=>a.price-b.price))
    const stockHight2low = ()=>setgoods(goods!.sort((a,b)=>b.stock-a.stock))
    return{
        goods,
        setgoods,
        priceHight2Low,
        priceLow2Hight,
        stockHight2low
    }
}
export default createModel(useGoods)