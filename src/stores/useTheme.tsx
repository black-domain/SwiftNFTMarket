import create from 'zustand'

export const useStore = create(set => ({
    count: 1,
    inc: () => set((state:any) => ({count : state.count + 1})),
    
}))

export const usePort = create(set => ({
    count: "",
    port: (x:string) => set({count:x}),

}))

export const usePreview = create(set => ({
    init: "",
    has: (x:string) => set({init:x}),

}))