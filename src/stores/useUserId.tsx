import create from 'zustand'

export const useUserId = create(set => ({
    token: "",
    inc: (e:string) => set({token : e}),

}))

