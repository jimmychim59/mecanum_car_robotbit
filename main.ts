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
}
radio.onReceivedValue(function (name, value) {
    if (name == "rw1") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        value,
        robotbit.Motors.M1B,
        value
        )
        carMode(2)
    } else if (name == "rw2") {
        robotbit.MotorRunDual(
        robotbit.Motors.M2A,
        value,
        robotbit.Motors.M2B,
        value
        )
        carMode(2)
    } else if (name == "a1") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1B,
        value,
        robotbit.Motors.M2A,
        value
        )
        carMode(3)
    } else if (name == "a2") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        value,
        robotbit.Motors.M2B,
        value
        )
        carMode(3)
    } else if (name == "w1") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        -1 * value,
        robotbit.Motors.M2A,
        value
        )
        carMode(1)
    } else if (name == "w2") {
        robotbit.MotorRunDual(
        robotbit.Motors.M1B,
        value,
        robotbit.Motors.M2B,
        -1 * value
        )
        carMode(1)
    } else {
        carMode(-1)
    }
})
let rgb: neopixel.Strip = null
let radio_gp = 39
radio.setGroup(radio_gp)
basic.showIcon(IconNames.Happy)
music.setBuiltInSpeakerEnabled(true)
music.playSoundEffect(music.builtinSoundEffect(soundExpression.spring), SoundExpressionPlayMode.UntilDone)
rgb = robotbit.rgb()
rgb.setBrightness(10)
rgb.showColor(neopixel.colors(NeoPixelColors.Red))
