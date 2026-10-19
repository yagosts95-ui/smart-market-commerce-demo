// Public-only shared DEMO transport. Do not send customer identity, address or phone.
const url='https://feshxynflbqfknkuormr.supabase.co';
const key="sb_publishable_Tf_jV6dQ1eilPb8id9rKyg_hYSiig0q";
const headers={apikey:key,'Content-Type':'application/json'};
export async function fetchSharedDemoOrders(){
 const r=await fetch(url+'/rest/v1/demo_orders?select=id,created_at,status,lines,items,total&order=created_at.desc&limit=60',{headers});
 if(!r.ok)throw new Error('Não foi possível atualizar os pedidos compartilhados');
 const rows=await r.json();
 return rows.map(x=>({...x,id:-x.id,customer:'Cliente demonstração',paymentStatus:'Não verificado (teste)',demo:true,shared:true,phone:null,address:null}));
}
export async function submitSharedDemoOrder(items){
 const payload=items.map(p=>({id:p.id,qty:p.qty}));
 const r=await fetch(url+'/rest/v1/rpc/submit_demo_order',{method:'POST',headers,body:JSON.stringify({p_lines:payload})});
 if(!r.ok)throw new Error('Não foi possível enviar o pedido de demonstração');
 return -Number(await r.json());
}
export async function advanceSharedDemoOrder(id){
 const r=await fetch(url+'/rest/v1/rpc/advance_demo_order',{method:'POST',headers,body:JSON.stringify({p_id:-id})});
 if(!r.ok)throw new Error('Não foi possível atualizar o pedido');
 return await r.json();
}

export async function fetchDemoStock(){
 const r=await fetch(url+'/rest/v1/demo_inventory?select=product_sku,online_limit,reserved&limit=300',{headers});
 if(!r.ok)throw new Error('Estoque demonstrativo indisponível');
 const data=await r.json();
 return Object.fromEntries(data.map(row=>[Number(row.product_sku.replace('DEMO-','')),Math.max(0,row.online_limit-row.reserved)]));
}

export async function fetchDemoCatalog(){
 const r=await fetch(url+'/rest/v1/products?select=sku,name,unit,price,compare_at_price,image_url,category_id,active&sku=like.DEMO-*&order=sku.asc&limit=200',{headers});
 if(!r.ok)throw new Error('Catálogo do Supabase indisponível');
 return (await r.json()).map(p=>({...p,demoId:Number(p.sku.replace('DEMO-',''))}));
}

export async function cancelSharedDemoOrder(id){
 const r=await fetch(url+'/rest/v1/rpc/cancel_demo_order',{method:'POST',headers,body:JSON.stringify({p_id:-id})});
 if(!r.ok)throw new Error('Falha ao cancelar pedido');
 return await r.json();
}
export async function expireStaleDemoOrders(){
 const r=await fetch(url+'/rest/v1/rpc/expire_old_demo_orders',{method:'POST',headers,body:'{}'});
 if(!r.ok)throw new Error('Falha ao verificar reservas vencidas');
 return await r.json();
}
