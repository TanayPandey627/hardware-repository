package com.hardwareplatform.backend.repository;

import com.hardwareplatform.backend.entity.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {

    List<Component> findByCategoryIgnoreCase(String category);

    @Query("SELECT c FROM Component c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.manufacturer) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.interfaceType) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Component> searchComponents(@Param("query") String query);
}
