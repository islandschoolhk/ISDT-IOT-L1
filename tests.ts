serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
    MuseOLED.writeString(serial.readLine())
})
input.onButtonPressed(Button.AB, () => {
    ISDTiot.setWifi("muselab", "12345678")
})
input.onButtonPressed(Button.A, () => {
    ISDTiot.sendThingspeak("XXXXXXXXXXXXXX", 80, 0, 0)
})
input.onButtonPressed(Button.B, () => {
    ISDTiot.sendIFTTT(
        "XXXXXXXXXXXXXXXXXX",
        "email",
        0,
        0,
        0
    )
})
input.onPinPressed(TouchPin.P0, () => {
    ISDTiot.sendBattery()
})
input.onPinPressed(TouchPin.P1, () => {
    ISDTiot.sendTest()
})
// input.onPinPressed(TouchPin.P2, () => {
//     ISDTiot.controlServo(5, 100)
// })
basic.showIcon(IconNames.Angry)
MuseOLED.init()
ISDTiot.initializeWifi()
basic.forever(() => {

})