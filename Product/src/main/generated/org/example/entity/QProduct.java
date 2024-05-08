package org.example.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = -939072238L;

    public static final QProduct product = new QProduct("product");

    public final NumberPath<Integer> categoryId = createNumber("categoryId", Integer.class);

    public final DatePath<java.time.LocalDate> createAt = createDate("createAt", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> expireAt = createDate("expireAt", java.time.LocalDate.class);

    public final StringPath ImageProduct = createString("ImageProduct");

    public final StringPath ImageReal = createString("ImageReal");

    public final StringPath nickName = createString("nickName");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Long> productId = createNumber("productId", Long.class);

    public final StringPath productName = createString("productName");

    public final NumberPath<Integer> state = createNumber("state", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userProfile = createString("userProfile");

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

