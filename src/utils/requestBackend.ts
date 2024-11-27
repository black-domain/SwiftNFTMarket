import {Post} from "./parameterAddress";

export const onClickFetch = async ({logo, featured}: any,account:string) => {
    console.log('fetch');
    console.log(logo, featured);
    const data = {address: account , logo, featured};

   return await fetch( "http://192.168.1.29:3000" + Post, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(e=>e.json())

}

export const onClickGet=async (account:string)=>{
  return  await fetch("http://192.168.1.29:3000" + Post + '?' + account, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(e=>e.json())


}

export const fetchImage =async (or:boolean,l:string,account:string)=>await onClickFetch(or?{logo: `https://${l}.ipfs.nftstorage.link`}:{featured: `https://${l}.ipfs.nftstorage.link`}, account)
