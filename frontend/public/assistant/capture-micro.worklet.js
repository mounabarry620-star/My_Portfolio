// Tourne dans le fil audio du navigateur : ramène le micro à 16 000 échantillons par seconde
// (le format de Gemini Live, trois fois moins lourd à envoyer qu'un micro à 48 kHz), puis
// envoie des morceaux d'environ 100 ms à assistant-voix.ts, qui les transmet à Gemini.
const SORTIE = 16000;

class CaptureMicro extends AudioWorkletProcessor {
  constructor() {
    super();
    this.pas = sampleRate / SORTIE; // sampleRate : fréquence du micro (global du worklet)
    this.tampon = new Float32Array(SORTIE / 10);
    this.longueur = 0;
    this.somme = 0; // moyenne des échantillons d'entrée qui forment un échantillon de sortie
    this.nombre = 0;
    this.position = 0;
  }
  process(entrees) {
    const canal = entrees[0] && entrees[0][0];
    if (!canal) return true;
    for (let i = 0; i < canal.length; i++) {
      this.somme += canal[i];
      this.nombre++;
      this.position++;
      if (this.position >= this.pas) {
        this.position -= this.pas;
        this.tampon[this.longueur++] = this.somme / this.nombre;
        this.somme = 0;
        this.nombre = 0;
        if (this.longueur === this.tampon.length) {
          this.port.postMessage(this.tampon.slice(0));
          this.longueur = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor('capture-micro', CaptureMicro);
