// Research-based technical documentation for hardware projects
// Verified from manufacturer datasheets, official documentation, and hardware references.

export const projectDocs = {
  1: {
    id: 1,
    slug: 'led-blink',
    title: 'LED Blink',
    subtitle: 'Microcontroller Digital Output & Current Limiting Foundation',
    difficulty: 'Beginner',
    estimatedTime: '20 - 30 minutes',
    estimatedCost: '₹800 – ₹2,300',
    costDisclaimer: 'Lower bound reflects compatible/clone boards; upper bound reflects official Arduino Uno R3 boards from authorized distributors. Prices based on Indian retail markets (Amazon.in, RoboElements, Robu.in).',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
    heroImageAttribution: 'SparkFun Electronics / Wikimedia Commons (CC BY 2.0)',

    overview: {
      summary: 'The "Hello World" of embedded electronics. Demonstrates digital GPIO output switching, breadboard prototyping, semiconductor diode polarity, and Ohm\'s Law for current limiting.',
      purpose: 'To teach beginners how a microcontroller controls physical actuators by toggling electrical potentials on an I/O pin, and how to protect semiconductor components from excessive current.',
      realWorldApplications: [
        'Status and heartbeat indicators on electronic appliances',
        'Optical diagnostics on industrial controllers',
        'Visual pulse signaling and notification lights'
      ]
    },

    workingPrinciple: {
      explanation: 'The ATmega328P microcontroller contains dedicated internal Port Registers (DDRB, PORTB) that configure Digital Pin 13 as an active push-pull output. When commanded HIGH in software, the pin transistor pulls the output voltage to 5.0V relative to system Ground (GND). When commanded LOW, the pin pulls down to 0V.',
      physicsAndMath: [
        {
          concept: "Ohm's Law & Current Limiting",
          formula: 'R = (V_supply - V_f) / I_led',
          details: 'A standard red 5mm LED has a forward voltage drop (V_f) of ~1.8V to 2.0V and a continuous operating current limit (I_led) of 15mA to 20mA. Connected directly to 5V, the diode has near-zero dynamic resistance, drawing massive surge current that would burn out the LED die and damage the microcontroller pin. With a 220Ω resistor: (5.0V - 1.8V) / 220Ω = 14.5mA, which is safely within the ATmega328P pin limit (max 20mA recommended, 40mA absolute max).'
        },
        {
          concept: 'Diode Polarity',
          formula: 'Anode (+) -> Cathode (-)',
          details: 'An LED is a unidirectional p-n junction diode. Current can only flow from Anode (longer leg, positive) to Cathode (shorter leg, flat rim notch, negative). Reverse bias blocks current flow, so backward connection prevents the LED from emitting light.'
        }
      ]
    },

    materialsAndTools: {
      tools: [
        'Computer with USB Type-A port (or USB-C adapter)',
        'Arduino IDE 2.x or Arduino Web Editor installed',
        'No soldering iron required (solderless breadboard)'
      ],
      components: [
        {
          name: 'Arduino Uno R3',
          category: 'Microcontroller',
          quantity: 1,
          specs: 'ATmega328P @ 16 MHz, 5V Operating Voltage, 14 Digital I/O pins',
          role: 'Main programmable microcontroller providing 5V digital logic on Pin 13',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
          imageAttribution: 'SparkFun Electronics (CC BY 2.0)'
        },
        {
          name: 'Standard Red 5mm LED',
          category: 'Optoelectronics',
          quantity: 1,
          specs: 'Forward voltage: 1.8V - 2.2V, Max current: 20mA, Wavelength: 625nm',
          role: 'Visual light emitting diode indicator',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/LED%2C_5mm%2C_rot_%282%29.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: '220Ω Resistor 1/4W',
          category: 'Passive',
          quantity: 1,
          specs: 'Through-hole, 5% tolerance (Red-Red-Brown-Gold color bands), 250mW rating',
          role: 'Current limiting element preventing LED blowout and microcontroller pin overload',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Resistor-220-Ohm.jpg',
          imageAttribution: 'Wikimedia Commons (Public Domain)'
        },
        {
          name: 'Half-size Solderless Breadboard',
          category: 'Prototyping',
          quantity: 1,
          specs: '400 tie-points, 2 power buses, 0.1" (2.54mm) pitch',
          role: 'Connects electrical leads without soldering',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Breadboard_half.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: 'Male-to-Male Jumper Wires',
          category: 'Wiring',
          quantity: 2,
          specs: '24 AWG solid core with Dupont pins, 10cm - 20cm',
          role: 'Conductive links between Arduino headers and breadboard tie-points',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Jumper_wires.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: 'USB 2.0 Type-A to Type-B Cable',
          category: 'Cable',
          quantity: 1,
          specs: 'Shielded USB data cable, 1 meter length',
          role: 'Provides 5V DC USB power and serial firmware upload link',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/USB_Type-A_and_Type-B_plugs.jpg',
          imageAttribution: 'Wikimedia Commons (Public Domain)'
        }
      ]
    },

    assemblySteps: [
      {
        stepNumber: 1,
        title: 'Inspect LED Polarity & Resistor Bands',
        description: 'Hold the 5mm LED up to the light. Notice that one lead is longer (Anode, +) and one is shorter (Cathode, -). Inside the plastic lens, the smaller metallic post is the Anode, while the larger anvil-shaped plate is the Cathode. Check your 220Ω resistor: the color bands must read Red (2) - Red (2) - Brown (x10) - Gold (±5%).',
        tip: 'Never cut LED legs until you are sure of their polarity!'
      },
      {
        stepNumber: 2,
        title: 'Insert the Current Limiting Resistor into the Breadboard',
        description: 'Take your half-size solderless breadboard. Push one leg of the 220Ω resistor into row 10, column C. Push the other leg into row 15, column C. The resistor is non-polar, so orientation does not matter.',
        tip: 'Breadboard rows (1 through 30) are connected horizontally across columns A-B-C-D-E.'
      },
      {
        stepNumber: 3,
        title: 'Insert the Red 5mm LED',
        description: 'Insert the longer leg (Anode, +) into row 15, column D (sharing electrical contact with the resistor). Insert the shorter leg (Cathode, -) into row 16, column D.',
        warning: 'Ensure the two LED legs never touch each other directly, as this causes a short circuit.'
      },
      {
        stepNumber: 4,
        title: 'Connect Ground (GND) Jumper Wire',
        description: 'Plug one male-to-male jumper wire (preferably black or blue) into row 16 on the breadboard (connected to the LED Cathode). Plug the other end into any pin labeled "GND" on the Arduino Uno power header.'
      },
      {
        stepNumber: 5,
        title: 'Connect Signal Pin 13 Jumper Wire',
        description: 'Plug a second jumper wire (preferably red or yellow) into row 10 on the breadboard (connected to the remaining resistor leg). Plug the other end into Digital Pin 13 on the Arduino Uno digital header.'
      },
      {
        stepNumber: 6,
        title: 'Final Circuit Continuity Verification',
        description: 'Double check the physical circuit path: Arduino Pin 13 -> Jumper -> 220Ω Resistor -> LED Anode (+) -> LED Cathode (-) -> Jumper -> Arduino GND. Connect the USB cable between the Uno and your computer.'
      }
    ],

    wiring: {
      summary: 'The circuit forms a single series loop: Arduino Pin 13 -> 220Ω Resistor -> LED Anode -> LED Cathode -> Arduino GND.',
      diagramType: 'led-blink',
      pinTable: [
        { fromComponent: 'Arduino Uno', fromPin: 'Digital Pin 13', toComponent: '220Ω Resistor', toPin: 'Lead 1', wireColor: 'Red / Yellow', notes: 'Active 5V logic signal' },
        { fromComponent: '220Ω Resistor', fromPin: 'Lead 2', toComponent: 'Red LED', toPin: 'Anode (Long Leg +)', wireColor: 'Breadboard Row', notes: 'Voltage drop across resistor ~3.2V' },
        { fromComponent: 'Red LED', fromPin: 'Cathode (Short Leg -)', toComponent: 'Jumper Wire', toPin: 'Row 16', wireColor: 'Breadboard Row', notes: 'Diode forward drop ~1.8V' },
        { fromComponent: 'Jumper Wire', fromPin: 'Row 16', toComponent: 'Arduino Uno', toPin: 'GND', wireColor: 'Black / Blue', notes: '0V return path' }
      ],
      warnings: [
        'Do not connect the LED directly across 5V and GND without the 220Ω resistor. An LED connected directly without current limiting will burn out within milliseconds.',
        'Always connect or modify breadboard wiring while the Arduino is unplugged from USB power to avoid accidental short circuits.'
      ]
    },

    software: {
      ide: 'Arduino IDE 2.3+ (or legacy 1.8.x)',
      boardTarget: 'Arduino Uno',
      librariesRequired: 'None (uses core AVR runtime functions)',
      code: `// =========================================================================
// Project: LED Blink
// Target Board: Arduino Uno R3 (ATmega328P @ 16MHz)
// Description: Toggles an external LED connected to Digital Pin 13 every 1s.
// Verified: Based on official Arduino core example (Blink.ino)
// =========================================================================

const int LED_PIN = 13; // Pin 13 controls both onboard LED and our circuit

void setup() {
  // Configure digital pin 13 as an active push-pull OUTPUT
  // This sets the DDRB register bit 5 to HIGH
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Output 5.0 Volts on Pin 13: current flows through resistor & LED
  digitalWrite(LED_PIN, HIGH);
  
  // Keep the LED illuminated for exactly 1000 milliseconds (1.0 second)
  delay(1000);
  
  // Output 0.0 Volts on Pin 13: current stops, LED turns off
  digitalWrite(LED_PIN, LOW);
  
  // Keep the LED extinguished for 1.0 second before repeating loop()
  delay(1000);
}`,
      explanation: [
        { line: 'pinMode(LED_PIN, OUTPUT);', detail: 'Configures ATmega328P Data Direction Register (DDR) so pin 13 can source up to 20mA at 5V.' },
        { line: 'digitalWrite(LED_PIN, HIGH);', detail: 'Switches the pin internal MOSFET to connect the I/O pad to the +5V VCC power rail.' },
        { line: 'delay(1000);', detail: 'Halts execution for 1,000,000 microseconds using the internal Timer0 counter.' },
        { line: 'digitalWrite(LED_PIN, LOW);', detail: 'Switches the pin internal MOSFET to connect the I/O pad directly to Ground (0V).' }
      ]
    },

    testing: {
      procedure: [
        'Plug the USB cable into your computer. The green "ON" LED on the Arduino board should light up steadily.',
        'In the Arduino IDE, navigate to Tools -> Board -> Arduino AVR Boards -> Arduino Uno.',
        'Navigate to Tools -> Port and select the active COM port (Windows: COM3, COM4; macOS: /dev/cu.usbmodem...; Linux: /dev/ttyACM0).',
        'Click the Upload button (the right arrow icon) in the upper-left toolbar.',
        'Observe the "TX" and "RX" LEDs on the Arduino Uno flash rapidly for 2 seconds while the bootloader receives the compiled binary.',
        'Verify that both the external 5mm LED on the breadboard and the tiny onboard surface-mount LED labeled "L" blink ON for 1 second, then OFF for 1 second in lockstep.'
      ]
    },

    troubleshooting: [
      {
        problem: 'External LED never lights up, but onboard "L" LED blinks',
        cause: 'LED polarity is inverted, or resistor is plugged into wrong breadboard rows',
        solution: 'Disconnect USB. Pull out the LED and reverse its legs so the longer leg connects to the resistor row. Verify that row connections share the same numbered slot.',
        severity: 'Common'
      },
      {
        problem: 'Arduino IDE error: "avrdude: ser_open(): can\'t open device" / "programmer not responding"',
        cause: 'Incorrect COM port selected, or clone board missing CH340 USB driver',
        solution: 'Check Device Manager (Windows) or System Information (macOS). Verify driver installation for CH340/CH341 or FTDI. Reconnect USB cable and select matching port in Tools -> Port.',
        severity: 'Common'
      },
      {
        problem: 'LED illuminates, but very dimly',
        cause: 'Resistor value is too high (e.g., 220kΩ instead of 220Ω)',
        solution: 'Inspect the resistor color bands. 220Ω is Red-Red-Brown. If you used Red-Red-Yellow (220kΩ), current is choked down to ~15 microamps.',
        severity: 'Moderate'
      },
      {
        problem: 'LED flashes once brightly and then never works again',
        cause: 'LED was connected directly across 5V and GND without a current-limiting resistor',
        solution: 'The internal semiconductor junction has melted due to thermal overload. Discard the burned LED, get a new one, and always wire a 220Ω resistor in series.',
        severity: 'Critical'
      }
    ],

    costEstimate: {
      totalRange: '₹800 – ₹2,300',
      breakdown: [
        { item: 'Arduino Uno R3 Board', cost: '₹2,000 (Official) or ~₹500 (Clone)', source: 'Amazon.in / Robu.in' },
        { item: 'Standard Red 5mm LED', cost: '₹2 – ₹5', source: 'RoboElements / Robu.in' },
        { item: '220Ω 1/4W Resistor', cost: '₹1', source: 'RoboElements / Amazon.in' },
        { item: 'Half-size Solderless Breadboard', cost: '₹120 – ₹200', source: 'Amazon.in / Robu.in' },
        { item: 'Jumper Wires (2x) & USB Cable', cost: '₹80 – ₹150', source: 'Amazon.in / Maker Stores' }
      ]
    },

    references: [
      {
        title: 'Arduino Built-In Examples: Blink',
        source: 'Official Arduino Documentation',
        url: 'https://docs.arduino.cc/built-in-examples/basics/Blink/',
        type: 'Official Documentation'
      },
      {
        title: 'Arduino Uno Rev3 Schematic and Pinout Reference',
        source: 'Arduino Hardware Docs',
        url: 'https://docs.arduino.cc/hardware/uno-rev3/',
        type: 'Schematic / Hardware'
      },
      {
        title: 'Light-Emitting Diodes (LEDs) & Resistor Calculations',
        source: 'SparkFun Learn',
        url: 'https://learn.sparkfun.com/tutorials/light-emitting-diodes-leds',
        type: 'Application Note'
      },
      {
        title: 'ATmega328P 8-bit AVR Microcontroller Datasheet (I/O Pin Electrical Limits)',
        source: 'Microchip Technology',
        url: 'https://www.microchip.com/en-us/product/ATmega328P',
        type: 'Manufacturer Datasheet'
      }
    ]
  },

  2: {
    id: 2,
    slug: 'automatic-night-lamp',
    title: 'Automatic Night Lamp',
    subtitle: 'Ambient Light Detection via ESP32 ADC & LDR Voltage Divider',
    difficulty: 'Beginner',
    estimatedTime: '30 - 45 minutes',
    estimatedCost: '₹650 – ₹1,000',
    costDisclaimer: 'Pricing based on standard ESP32 DevKit modules and passive components available from Indian electronics retailers (Amazon.in, Robu.in, RoboElements).',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/2/20/ESP32_Espressif_ESP-WROOM-32.jpg',
    heroImageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)',

    overview: {
      summary: 'An autonomous ambient lighting system utilizing an ESP32 microcontroller, a photoresistor (LDR), and a 10kΩ resistor forming a voltage divider. Automatically switches on an LED when ambient light drops below a calibrated threshold.',
      purpose: 'To teach analog voltage sensing via 12-bit SAR Analog-to-Digital Converters (ADC), voltage divider design equations, software hysteresis filtering, and 3.3V logic constraints on modern 32-bit microcontrollers.',
      realWorldApplications: [
        'Automated street lighting systems',
        'Smart home nightlights and hallway safety illumination',
        'Solar charging garden lights and twilight switches',
        'Display auto-brightness sensors in smartphones and monitors'
      ]
    },

    workingPrinciple: {
      explanation: 'The ESP32 cannot read variable electrical resistance directly; it reads voltage. The GL5528 photoresistor (Light Dependent Resistor, LDR) changes its internal resistance inversely with incident light intensity. By pairing the LDR with a 10kΩ fixed resistor in series across 3.3V and GND, we form a voltage divider that outputs an analog voltage proportional to illumination level.',
      physicsAndMath: [
        {
          concept: 'Photoresistor Semiconductor Physics',
          formula: 'R_LDR: 1MΩ (Darkness) -> ~1kΩ (Daylight)',
          details: 'The GL5528 uses a cadmium sulfide (CdS) semiconductor. In darkness, few charge carriers are free, yielding high electrical resistance (~500kΩ to 1MΩ). When ambient photons strike the semiconductor surface, electrons are excited into the conduction band, decreasing resistance down to ~1kΩ in daylight.'
        },
        {
          concept: 'Voltage Divider Transfer Equation',
          formula: 'V_out = 3.3V * (R_fixed / (R_LDR + R_fixed))',
          details: 'With R_fixed = 10kΩ connected between the LDR output node and GND: In bright light (R_LDR = 1kΩ), V_out = 3.3V * (10k / (1k + 10k)) ≈ 3.0V. In complete darkness (R_LDR = 500kΩ), V_out = 3.3V * (10k / (500k + 10k)) ≈ 0.064V.'
        },
        {
          concept: 'ESP32 12-Bit SAR ADC Conversion',
          formula: 'Digital Value = (V_in / 3.3V) * 4095',
          details: 'The ESP32 Analog-to-Digital Converter converts 0V–3.3V into integer counts from 0 to 4095. A daytime reading yields ~3700; darkness yields ~80. When the reading falls below the set threshold (e.g. 1800), GPIO 2 drives HIGH (3.3V), powering the night lamp.'
        }
      ]
    },

    materialsAndTools: {
      tools: [
        'Computer with USB port',
        'Arduino IDE with Espressif ESP32 Board Package installed',
        'Micro-USB data cable',
        'A dark object (or your finger) to cover the light sensor during testing'
      ],
      components: [
        {
          name: 'ESP32 DevKit v1',
          category: 'Microcontroller',
          quantity: 1,
          specs: 'Xtensa Dual-Core 32-bit LX6 @ 240 MHz, 3.3V logic, Wi-Fi/BLE, 12-bit SAR ADC',
          role: 'Primary controller reading analog voltage on GPIO 34 and controlling output on GPIO 2',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/ESP32_Espressif_ESP-WROOM-32.jpg',
          imageAttribution: 'Espressif Systems / Wikimedia Commons (CC BY-SA 4.0)'
        },
        {
          name: 'GL5528 LDR Photoresistor',
          category: 'Sensor',
          quantity: 1,
          specs: 'Dark resistance: 1MΩ min, Light resistance (10 lux): 10kΩ - 20kΩ, Peak response: 540nm',
          role: 'Converts ambient photon flux into variable electrical resistance',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Photoresistor.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: '10kΩ Resistor 1/4W',
          category: 'Passive',
          quantity: 1,
          specs: 'Carbon film, 5% tolerance (Brown-Black-Orange-Gold bands), 250mW',
          role: 'Fixed pull-down leg of the sensor voltage divider',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Resistor-220-Ohm.jpg',
          imageAttribution: 'Wikimedia Commons (Public Domain)'
        },
        {
          name: 'Standard Red or White 5mm LED',
          category: 'Optoelectronics',
          quantity: 1,
          specs: 'Forward voltage: 1.9V - 3.0V, Max current: 20mA',
          role: 'Ambient night lamp light source',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/LED%2C_5mm%2C_rot_%282%29.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: '220Ω Resistor 1/4W',
          category: 'Passive',
          quantity: 1,
          specs: 'Carbon film, 5% tolerance (Red-Red-Brown-Gold bands)',
          role: 'Current limiting resistor for the lamp LED',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Resistor-220-Ohm.jpg',
          imageAttribution: 'Wikimedia Commons (Public Domain)'
        },
        {
          name: 'Half-size Solderless Breadboard',
          category: 'Prototyping',
          quantity: 1,
          specs: '400 tie-points, standard 0.1" pitch',
          role: 'Interconnects ESP32 headers and discrete components without solder',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Breadboard_half.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: 'Male-to-Male Jumper Wires',
          category: 'Wiring',
          quantity: 6,
          specs: '24 AWG flexible jumper wires',
          role: 'Signal and power delivery links',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Jumper_wires.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        }
      ]
    },

    assemblySteps: [
      {
        stepNumber: 1,
        title: 'Seat the ESP32 Board on the Breadboard',
        description: 'Position the ESP32 DevKit board straddling the central plastic trough of the breadboard so each row of pins enters separate tie-point columns. Press down firmly and evenly on both header rails.',
        tip: 'Ensure pin labels on the DevKit are readable and not blocked by jumper wires.'
      },
      {
        stepNumber: 2,
        title: 'Connect the 3.3V Power Rail to the LDR',
        description: 'Insert the GL5528 photoresistor into two separate breadboard columns. Run a jumper wire from the pin labeled "3V3" on the ESP32 to one leg of the photoresistor.',
        warning: 'Do NOT connect the LDR to VIN or 5V! The ESP32 ADC inputs are rated strictly for a maximum of 3.3V.'
      },
      {
        stepNumber: 3,
        title: 'Install the 10kΩ Pull-Down Resistor',
        description: 'Connect one leg of the 10kΩ resistor (Brown-Black-Orange) to the second leg of the photoresistor. Connect the other leg of the 10kΩ resistor directly into a pin labeled "GND" on the ESP32.'
      },
      {
        stepNumber: 4,
        title: 'Route Sensor Analog Signal to GPIO 34',
        description: 'Connect a jumper wire from the junction point between the photoresistor and the 10kΩ resistor directly into ESP32 GPIO 34 (ADC1 Channel 6).',
        tip: 'GPIO 34 is an input-only ADC1 pin, making it ideal for clean analog sensor reads.'
      },
      {
        stepNumber: 5,
        title: 'Wire the LED Night Light Circuit',
        description: 'Insert the LED into the breadboard. Connect its longer leg (Anode, +) to one side of the 220Ω resistor. Connect the other side of the 220Ω resistor to ESP32 GPIO 2. Connect the shorter leg (Cathode, -) to the ESP32 GND pin.'
      },
      {
        stepNumber: 6,
        title: 'Verify Common Ground & Connections',
        description: 'Confirm that both the 10kΩ resistor and the LED cathode tie to the same common Ground reference (ESP32 GND). Plug in the Micro-USB cable.'
      }
    ],

    wiring: {
      summary: 'LDR voltage divider connects 3.3V -> LDR -> [Node -> GPIO 34] -> 10kΩ -> GND. LED connects GPIO 2 -> 220Ω -> LED -> GND.',
      diagramType: 'automatic-night-lamp',
      pinTable: [
        { fromComponent: 'ESP32 DevKit', fromPin: '3V3 (3.3V)', toComponent: 'GL5528 LDR', toPin: 'Leg 1', wireColor: 'Red', notes: 'Sensor reference voltage' },
        { fromComponent: 'GL5528 LDR', fromPin: 'Leg 2', toComponent: 'ESP32 GPIO 34', toPin: 'GPIO 34 (ADC1_CH6)', wireColor: 'Yellow / Orange', notes: 'Analog voltage divider junction' },
        { fromComponent: 'GL5528 LDR', fromPin: 'Leg 2', toComponent: '10kΩ Resistor', toPin: 'Leg 1', wireColor: 'Breadboard Row', notes: 'Voltage divider pull-down' },
        { fromComponent: '10kΩ Resistor', fromPin: 'Leg 2', toComponent: 'ESP32 DevKit', toPin: 'GND', wireColor: 'Black', notes: '0V Ground reference' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 2', toComponent: '220Ω Resistor', toPin: 'Lead 1', wireColor: 'Green / Blue', notes: 'Digital output drive pin' },
        { fromComponent: '220Ω Resistor', fromPin: 'Lead 2', toComponent: 'LED', toPin: 'Anode (Long Leg +)', wireColor: 'Breadboard Row', notes: 'Current limiter for LED' },
        { fromComponent: 'LED', fromPin: 'Cathode (Short Leg -)', toComponent: 'ESP32 DevKit', toPin: 'GND', wireColor: 'Black', notes: 'Common Ground return' }
      ],
      warnings: [
        'CRITICAL: ESP32 ADC pins (GPIO 32 - 39) are NOT 5V tolerant. Exceeding 3.6V will destroy the internal ADC channels.',
        'Always use ADC1 pins (GPIO 32, 33, 34, 35, 36, 39) if your application will ever enable Wi-Fi. ADC2 pins (GPIO 0, 2, 4, 12-15, 25-27) are shared with the Wi-Fi hardware and cannot be sampled while Wi-Fi is transmitting.'
      ]
    },

    software: {
      ide: 'Arduino IDE 2.3+ with Espressif ESP32 Board Core',
      boardTarget: 'DOIT ESP32 DEVKIT V1 (or ESP32 Dev Module)',
      librariesRequired: 'None (built-in ESP32 Arduino Core)',
      code: `// =========================================================================
// Project: Automatic Night Lamp
// Target Board: ESP32 DevKit v1 (Xtensa LX6 @ 240MHz)
// Description: Reads ambient light via 12-bit ADC on GPIO 34 and toggles
//              LED on GPIO 2 with software hysteresis to prevent flickering.
// =========================================================================

const int LDR_PIN = 34; // ADC1 Channel 6 (Input Only, 12-bit resolution: 0-4095)
const int LED_PIN = 2;  // Digital output controlling the night light indicator

// Threshold calibration values
// 0 = Total Darkness | 4095 = Bright Sunlight
const int DARK_THRESHOLD = 1800; // Trigger level below which lamp turns ON
const int HYSTERESIS = 150;     // Hysteresis window to eliminate twilight flicker

bool lampState = false;

void setup() {
  Serial.begin(115200);
  delay(500); // Allow serial transceiver to stabilize
  
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  Serial.println("=========================================");
  Serial.println("ESP32 Automatic Night Lamp System Started");
  Serial.println("=========================================");
}

void loop() {
  // Read raw analog value from 12-bit SAR ADC (0 to 4095)
  int lightLevel = analogRead(LDR_PIN);
  
  // Calculate approximate voltage across the 10k resistor
  float measuredVoltage = (lightLevel / 4095.0) * 3.3;

  // Hysteresis logic prevents rapid on/off chatter at the threshold edge
  if (!lampState && lightLevel < (DARK_THRESHOLD - HYSTERESIS)) {
    lampState = true;
    digitalWrite(LED_PIN, HIGH); // Illuminate night light
    Serial.println("[STATE CHANGE] Night Detected -> Night Lamp ON");
  } 
  else if (lampState && lightLevel > (DARK_THRESHOLD + HYSTERESIS)) {
    lampState = false;
    digitalWrite(LED_PIN, LOW);  // Extinguish night light
    Serial.println("[STATE CHANGE] Daylight Detected -> Night Lamp OFF");
  }

  // Periodic telemetry for calibration in Serial Monitor
  Serial.print("LDR Raw: ");
  Serial.print(lightLevel);
  Serial.print(" | Voltage: ");
  Serial.print(measuredVoltage, 2);
  Serial.print(" V | Lamp: ");
  Serial.println(lampState ? "ACTIVE (ON)" : "STANDBY (OFF)");

  delay(300); // 300ms sample interval
}`,
      explanation: [
        { line: 'analogRead(LDR_PIN);', detail: 'Triggers the ESP32 12-bit Successive Approximation Register (SAR) ADC to sample voltage on GPIO 34.' },
        { line: 'DARK_THRESHOLD = 1800;', detail: 'Represents ~1.45V at the voltage divider junction, corresponding to a typical dimly lit evening room.' },
        { line: 'HYSTERESIS = 150;', detail: 'Creates a deadband between turn-on (1650) and turn-off (1950), stopping high-frequency switching caused by optical noise.' },
        { line: 'digitalWrite(LED_PIN, HIGH);', detail: 'Drives GPIO 2 output driver to 3.3V, delivering forward bias current to the indicator LED.' }
      ]
    },

    testing: {
      procedure: [
        'Connect the ESP32 to your computer using a known data-capable Micro-USB cable.',
        'In the Arduino IDE, set Board to "DOIT ESP32 DEVKIT V1" and select your COM Port.',
        'Upload the sketch. (If upload stalls at "Connecting......", press and hold the "BOOT" button on the ESP32 until percentage displays).',
        'Open the Serial Monitor and configure baud rate to 115200 baud.',
        'Observe the baseline readings under room illumination. The raw value should read between 2400 and 3800, and the LED should be OFF.',
        'Place your finger directly over the top of the photoresistor to simulate darkness. The raw value should plummet below 1000, and the LED should turn ON instantly.',
        'Remove your finger: the LED should shut off smoothly without fluttering.'
      ]
    },

    troubleshooting: [
      {
        problem: 'LED stays ON continuously even under direct lighting',
        cause: 'LDR and 10kΩ resistor positions are reversed, or DARK_THRESHOLD is set too high for room lighting',
        solution: 'Check the voltage divider wiring: LDR must connect to 3.3V, and 10k resistor to GND. If correct, note your room reading in the Serial Monitor and lower DARK_THRESHOLD.',
        severity: 'Common'
      },
      {
        problem: 'Arduino IDE fails with "Fatal: Failed to connect to ESP32: No serial data received"',
        cause: 'ESP32 auto-reset circuit failed to pull GPIO 0 low during flash entry',
        solution: 'Press and hold the "BOOT" (or IO0) button on the ESP32 module as soon as the IDE displays "Connecting......", releasing it once "Writing at..." appears.',
        severity: 'Common'
      },
      {
        problem: 'Serial Monitor displays gibberish symbols (e.g. ?%)',
        cause: 'Baud rate mismatch',
        solution: 'Change the baud rate dropdown in the lower right of the Serial Monitor window to 115200 baud.',
        severity: 'Minor'
      },
      {
        problem: 'LED flickers erratically at dusk or near the threshold point',
        cause: 'Ambient noise without sufficient software hysteresis',
        solution: 'Increase the HYSTERESIS constant in the sketch from 150 to 300 to broaden the switching deadband.',
        severity: 'Moderate'
      }
    ],

    costEstimate: {
      totalRange: '₹650 – ₹1,000',
      breakdown: [
        { item: 'ESP32 DevKit v1 Board', cost: '₹450 – ₹600', source: 'Amazon.in / Robu.in' },
        { item: 'GL5528 Photoresistor (LDR)', cost: '₹10 – ₹20', source: 'RoboElements / Amazon.in' },
        { item: '10kΩ + 220Ω Resistors', cost: '₹2 – ₹5', source: 'RoboElements / Robu.in' },
        { item: '5mm White or Red LED', cost: '₹2 – ₹5', source: 'RoboElements / Amazon.in' },
        { item: 'Breadboard & Jumpers', cost: '₹120 – ₹200', source: 'Amazon.in / Robu.in' }
      ]
    },

    references: [
      {
        title: 'ESP32 Technical Reference Manual (SAR ADC Module)',
        source: 'Espressif Systems',
        url: 'https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf',
        type: 'Manufacturer Datasheet'
      },
      {
        title: 'ESP32 Pinout Reference and ADC Usage Guidelines',
        source: 'Random Nerd Tutorials',
        url: 'https://randomnerdtutorials.com/esp32-pinout-reference-gpios/',
        type: 'Technical Guide'
      },
      {
        title: 'GL5528 Photoresistor Technical Specification Sheet',
        source: 'Senba Sensing Instruments',
        url: 'https://www.digikey.com',
        type: 'Component Datasheet'
      },
      {
        title: 'Photocell (LDR) Sensor Calibration and Voltage Divider Circuits',
        source: 'Adafruit Learning System',
        url: 'https://learn.adafruit.com/photocells',
        type: 'Application Note'
      }
    ]
  },

  3: {
    id: 3,
    slug: 'ultrasonic-distance-meter',
    title: 'Ultrasonic Distance Meter',
    subtitle: 'High-Precision Acoustic Echo Distance Measurement System',
    difficulty: 'Intermediate',
    estimatedTime: '30 - 45 minutes',
    estimatedCost: '₹900 – ₹2,500',
    costDisclaimer: 'Lower bound reflects compatible Arduino Uno clone boards and standalone sensors; upper bound reflects official Arduino hardware. Prices based on Indian retail markets (Amazon.in, Robu.in).',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/HC_SR04_Ultrasonic_sensor_1480322_3_4_HDR_Enhancer.jpg',
    heroImageAttribution: 'Nevit Dilmen / Wikimedia Commons (CC BY-SA 3.0)',

    overview: {
      summary: 'A non-contact acoustic rangefinder that emits 40 kHz ultrasound bursts and calculates target distance by measuring the acoustic time-of-flight reflected from an obstacle.',
      purpose: 'To teach principles of acoustic wave propagation, time-of-flight (ToF) kinematics, pulse-width measurement via microsecond timers, and sensor calibration in physical computing.',
      realWorldApplications: [
        'Automotive parking proximity sensors and reverse assist alerts',
        'Industrial tank liquid level measurement without fluid contact',
        'Autonomous mobile robot obstacle detection and wall following',
        'Contactless interactive installations and occupancy detection'
      ]
    },

    workingPrinciple: {
      explanation: 'The HC-SR04 module features two piezoelectric ultrasonic transducers: one acting as a transmitter (marked "T") and one as a receiver (marked "R"). When triggered with a 10-microsecond pulse, the transmitter emits eight 40 kHz sonic pressure cycles into the air. The Echo pin stays HIGH for the exact duration it takes the wave to hit an obstacle and return.',
      physicsAndMath: [
        {
          concept: 'Speed of Sound in Air',
          formula: 'v = 331.3 + (0.606 * T) m/s',
          details: 'At 20°C (68°F), dry air sound velocity is approximately 343.4 m/s. Converted to convenient microsecond scale: 343.4 m/s = 0.03434 cm/microsecond, or 1 cm travelled every ~29.1 microseconds.'
        },
        {
          concept: 'Round-Trip Acoustic Time-of-Flight (ToF)',
          formula: 'Distance = (Time_in_microseconds * 0.03434) / 2',
          details: 'Because the sound wave must travel to the obstacle AND reflect all the way back to the sensor, the measured pulse duration represents twice the linear distance. Dividing by 2 yields the true one-way clearance.'
        },
        {
          concept: 'Measuring Limits & Acoustic Dispersion',
          formula: 'Range: 2 cm to 400 cm | Cone Angle: ~15°',
          details: 'Distances under 2 cm cannot be measured because transducer diaphragm ringing masks the incoming echo. Distances beyond 400 cm suffer geometric signal attenuation. The effective measuring cone is ~15 degrees.'
        }
      ]
    },

    materialsAndTools: {
      tools: [
        'Computer with Arduino IDE installed',
        'USB Type-A to Type-B cable',
        'Flat, hard reflective object (book, cardboard, or wall) for testing',
        'Measuring tape or physical ruler for calibration verification'
      ],
      components: [
        {
          name: 'Arduino Uno R3',
          category: 'Microcontroller',
          quantity: 1,
          specs: 'ATmega328P @ 16 MHz, 5.0V I/O logic, hardware 16-bit timers',
          role: 'Generates trigger pulse, measures echo duration, and converts microseconds to centimeters',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
          imageAttribution: 'SparkFun Electronics (CC BY 2.0)'
        },
        {
          name: 'HC-SR04 Ultrasonic Sensor Module',
          category: 'Sensor',
          quantity: 1,
          specs: 'Operating Voltage: 5V DC, Current: 15mA, Frequency: 40kHz, Range: 2cm - 400cm, Resolution: 3mm',
          role: 'Emits 40kHz acoustic pulses and outputs pulse-width on Echo pin',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/HC_SR04_Ultrasonic_sensor_1480322_3_4_HDR_Enhancer.jpg',
          imageAttribution: 'Nevit Dilmen (CC BY-SA 3.0)'
        },
        {
          name: 'Half-size Solderless Breadboard',
          category: 'Prototyping',
          quantity: 1,
          specs: '400 tie-points, standard 0.1" pitch',
          role: 'Securely mounts the HC-SR04 sensor during benchtop testing',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Breadboard_half.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        },
        {
          name: 'Male-to-Male Jumper Wires',
          category: 'Wiring',
          quantity: 4,
          specs: '24 AWG solid core Dupont wires',
          role: 'Connects VCC, GND, TRIG, and ECHO to Arduino headers',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Jumper_wires.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        }
      ]
    },

    assemblySteps: [
      {
        stepNumber: 1,
        title: 'Insert HC-SR04 Sensor into Breadboard',
        description: 'Orient the HC-SR04 sensor with the two metal acoustic cones facing outwards. Firmly push its 4 header pins (VCC, TRIG, ECHO, GND) into 4 adjacent columns on the breadboard.',
        tip: 'Ensure the sensor sits upright so its acoustic beam shoots parallel to your work surface.'
      },
      {
        stepNumber: 2,
        title: 'Connect Power Pins (5V and GND)',
        description: 'Connect a red jumper wire from the breadboard column corresponding to HC-SR04 "VCC" into the Arduino "5V" power pin. Connect a black jumper wire from the "GND" column into an Arduino "GND" pin.',
        warning: 'The HC-SR04 oscillator requires a minimum of 4.5V to operate reliably. Do NOT connect VCC to 3.3V.'
      },
      {
        stepNumber: 3,
        title: 'Connect Trigger Pin (Pin 9)',
        description: 'Connect a jumper wire from the HC-SR04 "TRIG" pin column to Arduino Digital Pin 9.',
        tip: 'Pin 9 will send a 10µs digital trigger pulse to initiate acoustic pinging.'
      },
      {
        stepNumber: 4,
        title: 'Connect Echo Pin (Pin 10)',
        description: 'Connect a jumper wire from the HC-SR04 "ECHO" pin column to Arduino Digital Pin 10.',
        tip: 'Because Arduino Uno operates at 5V logic, the 5V Echo pulse can be connected directly without level shifting.'
      },
      {
        stepNumber: 5,
        title: 'Final Physical Alignment Check',
        description: 'Ensure no wires cross in front of the two metallic sensor cylinders (transmitter/receiver cones). Keep at least 50 cm of clear air in front of the sensor for initial boot test.'
      }
    ],

    wiring: {
      summary: '4-pin interface directly with Arduino Uno: VCC -> 5V, GND -> GND, TRIG -> Pin 9, ECHO -> Pin 10.',
      diagramType: 'ultrasonic-distance-meter',
      pinTable: [
        { fromComponent: 'HC-SR04', fromPin: 'VCC', toComponent: 'Arduino Uno', toPin: '5V', wireColor: 'Red', notes: '4.5V - 5.5V DC Power' },
        { fromComponent: 'HC-SR04', fromPin: 'TRIG', toComponent: 'Arduino Uno', toPin: 'Digital Pin 9', wireColor: 'Yellow / Orange', notes: '10 microsecond trigger pulse' },
        { fromComponent: 'HC-SR04', fromPin: 'ECHO', toComponent: 'Arduino Uno', toPin: 'Digital Pin 10', wireColor: 'Blue / Green', notes: 'PWM Echo pulse width' },
        { fromComponent: 'HC-SR04', fromPin: 'GND', toComponent: 'Arduino Uno', toPin: 'GND', wireColor: 'Black', notes: 'Common 0V Ground' }
      ],
      warnings: [
        'Do not attempt to power HC-SR04 from a 3.3V rail. It will fail to produce 40kHz sonic bursts and produce endless zero readings.',
        'Target surface angle matters: If an obstacle is angled more than 15-20 degrees relative to the sensor, the acoustic wave reflects away rather than bouncing back to the receiver.'
      ]
    },

    software: {
      ide: 'Arduino IDE 2.3+',
      boardTarget: 'Arduino Uno',
      librariesRequired: 'None (utilizes built-in pulseIn function)',
      code: `// =========================================================================
// Project: Ultrasonic Distance Meter
// Target Board: Arduino Uno R3 (ATmega328P @ 16MHz)
// Sensor: HC-SR04 Ultrasonic Sonar Module
// Equation: Distance (cm) = (Duration_us * 0.0343) / 2
// =========================================================================

const int TRIG_PIN = 9;  // Trigger pin emits acoustic bursts
const int ECHO_PIN = 10; // Echo pin receives return signal

void setup() {
  Serial.begin(9600);
  
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  // Ensure trigger pin starts clean LOW
  digitalWrite(TRIG_PIN, LOW);
  delay(100);
  
  Serial.println("==============================================");
  Serial.println("HC-SR04 Ultrasonic Distance Meter Active");
  Serial.println("==============================================");
}

void loop() {
  // 1. Send clean 10-microsecond trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2. Measure high pulse duration on ECHO pin in microseconds
  // Timeout set to 30,000 microseconds (~5 meters theoretical maximum)
  unsigned long duration = pulseIn(ECHO_PIN, HIGH, 30000);

  // 3. Convert duration to linear distance
  if (duration == 0) {
    // 0 indicates timeout (no echo bounced back within 30ms)
    Serial.println("Reading: Out of Range (> 400 cm or acoustic deflection)");
  } else {
    // Speed of sound = 343 m/s = 0.0343 cm/us
    // Round-trip requires dividing by 2.0
    float distanceCm = (duration * 0.0343) / 2.0;
    float distanceInches = distanceCm / 2.54;

    // Display formatted readings in Serial Monitor
    Serial.print("Distance: ");
    Serial.print(distanceCm, 1);
    Serial.print(" cm  |  ");
    Serial.print(distanceInches, 1);
    Serial.println(" inches");
  }

  // 250ms delay between consecutive ping cycles to prevent acoustic echoes
  delay(250);
}`,
      explanation: [
        { line: 'digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);', detail: 'Sends the hardware trigger requirement specified in HC-SR04 datasheet to generate the 8-cycle 40kHz sonic burst.' },
        { line: 'pulseIn(ECHO_PIN, HIGH, 30000);', detail: 'Pauses execution until ECHO transitions HIGH, then counts microseconds until ECHO transitions LOW. 30ms timeout prevents freezing.' },
        { line: 'float distanceCm = (duration * 0.0343) / 2.0;', detail: 'Applies physics kinematic formula d = (v * t) / 2 using 0.0343 cm/µs sound velocity.' }
      ]
    },

    testing: {
      procedure: [
        'Upload sketch to Arduino Uno via USB.',
        'Open Serial Monitor at 9600 baud.',
        'Place a flat, rigid cardboard box exactly 10 cm in front of the sensor. The Serial Monitor should display ~10.0 cm (±3mm).',
        'Move the box to 20 cm, 30 cm, and 50 cm, comparing readings against a physical ruler.',
        'Angle the box at 45 degrees: notice that the reading changes to "Out of Range", demonstrating specular acoustic reflection.',
        'Hold a soft fleece cloth in front of the sensor: notice erratic or reduced-range readings caused by acoustic absorption.'
      ]
    },

    troubleshooting: [
      {
        problem: 'Serial Monitor always prints "Out of Range" or 0 cm',
        cause: 'VCC connected to 3.3V instead of 5V, or TRIG and ECHO jumper wires swapped',
        solution: 'Check Arduino power header: VCC must be plugged into the 5V pin. Verify that Pin 9 connects to TRIG and Pin 10 connects to ECHO.',
        severity: 'Common'
      },
      {
        problem: 'Readings jump wildly by ±10 cm while measuring a stationary object',
        cause: 'Electrical power rail noise, or acoustic reflections from a nearby desk surface',
        solution: 'Elevate the sensor at least 10 cm off the tabletop so the 15° cone does not bounce off the desk. Add a 100µF capacitor across sensor VCC and GND.',
        severity: 'Moderate'
      },
      {
        problem: 'Sensor reports inaccurate readings when object is closer than 2 cm',
        cause: 'HC-SR04 physical blind zone / transducer diaphragm ring-down time',
        solution: 'Keep all target obstacles at least 3 cm away from the sensor face. The physical minimum distance supported by the HC-SR04 module is 2 cm.',
        severity: 'Minor'
      }
    ],

    costEstimate: {
      totalRange: '₹900 – ₹2,500',
      breakdown: [
        { item: 'Arduino Uno R3 Board', cost: '₹2,000 (Official) or ~₹500 (Clone)', source: 'Amazon.in / Robu.in' },
        { item: 'HC-SR04 Ultrasonic Sensor Module', cost: '₹80 – ₹150', source: 'Amazon.in / Robu.in' },
        { item: 'Half-size Breadboard & Jumpers', cost: '₹120 – ₹200', source: 'Amazon.in / Maker Stores' }
      ]
    },

    references: [
      {
        title: 'HC-SR04 Ultrasonic Range Sensor User Manual & Technical Specs',
        source: 'Cytron Technologies',
        url: 'https://www.cytron.io',
        type: 'Manufacturer Datasheet'
      },
      {
        title: 'SparkFun HC-SR04 Distance Sensor Hookup Guide',
        source: 'SparkFun Learn',
        url: 'https://learn.sparkfun.com',
        type: 'Technical Guide'
      },
      {
        title: 'Arduino Language Reference: pulseIn()',
        source: 'Official Arduino Documentation',
        url: 'https://www.arduino.cc/reference/en/language/functions/advanced-io/pulsein/',
        type: 'Official Documentation'
      },
      {
        title: 'Physics of Ultrasonic Transducers and Acoustic Time of Flight',
        source: 'Texas Instruments Application Reports',
        url: 'https://www.ti.com',
        type: 'Application Note'
      }
    ]
  },

  4: {
    id: 4,
    slug: 'obstacle-avoiding-robot',
    title: 'Obstacle Avoiding Robot',
    subtitle: 'Autonomous 2WD Mobile Robotics with Sonar Turret & Dual H-Bridge',
    difficulty: 'Intermediate',
    estimatedTime: '60 - 90 minutes',
    estimatedCost: '₹2,700 – ₹3,800',
    costDisclaimer: 'Pricing includes 2WD chassis kit with motors, ESP32, L298N driver, SG90 servo, HC-SR04 sensor, and 18650 battery holder. Based on Indian retail markets (Amazon.in, Robu.in, RoboElements).',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dosmotorsl298n.jpg',
    heroImageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)',

    overview: {
      summary: 'An autonomous two-wheel differential-drive robotic vehicle that navigates unknown environments without human intervention. Features a pan-scanning ultrasonic sonar turret and an L298N dual H-bridge motor driver controlled by a 32-bit ESP32.',
      purpose: 'To teach autonomous reactive navigation, finite state machine (FSM) control loops, differential drive kinematics, PWM motor speed modulation, and high-current electrical isolation.',
      realWorldApplications: [
        'Robotic vacuum cleaners (Roomba-style autonomous area sweepers)',
        'Automated Guided Vehicles (AGVs) in industrial warehouses',
        'Exploration rovers and inspection bots in hazardous areas',
        'Autonomous lawnmowers and agricultural drones'
      ]
    },

    workingPrinciple: {
      explanation: 'The robot combines sensory perception, spatial scanning, and differential steering kinematics. An HC-SR04 ultrasonic sensor is mounted to an SG90 servo motor forming a 180° pan turret. The ESP32 evaluates forward clearance in real-time. When an obstacle is detected within 25 cm, the robot executes a reactive avoidance algorithm: stops, reverses, sweeps the turret left and right to evaluate open space, and turns toward the path with greater clearance.',
      physicsAndMath: [
        {
          concept: 'Differential Drive Skid Steering Kinematics',
          formula: 'Turning: Left Motor != Right Motor',
          details: 'Two independent drive wheels and one passive omnidirectional caster wheel. Forward motion: Left forward + Right forward. Pivot Right: Left forward + Right reverse. Pivot Left: Left reverse + Right forward. Brake: Both motors grounded.'
        },
        {
          concept: 'Dual H-Bridge Motor Control (L298N)',
          formula: 'Speed = PWM Duty Cycle (0-255) | Direction = IN1/IN2 Logic',
          details: 'An H-bridge consists of 4 power switching transistors arranged like an "H". By toggling which diagonally opposite pairs conduct, current flow across the DC motor armature is reversed, instantly reversing rotational direction without mechanical gearing changes.'
        },
        {
          concept: '5V to 3.3V Logic Level Protection',
          formula: 'V_gpio = 5.0V * (R2 / (R1 + R2)) = 5V * (2k / (1k + 2k)) = 3.33V',
          details: 'The HC-SR04 ECHO pin produces a 5V TTL logic pulse, while ESP32 GPIOs are strictly rated for 3.3V maximum. A 1kΩ and 2kΩ resistor voltage divider scales the 5V pulse safely down to ~3.33V, protecting the ESP32 input gate from overvoltage punch-through.'
        }
      ]
    },

    materialsAndTools: {
      tools: [
        'Small Phillips head screwdriver (for chassis and motor terminal screws)',
        'Computer with Arduino IDE & ESP32 core installed',
        'Micro-USB cable',
        'Small zip-ties or double-sided foam tape for securing modules'
      ],
      components: [
        {
          name: 'ESP32 DevKit v1',
          category: 'Microcontroller',
          quantity: 1,
          specs: 'Xtensa Dual-Core 240MHz, hardware PWM (LEDC), 3.3V logic',
          role: 'Main autonomous navigation processor executing FSM decision loop',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/ESP32_Espressif_ESP-WROOM-32.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)'
        },
        {
          name: 'L298N Dual H-Bridge Motor Driver Module',
          category: 'Motor Driver',
          quantity: 1,
          specs: 'Operating Voltage: 5V - 35V, Peak current: 2A per channel, Onboard 5V regulator',
          role: 'Amplifies low-power ESP32 PWM signals to drive high-current DC drive motors',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dosmotorsl298n.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)'
        },
        {
          name: 'HC-SR04 Ultrasonic Sensor Module',
          category: 'Sensor',
          quantity: 1,
          specs: '5V supply, 40kHz acoustic burst, 2cm - 400cm detection range',
          role: 'Measures obstacle proximity ahead of the vehicle',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/HC_SR04_Ultrasonic_sensor_1480322_3_4_HDR_Enhancer.jpg',
          imageAttribution: 'Nevit Dilmen (CC BY-SA 3.0)'
        },
        {
          name: 'SG90 Micro Servo Motor',
          category: 'Actuator',
          quantity: 1,
          specs: 'Operating Voltage: 4.8V - 6.0V, Torque: 1.8 kg-cm, 180° rotation',
          role: 'Pans the ultrasonic sensor turret 180° to look left and right',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Tower_Pro_SG90_micro_servo_motor.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)'
        },
        {
          name: '12V / 6V DC Gear Motor with Wheels',
          category: 'Actuator',
          quantity: 2,
          specs: 'Gear ratio 1:48, 200 RPM @ 6V, includes rubber tread tires',
          role: 'Left and right drive traction',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dosmotorsl298n.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)'
        },
        {
          name: '2WD Smart Robot Car Chassis Kit',
          category: 'Mechanical / Chassis',
          quantity: 1,
          specs: 'Laser-cut acrylic platform with motor brackets, brass standoffs, and front omnidirectional caster',
          role: 'Structural vehicle chassis',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dosmotorsl298n.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 4.0)'
        },
        {
          name: '1kΩ Resistor & 2kΩ Resistor',
          category: 'Passive',
          quantity: 2,
          specs: '1/4W 5% tolerance through-hole resistors',
          role: 'Voltage divider for HC-SR04 5V Echo to ESP32 3.3V GPIO protection',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Resistor-220-Ohm.jpg',
          imageAttribution: 'Wikimedia Commons (Public Domain)'
        },
        {
          name: '2x 18650 Li-ion Battery Holder (7.4V)',
          category: 'Power',
          quantity: 1,
          specs: '2-cell series holder outputting nominal 7.4V (8.4V fully charged)',
          role: 'High-current DC power supply for motors and onboard 5V regulator',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Jumper_wires.jpg',
          imageAttribution: 'Wikimedia Commons (CC BY-SA 3.0)'
        }
      ]
    },

    assemblySteps: [
      {
        stepNumber: 1,
        title: 'Assemble the 2WD Mechanical Chassis',
        description: 'Peel the protective film off the acrylic chassis plate. Screw the two yellow TT gear motors into the chassis brackets using the long M3 screws. Attach the rubber drive wheels onto the motor axles and bolt the front omnidirectional metal caster wheel.'
      },
      {
        stepNumber: 2,
        title: 'Mount the L298N Motor Driver & Battery Pack',
        description: 'Mount the L298N driver board toward the rear center of the chassis using standoffs or screws. Position the 2x 18650 battery holder between the motors to balance vehicle center of gravity.'
      },
      {
        stepNumber: 3,
        title: 'Wire the DC Motors to the L298N Driver',
        description: 'Connect the two wires from the Left Motor into L298N screw terminals OUT1 and OUT2. Connect the two wires from the Right Motor into screw terminals OUT3 and OUT4. Tighten the terminal screws firmly.'
      },
      {
        stepNumber: 4,
        title: 'Assemble and Mount the Servo Sonar Turret',
        description: 'Mount the SG90 servo at the front tip of the chassis facing straight forward. Screw the servo arm horn in place at 90° center position. Secure the HC-SR04 sensor onto the servo horn using zip-ties, a bracket, or foam adhesive tape.'
      },
      {
        stepNumber: 5,
        title: 'Construct the HC-SR04 Echo Voltage Divider',
        description: 'On a mini breadboard, route HC-SR04 ECHO into one leg of a 1kΩ resistor. Connect the other leg of the 1kΩ resistor to ESP32 GPIO 19 AND to one leg of a 2kΩ resistor. Connect the other leg of the 2kΩ resistor to GND.',
        warning: 'Failure to use this 1k/2k voltage divider will feed 5V into ESP32 GPIO 19, permanently damaging the microcontroller pin!'
      },
      {
        stepNumber: 6,
        title: 'Wire Control Pins & Common Ground',
        description: 'Connect ESP32 GPIOs to L298N: GPIO 25 (ENA), GPIO 26 (IN1), GPIO 27 (IN2), GPIO 33 (ENB), GPIO 32 (IN3), GPIO 13 (IN4). Connect SG90 signal to GPIO 23, and HC-SR04 TRIG to GPIO 18. Wire L298N GND, ESP32 GND, and Battery (-) to a common shared Ground wire.',
        warning: 'COMMON GROUND IS ESSENTIAL: Without a shared ground connection between battery negative, L298N GND, and ESP32 GND, the control logic will float and the robot will twitch uncontrollably.'
      }
    ],

    wiring: {
      summary: 'L298N controls dual DC motors via GPIO 25, 26, 27, 33, 32, 13. HC-SR04 trig/echo on GPIO 18/19 (via voltage divider). SG90 servo PWM on GPIO 23. Common ground across all power rails.',
      diagramType: 'obstacle-avoiding-robot',
      pinTable: [
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 25', toComponent: 'L298N Driver', toPin: 'ENA (Speed Left)', wireColor: 'Blue', notes: 'PWM speed duty cycle (remove jumper cap)' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 26', toComponent: 'L298N Driver', toPin: 'IN1 (Dir Left +)', wireColor: 'Green', notes: 'Left motor direction control 1' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 27', toComponent: 'L298N Driver', toPin: 'IN2 (Dir Left -)', wireColor: 'Yellow', notes: 'Left motor direction control 2' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 33', toComponent: 'L298N Driver', toPin: 'ENB (Speed Right)', wireColor: 'Purple', notes: 'PWM speed duty cycle (remove jumper cap)' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 32', toComponent: 'L298N Driver', toPin: 'IN3 (Dir Right +)', wireColor: 'Orange', notes: 'Right motor direction control 1' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 13', toComponent: 'L298N Driver', toPin: 'IN4 (Dir Right -)', wireColor: 'White', notes: 'Right motor direction control 2' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 18', toComponent: 'HC-SR04', toPin: 'TRIG', wireColor: 'Yellow', notes: '10 microsecond trigger ping' },
        { fromComponent: 'HC-SR04', fromPin: 'ECHO', toComponent: '1kΩ Resistor', toPin: 'Lead 1', wireColor: 'Orange', notes: '5V signal into 1k/2k voltage divider' },
        { fromComponent: '1kΩ / 2kΩ Junction', fromPin: 'Divider Output', toComponent: 'ESP32 DevKit', toPin: 'GPIO 19', wireColor: 'Green', notes: 'Scaled down 3.33V safe logic level' },
        { fromComponent: 'ESP32 DevKit', fromPin: 'GPIO 23', toComponent: 'SG90 Servo', toPin: 'Signal (Orange wire)', wireColor: 'Orange', notes: '50Hz PWM Turret Pan Angle' },
        { fromComponent: '7.4V Battery (+)', fromPin: 'Positive Terminal', toComponent: 'L298N Driver', toPin: '12V Power Screw Terminal', wireColor: 'Red (Thick)', notes: 'Motor drive power (7.4V - 12V)' },
        { fromComponent: '7.4V Battery (-)', fromPin: 'Negative Terminal', toComponent: 'L298N Driver', toPin: 'GND Terminal', wireColor: 'Black (Thick)', notes: 'High-current ground return' },
        { fromComponent: 'L298N Driver', fromPin: 'GND Terminal', toComponent: 'ESP32 DevKit', toPin: 'GND', wireColor: 'Black', notes: 'Common logic ground reference' },
        { fromComponent: 'L298N Driver', fromPin: '5V Regulated Output', toComponent: 'ESP32 DevKit', toPin: 'VIN', wireColor: 'Red', notes: 'Powers ESP32 from L298N internal regulator' }
      ],
      warnings: [
        'DO NOT power the DC motors from the ESP32 3.3V or 5V regulator pin. Motors draw 1.5A stall current, which will fry the ESP32 regulator instantly. Always supply power directly from the battery pack to the L298N 12V terminal.',
        'Always verify Common Ground between Battery (-), L298N GND, and ESP32 GND.',
        'Double-check the 1k/2k voltage divider on HC-SR04 Echo. 5V directly applied to ESP32 GPIO 19 will cause permanent pin damage.'
      ]
    },

    software: {
      ide: 'Arduino IDE 2.3+ with ESP32 board package',
      boardTarget: 'DOIT ESP32 DEVKIT V1',
      librariesRequired: 'ESP32Servo by Kevin Harrington (available in Library Manager)',
      code: `// =========================================================================
// Project: Autonomous Obstacle Avoiding Robot
// Controller: ESP32 DevKit v1 (Xtensa Dual-Core 240MHz)
// Driver: L298N Dual H-Bridge | Sensor: HC-SR04 Sonar on SG90 Servo Turret
// =========================================================================

#include <ESP32Servo.h>

// --- Pin Assignments ---
// Ultrasonic Sonar
const int TRIG_PIN = 18;
const int ECHO_PIN = 19; // Connected via 1k/2k resistor voltage divider

// SG90 Turret Servo
const int SERVO_PIN = 23;
Servo scanServo;

// L298N Motor Driver Control
const int ENA_PIN = 25; // Left Motor Speed (PWM)
const int IN1_PIN = 26; // Left Motor Direction 1
const int IN2_PIN = 27; // Left Motor Direction 2
const int ENB_PIN = 33; // Right Motor Speed (PWM)
const int IN3_PIN = 32; // Right Motor Direction 1
const int IN4_PIN = 13; // Right Motor Direction 2

// Navigation Constants
const int OBSTACLE_LIMIT_CM = 25; // Trigger distance threshold
const int MOTOR_PWM_SPEED   = 200; // Duty cycle: 0 (stop) to 255 (full speed)

// Forward declarations
long pingDistanceCm();
int lookAngle(int angleDeg);
void moveForward();
void moveBackward();
void turnLeft();
void turnRight();
void stopMotors();

void setup() {
  Serial.begin(115200);

  // Configure sonar pins
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // Configure L298N driver pins
  pinMode(ENA_PIN, OUTPUT);
  pinMode(ENB_PIN, OUTPUT);
  pinMode(IN1_PIN, OUTPUT);
  pinMode(IN2_PIN, OUTPUT);
  pinMode(IN3_PIN, OUTPUT);
  pinMode(IN4_PIN, OUTPUT);

  // Apply motor speed via PWM
  analogWrite(ENA_PIN, MOTOR_PWM_SPEED);
  analogWrite(ENB_PIN, MOTOR_PWM_SPEED);

  // Initialize Servo Turret
  scanServo.setPeriodHertz(50); // Standard 50Hz servo refresh rate
  scanServo.attach(SERVO_PIN, 500, 2400); // 500us to 2400us pulses
  scanServo.write(90); // Center facing forward
  delay(500);

  stopMotors();
  Serial.println("Obstacle Avoiding Robot: Systems Initialized.");
}

void loop() {
  // Continuous forward obstacle clearance monitoring
  long forwardDistance = pingDistanceCm();
  Serial.print("Front Clearance: ");
  Serial.print(forwardDistance);
  Serial.println(" cm");

  if (forwardDistance <= OBSTACLE_LIMIT_CM && forwardDistance > 0) {
    // 1. Obstacle detected: immediately brake motors
    stopMotors();
    delay(100);

    // 2. Reverse briefly to create room for turning
    moveBackward();
    delay(350);
    stopMotors();
    delay(200);

    // 3. Scan right and left with the servo turret
    int rightClearance = lookAngle(20);  // Look Right (20 degrees)
    delay(200);
    int leftClearance  = lookAngle(160); // Look Left (160 degrees)
    delay(200);

    scanServo.write(90); // Return turret to center
    delay(150);

    // 4. Decide best navigation path
    if (rightClearance >= leftClearance && rightClearance > 15) {
      Serial.println("Path Decision: Turning RIGHT");
      turnRight();
      delay(450); // Turn duration
    } else if (leftClearance > 15) {
      Serial.println("Path Decision: Turning LEFT");
      turnLeft();
      delay(450);
    } else {
      // Dead end: execute 180-degree turnaround spin
      Serial.println("Path Decision: Dead End! Spinning 180 degrees");
      turnRight();
      delay(900);
    }
    stopMotors();
    delay(150);
  } else {
    // Path is clear: cruise forward
    moveForward();
  }
  delay(40);
}

// --- Sonar Ping Function ---
long pingDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 26000); // 26ms timeout (~4.5 meters)
  if (duration == 0) return 300; // If timeout, treat as wide open space

  return (duration * 0.0343) / 2;
}

// --- Servo Scanning Helper ---
int lookAngle(int angleDeg) {
  scanServo.write(angleDeg);
  delay(400); // Wait for servo to physically arrive at target angle
  return pingDistanceCm();
}

// --- Motor Kinematics Routines ---
void moveForward() {
  digitalWrite(IN1_PIN, HIGH);
  digitalWrite(IN2_PIN, LOW);
  digitalWrite(IN3_PIN, HIGH);
  digitalWrite(IN4_PIN, LOW);
}

void moveBackward() {
  digitalWrite(IN1_PIN, LOW);
  digitalWrite(IN2_PIN, HIGH);
  digitalWrite(IN3_PIN, LOW);
  digitalWrite(IN4_PIN, HIGH);
}

void turnLeft() {
  digitalWrite(IN1_PIN, LOW);
  digitalWrite(IN2_PIN, HIGH);
  digitalWrite(IN3_PIN, HIGH);
  digitalWrite(IN4_PIN, LOW);
}

void turnRight() {
  digitalWrite(IN1_PIN, HIGH);
  digitalWrite(IN2_PIN, LOW);
  digitalWrite(IN3_PIN, LOW);
  digitalWrite(IN4_PIN, HIGH);
}

void stopMotors() {
  digitalWrite(IN1_PIN, LOW);
  digitalWrite(IN2_PIN, LOW);
  digitalWrite(IN3_PIN, LOW);
  digitalWrite(IN4_PIN, LOW);
}`,
      explanation: [
        { line: '#include <ESP32Servo.h>', detail: 'Provides hardware timer-based 50Hz PWM signal generation for ESP32 servos without interfering with delay functions.' },
        { line: 'analogWrite(ENA_PIN, MOTOR_PWM_SPEED);', detail: 'Controls H-bridge enable pin with PWM duty cycle (200/255 ≈ 78% power) for smooth, non-slipping traction.' },
        { line: 'scanServo.write(90);', detail: 'Directs the servo horn to center (90 degrees), aiming the ultrasonic sensor straight ahead.' },
        { line: 'turnRight(); delay(450);', detail: 'Runs left motor forward and right motor backward for 450 milliseconds, executing a precise ~90-degree skid turn on carpet/hardwood.' }
      ]
    },

    testing: {
      procedure: [
        'Bench Test (Wheels Elevated): Prop the robot chassis onto an overturned mug or wooden block so the drive wheels spin freely in the air.',
        'Switch on battery power. Verify that the L298N onboard red power LED lights up brightly.',
        'Observe the servo turret center to 90 degrees.',
        'With nothing in front of the sonar, verify that both drive wheels spin forward continuously.',
        'Place a cardboard box 15 cm in front of the sensor: verify that both wheels stop instantly, reverse for ~350ms, stop, the servo scans right and left, and the wheels execute a turn before resuming forward spin.',
        'Floor Test: Place the robot on an open, flat floor with obstacles (furniture, boxes) 1 meter away. Power on and observe autonomous collision avoidance.'
      ]
    },

    troubleshooting: [
      {
        problem: 'Robot spins in circles continuously when path is clear',
        cause: 'One motor\'s polarity is inverted, running backward while the other runs forward',
        solution: 'Cut battery power. Invert the two wires for the backward-spinning motor at the L298N terminal block (swap OUT1 with OUT2 or OUT3 with OUT4).',
        severity: 'Common'
      },
      {
        problem: 'ESP32 continuously reboots (brownout detector reset) whenever motors attempt to spin',
        cause: 'Weak battery pack or high motor inrush current causing voltage dip below 2.7V',
        solution: 'Use high-discharge Li-ion 18650 batteries (7.4V total) instead of weak 9V alkaline blocks. Ensure thick 22 AWG power wires and consider adding a 470µF electrolytic capacitor across L298N 12V and GND.',
        severity: 'Critical'
      },
      {
        problem: 'SG90 servo twitches, jitters, or fails to turn completely',
        cause: 'Insufficient current supply on the 5V rail, or signal pulse range not calibrated',
        solution: 'Verify that the servo power wire connects to the 5V regulator output of the L298N, not the 3.3V pin. Confirm the ESP32Servo library is installed.',
        severity: 'Moderate'
      },
      {
        problem: 'Robot runs into dark or transparent obstacles (e.g., black sofa, glass door)',
        cause: 'Acoustic physics: fabric absorbs 40kHz ultrasound, and angled smooth surfaces deflect sound away',
        solution: 'This is a physical limitation of sonar echolocation. For complex environments, real-world robots augment sonar with physical micro-switch bump sensors or optical LiDAR.',
        severity: 'Minor'
      }
    ],

    costEstimate: {
      totalRange: '₹2,700 – ₹3,800',
      breakdown: [
        { item: '2WD Smart Robot Car Chassis Kit with Motors', cost: '₹700 – ₹900', source: 'Amazon.in / Robu.in' },
        { item: 'ESP32 DevKit v1 Microcontroller', cost: '₹450 – ₹600', source: 'Amazon.in / Robu.in' },
        { item: 'L298N Dual H-Bridge Motor Driver Module', cost: '₹120 – ₹200', source: 'RoboElements / Amazon.in' },
        { item: 'HC-SR04 Ultrasonic Sonar Module', cost: '₹80 – ₹150', source: 'Amazon.in / Robu.in' },
        { item: 'SG90 9g Sub-Micro Servo Motor', cost: '₹120 – ₹180', source: 'Amazon.in / RoboElements' },
        { item: '2x 18650 Battery Holder & Cells', cost: '₹600 – ₹900', source: 'Amazon.in / local electronics shops' },
        { item: 'Jumper Wires & Resistors', cost: '₹80 – ₹150', source: 'Amazon.in / Maker Stores' }
      ]
    },

    references: [
      {
        title: 'STMicroelectronics L298N Dual Full-Bridge Driver Technical Datasheet',
        source: 'STMicroelectronics',
        url: 'https://www.st.com/resource/en/datasheet/l298.pdf',
        type: 'Manufacturer Datasheet'
      },
      {
        title: 'TowerPro SG90 9g Sub-Micro Servo Motor Technical Specifications',
        source: 'TowerPro Official',
        url: 'http://www.towerpro.com.tw/product/sg90-7/',
        type: 'Manufacturer Datasheet'
      },
      {
        title: 'Espressif Systems ESP32 Technical Reference Manual (LEDC PWM Peripheral)',
        source: 'Espressif Systems',
        url: 'https://www.espressif.com',
        type: 'Manufacturer Datasheet'
      },
      {
        title: 'Differential Drive Mobile Robot Kinematics and Control',
        source: 'MIT Robotics Lab / OpenCourseWare',
        url: 'https://ocw.mit.edu',
        type: 'Academic Reference'
      }
    ]
  }
};
