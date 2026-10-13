package com.hardwareplatform.backend.repository;

import com.hardwareplatform.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByDifficultyIgnoreCase(String difficulty);

    @Query("SELECT p FROM Project p WHERE " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Project> searchProjects(@Param("query") String query);

    @Query("SELECT DISTINCT p FROM Project p JOIN p.projectComponents pc WHERE pc.component.id = :componentId")
    List<Project> findProjectsByComponentId(@Param("componentId") Long componentId);
}
