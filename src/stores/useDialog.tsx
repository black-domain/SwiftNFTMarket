import create from 'zustand'

interface NFTMintList{
    count:number[]
    inc:(x:number)=>void
    remove:()=>void
}
interface DeleteNFTList{
    toggle:number
    setToggle:()=>void
}
export const useNFTMintList = create<NFTMintList>(set => ({
    count: [1],
    inc: (x) => set((state:any) => ({count :[...state.count,x]})),
    remove:()=> {set((s:any) => ({count: s.count.slice(1)}))}
}))

export const useDeleteNFTList = create<DeleteNFTList>((set,get)=>({
    toggle:1,
    setToggle:()=>{set((s)=>({toggle:s.toggle+1}))}
}))
export const useAttrListStore = create((set,get)=>({
    list1:[],
    list2:[],
    setlist1:(x:any)=>{set((s:any)=>({list1:x}))},
    setlist2:(x:any)=>{set((s:any)=>({list2:x}))}
}))
