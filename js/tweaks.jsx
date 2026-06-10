/* Tweaks da landing Perceptron v2 — acento, intensidade 3D, densidade da rede */
const PERCEPTRON_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8257e5",
  "fx3d": 100,
  "density": 15,
  "futur": true
}/*EDITMODE-END*/;

const PERCEPTRON_ACCENT_SOFT = {
  '#8257e5': '#b69cff',
  '#0ea5b7': '#7dd8e0',
  '#10b981': '#6ee7b7',
  '#e8554d': '#ffa49e'
};

function PerceptronTweaks() {
  const [t, setTweak] = useTweaks(PERCEPTRON_TWEAK_DEFAULTS);

  React.useEffect(() => {
    const soft = PERCEPTRON_ACCENT_SOFT[t.accent] || t.accent;
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--accent-soft', soft);
    root.style.setProperty('--accent-glow', 'color-mix(in srgb, ' + t.accent + ' 30%, transparent)');
    if (window.NEURAL) window.NEURAL.setColor(t.accent, soft);
  }, [t.accent]);

  React.useEffect(() => {
    const f = (t.fx3d || 0) / 100;
    window.FX = window.FX || {};
    window.FX.intensity = f;
    if (window.NEURAL) window.NEURAL.setIntensity(f);
  }, [t.fx3d]);

  React.useEffect(() => {
    if (window.NEURAL) window.NEURAL.setDensity(t.density);
  }, [t.density]);

  React.useEffect(() => {
    if (window.FUTUR) window.FUTUR.set(t.futur);
  }, [t.futur]);

  return (
    <TweaksPanel>
      <TweakSection label="Marca" />
      <TweakColor
        label="Acento"
        value={t.accent}
        options={['#8257e5', '#0ea5b7', '#10b981', '#e8554d']}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakSection label="Efeitos 3D" />
      <TweakSlider
        label="Intensidade"
        value={t.fx3d}
        min={0}
        max={200}
        step={5}
        unit="%"
        onChange={(v) => setTweak('fx3d', v)}
      />
      <TweakSlider
        label="Densidade da rede"
        value={t.density}
        min={6}
        max={26}
        step={1}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakToggle
        label="Toques futuristas"
        value={t.futur}
        onChange={(v) => setTweak('futur', v)}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const host = document.getElementById('tweaks-root');
  if (!host) return;
  ReactDOM.createRoot(host).render(<PerceptronTweaks />);
})();
