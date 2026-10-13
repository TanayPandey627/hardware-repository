package com.hardwareplatform.backend.config;

import com.hardwareplatform.backend.entity.Component;
import com.hardwareplatform.backend.entity.Project;
import com.hardwareplatform.backend.entity.ProjectComponent;
import com.hardwareplatform.backend.entity.User;
import com.hardwareplatform.backend.repository.ComponentRepository;
import com.hardwareplatform.backend.repository.ProjectRepository;
import com.hardwareplatform.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;

import java.math.BigDecimal;

@org.springframework.stereotype.Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final ComponentRepository componentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public DataSeeder(ComponentRepository componentRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.componentRepository = componentRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (componentRepository.count() > 0) {
            log.info("Database already contains components data. Skipping seeding.");
            return;
        }

        log.info("Seeding initial database data...");

        // 1. Seed Users
        User alex = userRepository.save(User.builder()
                .name("Alex Rivera")
                .email("alex.rivera@example.com")
                .build());

        User elena = userRepository.save(User.builder()
                .name("Elena Rostova")
                .email("elena.rostova@example.com")
                .build());

        User marcus = userRepository.save(User.builder()
                .name("Marcus Vance")
                .email("marcus.vance@example.com")
                .build());

        // 2. Seed Components
        Component arduino = componentRepository.save(Component.builder()
                .name("Arduino Uno R3")
                .description("Flagship open-source microcontroller board based on ATmega328P. Ideal for basic robotics, sensors, and digital I/O projects.")
                .category("Microcontroller")
                .manufacturer("Arduino")
                .modelNumber("A000066")
                .voltageMin(new BigDecimal("5.00"))
                .voltageMax(new BigDecimal("12.00"))
                .interfaceType("GPIO / UART / SPI / I2C")
                .build());

        Component esp32 = componentRepository.save(Component.builder()
                .name("ESP32 DevKit v1")
                .description("Feature-rich 32-bit Wi-Fi and Bluetooth microcontroller board powered by the ESP32-WROOM-32 module with 12-bit SAR ADC.")
                .category("Microcontroller")
                .manufacturer("Espressif Systems")
                .modelNumber("ESP32-DEV-V1")
                .voltageMin(new BigDecimal("3.30"))
                .voltageMax(new BigDecimal("5.00"))
                .interfaceType("Wi-Fi / BT / SPI / I2C / UART / PWM")
                .build());

        Component sonar = componentRepository.save(Component.builder()
                .name("HC-SR04 Ultrasonic Sensor")
                .description("Non-contact distance measurement module operating at 40kHz, measuring distances between 2cm and 400cm with 3mm precision.")
                .category("Sensor")
                .manufacturer("Cytron")
                .modelNumber("HC-SR04")
                .voltageMin(new BigDecimal("4.50"))
                .voltageMax(new BigDecimal("5.50"))
                .interfaceType("Digital GPIO (Trig/Echo)")
                .build());

        Component servo = componentRepository.save(Component.builder()
                .name("SG90 Micro Servo Motor")
                .description("Lightweight 9g analog servo motor with 180 degree rotation range and 1.8 kg-cm output torque at 4.8V.")
                .category("Actuator")
                .manufacturer("TowerPro")
                .modelNumber("SG90")
                .voltageMin(new BigDecimal("4.80"))
                .voltageMax(new BigDecimal("6.00"))
                .interfaceType("PWM (50Hz)")
                .build());

        Component motorDriver = componentRepository.save(Component.builder()
                .name("L298N Motor Driver Module")
                .description("Dual H-Bridge motor driver module capable of controlling speed and direction of two DC motors up to 2A per channel.")
                .category("Motor Driver")
                .manufacturer("STMicroelectronics")
                .modelNumber("L298N")
                .voltageMin(new BigDecimal("5.00"))
                .voltageMax(new BigDecimal("35.00"))
                .interfaceType("PWM / Digital GPIO")
                .build());

        Component dcMotor = componentRepository.save(Component.builder()
                .name("12V DC Gear Motor")
                .description("High torque metal gear DC motor suitable for mobile robot chassis and automated mechanisms.")
                .category("Actuator")
                .manufacturer("Pololu")
                .modelNumber("25D-12V-100RPM")
                .voltageMin(new BigDecimal("6.00"))
                .voltageMax(new BigDecimal("12.00"))
                .interfaceType("Analog DC")
                .build());

        Component ledRed = componentRepository.save(Component.builder()
                .name("Standard Red 5mm LED")
                .description("General purpose 5mm diffuse red Light Emitting Diode with ~1.8V-2.0V forward voltage and 20mA max current.")
                .category("Optoelectronics")
                .manufacturer("Kingbright")
                .modelNumber("LED-5MM-RED")
                .voltageMin(new BigDecimal("1.80"))
                .voltageMax(new BigDecimal("2.20"))
                .interfaceType("GPIO Digital")
                .build());

        Component resistor220 = componentRepository.save(Component.builder()
                .name("220Ω Resistor 1/4W")
                .description("Through-hole carbon film current-limiting resistor for LEDs and low-power digital circuits.")
                .category("Passive")
                .manufacturer("Yageo")
                .modelNumber("CFR-25-220R")
                .voltageMin(new BigDecimal("0.00"))
                .voltageMax(new BigDecimal("50.00"))
                .interfaceType("Passive")
                .build());

        Component dht11 = componentRepository.save(Component.builder()
                .name("DHT11 Temp & Humidity Sensor")
                .description("Basic digital temperature and humidity sensor with single-wire digital interface.")
                .category("Sensor")
                .manufacturer("Aosong")
                .modelNumber("DHT11")
                .voltageMin(new BigDecimal("3.30"))
                .voltageMax(new BigDecimal("5.50"))
                .interfaceType("Single-bus Digital")
                .build());

        Component rpi4 = componentRepository.save(Component.builder()
                .name("Raspberry Pi 4 Model B")
                .description("High performance single-board computer featuring Quad-Core 64-bit Broadcom processor, Dual 4K HDMI, and 40-pin GPIO header.")
                .category("Single Board Computer")
                .manufacturer("Raspberry Pi Foundation")
                .modelNumber("RPi4-4GB")
                .voltageMin(new BigDecimal("4.75"))
                .voltageMax(new BigDecimal("5.25"))
                .interfaceType("40-pin GPIO / USB / HDMI / I2C")
                .build());

        Component ldr = componentRepository.save(Component.builder()
                .name("GL5528 LDR Photoresistor")
                .description("Cadmium-sulfide (CdS) light dependent photoresistor whose resistance drops from 1MΩ in darkness to ~1kΩ in daylight.")
                .category("Sensor")
                .manufacturer("Senba Sensing")
                .modelNumber("GL5528")
                .voltageMin(new BigDecimal("0.00"))
                .voltageMax(new BigDecimal("30.00"))
                .interfaceType("Analog Light Resistance")
                .build());

        Component resistor10k = componentRepository.save(Component.builder()
                .name("10kΩ Resistor 1/4W")
                .description("Through-hole carbon film pull-down resistor for sensor voltage dividers and logic pull-ups.")
                .category("Passive")
                .manufacturer("Yageo")
                .modelNumber("CFR-25-10KR")
                .voltageMin(new BigDecimal("0.00"))
                .voltageMax(new BigDecimal("50.00"))
                .interfaceType("Passive")
                .build());

        Component resistor1k = componentRepository.save(Component.builder()
                .name("1kΩ Resistor 1/4W")
                .description("Through-hole carbon film resistor for voltage dividers and signal attenuation circuits.")
                .category("Passive")
                .manufacturer("Yageo")
                .modelNumber("CFR-25-1KR")
                .voltageMin(new BigDecimal("0.00"))
                .voltageMax(new BigDecimal("50.00"))
                .interfaceType("Passive")
                .build());

        Component resistor2k = componentRepository.save(Component.builder()
                .name("2kΩ Resistor 1/4W")
                .description("Through-hole carbon film resistor for voltage dividers and signal attenuation circuits.")
                .category("Passive")
                .manufacturer("Yageo")
                .modelNumber("CFR-25-2KR")
                .voltageMin(new BigDecimal("0.00"))
                .voltageMax(new BigDecimal("50.00"))
                .interfaceType("Passive")
                .build());

        Component chassis = componentRepository.save(Component.builder()
                .name("2WD Smart Robot Car Chassis Kit")
                .description("Dual-wheel differential drive mobile robot chassis platform with acrylic frame, DC gear motors, rubber wheels, and caster.")
                .category("Mechanical / Chassis")
                .manufacturer("Generic Maker")
                .modelNumber("2WD-CHASSIS-KIT")
                .voltageMin(new BigDecimal("3.00"))
                .voltageMax(new BigDecimal("9.00"))
                .interfaceType("Mechanical Mount")
                .build());

        // 3. Seed Projects & Junction Records
        // Project 1: LED Blink
        Project ledBlink = Project.builder()
                .title("LED Blink")
                .description("The classic Hello World of hardware prototyping. Uses an Arduino microcontroller to toggle an external LED with current-limiting resistor.")
                .difficulty("Beginner")
                .createdBy(alex)
                .build();

        ledBlink.addProjectComponent(ProjectComponent.builder()
                .component(arduino)
                .quantity(1)
                .notes("Arduino Uno main microcontroller board")
                .build());
        ledBlink.addProjectComponent(ProjectComponent.builder()
                .component(ledRed)
                .quantity(1)
                .notes("Connect to pin D13 (anode)")
                .build());
        ledBlink.addProjectComponent(ProjectComponent.builder()
                .component(resistor220)
                .quantity(1)
                .notes("Current limiting resistor on cathode to GND")
                .build());
        projectRepository.save(ledBlink);

        // Project 2: Automatic Night Lamp
        Project nightLamp = Project.builder()
                .title("Automatic Night Lamp")
                .description("Smart ambient lighting system powered by an ESP32 microcontroller that toggles an LED based on sensor readings or environmental conditions.")
                .difficulty("Beginner")
                .createdBy(elena)
                .build();

        nightLamp.addProjectComponent(ProjectComponent.builder()
                .component(esp32)
                .quantity(1)
                .notes("ESP32 Wi-Fi/BLE microcontroller")
                .build());
        nightLamp.addProjectComponent(ProjectComponent.builder()
                .component(ldr)
                .quantity(1)
                .notes("GL5528 light dependent resistor (LDR) sensor")
                .build());
        nightLamp.addProjectComponent(ProjectComponent.builder()
                .component(resistor10k)
                .quantity(1)
                .notes("10kΩ pull-down resistor for voltage divider to GPIO 34")
                .build());
        nightLamp.addProjectComponent(ProjectComponent.builder()
                .component(ledRed)
                .quantity(1)
                .notes("Ambient night lamp LED indicator on GPIO 2")
                .build());
        nightLamp.addProjectComponent(ProjectComponent.builder()
                .component(resistor220)
                .quantity(1)
                .notes("220Ω current limiting resistor for LED")
                .build());
        projectRepository.save(nightLamp);

        // Project 3: Ultrasonic Distance Meter
        Project distanceMeter = Project.builder()
                .title("Ultrasonic Distance Meter")
                .description("Accurate distance measuring device using an HC-SR04 ultrasonic sensor and microcontrollers to calculate flight time and display distance.")
                .difficulty("Intermediate")
                .createdBy(alex)
                .build();

        distanceMeter.addProjectComponent(ProjectComponent.builder()
                .component(arduino)
                .quantity(1)
                .notes("Arduino Uno microcontroller")
                .build());
        distanceMeter.addProjectComponent(ProjectComponent.builder()
                .component(sonar)
                .quantity(1)
                .notes("HC-SR04 connected to Trig pin 9, Echo pin 10")
                .build());
        projectRepository.save(distanceMeter);

        // Project 4: Obstacle Avoiding Robot
        Project robot = Project.builder()
                .title("Obstacle Avoiding Robot")
                .description("Autonomous two-wheel drive robotic vehicle featuring an ESP32, HC-SR04 sonar mounted on an SG90 servo, and an L298N dual motor driver.")
                .difficulty("Intermediate")
                .createdBy(marcus)
                .build();

        robot.addProjectComponent(ProjectComponent.builder()
                .component(esp32)
                .quantity(1)
                .notes("ESP32 DevKit v1 main controller")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(sonar)
                .quantity(1)
                .notes("Sonar distance sensor mounted on servo arm (Trig GPIO 18, Echo GPIO 19)")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(servo)
                .quantity(1)
                .notes("Servo motor for panning sonar sensor 180 degrees (PWM GPIO 23)")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(motorDriver)
                .quantity(1)
                .notes("Dual H-Bridge motor driver module (ENA 25, IN1 26, IN2 27, ENB 33, IN3 32, IN4 13)")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(dcMotor)
                .quantity(2)
                .notes("Left and right DC drive motors attached to wheels")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(chassis)
                .quantity(1)
                .notes("2WD acrylic car chassis kit with wheels and caster")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(resistor1k)
                .quantity(1)
                .notes("1kΩ resistor for Echo pin 5V to 3.3V voltage divider")
                .build());
        robot.addProjectComponent(ProjectComponent.builder()
                .component(resistor2k)
                .quantity(1)
                .notes("2kΩ resistor for Echo pin 5V to 3.3V voltage divider")
                .build());
        projectRepository.save(robot);

        log.info("Database seeding completed successfully with 15 components and 4 projects.");
    }
}
