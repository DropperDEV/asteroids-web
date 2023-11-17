var gdjs;(function(l){const n=new l.Logger("Bitmap text"),p="GDJS-DEFAULT-BITMAP-FONT",d=5,m=(o,t)=>{const e=o.font;return o.font=t,PIXI.BitmapFont.available[t]=o,delete PIXI.BitmapFont.available[e],PIXI.BitmapFont.available[t]};class u{constructor(t,e,i){this._pixiBitmapFontsInUse={};this._pixiBitmapFontsToUninstall=[];this._loadedFontsData={};this._defaultSlugFontName=null;this._resources=new Map,this.setResources(t),this._imageManager=i,this._resourcesLoader=e}getDefaultBitmapFont(){if(this._defaultSlugFontName!==null)return PIXI.BitmapFont.available[this._defaultSlugFontName];const t="Arial",e=new PIXI.TextStyle({fontFamily:t,fontSize:20,padding:5,align:"left",fill:"#ffffff",wordWrap:!0,lineHeight:20}),i=m(PIXI.BitmapFont.from(t,e,{chars:[[" ","~"]]}),p);return this._defaultSlugFontName=i.font,i}setResources(t){this._resources.clear();for(const e of t)e.kind==="bitmapFont"&&this._resources.set(e.name,e)}_markBitmapFontAsUsed(t){this._pixiBitmapFontsInUse[t]=this._pixiBitmapFontsInUse[t]||{objectsUsingTheFont:0},this._pixiBitmapFontsInUse[t].objectsUsingTheFont++;for(let e=0;e<this._pixiBitmapFontsToUninstall.length;)this._pixiBitmapFontsToUninstall[e]===t?this._pixiBitmapFontsToUninstall.splice(e,1):e++}releaseBitmapFont(t){if(t!==p){if(!this._pixiBitmapFontsInUse[t]){n.warn("BitmapFont with name "+t+" was tried to be released but was never marked as used.");return}if(this._pixiBitmapFontsInUse[t].objectsUsingTheFont--,this._pixiBitmapFontsInUse[t].objectsUsingTheFont===0&&(delete this._pixiBitmapFontsInUse[t],this._pixiBitmapFontsToUninstall.includes(t)||this._pixiBitmapFontsToUninstall.push(t),this._pixiBitmapFontsToUninstall.length>d)){const e=this._pixiBitmapFontsToUninstall.shift();PIXI.BitmapFont.uninstall(e),n.log("Bitmap Text",'Uninstalled BitmapFont "'+e+'" from memory.')}}}obtainBitmapFont(t,e){const i=t+"@"+e;if(PIXI.BitmapFont.available[i])return this._markBitmapFontAsUsed(i),PIXI.BitmapFont.available[i];const a=this._loadedFontsData[t];if(!a)return n.warn('Could not find Bitmap Font for resource named "'+t+'". The default font will be used.'),this.getDefaultBitmapFont();const r=this._imageManager.getPIXITexture(e);try{const s=m(PIXI.BitmapFont.install(a,r),i);return this._markBitmapFontAsUsed(i),s}catch(s){return n.error('Could not load the Bitmap Font for resource named "'+t+'". The default font will be used. Error is: '+s),this.getDefaultBitmapFont()}}async loadBitmapFontData(t){const e=[...this._resources.values()].filter(a=>!a.disablePreload);let i=0;return await Promise.all(e.map(async a=>{try{const s=await(await fetch(this._resourcesLoader.getFullUrl(a.file),{credentials:this._resourcesLoader.checkIfCredentialsRequired(a.file)?"include":"same-origin"})).text();this._loadedFontsData[a.name]=s}catch(r){n.error("Can't fetch the bitmap font file "+a.file+", error: "+r)}i++,t(i,e.length)})),i}}l.PixiBitmapFontManager=u,l.BitmapFontManager=l.PixiBitmapFontManager})(gdjs||(gdjs={}));
//# sourceMappingURL=pixi-bitmapfont-manager.js.map
