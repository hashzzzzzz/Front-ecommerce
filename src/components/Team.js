import React from "react";
import './Team.css';
import mashkulli2 from '../assets/mashkulli2.jpg'
import femna from '../assets/femna.jpg'
import mashkulli from '../assets/mashkulli.jpg'

const Team = () => {
    return (
        <section>
            <div className="team-members">
                <h2>Meet Our Team</h2>
                <div className="team-cards">
                    <div className="card">
                        <img src={mashkulli} alt="Member 1" />
                        <h3>Eden Bezzos</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="card">
                        <img src={femna} alt="Member 2" />
                        <h3>Hanna Thomas</h3>
                        <p>Lead Developer</p>
                    </div>
                    <div className="card">
                        <img src={mashkulli2} alt="Member 3" />
                        <h3>Andy White</h3>
                        <p>Design Lead</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
