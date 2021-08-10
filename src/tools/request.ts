import { request } from '@tarojs/taro'
import {api,Inventories,GetLogin} from '../interface/type'
type Method = 'GET'|'POST'

export default async function Request({method,url,data}:{method:Method,url:"/getLogin",data:object}):Promise<Taro.RequestTask<GetLogin>>;
export default async function Request({method,url,data}:{method:Method,url:"/getInventory",data:object}):Promise<Taro.RequestTask<Inventories>>;
export default async function Request({method,url,data}:{method:Method,url:string,data:object}):Promise<Taro.RequestTask<api>>{
    if(process.env.TARO_ENV === 'h5'){
        let res = await request({
            method,
            url:API + url,
            data
        });
        return res;
    }
    let res = await request({
        method,
        url: WEAPI+url,
        data
    });
    return res;
}