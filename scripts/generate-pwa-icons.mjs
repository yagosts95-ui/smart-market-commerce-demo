import sharp from 'sharp';
import {access} from 'node:fs/promises';
for(const name of ['cliente','gestor']){
 const src='public/'+name+'-icon.png';
 await access(src);
 const meta=await sharp(src).metadata();
 if(!meta.width||!meta.height)throw Error('Invalid image: '+src);
 for(const size of [192,512,180]){
  const dest='public/'+name+(size===180?'-apple':'-'+size)+'.png';
  // Preserve the square artwork and its original aspect ratio.
  await sharp(src).resize(size,size,{fit:'contain',background:'#ffffff',kernel:'lanczos3'}).png().toFile(dest);
 }
 // The padding avoids clipping important artwork in Android's maskable shape.
 const inner=384;
 const layer=await sharp(src).resize(inner,inner,{fit:'contain',background:'#ffffff'}).png().toBuffer();
 await sharp({create:{width:512,height:512,channels:4,background:'#ffffff'}})
  .composite([{input:layer,left:64,top:64}]).png().toFile('public/'+name+'-maskable.png');
 console.log(name+': 192, 512, apple 180 and maskable ready');
}
