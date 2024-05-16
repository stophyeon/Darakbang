package org.example.controller;


import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.dto.product.ProductDetailRes;
import org.example.dto.product.ProductDto;
import org.example.dto.purchase.PaymentsReq;
import org.example.dto.purchase.PurchaseDto;
import org.example.dto.purchase.SellDto;
import org.example.dto.search.SearchDto;
import org.example.dto.wish_list.WishListDto;
import org.example.service.MailService;
import org.example.service.SearchService;
import org.example.service.WishListService;
import org.example.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/product")
@Tag(name ="상품 게시판" , description = "상품 관련 API")
public class ProductController {
    private final ProductService productService;
    private final WishListService wishListService;
    private final SearchService searchService;
    private final MailService mailService;
    // 게시글 작성 - email 필요
    @Operation(summary = "상품 게시글 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 작성 성공"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 작성 중 문제 발생")
    })

    @PostMapping("/{email}")
    public ResponseEntity<SuccessRes> saveProduct(@PathVariable("email") String email,
                                                  @RequestPart("req") ProductDto productDto,
                                                  @RequestPart("img_product") MultipartFile img_product,
                                                  @RequestPart("img_real") MultipartFile img_real) throws IOException {
        log.info("상품 등록");
        return ResponseEntity.ok(productService.addProduct(productDto,email,img_product,img_real));
    }
    @Operation(summary = "상품 게시글 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 삭정 중 문제 발생"),
            @ApiResponse(responseCode = "403", description = "접근자와 게시글 작성자가 다릅니다")
    })

    @DeleteMapping("/{product_id}/{email}")
    public ResponseEntity<SuccessRes> deleteProduct(@PathVariable("email") String email, @PathVariable("product_id") Long productId) throws IOException {
        return ResponseEntity.ok(productService.deleteProduct(productId,email));
    }

    // 게시글 수정 , email 필요, email 활용 검증 필요
    @Operation(summary = "상품 게시글 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 변경 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 변경 중 문제 발생"),
            @ApiResponse(responseCode = "403", description = "접근자와 게시글 작성자가 다릅니다")
    })
    @Parameters(
            @Parameter(name = "상품 객체", description = "state,product_id,image 제외한 나머지 속성들")
    )
    @PutMapping("/{product_id}/{email}")
    public ResponseEntity<SuccessRes> changeProduct(@PathVariable("email") String email,
                                           @PathVariable("product_id") Long productId,
                                           @RequestBody ProductDto productDto) throws IOException {
        return ResponseEntity.ok(productService.updateProduct(productId,productDto,email));
    }
    // 페이징 형태로 변경
    @Operation(summary = "페이지 별 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "기본 화면 page 조회 성공"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 조회 중 문제 발생")
    })

    @GetMapping("/page")
    public ResponseEntity<Page<ProductDto>> getProductPage(@RequestParam(value = "page",required = false, defaultValue = "1") int page,
                                                           @RequestParam(value = "nick_name",required = false) String nick_name) {
        return ResponseEntity.ok(productService.findProductPage(page-1,nick_name));
    }

    @Operation(summary = "사용자 상세 페이지 등록 상품 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "기본 화면 page 조회 성공"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 조회 중 문제 발생")
    })
    @Parameters({
            @Parameter(name = "nick_name",description = "조회할 상품을 등록한 사용자"),
            @Parameter(name = "page",description = "요청 페이지")
    })
    @GetMapping("/mypage")
    public ResponseEntity<Page<ProductDto>> getMyProductPage(@RequestParam(value = "page",required = false, defaultValue = "1") int page,@RequestParam("nick_name") String nickName) {
        return ResponseEntity.ok(productService.findMyProductPage(nickName,page-1));
    }
    //게시글 1개 검색
    @Operation(summary = "상품 게시글 상세 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 조회 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 조회 중 문제 발생")
    })

    @GetMapping("/detail/{product_id}/{email}")
    public ResponseEntity<ProductDetailRes> getProduct(@PathVariable("product_id") Long productId,@PathVariable("email") String email) {
        return ResponseEntity.ok(productService.findProductDetail(productId,email));
    }
    @Operation(
            operationId = "like",
            description = "좋아요 상품 등록 요청",
            summary = "좋아요"
    )
    @PostMapping("/like/{product_id}/{email}")
    public ResponseEntity<SuccessRes> uploadLike(@PathVariable("product_id") Long productId, @PathVariable("email") String email){
        return ResponseEntity.ok(wishListService.likeRegistration(email, productId));
    }

    @Operation(
            operationId = "like",
            description = "좋아요 상품 조회 요청",
            summary = "좋아요"
    )
    @GetMapping("/profile/like/{nick_name}")
    public ResponseEntity<WishListDto> getLikeProduct(@PathVariable("nick_name") String nickName){
        return ResponseEntity.ok(wishListService.showLikeProduct(nickName));
    }

    @Operation(
            operationId = "like",
            description = "좋아요 상품 삭제 요청",
            summary = "좋아요"
    )
    @DeleteMapping("/like/{product_id}/{email}")
    public ResponseEntity<SuccessRes> deleteLikeProduct( @PathVariable("product_id") Long productId, @PathVariable("email") String email){
        return ResponseEntity.ok(wishListService.delLikeProduct(email,productId));
    }
    @PostMapping("/payments/sell")
    public PurchaseDto changeState(@RequestBody SellDto sellDto){
        int soldOut=wishListService.sellWishList(sellDto.getProduct_id(),sellDto.getEmail());
        if (soldOut==0){
            wishListService.successPay(sellDto.getProduct_id());
            productService.changeState(sellDto.getProduct_id());
            return PurchaseDto.builder().success(true).soldOutIds(soldOut).build();
        }
        else {return PurchaseDto.builder().success(false).soldOutIds(soldOut).build();}
    }

    @PostMapping("/search/word")
    public ResponseEntity<List<String>> searchWord(@RequestBody SearchDto searchDto){
        return ResponseEntity.ok(searchService.autoComplete(searchDto.getWord()));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<ProductDto>> searchFullWord(@RequestBody SearchDto searchDto, @RequestParam(name = "page",required = false,defaultValue = "1") int page){
        return ResponseEntity.ok(searchService.searchProduct(searchDto.getProduct_name(), page-1));
    }
    @GetMapping("/real_image")
    public String getRealImage(@RequestParam("product_id") Long productId){
        return productService.realImage(productId);
    }

    @PostMapping("/emails/{consumer_email}")
    public ResponseEntity<String> SendEmail(@RequestBody List<PaymentsReq> paymentsReqList, @PathVariable("consumer_email") String consumer_email)
    {
        return ResponseEntity.ok(mailService.sendRealImgEmail(paymentsReqList,consumer_email));
    }
}
