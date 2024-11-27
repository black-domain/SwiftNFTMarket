import create from 'zustand'

export const useRpcNetwork = create(set => ({
    net: "testnet",
    setNet: () => set((state:any) => ({net : state})),
    
}))

