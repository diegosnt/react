import Header from "../components/Header"
import MainHome from "../components/MainHome"


function Home() {

    return(
        <div className="d-flex flex-column h-100">
            <Header/>
            <MainHome/>
        </div>
    )
}

export default Home