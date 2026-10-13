-- Seed Data for Hardware Build Repository (PostgreSQL)

-- Seed Users
INSERT INTO users (id, name, email, created_at, updated_at) VALUES
(1, 'Alex Rivera', 'alex.rivera@example.com', NOW(), NOW()),
(2, 'Elena Rostova', 'elena.rostova@example.com', NOW(), NOW()),
(3, 'Marcus Vance', 'marcus.vance@example.com', NOW(), NOW());

-- Seed Components
INSERT INTO components (id, name, description, category, manufacturer, model_number, voltage_min, voltage_max, interface_type, created_at, updated_at) VALUES
(1, 'Arduino Uno R3', 'Flagship open-source microcontroller board based on the ATmega328P. Ideal for basic robotics, sensors, and digital I/O projects.', 'Microcontroller', 'Arduino', 'A000066', 5.00, 12.00, 'GPIO / UART / SPI / I2C', NOW(), NOW()),

(2, 'ESP32 DevKit v1', 'Feature-rich 32-bit Wi-Fi and Bluetooth microcontroller board powered by the ESP32-WROOM-32 module with 12-bit SAR ADC.', 'Microcontroller', 'Espressif Systems', 'ESP32-DEV-V1', 3.30, 5.00, 'Wi-Fi / BT / SPI / I2C / UART / PWM', NOW(), NOW()),

(3, 'HC-SR04 Ultrasonic Sensor', 'Non-contact distance measurement module operating at 40kHz, measuring distances between 2cm and 400cm with 3mm precision.', 'Sensor', 'Cytron', 'HC-SR04', 4.50, 5.50, 'Digital GPIO (Trig/Echo)', NOW(), NOW()),

(4, 'SG90 Micro Servo Motor', 'Lightweight 9g analog servo motor with 180 degree rotation range and 1.8 kg-cm output torque at 4.8V.', 'Actuator', 'TowerPro', 'SG90', 4.80, 6.00, 'PWM (50Hz)', NOW(), NOW()),

(5, 'L298N Motor Driver Module', 'Dual H-Bridge motor driver module capable of controlling speed and direction of two DC motors up to 2A per channel.', 'Motor Driver', 'STMicroelectronics', 'L298N', 5.00, 35.00, 'PWM / Digital GPIO', NOW(), NOW()),

(6, '12V DC Gear Motor', 'High torque metal gear DC motor suitable for mobile robot chassis and automated mechanisms.', 'Actuator', 'Pololu', '25D-12V-100RPM', 6.00, 12.00, 'Analog DC', NOW(), NOW()),

(7, 'Standard Red 5mm LED', 'General purpose 5mm diffuse red Light Emitting Diode with ~1.8V-2.0V forward voltage and 20mA max current.', 'Optoelectronics', 'Kingbright', 'LED-5MM-RED', 1.80, 2.20, 'GPIO Digital', NOW(), NOW()),

(8, '220Ω Resistor 1/4W', 'Through-hole carbon film current-limiting resistor for LEDs and low-power digital circuits.', 'Passive', 'Yageo', 'CFR-25-220R', 0.00, 50.00, 'Passive', NOW(), NOW()),

(9, 'DHT11 Temp & Humidity Sensor', 'Basic digital temperature and humidity sensor with single-wire digital interface.', 'Sensor', 'Aosong', 'DHT11', 3.30, 5.50, 'Single-bus Digital', NOW(), NOW()),

(10, 'Raspberry Pi 4 Model B', 'High performance single-board computer featuring Quad-Core 64-bit Broadcom processor, Dual 4K HDMI, and 40-pin GPIO header.', 'Single Board Computer', 'Raspberry Pi Foundation', 'RPi4-4GB', 4.75, 5.25, '40-pin GPIO / USB / HDMI / I2C', NOW(), NOW()),

(11, 'GL5528 LDR Photoresistor', 'Cadmium-sulfide (CdS) light dependent photoresistor whose resistance drops from 1MΩ in darkness to ~1kΩ in daylight.', 'Sensor', 'Senba Sensing', 'GL5528', 0.00, 30.00, 'Analog Light Resistance', NOW(), NOW()),

(12, '10kΩ Resistor 1/4W', 'Through-hole carbon film pull-down resistor for sensor voltage dividers and logic pull-ups.', 'Passive', 'Yageo', 'CFR-25-10KR', 0.00, 50.00, 'Passive', NOW(), NOW()),

(13, '1kΩ Resistor 1/4W', 'Through-hole carbon film resistor for voltage dividers and signal attenuation circuits.', 'Passive', 'Yageo', 'CFR-25-1KR', 0.00, 50.00, 'Passive', NOW(), NOW()),

(14, '2kΩ Resistor 1/4W', 'Through-hole carbon film resistor for voltage dividers and signal attenuation circuits.', 'Passive', 'Yageo', 'CFR-25-2KR', 0.00, 50.00, 'Passive', NOW(), NOW()),

(15, '2WD Smart Robot Car Chassis Kit', 'Dual-wheel differential drive mobile robot chassis platform with acrylic frame, DC gear motors, rubber wheels, and caster.', 'Mechanical / Chassis', 'Generic Maker', '2WD-CHASSIS-KIT', 3.00, 9.00, 'Mechanical Mount', NOW(), NOW());

-- Seed Projects
INSERT INTO projects (id, title, description, difficulty, created_by, created_at, updated_at) VALUES
(1, 'LED Blink', 'The classic Hello World of hardware prototyping. Uses an Arduino microcontroller to toggle an external LED with current-limiting resistor.', 'Beginner', 1, NOW(), NOW()),

(2, 'Automatic Night Lamp', 'Smart ambient lighting system powered by an ESP32 microcontroller that toggles an LED based on sensor readings or environmental conditions.', 'Beginner', 2, NOW(), NOW()),

(3, 'Ultrasonic Distance Meter', 'Accurate distance measuring device using an HC-SR04 ultrasonic sensor and microcontrollers to calculate flight time and display distance.', 'Intermediate', 1, NOW(), NOW()),

(4, 'Obstacle Avoiding Robot', 'Autonomous two-wheel drive robotic vehicle featuring an ESP32, HC-SR04 sonar mounted on an SG90 servo, and an L298N dual motor driver.', 'Intermediate', 3, NOW(), NOW());

-- Seed Project Components (Junction)
INSERT INTO project_components (id, project_id, component_id, quantity, notes) VALUES
-- Project 1: LED Blink
(1, 1, 1, 1, 'Arduino Uno main microcontroller board'),
(2, 1, 7, 1, 'Connect to pin D13 (anode)'),
(3, 1, 8, 1, 'Current limiting resistor on cathode to GND'),

-- Project 2: Automatic Night Lamp
(4, 2, 2, 1, 'ESP32 Wi-Fi/BLE microcontroller'),
(5, 2, 11, 1, 'GL5528 light dependent resistor (LDR) sensor'),
(6, 2, 12, 1, '10kΩ pull-down resistor for voltage divider to GPIO 34'),
(7, 2, 7, 1, 'Ambient night lamp LED indicator on GPIO 2'),
(8, 2, 8, 1, '220Ω current limiting resistor for LED'),

-- Project 3: Ultrasonic Distance Meter
(9, 3, 1, 1, 'Arduino Uno microcontroller'),
(10, 3, 3, 1, 'HC-SR04 connected to Trig pin 9, Echo pin 10'),

-- Project 4: Obstacle Avoiding Robot
(11, 4, 2, 1, 'ESP32 DevKit v1 main controller'),
(12, 4, 3, 1, 'Sonar distance sensor mounted on servo arm (Trig GPIO 18, Echo GPIO 19)'),
(13, 4, 4, 1, 'Servo motor for panning sonar sensor 180 degrees (PWM GPIO 23)'),
(14, 4, 5, 1, 'Dual H-Bridge motor driver module (ENA 25, IN1 26, IN2 27, ENB 33, IN3 32, IN4 13)'),
(15, 4, 6, 2, 'Left and right DC drive motors attached to wheels'),
(16, 4, 15, 1, '2WD acrylic car chassis kit with wheels and caster'),
(17, 4, 13, 1, '1kΩ resistor for Echo pin 5V to 3.3V voltage divider'),
(18, 4, 14, 1, '2kΩ resistor for Echo pin 5V to 3.3V voltage divider');

-- Synchronize PostgreSQL auto-increment sequences
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('components_id_seq', (SELECT MAX(id) FROM components));
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
SELECT setval('project_components_id_seq', (SELECT MAX(id) FROM project_components));
