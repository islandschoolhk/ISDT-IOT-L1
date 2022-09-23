namespace ISDTiot {
  let inbound1 = ""
  let inbound2 = ""
  let outbound1 = ""
  let outbound2 = ""
  let httpReturnArray: string[] = []

  
  export enum httpMethod {
    //% block="GET"
    GET,
    //% block="POST"
    POST,
    //% block="PUT"
    PUT,
    //% block="DELETE"
    DELETE
  }

  

  // -------------- 1. Initialization ----------------
  //%blockId=muselab_initialize_wifi
  //%block="Initialize Muselab WiFi Booster and OLED"
  //% weight=90	
  //% blockGap=7
  //% group="Booster"
  export function initializeWifi(): void {
    serial.redirect(SerialPin.P16, SerialPin.P8, BaudRate.BaudRate115200);
    MuseOLED.init();


    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
      let temp = serial.readLine();
      let tempDeleteFirstCharacter = "";


      if (temp.charAt(0).compare("#") == 0) {
        tempDeleteFirstCharacter = temp.substr(1, 20)
        httpReturnArray.push(tempDeleteFirstCharacter)
      } else if (temp.charAt(0).compare("*") == 0) {

        // For digital, pwm, servo
        let mode = temp.substr(1, 1)
        let intensity = 0
        let pin = 0

        // For motor and car
        let motor = 0
        let direction = 0

        // For control 2 motor same time mode
        let direction1 = 0
        let direction2 = 0
        let intensity1 = 0
        let intensity2 = 0

        if (mode == "0") {	//digital
          pin = parseInt(temp.substr(3, 2)) - 7
          intensity = parseInt(temp.substr(2, 1))
          switch (pin) {
            case 0:
              pins.digitalWritePin(DigitalPin.P0, intensity);
              break
            case 1:
              pins.digitalWritePin(DigitalPin.P1, intensity);
              break
            case 2:
              pins.digitalWritePin(DigitalPin.P2, intensity);
              break
            case 12:
              pins.digitalWritePin(DigitalPin.P12, intensity);
              break
          }


        } 

        //basic.showNumber(pin)
        //basic.showNumber(intensity)

      } else if (temp.charAt(0).compare("$") == 0) {
        let no = parseInt(temp.substr(1, 1))
        let string_word = temp.substr(2, 20)

        if (no == 1) {
          inbound1 = string_word
        } else if (no == 2) {
          inbound2 = string_word
        }

      } else {
        MuseOLED.writeStringNewLine(temp)
      }
    })


    basic.pause(5000);
  }
  

  // -------------- 2. WiFi ----------------
  //% blockId=muselab_set_wifi
  //% block="Set wifi to ssid %ssid| pwd %pwd"   
  //% weight=80
  //% group="WIFI"
  export function setWifi(ssid: string, pwd: string): void {
    serial.writeLine("(AT+wifi?ssid=" + ssid + "&pwd=" + pwd + ")");
    basic.pause(5000);
  }
  
  //% blockId=muselab_set_dt_wifi
  //% block="Connect to D&T WiFi"   
  //% weight=80
  //% group="WIFI"
  export function setDTWifi(): void {
    serial.writeLine("(AT+wifi?ssid=DT24&pwd=DT2022@$)");
    basic.pause(5000);
  }

  //%subcategory=More
  //% blockId="muselab_generic_http_return" 
  //% block="HTTP response (string array)"
  //% weight=49
  //% blockGap=7	
  //% group="HTTP"
  export function getGenericHttpReturn(): Array<string> {
    return httpReturnArray;
  }
  

  
  // -------------- 5. Advanced Wifi ----------------

  //%subcategory=More
  //%blockId=muselab_generic_http
  //% block="Send generic HTTP method %method| http://%url| header %header| body %body"
  //% weight=50
  //% blockGap=7
  //% group="HTTP"
  export function sendGenericHttp(method: httpMethod, url: string, header: string, body: string): void {
    httpReturnArray = []
    let temp = ""
    switch (method) {
      case httpMethod.GET:
        temp = "GET"
        break
      case httpMethod.POST:
        temp = "POST"
        break
      case httpMethod.PUT:
        temp = "PUT"
        break
      case httpMethod.DELETE:
        temp = "DELETE"
        break
    }
    serial.writeLine("(AT+http?method=" + temp + "&url=" + url + "&header=" + header + "&body=" + body + ")");
  }

  //%blockId=get_blynk_data
    //%block="Blynk Iot: Read Pin %pin with Token %auth_token"
    //% weight=60
	//% blockGap=7
  export function readBlynkPinValue(pin: string, auth_token: string): string  {
    let value = "";
    let link ="blynk.cloud/external/api/get?token=" + auth_token + "&pin=" + pin;
    serial.writeLine("(AT+http?method=GET" + "&url=" + link + "&header=&body=)");
    for (let respone of ISDTiot.getGenericHttpReturn()) {
        value = respone;
        MuseOLED.writeStringNewLine(value);
    }
    return value;
}


}