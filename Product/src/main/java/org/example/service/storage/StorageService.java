package org.example.service.storage;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageService {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    @Value("${spring.cloud.gcp.storage.project-id}")
    private String projectId;

    private final ProductRepository productRepository;

    public String imageUpload(MultipartFile img_product) throws IOException {
        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-3b7415068a92.json" ).openStream();
        String product_origin_name =img_product.getOriginalFilename();
        String product_file_name=changedImageName(product_origin_name);
        String product_ext = img_product.getContentType();
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();
        // 이미지 GCP bucket에 저장
        BlobInfo blobInfo_product = storage.create(
                BlobInfo.newBuilder(bucketName, product_file_name)
                        .setContentType(product_ext)
                        .build(),
                img_product.getInputStream()
        );
        return product_file_name;
    }

    public void imageDelete(Long productId) throws IOException {
        Product product = productRepository.findByProductId(productId);
        String imgReal = product.getImageReal().substring(44);
        String imgProduct = product.getImageProduct().substring(44);
        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-3b7415068a92.json" ).openStream();
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();
        Blob blobProduct = storage.get(bucketName, imgProduct);
        Blob blobReal = storage.get(bucketName, imgReal);

        Storage.BlobSourceOption precondition1 =
                Storage.BlobSourceOption.generationMatch(blobProduct.getGeneration());
        storage.delete(bucketName, imgProduct, precondition1);
        Storage.BlobSourceOption precondition2 =
                Storage.BlobSourceOption.generationMatch(blobReal.getGeneration());
        storage.delete(bucketName, imgReal, precondition2);

    }
    private static String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random+originName;
    }

}
