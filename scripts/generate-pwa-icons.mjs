import sharp from 'sharp';
import {access} from 'node:fs/promises';
for(const name of ['cliente','gestor']){
 const src='public/'+name+'-icon.png';
 await access(src);
 const meta=await sharp(src).metadata();
 if(!meta.width||!meta.height)throw Error('Invalid image: '+src);
 const square=await sharp(src).resize(1024,1024,{fit:'contain',background:'#006b3b'}).ensureAlpha().png().toBuffer();
 // Fill transparent and near-black outside corners with a matching green.
 const {data,info}=await sharp(square).raw().toBuffer({resolveWithObject:true});
 for(let i=0;i<data.length;i+=info.channels){
   const r=data[i],g=data[i+1],b=data[i+2],alpha=data[i+3]??255;
   if(alpha<240 || (r<23&&g<24&&b<25)){
     data[i]=0;data[i+1]=98;data[i+2]=54;if(info.channels===4)data[i+3]=255;
   }
 }
 const clean=await sharp(data,{raw:{width:info.width,height:info.height,channels:info.channels}}).png().toBuffer();
 for(const size of [192,512,180]){
   await sharp(clean).resize(size,size).png().toFile('public/'+name+(size===180?'-apple':'-'+size)+'.png');
 }
 // Android masks the perimeter itself: never embed white padding or a second rounded tile.
 await sharp(clean).resize(512,512).png().toFile('public/'+name+'-maskable.png');
 console.log(name+': premium icon retained; dark/transparent outer halo replaced with green');
}
