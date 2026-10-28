const fs = require('fs');
const vm = require('vm');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const code = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function makeEl(id){
  const el = {
    id, value:'', textContent:'', innerHTML:'', checked:false, disabled:false, selectedIndex:0,
    style:{}, dataset:{}, children:[], childNodes:[], options:[],
    classList:(function(){ const set=new Set(); return {
      add(c){ set.add(c); }, remove(c){ set.delete(c); },
      toggle(c,force){ if(force===undefined){ set.has(c)?set.delete(c):set.add(c); } else { force?set.add(c):set.delete(c); } },
      contains(c){ return set.has(c); } }; })(),
    addEventListener(){}, removeEventListener(){}, appendChild(){}, removeChild(){}, append(){}, remove(){},
    focus(){}, blur(){}, click(){}, setAttribute(){}, removeAttribute(){}, getAttribute(){ return null; },
    hasAttribute(){ return false; }, querySelector(){ return null; }, querySelectorAll(){ return []; },
    contentDocument:null, contentWindow:null, srcdoc:'', offsetWidth:300, offsetHeight:600,
    getBoundingClientRect(){ return {top:0,left:0,width:300,height:600}; },
    getContext(){ return null; }
  };
  let _p = null;
  Object.defineProperty(el, 'parentElement', { get(){ return _p || (_p = makeEl(id + '-parent')); } });
  Object.defineProperty(el, 'parentNode', { get(){ return el.parentElement; } });
  return el;
}
const els = {};
const doc = {
  getElementById(id){ return els[id] || (els[id] = makeEl(id)); },
  querySelector(){ return null; },
  querySelectorAll(){ return []; },
  createElement(tag){ return makeEl(tag); },
  addEventListener(){}, removeEventListener(){},
  documentElement: makeEl('html'), body: makeEl('body'), head: makeEl('head'), title: ''
};
const store = {};
const sandbox = {
  console, document: doc,
  localStorage: { getItem(k){ return Object.prototype.hasOwnProperty.call(store,k)?store[k]:null; },
                  setItem(k,v){ store[k]=String(v); }, removeItem(k){ delete store[k]; } },
  navigator: { userAgent: 'node-smoke' },
  performance: { now(){ return 0; } },
  requestAnimationFrame(){ return 0; }, cancelAnimationFrame(){},
  setTimeout(fn){ return 0; }, clearTimeout(){}, setInterval(){ return 0; }, clearInterval(){},
  matchMedia(){ return { matches:false, addEventListener(){} }; },
  alert(){}, URL: { createObjectURL(){ return 'blob:x'; }, revokeObjectURL(){} },
  Image: function(){ this.src=''; },
  Blob: function(){}, FileReader: function(){ this.readAsDataURL = function(){}; },
  HTMLElement: function(){}, Node: function(){}
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
try {
  vm.runInContext(code, sandbox, { filename: 'index.html-scope.js' });
  console.log('✅ setup() 在桩环境里跑通，没有抛错（初始化路径无 ReferenceError / TypeError）');
  console.log('   version:', sandbox.window.XYIntroCard && sandbox.window.XYIntroCard.version);
  const byId = (id) => els[id];
  const ocHidden = byId('fieldsOc').style.display === 'none';
  const genShown = byId('fieldsGeneral').style.display !== 'none';
  const genActive = byId('modeGeneral').classList.contains('active');
  console.log('   通用名片可见:', genShown, '| 人设卡隐藏:', ocHidden, '| 通用按钮选中:', genActive);
  if (!(ocHidden && genShown && genActive)) { console.error('❌ 默认模式不是「通用名片」'); process.exit(1); }
  console.log('✅ 默认模式 = 通用名片');
} catch (e) {
  console.error('❌ 初始化抛错:', e && e.message);
  console.error(e && e.stack && e.stack.split('\n').slice(0,4).join('\n'));
  process.exit(1);
}
