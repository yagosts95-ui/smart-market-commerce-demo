import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const from='public/assets/mais-voce';
const to='public/assets/mais-voce/optimized';
await mkdir(to,{recursive:true});
const categories=['acougue','bebidas','hortifruti','laticinios','limpeza','mercearia','padaria'];
async function optimize(source,target,options={}){
 const input=join(from,source), output=join(to,target);
 try{
  const image=sharp(input,{failOn:'none'});
  const meta=await image.metadata();
  let pipeline=image;
  if(options.category){
    // Generated category art has a caption and white band at the bottom.
    // Use the photographic upper area only, inside the circular crop.
    const h=Math.max(1,Math.floor(meta.height*.73));
    pipeline=pipeline.extract({left:0,top:0,width:meta.width,height:h}).resize(260,260,{fit:'cover',position:'centre'});
  }else{
    pipeline=pipeline.resize({width:options.width||1200,withoutEnlargement:true});
  }
  await pipeline.webp({quality:options.quality||75,effort:5}).toFile(output);
  const [before,after]=await Promise.all([stat(input),stat(output)]);
  console.log(source+' -> '+target+' '+Math.round(before.size/1024)+'KB -> '+Math.round(after.size/1024)+'KB');
 }catch(err){console.error('Asset conversion failed: '+source,err);process.exitCode=1;}
}
await Promise.all([
 optimize('logo-mais-voce-online-small.png','logo.webp',{width:520,quality:81}),
 optimize('banner-cta-compras.png','hero-desktop.webp',{width:1500,quality:78}),
 optimize('banner-hero-home-mobile.png','hero-mobile.webp',{width:800,quality:76}),
 optimize('banner-ofertas-semana.png','ofertas.webp',{width:1200,quality:76}),
 optimize('banner-cta-compras2.png','cta.webp',{width:1200,quality:76}),
 ...categories.map(c=>optimize('categoria-'+c+'.png','categoria-'+c+'.webp',{category:true,quality:76}))
]);
