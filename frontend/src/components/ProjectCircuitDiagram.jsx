import React from 'react';

export default function ProjectCircuitDiagram({ diagramType }) {
  if (diagramType === 'led-blink') {
    return (
      <div style={{ background: '#070b14', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Verified Circuit Schematic & Wiring Map
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>5V Logic Standard</span>
        </div>

        <svg viewBox="0 0 800 320" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="arduinoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00878F" />
              <stop offset="100%" stopColor="#005B60" />
            </linearGradient>
            <linearGradient id="ledGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#cc0000" />
            </linearGradient>
            <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#ef4444" />
            </marker>
            <marker id="arrowBlack" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Background Grid */}
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="800" height="320" fill="url(#gridPattern)" />

          {/* Arduino Uno Board Representation */}
          <rect x="50" y="40" width="220" height="240" rx="8" fill="url(#arduinoGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="160" y="75" fill="#ffffff" fontWeight="800" fontSize="16" textAnchor="middle">Arduino Uno R3</text>
          <text x="160" y="95" fill="#a5f3fc" fontSize="11" textAnchor="middle">ATmega328P @ 16MHz</text>

          {/* USB Port & Power */}
          <rect x="25" y="110" width="30" height="50" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <text x="32" y="140" fill="#0f172a" fontSize="9" fontWeight="700">USB</text>

          {/* Pin Headers */}
          {/* Digital Pin 13 Pinout */}
          <rect x="240" y="115" width="40" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="260" cy="127" r="4" fill="#fbbf24" />
          <text x="215" y="131" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="end">Pin 13 (5V)</text>

          {/* GND Pinout */}
          <rect x="240" y="185" width="40" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="260" cy="197" r="4" fill="#94a3b8" />
          <text x="220" y="201" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="end">GND (0V)</text>

          {/* Circuit Wiring Traces */}
          {/* Signal Trace: Pin 13 to Resistor */}
          <path d="M 260 127 L 360 127" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
          <text x="310" y="115" fill="#fca5a5" fontSize="10" fontWeight="600" textAnchor="middle">5V Digital Out</text>

          {/* 220 Ohm Resistor Graphic */}
          <rect x="360" y="112" width="100" height="30" rx="6" fill="#d97706" stroke="#fbbf24" strokeWidth="1" />
          {/* Resistor color bands: Red (2), Red (2), Brown (x10), Gold (5%) */}
          <rect x="380" y="112" width="6" height="30" fill="#dc2626" />
          <rect x="395" y="112" width="6" height="30" fill="#dc2626" />
          <rect x="410" y="112" width="6" height="30" fill="#92400e" />
          <rect x="435" y="112" width="6" height="30" fill="#fbbf24" />
          <text x="410" y="100" fill="#fde68a" fontSize="12" fontWeight="700" textAnchor="middle">220Ω (1/4W)</text>
          <text x="410" y="155" fill="#9ca3af" fontSize="9" textAnchor="middle">Red-Red-Brown-Gold</text>

          {/* Resistor to LED Anode Trace */}
          <path d="M 460 127 L 540 127" fill="none" stroke="#ef4444" strokeWidth="3" />

          {/* LED Graphic */}
          <g transform="translate(540, 95)">
            {/* LED Bulb */}
            <circle cx="35" cy="32" r="24" fill="url(#ledGlow)" stroke="#f87171" strokeWidth="2" opacity="0.95" />
            <path d="M 15 32 L 55 32" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            {/* Light emission arrows */}
            <path d="M 50 15 L 65 5 M 45 5 L 60 -5" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            {/* Anode lead (longer) */}
            <path d="M 0 32 L 15 32" stroke="#cbd5e1" strokeWidth="2.5" />
            <text x="0" y="24" fill="#f87171" fontSize="10" fontWeight="700">Anode (+)</text>
            {/* Cathode lead (shorter with bend) */}
            <path d="M 55 32 L 80 32 L 80 102" stroke="#94a3b8" strokeWidth="2.5" />
            <text x="85" y="45" fill="#94a3b8" fontSize="10" fontWeight="700">Cathode (-)</text>
            <text x="35" y="70" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">Red 5mm LED</text>
            <text x="35" y="84" fill="#fca5a5" fontSize="9" textAnchor="middle">V_f ≈ 1.8V - 2.0V</text>
          </g>

          {/* Return Trace: LED Cathode to GND */}
          <path d="M 620 197 L 260 197" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 3" />
          <text x="440" y="215" fill="#7dd3fc" fontSize="10" fontWeight="600" textAnchor="middle">GND Return Path (0 Volts)</text>

          {/* Math callout box */}
          <rect x="520" y="245" width="240" height="60" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
          <text x="535" y="265" fill="#38bdf8" fontSize="11" fontWeight="700">Ohm's Law Calculation:</text>
          <text x="535" y="282" fill="#e2e8f0" fontSize="10">I = (5.0V - 1.8V) / 220Ω</text>
          <text x="535" y="296" fill="#4ade80" fontSize="10" fontWeight="700">I ≈ 14.5 mA (Safe current)</text>
        </svg>
      </div>
    );
  }

  if (diagramType === 'automatic-night-lamp') {
    return (
      <div style={{ background: '#070b14', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ESP32 LDR Voltage Divider & LED Driver Schematic
          </div>
          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>3.3V ADC Safe Logic</span>
        </div>

        <svg viewBox="0 0 800 360" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="espGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <pattern id="gridPattern2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="800" height="360" fill="url(#gridPattern2)" />

          {/* ESP32 Module Block */}
          <rect x="50" y="40" width="240" height="280" rx="8" fill="url(#espGrad)" stroke="#a855f7" strokeWidth="1.5" />
          <rect x="80" y="60" width="180" height="110" rx="4" fill="url(#shieldGrad)" stroke="#64748b" strokeWidth="1" />
          <text x="170" y="110" fill="#f8fafc" fontWeight="800" fontSize="14" textAnchor="middle">ESP-WROOM-32</text>
          <text x="170" y="130" fill="#c084fc" fontSize="10" textAnchor="middle">240MHz Dual-Core / 12-Bit ADC</text>

          {/* ESP32 Output Pins */}
          {/* 3V3 Pin */}
          <rect x="270" y="80" width="35" height="22" rx="3" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
          <circle cx="285" cy="91" r="3.5" fill="#ef4444" />
          <text x="255" y="95" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="end">3V3</text>

          {/* GPIO 34 (ADC1_CH6) */}
          <rect x="270" y="145" width="35" height="22" rx="3" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
          <circle cx="285" cy="156" r="3.5" fill="#38bdf8" />
          <text x="255" y="160" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="end">GPIO 34 (ADC1)</text>

          {/* GPIO 2 (LED Out) */}
          <rect x="270" y="210" width="35" height="22" rx="3" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
          <circle cx="285" cy="221" r="3.5" fill="#4ade80" />
          <text x="255" y="225" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="end">GPIO 2 (OUT)</text>

          {/* GND Pin */}
          <rect x="270" y="275" width="35" height="22" rx="3" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
          <circle cx="285" cy="286" r="3.5" fill="#94a3b8" />
          <text x="255" y="290" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="end">GND</text>

          {/* 3.3V Trace to LDR */}
          <path d="M 285 91 L 440 91" fill="none" stroke="#ef4444" strokeWidth="2.5" />
          <text x="360" y="81" fill="#fca5a5" fontSize="10" fontWeight="600" textAnchor="middle">3.3V Power Rail</text>

          {/* LDR (Photoresistor) Component Block */}
          <g transform="translate(440, 66)">
            <circle cx="35" cy="25" r="22" fill="#334155" stroke="#fbbf24" strokeWidth="1.5" />
            <path d="M 23 20 Q 30 15 35 25 Q 40 35 47 25" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Photon light rays */}
            <path d="M 12 5 L 22 15 M 22 0 L 32 10" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <text x="35" y="62" fill="#fde047" fontSize="11" fontWeight="700" textAnchor="middle">GL5528 LDR</text>
            <text x="35" y="74" fill="#94a3b8" fontSize="8" textAnchor="middle">Dark: 1MΩ | Light: 1kΩ</text>
          </g>

          {/* Voltage Divider Junction */}
          <circle cx="530" cy="91" r="4" fill="#38bdf8" />
          <path d="M 495 91 L 530 91 L 530 156 L 285 156" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="420" y="148" fill="#7dd3fc" fontSize="10" fontWeight="600" textAnchor="middle">V_out Signal (0V - 3.0V) to ADC</text>

          {/* 10k Fixed Resistor */}
          <path d="M 530 91 L 530 180" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
          <rect x="515" y="180" width="30" height="55" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="560" y="212" fill="#f8fafc" fontSize="11" fontWeight="700">10kΩ</text>
          <text x="560" y="225" fill="#94a3b8" fontSize="9">Pull-Down</text>
          <path d="M 530 235 L 530 286 L 285 286" fill="none" stroke="#94a3b8" strokeWidth="2.5" />

          {/* LED Output Subcircuit from GPIO 2 */}
          <path d="M 285 221 L 620 221" fill="none" stroke="#4ade80" strokeWidth="2.5" />
          <text x="440" y="213" fill="#86efac" fontSize="10" fontWeight="600" textAnchor="middle">GPIO 2 (Digital High on Night)</text>

          {/* 220 Ohm LED Resistor */}
          <rect x="620" y="208" width="55" height="26" rx="4" fill="#d97706" stroke="#fbbf24" strokeWidth="1" />
          <text x="647" y="225" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">220Ω</text>

          {/* Night Lamp LED */}
          <path d="M 675 221 L 710 221" fill="none" stroke="#4ade80" strokeWidth="2.5" />
          <circle cx="730" cy="221" r="18" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
          <text x="730" y="255" fill="#fda4af" fontSize="10" fontWeight="700" textAnchor="middle">Night Lamp LED</text>
          <path d="M 730 239 L 730 286 L 530 286" fill="none" stroke="#94a3b8" strokeWidth="2.5" />

          {/* Common Ground Node Symbol */}
          <circle cx="530" cy="286" r="4" fill="#94a3b8" />
          <text x="400" y="302" fill="#cbd5e1" fontSize="10" fontWeight="600" textAnchor="middle">Common Ground (GND)</text>
        </svg>
      </div>
    );
  }

  if (diagramType === 'ultrasonic-distance-meter') {
    return (
      <div style={{ background: '#070b14', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            HC-SR04 Acoustic Echolocation Timing & Pinout Schematic
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>40 kHz Ultrasonic Pulse</span>
        </div>

        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Background Grid */}
          <pattern id="gridPattern3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="800" height="340" fill="url(#gridPattern3)" />

          {/* Arduino Block */}
          <rect x="50" y="50" width="220" height="240" rx="8" fill="#005B60" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="160" y="85" fill="#ffffff" fontWeight="800" fontSize="16" textAnchor="middle">Arduino Uno R3</text>
          <text x="160" y="105" fill="#67e8f9" fontSize="11" textAnchor="middle">ATmega328P Master</text>

          {/* Pins on Arduino */}
          <text x="245" y="140" fill="#f87171" fontSize="11" fontWeight="700" textAnchor="end">5V Power</text>
          <circle cx="260" cy="136" r="4" fill="#ef4444" />

          <text x="245" y="180" fill="#fde047" fontSize="11" fontWeight="700" textAnchor="end">Pin 9 (TRIG)</text>
          <circle cx="260" cy="176" r="4" fill="#eab308" />

          <text x="245" y="220" fill="#93c5fd" fontSize="11" fontWeight="700" textAnchor="end">Pin 10 (ECHO)</text>
          <circle cx="260" cy="216" r="4" fill="#3b82f6" />

          <text x="245" y="260" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="end">GND (Ground)</text>
          <circle cx="260" cy="256" r="4" fill="#64748b" />

          {/* HC-SR04 Sensor Body */}
          <rect x="480" y="70" width="260" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="610" y="98" fill="#f8fafc" fontWeight="800" fontSize="15" textAnchor="middle">HC-SR04 SONAR MODULE</text>

          {/* Ultrasonic Transducer Cones */}
          {/* Transmitter T */}
          <circle cx="545" cy="155" r="36" fill="#0f172a" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="545" cy="155" r="28" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="545" y="160" fill="#38bdf8" fontWeight="800" fontSize="14" textAnchor="middle">T</text>
          <text x="545" y="205" fill="#94a3b8" fontSize="9" textAnchor="middle">40kHz Transmitter</text>

          {/* Receiver R */}
          <circle cx="675" cy="155" r="36" fill="#0f172a" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="675" cy="155" r="28" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="675" y="160" fill="#4ade80" fontWeight="800" fontSize="14" textAnchor="middle">R</text>
          <text x="675" y="205" fill="#94a3b8" fontSize="9" textAnchor="middle">Receiver Transducer</text>

          {/* Sensor Header Pins */}
          {/* VCC */}
          <circle cx="480" cy="136" r="4" fill="#ef4444" />
          <text x="495" y="140" fill="#f87171" fontSize="10" fontWeight="700">VCC</text>
          <path d="M 260 136 L 480 136" stroke="#ef4444" strokeWidth="2.5" />

          {/* TRIG */}
          <circle cx="480" cy="176" r="4" fill="#eab308" />
          <text x="495" y="180" fill="#fde047" fontSize="10" fontWeight="700">TRIG</text>
          <path d="M 260 176 L 480 176" stroke="#eab308" strokeWidth="2.5" />
          <text x="370" y="170" fill="#fef08a" fontSize="9" textAnchor="middle">10µs High Pulse</text>

          {/* ECHO */}
          <circle cx="480" cy="216" r="4" fill="#3b82f6" />
          <text x="495" y="220" fill="#93c5fd" fontSize="10" fontWeight="700">ECHO</text>
          <path d="M 260 216 L 480 216" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="370" y="232" fill="#93c5fd" fontSize="9" textAnchor="middle">Pulse Width (Time of Flight)</text>

          {/* GND */}
          <circle cx="480" cy="256" r="4" fill="#64748b" />
          <text x="495" y="260" fill="#94a3b8" fontSize="10" fontWeight="700">GND</text>
          <path d="M 260 256 L 480 256" stroke="#64748b" strokeWidth="2.5" />

          {/* Acoustic Waveforms */}
          <path d="M 720 135 Q 750 120 770 110" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 720 155 Q 760 155 780 155" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 720 175 Q 750 190 770 200" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          <text x="750" y="95" fill="#38bdf8" fontSize="9" fontWeight="700">Sonic Burst</text>

          {/* Target wall illustration */}
          <rect x="785" y="90" width="10" height="130" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (diagramType === 'obstacle-avoiding-robot') {
    return (
      <div style={{ background: '#070b14', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            2WD Robot Chassis Wiring, Logic Level Shifter & H-Bridge Architecture
          </div>
          <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Dual Power Rail System</span>
        </div>

        <svg viewBox="0 0 840 400" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Background Grid */}
          <pattern id="gridPattern4" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="840" height="400" fill="url(#gridPattern4)" />

          {/* Battery Pack */}
          <rect x="30" y="30" width="130" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="95" y="55" fill="#fde68a" fontWeight="800" fontSize="12" textAnchor="middle">7.4V Li-ion Battery</text>
          <text x="95" y="72" fill="#94a3b8" fontSize="9" textAnchor="middle">2x 18650 Series</text>
          <circle cx="150" cy="45" r="4" fill="#ef4444" />
          <circle cx="150" cy="85" r="4" fill="#0f172a" stroke="#64748b" />

          {/* L298N Dual H-Bridge Motor Driver Module */}
          <rect x="230" y="30" width="240" height="180" rx="8" fill="#1e1e2f" stroke="#ef4444" strokeWidth="2" />
          <rect x="310" y="45" width="80" height="50" rx="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <text x="350" y="75" fill="#ffffff" fontWeight="800" fontSize="12" textAnchor="middle">L298N Heatsink</text>
          <text x="350" y="115" fill="#fca5a5" fontWeight="700" fontSize="13" textAnchor="middle">MOTOR DRIVER</text>

          {/* Motor Out Terminals */}
          <text x="240" y="150" fill="#38bdf8" fontSize="10" fontWeight="700">OUT1/OUT2</text>
          <text x="410" y="150" fill="#38bdf8" fontSize="10" fontWeight="700">OUT3/OUT4</text>

          {/* Left Motor */}
          <rect x="50" y="140" width="110" height="60" rx="6" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="105" y="165" fill="#ffffff" fontWeight="700" fontSize="11" textAnchor="middle">Left DC Motor</text>
          <text x="105" y="182" fill="#94a3b8" fontSize="9" textAnchor="middle">Motor A (Gear TT)</text>
          <path d="M 160 160 L 230 160" stroke="#38bdf8" strokeWidth="2" />

          {/* Right Motor */}
          <rect x="540" y="140" width="110" height="60" rx="6" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="595" y="165" fill="#ffffff" fontWeight="700" fontSize="11" textAnchor="middle">Right DC Motor</text>
          <text x="595" y="182" fill="#94a3b8" fontSize="9" textAnchor="middle">Motor B (Gear TT)</text>
          <path d="M 470 160 L 540 160" stroke="#38bdf8" strokeWidth="2" />

          {/* Battery to L298N Power Lines */}
          <path d="M 150 45 L 230 45" stroke="#ef4444" strokeWidth="3" />
          <text x="190" y="38" fill="#f87171" fontSize="9" fontWeight="700">+7.4V</text>
          <path d="M 150 85 L 230 85" stroke="#000000" strokeWidth="3" />
          <text x="190" y="100" fill="#94a3b8" fontSize="9" fontWeight="700">GND</text>

          {/* ESP32 Controller Block */}
          <rect x="230" y="240" width="240" height="140" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
          <text x="350" y="270" fill="#ffffff" fontWeight="800" fontSize="14" textAnchor="middle">ESP32 DevKit v1</text>
          <text x="350" y="288" fill="#c084fc" fontSize="10" textAnchor="middle">Robotics Control Core</text>

          {/* Control Traces: ESP32 to L298N */}
          <path d="M 330 240 L 330 210" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 2" />
          <text x="350" y="228" fill="#c084fc" fontSize="9" fontWeight="700" textAnchor="middle">6x GPIOs (ENA, IN1-4, ENB)</text>

          {/* SG90 Servo Turret */}
          <rect x="540" y="30" width="120" height="55" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="600" y="52" fill="#ffffff" fontWeight="700" fontSize="11" textAnchor="middle">SG90 Servo</text>
          <text x="600" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">GPIO 23 PWM</text>

          {/* HC-SR04 on Turret */}
          <rect x="690" y="30" width="120" height="55" rx="6" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
          <text x="750" y="52" fill="#ffffff" fontWeight="700" fontSize="11" textAnchor="middle">HC-SR04 Sonar</text>
          <text x="750" y="68" fill="#99f6e4" fontSize="9" textAnchor="middle">Trig: 18 | Echo: 19</text>

          {/* Voltage Divider Callout Box for Echo */}
          <rect x="540" y="260" width="270" height="110" rx="6" fill="rgba(15,23,42,0.95)" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="555" y="285" fill="#fbbf24" fontSize="11" fontWeight="800">⚠️ 5V to 3.3V Logic Protection:</text>
          <text x="555" y="305" fill="#e2e8f0" fontSize="10">HC-SR04 Echo (5V) &rarr; [1kΩ] &rarr; GPIO 19</text>
          <text x="555" y="325" fill="#e2e8f0" fontSize="10">                      └&rarr; [2kΩ] &rarr; GND</text>
          <text x="555" y="348" fill="#4ade80" fontSize="10" fontWeight="700">Scaled Voltage = 5.0V * (2/3) ≈ 3.33V</text>

          {/* Common Ground Callout */}
          <path d="M 470 85 L 500 85 L 500 310 L 470 310" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <text x="510" y="200" fill="#cbd5e1" fontSize="9" fontWeight="700" transform="rotate(90, 510, 200)">Common Ground Star</text>
        </svg>
      </div>
    );
  }

  return null;
}
