package com.hardwareplatform.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComponentCreateUpdateDto {

    @NotBlank(message = "Component name is required")
    @Size(max = 150, message = "Component name must not exceed 150 characters")
    private String name;

    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 80, message = "Category must not exceed 80 characters")
    private String category;

    private String manufacturer;

    private String modelNumber;

    private BigDecimal voltageMin;

    private BigDecimal voltageMax;

    private String interfaceType;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
    public String getModelNumber() { return modelNumber; }
    public void setModelNumber(String modelNumber) { this.modelNumber = modelNumber; }
    public BigDecimal getVoltageMin() { return voltageMin; }
    public void setVoltageMin(BigDecimal voltageMin) { this.voltageMin = voltageMin; }
    public BigDecimal getVoltageMax() { return voltageMax; }
    public void setVoltageMax(BigDecimal voltageMax) { this.voltageMax = voltageMax; }
    public String getInterfaceType() { return interfaceType; }
    public void setInterfaceType(String interfaceType) { this.interfaceType = interfaceType; }
}
