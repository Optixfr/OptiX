import {V as Vn,S as Sn$1,A as An,r as rn,e as en,a as an,o as on}from'./chunk-Dh37TY96.js';import {v,D as DE,S as Sn,s as si,A as AI,m as mc,U as UE,a as sp,b as vy,W as WE,X as Xf,G as TE,K as Ml,Q as Fe,n as lr,$ as G,R as AP,l as _v,bf as dt,N,bg as Ve,bh as PP,aH as yc,aG as tp,aI as vc,bi as hp,ay as Jf,bj as II,ah as gp,e as ep,t as tI,w as wp,bk as Ud}from'./main.js';import {i}from'./chunk-C7kv0nDG.js';function Y(n,t){n&1&&tp(0,"div",2);}var ee=new N("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var q=(()=>{class n{_elementRef=v(lr);_ngZone=v(G);_changeDetectorRef=v(AP);_renderer=v(_v);_cleanupTransitionEnd;constructor(){let e=dt(),r=v(ee,{optional:true});this._isNoopAnimation=e==="di-disabled",e==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),r&&(r.color&&(this.color=this._defaultColor=r.color),this.mode=r.mode||this.mode);}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=H(e||0),this._changeDetectorRef.markForCheck();}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=H(e||0),this._changeDetectorRef.markForCheck();}_bufferValue=0;animationEnd=new Ve;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck();}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler);});}ngOnDestroy(){this._cleanupTransitionEnd?.();}_getPrimaryBarTransform(){return `scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return `${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}));};static \u0275fac=function(r){return new(r||n)};static \u0275cmp=DE({type:n,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(r,a){r&2&&(Jf("aria-valuenow",a._isIndeterminate()?null:a.value)("mode",a.mode),II("mat-"+a.color),gp("_mat-animation-noopable",a._isNoopAnimation)("mdc-linear-progress--animation-ready",!a._isNoopAnimation)("mdc-linear-progress--indeterminate",a._isIndeterminate()));},inputs:{color:"color",value:[2,"value","value",PP],bufferValue:[2,"bufferValue","bufferValue",PP],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(r,a){r&1&&(yc(0,"div",0),tp(1,"div",1),UE(2,Y,1,0,"div",2),vc(),yc(3,"div",3),tp(4,"span",4),vc(),yc(5,"div",5),tp(6,"span",4),vc()),r&2&&(vy(),hp("flex-basis",a._getBufferBarFlexBasis()),vy(),WE(a.mode==="buffer"?2:-1),vy(),hp("transform",a._getPrimaryBarTransform()));},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})}return n})();function H(n,t=0,e=100){return Math.max(t,Math.min(e,n))}var J=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=TE({type:n});static \u0275inj=Ml({imports:[Fe]})}return n})();function re(n,t){n&1&&ep(0,"img",7);}function ae(n,t){n&1&&ep(0,"img",8);}function te(n,t){n&1&&(si(0,"mat-card",9),ep(1,"mat-progress-bar",15),si(2,"p",16),AI(3,"G\xE9n\xE9ration du rapport PDF en cours..."),mc()());}function ie(n,t){if(n&1&&(si(0,"mat-card",10),ep(1,"iframe",17),mc()),n&2){let e=tI();vy(),Xf("src",e.store.pdfUrl(),Ud);}}function oe(n,t){if(n&1&&(si(0,"mat-card",11)(1,"p",18),AI(2),mc()()),n&2){let e=tI();vy(2),wp(e.store.error());}}var $=class n{temp;nomClient="Dupont";prenomClient="Thomas";adresse="Rue de la Paix, 12";ville="Toulouse";numSecu="123456789012345";numContrat="Z123456789012345";destinataire="Louis Dupont";commentaire="";magasin="OptalyX";magasinAdresse="Route de Paris, 12";faitPar="Jean Dupont";lieuFait="Tournefeuille";porteur="Jean Dupont";age="18 ans";raison="ZED";store=v(Vn);eyesTearService=v(i);ngOnInit(){let t={droite:this.store.droite(),gauche:this.store.gauche()},e=this.eyesTearService.getFormData();this.temp=t.droite.sphere;let r=a=>Object.fromEntries(Object.entries(a).map(([K,Q])=>[K,Number(Q)]));this.store.calculateAndLoadPDF({eye_m_droite:r(t.droite),eye_m_gauche:r(t.gauche),eye_t_droite:e.droite,eye_t_gauche:e.gauche,nomClient:this.nomClient,prenomClient:this.prenomClient,adresse:this.adresse,ville:this.ville,numSecu:this.numSecu,numContrat:this.numContrat,destinataire:this.destinataire,commentaire:this.commentaire||"Aucun commentaire.",magasin:this.magasin,magasinAdresse:this.magasinAdresse,faitPar:this.faitPar,lieuFait:this.lieuFait,porteur:this.porteur,age:this.age,raison:this.raison});}downloadPDF(){this.store.downloadPDF(this.nomClient,this.prenomClient);}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=DE({type:n,selectors:[["app-generation-rapport-page"]],decls:18,vars:3,consts:[[1,"flex","flex-col","justify-center","p-4"],[1,"grid","grid-cols-2","gap-5","justify-center","w-full"],[1,"optix-card",2,"margin","0","min-height","500px","display","flex","flex-direction","column"],[2,"margin-bottom","16px"],[1,"mat-h2",2,"margin","0","font-weight","500","color","#37474f"],[2,"display","flex","flex-direction","column","justify-content","center","align-items","center","flex","1"],[1,"flex","flex-row","justify-center"],["src","assets/test1.png","alt","Test 1 Suggestions",2,"max-height","350px","border-radius","8px","box-shadow","0 4px 10px rgba(0,0,0,0.05)"],["src","assets/test2.png","alt","Test 2 Suggestions",2,"max-height","350px","border-radius","8px","box-shadow","0 4px 10px rgba(0,0,0,0.05)"],[1,"optix-card",2,"margin","0","min-height","500px","display","flex","flex-direction","column","justify-content","center","align-items","center"],[1,"optix-card",2,"margin","0","padding","0","min-height","500px","overflow","hidden","border-radius","12px"],[1,"optix-card",2,"margin","0","min-height","500px","display","flex","flex-direction","column","justify-content","center","align-items","center","border","1px solid #fcc","background-color","#fff8f8"],[1,"flex","flex-row","gap-5","justify-center","mb-5",2,"margin-top","24px","text-align","center"],["mat-raised-button","","color","tertiary",2,"width","260px","height","48px","border-radius","24px","font-size","16px",3,"click","disabled"],["mat-raised-button","","color","primary","routerLink","/accueil",2,"width","260px","height","48px","border-radius","24px","font-size","16px"],["mode","indeterminate","color","primary",2,"margin-bottom","24px","max-width","300px"],[1,"mat-body-1",2,"color","#666"],[2,"border","none","width","100%","height","100%","min-height","500px",3,"src"],[1,"mat-body-1",2,"color","#c00","font-weight","500"]],template:function(e,r){e&1&&(si(0,"div",0)(1,"div",1)(2,"mat-card",2)(3,"mat-card-header",3)(4,"h2",4),AI(5,"Lentille sugg\xE9r\xE9e"),mc()(),si(6,"mat-card-content",5)(7,"div",6),UE(8,re,1,0,"img",7)(9,ae,1,0,"img",8),mc()()(),UE(10,te,4,0,"mat-card",9)(11,ie,2,1,"mat-card",10)(12,oe,3,1,"mat-card",11),mc()(),si(13,"div",12)(14,"button",13),sp("click",function(){return r.downloadPDF()}),AI(15," T\xE9l\xE9charger le Rapport "),mc(),si(16,"button",14),AI(17," Valider l'Adaptation "),mc()()),e&2&&(vy(8),WE(r.temp==="5"?8:9),vy(2),WE(r.store.loading()?10:r.store.pdfUrl()?11:r.store.error()?12:-1),vy(4),Xf("disabled",r.store.loading()||!r.store.pdfUrl()));},dependencies:[Sn,Sn$1,An,rn,en,an,on,J,q],encapsulation:2,changeDetection:1})};export{$ as GenerationRapportPageComponent};