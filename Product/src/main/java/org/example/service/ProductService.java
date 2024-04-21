package org.example.service;



import jakarta.persistence.LockModeType;
import org.example.dto.ProductDetailRes;
import org.example.dto.SuccessRes;
import org.example.dto.ProductDto;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.service.member.MemberFeign;
import org.example.service.storage.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository ;
    private final MemberFeign memberFeign;
    private final StorageService storageService;
    private final String googleURL = "https://storage.googleapis.com/darakban-img/";


    public SuccessRes addProduct(ProductDto productDto, String email, MultipartFile img_product, MultipartFile img_real) throws IOException {
        String nickName= memberFeign.getNickName(email);
        String profile = memberFeign.getProfile(email);
        productDto.setNick_name(nickName);
        productDto.setUserProfile(profile);
        // 이미지 구글 클라우드 저장
        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-3b7415068a92.json" ).openStream();

        String product_file_name= storageService.imageUpload(img_product);
        String real_file_name= storageService.imageUpload(img_real);

        productDto.setImage_product(googleURL+product_file_name);
        productDto.setImage_real(googleURL+real_file_name);
        Product product = Product.ToEntity(productDto,email);
        productRepository.save(product);
        return new SuccessRes(product.getProductName(),"success");
    }

    @Transactional
    public Page<ProductDto> findProductPage (int page){
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.ASC, "productId"));
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductDto> products = productPage.map(ProductDto::ToDto);
        return products;
    }

    @Transactional
    public Page<ProductDto> findMyProductPage (String nickName,int page){
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.ASC, "productId"));
        Page<Product> productPage = productRepository.findAllByNickName(pageable,nickName);
        return productPage.map(ProductDto::ToDto);
    }

    @Transactional
    public SuccessRes deleteProduct(Long productId, String email) throws IOException {

            Product product = productRepository.findByProductId(productId);

            if (product.getUserEmail().equals(email)) {
                storageService.realImageDelete(productId);
                storageService.productImageDelete(productId);
                productRepository.delete(product);
                return new SuccessRes(product.getProductName(), "삭제 성공");
            } else {
                return new SuccessRes(product.getProductName(), "등록한 이메일과 일치하지 않습니다.");
            }


    }

    @Transactional
    public ProductDetailRes findProductDetail(Long productId)
    {

        Product selectedProduct = productRepository.findByProductId(productId);
        // 해당 상품 상세를 확인합니다.
        if (selectedProduct.getState()==-1||selectedProduct.getState()==0){return null;}
        else {
            String keywords = selectedProduct.getProductName();
            // 해당 상품의 명을 확인합니다.
            Map<Product, Integer> resultMap = new HashMap<>();
            String[] words = StringUtils.tokenizeToStringArray(keywords, " ");
            // 해당 상품명을 띄어쓰기 기준 분할합니다.

            for (String word : words) {
                List<Product> similarProducts = productRepository.findByProductNameKeyword(word,productId);

                for (Product product : similarProducts) {
                    int count = resultMap.getOrDefault(product, 0);
                    resultMap.put(product, count + 1);
                }
            }

            List<Map.Entry<Product, Integer>> sortedEntries = new ArrayList<>(resultMap.entrySet());
            sortedEntries.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

            List<Product> productList = new ArrayList<>();
            for (Map.Entry<Product, Integer> entry : sortedEntries) {
                productList.add(entry.getKey());
            }

            List<Product> topProducts = productList.subList(0, Math.min(productList.size(), 9));
            if (topProducts.isEmpty()) {
                List<Product> samecategoryproductlist = productRepository.findByProductCategory(selectedProduct.getCategoryId(), productId) ;
                topProducts = samecategoryproductlist.subList(0,Math.min(samecategoryproductlist.size(), 9)) ;
            }

            ProductDetailRes productDetailRes = new ProductDetailRes();
            productDetailRes.setProduct(selectedProduct);
            productDetailRes.setProductList(topProducts);
            return productDetailRes;
        }
    }

    @Transactional
    public SuccessRes updateProduct(Long productId, ProductDto productDto,String email) throws IOException {

        Product product=productRepository.findByProductId(productId);
        if (product.getState()==-1 ||product.getState()==0){return new SuccessRes("","해당 상품이 없습니다");}
        else {
            if (product.getUserEmail().equals(email)){
                productRepository.updateProduct(productId,productDto.getProduct_name(),productDto.getPrice(),
                        productDto.getCategory_id(), productDto.getExpire_at(), product.getImageProduct(), product.getImageReal());
                return new SuccessRes(product.getProductName(),"수정 성공");
            }
            else {return new SuccessRes(product.getProductName(),"등록한 이메일과 일치하지않습니다.");}
        }
    }
    @Transactional
    public void changeState(List<Long> productIds){
        for (Long productId : productIds){
            productRepository.updateState(-1, productId);
        }
    }



}