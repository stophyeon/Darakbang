import EditProductForm from "@compoents/components/posts/Edit-page";

export default async function EditPage({ params }) {
    return (
        <EditProductForm productId={params.productId} />
    )
}