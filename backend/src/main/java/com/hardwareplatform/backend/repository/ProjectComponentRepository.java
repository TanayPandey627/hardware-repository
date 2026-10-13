package com.hardwareplatform.backend.repository;

import com.hardwareplatform.backend.entity.ProjectComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectComponentRepository extends JpaRepository<ProjectComponent, Long> {
    List<ProjectComponent> findByProjectId(Long projectId);
    void deleteByProjectId(Long projectId);
}
