export function ScrollTop(){

    const timer = setInterval(()=>{
        const s =  document.documentElement.scrollTop || document.body.scrollTop;
        if (s>0){
            // window.scrollTo(0,s-30)
            window.scrollTo(0,0)
        }
        if (s===0){
            clearInterval(timer)
        }
    },1)
}