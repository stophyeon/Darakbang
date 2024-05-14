package org.example.service;




import org.example.annotation.TimeCheck;
import org.example.dto.product.ProductDetailRes;
import org.example.dto.SuccessRes;
import org.example.dto.product.ProductDto;
import org.example.entity.Product;
import org.example.entity.WishList;
import org.example.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.repository.WishListRepository;
import org.example.service.member.MemberFeign;
import org.example.service.storage.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository ;
    private final WishListRepository wishListRepository;
    private final MemberFeign memberFeign;
    private final StorageService storageService;
    private final String googleURL = "https://storage.googleapis.com/darakbang-img/";

    public SuccessRes addProduct(ProductDto productDto, String email, MultipartFile img_product, MultipartFile img_real) throws IOException {
        String nickName= memberFeign.getNickName(email);
        String profile = memberFeign.getProfile(email);
        productDto.setNick_name(nickName);
        productDto.setUserProfile(profile);
        // 이미지 구글 클라우드 저장
        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-422004-c04b80b50e78.json" ).openStream();

        String product_file_name= storageService.imageUpload(img_product);
        String real_file_name= storageService.imageUpload(img_real);

        productDto.setImage_product(googleURL+product_file_name);
        productDto.setImage_real(googleURL+real_file_name);
        Product product = Product.ToEntity(productDto,email);
        productRepository.save(product);
        return new SuccessRes(product.getProductName(),"success");
    }

    @Transactional
    public Page<ProductDto> findProductPage (int page,String nickName){
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.ASC, "productId"));
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductDto> products=productPage.map(ProductDto::ToDto);
        if (nickName!=null) {
            String email = memberFeign.getEmail(nickName);
            List<ProductDto> wishs = wishListRepository.findAllByEmail(email).get().stream().map(WishList::getProduct).toList()
                    .stream().map(ProductDto::ToDto).toList();
            products.forEach(p -> p.setLike(wishs.contains(p)));
        }
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
            }
            else {
                return new SuccessRes(product.getProductName(), "등록한 이메일과 일치하지 않습니다.");
            }


    }
    @TimeCheck
    @Transactional
    public ProductDetailRes findProductDetail(Long productId,String email)
    {
        Product selectedProduct = productRepository.findByProductId(productId);
        // 아래 null 값 반환을 빈 객체로 변경
        if (selectedProduct.getState()==-1||selectedProduct.getState()==0){return new ProductDetailRes();}
        else {
            String keywords = selectedProduct.getProductName();
            // 해당 상품의 명을 확인합니다.
            Map<Product, Integer> resultMap = new HashMap<>();
            String[] words = keywords.split(" ");
            // 해당 상품명을 띄어쓰기 기준 분할합니다.
            for (String word : words) {
                List<Product> similarProducts = productRepository.findByProductNameKeyword(word,productId);
                similarProducts.forEach(p->resultMap.put(p,resultMap.getOrDefault(p,0)+1));
            }
            List<Product> productList = new ArrayList<>(resultMap.keySet());
            productList.sort((o1,o2)->resultMap.get(o2).compareTo(resultMap.get(o1)));
            List<Product> topProducts = productList.stream().limit(Math.min(productList.size(),9)).toList();
            ProductDetailRes productDetailRes = new ProductDetailRes();
            productDetailRes.setMe(selectedProduct.getUserEmail().equals(email));
            if (topProducts.isEmpty()) {
                List<Product> categoryProductList = productRepository.findByProductCategory(selectedProduct.getCategoryId(), productId,PageRequest.of(0,9)) ;
                productDetailRes.setProduct(selectedProduct);
                productDetailRes.setProductList(categoryProductList);
            }
            else {
                productDetailRes.setProduct(selectedProduct);
                productDetailRes.setProductList(topProducts);
            }
            return productDetailRes;
            // builder 패턴으로 객체 생성 코드 변경
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
    @Transactional
    public String realImage(Long productId){
        return productRepository.findByProductId(productId).getImageReal();
    }


}