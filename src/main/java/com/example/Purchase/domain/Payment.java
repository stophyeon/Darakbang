package com.example.Purchase.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Table(name = "payment")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_pid")
    private int purchaseId;

    @Column(name = "payment_id")
    private String paymentId ; //결제 id

    @Column(name = "status")
    private String status;

    @Column(name = "purchase_at")
    private Timestamp purchaseAt ;
    //결제 시간

    @Column(name = "total_amount")
    private int totalAmount ;

    @Column(name = "point_name")
    private String orderName ;
    //구매한 point명

    @Column(name = "user_email")
    private String userEmail;
    //지금은 uid에 따라 입력하지만, uid를 노출하고 싶지 않으면 변경할수도있습니다.



    public Payment(String paymentid, String status, Timestamp purchaseat, String ordername, int totalamount, String useremail) {
        this.paymentId = paymentid;
        this.status = status;
        this.purchaseAt = purchaseat;
        this.orderName = ordername;
        this.totalAmount = totalamount;
        this.userEmail = useremail;
    }
}
