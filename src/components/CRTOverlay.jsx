// Global scanline / vignette / moving scanbar effects layered over the whole site.
export default function CRTOverlay() {
  return (
    <>
      <div className="crt-overlay" />
      <div className="crt-vignette" />
      <div className="scanbar" />
    </>
  );
}
