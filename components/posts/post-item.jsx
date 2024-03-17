import Link from 'next/link';
// import Image from 'next/image';

function PostItem(props) {
  const { productname, price, productId } = props.post;

 
  // const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${productId}`;

  return (
      <Link href={linkPath}>
        <div>
          <h3>{productname}</h3>
          <h3>{price}원</h3>
        </div>
      </Link>
  );
}

export default PostItem;