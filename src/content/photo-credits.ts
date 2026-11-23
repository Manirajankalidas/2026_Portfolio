// Credits for third-party photos (Wikimedia Commons). Keyed by the image path in public/.
// CC BY and CC BY-SA require this attribution: keep it next to the photo or on the page that shows it.
export type PhotoCredit = { author: string; license: string; source: string };

export const photoCredits: Record<string, PhotoCredit> = {
  "/edge-ai/jetson-agx-orin.webp": {
    author: "Auledas",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:NVidia_Jetson_Orin_AGX.png",
  },
  "/edge-ai/jetson-orin-nx.webp": {
    author: "4300streetcar",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Nvidia_Jetson_Orin_NX_on_a_motherboard_Computex_2025.jpg",
  },
  "/edge-ai/jetson-nano.webp": {
    author: "Thomas Amberg",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:NVIDIA_Jetson_Nano_Developer_Kit_(46967518914).jpg",
  },
  "/edge-ai/raspberry-pi-4b.webp": {
    author: "Laserlicht",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Side.jpg",
  },
  "/edge-ai/raspberry-pi-3b.webp": {
    author: "lespounder",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Main_Raspberry-Pi_3.jpg",
  },
  "/edge-ai/arduino-nano.webp": {
    author: "MegaMegaAndOmega",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Arduino_Nano_on_table.jpg",
  },
  "/edge-ai/arduino-uno.webp": {
    author: "MakeMagazinDE",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Arduino_uno_r3.jpg",
  },
  "/edge-ai/esp8266.webp": {
    author: "Vowstar",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:NodeMCU_DEVKIT_1.0.jpg",
  },
  "/edge-ai/esp32.webp": {
    author: "Brian Krent",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Espressif_ESP-WROOM-32_Wi-Fi_%26_Bluetooth_Module.jpg",
  },
  "/edge-ai/industrial-camera.webp": {
    author: "Alexander Lucke",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:SVCam-EVO_Series_I.JPG",
  },
  "/edge-ai/ip-camera.webp": {
    author: "Olli Niemitalo",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:IP_camera_Ethernet_power.jpg",
  },
  "/edge-ai/usb-webcam.webp": {
    author: "Pmwiki1",
    license: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Webcam_01.jpg",
  },
  "/edge-ai/pi-camera.webp": {
    author: "ZippeyKeys12",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Raspberry_Pi_with_Camera_Module.jpg",
  },
  "/edge-ai/poe-switch-8.webp": {
    author: "Bkvrova",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Poe_Switch_8_Port,_Power_Up_Your_Network_with_Ease.jpg",
  },
  "/edge-ai/ultrasonic.webp": {
    author: "Suyash Dwivedi",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:HC_SR04_Ultrasonic_Module.jpg",
  },
  "/edge-ai/rfid.webp": {
    author: "Giacomo Alessandroni",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:RFID-RC522_photo.jpg",
  },
  "/edge-ai/imu.webp": {
    author: "Nevit Dilmen",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:GY-521_MPU-6050_Module_3_Axis_Gyroscope_%2B_Accelerometer_0487.jpg",
  },
  "/edge-ai/proximity.webp": {
    author: "Ekbsensor",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Inductive_proximity_sensor.jpg",
  },
  "/edge-ai/light.webp": {
    author: "Suyash Dwivedi",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:25mm_light-dependent_resistor_(LDR)_(5).jpg",
  },
  "/edge-ai/air-quality.webp": {
    author: "Sensirion AG",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:CO2_Sensor_SCD30.jpg",
  },
  "/edge-ai/can-bus.webp": {
    author: "Snewkirk7953",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:CAN-BUS_Shield.JPG",
  },
  "/edge-ai/uart.webp": {
    author: "oomlout",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:FTDI_Cable.jpg",
  },
  "/edge-ai/bluetooth.webp": {
    author: "Pradana Aumars",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Arduino_UNO_%2B_HC-SR04_%2B_HC_05_%2B_breadboard_-_side_view_00.jpg",
  },
};

// The Edge AI banner is a wide crop of the Jetson Orin NX photo.
photoCredits["/edge-ai/banner.webp"] = photoCredits["/edge-ai/jetson-orin-nx.webp"];
