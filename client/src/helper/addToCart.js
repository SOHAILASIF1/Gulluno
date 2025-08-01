import SummaryApi from "../commen";
import { toast } from "react-toastify";

const addCart=async(e,id)=>{
    e?.stopPropagation();
    e?.preventDefault();

    const fetchData=await fetch(SummaryApi.addToCart.url,{
        method:SummaryApi.addToCart.method,
        credentials: 'include',
        headers:{
            'content-Type': 'application/json',
        },
        body:JSON.stringify({productId:id})
    })
    const response=await fetchData.json();
    if (response.success) {
        toast.success(response.message)
       
        
    }
    if (!response.success) {
        toast.error(response.message)
    }
}
export default addCart;