/**
 * Mais Você staging adapter. Public catalog reads only.
 * No service_role credentials in frontend or repository.
 * Import this module when activating Supabase-backed catalog in Phase 2.
 */
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
export const catalogConfigured = Boolean(supabaseUrl && publishableKey);
export async function loadStagingCatalog({signal}={}){
 if(!catalogConfigured) return {configured:false,products:[]};
 const endpoint=new URL('/rest/v1/products',supabaseUrl);
 endpoint.searchParams.set('select','id,sku,name,description,unit,price,compare_at_price,image_url,featured,category_id,categories(name,slug)');
 endpoint.searchParams.set('active','eq.true');
 endpoint.searchParams.set('order','name.asc');
 endpoint.searchParams.set('limit','500');
 const response=await fetch(endpoint,{signal,headers:{apikey:publishableKey,Accept:'application/json'}});
 if(!response.ok)throw new Error('Leitura do catálogo indisponível: '+response.status);
 return {configured:true,products:await response.json()};
}
export async function loginManager(email,password){
 if(!catalogConfigured)throw new Error('Conexão Supabase não configurada');
 const response=await fetch(new URL('/auth/v1/token?grant_type=password',supabaseUrl),{
  method:'POST',headers:{apikey:publishableKey,'Content-Type':'application/json'},
  body:JSON.stringify({email,password})
 });
 const result=await response.json();
 if(!response.ok)throw new Error(result.msg||result.error_description||'Falha na autenticação');
 return result; // Session remains in memory; do not place tokens in URL or logging.
}
export async function verifyManagerSession(accessToken){
 if(!catalogConfigured||!accessToken)return false;
 const response=await fetch(new URL('/rest/v1/staff_roles?select=role&limit=1',supabaseUrl),{
 headers:{apikey:publishableKey,Authorization:'Bearer '+accessToken}
 });
 if(!response.ok)return false;
 const roles=await response.json();
 return Array.isArray(roles)&&roles.length>0;
}
