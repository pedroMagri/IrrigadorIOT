#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define RELE_PIN D7
#define ANALOGICO_PIN A0
#define WIFI_SSID "Iphone Pedro"
#define WIFI_PASSWORD "pedro1234"
#define SERVER_URL "http://172.20.10.8:3000/sensor-data"

const int SOIL_MOISTURE_THRESHOLD = 60;
const int WIFI_TIMEOUT_MS = 20000;

WiFiClient client;

void connectToWiFi() {
    Serial.println("Conectando ao WiFi...");
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    unsigned long startAttemptTime = millis();

    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < WIFI_TIMEOUT_MS) {
        delay(500);
        Serial.print(".");
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWiFi conectado.");
        Serial.print("Endereço IP: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\nFalha ao conectar ao WiFi.");
    }
}

void enviarDadosParaServidor(double percentage) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    Serial.println("Enviando dados para o servidor...");
    
    http.begin(client, SERVER_URL);
    http.addHeader("Content-Type", "application/json");
    
    StaticJsonDocument<200> doc;
    doc["soilMoisturePercentage"] = percentage;

    if (percentage > 60) {
      doc["moistured"] = true;
    } else {
      doc["moistured"] = false;
    }

    String requestBody;
    serializeJson(doc, requestBody);

    int httpCode = http.POST(requestBody);

    if (httpCode > 0) {
      Serial.print("Dados enviados ao servidor. Código HTTP: ");
      Serial.println(httpCode);
    } else {
      Serial.print("Erro ao enviar dados ao servidor. Código HTTP: ");
      Serial.println(httpCode);
      Serial.print("Erro de conexão: ");
      Serial.println(http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("Não conectado ao WiFi.");
    connectToWiFi();
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(RELE_PIN, OUTPUT);
  pinMode(ANALOGICO_PIN, INPUT);
  digitalWrite(RELE_PIN, LOW);
  connectToWiFi();
}

void loop() {
    int umidade = analogRead(ANALOGICO_PIN);
    double percentage = map(umidade, 1023, 368, 0, 100);
    
    if (percentage < SOIL_MOISTURE_THRESHOLD) {
      Serial.print("Irrigando");
      Serial.println(percentage);
      digitalWrite(RELE_PIN, HIGH);
      delay(5000);
      digitalWrite(RELE_PIN, LOW);
    } else {
      Serial.print("Desligado.");
      Serial.println(percentage);
      digitalWrite(RELE_PIN, LOW);
    }

    enviarDadosParaServidor(percentage);
    delay(30000);
}