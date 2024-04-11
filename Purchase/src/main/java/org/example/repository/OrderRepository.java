package org.example.repository;

import org.example.entity.Order;
import org.example.entity.OrderProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OrderRepository extends JpaRepository<Order, OrderProductId>, JpaSpecificationExecutor<Order> {
}
