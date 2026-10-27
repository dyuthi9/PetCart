import "./Home.css"
import "../App.css"
function Home(){
    return(
        <>
        <section className="home1" id="home">
            <div className="divhome">
                <p>HAPPY PETS ~ HEALTHY LIVES</p>
                <h1>Everything Your <br>
                </br>Pet Needs </h1>
                <button  className="shop-btn"><a className="nav-link" href="/#shop">Shop Now →</a></button>
            </div>
        </section>

        <section className="home1" id="shop">
            <h1>Welcome to the PetCArt</h1>
        </section>


        <section className="home1" id="categories">
            <h1>Welcome to the PetCArt</h1>
        </section>

        <section className="home1" id="about">
            <h1>Welcome to the PetCArt</h1>
        </section>

        <section className="home1" id="contact">
            <h1>Welcome to the PetCArt</h1>
        </section>
        </>
    )
}
export default Home;