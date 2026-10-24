const RETIRED_IDS=new Set(['discoveryCrosscode','discoveryShapez','discoveryMindustryClassic','discoveryHexgl','discoveryNarrowOne','discoveryBlobBlaster','discoveryUnderrun','discoveryVoidcall','discoveryAsciiPatrol','discoverySandspiel','discoveryZtype','discoveryXtype']);
const SYSTEM_APPS=new Set(['steamApp','explorerApp','notepadApp','emulatorApp','jsDosApp','settingsApp','terminalApp','room3dApp']);

export function cleanRetiredCollections(collections){
  let changed=false;
  if(Object.hasOwn(collections,'New Discoveries')){delete collections['New Discoveries'];changed=true;}
  for(const [name,ids] of Object.entries(collections)){
    if(!Array.isArray(ids))continue;
    const filtered=ids.filter(id=>!RETIRED_IDS.has(id));
    if(filtered.length!==ids.length){collections[name]=filtered;changed=true;}
  }
  return changed;
}

export function connectHybridBridge(os,appMap){
  let ready=false;
  const inWorkspace=window.parent!==window;
  const send=data=>{if(inWorkspace)window.parent.postMessage({channel:'hybrid-desktop-v1',...data},location.origin);};
  const allowed=id=>typeof id==='string'&&!RETIRED_IDS.has(id)&&(SYSTEM_APPS.has(id)||Object.hasOwn(appMap,id));
  async function launch(id,requestId){
    if(!ready||!allowed(id)){send({type:'launch-result',requestId,ok:false,error:ready?'This app is unavailable.':'Sign in to the workspace first.'});return;}
    try{await os.app.launch(id);send({type:'launch-result',requestId,ok:true,appId:id,title:appMap[id]?.title||id});}
    catch{send({type:'launch-result',requestId,ok:false,error:'The workspace could not open this app. Try it from the library.'});}
  }
  if(inWorkspace)window.addEventListener('message',event=>{
    if(event.source!==window.parent||event.origin!==location.origin||event.data?.channel!=='hybrid-desktop-v1')return;
    if(event.data.type==='status')send({type:ready?'ready':'loading'});
    if(event.data.type==='launch')void launch(event.data.appId,event.data.requestId);
  });
  send({type:'loading'});
  return {ready(){ready=true;send({type:'ready'});}};
}
