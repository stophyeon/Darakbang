import EditProductForm from "@compoents/components/posts/Edit-page";


export default function EditPage({ params }) {

    return (
        <EditProductForm postpage={params.postpage}  productId={params.productId}/>
    )
}