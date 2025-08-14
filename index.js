import{a as l,S as u,i as a}from"./assets/vendor-BK_rxH-O.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();function f(t){const o="51719730-f0601b97791df742fe437894d",n="https://pixabay.com/api/",s={key:o,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0};return l.get(n,{params:s}).then(e=>e.data)}const c=document.querySelector(".gallery"),d=new u(".gallery a");function p(t){return`
    <a href="${t.largeImageURL}" class="gallery__item">
      <img src="${t.webformatURL}" alt="${t.tags}" />
      <div class="stats">
        <p>Likes: ${t.likes}</p>
        <p>Views: ${t.views}</p>
        <p>Comments: ${t.comments}</p>
        <p>Downloads: ${t.downloads}</p>
      </div>
    </a>
  `}function m(t){const o=t.map(p).join("");c.innerHTML=o,d.refresh()}function y(){c.innerHTML=""}function h(){document.querySelector(".loader").classList.add("visible")}function g(){document.querySelector(".loader").classList.remove("visible")}const L=document.querySelector(".form"),b=document.querySelector(".form-input");L.addEventListener("submit",async t=>{t.preventDefault();const o=b.value.trim();if(!o){a.info({title:"Info",message:"Please enter a search query!",position:"topCenter"});return}y(),h();try{const n=await f(o);if(n.hits.length===0){a.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"});return}m(n.hits)}catch(n){a.error({title:"Error",message:"Something went wrong. Try again later.",position:"topCenter"}),console.error("Fetch error:",n)}finally{g()}});
//# sourceMappingURL=index.js.map
