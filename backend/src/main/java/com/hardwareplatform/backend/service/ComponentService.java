package com.hardwareplatform.backend.service;

import com.hardwareplatform.backend.dto.ComponentCreateUpdateDto;
import com.hardwareplatform.backend.dto.ComponentDto;
import com.hardwareplatform.backend.entity.Component;
import com.hardwareplatform.backend.exception.ResourceNotFoundException;
import com.hardwareplatform.backend.repository.ComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ComponentService {

    private final ComponentRepository componentRepository;

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    public List<ComponentDto> getAllComponents(String search, String category) {
        List<Component> components;
        if (search != null && !search.trim().isEmpty()) {
            components = componentRepository.searchComponents(search.trim());
        } else if (category != null && !category.trim().isEmpty()) {
            components = componentRepository.findByCategoryIgnoreCase(category.trim());
        } else {
            components = componentRepository.findAll();
        }
        return components.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ComponentDto getComponentById(Long id) {
        Component component = componentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Component", "id", id));
        return mapToDto(component);
    }

    @Transactional
    public ComponentDto createComponent(ComponentCreateUpdateDto dto) {
        Component component = Component.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .manufacturer(dto.getManufacturer())
                .modelNumber(dto.getModelNumber())
                .voltageMin(dto.getVoltageMin())
                .voltageMax(dto.getVoltageMax())
                .interfaceType(dto.getInterfaceType())
                .build();

        Component savedComponent = componentRepository.save(component);
        return mapToDto(savedComponent);
    }

    @Transactional
    public ComponentDto updateComponent(Long id, ComponentCreateUpdateDto dto) {
        Component component = componentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Component", "id", id));

        component.setName(dto.getName());
        component.setDescription(dto.getDescription());
        component.setCategory(dto.getCategory());
        component.setManufacturer(dto.getManufacturer());
        component.setModelNumber(dto.getModelNumber());
        component.setVoltageMin(dto.getVoltageMin());
        component.setVoltageMax(dto.getVoltageMax());
        component.setInterfaceType(dto.getInterfaceType());

        Component updatedComponent = componentRepository.save(component);
        return mapToDto(updatedComponent);
    }

    @Transactional
    public void deleteComponent(Long id) {
        Component component = componentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Component", "id", id));
        componentRepository.delete(component);
    }

    public ComponentDto mapToDto(Component component) {
        if (component == null) return null;
        return ComponentDto.builder()
                .id(component.getId())
                .name(component.getName())
                .description(component.getDescription())
                .category(component.getCategory())
                .manufacturer(component.getManufacturer())
                .modelNumber(component.getModelNumber())
                .voltageMin(component.getVoltageMin())
                .voltageMax(component.getVoltageMax())
                .interfaceType(component.getInterfaceType())
                .createdAt(component.getCreatedAt())
                .updatedAt(component.getUpdatedAt())
                .build();
    }
}
