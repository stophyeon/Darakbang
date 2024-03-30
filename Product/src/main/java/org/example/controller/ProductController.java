package org.example.controller;


import lombok.extern.slf4j.Slf4j;
import org.example.dto.SuccessRes;
import org.example.dto.ProductDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/product")
@Tag(name ="상품 게시판" , description = "상품 관련 API")
public class ProductController {

    private final ProductService productService ;

    // 게시글 작성 - email 필요
    @Operation(summary = "상품 게시글 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 작성 성공"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 작성 중 문제 발생")
    })
    @CrossOrigin
    @PostMapping("/{email}")
    public ResponseEntity<SuccessRes> saveProduct(@PathVariable("email") String email,
                                                  @RequestBody ProductDto productDto)
    {
        log.info("상품 등록");
        return productService.addProduct(productDto,email);
    }
    @Operation(summary = "상품 게시글 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 삭정 중 문제 발생"),
            @ApiResponse(responseCode = "403", description = "접근자와 게시글 작성자가 다릅니다")
    })
    @CrossOrigin
    @DeleteMapping("/{product_id}/{email}")
    public ResponseEntity<?> deleteProduct(@PathVariable("email") String email, @PathVariable("product_id") Long productId) {
        return productService.deleteProduct(productId,email);
    }

    // 게시글 수정 , email 필요, email 활용 검증 필요
    @Operation(summary = "상품 게시글 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 변경 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 변경 중 문제 발생"),
            @ApiResponse(responseCode = "403", description = "접근자와 게시글 작성자가 다릅니다")
    })
    @CrossOrigin
    @PutMapping("/{product_id}/{email}")
    public ResponseEntity<?> changeProduct(@PathVariable("email") String email, @PathVariable("product_id") Long productId,
                                           @RequestBody ProductDto productDto)
    {
        return productService.updateProduct(productId,productDto,email) ;
    }
    // 페이징 형태로 변경
    @Operation(summary = "페이지 별 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "기본 화면 page 조회 성공"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 조회 중 문제 발생")
    })
    @CrossOrigin
    @GetMapping("/page")
    public ResponseEntity<Page<ProductDto>> getProductPage(@RequestParam(value = "page",required = false, defaultValue = "1") int page)
    {
        return productService.findProductPage(page-1) ;
    }
    //게시글 1개 검색
    @Operation(summary = "상품 게시글 상세 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 조회 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 조회 중 문제 발생")
    })
    @CrossOrigin
    @GetMapping("/detail/{product_id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable("product_id") Long productId)
    {
        return productService.findProductDetail(productId);
    }









}
