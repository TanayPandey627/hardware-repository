-- Hardware Build Repository Database Schema (PostgreSQL)

DROP TABLE IF EXISTS project_components CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS components CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Components Table
CREATE TABLE components (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(80) NOT NULL,
    manufacturer VARCHAR(100),
    model_number VARCHAR(100),
    voltage_min NUMERIC(5,2),
    voltage_max NUMERIC(5,2),
    interface_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50) NOT NULL DEFAULT 'Beginner',
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Components Junction Table
CREATE TABLE project_components (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    component_id BIGINT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    notes VARCHAR(255),
    CONSTRAINT uq_project_component UNIQUE (project_id, component_id)
);

-- Indexes for efficient queries
CREATE INDEX idx_components_category ON components(category);
CREATE INDEX idx_projects_difficulty ON projects(difficulty);
CREATE INDEX idx_project_components_project ON project_components(project_id);
CREATE INDEX idx_project_components_component ON project_components(component_id);
