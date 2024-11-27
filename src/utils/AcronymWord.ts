export const AcronymWord=(x:string|undefined,length:number)=>{
    return x&&x.slice(0,length)+"..."+x.slice(-length)
}