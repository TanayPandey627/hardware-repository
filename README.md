# Hardware Build Repository — Research-Based Project Documentation (Version 2)

An open-hardware engineering platform designed to help makers, engineers, and hobbyists discover, build, and document physical computing projects with rigorous, research-verified technical accuracy.

---

## 1. Project Overview

The platform enables users to:
1. **Browse verified hardware components** (microcontrollers, sensors, actuators, and passive components) with accurate manufacturer specifications, pinouts, and operating voltages.
2. **Access comprehensive, research-based project documentation** for physical computing builds.
3. **Follow numbered step-by-step assembly guides** equipped with interactive completion checklists and progress indicators.
4. **Inspect verified circuit wiring schematics** with clear logic-level warnings (e.g. 3.3V vs 5.0V voltage dividers, inductive current isolation).
5. **Download tested firmware code** with inline explanations and single-click copy functionality.
6. **Execute benchtop testing procedures** and consult structured diagnostic troubleshooting decision trees.
7. **View current retail cost estimates** and consult direct links to manufacturer datasheets and official project documentation.

---

## 2. Completed Hardware Projects (Version 2)

All four initial hardware projects have been completed with verified information researched from official datasheets, application notes, and authoritative documentation:

| # | Project Title | Microcontroller | Key Hardware | Working Principle & Physics |
| :- | :--- | :--- | :--- | :--- |
| **1** | **LED Blink** | Arduino Uno R3 (ATmega328P) | Red 5mm LED, 220Ω Resistor | Push-pull digital output register switching; forward diode voltage drop ($V_f \approx 1.8\text{V}$) and Ohm's Law current limiting ($I \approx 14.5\text{mA}$). |
| **2** | **Automatic Night Lamp** | ESP32 DevKit v1 (Xtensa LX6) | GL5528 CdS Photoresistor, 10kΩ & 220Ω Resistors, LED | Cadmium-sulfide photoresistor paired with a 10kΩ pull-down resistor in a voltage divider ($V_{out} = 3.3\text{V} \cdot \frac{10\text{k}}{R_{LDR} + 10\text{k}}$) sampled via a 12-bit SAR ADC (0–4095) with software hysteresis to eliminate twilight flicker. |
| **3** | **Ultrasonic Distance Meter** | Arduino Uno R3 (ATmega328P) | HC-SR04 Ultrasonic Sonar Sensor | 40 kHz acoustic time-of-flight echolocation; 10µs trigger pulse emits 8 sonic cycles; round-trip duration measured via `pulseIn()` and converted to linear distance: $d = (t \cdot 0.03434) / 2$. |
| **4** | **Obstacle Avoiding Robot** | ESP32 DevKit v1 | L298N Dual H-Bridge, SG90 Servo Turret, HC-SR04, 2WD Chassis, DC Motors | Autonomous differential drive finite state machine (FSM); 180° pan-scanning sonar turret; 1kΩ/2kΩ logic level shifter stepping 5V Echo down to 3.33V; common ground star topology. |

---

## 3. Tech Stack & Architecture

```text
               ┌───────────────────────────────┐
               │    React Frontend (Vite)      │
               │   http://localhost:5173       │
               └───────────────┬───────────────┘
                               │ REST HTTP JSON Requests (/api/...)
                               ▼
               ┌───────────────────────────────┐
               │  Spring Boot REST Service     │
               │    http://localhost:8080      │
               └───────────────┬───────────────┘
                               │ JPA / Hibernate ORM
                               ▼
               ┌───────────────────────────────┐
               │      PostgreSQL Database      │
               │    localhost:5432 (hardware_db)│
               └───────────────────────────────┘
```

* **Frontend**: React 18, Vite, React Router DOM v6, Lucide React icons, and a custom dark-theme glassmorphism CSS design system.
* **Backend**: Java 17/21, Spring Boot 3.2+ (Spring Web, Spring Data JPA, Hibernate, Bean Validation, PostgreSQL driver).
* **Database**: PostgreSQL 16 relational database with tables: `users`, `components`, `projects`, and `project_components` junction table.
* **Containerization**: Multi-stage `Dockerfile` and `docker-compose.yml` for unified backend and database execution.

---

## 4. Running the Platform Locally

### Option A: Using Docker Compose (Recommended)

1. Navigate to the `docker` directory:
   ```bash
   cd docker
   ```
2. Start PostgreSQL & Backend services:
   ```bash
   docker-compose up --build -d
   ```
3. Start the Frontend development server:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. Open your browser at **`http://localhost:5173`**.

---

### Option B: Standalone Local Run

#### 1. Database Setup
Ensure PostgreSQL is running locally with a database named `hardware_db`:
```sql
CREATE DATABASE hardware_db;
```
*(The Spring Boot backend will auto-seed realistic components and projects on first launch via `DataSeeder.java`).*

#### 2. Backend Setup
Navigate to `backend` and run:
```bash
cd backend
./mvnw spring-boot:run
```
*(Backend starts at `http://localhost:8080`)*

#### 3. Frontend Setup
Navigate to `frontend`, install dependencies, and run:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 5. REST API Documentation

### Components Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/components` | List components (supports `?search=` and `?category=`) |
| `GET` | `/api/components/{id}` | Get component details by ID |
| `POST` | `/api/components` | Create a new hardware component |
| `PUT` | `/api/components/{id}` | Update existing component |
| `DELETE` | `/api/components/{id}` | Delete component |

### Projects Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | List projects (supports `?search=`, `?difficulty=`, `?componentId=`) |
| `GET` | `/api/projects/{id}` | Get project details with required components |
| `POST` | `/api/projects` | Create a project with component relationships |
| `PUT` | `/api/projects/{id}` | Update project |
| `DELETE` | `/api/projects/{id}` | Delete project |

---

## 6. Technical References & Citations

1. **Arduino Documentation**: [Official Arduino Blink Example](https://docs.arduino.cc/built-in-examples/basics/Blink/) & [Arduino Uno Rev3 Hardware Specs](https://docs.arduino.cc/hardware/uno-rev3/)
2. **Espressif Systems**: [ESP32 Technical Reference Manual (SAR ADC & LEDC PWM)](https://www.espressif.com/)
3. **STMicroelectronics**: [L298N Dual Full-Bridge Driver Datasheet](https://www.st.com/resource/en/datasheet/l298.pdf)
4. **Cytron Technologies**: [HC-SR04 Ultrasonic Distance Sensor User Manual](https://www.cytron.io/)
5. **TowerPro**: [SG90 9g Sub-Micro Servo Specifications](http://www.towerpro.com.tw/product/sg90-7/)
6. **SparkFun Electronics**: [Light-Emitting Diodes (LEDs) and Current Limiting Principles](https://learn.sparkfun.com/tutorials/light-emitting-diodes-leds)
