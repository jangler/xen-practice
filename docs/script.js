(()=>{var t=[["D"],["^D","Eb"],["vD#","^Eb"],["D#","vE"],["E"],["F"],["^F","Gb"],["vF#","^Gb"],["F#","vG"],["G"],["^G","Ab"],["vG#","^Ab"],["vA","G#"],["A"],["^A","Bb"],["vA#","^Bb"],["A#","vB"],["B"],["C"],["^C","Db"],["vC#","^Db"],["C#","vD"]];function s(e,n){for(;e<0;)e+=n;return e%n}var a=document.querySelector("#next"),b=document.querySelector("#prompt"),c=document.querySelector("#response"),l=document.querySelector("#evaluation"),o=[];function u(e){return Math.floor(Math.random()*e.length)}function i(e){return e[u(e)]}function d(e,n,r){return[`${i(t[e])} to ${i(t[n])} ${r?"ascending":"descending"}?`,[(r?s(n-e,t.length):s(e-n,t.length)).toString()]]}function v(e,n,r){return[`${s(r?n-e:e-n,t.length)} edosteps ${r?"above":"below"} ${i(t[e])}?`,t[n]]}var p=[d,v];function m(){let e=u(t),n=u(t);for(;n===e;)n=u(t);let r=Math.random()<.5;[b.innerText,o]=i(p)(e,n,r),l.innerText="",c.value=""}m();a.addEventListener("click",e=>{m(),setTimeout(()=>c.focus(),200)});c.addEventListener("keyup",e=>{e.key==="Enter"&&(l.innerText=o.includes(c.value)?"Correct.":o.length===1?`Incorrect. Answer was ${o[0]}.`:`Incorrect. Answers were ${o.join(",")}`,a.focus())});})();
