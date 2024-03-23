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

    public final NumberPath<Integer> categoryid = createNumber("categoryid", Integer.class);

    public final DateTimePath<java.util.Date> createat = createDateTime("createat", java.util.Date.class);

    public final StringPath pmessage = createString("pmessage");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Long> productId = createNumber("productId", Long.class);

    public final StringPath productname = createString("productname");

    public final BooleanPath soldout = createBoolean("soldout");

    public final StringPath useremail = createString("useremail");

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

