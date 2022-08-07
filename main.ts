input.onButtonPressed(Button.A, function () {
    robotbit.MotorRun(robotbit.Motors.M1A, 255)
    robotbit.MotorRun(robotbit.Motors.M1B, 255)
})
// p15 Red Button = Stop (moveFlag = -1)
// p13 Green Button = Go (moveFlag = 1) w1,w2
// p14 Yellow Button = Turn (moveFlag = 2) rw1,rw2
// p16 Blue Button = Drift (moveFlag = 3) a1,a2
function carMode (moveFlag: number) {
    if (moveFlag == 1) {
        basic.showIcon(IconNames.Happy)
        rgb.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (moveFlag == 2) {
        basic.showLeds(`
            . . . . .
            . # . # .
            # # . # #
            . # . # .
            . . . . .
            `)
        rgb.showColor(neopixel.colors(NeoPixelColors.Yellow))
    } else if (moveFlag == 3) {
        basic.showLeds(`
            # # . # #
            # . . . #
            . . . . .
            . . # . .
            . # # # .
            `)
        rgb.showColor(neopixel.colors(NeoPixelColors.Blue))
    } else {
        basic.showIcon(IconNames.No)
        rgb.showColor(neopixel.colors(NeoPixelColors.Red))
    }
    basic.pause(100)
}
input.onButtonPressed(Button.B, function () {
    robotbit.MotorRunDual(
    robotbit.Motors.M2A,
    -255,
    robotbit.Motors.M2B,
    -255
    )
})
radio.onReceivedValue(function (name, value) {
    if (name == "rw1") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        value,
        robotbit.Motors.M1B,
        value
        )
    } else if (name == "rw2") {
        robotbit.MotorRunDual(
        robotbit.Motors.M2A,
        value,
        robotbit.Motors.M2B,
        value
        )
    } else if (name == "a1") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1B,
        value,
        robotbit.Motors.M2A,
        value
        )
    } else if (name == "a2") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        value,
        robotbit.Motors.M2B,
        value
        )
    } else if (name == "w1") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        value,
        robotbit.Motors.M2A,
        -1 * value
        )
    } else if (name == "w2") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1B,
        -1 * value,
        robotbit.Motors.M2B,
        value
        )
    } else if (name == "mode") {
        carMode(value)
    } else {
        robotbit.MotorStopAll()
        carMode(-1)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    robotbit.MotorStopAll()
})
let rgb: neopixel.Strip = null
let radio_gp = 39
radio.setGroup(radio_gp)
basic.showIcon(IconNames.Happy)
rgb = robotbit.rgb()
rgb.setBrightness(10)
rgb.showColor(neopixel.colors(NeoPixelColors.Red))
music.setBuiltInSpeakerEnabled(false)
