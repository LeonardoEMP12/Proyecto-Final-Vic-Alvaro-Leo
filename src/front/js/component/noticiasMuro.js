import React from "react";
import "../../styles/muro.css";

const noticias = [
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291372/switch2_qgk46e.jpg",
        titular: "Nintendo Switch 2",
        link: "https://www.nintendo.com/successor/es-es/index.html?srsltid=AfmBOormJY7WxHvSLOif5f5Gir8cLHWAruBG8ep78xeYP_0PRaKtpKRw"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291708/202511012282734_1.jpg_vpuxzc.png",
        titular: "25 juegos para el 2025",
        link: "https://vandal.elespanol.com/noticia/1350777314/25-juegos-para-el-2025-metal-gear-solid-delta-snake-eater/"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737292381/nintenderos_tauldq.jpg",
        titular: "Nintenderos",
        link: "https://www.nintenderos.com/"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291421/gameawards2_kjsvqm.jpg",
        titular: "The Game Awards",
        link: "https://thegameawards.com/"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737291933/channels4_profile_spdxsm.jpg",
        titular: "Noticias 3D juegos",
        link: "https://www.3djuegos.com/noticias"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1738145802/Monsterhunterwilds_sgvghg.avif",
        titular: "Monster Hunter Wilds",
        link: "https://www.monsterhunter.com/wilds/es/"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1738174367/descarga_ymk9e6.jpg",
        titular: "Si GTA 6 se retrasa lo sabremos en esta fecha",
        link: "https://as.com/meristation/noticias/si-gta-6-se-retrasa-lo-sabremos-en-esta-fecha-rockstar-games-se-la-juega-muy-pronto-n/?utm_source=chatgpt.com"
    },
    {
        imagen: "https://res.cloudinary.com/dqlsbhfxs/image/upload/v1738174620/silksong_gdjaoq.jpg",
        titular: "Fecha de lanzamiento de Hollow Knight: Silksong",
        link: "https://www.tiktok.com/@light_419/video/7310767000182164741"
    },


    {
        imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202403/2203/1974d931bfb432aa5b9a8615873fafdbaea884634a6f2274.png?w=440",
        titular: "Análisis de Ender Magnolia: Bloom in the Mist, el primer gran metroidvania de 2025",
        link: "https://as.com/meristation/analisis/analisis-de-ender-magnolia-bloom-in-the-mist-el-primer-gran-metroidvania-de-2025-n/"
    },
    {
        imagen: "https://img.asmedia.epimg.net/resizer/v2/BYN4CMKPPVEJBAPUG4RRB4B7HE.png?auth=789dec42d962ad43456c96899794f91bde2938392c2d39fba1c4b673049774e3&width=1472",
        titular: "Esta mítica película de Van Damme tendrá por fin su videojuego oficial 35 años después",
        link: "https://as.com/meristation/noticias/esta-mitica-pelicula-de-van-damme-tendra-por-fin-su-videojuego-oficial-35-anos-despues-n/"
    },
    {
        imagen: "https://img.asmedia.epimg.net/resizer/v2/J6CB5IPURBHGLDMY7H6GKSWMBQ.jpg?auth=b1ac76f5f41a82ada12c246071039be7da62ec2bb22c30bb3abc420704693d94&width=736&height=414&smart=true",
        titular: "Un actor lanza el mensaje más esperanzador sobre GTA 6",
        link: "https://as.com/meristation/noticias/un-actor-lanza-el-mensaje-mas-esperanzador-sobre-gta-6-n/"
    },
    {
        imagen: "https://img.asmedia.epimg.net/resizer/v2/NXT73MTTW5CMLOWFMU5LZ6FGFY.jpg?auth=3c5f6675f962497760af1973443931b7bb301c282f7f5fce11b410aee4f6a05c&width=736&height=414&smart=true",
        titular: "El desarrollador de Civilization 7 habla sobre Nintendo Switch 2 y algunas de sus novedades: 'Es realmente intrigante'",
        link: "https://as.com/meristation/noticias/el-desarrollador-de-civilization-7-habla-sobre-nintendo-switch-2-y-algunas-de-sus-novedades-es-realmente-intrigante-n/"
    },
    {
        imagen: "https://img.asmedia.epimg.net/resizer/v2/RIOX7ZGSZ5BWRK4LGIQKGOWPIY.jpg?auth=6ad25793e86d6e78c011cee192f90b57c235339ba457d3b8766a7ab9ef8058c6&width=736&height=414&smart=true",
        titular: "YouTube se une a las celebraciones del 25 aniversario de The Sims con un Yoodle muy especial",
        link: "https://as.com/meristation/mexico/youtube-se-une-a-las-celebraciones-del-25-aniversario-de-the-sims-con-un-yoodle-muy-especial-n/"
    },



    {
        imagen: "https://img.asmedia.epimg.net/resizer/v2/WYTSNHFBIZACPMKLWYXZI33IDE.jpg?auth=cd3efeb9e769e8fe479b055de456af9fb81cffee11545d32af1119f79a9faf26&width=736&height=414&smart=true",
        titular: "El jefe de Rockstar anticipa un GTA 6 'más grande y mejor de lo que nunca habéis pensado'",
        link: "https://as.com/meristation/noticias/el-jefe-de-rockstar-anticipa-un-gta-6-mas-grande-y-mejor-de-lo-que-nunca-habeis-pensado-n/"
    },
    {
        imagen: "https://los40.com/resizer/v2/MNHQPIMAMZEDRGRMFWCGNGFUUI.jpg?auth=3dc029cd0c500a4e85ec4e7c6b34e636ed32df9b11e91c72bc3848e1802f58b4&quality=70&width=1200&height=544&focal=535,253",
        titular: "Ninja Gaiden vuelve a sus orígenes y con equipo español",
        link: "https://los40.com/2024/12/13/ninja-gaiden-vuelve-a-sus-origenes-y-con-equipo-espanol/"
    },
    {
        imagen: "https://cadenaser.com/resizer/v2/EI3UGK3IGJDPRKD4KY4INZNOFI.jpg?auth=335afb41dacf89259835e1f21a98a4b0e584059f029ce7e1fee24f4267e91f87&quality=70&width=990&height=556&smart=true",
        titular: "42 Málaga acogerá la Global Game Jam: el mayor evento mundial de creación de videojuegos",
        link: "https://cadenaser.com/andalucia/2025/01/17/42-malaga-acogera-la-global-game-jam-el-mayor-evento-mundial-de-creacion-de-videojuegos-ser-malaga/"
    },
    {
        imagen: "https://los40.com/resizer/v2/MP5EQK2OT5A65H3UVPHRXA2R7I.jpeg?auth=90c9b3c70c3fbfc0c97b6fd8f090cddbc75e507510ac07f2b41d2a172b364ac6&quality=70&width=1200&height=544&focal=683,237",
        titular: "Neo-Geo volverá a ser actualidad en 2025",
        link: "https://los40.com/2024/12/06/neo-geo-volvera-a-ser-actualidad-en-2025/"
    }
];

const NoticiasMuro = () => {
    return (
        <div className="col-md-2 fondo1 noticias-content d-none d-md-block">
            <h5 className="header-noticias">Últimas noticias y páginas de videojuegos</h5>
            {noticias.map((noticia, index) => (
                <div key={index} className="fondo3 mt-3" onClick={() => window.open(noticia.link)}>
                    <div className="card card-border card-noticia">
                        <img src={noticia.imagen} alt={noticia.titular} />
                        <div className="card-body">
                            <h5 className="titular-noticia">{noticia.titular}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoticiasMuro;