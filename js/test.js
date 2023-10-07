import { particlesCursor } from 'threejs-toys'

particlesCursor({
  el: document.getElementById('app'),
  gpgpuSize: 256,
  colors: [0x00ff00, 0x0000ff],
  color: 0xff0000,
  coordScale: 1.5,
  noiseIntensity: 0.001,
  noiseTimeCoef: 0.0001,
  pointSize: 5,
  pointDecay: 0.005,
  sleepRadiusX: 250,
  sleepRadiusY: 250,
  sleepTimeCoefX: 0.001,
  sleepTimeCoefY: 0.002
})