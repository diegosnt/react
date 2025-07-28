import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import MainHome from "../components/MainHome"


function Home() {

    return(
        <div className="d-flex flex-column h-100">
            <Helmet>
                <title>Bits & Books - Inicio</title>
                <meta name="description" content="Bienvenido a Bits & Books, tu tienda online de libros de informática." />
            </Helmet>
            <Header/>
            <MainHome/>
        </div>
    )
}

export default Home