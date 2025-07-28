function MainHome() {
  return (
    <main className="main">
      {/* <h1>¡Bienvenido!</h1> */}
      <div className="promo-image">
        <a href="#">
          <img
            src="../../imagenes/promo.webp"
            alt="Promoción especial de libros de informática"
          />
        </a>
      </div>

      <div className="promo-cards-container">
        <div className="promo-card">
          <img
            src="../../imagenes/novedas_01_agosto.webp"
            alt="Novedad de Agosto 1"
          />
        </div>
        <div className="promo-card">
          <img
            src="../../imagenes/novedas_02_agosto.webp"
            alt="Novedad de Agosto 2"
          />
        </div>
        <div className="promo-card">
          <img
            src="../../imagenes/novedas_03_agosto.webp"
            alt="Novedad de Agosto 3"
          />
        </div>
      </div>

      <br />

      <h2>Nuestras Formas de Pago</h2>
      <div className="payment-methods-container">
        <div className="payment-method-card">
          <img src="../../imagenes/pago_01_visa.webp" alt="Visa" />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_02_master1.webp" alt="Mastercard" />
        </div>
        <div className="payment-method-card">
          <img
            src="../../imagenes/pago_03_american5.webp"
            alt="American Express"
          />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_04_argencard.webp" alt="Argencard" />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_05_pagofacil.webp" alt="Pago Fácil" />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_06_rapipago2.webp" alt="Rapipago" />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_07_naranjax.webp" alt="Naranja X" />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_08_cabal2.webp" alt="Cabal" />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_09_link.webp" alt="Red Link" />
        </div>
        <div className="payment-method-card">
          <img
            src="../../imagenes/pago_10_provincia.webp"
            alt="Provincia Net"
          />
        </div>
        <div className="payment-method-card">
          <img src="../../imagenes/pago_11_banelco.webp" alt="Banelco" />
        </div>
      </div>
    </main>
  );
}
export default MainHome;
