import{b as J,d as K,$ as D,e as C,o as y,c as h,f as S,s as Y,g as B,C as I,h as k,i as H,r as F,K as _,j as Q,t as ee,F as te,k as R,l as M,m as ie,n as A}from"./index.CJZ7dzK1.js";class ne{constructor(){this.cache=new Map,this.loadingPromises=new Map}loadScript(e){if(this.loadingPromises.has(e))return this.loadingPromises.get(e);const i=new Promise((t,n)=>{const o=h("script",{attributes:{src:e}});o.onload=()=>t(),o.onerror=()=>n(new Error(`Failed to load ${e}`)),document.head.appendChild(o)});return this.loadingPromises.set(e,i),i}loadStylesheet(e){if(this.loadingPromises.has(e))return this.loadingPromises.get(e);const i=new Promise((t,n)=>{const o=h("link",{attributes:{rel:"stylesheet",href:e}});o.onload=()=>t(),o.onerror=()=>n(new Error(`Failed to load ${e}`)),document.head.appendChild(o)});return this.loadingPromises.set(e,i),i}async mammoth(){if(this.cache.has("mammoth"))return this.cache.get("mammoth");await this.loadScript(A("mammoth"));const e=window.mammoth;return this.cache.set("mammoth",e),e}async xlsx(){if(this.cache.has("xlsx"))return this.cache.get("xlsx");await this.loadScript(A("xlsx"));const e=window.XLSX;return this.cache.set("xlsx",e),e}async pdfjs(){if(this.cache.has("pdfjs"))return this.cache.get("pdfjs");await Promise.all([this.loadScript(A("pdfjs","js")),this.loadScript(A("pdfjs","viewer")),this.loadStylesheet(A("pdfjs","viewerCss"))]);const e=window.pdfjsLib;return e.GlobalWorkerOptions.workerSrc=A("pdfjs","worker"),this.cache.set("pdfjs",e),this.cache.set("pdfjsViewer",window.pdfjsViewer),e}async pdfjsViewer(){return this.cache.has("pdfjsViewer")||await this.pdfjs(),this.cache.get("pdfjsViewer")}async jszip(){if(this.cache.has("jszip"))return this.cache.get("jszip");await this.loadScript(A("jszip"));const e=window.JSZip;return this.cache.set("jszip",e),e}async docx(){if(this.cache.has("docx"))return this.cache.get("docx");const e=A("docx");if(e.includes("esm.sh")){const t=await import(e);return this.cache.set("docx",t),t}await this.loadScript(e);const i=window.docx;return this.cache.set("docx",i),i}async jsPDF(){if(this.cache.has("jsPDF"))return this.cache.get("jsPDF");await this.loadScript(A("jspdf"));const e=window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF;if(!e)throw new Error("jsPDF failed to load");return this.cache.set("jsPDF",e),e}async html2canvas(){if(window.html2canvas)return window.html2canvas;const e=A("html2canvasPro");if(await new Promise((i,t)=>{const n=h("script",{attributes:{src:e}});n.onload=i,n.onerror=()=>t(new Error("html2canvas-pro failed to load")),document.head.appendChild(n)}),!window.html2canvas)throw new Error("html2canvas-pro failed to load");return window.html2canvas}}const E=new ne,v={getExtension(u){return!u||typeof u!="string"?"":u.includes(".")?"."+ie(u):""},escapeXml(u){return u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},mimeForExtension(u){return{".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".xls":"application/vnd.ms-excel",".odt":"application/vnd.oasis.opendocument.text",".pdf":"application/pdf",".odp":"application/vnd.oasis.opendocument.presentation",".csv":"text/csv",".txt":"text/plain",".html":"text/html"}[u]||"application/octet-stream"},isBinaryExtension(u){return[".docx",".xlsx",".xls",".odt",".pdf",".odp"].includes(u)},arrayBufferToBase64(u){const e=new Uint8Array(u),i=8192;let t="";for(let n=0;n<e.length;n+=i){const o=e.subarray(n,n+i);t+=String.fromCharCode.apply(null,o)}return btoa(t)},arrayBufferToDataUrl(u,e){const i=this.arrayBufferToBase64(u);return`data:${e};base64,${i}`},isBase64(u){if(!u||typeof u!="string")return!1;const e=/^[A-Za-z0-9+/]+=*$/;return u.length>100&&e.test(u.replace(/\s/g,""))},base64ToArrayBuffer(u){const e=atob(u),i=new Uint8Array(e.length);for(let t=0;t<e.length;t++)i[t]=e.charCodeAt(t);return i.buffer},async toArrayBuffer(u){return u instanceof ArrayBuffer?u:u instanceof Uint8Array?u.buffer:u instanceof Blob?u.arrayBuffer():typeof u=="string"?u.startsWith("data:")||u.startsWith("http")||u.startsWith("/")?(await fetch(u)).arrayBuffer():new TextEncoder().encode(u).buffer:null},colLabel(u){let e="",i=u;for(;i>=0;)e=String.fromCharCode(i%26+65)+e,i=Math.floor(i/26)-1;return e},odpUnitToPx(u){if(!u)return 0;const e=parseFloat(u);return u.endsWith("cm")?e*37.795:u.endsWith("mm")?e*3.7795:u.endsWith("in")?e*96:u.endsWith("pt")?e*1.333:e}};class z{static triggerUpload(e=!1){return new Promise(i=>{const t=h("input",{attributes:{type:"file",accept:".docx,.xlsx,.xls,.csv,.odt,.pdf,.odp,.txt,.html"}});t.multiple=e,S(t,{display:"none"}),t.addEventListener("change",async()=>{const n=Array.from(t.files);if(n.length===0){i([]),t.remove();return}const o=[];for(const s of n)try{const a=await s.arrayBuffer();o.push({name:s.name,arrayBuffer:a})}catch(a){console.error(`Error reading file ${s.name}:`,a)}i(o),t.remove()}),document.body.appendChild(t),t.click()})}static triggerDownload(e,i){let t;if(i instanceof Blob)t=i;else if(i instanceof Uint8Array||i instanceof ArrayBuffer){const s=v.getExtension(e);t=new Blob([i],{type:v.mimeForExtension(s)})}else typeof i=="string"?t=new Blob([i],{type:"text/plain"}):t=new Blob([i]);const n=URL.createObjectURL(t),o=h("a",{attributes:{href:n,download:e}});S(o,{display:"none"}),document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(n),o.remove()},1e3)}}class O{static collectStyles(e,i=!1){const t={},n=["font-weight","font-style","font-size","color","text-align","margin-left","margin-bottom","margin-top","background-color"];for(const o of e){if(!o)continue;const a=new DOMParser().parseFromString(o,"application/xml").getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style");for(let l=0;l<a.length;l++){const r=a[l],c=r.getAttribute("style:name");if(!c)continue;const d={},f=r.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","*");for(let m=0;m<f.length;m++)for(let g=0;g<f[m].attributes.length;g++){const b=f[m].attributes[g];n.includes(b.localName)&&(d[b.localName]=b.value)}const p=r.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties");for(let m=0;m<p.length;m++)p[m].getAttribute("style:text-underline-style")==="solid"&&(d["text-decoration"]="underline"),p[m].getAttribute("style:font-name")&&(d["font-family"]=p[m].getAttribute("style:font-name"));if(i){const m=r.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","graphic-properties");for(let g=0;g<m.length;g++)m[g].getAttribute("draw:fill-color")&&(d["background-color"]=m[g].getAttribute("draw:fill-color"))}t[c]=d}}return t}static styleStringFor(e,i){return!e||!i[e]?"":Object.entries(i[e]).map(([t,n])=>`${t}:${n}`).join(";")}}class V{static async loadPictures(e){const i={},t=e.folder("Pictures");if(!t)return i;const n=[];t.forEach((o,s)=>n.push({rp:o,file:s}));for(const o of n){const s=await o.file.async("blob");i["Pictures/"+o.rp]=URL.createObjectURL(s)}return i}}class q{static async toOdtBlob(e){const i=await E.jszip(),t=new i;t.file("mimetype","application/vnd.oasis.opendocument.text",{compression:"STORE"}),t.file("META-INF/manifest.xml",'<?xml version="1.0" encoding="UTF-8"?><manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"><manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.text"/><manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/></manifest:manifest>');const n=h("div",{html:e});let o="";const s=l=>{if(l.nodeType===3)return v.escapeXml(l.textContent);if(l.nodeType!==1)return"";const r=l.tagName.toLowerCase();let c="";for(const d of l.childNodes)c+=s(d);return r==="p"||r==="div"?`<text:p>${c}</text:p>`:r.match(/^h[1-6]$/)?`<text:h text:outline-level="${r[1]}">${c}</text:h>`:r==="ul"||r==="ol"?`<text:list>${c}</text:list>`:r==="li"?`<text:list-item><text:p>${c}</text:p></text:list-item>`:r==="br"?"<text:line-break/>":["b","strong","i","em","span","u"].includes(r)?`<text:span>${c}</text:span>`:c};for(const l of n.childNodes)o+=s(l);o||(o=`<text:p>${v.escapeXml(n.textContent||"")}</text:p>`),t.file("content.xml",`<?xml version="1.0" encoding="UTF-8"?><office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2"><office:body><office:text>${o}</office:text></office:body></office:document-content>`);const a=await t.generateAsync({type:"blob"});return new Uint8Array(await a.arrayBuffer())}static async toDocxParagraphs(e){const{Paragraph:i,TextRun:t,HeadingLevel:n,UnderlineType:o}=await E.docx(),s=h("div",{html:e}),a=[],l={1:n.HEADING_1,2:n.HEADING_2,3:n.HEADING_3,4:n.HEADING_4,5:n.HEADING_5,6:n.HEADING_6},r=d=>{const f=[],p=(m,g)=>{if(m.nodeType===3){if(m.textContent){const x={text:m.textContent};g.b&&(x.bold=!0),g.i&&(x.italics=!0),g.u&&(x.underline={type:o.SINGLE}),g.s&&(x.strike=!0),f.push(new t(x))}return}if(m.nodeType!==1)return;const b=m.tagName.toLowerCase(),w={...g};(b==="b"||b==="strong")&&(w.b=!0),(b==="i"||b==="em")&&(w.i=!0),b==="u"&&(w.u=!0),(b==="s"||b==="strike"||b==="del")&&(w.s=!0);for(const x of m.childNodes)p(x,w)};return p(d,{b:!1,i:!1,u:!1,s:!1}),f},c=d=>{if(d.nodeType===3){d.textContent.trim()&&a.push(new i({children:[new t(d.textContent)]}));return}if(d.nodeType!==1)return;const f=d.tagName.toLowerCase();if(f==="p"||f==="div")a.push(new i({children:r(d)}));else if(f.match(/^h[1-6]$/))a.push(new i({children:r(d),heading:l[parseInt(f[1])]}));else if(f==="ul"||f==="ol")for(const p of d.children)p.tagName.toLowerCase()==="li"&&a.push(new i({children:r(p),bullet:f==="ul"?{level:0}:void 0}));else for(const p of d.childNodes)c(p)};for(const d of s.childNodes)c(d);return a.length||a.push(new i({children:[new t(s.textContent||"")]})),a}}class W{static init(e,i,t){const n=h("div",{className:"office-toolbar"}),o=[{label:"B",cmd:"bold",cls:"office-toolbar__btn--bold"},{label:"I",cmd:"italic",cls:"office-toolbar__btn--italic"},{label:"U",cmd:"underline",cls:"office-toolbar__btn--underline"},{label:"S",cmd:"strikeThrough",cls:"office-toolbar__btn--strike"},{label:"UL",cmd:"insertUnorderedList",cls:""},{label:"OL",cmd:"insertOrderedList",cls:""},{label:"←",cmd:"justifyLeft",cls:""},{label:"↔",cmd:"justifyCenter",cls:""},{label:"→",cmd:"justifyRight",cls:""}],s=h("div",{className:"office-richtext-editor",html:i||""});s.contentEditable="true",o.forEach(r=>{const c=h("button",{text:r.label,className:`office-toolbar__btn ${r.cls}`});c.title=r.cmd,k(c,"mousedown",d=>{d.preventDefault(),document.execCommand(r.cmd,!1,null),s.focus()}),n.appendChild(c)});const a=h("select",{className:"office-toolbar__select"});["Serif","Sans-Serif","Monospace","Arial","Georgia","Times New Roman","Courier New"].forEach(r=>{const c=h("option",{text:r,attributes:{value:r}});a.appendChild(c)}),k(a,"change",()=>{document.execCommand("fontName",!1,a.value),s.focus()}),n.appendChild(a);const l=h("select",{className:"office-toolbar__select"});[1,2,3,4,5,6,7].forEach(r=>{const c=h("option",{text:r*4+8+"px",attributes:{value:String(r)}});r===3&&(c.selected=!0),l.appendChild(c)}),k(l,"change",()=>{document.execCommand("fontSize",!1,l.value),s.focus()}),n.appendChild(l),e.appendChild(n),e.appendChild(s),t.editor=s,t.editorType="contenteditable"}}class U{canHandle(){return!1}async init(){}}class Z extends U{canHandle(e){return[".xlsx",".xls",".csv"].includes(e)}async init(e,i,t){const n=await E.xlsx();let o=i;(!o||!(o instanceof ArrayBuffer))&&(console.warn("SpreadsheetEditor: Invalid buffer, creating empty workbook"),o=null);let s;if(o&&o.byteLength>0)try{const a=new Uint8Array(o);s=n.read(a,{type:"array"})}catch(a){console.error("XLSX read error:",a),s=this.createEmptyWorkbook(n)}else s=this.createEmptyWorkbook(n);t.workbook=s,t.activeSheet=s.SheetNames[0],this.renderNativeTable(e,s,t,n)}createEmptyWorkbook(e){const i=e.utils.book_new(),t=Array.from({length:50},()=>Array(26).fill(""));return e.utils.book_append_sheet(i,e.utils.aoa_to_sheet(t),"Sheet1"),i}renderNativeTable(e,i,t,n){const o=i.Sheets[t.activeSheet],s=n.utils.sheet_to_json(o,{header:1,defval:""});for(;s.length<50;)s.push([]);s.forEach(c=>{for(;c.length<26;)c.push("")});const a=Array.from({length:26},(c,d)=>String.fromCharCode(65+d));let l='<div class="office-sheet-wrapper">';l+=this.renderSheetTabs(i,t),l+='<div class="office-table-wrap"><table class="office-spreadsheet" cellspacing="0">',l+='<thead><tr><th class="office-th-corner"></th>',a.forEach(c=>{l+=`<th class="office-th-col">${c}</th>`}),l+="</tr></thead><tbody>",s.forEach((c,d)=>{l+=`<tr><th class="office-th-row">${d+1}</th>`,c.forEach((f,p)=>{const m=f!=null?String(f):"";l+=`<td class="office-cell" contenteditable="true" data-row="${d}" data-col="${p}">${m}</td>`}),l+="</tr>"}),l+="</tbody></table></div></div>",e.innerHTML=l;const r=e.querySelector(".office-spreadsheet");this.bindCellEvents(r,t,n),D(".office-sheet-tab",e).forEach(c=>{k(c,"click",()=>{t.activeSheet=c.dataset.sheet,this.renderNativeTable(e,i,t,n)})}),t.editor=r,t.editorType="spreadsheet"}renderSheetTabs(e,i){return e.SheetNames.length<=1?"":`<div class="office-sheet-tabs">
      ${e.SheetNames.map(t=>`
        <button class="office-sheet-tab ${t===i.activeSheet?"office-sheet-tab--active":""}"
                data-sheet="${t}">${t}</button>
      `).join("")}
    </div>`}bindCellEvents(e,i,t){let n=!1;e.addEventListener("input",()=>{n=!0}),e.addEventListener("blur",()=>{n&&(this.syncNativeTable(i,t),n=!1)},!0),e.addEventListener("keydown",o=>{if(o.key==="Enter"&&!o.shiftKey){o.preventDefault();const s=o.target.closest("td");s&&s.blur()}})}syncNativeTable(e,i){if(!e.editor||!e.workbook)return;const t=e.editor,n=[];t.querySelectorAll("tbody tr").forEach(o=>{const s=[];o.querySelectorAll("td").forEach(a=>{s.push(a.textContent)}),n.push(s)}),e.workbook.Sheets[e.activeSheet]=i.utils.aoa_to_sheet(n)}static async syncTable(e){const i=await E.xlsx();if(e.editorType!=="spreadsheet"||!e.editor)return;const t=[];e.editor.querySelectorAll("tbody tr").forEach(n=>{const o=[];n.querySelectorAll("td").forEach(s=>{o.push(s.textContent)}),t.push(o)}),e.workbook.Sheets[e.activeSheet]=i.utils.aoa_to_sheet(t)}}class oe extends U{canHandle(e){return e===".docx"}async init(e,i,t){let n="";if(i&&i.byteLength>0)try{n=(await(await E.mammoth()).convertToHtml({arrayBuffer:i})).value}catch(o){console.error("mammoth error:",o),n="<p>Error loading DOCX file.</p>"}W.init(e,n,t)}}class X extends U{canHandle(e){return e===".odt"}async init(e,i,t){if(t.editorType="odt-iframe",!i||i.byteLength===0){W.init(e,"",t);return}const n=h("div",{className:"office-odt-wrapper"});try{const s=await(await E.jszip()).loadAsync(i),a=await s.file("content.xml")?.async("string"),l=await s.file("styles.xml")?.async("string")||"";if(!a){n.innerHTML='<div class="office-info-msg">Nothing found in this ODT file</div>',e.appendChild(n),t.editor=n;return}const r=await V.loadPictures(s),c=X.renderContent(a,l,r),d=h("iframe",{className:"office-odt-iframe",attributes:{sandbox:"allow-same-origin"}});n.appendChild(d),e.appendChild(n);const f=d.contentDocument||d.contentWindow.document;f.open(),f.write(`<!DOCTYPE html><html><head><link rel="stylesheet" href="../styles/style.css"><link rel="stylesheet" href="../styles/office.css"></head><body class="office-odt-content">${c}</body></html>`),f.close(),t.editor=d,t.odtHtml=c}catch(o){n.innerHTML=`<div class="office-error-msg">Error loading ODT: ${o.message}</div>`,e.appendChild(n),t.editor=n}}static renderContent(e,i,t){const n=new DOMParser().parseFromString(e,"application/xml"),o=O.collectStyles([e,i]),s=r=>O.styleStringFor(r,o),a=r=>{if(!r)return"";let c="";for(let d=0;d<r.childNodes.length;d++){const f=r.childNodes[d];if(f.nodeType===3){c+=M(f.textContent);continue}if(f.nodeType!==1)continue;const p=f.localName,m=f.getAttribute("text:style-name")||f.getAttribute("table:style-name")||"",g=s(m),b=g?` style="${g}"`:"";switch(p){case"h":{const w=Math.min(parseInt(f.getAttribute("text:outline-level")||"1"),6);c+=`<h${w}${b}>${a(f)}</h${w}>`;break}case"p":c+=`<p${b}>${a(f)||"&nbsp;"}</p>`;break;case"span":c+=`<span${b}>${a(f)}</span>`;break;case"a":c+=`<a href="${M(f.getAttribute("xlink:href")||"#")}"${b}>${a(f)}</a>`;break;case"list":c+=`<ul${b}>${a(f)}</ul>`;break;case"list-item":c+=`<li>${a(f)}</li>`;break;case"tab":c+="&emsp;";break;case"line-break":c+="<br>";break;case"s":c+="&nbsp;".repeat(parseInt(f.getAttribute("text:c")||"1"));break;case"table":c+=`<table${b}>${a(f)}</table>`;break;case"table-row":c+=`<tr>${a(f)}</tr>`;break;case"table-cell":{let w=b;const x=f.getAttribute("table:number-columns-spanned"),T=f.getAttribute("table:number-rows-spanned");x&&(w+=` colspan="${x}"`),T&&(w+=` rowspan="${T}"`),c+=`<td${w}>${a(f)}</td>`;break}case"frame":{const w=f.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","image")[0]||f.querySelector("image");if(w){const x=w.getAttribute("xlink:href"),T=x&&t[x]?t[x]:"",L=f.getAttribute("svg:width")||"",$=f.getAttribute("svg:height")||"";let j="max-width:100%;";L&&(j+=`width:${L};`),$&&(j+=`height:${$};`),c+=T?`<img src="${T}" style="${j}">`:'<span style="color:var(--text-muted);">[image]</span>'}else c+=a(f);break}default:c+=a(f);break}}return c},l=n.getElementsByTagName("office:body")[0];return a(l||n.documentElement)}}const N=[.25,.35,.5,.65,.8,.9,1,1.1,1.25,1.5,1.75,2,2.5,3,3.5,4,5],G=N.indexOf(1.5);class se extends U{renderToken=0;canHandle(e){return e===".pdf"}findNearestZoomIndex(e){let i=G,t=Math.abs(N[i]-e);for(let n=0;n<N.length;n++){const o=Math.abs(N[n]-e);o<t&&(t=o,i=n)}return i}updateZoomControls(e){const i=N[e.pdfZoomIndex];e.pdfZoomLabel&&(e.pdfZoomLabel.textContent=`${Math.round(i*100)}%`),e.pdfZoomOutBtn&&(e.pdfZoomOutBtn.disabled=e.pdfZoomIndex<=0),e.pdfZoomInBtn&&(e.pdfZoomInBtn.disabled=e.pdfZoomIndex>=N.length-1)}async renderPdfPages(e,i,t,n,o){const s=t.pdfViewerEl,a=t.pdfInfoEl;if(!s)return;if(o)try{const r=await e.getPage(1);if(n!==this.renderToken)return;const c=r.getViewport({scale:1}),d=s.clientWidth-20;if(d>0&&c.width>0){const f=d/c.width;t.pdfZoomIndex=this.findNearestZoomIndex(f)}}catch{}if(n!==this.renderToken)return;const l=N[t.pdfZoomIndex];this.updateZoomControls(t),s.innerHTML="",a&&(a.textContent=`PDF - ${e.numPages} page(s)`,s.appendChild(a));for(let r=1;r<=e.numPages;r++){if(n!==this.renderToken)return;const c=await e.getPage(r);if(n!==this.renderToken)return;const d=c.getViewport({scale:l}),f=h("div",{className:"office-pdf-page"}),p=h("canvas",{className:"office-pdf-canvas"});if(p.width=d.width,p.height=d.height,await c.render({canvasContext:p.getContext("2d"),viewport:d}).promise,n!==this.renderToken)return;f.appendChild(p);const m=await c.getTextContent();if(n!==this.renderToken)return;const g=h("div",{className:"office-pdf-text-layer"});for(const w of m.items){if(!w.str)continue;const x=i.Util.transform(d.transform,w.transform),T=h("span",{className:"office-pdf-text-span",text:w.str});T.style.left=`${x[4]}px`,T.style.top=`${x[5]}px`,T.style.fontSize=`${Math.abs(x[0])}px`,g.appendChild(T)}f.appendChild(g),s.appendChild(f);const b=h("div",{className:"office-pdf-page-label",text:`Page ${r} of ${e.numPages}`});s.appendChild(b)}}async printPdf(e){const i=e.pdfDoc;if(!i){y.notify.send("Print","No PDF loaded to print");return}try{const t=[];for(let a=1;a<=i.numPages;a++){const l=await i.getPage(a),r=l.getViewport({scale:2}),c=h("canvas");c.width=r.width,c.height=r.height,await l.render({canvasContext:c.getContext("2d"),viewport:r}).promise,t.push(c.toDataURL("image/png"))}const n=window.open("","","width=800,height=600");if(!n){y.notify.send("Print blocked","Allow popups to print this PDF",{type:"warning"});return}const o=String(e.title||"PDF").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),s=t.map(a=>`<img class="office-print-page" src="${a}">`).join("");n.document.write(`<!DOCTYPE html><html><head><title>${o}</title><style>body{margin:0}img.office-print-page{width:100%;display:block;margin:0 auto;page-break-after:always}</style></head><body>${s}<script>window.onload=function(){window.print();}<\/script></body></html>`),n.document.close(),n.focus()}catch(t){y.notify.send("Print failed",String(t&&t.message?t.message:t),{type:"error"})}}async init(e,i,t){t.editorType="pdf",this.renderToken+=1;const n=this.renderToken;if(t.pdfDoc){try{await t.pdfDoc.destroy()}catch{}t.pdfDoc=null}try{const o=await E.pdfjs();if(n!==this.renderToken)return;const s=await o.getDocument({data:new Uint8Array(i)}).promise;if(n!==this.renderToken){try{await s.destroy()}catch{}return}t.pdfDoc=s;try{const b=await s.getMetadata(),w=b&&b.info&&b.info.Title;w&&(t.title=w,t.winId&&y.window.setTitle(t.winId,`${w} - Office`))}catch{}t.pdfZoomIndex=G,e.innerHTML="";const a=h("div",{className:"office-pdf-root"}),l=h("div",{className:"office-pdf-toolbar"}),r=h("button",{className:"office-pdf-btn",text:"-"});r.title="Zoom out",r.setAttribute("aria-label","Zoom out");const c=h("span",{className:"office-pdf-zoom-label",text:"150%"}),d=h("button",{className:"office-pdf-btn",text:"+"});d.title="Zoom in",d.setAttribute("aria-label","Zoom in");const f=h("button",{className:"office-pdf-btn",text:"Fit"});f.title="Fit to width",f.setAttribute("aria-label","Fit to width");const p=h("button",{className:"office-pdf-btn",text:"Print"});p.title="Print",p.setAttribute("aria-label","Print"),l.appendChild(r),l.appendChild(c),l.appendChild(d),l.appendChild(f),l.appendChild(p);const m=h("div",{className:"office-pdf-viewer"}),g=h("div",{className:"office-pdf-info",text:`PDF - ${s.numPages} page(s)`});m.appendChild(g),a.appendChild(l),a.appendChild(m),e.appendChild(a),t.editor=a,t.pdfViewerEl=m,t.pdfInfoEl=g,t.pdfZoomLabel=c,t.pdfZoomOutBtn=r,t.pdfZoomInBtn=d,k(r,"click",()=>{t.pdfZoomIndex>0&&(t.pdfZoomIndex-=1,this.renderToken+=1,this.renderPdfPages(s,o,t,this.renderToken,!1))}),k(d,"click",()=>{t.pdfZoomIndex<N.length-1&&(t.pdfZoomIndex+=1,this.renderToken+=1,this.renderPdfPages(s,o,t,this.renderToken,!1))}),k(f,"click",async()=>{try{const w=(await s.getPage(1)).getViewport({scale:1}),x=m.clientWidth-20;if(x>0&&w.width>0){const T=x/w.width;t.pdfZoomIndex=this.findNearestZoomIndex(T),this.renderToken+=1,this.renderPdfPages(s,o,t,this.renderToken,!1)}}catch{}}),k(p,"click",()=>{this.printPdf(t)}),await this.renderPdfPages(s,o,t,n,!0)}catch(o){if(n!==this.renderToken)return;e.innerHTML=`<div class="office-error-msg">Error rendering PDF: ${o.message}</div>`}}}class P extends U{canHandle(e){return e===".odp"}async init(e,i,t){t.editorType="presentation";try{const o=await(await E.jszip()).loadAsync(i),s=await o.file("content.xml")?.async("string");if(!s){e.innerHTML='<div class="office-info-msg">Nothing found in this ODP file</div>';return}const a=await o.file("styles.xml")?.async("string")||"",l=await V.loadPictures(o),r=new DOMParser().parseFromString(s,"application/xml"),c=O.collectStyles([s,a],!0),f=r.getElementsByTagName("office:body")[0]?.getElementsByTagName("office:presentation")[0];if(!f){e.innerHTML='<div class="office-info-msg">No presentation content in ODP.</div>';return}const p=f.getElementsByTagName("draw:page"),m=h("div",{className:"office-presentation-viewer"}),g=h("div",{className:"office-presentation-info",text:`Presentation - ${p.length} slide(s)`});m.appendChild(g);for(let b=0;b<p.length;b++){const w=P.renderSlide(p[b],c,l),x=h("div",{className:"office-slide-wrapper"}),T=h("div",{className:"office-slide-content",html:w});x.appendChild(T);const L=h("div",{className:"office-slide-label",text:`Slide ${b+1} of ${p.length}`});m.appendChild(x),m.appendChild(L)}e.innerHTML="",e.appendChild(m),t.editor=m}catch(n){e.innerHTML=`<div class="office-error-msg">Error loading ODP: ${n.message}</div>`}}static renderSlide(e,i,t){let n="";const s=1.0000072917198355,a=540/(19.05*37.795);for(let l=0;l<e.childNodes.length;l++){const r=e.childNodes[l];if(r.nodeType!==1)continue;const c=r.localName;if(c!=="frame"&&c!=="custom-shape")continue;const d=v.odpUnitToPx(r.getAttribute("svg:x")||"0cm")*s,f=v.odpUnitToPx(r.getAttribute("svg:y")||"0cm")*a,p=v.odpUnitToPx(r.getAttribute("svg:width")||"10cm")*s,m=v.odpUnitToPx(r.getAttribute("svg:height")||"5cm")*a,g=r.getAttribute("draw:style-name")||"",b=i[g]?.["background-color"]?`background-color:${i[g]["background-color"]};`:"",w=r.getElementsByTagName("draw:image")[0];if(w){const $=w.getAttribute("xlink:href"),j=$&&t[$]?t[$]:null;j&&(n+=`<div style="position:absolute;left:${d}px;top:${f}px;width:${p}px;height:${m}px;"><img src="${j}" style="width:100%;height:100%;object-fit:contain;"></div>`);continue}const x=r.getElementsByTagName("draw:text-box")[0],T=r.getElementsByTagName("text:p"),L=x||(T.length>0?r:null);if(L){const $=P.renderText(L,i);n+=`<div style="position:absolute;left:${d}px;top:${f}px;width:${p}px;height:${m}px;overflow:hidden;padding:4px;box-sizing:border-box;${b}">${$}</div>`}}return n}static renderText(e,i){let t="";for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(o.nodeType===3){t+=M(o.textContent);continue}if(o.nodeType!==1)continue;const s=o.localName,a=o.getAttribute("text:style-name")||"",l=O.styleStringFor(a,i);s==="p"?t+=`<div style="margin:1px 0;${l}">${P.renderText(o,i)||"&nbsp;"}</div>`:s==="span"?t+=`<span style="${l}">${P.renderText(o,i)}</span>`:s==="list"?t+=`<ul style="margin:0;padding-left:1.5em;">${P.renderText(o,i)}</ul>`:s==="list-item"?t+=`<li>${P.renderText(o,i)}</li>`:s==="tab"?t+="&emsp;":s==="line-break"?t+="<br>":s==="s"?t+="&nbsp;".repeat(parseInt(o.getAttribute("text:c")||"1")):s==="a"?t+=`<a href="${M(o.getAttribute("xlink:href")||"#")}">${P.renderText(o,i)}</a>`:t+=P.renderText(o,i)}return t}}class ae extends U{canHandle(){return!0}async init(e,i,t){const n=i?new TextDecoder().decode(i):"";W.init(e,n,t)}}class re{constructor(){this.strategies=[]}register(e){this.strategies.push(e)}getStrategy(e){return this.strategies.find(i=>i.canHandle(e))||null}}class le extends J{constructor(e){super(e),this.fs=e.fs,this.idleTimer=null,this.idleDelay=15e3,this.editors={},this.registry=new re,this.registry.register(new Z),this.registry.register(new oe),this.registry.register(new X),this.registry.register(new se),this.registry.register(new P),this.registry.register(new ae)}get explorerApp(){return this.explorerAppService||(this.explorerAppService=this.getService(K.EXPLORER)),this.explorerAppService}open(e="Untitled",i=null,t=null){let n="Untitled",o={};e&&typeof e=="object"&&!Array.isArray(e)?(o=e,n=o.title||"Untitled",i=o.content||null,t=o.filePath||null):n=e||"Untitled";const s=String(n).replace(/[^a-zA-Z0-9.-]/g,"_"),a=D('[id^="office-"]');for(const g of a){const b=C(".window-header span",g);if(b&&b.textContent===`${n} - Office`){y.window.focus(g);return}}const l=o.forceId||`office-${s}-${Date.now()}`,r=v.getExtension(typeof t=="string"?t:n),c=`
<div class="app-menubar">
  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">File</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="new">
        <span class="office-menu-item__icon"><i class="fas fa-file"></i></span>
        <span class="office-menu-item__label">New</span>
        <span class="office-menu-item__shortcut">Ctrl+N</span>
      </button>
      <button class="office-menu-item" data-action="open">
        <span class="office-menu-item__icon"><i class="fas fa-folder-open"></i></span>
        <span class="office-menu-item__label">Open</span>
        <span class="office-menu-item__shortcut">Ctrl+O</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="save">
        <span class="office-menu-item__icon"><i class="fas fa-save"></i></span>
        <span class="office-menu-item__label">Save</span>
        <span class="office-menu-item__shortcut">Ctrl+S</span>
      </button>
      <button class="office-menu-item" data-action="saveAs">
        <span class="office-menu-item__icon"><i class="fas fa-save"></i></span>
        <span class="office-menu-item__label">Save As...</span>
        <span class="office-menu-item__shortcut">Ctrl+Shift+S</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="download">
        <span class="office-menu-item__icon"><i class="fas fa-download"></i></span>
        <span class="office-menu-item__label">Download</span>
        <span class="office-menu-item__shortcut"></span>
      </button>
      <div class="office-menu-submenu">
        <button class="office-menu-item office-menu-item--has-submenu">
          <span class="office-menu-item__icon"><i class="fas fa-file-export"></i></span>
          <span class="office-menu-item__label">Export As</span>
          <span class="office-menu-item__arrow"><i class="fas fa-caret-right"></i></span>
        </button>
        <div class="office-menu-submenu__content">
          <button class="office-menu-item" data-action="exportPDF">
            <span class="office-menu-item__icon"><i class="fas fa-file-pdf"></i></span>
            <span class="office-menu-item__label">PDF Document</span>
          </button>
          <button class="office-menu-item" data-action="exportHTML">
            <span class="office-menu-item__icon"><i class="fas fa-file-code"></i></span>
            <span class="office-menu-item__label">HTML Page</span>
          </button>
          <button class="office-menu-item" data-action="exportTXT">
            <span class="office-menu-item__icon"><i class="fas fa-file-alt"></i></span>
            <span class="office-menu-item__label">Plain Text</span>
          </button>
        </div>
      </div>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="print">
        <span class="office-menu-item__icon"><i class="fas fa-print"></i></span>
        <span class="office-menu-item__label">Print</span>
        <span class="office-menu-item__shortcut">Ctrl+P</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Edit</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="undo">
        <span class="office-menu-item__icon"><i class="fas fa-undo"></i></span>
        <span class="office-menu-item__label">Undo</span>
        <span class="office-menu-item__shortcut">Ctrl+Z</span>
      </button>
      <button class="office-menu-item" data-action="redo">
        <span class="office-menu-item__icon"><i class="fas fa-redo"></i></span>
        <span class="office-menu-item__label">Redo</span>
        <span class="office-menu-item__shortcut">Ctrl+Y</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="cut">
        <span class="office-menu-item__icon"><i class="fas fa-cut"></i></span>
        <span class="office-menu-item__label">Cut</span>
        <span class="office-menu-item__shortcut">Ctrl+X</span>
      </button>
      <button class="office-menu-item" data-action="copy">
        <span class="office-menu-item__icon"><i class="fas fa-copy"></i></span>
        <span class="office-menu-item__label">Copy</span>
        <span class="office-menu-item__shortcut">Ctrl+C</span>
      </button>
      <button class="office-menu-item" data-action="paste">
        <span class="office-menu-item__icon"><i class="fas fa-paste"></i></span>
        <span class="office-menu-item__label">Paste</span>
        <span class="office-menu-item__shortcut">Ctrl+V</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="selectAll">
        <span class="office-menu-item__icon"><i class="fas fa-border-all"></i></span>
        <span class="office-menu-item__label">Select All</span>
        <span class="office-menu-item__shortcut">Ctrl+A</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="find">
        <span class="office-menu-item__icon"><i class="fas fa-search"></i></span>
        <span class="office-menu-item__label">Find</span>
        <span class="office-menu-item__shortcut">Ctrl+F</span>
      </button>
      <button class="office-menu-item" data-action="replace">
        <span class="office-menu-item__icon"><i class="fas fa-exchange-alt"></i></span>
        <span class="office-menu-item__label">Find & Replace</span>
        <span class="office-menu-item__shortcut">Ctrl+H</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">View</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="zoomIn">
        <span class="office-menu-item__icon"><i class="fas fa-search-plus"></i></span>
        <span class="office-menu-item__label">Zoom In</span>
        <span class="office-menu-item__shortcut">Ctrl++</span>
      </button>
      <button class="office-menu-item" data-action="zoomOut">
        <span class="office-menu-item__icon"><i class="fas fa-search-minus"></i></span>
        <span class="office-menu-item__label">Zoom Out</span>
        <span class="office-menu-item__shortcut">Ctrl+-</span>
      </button>
      <button class="office-menu-item" data-action="zoomReset">
        <span class="office-menu-item__icon"><i class="fas fa-search"></i></span>
        <span class="office-menu-item__label">Reset Zoom</span>
        <span class="office-menu-item__shortcut">Ctrl+0</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="fullscreen">
        <span class="office-menu-item__icon"><i class="fas fa-expand"></i></span>
        <span class="office-menu-item__label">Fullscreen</span>
        <span class="office-menu-item__shortcut">F11</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="toggleGrid">
        <span class="office-menu-item__icon"><i class="fas fa-border-all"></i></span>
        <span class="office-menu-item__label">Show Gridlines</span>
        <span class="office-menu-item__check"><i class="fas fa-check"></i></span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Insert</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item office-menu-item--document" data-action="insertImage">
        <span class="office-menu-item__icon"><i class="fas fa-image"></i></span>
        <span class="office-menu-item__label">Image</span>
      </button>
      <button class="office-menu-item office-menu-item--document" data-action="insertTable">
        <span class="office-menu-item__icon"><i class="fas fa-table"></i></span>
        <span class="office-menu-item__label">Table</span>
      </button>
      <button class="office-menu-item office-menu-item--document" data-action="insertLink">
        <span class="office-menu-item__icon"><i class="fas fa-link"></i></span>
        <span class="office-menu-item__label">Link</span>
        <span class="office-menu-item__shortcut">Ctrl+K</span>
      </button>
      <button class="office-menu-item office-menu-item--document" data-action="insertHR">
        <span class="office-menu-item__icon"><i class="fas fa-minus"></i></span>
        <span class="office-menu-item__label">Horizontal Line</span>
      </button>
      <div class="office-menu-divider office-menu-item--spreadsheet"></div>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="addRow">
        <span class="office-menu-item__icon"><i class="fas fa-plus"></i></span>
        <span class="office-menu-item__label">Row</span>
      </button>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="addColumn">
        <span class="office-menu-item__icon"><i class="fas fa-plus"></i></span>
        <span class="office-menu-item__label">Column</span>
      </button>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="addSheet">
        <span class="office-menu-item__icon"><i class="fas fa-file-alt"></i></span>
        <span class="office-menu-item__label">New Sheet</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Format</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="formatBold">
        <span class="office-menu-item__icon"><i class="fas fa-bold"></i></span>
        <span class="office-menu-item__label">Bold</span>
        <span class="office-menu-item__shortcut">Ctrl+B</span>
      </button>
      <button class="office-menu-item" data-action="formatItalic">
        <span class="office-menu-item__icon"><i class="fas fa-italic"></i></span>
        <span class="office-menu-item__label">Italic</span>
        <span class="office-menu-item__shortcut">Ctrl+I</span>
      </button>
      <button class="office-menu-item" data-action="formatUnderline">
        <span class="office-menu-item__icon"><i class="fas fa-underline"></i></span>
        <span class="office-menu-item__label">Underline</span>
        <span class="office-menu-item__shortcut">Ctrl+U</span>
      </button>
      <button class="office-menu-item" data-action="formatStrike">
        <span class="office-menu-item__icon"><i class="fas fa-strikethrough"></i></span>
        <span class="office-menu-item__label">Strikethrough</span>
      </button>
      <div class="office-menu-divider"></div>
      <div class="office-menu-submenu">
        <button class="office-menu-item office-menu-item--has-submenu">
          <span class="office-menu-item__icon"><i class="fas fa-paragraph"></i></span>
          <span class="office-menu-item__label">Paragraph</span>
          <span class="office-menu-item__arrow"><i class="fas fa-caret-right"></i></span>
        </button>
        <div class="office-menu-submenu__content">
          <button class="office-menu-item" data-action="alignLeft">
            <span class="office-menu-item__icon"><i class="fas fa-align-left"></i></span>
            <span class="office-menu-item__label">Align Left</span>
          </button>
          <button class="office-menu-item" data-action="alignCenter">
            <span class="office-menu-item__icon"><i class="fas fa-align-center"></i></span>
            <span class="office-menu-item__label">Align Center</span>
          </button>
          <button class="office-menu-item" data-action="alignRight">
            <span class="office-menu-item__icon"><i class="fas fa-align-right"></i></span>
            <span class="office-menu-item__label">Align Right</span>
          </button>
          <button class="office-menu-item" data-action="alignJustify">
            <span class="office-menu-item__icon"><i class="fas fa-align-justify"></i></span>
            <span class="office-menu-item__label">Justify</span>
          </button>
        </div>
      </div>
      <div class="office-menu-submenu">
        <button class="office-menu-item office-menu-item--has-submenu">
          <span class="office-menu-item__icon"><i class="fas fa-heading"></i></span>
          <span class="office-menu-item__label">Heading</span>
          <span class="office-menu-item__arrow"><i class="fas fa-caret-right"></i></span>
        </button>
        <div class="office-menu-submenu__content">
          <button class="office-menu-item" data-action="heading1">
            <span class="office-menu-item__label" style="font-size:18px;font-weight:bold">Heading 1</span>
          </button>
          <button class="office-menu-item" data-action="heading2">
            <span class="office-menu-item__label" style="font-size:16px;font-weight:bold">Heading 2</span>
          </button>
          <button class="office-menu-item" data-action="heading3">
            <span class="office-menu-item__label" style="font-size:14px;font-weight:bold">Heading 3</span>
          </button>
          <button class="office-menu-item" data-action="paragraph">
            <span class="office-menu-item__label">Normal Text</span>
          </button>
        </div>
      </div>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="clearFormat">
        <span class="office-menu-item__icon"><i class="fas fa-eraser"></i></span>
        <span class="office-menu-item__label">Clear Formatting</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Tools</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="spellCheck">
        <span class="office-menu-item__icon"><i class="fas fa-check"></i></span>
        <span class="office-menu-item__label">Spell Check</span>
      </button>
      <button class="office-menu-item" data-action="wordCount">
        <span class="office-menu-item__icon"><i class="fas fa-list-ol"></i></span>
        <span class="office-menu-item__label">Word Count</span>
      </button>
      <div class="office-menu-divider office-menu-item--spreadsheet"></div>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="sortAsc">
        <span class="office-menu-item__icon"><i class="fas fa-sort-alpha-down"></i></span>
        <span class="office-menu-item__label">Sort A → Z</span>
      </button>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="sortDesc">
        <span class="office-menu-item__icon"><i class="fas fa-sort-alpha-up"></i></span>
        <span class="office-menu-item__label">Sort Z → A</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Help</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="shortcuts">
        <span class="office-menu-item__icon"><i class="fas fa-keyboard"></i></span>
        <span class="office-menu-item__label">Keyboard Shortcuts</span>
      </button>
      <button class="office-menu-item" data-action="about">
        <span class="office-menu-item__icon"><i class="fas fa-info-circle"></i></span>
        <span class="office-menu-item__label">About</span>
      </button>
    </div>
  </div>
</div>
      <div class="office-window-content">
        <div class="office-editor-area">
          <div class="office-loading-indicator">Loading...</div>
        </div>
      </div>
    `,d=y.window.create(l,`${n} - Office`,o.width||"800px",o.height||"600px",{icon:"static/icons/office.webp",style:{left:"200px",top:"100px",...o.style||{}}}),f=h("div",{className:"window-content"});S(f,{width:"100%",height:"100%",overflow:"hidden"}),f.innerHTML=c,d.appendChild(f);const p=C(".office-editor-area",d),m={winId:l,title:n,filePath:t,ext:r,editor:null,workbook:null,activeSheet:null,editorType:null,rawArrayBuffer:null};this.setupMenuBar(d,m),this.editors[l]=m,this.setupMenuActions(d,m),i!==null?this.initEditor(p,i,m,d).catch(g=>{console.error("Editor init error:",g),Y(p,`<div class="office-error-msg">Error loading file: ${g.message}</div>`)}):(C(".office-loading-indicator",p)?.remove(),this.showDropZone(p,m,d))}async saveFilesToDocuments(e){if(!this.fs||!e||e.length===0)return[];const i=["Documents"];await y.fs.mkdir(i);const t=[];for(const n of e)try{const o=v.getExtension(n.name),s=v.mimeForExtension(o);let a;v.isBinaryExtension(o)?a=v.arrayBufferToDataUrl(n.arrayBuffer,s):a=new TextDecoder().decode(n.arrayBuffer),await y.fs.write([...i,n.name],a),t.push({name:n.name,path:i,arrayBuffer:n.arrayBuffer})}catch(o){console.error(`Error saving ${n.name}:`,o)}if(t.length>0){const n=t.map(o=>o.name).join(", ");y.notify.send(`Saved to Documents as ${n}`),B(t.length===1?"All saved to your Documents folder!":`I've saved ${t.length} files to your Documents folder!`,I.Greeting)}return t}showDropZone(e,i,t){const n=h("div",{className:"office-dropzone",html:`
    <div class="office-dropzone__icon"><i class="fas fa-file-upload fa-3x"></i></div>
    <div class="office-dropzone__title">Drop file(s) here or click to upload</div>
    <div class="office-dropzone__subtitle">Supports: DOCX, XLSX, XLS, CSV, ODT, PDF, ODP, TXT, HTML (Multiple files supported)</div>
  `});k(n,"dragover",o=>{o.preventDefault(),o.stopPropagation(),H(n,"office-dropzone--active")}),k(n,"dragleave",o=>{o.preventDefault(),o.stopPropagation(),F(n,"office-dropzone--active")}),k(n,"drop",async o=>{o.preventDefault(),o.stopPropagation(),F(n,"office-dropzone--active");const s=Array.from(o.dataTransfer.files);s.length>0&&await this.handleMultipleFiles(s,e,i,t)}),k(n,"click",async()=>{const o=await z.triggerUpload(!0);o.length>0&&await this.handleUploadedFiles(o,e,i,t)}),e.appendChild(n)}async handleMultipleFiles(e,i,t,n){const o=[];for(const s of e)try{const a=await s.arrayBuffer();o.push({name:s.name,arrayBuffer:a})}catch(a){console.error(`Error reading file ${s.name}:`,a)}await this.handleUploadedFiles(o,i,t,n)}async handleUploadedFiles(e,i,t,n){if(e.length===0)return;const o=await this.saveFilesToDocuments(e);if(o.length>0){const s=o[0];this.applyFileToState(s.name,t,n),t.filePath=s.path,await this.replaceEditorContent(i,s.arrayBuffer,t,n);for(let a=1;a<o.length;a++){const l=o[a];this.open(l.name,l.arrayBuffer,l.path)}}}applyFileToState(e,i,t){i.title=e,i.ext=v.getExtension(e),y.window.setTitle(t.id,`${e} - Office`)}async replaceEditorContent(e,i,t,n){e.innerHTML="";const o=h("div",{className:"office-loading-indicator",text:"Loading..."});e.appendChild(o),await this.initEditor(e,i,t,n)}async initEditor(e,i,t,n){let o=await v.toArrayBuffer(i);if(!o&&t.ext&&t.filePath){const a=t.ext.toLowerCase();if([".pdf",".docx",".xlsx",".xls",".pptx",".ppt"].includes(a))try{const l=await y.fs.read([...t.filePath,t.title]);l&&(o=await l.arrayBuffer())}catch(l){console.error("Error loading from binary storage:",l)}}o&&(t.rawArrayBuffer=o),C(".office-loading-indicator",e)?.remove();const s=this.registry.getStrategy(t.ext);s&&await s.init(e,o,t),this.setupIdleDetection(n,t.ext)}setupMenuActions(e,i){const t={new:()=>this.createNewFile(e,i),open:()=>this.openFileViaUpload(e,i),save:()=>this.saveFile(e,i),saveAs:()=>this.saveAsFile(i),download:()=>this.downloadFile(i),exportPDF:()=>this.exportToPDF(i),exportHTML:()=>this.exportToHTML(i),exportTXT:()=>this.exportToTXT(i),print:()=>this.printDocument(e,i),cut:()=>this.cutToClipboard(i),copy:()=>this.copyToClipboard(i),paste:()=>this.pasteFromClipboard(i),undo:()=>this.executeCommand("undo",i),redo:()=>this.executeCommand("redo",i),selectAll:()=>this.executeCommand("selectAll",i),find:()=>this.showFindDialog(e,i),replace:()=>this.showReplaceDialog(e,i),zoomIn:()=>this.adjustZoom(e,i,1.1),zoomOut:()=>this.adjustZoom(e,i,.9),zoomReset:()=>this.resetZoom(e,i),fullscreen:()=>this.toggleFullscreen(e),toggleGrid:()=>this.toggleGrid(e,i),insertImage:()=>this.insertImage(i),insertTable:()=>this.insertTable(i),insertLink:()=>this.insertLink(i),insertHR:()=>this.executeCommand("insertHorizontalRule",i),addRow:()=>this.addSpreadsheetRow(i),addColumn:()=>this.addSpreadsheetColumn(i),addSheet:()=>this.addSpreadsheetSheet(i),formatBold:()=>this.executeCommand("bold",i),formatItalic:()=>this.executeCommand("italic",i),formatUnderline:()=>this.executeCommand("underline",i),formatStrike:()=>this.executeCommand("strikeThrough",i),alignLeft:()=>this.executeCommand("justifyLeft",i),alignCenter:()=>this.executeCommand("justifyCenter",i),alignRight:()=>this.executeCommand("justifyRight",i),alignJustify:()=>this.executeCommand("justifyFull",i),heading1:()=>this.formatBlock("h1",i),heading2:()=>this.formatBlock("h2",i),heading3:()=>this.formatBlock("h3",i),paragraph:()=>this.formatBlock("p",i),clearFormat:()=>this.executeCommand("removeFormat",i),spellCheck:()=>this.spellCheck(i),wordCount:()=>this.showWordCount(e,i),sortAsc:()=>this.sortSpreadsheet(i,!0),sortDesc:()=>this.sortSpreadsheet(i,!1),shortcuts:()=>this.showShortcuts(e),about:()=>this.showAbout(e)};D(".office-menu-item[data-action]",e).forEach(n=>{const o=t[n.dataset.action];o&&k(n,"click",s=>{s.stopPropagation(),D(".office-menu-dropdown",e).forEach(a=>F(a,"active")),o()})}),this.setupKeyboardShortcuts(e,i,t)}async sortSpreadsheet(e,i=!0){if(e.editorType!=="spreadsheet"||!e.editor){y.notify.send("Sorting only works in spreadsheets");return}const n=e.editor.querySelector("tbody");if(!n)return;const o=Array.from(n.querySelectorAll("tr"));if((o[0]?.querySelectorAll("td").length||0)===0)return;const a=0;o.sort((c,d)=>{const f=c.querySelectorAll("td")[a]?.textContent||"",p=d.querySelectorAll("td")[a]?.textContent||"",m=parseFloat(f),g=parseFloat(p);return!isNaN(m)&&!isNaN(g)?i?m-g:g-m:i?f.localeCompare(p):p.localeCompare(f)}).forEach(c=>n.appendChild(c));const r=await E.xlsx();this.syncNativeTable(e,r)}setupKeyboardShortcuts(e,i,t){e.addEventListener("keydown",n=>{_.matches(n,"office.new")?(n.preventDefault(),t.new()):_.matches(n,"office.open")?(n.preventDefault(),t.open()):_.matches(n,"office.save")?(n.preventDefault(),t.save()):_.matches(n,"office.saveAs")?(n.preventDefault(),t.saveAs()):_.matches(n,"office.print")?(n.preventDefault(),t.print()):_.matches(n,"office.undo")?(n.preventDefault(),t.undo()):_.matches(n,"office.redo")?(n.preventDefault(),t.redo()):_.matches(n,"office.cut")?(n.preventDefault(),t.cut()):_.matches(n,"office.copy")?(n.preventDefault(),t.copy()):_.matches(n,"office.selectAll")?(n.preventDefault(),t.selectAll()):_.matches(n,"office.find")?(n.preventDefault(),t.find()):_.matches(n,"office.replace")?(n.preventDefault(),t.replace()):_.matches(n,"office.bold")?(n.preventDefault(),t.formatBold()):_.matches(n,"office.italic")?(n.preventDefault(),t.formatItalic()):_.matches(n,"office.underline")?(n.preventDefault(),t.formatUnderline()):_.matches(n,"office.insertLink")?(n.preventDefault(),t.insertLink()):_.matches(n,"office.zoomIn")?(n.preventDefault(),t.zoomIn()):_.matches(n,"office.zoomOut")?(n.preventDefault(),t.zoomOut()):_.matches(n,"office.zoomReset")?(n.preventDefault(),t.zoomReset()):_.matches(n,"office.fullscreen")&&(n.preventDefault(),t.fullscreen())}),e.addEventListener("paste",n=>{const o=document.activeElement;if(o?.classList.contains("office-spreadsheet__cell")){n.preventDefault();const s=n.clipboardData?.getData("text/plain")||"";o.textContent=s}})}executeCommand(e,i){i.editorType==="contenteditable"&&i.editor&&(i.editor.focus(),document.execCommand(e))}formatBlock(e,i){i.editorType==="contenteditable"&&i.editor&&(i.editor.focus(),document.execCommand("formatBlock",!1,e))}resetZoom(e){const i=C(".office-editor-area",e);i.dataset.zoom="1",S(i,{zoom:"1"})}insertImage(e){if(e.editorType!=="contenteditable")return;const i=h("input",{attributes:{type:"file",accept:"image/*"}});i.onchange=async t=>{const n=t.target.files[0];if(!n)return;const o=new FileReader;o.onload=()=>{document.execCommand("insertImage",!1,o.result)},o.readAsDataURL(n)},i.click()}async insertTable(e){if(e.editorType!=="contenteditable")return;const i=await y.dialog.prompt("Prompt","How many rows?","3"),t=await y.dialog.prompt("Prompt","How many columns?","3");if(!i||!t)return;let n='<table style="border-collapse:collapse;width:100%">';for(let o=0;o<parseInt(i);o++){n+="<tr>";for(let s=0;s<parseInt(t);s++)n+='<td style="border:1px solid var(--glass-border);padding:8px">&nbsp;</td>';n+="</tr>"}n+="</table>",document.execCommand("insertHTML",!1,n)}async insertLink(e){if(e.editorType!=="contenteditable")return;const i=await y.dialog.prompt("Prompt","Enter a URL:","https://");i&&document.execCommand("createLink",!1,i)}showWordCount(e,i){let t="";i.editorType==="contenteditable"&&i.editor?t=i.editor.innerText:i.odtHtml&&(t=h("div",{html:i.odtHtml}).innerText),t.trim().split(/\s+/).filter(n=>n.length>0).length,t.length,t.replace(/\s/g,"").length,t.split(`
`).length}showShortcuts(){}showAbout(e){Q({title:"Office",version:"1.0.0",description:"YukiOS Office Suite for editing documents, spreadsheets, and presentations.",icon:"static/icons/office.webp",iconType:"image"})}spellCheck(e){e.editorType==="contenteditable"&&e.editor&&(e.editor.spellcheck=!e.editor.spellcheck)}toggleGrid(e,i){if(i.editorType==="spreadsheet"){const t=C(".office-spreadsheet",e);t&&ee(t,"office-spreadsheet--no-grid")}}exportToTXT(e){let i="";e.editorType==="contenteditable"&&e.editor&&(i=e.editor.innerText),z.triggerDownload(`${e.title}.txt`,i)}async createNewFile(e,i){if(await y.dialog.confirm("Confirm","Start a new file? Any unsaved changes will be lost.")){const t=C(".office-editor-area",e);i.title="Untitled",i.filePath=null,i.rawArrayBuffer=null,this.replaceEditorContent(t,"",i,e),y.window.setTitle(e.id,"Untitled - Office")}}async showFindDialog(e,i){const t=await y.dialog.prompt("Prompt","Find what?");t&&(i.editorType==="contenteditable"&&i.editor?window.find(t):i.editorType==="spreadsheet"&&this.findInSpreadsheet(i,t))}async showReplaceDialog(e,i){const t=await y.dialog.prompt("Prompt","Find what?");if(!t)return;const n=await y.dialog.prompt("Prompt","Replace with");if(n!==null&&i.editorType==="contenteditable"&&i.editor){const o=i.editor.innerHTML;i.editor.innerHTML=o.replaceAll(t,n)}}async copyToClipboard(e){if(e.editorType==="contenteditable"&&e.editor){e.editor.focus();const t=window.getSelection().toString();if(!t){y.notify.send("Select something first to copy");return}try{await navigator.clipboard.writeText(t)}catch{document.execCommand("copy")}}else if(e.editorType==="spreadsheet"){const i=document.activeElement;if(i?.classList.contains("office-spreadsheet__cell")){const t=window.getSelection().toString()||i.textContent;try{await navigator.clipboard.writeText(t)}catch{document.execCommand("copy")}}}}async cutToClipboard(e){if(e.editorType==="contenteditable"&&e.editor){e.editor.focus();const t=window.getSelection().toString();if(!t){y.notify.send("Select something first to cut");return}try{await navigator.clipboard.writeText(t),document.execCommand("delete")}catch{document.execCommand("cut")}}else if(e.editorType==="spreadsheet"){const i=document.activeElement;if(i?.classList.contains("office-spreadsheet__cell"))try{await navigator.clipboard.writeText(i.textContent),i.textContent=""}catch{document.execCommand("cut")}}}async pasteFromClipboard(e){if(e.editorType==="contenteditable"&&e.editor){e.editor.focus();try{const i=await navigator.clipboard.readText();document.execCommand("insertText",!1,i)}catch{y.notify.send("Can't access clipboard. Try Ctrl+V.")}}else if(e.editorType==="spreadsheet"){const i=document.activeElement;if(i?.classList.contains("office-spreadsheet__cell"))try{const t=await navigator.clipboard.readText();i.textContent=t}catch{y.notify.send("Can't access clipboard. Try Ctrl+V.")}}}printDocument(e,i){const t=window.open("","","width=800,height=600");let n="";i.editorType==="contenteditable"?n=i.editor.innerHTML:i.editorType==="odt-iframe"&&(n=i.odtHtml);const o=i.title.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");t.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${o}</title>
        <link rel="stylesheet" href="styles/office.css">
      </head>
      <body class="office-print-content">${n}</body>
    </html>
  `),t.document.close(),t.focus(),setTimeout(()=>{t.print(),t.close()},250)}adjustZoom(e,i,t){const n=C(".office-editor-area",e),o=parseFloat(n.dataset.zoom||"1"),s=Math.max(.5,Math.min(3,o*t));n.dataset.zoom=s,S(n,{zoom:s})}toggleFullscreen(e){if(!e.classList.contains("office-fullscreen"))e.dataset.previousStyle=JSON.stringify({left:e.style.left,top:e.style.top,width:e.style.width,height:e.style.height}),S(e,{left:"0",top:"0",width:"100vw",height:"100vh"}),H(e,"office-fullscreen");else{const i=JSON.parse(e.dataset.previousStyle||"{}");S(e,i),F(e,"office-fullscreen")}}async addSpreadsheetRow(e){if(e.editorType!=="spreadsheet"||!e.editor)return;const t=e.editor.querySelector("tbody");if(!t)return;const n=t.querySelectorAll("tr"),o=n[0]?.querySelectorAll("td").length||26,s=n.length,a=h("tr"),l=h("th",{className:"office-th-row",text:String(s+1)});a.appendChild(l);const r=document.createDocumentFragment();for(let c=0;c<o;c++){const d=h("td",{className:"office-cell",attributes:{contentEditable:"true"}});d.dataset.row=s,d.dataset.col=c,r.appendChild(d)}a.appendChild(r),t.appendChild(a)}async addSpreadsheetColumn(e){if(e.editorType!=="spreadsheet"||!e.editor)return;const i=e.editor,t=i.querySelector("thead"),n=i.querySelector("tbody");if(!t||!n)return;const o=t.querySelectorAll("th").length-1,s=h("th",{className:"office-th-col",text:String.fromCharCode(65+o)});t.querySelector("tr").appendChild(s),n.querySelectorAll("tr").forEach((a,l)=>{const r=h("td",{className:"office-cell",attributes:{contentEditable:"true"}});r.dataset.row=l,r.dataset.col=o,a.appendChild(r)})}async addSpreadsheetSheet(e){if(e.editorType!=="spreadsheet"||!e.workbook)return;const i=await y.dialog.prompt("Prompt","Name your sheet:",`Sheet${e.workbook.SheetNames.length+1}`);if(!i)return;const t=await E.xlsx(),n=Array.from({length:50},()=>Array(26).fill(""));t.utils.book_append_sheet(e.workbook,t.utils.aoa_to_sheet(n),i),e.activeSheet=i;const o=C(`#${e.winId} .office-editor-area`);o.innerHTML="",new Z().renderNativeTable(o,e.workbook,e,t)}async exportToPDF(e){if([".pdf",".odp"].includes(e.ext)||!e.editor){y.notify.send("Export to PDF","This format cannot be exported to PDF.",{type:"warning"});return}try{const t=await E.jsPDF(),n=await E.html2canvas(),o=this.getExportSourceNode(e);if(!o){y.notify.send("Export to PDF","Nothing to export.",{type:"warning"});return}const s=o.cloneNode(!0),a=h("div",{className:"office-pdf-export-source"});S(a,{position:"fixed",left:"-10000px",top:"0",width:"794px",background:"#ffffff",color:"#000000",padding:"32px",boxSizing:"border-box",fontFamily:"sans-serif",fontSize:"14px",lineHeight:"1.5",zIndex:"-1"}),a.appendChild(s),document.body.appendChild(a);const l=new t({unit:"pt",format:"a4"}),r=l.internal.pageSize.getWidth(),c=24,d=r-c*2;await l.html(a,{html2canvas:{scale:2,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!0},x:c,y:c,width:d,windowWidth:794,autoPaging:"slice",callback:f=>{f.save(`${e.title}.pdf`),a.remove(),y.notify.send("Export to PDF",`Saved ${e.title}.pdf`)}})}catch(t){console.error("PDF export error:",t),y.notify.send("Export to PDF","Failed to generate PDF.",{type:"error"})}}getExportSourceNode(e){return e.editorType==="contenteditable"&&e.editor?e.editor:e.editorType==="odt-iframe"&&e.editor&&e.editor.contentDocument?e.editor.contentDocument.body:e.editorType==="spreadsheet"&&e.editor?e.editor:e.editorType==="pdf"||e.editorType==="presentation"?null:e.editor||null}async exportToHTML(e){const i=this.getEditorContent(e),t=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${e.title}</title>
  <link rel="stylesheet" href="styles/office.css">
</head>
<body class="office-doc-export">${i}</body>
</html>`;z.triggerDownload(`${e.title}.html`,t)}findInSpreadsheet(e,i){const t=D(".office-spreadsheet__cell");t.forEach(n=>F(n,"office-cell-highlight")),t.forEach(n=>{n.textContent.toLowerCase().includes(i.toLowerCase())&&(H(n,"office-cell-highlight"),n.scrollIntoView({behavior:"smooth",block:"center"}))})}setupMenuBar(e,i){const t=C(".app-menubar",e),n=i.ext,o=[".xlsx",".xls",".csv"].includes(n),s=[".pdf",".odp",".odt"].includes(n),a=[".docx",".txt",".html",""].includes(n)||!n;t.dataset.mode=o?"spreadsheet":"document";const l=C(".office-menu-dropdown:nth-child(5)",e);l&&S(l,{display:a?"":"none"});const r=C(".office-menu-dropdown:nth-child(4)",e);D(".office-menu-item--document",e).forEach(p=>{S(p,{display:a?"":"none"})}),D(".office-menu-item--spreadsheet",e).forEach(p=>{S(p,{display:o?"":"none"})}),r&&S(r,{display:s?"none":""});const c=C(".office-menu-dropdown:nth-child(2)",e);s&&c&&D(".office-menu-item",c).forEach(p=>{H(p,"office-menu-item--disabled"),S(p,{pointerEvents:"none",opacity:"0.5"})}),D('[data-action^="sort"]',e).forEach(p=>{S(p,{display:o?"":"none"})}),D(".office-menu-divider.office-menu-item--spreadsheet",e).forEach(p=>{S(p,{display:o?"":"none"})}),D('[data-action="toggleGrid"]',e).forEach(p=>{S(p,{display:o?"":"none"})});const d=D(".office-menu-dropdown",e);d.forEach(p=>{const m=C(".office-menu-dropdown__trigger",p);if(!m)return;const g=m.cloneNode(!0);m.parentNode.replaceChild(g,m),k(g,"click",b=>{b.stopPropagation();const w=p.classList.contains("active");d.forEach(x=>F(x,"active")),w||H(p,"active")}),k(g,"mouseenter",()=>{const b=C(".office-menu-dropdown.active",e);b&&b!==p&&(d.forEach(w=>F(w,"active")),H(p,"active"))})});const f=p=>{p.target.closest(".office-menu-dropdown")||d.forEach(m=>F(m,"active"))};document.removeEventListener("click",e.closeDropdownsHandler),e.closeDropdownsHandler=f,document.addEventListener("click",f)}async openFileViaUpload(e,i){B("Looking for something?",I.Searching);const t=await z.triggerUpload(!0);if(t.length===0)return;const n=C(".office-editor-area",e);await this.handleUploadedFiles(t,n,i,e)}setupIdleDetection(e,i){const t=e.querySelector(".office-richtext-editor")||e.querySelector(".office-spreadsheet");if(!t)return;const n=()=>{this.idleTimer&&clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{const s=[".xlsx",".xls",".csv"].includes(i)?"Still there? Need help with your spreadsheet?":"Still there? I can check your formatting.";B(s,I.IdleEyeBrowRaise)},this.idleDelay)};t.addEventListener("input",n),t.addEventListener("keydown",n);const o=new MutationObserver(()=>{document.contains(e)||(this.idleTimer&&clearTimeout(this.idleTimer),o.disconnect())});o.observe(desktop,{childList:!0})}getEditorContent(e){return e.editorType==="contenteditable"&&e.editor?e.editor.innerHTML:e.editorType==="spreadsheet"&&e.workbook?e.workbook:""}async generateFileContent(e){const i=e.ext,t=[".pdf",".odp"];if(i===".xlsx"||i===".xls"){if(e.workbook){const n=await E.xlsx();return await Z.syncTable(e),new Uint8Array(n.write(e.workbook,{bookType:i===".xls"?"xls":"xlsx",type:"array"}))}return new Uint8Array}if(i===".csv"){if(e.workbook){const n=await E.xlsx();return await Z.syncTable(e),n.utils.sheet_to_csv(e.workbook.Sheets[e.activeSheet])}return""}if(i===".docx"){const n=this.getEditorContent(e);try{const{Document:o,Packer:s}=await E.docx(),a=await q.toDocxParagraphs(n),l=new o({sections:[{children:a}]});return new Uint8Array(await s.toBuffer(l))}catch{return new Blob([n],{type:"text/html"})}}return i===".odt"?q.toOdtBlob(this.getEditorContent(e)):t.includes(i)?e.rawArrayBuffer?new Uint8Array(e.rawArrayBuffer):(B("This format is read-only.",I.CheckingSomething),null):this.getEditorContent(e)}async saveFile(e,i){if(!i.filePath&&this.explorerApp){this.saveAsFile(i);return}try{const t=await this.generateFileContent(i);if(t===null)return;if(i.filePath&&this.fs){const n=i.ext;if(n===".pdf"&&t instanceof Uint8Array){const o=new Blob([t],{type:"application/pdf"});await y.fs.write(i.filePath,i.title,o,te.OTHER,"/static/icons/pdf.webp")}else if(v.isBinaryExtension(n)&&t instanceof Uint8Array){const o=v.mimeForExtension(n),s=v.arrayBufferToDataUrl(t.buffer,o);await y.fs.write(i.filePath,s)}else await y.fs.write(i.filePath,t);y.notify.send(`Saved: ${i.title}`),B("Great, your file has been saved!",I.Greeting)}else this.downloadFile(i)}catch(t){console.error("Save error:",t),R().playCriticalWarning(),y.notify.send("Couldn't save that file")}}async saveAsFile(e){if(this.explorerApp){const i=e.title.includes(".")?e.title:`${e.title}${e.ext||".docx"}`;this.explorerApp.openSaveDialog(i,async(t,n)=>{try{const o=v.getExtension(n);o&&o!==e.ext&&(e.ext=o);const s=await this.generateFileContent(e);if(s===null)return;let a=s;if(v.isBinaryExtension(e.ext)&&s instanceof Uint8Array){const r=v.mimeForExtension(e.ext);a=v.arrayBufferToDataUrl(s.buffer,r)}await y.fs.write([...t,n],a);const l=t.length?`/${t.join("/")}/${n}`:`/${n}`;e.title=n,e.filePath=[...t,n],y.notify.send(`Saved: ${l}`),B("Great, your file has been saved!",I.Greeting)}catch{R().playCriticalWarning(),y.notify.send("Couldn't save that file")}})}else await this.downloadFile(e)}async downloadFile(e){try{const i=await this.generateFileContent(e);if(i===null)return;const t=e.title.includes(".")?e.title:`${e.title}${e.ext||".txt"}`;z.triggerDownload(t,i),y.notify.send(`Downloaded ${t}`),B("Great, your file has been downloaded!",I.Greeting)}catch{R().playCriticalWarning(),y.notify.send("Couldn't download that file")}}openFileDialog(){this.open()}loadContent(e,i,t){this.open(e,i,t)}}export{le as OfficeApp};
