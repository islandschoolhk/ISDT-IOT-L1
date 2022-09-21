serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
    MuseOLED.writeString(serial.readLine())
})
input.onButtonPressed(Button.AB, () => {
    basic.forever(5000)
})
input.onButtonPressed(Button.A, () => {
    basic.forever(5000)
})
input.onButtonPressed(Button.B, () => {
    basic.forever(5000)
})
input.onPinPressed(TouchPin.P0, () => {
    basic.forever(5000)
})
input.onPinPressed(TouchPin.P1, () => {
    basic.forever(5000)
})
// input.onPinPressed(TouchPin.P2, () => {
//     ISDTiot.controlServo(5, 100)
// })
basic.showIcon(IconNames.Angry)
MuseOLED.init()
ISDTiot.initializeWifi()
basic.forever(() => {

})