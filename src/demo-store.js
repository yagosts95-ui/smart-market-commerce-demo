const KEY='maisvoce-demo-orders-v2';
const SAMPLE=[{id:1287,customer:'João Silva',items:4,total:84.70,status:'Em separação',demo:true},{id:1286,customer:'Maria Souza',items:7,total:132.90,status:'Novo',demo:true},{id:1285,customer:'Carlos Lima',items:3,total:48.50,status:'Saiu para entrega',demo:true},{id:1284,customer:'Ana Oliveira',items:6,total:114.20,status:'Entregue',demo:true}];
export function readOrders(){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return Array.isArray(v)?v:SAMPLE}catch{return SAMPLE}}
export function saveOrders(items){try{localStorage.setItem(KEY,JSON.stringify(items));window.dispatchEvent(new Event('maisvoce-orders-updated'))}catch(e){console.warn('Armazenamento não disponível',e)}}
export function subscribeOrders(setter){const sync=()=>setter(readOrders());window.addEventListener('storage',sync);window.addEventListener('maisvoce-orders-updated',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('maisvoce-orders-updated',sync)}}
export const statuses=['Novo','Em separação','Pronto para entrega','Saiu para entrega','Entregue'];
