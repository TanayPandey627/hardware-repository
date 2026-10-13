package com.hardwareplatform.backend.service;

import com.hardwareplatform.backend.dto.*;
import com.hardwareplatform.backend.entity.Component;
import com.hardwareplatform.backend.entity.Project;
import com.hardwareplatform.backend.entity.ProjectComponent;
import com.hardwareplatform.backend.entity.User;
import com.hardwareplatform.backend.exception.ResourceNotFoundException;
import com.hardwareplatform.backend.repository.ComponentRepository;
import com.hardwareplatform.backend.repository.ProjectRepository;
import com.hardwareplatform.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ComponentRepository componentRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, ComponentRepository componentRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.componentRepository = componentRepository;
        this.userRepository = userRepository;
    }

    public List<ProjectDto> getAllProjects(String search, String difficulty, Long componentId) {
        List<Project> projects;
        if (componentId != null) {
            projects = projectRepository.findProjectsByComponentId(componentId);
        } else if (search != null && !search.trim().isEmpty()) {
            projects = projectRepository.searchProjects(search.trim());
        } else if (difficulty != null && !difficulty.trim().isEmpty()) {
            projects = projectRepository.findByDifficultyIgnoreCase(difficulty.trim());
        } else {
            projects = projectRepository.findAll();
        }
        return projects.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return mapToDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectCreateUpdateDto dto) {
        User creator = null;
        if (dto.getCreatedById() != null) {
            creator = userRepository.findById(dto.getCreatedById()).orElse(null);
        }

        Project project = Project.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .difficulty(dto.getDifficulty())
                .createdBy(creator)
                .build();

        if (dto.getComponents() != null) {
            for (ProjectComponentCreateDto pcDto : dto.getComponents()) {
                Component component = componentRepository.findById(pcDto.getComponentId())
                        .orElseThrow(() -> new ResourceNotFoundException("Component", "id", pcDto.getComponentId()));
                
                ProjectComponent pc = ProjectComponent.builder()
                        .project(project)
                        .component(component)
                        .quantity(pcDto.getQuantity() != null ? pcDto.getQuantity() : 1)
                        .notes(pcDto.getNotes())
                        .build();
                
                project.addProjectComponent(pc);
            }
        }

        Project savedProject = projectRepository.save(project);
        return mapToDto(savedProject);
    }

    @Transactional
    public ProjectDto updateProject(Long id, ProjectCreateUpdateDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setDifficulty(dto.getDifficulty());

        if (dto.getCreatedById() != null) {
            User creator = userRepository.findById(dto.getCreatedById()).orElse(null);
            project.setCreatedBy(creator);
        }

        if (dto.getComponents() != null) {
            project.getProjectComponents().clear();
            for (ProjectComponentCreateDto pcDto : dto.getComponents()) {
                Component component = componentRepository.findById(pcDto.getComponentId())
                        .orElseThrow(() -> new ResourceNotFoundException("Component", "id", pcDto.getComponentId()));
                
                ProjectComponent pc = ProjectComponent.builder()
                        .project(project)
                        .component(component)
                        .quantity(pcDto.getQuantity() != null ? pcDto.getQuantity() : 1)
                        .notes(pcDto.getNotes())
                        .build();
                
                project.addProjectComponent(pc);
            }
        }

        Project updatedProject = projectRepository.save(project);
        return mapToDto(updatedProject);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        projectRepository.delete(project);
    }

    public ProjectDto mapToDto(Project project) {
        if (project == null) return null;

        List<ProjectComponentDto> componentDtos = new ArrayList<>();
        if (project.getProjectComponents() != null) {
            componentDtos = project.getProjectComponents().stream()
                    .map(pc -> ProjectComponentDto.builder()
                            .id(pc.getId())
                            .componentId(pc.getComponent() != null ? pc.getComponent().getId() : null)
                            .componentName(pc.getComponent() != null ? pc.getComponent().getName() : null)
                            .category(pc.getComponent() != null ? pc.getComponent().getCategory() : null)
                            .interfaceType(pc.getComponent() != null ? pc.getComponent().getInterfaceType() : null)
                            .quantity(pc.getQuantity())
                            .notes(pc.getNotes())
                            .build())
                    .collect(Collectors.toList());
        }

        return ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .difficulty(project.getDifficulty())
                .createdById(project.getCreatedBy() != null ? project.getCreatedBy().getId() : null)
                .createdByName(project.getCreatedBy() != null ? project.getCreatedBy().getName() : "Anonymous")
                .components(componentDtos)
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
