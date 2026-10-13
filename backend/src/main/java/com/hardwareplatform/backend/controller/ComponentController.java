package com.hardwareplatform.backend.controller;

import com.hardwareplatform.backend.dto.ComponentCreateUpdateDto;
import com.hardwareplatform.backend.dto.ComponentDto;
import com.hardwareplatform.backend.service.ComponentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/components")
public class ComponentController {

    private final ComponentService componentService;

    public ComponentController(ComponentService componentService) {
        this.componentService = componentService;
    }

    @GetMapping
    public ResponseEntity<List<ComponentDto>> getAllComponents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {
        List<ComponentDto> components = componentService.getAllComponents(search, category);
        return ResponseEntity.ok(components);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComponentDto> getComponentById(@PathVariable Long id) {
        ComponentDto component = componentService.getComponentById(id);
        return ResponseEntity.ok(component);
    }

    @PostMapping
    public ResponseEntity<ComponentDto> createComponent(@Valid @RequestBody ComponentCreateUpdateDto dto) {
        ComponentDto createdComponent = componentService.createComponent(dto);
        return new ResponseEntity<>(createdComponent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComponentDto> updateComponent(
            @PathVariable Long id,
            @Valid @RequestBody ComponentCreateUpdateDto dto) {
        ComponentDto updatedComponent = componentService.updateComponent(id, dto);
        return ResponseEntity.ok(updatedComponent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComponent(@PathVariable Long id) {
        componentService.deleteComponent(id);
        return ResponseEntity.noContent().build();
    }
}
