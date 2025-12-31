
/**
 * AGENDA COFRADE SEVILLA - MAIN SCRIPT
 * Lógica Vanilla JS con integración de espacios publicitarios.
 */

// --- 1. CONFIGURACIÓN DE IMÁGENES ---
const IMAGES = {
    HERO_BG: './img/recursos/fondo.jpg', 
    SEMANA_SANTA_MISTERIO: './img/semana-santa-misterio.jpg',
    SEMANA_SANTA_PALIO: './img/semana-santa-palio.jpg'
};

// --- 1.1 CONFIGURACIÓN DE PUBLICIDAD (ADSENSE) ---
// Cuando tengas tu cuenta, cambia estos valores.
const ADS_CONFIG = {
    ENABLED: true, // Pon false para ocultar anuncios mientras desarrollas
    CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX", // Tu ID de editor
    SLOT_ID: "1234567890" // Tu ID de bloque de anuncios (puedes crear varios si quieres distintos tamaños)
};

/**
 * Función auxiliar para renderizar un hueco de publicidad.
 * Si ADS_CONFIG.ENABLED es false, no devuelve nada.
 */
function renderAdSlot(className = "my-8") {
    if (!ADS_CONFIG.ENABLED) return '';

    return `
    <div class="w-full max-w-5xl mx-auto ${className} p-4 bg-stone-100 border border-stone-200 text-center relative group overflow-hidden">
        <span class="text-[10px] text-stone-400 uppercase tracking-widest block mb-2 font-bold">Publicidad</span>
        
        <!-- Contenedor del anuncio -->
        <div class="min-h-[100px] flex items-center justify-center bg-white border border-dashed border-stone-300">
             <!-- CÓDIGO GOOGLE ADSENSE -->
             <!-- Cuando tengas el código real, descomenta las líneas <ins> y borra el texto de ejemplo -->
             
             <!--
             <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${ADS_CONFIG.CLIENT_ID}"
                 data-ad-slot="${ADS_CONFIG.SLOT_ID}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
             <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
             </script>
             -->
             
             <span class="text-stone-400 italic text-sm p-4">Espacio reservado para Google AdSense</span>
        </div>
    </div>
    `;
}

// --- 2. DATOS PRINCIPALES (FALLBACK / LOCAL) ---
const FALLBACK_DATA = {
  "articles": [
    {
      "id": 1,
      "title": "El Silencio de las Calles: Las Aguas suspende el traslado de la Virgen de Guadalupe por la crisis de la Policía Local",
      "date": "11 de Diciembre, 2025",
      "category": "Actualidad",
      "image": "./img/noticias/traslado-aguas11122025.jpg",
      "excerpt": "La falta de efectivos policiales y la no activación del Plan de Navidad obligan a la corporación del Lunes Santo a recluir sus cultos en el interior del templo, evidenciando la fragilidad jurídica de las procesiones.",
      "content": "La Junta de Gobierno de la Hermandad de las Aguas se vio forzada a suspender el traslado de su titular, la Virgen de Guadalupe, a la Parroquia del Sagrario, así como el Rosario público previo, debido a la imposibilidad de garantizar la seguridad del cortejo. El Ayuntamiento de Sevilla informó de la carencia de efectivos de la Policía Local disponibles para cubrir el evento, al no haberse activado aún el dispositivo especial de Navidad. Los cultos se celebraron finalmente en el interior de la Capilla del Rosario, generando un profundo malestar en el mundo cofrade por la indefensión ante conflictos laborales municipales."
    },
    {
      "id": 2,
      "title": "Triana abre las puertas del cielo: Comienzan los cultos mayores a la Esperanza en la calle Pureza",
      "date": "20 de Febrero, 2024",
      "category": "Actualidad",
      "image": "./img/noticias/besamanos-triana11122025.jpg",
      "excerpt": "La Capilla de los Marineros se prepara para una semana de fervor ininterrumpido con el devoto besamanos y el Triduo solemne, preludio de la festividad de la Expectación.",
      "content": "La Hermandad de la Esperanza de Triana ha anunciado el calendario de cultos en honor a su titular, que convertirá la calle Pureza en el epicentro cofrade de la segunda quincena de diciembre. La Virgen descenderá de su camarín para un besamanos que se extenderá desde el 15 al 21 de diciembre, con horarios ininterrumpidos en los días centrales. Paralelamente, se celebrará el solemne Triduo predicado por oradores de prestigio, culminando con la Función Principal el día 18, festividad de la Expectación del Parto."
    },
    {
      "id": 3,
      "title": "El Reencuentro con la Madre: La Esperanza Macarena regresa al culto tras la restauración de Pedro Manzano",
      "date": "8 de Diciembre, 2025",
      "category": "Actualidad",
      "image": "./img/noticias/restauracion-macarena11122025.webp",
      "excerpt": "Tras cuatro meses de ausencia y una compleja intervención técnica, la Virgen recupera su policromía original y subsana las alteraciones morfológicas, desatando una marea de devoción en su Basílica.",
      "content": "La Hermandad de la Macarena ha repuesto al culto a su titular, María Santísima de la Esperanza, tras finalizar el proceso de restauración acometido por el especialista Pedro Manzano. La intervención, que sucede a una primera aproximación realizada en junio, ha consistido en la consolidación estructural, la limpieza de la policromía y, fundamentalmente, la corrección de alteraciones en párpados y manos detectadas en estudios previos. Desde la madrugada del día de la Inmaculada, miles de fieles formaron colas kilométricas para reencontrarse con la imagen, que luce ahora con la (dignidad y autenticidad) de su mejor versión histórica."
    },
    {
      "id": 4,
      "title": "Sones de Lunes Santo para las Vísperas: La Redención firma con la Humildad de Sevilla Este",
      "date": "11 de Diembre, 2025",
      "category": "Actualidad",
      "image": "./img/noticia-tiempo-ramos.jpg",
      "excerpt": "La Hermandad de la Hiniesta apuesta por la excelencia artística designando al pintor sevillano para anunciar el acto penitencial presidido por el Cristo de la Buena Muerte.",
      "content": "La Junta de Gobierno de la Hermandad de la Hiniesta ha hecho públicos los nombramientos artísticos para el Vía Crucis de las Cofradías de Sevilla de 2026, que presidirá su titular, el Cristo de la Buena Muerte. El cartel anunciador será obra de Ricardo Cadenas, reconocido pintor y profesor de Bellas Artes, cuyo estilo fusiona el expresionismo abstracto y el pop art. Asimismo, el diseño de la papeleta de sitio conmemorativa ha recaído en Antonio Díaz Arnido, garantizando una línea gráfica de primer nivel para uno de los actos más importantes de la precuaresma."
    }
  ],
  "agenda": [
    {
      "id": 1,
      "dateIso": "2024-03-15",
      "time": "20:30",
      "title": "Solemne Quinario al Gran Poder",
      "location": "Basílica del Gran Poder",
      "type": "Culto",
      "description": "Quinto día del Solemne Quinario en honor a Nuestro Padre Jesús del Gran Poder, con predicación a cargo del Rvdo. Padre D. Antonio Vergara.",
      "image": "./img/agenda-gran-poder.jpg"
    },
    {
      "id": 2,
      "dateIso": "2024-03-15",
      "time": "21:30",
      "title": "Ensayo de Costaleros de Triana",
      "location": "Capilla de los Marineros",
      "type": "Ensayo",
      "description": "Último ensayo de la cuadrilla de costaleros del paso de misterio del Santísimo Cristo de las Tres Caídas antes de la Madrugá.",
      "image": "./img/agenda-ensayo-triana.jpg"
    },
    {
      "id": 3,
      "dateIso": "2024-03-17",
      "time": "12:00",
      "title": "Concierto Banda Oliva de Salteras",
      "location": "Iglesia de la Magdalena",
      "type": "Concierto",
      "description": "Tradicional concierto de Cuaresma interpretando marchas clásicas como 'Soleá dame la mano' y estrenos de este año.",
      "image": "./img/agenda-concierto-oliva.jpg"
    },
    {
      "id": 4,
      "dateIso": "2024-03-22",
      "time": "19:00",
      "title": "Vía Crucis del Cristo de la Caridad",
      "location": "Parroquia de San Andrés",
      "type": "Culto",
      "description": "Solemne Vía Crucis del titular de la Hermandad de Santa Marta por la feligresía, con acompañamiento de capilla musical.",
      "image": "./img/agenda-viacrucis-santa-marta.jpg"
    },
    {
      "id": 5,
      "dateIso": "2024-03-24",
      "time": "15:00",
      "title": "Domingo de Ramos",
      "location": "Carrera Oficial",
      "type": "Salida",
      "description": "Inicio de la Semana Santa de Sevilla. Apertura de la Carrera Oficial con la Hermandad de la Paz.",
      "image": "./img/agenda-domingo-ramos.jpg"
    },
    {
      "id": 6,
      "dateIso": "2025-12-20",
      "time": "20:00",
      "title": "Evento Ejemplo",
      "location": "Catedral de Sevilla",
      "type": "Acto",
      "description": "Este es un evento de ejemplo creado para verificar el funcionamiento del calendario en fecha futura.",
      "image": "./img/agenda-evento-ejemplo.jpg"
    }
  ],
  "hermandades": [
    {
      "id": 101, "name": "Hermandad de San Isidro Labrador y Ntra. Sra. del Amor", "popularName": "Pino Montano", "day": "Viernes de Dolores", "church": "Parroquia de San Isidro Labrador", "foundation": "1981", "image": "./img/hermandad-pino-montano.jpg", "shield": "./img/hdad/pinomontano.jpg", "nPasos": 2, "itinerary": "Salida, Sembradores, Mar de Alborán, Entrada.", "description": "Abre las vísperas desde el barrio de Pino Montano con un gran cortejo de nazarenos y ambiente de barrio.", "tunicDescription": "Túnica blanca con capa y antifaz morado."
    },
    { "id": 102, "name": "Archicofradía del Inmaculado Corazón de María", "popularName": "La Misión", "day": "Viernes de Dolores", "church": "Parroquia de San Antonio Mª Claret", "foundation": "1949", "image": "./img/hermandad-la-mision.jpg", "shield": "./img/hdad/lamision.jpg", "nPasos": 1, "itinerary": "", "description": "Desde Heliópolis, destaca por la elegancia de su cortejo y la singularidad de su paso de misterio.", "tunicDescription": "Túnica blanca de cola con escapulario azul." },
    { "id": 103, "name": "Hermandad del Dulce Nombre de Bellavista", "popularName": "Dulce Nombre de Bellavista", "day": "Viernes de Dolores", "church": "Parroquia del Dulce Nombre", "foundation": "1992", "image": "./img/hermandad-bellavista.jpg", "shield": "./img/hdad/dulcenombre.jpeg", "nPasos": 2, "itinerary": "", "description": "La cofradía del barrio de Bellavista, recorriendo largas distancias y creando gran devoción en su entorno.", "tunicDescription": "Túnica blanca y antifaz morado." },
    { "id": 104, "name": "Hermandad del Cristo de la Corona", "popularName": "Cristo de la Corona", "day": "Viernes de Dolores", "church": "Parroquia del Sagrario (Catedral)", "foundation": "2000", "image": "./img/hermandad-corona.jpg", "shield": "./img/hdad/cristo-corona.jpeg", "nPasos": 1, "itinerary": "", "description": "La hermandad de la Catedral. Realiza un vía crucis penitencial por el entorno monumental con gran recogimiento.", "tunicDescription": "Túnica de ruán morado." },
    { "id": 105, "name": "Hermandad de Pasión y Muerte", "popularName": "Pasión y Muerte", "day": "Viernes de Dolores", "church": "Parroquia de San Juan Bosco (Salesianos de Triana)", "foundation": "1991", "image": "./img/hermandad-pasion-y-muerte.jpg", "shield": "./img/hdad/pasion-y-muerte.jpeg", "nPasos": 1, "itinerary": "", "description": "Silencio y austeridad en Triana. Recupera la estética de las cofradías antiguas de ruán en el arrabal.", "tunicDescription": "Túnica de ruán negro." },
    { "id": 106, "name": "Agrupación Parroquial de Bendición y Esperanza", "popularName": "Bendición y Esperanza", "day": "Viernes de Dolores", "church": "Parroquia de Jesús Obrero", "foundation": "1992", "image": "./img/hermandad-bendicion-esperanza.jpg", "shield": "./img/hdad/bendicion-y-esperanza.jpg", "nPasos": 1, "itinerary": "", "description": "La esperanza del Polígono Sur. Una gran labor social y evangelizadora en una de las zonas más necesitadas.", "tunicDescription": "Hábito blanco y verde." },
    { "id": 107, "name": "Agrupación Parroquial Paz y Misericordia", "popularName": "Paz y Misericordia", "day": "Viernes de Dolores", "church": "Parroquia de San Luis y San Fernando", "foundation": "1995", "image": "./img/hermandad-paz-y-misericordia.jpg", "shield": "./img/hdad/paz-y-misericordia.png", "nPasos": 0, "itinerary": "", "description": "Desde el barrio de Rochelambert, aportando fe y devoción en las vísperas sevillanas.", "tunicDescription": "Túnica crema y capa burdeos." },
    
    { "id": 201, "name": "Hermandad de Padre Pío", "popularName": "Padre Pío", "day": "Sábado de Pasión", "church": "Parroquia del Buen Pastor", "foundation": "1986", "image": "./img/hermandad-padre-pio.jpg", "shield": "./img/hdad/padre-pio.png", "nPasos": 2, "itinerary": "", "description": "Humildad y sencillez desde la barriada de Padre Pío, procesionando hacia la parroquia del Cerro.", "tunicDescription": "Túnica crema con antifaz azul." },
    { "id": 202, "name": "Hermandad del Divino Perdón", "popularName": "Divino Perdón (Alcosa)", "day": "Sábado de Pasión", "church": "Iglesia de la Beata Ana María", "foundation": "1992", "image": "./img/hermandad-divino-perdon.jpg", "shield": "./img/hdad/divino-perdon.jpeg", "nPasos": 2, "itinerary": "", "description": "La cofradía del Parque Alcosa. Destaca la talla del Nazareno y el fervor de su barrio.", "tunicDescription": "Túnica morada." },
    { "id": 203, "name": "Hermandad de los Dolores de Torreblanca", "popularName": "Torreblanca", "day": "Sábado de Pasión", "church": "Parroquia de San Antonio de Padua", "foundation": "1994", "image": "./img/hermandad-torreblanca.jpg", "shield": "./img/hdad/torreblanca.jpeg", "nPasos": 2, "itinerary": "", "description": "Una de las grandes cofradías de vísperas, con un cortejo muy numeroso y gran arraigo popular en Torreblanca.", "tunicDescription": "Túnica morada y antifaz azul." },
    { "id": 204, "name": "Hermandad de la Milagrosa", "popularName": "La Milagrosa", "day": "Sábado de Pasión", "church": "Parroquia de la Milagrosa", "foundation": "1998", "image": "./img/hermandad-la-milagrosa.jpg", "shield": "./img/hdad/la-milagrosa.jpg", "nPasos": 2, "itinerary": "", "description": "Ciudad Jardín se vuelca con su hermandad. Destaca la guardia judía en el paso de misterio.", "tunicDescription": "Túnica blanca y antifaz verde." },
    { "id": 205, "name": "Hermandad de San José Obrero", "popularName": "San José Obrero", "day": "Sábado de Pasión", "church": "Parroquia de San José Obrero", "foundation": "1960", "image": "./img/hermandad-san-jose-obrero.jpg", "shield": "./img/hdad/san-jose-obrero.jpeg", "nPasos": 2, "itinerary": "", "description": "Hermandad de gloria y penitencia que procesiona por la zona de la calle Arroyo con gran elegancia.", "tunicDescription": "Túnica azul y capa blanca." },
    { "id": 206, "name": "Asociación de Fieles del Cristo de los Desamparados", "popularName": "Santo Ángel", "day": "Sábado de Pasión", "church": "Iglesia del Santo Ángel", "foundation": "2016", "image": "./img/hermandad-santo-angel.jpg", "shield": "./img/hdad/santo-angel.jpg", "nPasos": 1, "itinerary": "", "description": "Desde el convento del Santo Ángel, el magnífico crucificado de Martínez Montañés recorre el centro.", "tunicDescription": "Cortejo sin túnicas de nazareno." },
    { "id": 207, "name": "Agrupación Parroquial de San Jerónimo", "popularName": "San Jerónimo", "day": "Sábado de Pasión", "church": "Parroquia de San Jerónimo", "foundation": "2015", "image": "./img/hermandad-san-jeronimo.jpg", "shield": "./img/hdad/san-jeronimo.jpg", "nPasos": 1, "itinerary": "", "description": "La fe del barrio de San Jerónimo al norte de la ciudad, con el misterio del Descendimiento.", "tunicDescription": "Túnica blanca." },
    { "id": 208, "name": "Agrupación Parroquial de las Maravillas", "popularName": "Las Maravillas", "day": "Sábado de Pasión", "church": "Parroquia de María de las Maravillas", "foundation": "2010", "image": "./img/hermandad-maravillas.jpg", "shield": "./img/hdad/las-maravillas.jpg", "nPasos": 1, "itinerary": "", "description": "Joven agrupación de la zona de los Arcos que procesiona con el Señor de los Afligidos.", "tunicDescription": "Sin hábito nazareno." },
    { "id": 209, "name": "Agrupación Parroquial La Espiga", "popularName": "La Espiga", "day": "Sábado de Pasión", "church": "Parroquia del Buen Pastor y San Juan de la Cruz", "foundation": "2015", "image": "./img/hermandad-la-espiga.jpg", "shield": "./img/hdad/la-espiga.png", "nPasos": 1, "itinerary": "", "description": "Desde Sevilla Este, una de las nuevas semillas de la Semana Santa en los barrios nuevos.", "tunicDescription": "Sin hábito nazareno." },

    { "id": 301, "name": "Hermandad del Amor", "popularName": "El Amor", "day": "Domingo de Ramos", "church": "Iglesia del Salvador", "foundation": "1508", "image": "/img/hermandad-el-amor.jpg", "shield": "./img/hdad/el-amor.jpg", "nPasos": 2, "itinerary": "", "description": "Solemne cofradía que cierra el Domingo de Ramos con el imponente crucificado de Juan de Mesa.", "tunicDescription": "Túnica de ruán negro." },
    { "id": 300, "name": "Hermandad de la Borriquita", "popularName": "La Borriquita", "day": "Domingo de Ramos", "church": "Iglesia del Salvador", "foundation": "1508", "image": "/img/hermandad-borriquita.jpg", "shield": "./img/hdad/el-amor.jpg", "nPasos": 1, "itinerary": "", "description": "La primera en pisar la Carrera Oficial. Alegría de los niños y palmas.", "tunicDescription": "Túnica blanca." },
    { "id": 302, "name": "Hermandad de Jesús Despojado", "popularName": "Jesús Despojado", "day": "Domingo de Ramos", "church": "Capilla del Mayor Dolor", "foundation": "1936", "image": "/img/hermandad-jesus-despojado.jpg", "shield": "./img/hdad/jesus-despojado.jpeg", "nPasos": 2, "itinerary": "", "description": "Una de las primeras en pasar por Campana. Hermandad recogida y de bellos detalles desde Molviedro.", "tunicDescription": "Túnica crema y antifaz negro." },
    { "id": 303, "name": "Hermandad de la Paz", "popularName": "La Paz", "day": "Domingo de Ramos", "church": "Parroquia de San Sebastián", "foundation": "1939", "image": "/img/hermandad-la-paz.jpg", "shield": "./img/hdad/la-paz.jpeg", "nPasos": 2, "itinerary": "", "description": "Blanca paloma del Porvenir. Abre la Semana Santa con un cortejo inmenso bajo el sol de la tarde.", "tunicDescription": "Túnica blanca." },
    { "id": 304, "name": "Hermandad de la Sagrada Cena", "popularName": "La Cena", "day": "Domingo de Ramos", "church": "Iglesia de los Terceros", "foundation": "1580", "image": "/img/hermandad-la-cena.jpg", "shield": "./img/hdad/la-cena.png", "nPasos": 3, "itinerary": "", "description": "Majestuoso misterio de la Eucaristía y la Virgen del Subterráneo, Reina de Cielos y Tierra.", "tunicDescription": "Túnica blanca y antifaz blanco." },
    { "id": 305, "name": "Hermandad de la Hiniesta", "popularName": "La Hiniesta", "day": "Domingo de Ramos", "church": "Parroquia de San Julián", "foundation": "1412", "image": "/img/hermandad-la-hiniesta.jpg", "shield": "./img/hdad/la-hiniesta.jpeg", "nPasos": 2, "itinerary": "", "description": "Vinculada al Ayuntamiento. El Cristo de la Buena Muerte y la Hiniesta Gótica bajo palio azul.", "tunicDescription": "Túnica blanca y antifaz azul." },
    { "id": 306, "name": "Hermandad de San Roque", "popularName": "San Roque", "day": "Domingo de Ramos", "church": "Parroquia de San Roque", "foundation": "1901", "image": "/img/hermandad-san-roque.jpg", "shield": "./img/hdad/san-roque.jpg", "nPasos": 2, "itinerary": "", "description": "Elegancia y clasicismo desde la Ronda. El Señor de las Penas y la Virgen de Gracia y Esperanza.", "tunicDescription": "Túnica blanca y antifaz morado/verde." },
    { "id": 307, "name": "Hermandad de la Estrella", "popularName": "La Estrella", "day": "Domingo de Ramos", "church": "Capilla de la Estrella", "foundation": "1560", "image": "/img/hermandad-la-estrella.jpg", "shield": "./img/hdad/la-estrella.jpg", "nPasos": 2, "itinerary": "", "description": "La Valiente de Triana. Fervor popular masivo con el Señor de las Penas y la Virgen de la Estrella.", "tunicDescription": "Túnica blanca y antifaz azul/morado." },
    { "id": 308, "name": "Hermandad de la Amargura", "popularName": "La Amargura", "day": "Domingo de Ramos", "church": "San Juan de la Palma", "foundation": "1696", "image": "/img/hermandad-la-amargura.jpg", "shield": "./img/hdad/la-amargura.jpeg", "nPasos": 2, "itinerary": "", "description": "El 'Silencio Blanco'. La perfección hecha cofradía, con el Desprecio de Herodes y la Dolorosa.", "tunicDescription": "Túnica blanca." },

    { "id": 401, "name": "Hermandad de la Redención", "popularName": "La Redención", "day": "Lunes Santo", "church": "Iglesia de Santiago", "foundation": "1955", "image": "./img/hermandad-la-redencion.jpg", "shield": "./img/hdad/redencion.jpeg", "nPasos": 2, "itinerary": "", "description": "El Beso de Judas. Gran misterio que atrae a multitudes y la Virgen del Rocío.", "tunicDescription": "Túnica blanca y antifaz morado." },
    { "id": 402, "name": "Hermandad de San Pablo", "popularName": "San Pablo", "day": "Lunes Santo", "church": "Parroquia de San Ignacio", "foundation": "2005", "image": "./img/hermandad-san-pablo.jpg", "shield": "./img/hdad/san-pablo.png", "nPasos": 2, "itinerary": "", "description": "El Cautivo del Polígono. Recorrido kilométrico y devoción de barrio moderno.", "tunicDescription": "Túnica blanca." },
    { "id": 403, "name": "Hermandad de Santa Genoveva", "popularName": "Santa Genoveva", "day": "Lunes Santo", "church": "Parroquia de Santa Genoveva", "foundation": "1956", "image": "./img/hermandad-santa-genoveva.jpg", "shield": "./img/hdad/santa-genoveva.jpg", "nPasos": 2, "itinerary": "", "description": "El Cautivo del Tiro de Línea. Devoción masiva en uno de los barrios con más solera.", "tunicDescription": "Túnica blanca con antifaz mercedario." },
    { "id": 404, "name": "Hermandad de Santa Marta", "popularName": "Santa Marta", "day": "Lunes Santo", "church": "Parroquia de San Andrés", "foundation": "1946", "image": "./img/hermandad-santa-marta.jpg", "shield": "./img/hdad/santa-marta.jpeg", "nPasos": 1, "itinerary": "", "description": "La cofradía más rápida y una de las más bellas. Misterio del Traslado al Sepulcro.", "tunicDescription": "Túnica negra." },
    { "id": 405, "name": "Hermandad de San Gonzalo", "popularName": "San Gonzalo", "day": "Lunes Santo", "church": "Parroquia de San Gonzalo", "foundation": "1942", "image": "./img/hermandad-san-gonzalo.jpg", "shield": "./img/hdad/san-gonzalo.jpeg", "nPasos": 2, "itinerary": "", "description": "Poderío trianero con su característico andar izquierdo ante el Soberano Poder.", "tunicDescription": "Túnica blanca." },
    { "id": 406, "name": "Hermandad de la Vera Cruz", "popularName": "Vera Cruz", "day": "Lunes Santo", "church": "Capilla del Dulce Nombre de Jesús", "foundation": "1448", "image": "./img/hermandad-vera-cruz.jpg", "shield": "./img/hdad/vera-cruz.jpeg", "nPasos": 2, "itinerary": "", "description": "La decana de las cofradías. Austeridad extrema y reliquia del Lignum Crucis.", "tunicDescription": "Túnica de ruán negro." },
    { "id": 407, "name": "Hermandad de las Penas de San Vicente", "popularName": "Las Penas", "day": "Lunes Santo", "church": "Parroquia de San Vicente", "foundation": "1875", "image": "./img/hermandad-las-penas.jpg", "shield": "./img/hdad/las-penas.jpeg", "nPasos": 2, "itinerary": "", "description": "Clasicismo y seriedad. Jesús de las Penas y la Virgen de los Dolores.", "tunicDescription": "Túnica negra." },
    { "id": 408, "name": "Hermandad de las Aguas", "popularName": "Las Aguas", "day": "Lunes Santo", "church": "Capilla del Rosario", "foundation": "1750", "image": "./img/hermandad-las-aguas.jpg", "shield": "./img/hdad/las-aguas.png", "nPasos": 2, "itinerary": "", "description": "Desde el Arenal, con su misterio con la Magdalena y la Virgen de Guadalupe.", "tunicDescription": "Túnica blanca y antifaz morado." },
    { "id": 409, "name": "Hermandad del Museo", "popularName": "El Museo", "day": "Lunes Santo", "church": "Capilla del Museo", "foundation": "1575", "image": "./img/hermandad-el-museo.jpg", "shield": "./img/hdad/el-museo.png", "nPasos": 2, "itinerary": "", "description": "Arte en la calle. El Cristo de la Expiración es una obra cumbre de la imaginería.", "tunicDescription": "Túnica negra." },

    { "id": 501, "name": "Hermandad del Cerro", "popularName": "El Cerro del Águila", "day": "Martes Santo", "church": "Parroquia de los Dolores", "foundation": "1945", "image": "./img/hermandad-el-cerro.jpg", "shield": "./img/hdad/el-cerro.jpeg", "nPasos": 3, "itinerary": "", "description": "El barrio hecho cofradía. Tres pasos y un recorrido inmenso arropado por sus vecinos.", "tunicDescription": "Túnica blanca y antifaz burdeos." },
    { "id": 502, "name": "Hermandad de San Benito", "popularName": "San Benito", "day": "Martes Santo", "church": "Parroquia de San Benito", "foundation": "1921", "image": "./img/hermandad-san-benito.jpg", "shield": "./img/hdad/san-benito.jpg", "nPasos": 3, "itinerary": "", "description": "La cofradía de la Calzá. Espectacular misterio de la Presentación y la Virgen de la Encarnación.", "tunicDescription": "Túnica blanca y antifaz morado." },
    { "id": 503, "name": "Hermandad de la Candelaria", "popularName": "La Candelaria", "day": "Martes Santo", "church": "Parroquia de San Nicolás", "foundation": "1921", "image": "./img/hermandad-la-candelaria.jpg", "shield": "./img/hdad/la-candelaria.jpeg", "nPasos": 2, "itinerary": "", "description": "Elegancia por los Jardines de Murillo. Jesús de la Salud y Virgen de la Candelaria.", "tunicDescription": "Túnica blanca." },
    { "id": 504, "name": "Hermandad de los Javieres", "popularName": "Los Javieres", "day": "Martes Santo", "church": "Parroquia de Omnium Sanctorum", "foundation": "1946", "image": "./img/hermandad-los-javieres.jpg", "shield": "./img/hdad/los-javieres.jpeg", "nPasos": 2, "itinerary": "", "description": "Silencio y recogimiento en pleno Martes Santo con el Cristo de las Almas.", "tunicDescription": "Túnica negra." },
    { "id": 505, "name": "Hermandad de San Esteban", "popularName": "San Esteban", "day": "Martes Santo", "church": "Iglesia de San Esteban", "foundation": "1926", "image": "./img/hermandad-san-esteban.jpg", "shield": "./img/hdad/san-esteban.png", "nPasos": 2, "itinerary": "", "description": "Dificultosa salida debido a la ojiva de su puerta. El Señor de la Ventana y Madre de los Desamparados.", "tunicDescription": "Túnica crema y antifaz azul." },
    { "id": 506, "name": "Hermandad de los Estudiantes", "popularName": "Los Estudiantes", "day": "Martes Santo", "church": "Capilla de la Universidad", "foundation": "1924", "image": "./img/hermandad-los-estudiantes.jpg", "shield": "./img/hdad/los-estudiantes.jpeg", "nPasos": 2, "itinerary": "", "description": "Vinculada a la Universidad. El Cristo de la Buena Muerte es obra cumbre de Juan de Mesa.", "tunicDescription": "Túnica de ruán negro." },
    { "id": 507, "name": "Hermandad de Santa Cruz", "popularName": "Santa Cruz", "day": "Martes Santo", "church": "Parroquia de Santa Cruz", "foundation": "1904", "image": "./img/hermandad-santa-cruz.jpg", "shield": "./img/hdad/santa-cruz.jpeg", "nPasos": 2, "itinerary": "", "description": "Sabor antiguo desde el barrio de Santa Cruz. Cristo de las Misericordias y Virgen de los Dolores.", "tunicDescription": "Túnica negra." },
    { "id": 508, "name": "Hermandad del Dulce Nombre", "popularName": "Dulce Nombre (La Bofetá)", "day": "Martes Santo", "church": "Parroquia de San Lorenzo", "foundation": "1584", "image": "./img/hermandad-dulce-nombre.jpg", "shield": "./img/hdad/dulce-nombre.jpg", "nPasos": 2, "itinerary": "", "description": "El misterio de la Bofetá. Gracia y elegancia sevillana en su máximo esplendor.", "tunicDescription": "Túnica blanca." },

    { "id": 601, "name": "Hermandad del Carmen Doloroso", "popularName": "Carmen Doloroso", "day": "Miércoles Santo", "church": "Parroquia de Omnium Sanctorum", "foundation": "1982", "image": "./img/hermandad-carmen-doloroso.jpg", "shield": "./img/hdad/carmen-doloroso.jpeg", "nPasos": 2, "itinerary": "", "description": "La última en incorporarse al día. Misterio de las Negaciones de San Pedro.", "tunicDescription": "Túnica marrón carmelita." },
    { "id": 602, "name": "Hermandad de la Sed", "popularName": "La Sed", "day": "Miércoles Santo", "church": "Parroquia de la Concepción", "foundation": "1969", "image": "./img/hermandad-la-sed.jpg", "shield": "./img/hdad/la-sed.png", "nPasos": 2, "itinerary": "", "description": "Desde Nervión, el Cristo de la Sed y Santa María de Consolación recorren un largo camino.", "tunicDescription": "Túnica negra." },
    { "id": 603, "name": "Hermandad del Buen Fin", "popularName": "El Buen Fin", "day": "Miércoles Santo", "church": "Convento de San Antonio", "foundation": "1590", "image": "./img/hermandad-el-buen-fin.jpg", "shield": "./img/hdad/buen-fin.jpeg", "nPasos": 2, "itinerary": "", "description": "Franciscanismo puro. Recuperado el misterio recientemente para el Cristo del Buen Fin.", "tunicDescription": "Túnica marrón." },
    { "id": 604, "name": "Hermandad de San Bernardo", "popularName": "San Bernardo", "day": "Miércoles Santo", "church": "Parroquia de San Bernardo", "foundation": "1748", "image": "./img/hermandad-san-bernardo.jpg", "shield": "./img/hdad/san-bernardo.png", "nPasos": 2, "itinerary": "", "description": "La Hermandad de los Toreros. Devoción inmensa en el barrio con el Cristo de la Salud.", "tunicDescription": "Túnica morada." },
    { "id": 605, "name": "Hermandad de la Lanzada", "popularName": "La Lanzada", "day": "Miércoles Santo", "church": "Iglesia de San Martín", "foundation": "1595", "image": "./img/hermandad-la-lanzada.jpg", "shield": "./img/hdad/la-lanzada.jpg", "nPasos": 2, "itinerary": "", "description": "Imponente paso de misterio con Longinos a caballo y la Virgen del Buen Fin.", "tunicDescription": "Túnica crema y capa roja." },
    { "id": 606, "name": "Hermandad del Baratillo", "popularName": "El Baratillo", "day": "Miércoles Santo", "church": "Capilla de la Piedad", "foundation": "1693", "image": "./img/hermandad-el-baratillo.jpg", "shield": "./img/hdad/baratillo.jpg", "nPasos": 2, "itinerary": "", "description": "Sabor torero desde el Arenal. La Piedad y la Virgen de la Caridad en su Soledad.", "tunicDescription": "Túnica azul." },
    { "id": 607, "name": "Hermandad de los Panaderos", "popularName": "Los Panaderos", "day": "Miércoles Santo", "church": "Capilla de San Andrés", "foundation": "1601", "image": "./img/hermandad-los-panaderos.jpg", "shield": "./img/hdad/los-panaderos.png", "nPasos": 2, "itinerary": "", "description": "Popular hermandad de la calle Orfila. Misterio del Prendimiento con gran dinamismo.", "tunicDescription": "Túnica negra y morada." },
    { "id": 608, "name": "Hermandad de las Siete Palabras", "popularName": "Las Siete Palabras", "day": "Miércoles Santo", "church": "Parroquia de San Vicente", "foundation": "1561", "image": "./img/hermandad-siete-palabras.jpg", "shield": "./img/hdad/siete-palabras.png", "nPasos": 3, "itinerary": "", "description": "Tres pasos que resumen el clasicismo. Destaca el misterio del Calvario.", "tunicDescription": "Túnica blanca y escapulario carmesí." },
    { "id": 609, "name": "Hermandad del Cristo de Burgos", "popularName": "Cristo de Burgos", "day": "Miércoles Santo", "church": "Parroquia de San Pedro", "foundation": "1888", "image": "./img/hermandad-cristo-burgos.jpg", "shield": "./img/hdad/cristo-de-burgos.jpeg", "nPasos": 2, "itinerary": "", "description": "Sobriedad y elegancia absoluta. El crucificado es una talla antiquísima y venerable.", "tunicDescription": "Túnica negra de cola." },

    { "id": 701, "name": "Hermandad de los Negritos", "popularName": "Los Negritos", "day": "Jueves Santo", "church": "Capilla de los Ángeles", "foundation": "1393", "image": "./img/hermandad-los-negritos.jpg", "shield": "./img/hdad/los-negritos.jpeg", "nPasos": 2, "itinerary": "", "description": "Una de las más antiguas. El Cristo de la Fundación y la Virgen de los Ángeles.", "tunicDescription": "Túnica blanca y escapulario azul." },
    { "id": 702, "name": "Hermandad de la Exaltación", "popularName": "La Exaltación", "day": "Jueves Santo", "church": "Iglesia de Santa Catalina", "foundation": "1600", "image": "./img/hermandad-la-exaltacion.jpg", "shield": "./img/hdad/la-exaltacion.jpeg", "nPasos": 2, "itinerary": "", "description": "Los Caballos de Santa Catalina. Misterio de grandes dimensiones y calidad artística.", "tunicDescription": "Túnica blanca y antifaz morado." },
    { "id": 703, "name": "Hermandad de las Cigarreras", "popularName": "Las Cigarreras", "day": "Jueves Santo", "church": "Capilla de la Fábrica de Tabacos", "foundation": "1563", "image": "./img/hermandad-las-cigarreras.jpg", "shield": "./img/hdad/las-cigarreras.jpg", "nPasos": 2, "itinerary": "", "description": "Misterio de la Columna y Azotes. Elegancia y una de las mejores bandas de cornetas.", "tunicDescription": "Túnica morada." },
    { "id": 704, "name": "Hermandad de Montesión", "popularName": "Montesión", "day": "Jueves Santo", "church": "Capilla de Montesión", "foundation": "1560", "image": "./img/hermandad-montesion.jpg", "shield": "./img/hdad/montesion.jpeg", "nPasos": 2, "itinerary": "", "description": "Sevillanía pura en la calle Feria. La Oración en el Huerto y la Virgen del Rosario.", "tunicDescription": "Túnica blanca." },
    { "id": 705, "name": "Hermandad de la Quinta Angustia", "popularName": "La Quinta Angustia", "day": "Jueves Santo", "church": "Parroquia de la Magdalena", "foundation": "1500", "image": "./img/hermandad-quinta-angustia.jpg", "shield": "./img/hdad/quinta-angustia.jpg", "nPasos": 1, "itinerary": "", "description": "El Descendimiento de Cristo. Un misterio barroco impresionante que invita al recogimiento.", "tunicDescription": "Túnica morada con capa." },
    { "id": 706, "name": "Hermandad del Valle", "popularName": "El Valle", "day": "Jueves Santo", "church": "Iglesia de la Anunciación", "foundation": "1450", "image": "./img/hermandad-el-valle.jpg", "shield": "./img/hdad/valle.jpg", "nPasos": 3, "itinerary": "", "description": "Patrimonio artístico de primer nivel. Tres pasos con la Coronación, el Nazareno y la Virgen del Valle.", "tunicDescription": "Túnica morada." },
    { "id": 707, "name": "Archicofradía de Pasión", "popularName": "Pasión", "day": "Jueves Santo", "church": "Iglesia del Salvador", "foundation": "1531", "image": "./img/hermandad-pasion.jpg", "shield": "./img/hdad/pasion.jpeg", "nPasos": 2, "itinerary": "", "description": "El Señor de Pasión de Martínez Montañés, una de las obras maestras del barroco.", "tunicDescription": "Túnica de ruán negro." },

    { "id": 801, "name": "Hermandad del Silencio", "popularName": "El Silencio", "day": "Madrugá", "church": "Iglesia de San Antonio Abad", "foundation": "1340", "image": "./img/hermandad-el-silencio.jpg", "shield": "./img/hdad/el-silencio.png", "nPasos": 2, "itinerary": "", "description": "Madre y Maestra. Abre la Madrugá con rigor y silencio absoluto. Cruz de Guía de Sevilla.", "tunicDescription": "Túnica negra de ruán." },
    { "id": 802, "name": "Hermandad del Gran Poder", "popularName": "El Gran Poder", "day": "Madrugá", "church": "Basílica del Gran Poder", "foundation": "1431", "image": "./img/hermandad-gran-poder.jpg", "shield": "./img/hdad/gran-poder.jpeg", "nPasos": 2, "itinerary": "", "description": "El Señor de Sevilla. Devoción universal que camina sola en la noche.", "tunicDescription": "Túnica negra de ruán." },
    { "id": 803, "name": "Hermandad de la Macarena", "popularName": "La Macarena", "day": "Madrugá", "church": "Basílica de la Macarena", "foundation": "1595", "image": "./img/hermandad-la-macarena.jpg", "shield": "./img/hdad/macarena.jpg", "nPasos": 2, "itinerary": "", "description": "La Esperanza de Sevilla. Cortejo multitudinario y fervor popular desbordado.", "tunicDescription": "Túnica blanca con capa, antifaz morado/verde." },
    { "id": 804, "name": "Hermandad del Calvario", "popularName": "El Calvario", "day": "Madrugá", "church": "Parroquia de la Magdalena", "foundation": "1586", "image": "./img/hermandad-el-calvario.jpg", "shield": "./img/hdad/calvario.jpeg", "nPasos": 2, "itinerary": "", "description": "Silencio y austeridad tras la Esperanza de Triana. Impresionante crucificado y Virgen de la Presentación.", "tunicDescription": "Túnica negra de ruán." },
    { "id": 805, "name": "Hermandad de la Esperanza de Triana", "popularName": "Esperanza de Triana", "day": "Madrugá", "church": "Capilla de los Marineros", "foundation": "1418", "image": "./img/hermandad-esperanza-triana.jpg", "shield": "./img/hdad/triana.jpeg", "nPasos": 2, "itinerary": "", "description": "El barrio de Triana cruzando el puente. Caída y Esperanza con un estilo inconfundible.", "tunicDescription": "Túnica morada/verde de terciopelo." },
    { "id": 806, "name": "Hermandad de los Gitanos", "popularName": "Los Gitanos", "day": "Madrugá", "church": "Santuario de los Gitanos", "foundation": "1753", "image": "./img/hermandad-los-gitanos.jpg", "shield": "./img/hdad/los-gitanos.jpg", "nPasos": 2, "itinerary": "", "description": "El Señor de la Salud y la Virgen de las Angustias. La Madrugá se cierra con arte y gitanería.", "tunicDescription": "Túnica blanca con capa." },

    { "id": 901, "name": "Hermandad de la Carretería", "popularName": "La Carretería", "day": "Viernes Santo", "church": "Capilla de la Carretería", "foundation": "1550", "image": "./img/hermandad-la-carreteria.jpg", "shield": "./img/hdad/la-carreteria.jpeg", "nPasos": 2, "itinerary": "", "description": "Romanticismo cofrade. Misterio de las Tres Necesidades con un sabor decimonónico único.", "tunicDescription": "Túnica de terciopelo azul." },
    { "id": 902, "name": "Hermandad de la Soledad", "popularName": "La Soledad de San Buenaventura", "day": "Viernes Santo", "church": "Convento de San Buenaventura", "foundation": "1847", "image": "./img/hermandad-soledad-buenaventura.jpg", "shield": "./img/hdad/soledad-sanbuenaventura.png", "nPasos": 1, "itinerary": "", "description": "La Virgen de la Soledad al pie de la cruz. Elegancia y sobriedad franciscana.", "tunicDescription": "Túnica blanca y antifaz negro." },
    { "id": 903, "name": "Hermandad del Cachorro", "popularName": "El Cachorro", "day": "Viernes Santo", "church": "Basílica del Cristo de la Expiración", "foundation": "1689", "image": "./img/hermandad-el-cachorro.jpg", "shield": "./img/hdad/el-cachorro.jpg", "nPasos": 2, "itinerary": "", "description": "El Cristo de la Expiración, la cumbre del barroco. Triana se despide con su gran devoción.", "tunicDescription": "Túnica negra y capa blanca." },
    { "id": 904, "name": "Hermandad de la O", "popularName": "La O", "day": "Viernes Santo", "church": "Parroquia de la O", "foundation": "1566", "image": "./img/hermandad-la-o.jpg", "shield": "./img/hdad/la-o.jpeg", "nPasos": 2, "itinerary": "", "description": "La otra gran devoción de Triana. Jesús Nazareno y la Virgen de la O bajo palio.", "tunicDescription": "Túnica de raso morado." },
    { "id": 905, "name": "Hermandad de San Isidoro", "popularName": "San Isidoro", "day": "Viernes Santo", "church": "Parroquia de San Isidoro", "foundation": "1605", "image": "./img/hermandad-san-isidoro.jpg", "shield": "./img/hdad/san-isidoro.png", "nPasos": 2, "itinerary": "", "description": "Cofradía de gran raigambre y señorío. Jesús de las Tres Caídas y Virgen de Loreto.", "tunicDescription": "Túnica de ruán negro." },
    { "id": 906, "name": "Hermandad de Montserrat", "popularName": "Montserrat", "day": "Viernes Santo", "church": "Capilla de Montserrat", "foundation": "1601", "image": "./img/hermandad-montserrat.jpg", "shield": "./img/hdad/montserrat.jpeg", "nPasos": 2, "itinerary": "", "description": "Conversión del Buen Ladrón. Cristo de gran fuerza expresiva y la Virgen de Montserrat.", "tunicDescription": "Túnica blanca/crema y antifaz azul." },
    { "id": 907, "name": "Hermandad de la Sagrada Mortaja", "popularName": "La Sagrada Mortaja", "day": "Viernes Santo", "church": "Convento de la Paz", "foundation": "1592", "image": "./img/hermandad-la-mortaja.jpg", "shield": "./img/hdad/mortaja.jpg", "nPasos": 1, "itinerary": "", "description": "Cierra el Viernes Santo con un misterio sobrecogedor y sus 18 ciriales. Ambiente místico.", "tunicDescription": "Túnica morada." },

    { "id": 1001, "name": "Hermandad del Sol", "popularName": "El Sol", "day": "Sábado Santo", "church": "Parroquia de San Diego de Alcalá", "foundation": "1932", "image": "./img/hermandad-el-sol.png", "shield": "./img/hdad/sol.png", "nPasos": 2, "itinerary": "", "description": "Singular cofradía del Plantinar con estética y iconografía muy personal. Santo Cristo Varón de Dolores.", "tunicDescription": "Túnica de ruan verde." },
    { "id": 1002, "name": "Hermandad de los Servitas", "popularName": "Los Servitas", "day": "Sábado Santo", "church": "Capilla de los Dolores", "foundation": "1696", "image": "./img/hermandad-servitas.png", "shield": "./img/hdad/los-servitas.jpg", "nPasos": 2, "itinerary": "", "description": "La Piedad Servita. Dolor y belleza en una de las cofradías más exquisitas de la ciudad.", "tunicDescription": "Túnica negra de cola." },
    { "id": 1003, "name": "Hermandad de la Trinidad", "popularName": "La Trinidad", "day": "Sábado Santo", "church": "Basílica de María Auxiliadora", "foundation": "1507", "image": "./img/hermandad-la-trinidad.jpg", "shield": "./img/hdad/la-trinidad.png", "nPasos": 3, "itinerary": "", "description": "Tres pasos: Sagrado Decreto, Cinco Llagas y Virgen de la Esperanza. Colorido y alegría salesiana.", "tunicDescription": "Túnica blanca y escapulario/capa." },
    { "id": 1004, "name": "Hermandad del Santo Entierro", "popularName": "Santo Entierro", "day": "Sábado Santo", "church": "Iglesia de San Gregorio", "foundation": "1570", "image": "./img/hermandad-santo-entierro.jpg", "shield": "./img/hdad/santo-entierro.jpeg", "nPasos": 3, "itinerary": "", "description": "Procesión oficial con representaciones de todas las hermandades. Triunfo de la Cruz, Yacente y Duelo.", "tunicDescription": "Túnica negra." },
    { "id": 1005, "name": "Hermandad de la Soledad", "popularName": "La Soledad de San Lorenzo", "day": "Sábado Santo", "church": "Parroquia de San Lorenzo", "foundation": "1557", "image": "./img/hermandad-soledad-san-lorenzo.jpg", "shield": "./img/hdad/soledad-san-lorenzo.png", "nPasos": 1, "itinerary": "", "description": "Cierra la Pasión. La Virgen sola al pie de la cruz, sin palio, con una majestuosidad única.", "tunicDescription": "Túnica blanca y antifaz negro." },

    { "id": 1101, "name": "Hermandad de la Resurrección", "popularName": "La Resurrección", "day": "Domingo de Resurrección", "church": "Iglesia de Santa Marina", "foundation": "1969", "image": "./img/hermandad-resurreccion.jpg", "shield": "./img/hdad/la-resurreccion.jpg", "nPasos": 2, "itinerary": "", "description": "Cristo Resucitado y la Virgen de la Aurora. El broche de oro y la alegría de la Pascua.", "tunicDescription": "Túnica blanca." }
  ],
  "bandas": [
    { 
        "id": 1, 
        "name": "Banda Centuria Romana Macarena", 
        "type": "Cornetas y Tambores", 
        "location": "Sevilla", 
        "description": "Los legendarios 'Armaos' de la Macarena. Historia viva de la Semana Santa tras el Señor de la Sentencia.", 
        "image": "./img/banda-centuria-macarena.jpg",
        "shield": "./img/escudo-banda-centuria.png",
        "contracts": ["Madrugá: Hermandad de la Macarena", "Domingo de Ramos: Roque"]
    },
    { "id": 2, "name": "Banda CCyTT Cristo de la Sangre", "type": "Cornetas y Tambores", "location": "Sevilla", "description": "Formación musical perteneciente a la Hermandad de San Benito.", "image": "./img/banda-cristo-sangre.jpg", "shield": "", "contracts": [] },
    { "id": 3, "name": "Banda CCyTT Ntra. Sra. de la Victoria (Las Cigarreras)", "type": "Cornetas y Tambores", "location": "Sevilla", "description": "Referente absoluto de la música procesional.", "image": "./img/banda-cigarreras.jpg", "shield": "", "contracts": [] },
    { "id": 4, "name": "Banda CCyTT Ntra. Sra. del Sol", "type": "Cornetas y Tambores", "location": "Sevilla", "description": "Caracterizada por su uniforme y sus plumas de pavo real.", "image": "./img/banda-sol.jpg", "shield": "", "contracts": [] },
    { "id": 5, "name": "Banda CCyTT Nuestro Padre Jesús Nazareno", "type": "Cornetas y Tambores", "location": "Huelva", "description": "Una de las grandes formaciones onubenses.", "image": "./img/banda-nazareno-huelva.jpg", "shield": "", "contracts": [] },
    { "id": 6, "name": "Banda CCyTT Sagrado Corazón de Jesús", "type": "Cornetas y Tambores", "location": "Marchena", "description": "Banda de gran trayectoria en la provincia.", "image": "./img/banda-sagrado-corazon.jpg", "shield": "", "contracts": [] },
    { "id": 7, "name": "Banda CCyTT Esencia", "type": "Cornetas y Tambores", "location": "Sevilla", "description": "Recupera y mantiene el estilo más puro y clásico.", "image": "./img/banda-esencia.jpg", "shield": "", "contracts": [] },
    { "id": 8, "name": "Agrupación Musical María Santísima de las Angustias Coronada", "type": "Agrupación Musical", "location": "Sevilla", "description": "Sección juvenil de la Hermandad de los Gitanos.", "image": "./img/banda-angustias.jpg", "shield": "", "contracts": [] },
    { "id": 9, "name": "Agrupación Musical Nuestra Señora de la Encarnación", "type": "Agrupación Musical", "location": "Sevilla", "description": "La banda de San Benito. Potencia y calidad.", "image": "./img/banda-encarnacion.jpg", "shield": "", "contracts": [] },
    { "id": 10, "name": "Agrupación Musical Nuestro Padre Jesús de la Pasión", "type": "Agrupación Musical", "location": "Linares", "description": "Desde Linares, una de las agrupaciones más reconocidas.", "image": "./img/banda-pasion-linares.jpg", "shield": "", "contracts": [] },
    { "id": 11, "name": "Agrupación Musical Nuestro Padre Jesús de la Salud", "type": "Agrupación Musical", "location": "Sevilla (Los Gitanos)", "description": "El sonido de la Madrugá gitana.", "image": "./img/banda-salud-gitanos.jpg", "shield": "", "contracts": [] },
    { "id": 12, "name": "Agrupación Musical Pasión y Resurrección", "type": "Agrupación Musical", "location": "Sevilla", "description": "Banda joven que trabaja con ilusión.", "image": "./img/banda-pasion-resurreccion.jpg", "shield": "", "contracts": [] },
    { "id": 13, "name": "Agrupación Musical Virgen de los Reyes", "type": "Agrupación Musical", "location": "Sevilla", "description": "Referente histórico de las agrupaciones.", "image": "./img/banda-virgen-reyes.jpg", "shield": "", "contracts": [] },
    { "id": 14, "name": "Agrupación Musical Redención", "type": "Agrupación Musical", "location": "Sevilla", "description": "Musicalidad exquisita tras el misterio del Beso de Judas.", "image": "./img/banda-redencion.jpg", "shield": "", "contracts": [] },
    { "id": 15, "name": "Banda de la Cruz Roja", "type": "Banda de Música", "location": "Sevilla", "description": "Una institución en la música de palio.", "image": "./img/banda-cruz-roja.jpg", "shield": "", "contracts": [] },
    { "id": 16, "name": "Banda de Música Maestro Tejera", "type": "Banda de Música", "location": "Sevilla", "description": "Considerada por muchos la mejor banda de palio.", "image": "./img/banda-tejera.jpg", "shield": "", "contracts": [] },
    { "id": 17, "name": "Banda de Música María Santísima de la Victoria", "type": "Banda de Música", "location": "Sevilla (Las Cigarreras)", "description": "Elegancia y dulzura tras los pasos de palio.", "image": "./img/banda-cigarreras-palio.jpg", "shield": "", "contracts": [] },
    { "id": 18, "name": "Banda Municipal de La Puebla del Río", "type": "Banda de Música", "location": "La Puebla del Río", "description": "Banda con gran solera y un sonido muy característico.", "image": "./img/banda-puebla-rio.jpg", "shield": "", "contracts": [] },
    { "id": 19, "name": "Banda Municipal de Mairena del Alcor", "type": "Banda de Música", "location": "Mairena del Alcor", "description": "Formación histórica que aporta solemnidad.", "image": "./img/banda-mairena.jpg", "shield": "", "contracts": [] },
    { "id": 20, "name": "Banda de Música Santa Ana", "type": "Banda de Música", "location": "Dos Hermanas", "description": "Banda de gran prestigio conocida por acompañar a la Esperanza de Triana.", "image": "./img/banda-santa-ana.jpg", "shield": "", "contracts": [] },
    { "id": 21, "name": "Banda de Música Nuestra Señora del Carmen", "type": "Banda de Música", "location": "Villalba del Alcor", "description": "Desde Huelva, calidad y repertorio.", "image": "./img/banda-carmen-villalba.jpg", "shield": "", "contracts": [] },
    { "id": 22, "name": "Banda de Música Coria del Río", "type": "Banda de Música", "location": "Coria del Río", "description": "Banda con tradición y esfuerzo.", "image": "./img/banda-coria.jpg", "shield": "", "contracts": [] },
    { "id": 23, "name": "Banda de Música Las Nieves", "type": "Banda de Música", "location": "Olivares", "description": "Calidad contrastada desde el Aljarafe.", "image": "./img/banda-nieves.jpg", "shield": "", "contracts": [] },
    { "id": 24, "name": "Banda de Música Carmen", "type": "Banda de Música", "location": "Salteras", "description": "Sello de calidad inconfundible.", "image": "./img/banda-carmen-salteras.jpg", "shield": "", "contracts": [] },
    { "id": 25, "name": "Sociedad Filarmónica Nuestra Señora de la Oliva", "type": "Banda de Música", "location": "Salteras", "description": "Centenaria institución musical.", "image": "./img/banda-oliva-salteras.jpg", "shield": "", "contracts": [] },
    { "id": 26, "name": "Banda Sinfónica Julián Cerdán", "type": "Banda de Música", "location": "Sanlúcar de Barrameda", "description": "Banda histórica con un archivo musical envidiable.", "image": "./img/banda-julian-cerdan.jpg", "shield": "", "contracts": [] },
    { "id": 27, "name": "Capilla Musical Ars Sacra", "type": "Capilla Musical", "location": "Sevilla", "description": "Música de capilla para el recogimiento.", "image": "./img/capilla-ars-sacra.jpg", "shield": "", "contracts": [] },
    { "id": 28, "name": "Capilla Musical Calvarium", "type": "Capilla Musical", "location": "Sevilla", "description": "Trío de capilla especializado en música sacra.", "image": "./img/capilla-calvarium.jpg", "shield": "", "contracts": [] },
    { "id": 29, "name": "Capilla Musical María Auxiliadora", "type": "Capilla Musical", "location": "Sevilla", "description": "Vinculada a la Escolanía Salesiana.", "image": "./img/capilla-maria-auxiliadora.jpg", "shield": "", "contracts": [] },
    { "id": 30, "name": "Capilla Musical San Telmo", "type": "Capilla Musical", "location": "Sevilla", "description": "Prestigiosa formación de música de cámara.", "image": "./img/capilla-san-telmo.jpg", "shield": "", "contracts": [] },
    { "id": 31, "name": "Banda CCyTT Santísimo Cristo de las Tres Caídas de Triana", "type": "Cornetas y Tambores", "location": "Sevilla (Triana)", "description": "Estilo inconfundible de Triana. Potencia y compás tras el misterio.", "image": "./img/banda-tres-caidas.jpg", "shield": "", "contracts": [] }
  ]
};

// --- 3. ESTADO GLOBAL DE LA APP ---
const state = {
    data: FALLBACK_DATA, 
    currentView: 'home',
    currentDate: new Date(),
    selectedDay: "Domingo de Ramos"
};

// --- 4. FUNCIONES DE NAVEGACIÓN ---
window.appNavigate = function(view, id = null) {
    state.currentView = view;
    updateActiveNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const content = document.getElementById('app-content');
    if (!content) return;
    
    let html = '';
    
    switch(view) {
        case 'home': html = renderHome(); break;
        case 'noticias': html = renderNewsGrid(state.data.articles); break;
        case 'article-detail': 
            const article = state.data.articles.find(a => a.id === id);
            html = article ? renderArticleDetail(article) : renderNewsGrid(state.data.articles);
            break;
        case 'agenda': html = renderAgendaPage(); break;
        case 'event-detail':
            const event = state.data.agenda.find(e => e.id === id);
            html = event ? renderEventDetail(event) : renderAgendaPage();
            break;
        case 'day-detail':
            // id aquí será la fecha ISO string
            html = renderDayDetail(id);
            break;
        case 'hermandades': html = renderHermandadesPage(); break;
        case 'hermandad-detail':
            const hermandad = state.data.hermandades.find(h => h.id === id);
            html = hermandad ? renderHermandadDetail(hermandad) : renderHermandadesPage();
            break;
        case 'bandas': html = renderBandasPage(state.data.bandas); break;
        case 'banda-detail':
            const banda = state.data.bandas.find(b => b.id === id);
            html = banda ? renderBandaDetail(banda) : renderBandasPage(state.data.bandas);
            break;
        case 'semana-santa': html = renderSemanaSantaPage(); break;
        default: html = renderHome();
    }
    content.innerHTML = html;
    
    if (view === 'hermandades') attachHermandadTabsListeners();
    const mobileMenu = document.getElementById('mobile-nav');
    if (mobileMenu) mobileMenu.classList.add('hidden');
};

// --- 5. LÓGICA DE ARRANQUE ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    renderNav();
    window.appNavigate('home');
    fetchDataBackground();
}

async function fetchDataBackground() {
    try {
        const response = await fetch('./data.json');
        if (response.ok) {
            const jsonData = await response.json();
            state.data = {
                articles: jsonData.articles || [],
                agenda: jsonData.agenda || [],
                hermandades: jsonData.hermandades || [],
                bandas: jsonData.bandas || []
            };
            if (state.currentView === 'home') {
                window.appNavigate('home');
            }
        }
    } catch (e) {
        console.log("Modo offline/local activo.");
    }
}

// --- 6. RENDERIZADO DEL MENÚ ---
const navItems = [
    { label: 'Inicio', value: 'home' },
    { label: 'Noticias', value: 'noticias' },
    { label: 'Agenda', value: 'agenda' },
    { label: 'Semana Santa', value: 'semana-santa' },
    { label: 'Hermandades', value: 'hermandades' },
    { label: 'Bandas', value: 'bandas' }
];

function renderNav() {
    const desktopList = document.getElementById('desktop-nav');
    const mobileList = document.getElementById('mobile-nav-list');
    
    const generateLinks = (isMobile) => navItems.map(item => `
        <li>
            <button 
                data-nav-value="${item.value}"
                onclick="window.appNavigate('${item.value}')"
                class="nav-btn ${isMobile 
                    ? 'block w-full py-2 hover:text-cofrade-purple'
                    : 'transition-all duration-300 border-b-2 pb-1 border-transparent text-stone-600 hover:text-cofrade-purple hover:border-cofrade-purple'
                }"
            >
                ${item.label}
            </button>
        </li>
    `).join('');

    if (desktopList) desktopList.innerHTML = generateLinks(false);
    if (mobileList) mobileList.innerHTML = generateLinks(true);
    updateActiveNav();
}

function updateActiveNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const val = btn.getAttribute('data-nav-value');
        if (val === state.currentView) {
            btn.classList.add('text-cofrade-purple', 'font-bold', 'border-cofrade-gold');
            btn.classList.remove('text-stone-600', 'border-transparent');
        } else {
            btn.classList.remove('text-cofrade-purple', 'font-bold', 'border-cofrade-gold');
            btn.classList.add('text-stone-600', 'border-transparent');
        }
    });
}

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-nav');
    if (menu) menu.classList.toggle('hidden');
}

// --- 7. VISTAS ---

function renderHome() {
    return `
        <section class="relative w-full h-[60vh] min-h-[400px] border-b-4 border-cofrade-purple">
            <div class="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url('${IMAGES.HERO_BG}');">
                <div class="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-cofrade-purple/40 to-transparent"></div>
            </div>
            <div class="relative h-full max-w-6xl mx-auto px-4 flex flex-col justify-center items-center text-center">
                <div class="border-y-2 border-cofrade-gold py-8 px-6 bg-black/30 backdrop-blur-sm max-w-3xl animate-fade-in">
                    <p class="text-cofrade-gold font-serif italic text-xl md:text-2xl mb-4">"Sevilla reza cantando..."</p>
                    <h2 class="text-white font-serif text-4xl md:text-6xl font-bold tracking-wide leading-tight drop-shadow-lg mb-6">
                        SEMANA SANTA <br/><span class="text-3xl md:text-5xl font-normal">DE SEVILLA</span>
                    </h2>
                    <p class="text-gray-200 font-body text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                        Crónicas, estrenos y toda la actualidad del mundo cofrade hispalense.
                    </p>
                    <div class="mt-8">
                        <button onclick="window.appNavigate('noticias')" class="inline-block px-8 py-3 border border-cofrade-gold text-cofrade-gold hover:bg-cofrade-gold hover:text-cofrade-purple transition-all duration-500 font-serif uppercase tracking-widest text-sm">
                            Leer Actualidad
                        </button>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- PUBLICIDAD (HOME TOP) -->
        ${renderAdSlot("my-12")}

        ${renderNewsGrid(state.data.articles.slice(0, 3), true)}
        <div class="text-center pb-12">
            <button onclick="window.appNavigate('noticias')" class="px-8 py-3 border border-cofrade-text text-cofrade-text font-serif italic hover:bg-cofrade-purple hover:text-white hover:border-transparent transition-all duration-300">
                Ver todas las noticias
            </button>
        </div>
    `;
}

function renderNewsGrid(articles, isHome = false) {
    const titleSection = isHome ? `
        <div class="text-center mb-16 pt-12">
            <span class="text-cofrade-purple font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Última Hora</span>
            <h2 class="font-serif text-4xl md:text-5xl text-cofrade-text font-bold mb-6">Actualidad Cofrade</h2>
            <div class="w-24 h-1 bg-cofrade-gold mx-auto relative">
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cofrade-purple rotate-45 border-2 border-white"></div>
            </div>
        </div>
    ` : `
        <div class="text-center mb-16 pt-12 animate-fade-in">
            <h2 class="font-serif text-4xl text-cofrade-text font-bold mb-4">Noticias</h2>
            <p class="font-body text-stone-600 italic">Toda la información de nuestras hermandades</p>
        </div>
    `;

    const cards = articles.map(article => `
        <article onclick="window.appNavigate('article-detail', ${article.id})" class="group flex flex-col bg-white border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <div class="relative h-64 overflow-hidden border-b-4 border-double border-cofrade-gold">
                <img src="${article.image}" alt="${article.title}" loading="lazy" decoding="async" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0">
                <div class="absolute top-4 left-0 bg-cofrade-purple text-white px-4 py-1 font-serif text-sm italic shadow-lg">
                    ${article.category}
                </div>
            </div>
            <div class="p-8 flex flex-col flex-grow relative bg-white">
                <div class="mb-4 flex items-center justify-center opacity-60">
                    <span class="block h-px w-6 bg-cofrade-gold mr-3"></span>
                    <time class="text-xs text-stone-500 font-serif uppercase tracking-widest font-bold">${article.date}</time>
                    <span class="block h-px w-6 bg-cofrade-gold ml-3"></span>
                </div>
                <h3 class="font-serif text-2xl text-cofrade-text font-bold leading-tight mb-4 text-center group-hover:text-cofrade-purple transition-colors duration-300">
                    ${article.title}
                </h3>
                <p class="font-body text-stone-600 text-sm leading-relaxed mb-8 text-center line-clamp-3">
                    ${article.excerpt}
                </p>
                <div class="mt-auto text-center">
                    <button class="text-cofrade-text group-hover:text-cofrade-gold font-serif italic text-lg relative pb-1 overflow-hidden transition-colors pointer-events-none">
                        <span class="relative z-10">Leer noticia</span>
                        <span class="absolute bottom-0 left-0 w-full h-px bg-cofrade-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    return `
        <section class="max-w-6xl mx-auto px-4 pb-20">
            ${titleSection}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${cards}
            </div>
            
            <!-- PUBLICIDAD (NEWS BOTTOM) -->
            ${renderAdSlot("mt-16")}
        </section>
    `;
}

function renderArticleDetail(article) {
    const paragraphs = article.content ? article.content.split('\n').map(p => `<p class="mb-6">${p}</p>`).join('') : '<p>Contenido no disponible</p>';
    
    return `
        <article class="animate-fade-in bg-white min-h-screen pb-12">
            <div class="bg-stone-100 border-b border-stone-200 py-4 px-4 sticky top-0 z-20">
                <div class="max-w-4xl mx-auto">
                    <button onclick="window.appNavigate('noticias')" class="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-cofrade-purple flex items-center transition-colors">
                        &larr; Volver a noticias
                    </button>
                </div>
            </div>
            <div class="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
                <img src="${article.image}" alt="${article.title}" loading="lazy" decoding="async" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div class="max-w-4xl mx-auto">
                        <span class="inline-block px-3 py-1 bg-cofrade-gold text-white text-xs font-serif italic mb-4">${article.category}</span>
                        <h1 class="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-4">${article.title}</h1>
                        <div class="flex items-center text-stone-300 font-serif italic text-sm md:text-base">
                            <time>${article.date}</time>
                            <span class="mx-3 text-cofrade-gold">•</span>
                            <span>Redacción Agenda Cofrade</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-3xl mx-auto px-6 py-12">
                <div class="font-serif text-xl md:text-2xl text-stone-700 leading-relaxed italic mb-8 border-l-4 border-cofrade-gold pl-6">
                    "${article.excerpt}"
                </div>
                <div class="prose prose-lg prose-stone max-w-none font-body text-stone-800 leading-loose">
                    ${paragraphs}
                </div>
            </div>
        </article>
    `;
}

// --- CALENDAR LOGIC ---
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

window.changeMonth = function(increment) {
    const newDate = new Date(state.currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    state.currentDate = newDate;
    document.getElementById('app-content').innerHTML = renderAgendaPage();
}

function renderAgendaPage() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const realToday = new Date();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday

    let calendarHTML = '';
    
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarHTML += `<div class="bg-stone-50 border border-stone-100 min-h-[100px]"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayEvents = state.data.agenda.filter(e => e.dateIso === dateString);
        
        const isToday = d === realToday.getDate() && month === realToday.getMonth() && year === realToday.getFullYear();
        const bgClass = isToday ? 'bg-stone-300 ring-2 ring-inset ring-cofrade-purple/50' : dayEvents.length > 0 ? 'bg-white' : 'bg-stone-50';
        
        // Show only first 2 events in calendar cell
        const visibleEvents = dayEvents.slice(0, 2);
        const moreEvents = dayEvents.length - 2;

        const eventsHTML = visibleEvents.map(event => `
            <div onclick="window.event.stopPropagation(); window.appNavigate('event-detail', ${event.id})" 
                 class="text-xs p-1 bg-cofrade-bg border-l-2 border-cofrade-gold text-cofrade-text leading-tight cursor-pointer hover:bg-cofrade-gold/20 shadow-sm transition-colors mt-1 relative z-20">
                <span class="font-bold block text-cofrade-purple">${event.time}</span>
                <span class="truncate block font-serif italic">${event.title}</span>
            </div>
        `).join('');

        const moreLabel = moreEvents > 0 ? `
            <div class="text-[10px] text-center text-stone-500 mt-1 italic font-serif relative z-20">+${moreEvents} eventos más</div>
        ` : '';

        calendarHTML += `
            <div onclick="window.appNavigate('day-detail', '${dateString}')" 
                 class="border border-stone-200 min-h-[120px] p-2 relative group transition-colors cursor-pointer ${bgClass} hover:bg-stone-100">
                
                <!-- HOVER OVERLAY: Ver eventos del día -->
                <div class="absolute inset-0 bg-stone-900/5 hidden group-hover:flex items-center justify-center pointer-events-none z-10 backdrop-blur-[1px]">
                    <span class="bg-white/90 text-[10px] px-2 py-1 shadow-sm border border-cofrade-gold text-cofrade-purple font-bold uppercase tracking-widest transform scale-95 group-hover:scale-100 transition-transform">
                        Ver eventos del día
                    </span>
                </div>

                <div class="flex justify-between items-start relative z-20">
                    <!-- Número del día -->
                    <span class="font-serif font-bold text-lg leading-none ${dayEvents.length > 0 || isToday ? 'text-cofrade-purple' : 'text-stone-300'}">
                        ${d}
                    </span>
                    ${isToday ? '<span class="text-[10px] uppercase font-bold text-cofrade-purple border border-cofrade-purple px-1 rounded-sm">Hoy</span>' : ''}
                </div>
                <div class="mt-2 space-y-1 relative z-20">
                    ${eventsHTML}
                    ${moreLabel}
                </div>
            </div>
        `;
    }

    return `
        <section class="py-12 max-w-7xl mx-auto px-4 animate-fade-in">
            <div class="text-center mb-10">
                <h2 class="font-serif text-4xl text-cofrade-text font-bold mb-4">Calendario Cofrade</h2>
                <p class="font-body text-stone-600 italic">Consulta los actos y cultos mes a mes</p>
                <p class="text-xs text-stone-400 mt-2">Haz clic en el día para ver todos los eventos de esa fecha.</p>
            </div>
            <div class="bg-white p-6 shadow-xl border-t-4 border-cofrade-purple">
                <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h3 class="font-serif text-3xl font-bold text-cofrade-text uppercase tracking-wide">
                        ${MONTHS[month]} <span class="text-cofrade-gold">${year}</span>
                    </h3>
                    <div class="flex space-x-2">
                        <button onclick="window.changeMonth(-1)" class="px-6 py-2 border border-stone-300 text-stone-600 font-serif italic hover:bg-cofrade-bg hover:border-cofrade-gold transition-colors">&larr; Anterior</button>
                        <button onclick="window.changeMonth(1)" class="px-6 py-2 border border-stone-300 text-stone-600 font-serif italic hover:bg-cofrade-bg hover:border-cofrade-gold transition-colors">Siguiente &rarr;</button>
                    </div>
                </div>
                <div class="grid grid-cols-7 gap-px mb-2 bg-cofrade-purple text-white shadow-md">
                    ${WEEK_DAYS.map(d => `<div class="p-3 text-center font-serif italic text-sm tracking-wider uppercase">${d}</div>`).join('')}
                </div>
                <div class="grid grid-cols-7 gap-1 bg-stone-200 border border-stone-300 shadow-inner">
                    ${calendarHTML}
                </div>
            </div>
        </section>
    `;
}

function renderDayDetail(dateIso) {
    const events = state.data.agenda.filter(e => e.dateIso === dateIso);
    // Parse date for header
    const d = new Date(dateIso);
    const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const listHTML = events.length > 0 ? events.map(event => `
        <div onclick="window.appNavigate('event-detail', ${event.id})" class="flex flex-col md:flex-row bg-white border border-stone-200 p-4 shadow-sm hover:shadow-md cursor-pointer transition-all gap-4 mb-4">
            <div class="md:w-32 h-24 bg-stone-100 flex-shrink-0">
                ${event.image ? `<img src="${event.image}" class="w-full h-full object-cover">` : ''}
            </div>
            <div class="flex-grow">
                <div class="flex justify-between items-start">
                    <span class="bg-cofrade-purple text-white text-xs px-2 py-1 uppercase tracking-widest">${event.type}</span>
                    <span class="font-bold text-cofrade-gold text-lg">${event.time}</span>
                </div>
                <h3 class="font-serif text-xl font-bold text-cofrade-text mt-2">${event.title}</h3>
                <p class="text-stone-500 text-sm mt-1">📍 ${event.location}</p>
            </div>
        </div>
    `).join('') : '<p class="text-center italic text-stone-500 py-8">No hay eventos registrados para este día.</p>';

    return `
        <section class="py-12 max-w-4xl mx-auto px-4 animate-fade-in min-h-screen">
            <button onclick="window.appNavigate('agenda')" class="mb-6 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-cofrade-purple flex items-center">
                &larr; Volver al calendario
            </button>
            <h2 class="font-serif text-3xl text-cofrade-text font-bold mb-8 border-b-2 border-cofrade-gold pb-4 capitalize">
                Eventos del ${dateStr}
            </h2>
            <div class="space-y-4">
                ${listHTML}
            </div>
        </section>
    `;
}

function renderEventDetail(event) {
    return `
        <article class="animate-fade-in pb-12 bg-white min-h-screen">
            <div class="bg-cofrade-bg border-b-2 border-cofrade-gold py-4 px-4 sticky top-0 z-20 shadow-sm">
                <div class="max-w-4xl mx-auto flex justify-between items-center">
                    <button onclick="window.appNavigate('agenda')" class="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-cofrade-purple flex items-center transition-colors">
                        &larr; Volver al calendario
                    </button>
                    <span class="text-xs font-serif italic text-cofrade-purple">${event.dateIso}</span>
                </div>
            </div>
            <div class="max-w-4xl mx-auto p-6 md:p-12">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/3">
                        <div class="aspect-[3/4] bg-stone-100 border-4 border-double border-cofrade-gold relative shadow-lg overflow-hidden">
                            ${event.image ? `<img src="${event.image}" alt="${event.title}" loading="lazy" decoding="async" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center bg-stone-200"><span class="font-serif italic text-stone-400">Sin Imagen</span></div>`}
                        </div>
                    </div>
                    <div class="w-full md:w-2/3">
                        <span class="inline-block px-3 py-1 bg-cofrade-purple text-white text-xs uppercase tracking-widest mb-4">${event.type}</span>
                        <h1 class="font-serif text-3xl md:text-4xl font-bold text-cofrade-text leading-tight mb-4">${event.title}</h1>
                        <div class="flex flex-col space-y-3 mb-8 border-b border-stone-200 pb-8">
                            <div class="flex items-center text-stone-600">
                                <span class="font-serif italic text-lg text-cofrade-gold mr-2">⏰</span>
                                <span class="font-serif italic text-lg">${event.time} horas</span>
                            </div>
                            <div class="flex items-center text-stone-600">
                                <span class="font-serif italic text-lg text-cofrade-gold mr-2">📍</span>
                                <span class="font-body text-base">${event.location}</span>
                            </div>
                        </div>
                        <div class="prose prose-stone font-body text-stone-700">
                            <h3 class="font-serif font-bold text-xl text-cofrade-text">Descripción del Acto</h3>
                            <p>${event.description || "No hay información adicional disponible para este evento."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// --- HERMANDADES LOGIC ---

function renderHermandadesPage() {
    const days = [
        "Viernes de Dolores", "Sábado de Pasión", "Domingo de Ramos", "Lunes Santo",
        "Martes Santo", "Miércoles Santo", "Jueves Santo", "Madrugá",
        "Viernes Santo", "Sábado Santo", "Domingo de Resurrección"
    ];

    const tabsHTML = days.map(day => `
        <li>
            <button 
                data-day="${day}"
                class="tab-btn w-full text-left px-4 py-3 font-serif transition-colors text-sm hover:bg-cofrade-gold/10 ${state.selectedDay === day ? 'text-cofrade-purple font-bold border-l-4 border-cofrade-gold bg-stone-50' : 'text-stone-600 border-l-4 border-transparent'}"
            >
                ${day}
            </button>
        </li>
    `).join('');

    return `
        <section class="py-12 max-w-7xl mx-auto px-4 animate-fade-in">
            <div class="text-center mb-10">
                <h2 class="font-serif text-4xl text-cofrade-text font-bold mb-4">Nómina de Hermandades</h2>
                <p class="font-body text-stone-600 italic">Itinerario oficial por días</p>
            </div>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/4">
                    <div class="bg-white shadow-md border border-stone-200 sticky top-4">
                        <h3 class="bg-cofrade-purple text-white font-serif p-3 text-center uppercase tracking-widest text-sm">Días de Pasión</h3>
                        <ul class="flex flex-col divide-y divide-stone-100">
                            ${tabsHTML}
                        </ul>
                    </div>
                </div>
                <div class="md:w-3/4" id="hermandades-list-container">
                    ${renderHermandadesList()}
                </div>
            </div>
        </section>
    `;
}

function renderHermandadesList() {
    const filtered = state.data.hermandades.filter(h => h.day === state.selectedDay);
    
    if (filtered.length === 0) {
        return `
            <div class="mb-6 flex items-center">
                 <div class="h-px bg-cofrade-gold flex-grow opacity-50"></div>
                 <h3 class="px-4 font-serif text-2xl font-bold text-cofrade-text uppercase">${state.selectedDay}</h3>
                 <div class="h-px bg-cofrade-gold flex-grow opacity-50"></div>
            </div>
            <div class="bg-stone-50 border border-stone-200 p-12 text-center rounded-sm">
                <p class="font-serif italic text-stone-500 text-lg">No hay hermandades registradas para este día.</p>
            </div>`;
    }

    const cards = filtered.map(h => {
        // Lógica de Imagen: Si tiene 'shield', se usa 'shield' con object-contain.
        // Si no tiene 'shield', se usa 'image' (fallback) con object-cover.
        const imgSrc = h.shield ? h.shield : h.image;
        const imgClass = h.shield ? 'object-contain p-4 bg-stone-50' : 'object-cover';
        
        return `
        <div onclick="window.appNavigate('hermandad-detail', ${h.id})" class="bg-white border-b-2 border-stone-200 shadow-sm hover:shadow-xl hover:border-cofrade-gold transition-all duration-300 cursor-pointer group flex overflow-hidden h-40">
            <div class="w-1/3 relative overflow-hidden">
                <img src="${imgSrc}" alt="${h.popularName}" loading="lazy" decoding="async" class="w-full h-full ${imgClass} group-hover:scale-110 transition-transform duration-700">
                ${!h.shield ? '<div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>' : ''}
            </div>
            <div class="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h4 class="font-serif text-xl font-bold text-cofrade-text group-hover:text-cofrade-purple transition-colors mb-1">${h.popularName}</h4>
                    <p class="text-xs text-stone-500 font-serif italic mb-2">${h.church}</p>
                </div>
                <div class="flex justify-between items-end">
                    <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">Fundación: ${h.foundation}</span>
                    <span class="text-cofrade-gold text-sm group-hover:translate-x-1 transition-transform">Ver Ficha &rarr;</span>
                </div>
            </div>
        </div>
    `}).join('');

    return `
        <div class="mb-6 flex items-center animate-fade-in">
             <div class="h-px bg-cofrade-gold flex-grow opacity-50"></div>
             <h3 class="px-4 font-serif text-2xl font-bold text-cofrade-text uppercase">${state.selectedDay}</h3>
             <div class="h-px bg-cofrade-gold flex-grow opacity-50"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            ${cards}
        </div>
    `;
}

function attachHermandadTabsListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.selectedDay = e.target.getAttribute('data-day');
            const container = document.getElementById('hermandades-list-container');
            if(container) container.innerHTML = renderHermandadesList();
            
            document.querySelectorAll('.tab-btn').forEach(b => {
                const day = b.getAttribute('data-day');
                if(day === state.selectedDay) {
                     b.classList.add('text-cofrade-purple', 'font-bold', 'border-l-4', 'border-cofrade-gold', 'bg-stone-50');
                     b.classList.remove('text-stone-600', 'border-transparent');
                } else {
                     b.classList.remove('text-cofrade-purple', 'font-bold', 'border-l-4', 'border-cofrade-gold', 'bg-stone-50');
                     b.classList.add('text-stone-600', 'border-transparent');
                }
            });
        });
    });
}

function renderHermandadDetail(h) {
    // Generación dinámica de imágenes de pasos según h.nPasos
    let pasosHTML = '';
    if (h.nPasos && h.nPasos > 0) {
        let gridCols = h.nPasos === 1 ? 'grid-cols-1' : h.nPasos === 2 ? 'grid-cols-2' : 'grid-cols-3';
        let imgs = '';
        for(let i = 1; i <= h.nPasos; i++) {
            // Se asume convención de nombres: paso-ID-NUM.jpg
            imgs += `
                <div class="h-56 bg-stone-200 border-2 border-cofrade-gold p-1 shadow-md">
                     <img src="./img/paso-${h.id}-${i}.jpg" 
                          alt="Paso ${i}" 
                          class="w-full h-full object-cover"
                          onerror="this.src='https://placehold.co/400x300/f4f1ea/582c58?text=Foto+Paso+${i}'"
                     >
                </div>
            `;
        }
        pasosHTML = `
            <section class="mt-8 border-t border-stone-200 pt-8">
                <h3 class="font-serif text-2xl font-bold text-cofrade-text mb-6 text-center">Titulares en sus Pasos</h3>
                <div class="grid ${gridCols} gap-4">
                    ${imgs}
                </div>
            </section>
        `;
    }

    return `
        <article class="animate-fade-in pb-12">
            <div class="relative h-64 md:h-80 w-full bg-stone-900 overflow-hidden">
                <img src="${h.image}" alt="${h.name}" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-40 blur-sm scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-cofrade-bg via-transparent to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-6xl mx-auto flex items-end">
                    <div class="bg-white/90 backdrop-blur-md p-6 border-t-4 border-cofrade-gold shadow-2xl max-w-2xl">
                        <button onclick="window.appNavigate('hermandades')" class="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-cofrade-purple mb-2 flex items-center">
                            &larr; Volver al listado
                        </button>
                        <h1 class="font-serif text-3xl md:text-5xl font-bold text-cofrade-text mb-2 leading-tight">${h.popularName}</h1>
                        <p class="font-serif italic text-lg text-cofrade-purple">${h.name}</p>
                    </div>
                </div>
            </div>
            <div class="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="md:col-span-1">
                    <div class="bg-white border border-stone-200 shadow-lg p-6 sticky top-8">
                        <h3 class="font-serif text-xl font-bold text-cofrade-text mb-4 border-b border-cofrade-gold pb-2">Ficha Técnica</h3>
                        <ul class="space-y-4 font-body text-sm">
                            <li class="flex justify-between"><span class="text-stone-500 font-bold">Día:</span><span class="text-right text-stone-800">${h.day}</span></li>
                            <li class="flex justify-between"><span class="text-stone-500 font-bold">Sede:</span><span class="text-right text-stone-800">${h.church}</span></li>
                            <li class="flex justify-between"><span class="text-stone-500 font-bold">Fundación:</span><span class="text-right text-stone-800">${h.foundation}</span></li>
                            ${h.nazarenosCount ? `<li class="flex justify-between"><span class="text-stone-500 font-bold">Nazarenos:</span><span class="text-right text-stone-800">~${h.nazarenosCount}</span></li>` : ''}
                            ${h.timeOut ? `<li class="flex justify-between"><span class="text-stone-500 font-bold">Salida:</span><span class="text-right text-stone-800">${h.timeOut} H</span></li>` : ''}
                        </ul>
                        <div class="mt-8 pt-4 border-t border-stone-100 text-center">
                            <button onclick="window.appNavigate('noticias')" class="w-full bg-cofrade-purple text-white font-serif py-3 hover:bg-stone-800 transition-colors shadow-md">Leer Actualidad</button>
                        </div>

                        <!-- PUBLICIDAD SIDEBAR -->
                        ${renderAdSlot("mt-8")}

                    </div>
                </div>
                <div class="md:col-span-2 space-y-8">
                    <section>
                        <h3 class="font-serif text-2xl font-bold text-cofrade-text mb-4 flex items-center"><span class="w-8 h-1 bg-cofrade-gold mr-3"></span>Historia y Descripción</h3>
                        <p class="font-body text-stone-600 leading-relaxed text-lg mb-4">${h.description || ''}</p>
                        <p class="font-body text-stone-600 leading-relaxed">${h.history || "Historia pendiente de redacción."}</p>
                    </section>
                    
                    <section class="bg-stone-50 p-6 border-l-4 border-cofrade-gold">
                        <h3 class="font-serif text-xl font-bold text-cofrade-text mb-3">Itinerario</h3>
                        <p class="font-body text-stone-600 italic leading-relaxed">${h.itinerary || "Itinerario pendiente de confirmación oficial."}</p>
                    </section>

                    <section class="bg-stone-50 p-6 border-l-4 border-cofrade-gold">
                        <h3 class="font-serif text-xl font-bold text-cofrade-text mb-3">Hábito de Nazareno</h3>
                        <p class="font-body text-stone-600 italic">${h.tunicDescription || "Consultar reglas."}</p>
                    </section>

                    ${pasosHTML}
                </div>
            </div>
        </article>
    `;
}

// --- BANDAS LOGIC ---

function renderBandasPage(bandas) {
    const groups = [
        { id: 'cctt', title: 'Bandas de Cornetas y Tambores', type: 'Cornetas y Tambores' },
        { id: 'am', title: 'Agrupaciones Musicales', type: 'Agrupación Musical' },
        { id: 'bm', title: 'Bandas de Música', type: 'Banda de Música' },
        { id: 'cm', title: 'Música de Capilla', type: 'Capilla Musical' }
    ];

    let htmlContent = `
        <div class="text-center mb-12">
            <h2 class="font-serif text-4xl text-cofrade-text font-bold mb-4">Música Procesional</h2>
            <p class="font-body text-stone-600 italic">El sonido de la Semana Santa</p>
        </div>
    `;

    groups.forEach(group => {
        const groupBandas = bandas.filter(b => b.type === group.type);

        if (groupBandas.length > 0) {
            // Header for the group
            htmlContent += `
                <div class="mb-8 mt-12 border-b-2 border-cofrade-gold pb-2">
                    <h3 class="font-serif text-2xl text-cofrade-purple font-bold uppercase tracking-wider">${group.title}</h3>
                </div>
            `;

            // Grid container
            htmlContent += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">`;

            // Cards
            htmlContent += groupBandas.map(b => `
                <div onclick="window.appNavigate('banda-detail', ${b.id})" class="group bg-[#1a1a1a] text-stone-300 border-t-4 border-cofrade-gold relative shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col">
                    <div class="absolute inset-0 bg-cofrade-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="p-6 relative z-10 flex flex-col h-full">
                        <div class="flex justify-between items-start mb-4">
                            <span class="text-[10px] font-bold text-cofrade-gold uppercase tracking-wider border border-cofrade-gold px-2 py-1 truncate max-w-[70%]">${b.type}</span>
                            <!-- Escudo Cuadrado Pequeño -->
                            ${b.shield ? `
                            <div class="w-10 h-10 bg-white p-0.5 shadow-sm rounded-sm">
                                <img src="${b.shield}" alt="Escudo" class="w-full h-full object-contain">
                            </div>` : ''}
                        </div>
                        <h3 class="font-serif text-xl text-white mb-2 group-hover:text-cofrade-gold transition-colors leading-tight">${b.name}</h3>
                        <p class="text-xs font-serif italic text-stone-400 mb-4">${b.location}</p>
                        <p class="text-xs leading-relaxed text-stone-400 line-clamp-3 mb-4 flex-grow">${b.description}</p>
                        <div class="text-right mt-auto">
                            <span class="text-xs font-bold text-white border-b border-transparent group-hover:border-white transition-all">Ver Ficha &rarr;</span>
                        </div>
                    </div>
                </div>
            `).join('');

            // Close grid container
            htmlContent += `</div>`;
        }
    });

    return `
        <section class="py-12 max-w-6xl mx-auto px-4 animate-fade-in">
            ${htmlContent}
        </section>
    `;
}

function renderBandaDetail(banda) {
    // Generar lista de contratos
    let contractsHTML = '<p class="text-stone-500 italic text-sm">Contratos no disponibles.</p>';
    if (banda.contracts && banda.contracts.length > 0) {
        contractsHTML = `<ul class="space-y-2 mt-2">
            ${banda.contracts.map(c => `<li class="text-sm text-stone-700 border-l-2 border-cofrade-gold pl-3 py-1 bg-stone-50">${c}</li>`).join('')}
        </ul>`;
    }

    return `
        <article class="animate-fade-in bg-stone-100 min-h-[60vh] py-12">
            <div class="max-w-4xl mx-auto px-4">
                <button onclick="window.appNavigate('bandas')" class="mb-6 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-cofrade-purple flex items-center">
                    &larr; Volver al listado de bandas
                </button>
                <div class="bg-white shadow-2xl overflow-hidden border-t-8 border-cofrade-purple">
                    <div class="bg-[#1a1a1a] p-8 md:p-12 text-center relative">
                         <!-- Escudo Central Grande si existe -->
                         ${banda.shield ? `
                         <div class="w-24 h-24 mx-auto mb-6 bg-white p-2 rounded-full shadow-lg border-2 border-cofrade-gold">
                            <img src="${banda.shield}" class="w-full h-full object-contain">
                         </div>` : ''}

                        <span class="inline-block px-3 py-1 border border-cofrade-gold text-cofrade-gold text-xs uppercase tracking-widest mb-4">${banda.type}</span>
                        <h1 class="font-serif text-3xl md:text-5xl font-bold text-white mb-4">${banda.name}</h1>
                        <p class="font-serif italic text-xl text-stone-400">${banda.location}</p>
                    </div>
                    <div class="p-8 md:p-12">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 class="font-serif text-xl font-bold text-cofrade-text mb-4 border-b border-stone-200 pb-2">Información</h3>
                                <ul class="space-y-4">
                                    ${banda.director ? `<li class="grid grid-cols-3 gap-2"><span class="font-bold text-stone-500 text-sm col-span-1">Dirección:</span><span class="text-stone-800 text-sm col-span-2">${banda.director}</span></li>` : ''}
                                    ${banda.uniform ? `<li class="grid grid-cols-3 gap-2"><span class="font-bold text-stone-500 text-sm col-span-1">Uniformidad:</span><span class="text-stone-800 text-sm col-span-2">${banda.uniform}</span></li>` : ''}
                                </ul>
                                
                                <div class="mt-8">
                                    <h3 class="font-serif text-xl font-bold text-cofrade-text mb-4 border-b border-stone-200 pb-2">Semana Santa 2025</h3>
                                    ${contractsHTML}
                                </div>
                            </div>
                            <div>
                                <h3 class="font-serif text-xl font-bold text-cofrade-text mb-4 border-b border-stone-200 pb-2">Historia y Estilo</h3>
                                <p class="font-body text-stone-600 leading-relaxed text-sm mb-4">${banda.description}</p>
                                <p class="font-body text-stone-600 leading-relaxed text-sm">${banda.history || "Trayectoria musical dedicada a la Semana Santa."}</p>
                            </div>
                        </div>

                        <!-- PUBLICIDAD BANDAS BOTTOM -->
                        ${renderAdSlot("mt-12")}

                    </div>
                </div>
            </div>
        </article>
    `;
}

// --- STATIC PAGES ---
function renderSemanaSantaPage() {
    return `
        <section class="py-12 max-w-4xl mx-auto px-4 animate-fade-in">
            <div class="text-center mb-10">
                <h2 class="font-serif text-4xl md:text-5xl text-cofrade-text font-bold mb-6">La Semana Santa</h2>
            </div>
            <div class="prose prose-lg prose-stone mx-auto font-body text-stone-700 text-justify">
                <p class="first-letter:text-5xl first-letter:font-serif first-letter:text-cofrade-purple first-letter:mr-3 first-letter:float-left leading-relaxed mb-6">
                    La Semana Santa de Sevilla es la conmemoración de la pasión, muerte y resurrección de Cristo a través de las procesiones que realizan las cofradías penitenciales a la Catedral de Sevilla. Es una de las expresiones de religiosidad popular más importantes del mundo, declarada de Interés Turístico Internacional.
                </p>
                <div class="my-10 p-8 bg-white border border-stone-200 shadow-xl border-l-4 border-l-cofrade-purple italic text-center font-serif text-xl text-stone-600">
                    "Jerusalén y Roma en una sola ciudad. Pasión y Arte unidos en la mayor fiesta barroca."
                </div>
                <h3 class="font-serif text-2xl text-cofrade-text font-bold mt-8 mb-4 flex items-center">
                    <span class="w-8 h-px bg-cofrade-gold mr-4"></span>Historia y Tradición
                </h3>
                <p class="mb-6 leading-relaxed">
                    La historia de la Semana Santa de Sevilla no se escribió de golpe, sino que se caminó paso a paso, concretamente los 1.321 pasos que separaban la Casa de Pilatos de la Cruz del Campo. Fue en 1520 cuando don Fadrique Enríquez de Ribera, Marqués de Tarifa, regresó de Jerusalén con una obsesión métrica y espiritual: recrear la Vía Dolorosa en la geografía hispalense. Aquel primer Vía Crucis, que sembró de humilladeros y azulejos la actual avenida de Luis Montoto, no solo estableció una ruta de 997 metros exactos para la expiación de los pecados, sino que actuó como el big bang fundacional de la fiesta. Alrededor de este eje sacro, las primitivas hermandades comenzaron a organizar una liturgia que, lejos del espectáculo barroco actual, era austera y silente, marcando el inicio de una transformación urbana que convertiría a la ciudad en un escenario permanente de la Redención.   
                </p>
                <p class="mb-6 leading-relaxed">
                    Sin embargo, la verdadera revolución visual llegaría décadas más tarde, impulsada por los vientos de la Contrarreforma y los decretos del Concilio de Trento. La Iglesia, necesitada de conmover a un pueblo iletrado frente a la austeridad protestante, encontró en los gremios sevillanos a sus mejores aliados. Curtidores, hortelanos y alfareros financiaron la talla de imágenes de un realismo atroz, donde la madera se hacía carne a través de la gubia de Martínez Montañés o Juan de Mesa. Nacieron así las "cofradías de sangre", corporaciones donde la devoción se medía en el dolor físico de los disciplinantes que se flagelaban públicamente. Durante el Siglo de Oro, la Semana Santa fue un teatro descarnado de la fe, donde el misticismo se mezclaba con la crudeza de la sangre, creando una estética del sufrimiento que definiría la identidad barroca de la ciudad.   
                </p>
                <p class="mb-6 leading-relaxed">
                    Aquel fervor sangriento encontraría su final abrupto bajo la mirada racionalista de la Ilustración. En 1777, el rey Carlos III, horrorizado por lo que consideraba un espectáculo "bárbaro", prohibió mediante Real Cédula los disciplinantes y empalados. Esta decisión forzó a las hermandades a una reinvención radical: sin el reclamo de la penitencia pública, el protagonismo se desplazó definitivamente hacia la excelencia artística de los pasos y el orden de los cortejos de nazarenos. A esta crisis de identidad se sumaría poco después el expolio napoleónico y la traumática Desamortización de 1836, que arrebató a las cofradías sus sedes conventuales históricas, dejándolas al borde de la extinción en una Sevilla empobrecida y secularizada.   
                </p>
                <p class="mb-6 leading-relaxed">
                    La resurrección de la fiesta, curiosamente, tendría acento francés. La llegada de los Duques de Montpensier al Palacio de San Telmo en 1848 marcó el inicio de la "romantización" de la Semana Santa. Antonio de Orleans y la infanta María Luisa Fernanda no solo inyectaron capital y prestigio social, actuando como mecenas de hermandades como Montserrat, sino que impusieron una nueva estética de lujo burgués. El terciopelo, los bordados en oro y la orfebrería de plata sustituyeron a la precariedad anterior, convirtiendo la procesión en un desfile de artes suntuarias que atrajo a la reina Isabel II y, posteriormente, a Alfonso XII. Fue en esta "Corte Chica" donde se fraguó el modelo actual, fusionando la tradición popular con el refinamiento aristocrático.   
                </p>
                <p class="mb-6 leading-relaxed">
                    El último capítulo de esta crónica evolutiva se escribiría a principios del siglo XX con la necesidad de poner orden en el caos. La instauración oficial de la Carrera Oficial entre 1917 y 1919 y la posterior creación del Consejo General de Hermandades institucionalizaron definitivamente los recorridos. Lo que comenzó como un camino de polvo hacia un humilladero extramuros se ha convertido hoy en una maquinaria de precisión cronométrica, capaz de coordinar a decenas de miles de nazarenos. Cinco siglos después, la Semana Santa de Sevilla sigue siendo ese organismo vivo que, habiendo sobrevivido a prohibiciones y guerras, se renueva cada primavera sin perder la memoria de sus orígenes.                
                </p>





                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <img src="${IMAGES.SEMANA_SANTA_MISTERIO}" alt="Paso de misterio" loading="lazy" decoding="async" class="w-full h-64 object-cover border-4 border-double border-cofrade-gold shadow-md" />
                    <img src="${IMAGES.SEMANA_SANTA_PALIO}" alt="Paso de palio" loading="lazy" decoding="async" class="w-full h-64 object-cover border-4 border-double border-cofrade-gold shadow-md" />
                 </div>
            </div>
        </section>
    `;
}
