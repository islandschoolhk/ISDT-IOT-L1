namespace ISDTiot {
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
    basic.pause(500);
    MuseOLED.init();
    basic.pause(5000);
  }

  // -------------- 2. WiFi ----------------
  //% blockId=muselab_set_wifi
  //% block="Set wifi to ssid %ssid| pwd %pwd"   
  //% weight=80
  //% group="WIFI"
  export function setWifi(ssid: string, pwd: string): void {
    serial.writeLine("(AT+wifi?ssid=" + ssid + "&pwd=" + pwd + ")");
  }

   //% blockId=muselab_set_dt_wifi
  //% block="Connect to D&T WiFi"   
  //% weight=80
  //% group="WIFI"
  export function setDTWifi(): void {
    serial.writeLine("(AT+wifi?ssid=DT24&pwd=DT2022@$)");
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
  export function readBlynkPinValue(pin: string, auth_token: string): number  {
    let value = "";
    let link ="blynk.cloud:80/external/api/get?token=" + auth_token + "&pin=" + pin;
    serial.writeLine("(AT+http?method=GET" + "&url=" + link + "&header=&body=)");
    for (let respone of ISDTiot.getGenericHttpReturn()) {
        value = respone;
    }
    return parseInt(value);
}


}