package org.example.controller;


import org.example.dto.CommentSaveRequest;
import org.example.dto.ProductResponse;
import org.example.dto.ProductSaveRequest;
import org.example.dto.ProductUpdateRequest;
import org.example.entity.Product;
import org.example.service.CommentService;
import org.example.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name ="상품 게시판" , description = "상품 관련 API")
public class ProductController {

    private final ProductService productService ;

    // 게시글 작성 - return으로 받은객체 그대로
    @Operation(summary = "상품 게시글 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 작성 성공"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 작성 중 문제 발생")
    })
    @CrossOrigin
    @PostMapping("/product")
    public ResponseEntity saveProduct(@RequestBody ProductSaveRequest productSaveRequest)
    {
        return productService.addProduct(productSaveRequest,productSaveRequest.getJwt()) ;
    }


     // 게시글 검색 (상품명) -> 모든 상품명에 따른 객체들 리스트로 return
     // 무한스크롤로 변경
//     @CrossOrigin
//     @GetMapping("/product")
//     public List<Product> getAllProducts()
//     {
//         return productService.findAllProducts();
//     }

     //게시글 1개 검색
     @Operation(summary = "상품 게시글 조회")
     @ApiResponses(value = {
             @ApiResponse(responseCode = "200", description = "상품 게시글 조회 성공"),
             @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
             @ApiResponse(responseCode = "400", description = "상품 게시글 조회 중 문제 발생")
     })
    @CrossOrigin
    @GetMapping("/product/{productid}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable("productid") Long productid)
    {
        return productService.findProduct(productid);
    }

//  // 게시글 검색 (이메일)
//

    // 게시글 삭제 /(뭐달라할지 고민 필요)
    @Operation(summary = "상품 게시글 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 삭정 중 문제 발생")
    })
    @CrossOrigin
    @DeleteMapping("/product/{productid}")
    public ResponseEntity deleteProduct(@PathVariable("productid") Long productid)
    {
        return productService.deleteProduct(productid);
    }

    // 게시글 수정
    @Operation(summary = "상품 게시글 업데이트")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상품 게시글 변경 성공"),
            @ApiResponse(responseCode = "404", description = "NULL 관련 문제 발생"),
            @ApiResponse(responseCode = "400", description = "상품 게시글 변경 중 문제 발생")
    })
    @CrossOrigin
    @PutMapping("/product/{productid}")
    public ResponseEntity changeProduct(@PathVariable("productid") Long productid,
                                        @RequestBody ProductUpdateRequest productUpdateRequest)
    {
        return productService.updateProduct(productid,productUpdateRequest) ;

    }





}
