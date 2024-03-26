package com.example.Purchase.repository;

import com.example.Purchase.domain.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Integer> {

    Point findByPointName(String pointname);

}
