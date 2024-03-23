package org.example.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFollow is a Querydsl query type for Follow
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFollow extends EntityPathBase<Follow> {

    private static final long serialVersionUID = -1843457234L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFollow follow = new QFollow("follow");

    public final QMember followerId;

    public final NumberPath<Long> followId = createNumber("followId", Long.class);

    public final QMember followingId;

    public QFollow(String variable) {
        this(Follow.class, forVariable(variable), INITS);
    }

    public QFollow(Path<? extends Follow> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFollow(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFollow(PathMetadata metadata, PathInits inits) {
        this(Follow.class, metadata, inits);
    }

    public QFollow(Class<? extends Follow> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.followerId = inits.isInitialized("followerId") ? new QMember(forProperty("followerId")) : null;
        this.followingId = inits.isInitialized("followingId") ? new QMember(forProperty("followingId")) : null;
    }

}

