import EditProductForm from "@compoents/components/posts/Edit-page";
import { getPostData } from "@compoents/util/post-util";


export default async function EditPage({ params }) {
    const postData = getPostData(params.productId)
  
    const [ post ] = await Promise.all([postData]);

    return (
        <EditProductForm post={post}  productId={params.productId}/>
    )
}