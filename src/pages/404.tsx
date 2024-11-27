import {Link} from "react-router-dom";

const NotFound=()=>{
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%",marginTop:"30%",flexDirection:"column"}}>
            <h1 style={{color:"white"}}>404 , page Not Found</h1>
            <Link style={{color:"white",borderBottom:"1px solid grey"}} to={'/'}>Go Back</Link>
        </div>
    )
}

export default NotFound