export const HandleImagePrefixe=(x:string,prefixe?:string)=>{
    if (x&&x.indexOf("https://")>-1){
        return x
    }
    if (x&&prefixe){
      return  prefixe==="forward"? `https://ipfs.io/ipfs/${x.substring(7)}` : `https://${x.substring(7)}.ipfs.nftstorage.link`

    }

}