// Tourne dans le fil audio du navigateur : regroupe les échantillons du micro en morceaux
// d'environ 100 ms et les envoie à assistant-voix.ts, qui les transmet à Gemini.
class CaptureMicro extends AudioWorkletProcessor {
  constructor() {
    super();
    this.tampon = new Float32Array(Math.round(sampleRate / 10)); // sampleRate : global du worklet
    this.longueur = 0;
  }
  process(entrees) {
    const canal = entrees[0] && entrees[0][0];
    if (!canal) return true;
    let i = 0;
    while (i < canal.length) {
      const n = Math.min(canal.length - i, this.tampon.length - this.longueur);
      this.tampon.set(canal.subarray(i, i + n), this.longueur);
      this.longueur += n;
      i += n;
      if (this.longueur === this.tampon.length) {
        this.port.postMessage(this.tampon.slice(0));
        this.longueur = 0;
      }
    }
    return true;
  }
}
registerProcessor('capture-micro', CaptureMicro);
