function MainHome() {
  return (
    <div className="container d-flex flex-column flex-grow-1 justify-content-center py-4">
      <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#5459ac' }}>
        <a href="#">
          <img
            src="../../imagenes/promo.webp"
            alt="Promoción especial de libros de informática"
            className="img-fluid"
          />
        </a>
      </div>

      <div className="row text-center g-4 mb-4">
        <div className="col-md-4">
          <a href="#" className="d-block p-3 rounded" style={{ backgroundColor: 'rgb(241, 97, 1)' }}>
            <img
              src="../../imagenes/novedas_01_agosto.webp"
              alt="Novedad de Agosto 1"
              className="img-fluid"
            />
          </a>
        </div>
        <div className="col-md-4">
          <a href="#" className="d-block p-3 rounded" style={{ backgroundColor: 'rgb(241, 97, 1)' }}>
            <img
              src="../../imagenes/novedas_02_agosto.webp"
              alt="Novedad de Agosto 2"
              className="img-fluid"
            />
          </a>
        </div>
        <div className="col-md-4">
          <a href="#" className="d-block p-3 rounded" style={{ backgroundColor: 'rgb(241, 97, 1)' }}>
            <img
              src="../../imagenes/novedas_03_agosto.webp"
              alt="Novedad de Agosto 3"
              className="img-fluid"
            />
          </a>
        </div>
      </div>

      <div className="text-center">
        <h3 className="mb-3">Nuestras Formas de Pago</h3>
        <div className="row justify-content-center align-items-center g-2">
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_01_visa.webp" alt="Visa" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_02_master1.webp" alt="Mastercard" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_03_american5.webp" alt="American Express" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_04_argencard.webp" alt="Argencard" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_05_pagofacil.webp" alt="Pago Fácil" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_06_rapipago2.webp" alt="Rapipago" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_07_naranjax.webp" alt="Naranja X" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_08_cabal2.webp" alt="Cabal" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_09_link.webp" alt="Red Link" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_10_provincia.webp" alt="Provincia Net" className="img-fluid" />
          </div>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <img src="../../imagenes/pago_11_banelco.webp" alt="Banelco" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainHome;
