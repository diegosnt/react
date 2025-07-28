import { Helmet } from "react-helmet-async";

function About() {
  return (
    <>
      <Helmet>
        <title>Bits & Books - Sobre Nosotros</title>
        <meta name="description" content="Conoce más sobre Bits & Books, tu tienda especializada en libros clásicos de informática." />
      </Helmet>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="display-4 fw-bold mb-3">Sobre Bits & Books</h1>
            <p className="lead text-muted mb-5">
              Creemos firmemente que la base de la innovación tecnológica se construye sobre el conocimiento atemporal.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h3 className="fw-light">Nuestra Misión</h3>
            <p>
              Somos tu destino online especializado en los clásicos y fundamentales libros de informática. Sabemos que el mundo de la tecnología evoluciona a pasos agigantados, pero nuestra misión es sencilla: poner a tu alcance las obras que han moldeado y continúan inspirando a generaciones de programadores, ingenieros y entusiastas de los sistemas.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="fw-light">Nuestra Promesa</h3>
            <p>
              En Bits & Books, cada título es una joya seleccionada. Nos dedicamos a ofrecerte una experiencia de compra simple, rápida y segura, para que puedas concentrarte en lo que realmente importa: expandir tu mente y mejorar tus habilidades. Ya sea que estés buscando entender los principios de la programación o explorar los patrones de diseño que perduran, aquí encontrarás la sabiduría condensada en cada página.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
