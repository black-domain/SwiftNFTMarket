import {useStore} from "../stores/useTheme";
import Theme from "../styles/Theme";

export default function themeSwitch(){
    const count = useStore((state:any) => state.count)
    let col:any
    count%2===1?col =Theme.C2:col =Theme.C1
    return col
}