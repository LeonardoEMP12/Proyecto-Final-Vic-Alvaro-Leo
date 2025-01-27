import React, { useEffect, useState } from "react";
import "../../styles/muro.css";

const NoticiasMuro = () => {
    return (
        <div className="col-md-2 fondo1 noticias-content d-none d-md-block">
            <h5 className="header-noticias">Ultimas noticias y paginas de videojuegos</h5>
            <div
                className="fondo3 mt-3"
                onClick={() => window.open('https://www.nintendo.com/successor/es-es/index.html?srsltid=AfmBOormJY7WxHvSLOif5f5Gir8cLHWAruBG8ep78xeYP_0PRaKtpKRw')}
            >
                <div className="card card-border card-noticia">
                    <img src="https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291372/switch2_qgk46e.jpg" />
                    <div className="card-body">
                        <h5 className="titular-noticia">Nintendo Switch 2</h5>
                    </div>
                </div>
            </div>

            <div
                className="fondo3 mt-3 d-sm-none d-none d-md-block"
                onClick={() => window.open('https://vandal.elespanol.com/noticia/1350777314/25-juegos-para-el-2025-metal-gear-solid-delta-snake-eater/')}
            >
                <div className="card card-border card-noticia">
                    <img src="https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291708/202511012282734_1.jpg_vpuxzc.png" />
                    <div className="card-body">
                        <h5 className="titular-noticia">25 juegos para el 2025</h5>
                    </div>
                </div>
            </div>

            <div
                className="fondo3 mt-3 d-sm-none d-none d-md-block"
                onClick={() => window.open('https://www.nintenderos.com/')}
            >
                <div className="card card-border card-noticia">
                    <img src="https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737292381/nintenderos_tauldq.jpg" />
                    <div className="card-body">
                        <h5 className="titular-noticia">Nintenderos</h5>
                    </div>
                </div>
            </div>

            <div
                className="fondo3 mt-3 d-sm-none d-none d-md-block"
                onClick={() => window.open('https://thegameawards.com/')}
            >
                <div className="card card-border card-noticia">
                    <img src="https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291421/gameawards2_kjsvqm.jpg" />
                    <div className="card-body">
                        <h5 className="titular-noticia">The Game Awards</h5>
                    </div>
                </div>
            </div>

            <div
                className="fondo3 mt-3 d-sm-none d-none d-md-block"
                onClick={() => window.open('https://www.3djuegos.com/noticias')}
            >
                <div className="card card-border card-noticia">
                    <img src="https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291933/channels4_profile_spdxsm.jpg" />
                    <div className="card-body">
                        <h5 className="titular-noticia">Noticias 3D juegos</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticiasMuro;