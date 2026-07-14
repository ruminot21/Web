
const DEFAULT_DATA = {"channelName": "CANAL TV", "tagline": "Información y entretenimiento, siempre contigo", "description": "Mira nuestra señal en vivo, consulta la programación y conoce las últimas noticias del canal.", "liveUrl": "", "whatsapp": "000000000000", "email": "contacto@canaltv.com", "phone": "+00 000 000 0000", "address": "Ciudad, País", "facebook": "#", "instagram": "#", "youtube": "#", "tiktok": "#", "twitter": "#", "adTitle": "Espacio publicitario disponible", "adText": "Promociona tu marca, producto o servicio en nuestro canal.", "news": [{"category": "DESTACADO", "title": "Noticia principal del canal", "summary": "Publica aquí la noticia más importante del día."}, {"category": "ACTUALIDAD", "title": "Segunda noticia destacada", "summary": "Agrega información breve y clara para tus visitantes."}, {"category": "DEPORTES", "title": "Actualidad deportiva", "summary": "Resultados, entrevistas y análisis deportivo."}], "programs": [{"name": "Noticias Central", "description": "Resumen completo de las noticias más importantes del día."}, {"name": "Mañanas en Vivo", "description": "Actualidad, invitados, cocina, salud y entretenimiento."}, {"name": "Zona Deportiva", "description": "Resultados, análisis y entrevistas del mundo deportivo."}], "presenters": [{"name": "Ana Martínez", "show": "Noticias Central", "initials": "AM"}, {"name": "Carlos Ramírez", "show": "Zona Deportiva", "initials": "CR"}, {"name": "Laura Sánchez", "show": "Mañanas en Vivo", "initials": "LS"}], "schedule": {"Lunes": [{"time": "06:00", "title": "Primera Hora", "description": "Noticias y clima", "category": "En vivo"}, {"time": "09:00", "title": "Mañanas en Vivo", "description": "Magazine y entrevistas", "category": "Magazine"}, {"time": "21:00", "title": "Noticias Central", "description": "Edición principal", "category": "Noticias"}], "Martes": [{"time": "06:00", "title": "Primera Hora", "description": "Noticias y clima", "category": "En vivo"}, {"time": "18:00", "title": "Zona Deportiva", "description": "Análisis y resultados", "category": "Deportes"}], "Miércoles": [{"time": "10:00", "title": "Salud y Vida", "description": "Bienestar y prevención", "category": "Salud"}], "Jueves": [{"time": "19:00", "title": "Debate Abierto", "description": "Análisis de actualidad", "category": "Opinión"}], "Viernes": [{"time": "20:00", "title": "Show de Viernes", "description": "Música e invitados", "category": "Entretenimiento"}], "Sábado": [{"time": "15:00", "title": "Especial Documental", "description": "Historias y reportajes", "category": "Documental"}], "Domingo": [{"time": "20:00", "title": "Resumen Deportivo", "description": "Lo mejor de la semana", "category": "Deportes"}]}};
function getData(){
  try{return JSON.parse(localStorage.getItem('canalTVData')) || DEFAULT_DATA}
  catch(e){return DEFAULT_DATA}
}
const data = getData();

const $ = id => document.getElementById(id);
$('brandName').textContent = data.channelName;
$('footerName').textContent = '© ' + new Date().getFullYear() + ' ' + data.channelName;
$('tagline').textContent = data.tagline;
$('description').textContent = data.description;
$('address').textContent = data.address;
$('phone').textContent = data.phone;
$('email').textContent = data.email;
$('adTitle').textContent = data.adTitle;
$('adText').textContent = data.adText;
$('wa').href = 'https://wa.me/' + data.whatsapp;

const live = $('live');
live.innerHTML = data.liveUrl
 ? `<iframe src="${data.liveUrl}" allowfullscreen></iframe>`
 : `<div class="video-placeholder"><div class="video-play">▶</div><h3>Señal en vivo</h3><p>Agrega la URL desde /admin</p></div>`;

$('programs').innerHTML = data.programs.map(x => `
  <article class="card">
    <span class="tag">PROGRAMA</span>
    <h3>${x.name}</h3>
    <p>${x.description}</p>
  </article>`).join('');

$('news').innerHTML = data.news.map(x => `
  <article class="card">
    <span class="tag">${x.category}</span>
    <h3>${x.title}</h3>
    <p>${x.summary}</p>
  </article>`).join('');

$('presenters').innerHTML = data.presenters.map(x => `
  <article class="card presenter">
    <div class="avatar">${x.initials}</div>
    <h3>${x.name}</h3>
    <p>${x.show}</p>
  </article>`).join('');

const socialLinks = [
  ['Facebook',data.facebook],['Instagram',data.instagram],['YouTube',data.youtube],
  ['TikTok',data.tiktok],['X',data.twitter]
];
$('socials').innerHTML = socialLinks.map(([name,url]) => `<a href="${url}" target="_blank">${name}</a>`).join('');

const dayNames = Object.keys(data.schedule);
function renderDay(day){
  $('schedule').innerHTML = (data.schedule[day] || []).map(x => `
    <div class="schedule-row">
      <div class="time">${x.time}</div>
      <div><strong>${x.title}</strong><p style="margin:4px 0 0">${x.description}</p></div>
      <span class="tag">${x.category}</span>
    </div>`).join('');
}
dayNames.forEach((day,index)=>{
  const btn=document.createElement('button');
  btn.className='day'+(index===0?' active':'');
  btn.textContent=day;
  btn.onclick=()=>{
    document.querySelectorAll('.day').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    renderDay(day);
  };
  $('days').appendChild(btn);
});
renderDay(dayNames[0]);

$('menuBtn').onclick=()=>$('navLinks').classList.toggle('open');
document.querySelectorAll('#navLinks a').forEach(a=>a.onclick=()=>$('navLinks').classList.remove('open'));
