import create from 'zustand'

export const useCollections = create(set => ({
    collection: [],
    inc: () => set((state:any) => ({collection : state})),
    
}))

