import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {ImageResponse}=require('next/og');
const {createElement:h}=require('react');
const image=h('div',{style:{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',padding:70,background:'#0B0D10',color:'#F2EEE6',fontFamily:'sans-serif'}},
 h('div',{style:{display:'flex',justifyContent:'space-between',fontSize:24}},h('span',null,'Lameck Orengo.'),h('span',{style:{color:'#C8AD82'}},'Nairobi, Kenya')),
 h('div',{style:{display:'flex',flexDirection:'column',fontSize:80,lineHeight:1.05,letterSpacing:-4}},h('span',null,'Websites and systems'),h('span',null,'built to work.')),
 h('div',{style:{display:'flex',fontSize:22,color:'#C8AD82'}},'Full-stack developer · lamecorengo.vercel.app'));
const response=new ImageResponse(image,{width:1200,height:630});
await writeFile(new URL('../src/app/opengraph-image.png',import.meta.url),Buffer.from(await response.arrayBuffer()));
console.log('Generated the original 1200 × 630 social preview.');
