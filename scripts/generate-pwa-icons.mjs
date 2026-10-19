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
 const w=info.width,h=info.height,ch=info.channels;
 const visited=new Uint8Array(w*h);const queue=new Int32Array(w*h);let head=0,tail=0;
 const isOuter=i=>{const j=i*ch;return (data[j+3]??255)<240 || (data[j]<23&&data[j+1]<24&&data[j+2]<25)};
 const push=i=>{if(i>=0&&i<w*h&&!visited[i]&&isOuter(i)){visited[i]=1;queue[tail++]=i}};
 for(let x=0;x<w;x++){push(x);push((h-1)*w+x)}
 for(let y=0;y<h;y++){push(y*w);push(y*w+w-1)}
 while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0,j=i*ch;
   data[j]=0;data[j+1]=98;data[j+2]=54;if(ch===4)data[j+3]=255;
   if(x>0)push(i-1);if(x<w-1)push(i+1);if(y>0)push(i-w);if(y<h-1)push(i+w);
 }
 const clean=await sharp(data,{raw:{width:info.width,height:info.height,channels:info.channels}}).png().toBuffer();
 for(const size of [192,512,180]){
   await sharp(clean).resize(size,size).png().toFile('public/'+name+(size===180?'-apple':'-'+size)+'.png');
 }
 // Android masks the perimeter itself: never embed white padding or a second rounded tile.
 await sharp(clean).resize(512,512).png().toFile('public/'+name+'-maskable.png');
 console.log(name+': premium icon retained; dark/transparent outer halo replaced with green');
}
