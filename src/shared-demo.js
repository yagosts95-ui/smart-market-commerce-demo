// Public-only shared DEMO transport. Do not send customer identity, address or phone.
const url='https://feshxynflbqfknkuormr.supabase.co';
const key="sb_publishable_Tf_jV6dQ1eilPb8id9rKyg_hYSiig0q";
const headers={apikey:key,'Content-Type':'application/json'};
export async function fetchSharedDemoOrders(){
 const r=await fetch(url+'/rest/v1/demo_orders?select=id,created_at,status,lines,items,total&order=created_at.desc&limit=60',{headers});
 if(!r.ok)throw new Error('Não foi possível atualizar os pedidos compartilhados');
 const rows=await r.json();
 return rows.map(x=>({...x,id:x.id+1000000,customer:'Cliente demonstração',paymentStatus:'Não verificado (teste)',demo:true,shared:true,phone:null,address:null}));
}
export async function submitSharedDemoOrder(items){
 const payload=items.map(p=>({id:p.id,qty:p.qty}));
 const r=await fetch(url+'/rest/v1/rpc/submit_demo_order',{method:'POST',headers,body:JSON.stringify({p_lines:payload})});
 if(!r.ok)throw new Error('Não foi possível enviar o pedido de demonstração');
 return Number(await r.json())+1000000;
}
export async function advanceSharedDemoOrder(id){
 const r=await fetch(url+'/rest/v1/rpc/advance_demo_order',{method:'POST',headers,body:JSON.stringify({p_id:id-1000000})});
 if(!r.ok)throw new Error('Não foi possível atualizar o pedido');
 return await r.json();
}
