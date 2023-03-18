import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const userStore = (set)=>({
    isAuth : false,
    user : {},
    hospital : {},
    random : 0,
    addUser : (user)=>{
        set((state)=>({
          isAuth : true,
          user : JSON.stringify(user),
        }))
    },
    removeUser : ()=>{
        set((state)=>({
          isAuth : false,
          user : {},
        }))
    },
    reload : ()=>{
        set((state)=>({
            random : Math.random()
        }))
    }
})
const useUserStore =create(
    persist(userStore,{
        name : "user",
    })
)
export default useUserStore;