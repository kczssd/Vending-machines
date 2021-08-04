import { request } from '@tarojs/taro'

type Method = 'GET'|'POST'
export default async ({method,url,data}:{method:Method,url:string,data:object}):Promise<Taro.request.SuccessCallbackResult<any>|undefined>=>{
    if(process.env.TARO_ENV === 'h5'){
        let res = await request({
            method,
            url: API + url,
            data
        });
        return res;
    }else if(process.env.TARO_ENV === 'weapp'){
        let res = await request({
            method,
            url: WEAPI+url,
            data
        });
        return res;
    }
}