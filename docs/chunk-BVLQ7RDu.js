import {v,D as DE,S as Sn,s as si$1,a as sp,m as mc,U as UE,A as AI,b as vy,X as Xf,W as WE,M as MP,_ as _P,i as it$1,c as X$1,V as VP,d as Ao,H as H$1,e as ep,k as kv,w as wp,O as Ov,f as XE,g as Xl,t as tI,h as eu,r as re,j as mo,N,l as _v,I as Ie,n as lr$1,o as At$1,p as Vn$1,q as j,B,J as J$1,T as Tt$1,L as LP,u as b,C as Cn,x as _E,y as VI,z as N$1,E as wt$1,F as SE,G as TE,K as Ml,P as li$1,Q as Fe$1,R as AP,Y as _,Z as ie,$ as G$1,a0 as NP,a1 as SP,a2 as zi$1,a3 as te,a4 as Ge$1,a5 as et$1,a6 as Hh,a7 as vt,a8 as Fh,a9 as On,aa as $h,ab as Nh,ac as Oo,ad as rI,ae as zf,af as WI,ag as oI,ah as gp,ai as dp,aj as lp,ak as cI,al as sI,am as aI,an as up,ao as cp,ap as ue,aq as wt$2,ar as Ut$1,as as Xt,at as a,au as dn,av as $g,aw as OP,ax as op,ay as Jf,az as zs,aA as Ti$1,aB as Dr$1,aC as oe,aD as ee,aE as Mt$1,aF as $,aG as tp,aH as yc,aI as vc,aJ as lI,aK as ir$1,aL as q,aM as mt,aN as g,aO as Vt$1,aP as Z,aQ as Zn$1,aR as Tg,aS as Kc,aT as Dg,aU as sm,aV as F,aW as x,aX as jh,aY as Rp,aZ as St$1}from'./main.js';import {V as Vn,S as Sn$1,A as An,r as rn,e as en,a as an,o as on}from'./chunk-Dh37TY96.js';var xt=0;function qi(){return xt}function G(n,e){return (...t)=>{try{return xt=e,n(...t)}finally{xt=0;}}}function Ki(n){return !n}function Zn(n){return n}function W(n){return Array.isArray(n)}function qe(n){return (typeof n=="object"||typeof n=="function")&&n!=null}var Y=Symbol(),Ze=Symbol(),ve=class{predicates;fns=[];constructor(e){this.predicates=e;}push(e){this.fns.push(Qn(this.predicates,e));}mergeIn(e){let t=this.predicates?e.fns.map(i=>Qn(this.predicates,i)):e.fns;this.fns.push(...t);}hasRules(){return this.fns.length>0}},Ke=class extends ve{get defaultValue(){return  false}compute(e){return this.fns.some(t=>{let i=t(e);return i&&i!==Ze})}},le=class n extends ve{ignore;static ignoreNull(e){return new n(e,t=>t===null)}constructor(e,t){super(e),this.ignore=t;}get defaultValue(){return []}compute(e){return this.fns.reduce((t,i)=>{let r=i(e);return r===void 0||r===Ze?t:W(r)?[...t,...this.ignore?r.filter(o=>!this.ignore(o)):r]:this.ignore&&this.ignore(r)?t:[...t,r]},[])}},Ct=class extends le{constructor(e){super(e,void 0);}},Mt=class extends ve{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(e,t){super(e),this.key=t;}compute(e){if(this.fns.length===0)return this.key.reducer.getInitial();let t=this.key.reducer.getInitial();for(let i=0;i<this.fns.length;i++){let r=this.fns[i](e);r!==Ze&&(t=this.key.reducer.reduce(t,r));}return t}};function Qn(n,e){return n.length===0?e:t=>{for(let i of n){let r=t.stateOf(i.path),o=J$1(r.structure.pathKeys).length-i.depth;for(let a=0;a<o;a++)r=r.structure.parent;if(!i.fn(r.context))return Ze}return e(t)}}var se=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(e){this.predicates=e,this.hidden=new Ke(e),this.disabledReasons=new Ct(e),this.readonly=new Ke(e),this.syncErrors=le.ignoreNull(e),this.syncTreeErrors=le.ignoreNull(e),this.asyncErrors=le.ignoreNull(e);}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(e){return this.metadata.has(e)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(e){return this.metadata.has(e)||this.metadata.set(e,new Mt(this.predicates,e)),this.metadata.get(e)}mergeIn(e){this.hidden.mergeIn(e.hidden),this.disabledReasons.mergeIn(e.disabledReasons),this.readonly.mergeIn(e.readonly),this.syncErrors.mergeIn(e.syncErrors),this.syncTreeErrors.mergeIn(e.syncTreeErrors),this.asyncErrors.mergeIn(e.asyncErrors);for(let t of e.getMetadataKeys()){let i=e.metadata.get(t);this.getMetadata(t).mergeIn(i);}}},Ue=class{depth;constructor(e){this.depth=e;}build(){return new Ge(this,[],0)}},de=class n extends Ue{constructor(e){super(e);}current;all=[];addHiddenRule(e){this.getCurrent().addHiddenRule(e);}addDisabledReasonRule(e){this.getCurrent().addDisabledReasonRule(e);}addReadonlyRule(e){this.getCurrent().addReadonlyRule(e);}addSyncErrorRule(e){this.getCurrent().addSyncErrorRule(e);}addSyncTreeErrorRule(e){this.getCurrent().addSyncTreeErrorRule(e);}addAsyncErrorRule(e){this.getCurrent().addAsyncErrorRule(e);}addMetadataRule(e,t){this.getCurrent().addMetadataRule(e,t);}getChild(e){if(e===Y){let t=this.getCurrent().children;t.size>(t.has(Y)?1:0)&&(this.current=void 0);}return this.getCurrent().getChild(e)}hasLogic(e){return this===e?true:this.all.some(({builder:t})=>t.hasLogic(e))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:e})=>e.anyChildHasLogic())}mergeIn(e,t){t?this.all.push({builder:e,predicate:{fn:G(t.fn,this.depth),path:t.path}}):this.all.push({builder:e}),this.current=void 0;}getCurrent(){return this.current===void 0&&(this.current=new xe(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new n(0)}},xe=class extends Ue{logic=new se([]);children=new Map;constructor(e){super(e);}addHiddenRule(e){this.logic.hidden.push(G(e,this.depth));}addDisabledReasonRule(e){this.logic.disabledReasons.push(G(e,this.depth));}addReadonlyRule(e){this.logic.readonly.push(G(e,this.depth));}addSyncErrorRule(e){this.logic.syncErrors.push(G(e,this.depth));}addSyncTreeErrorRule(e){this.logic.syncTreeErrors.push(G(e,this.depth));}addAsyncErrorRule(e){this.logic.asyncErrors.push(G(e,this.depth));}addMetadataRule(e,t){this.logic.getMetadata(e).push(G(t,this.depth));}getChild(e){return this.children.has(e)||this.children.set(e,new de(this.depth+1)),this.children.get(e)}hasLogic(e){return this===e}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let e of this.children.values())if(e.hasRules())return  true;return  false}},Ge=class n{builder;predicates;depth;logic;constructor(e,t,i){this.builder=e,this.predicates=t,this.depth=i,this.logic=e?Ui(e,t,i):new se([]);}getChild(e){let t=this.builder?Jn(this.builder,e):[];if(t.length===0)return new n(void 0,[],this.depth+1);if(t.length===1){let{builder:i,predicates:r}=t[0];return new n(i,[...this.predicates,...r.map(o=>wt(o,this.depth))],this.depth+1)}else {let i=t.map(({builder:r,predicates:o})=>new n(r,[...this.predicates,...o.map(a=>wt(a,this.depth))],this.depth+1));return new Et(i)}}hasLogic(e){return this.builder?this.builder.hasLogic(e):false}hasRules(){return this.builder?this.builder.hasRules():false}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():false}},Et=class n{all;logic;constructor(e){this.all=e,this.logic=new se([]);for(let t of e)this.logic.mergeIn(t.logic);}getChild(e){return new n(this.all.flatMap(t=>t.getChild(e)))}hasLogic(e){return this.all.some(t=>t.hasLogic(e))}hasRules(){return this.all.some(e=>e.hasRules())}anyChildHasLogic(){return this.all.some(e=>e.anyChildHasLogic())}};function Jn(n,e){if(n instanceof de)return n.all.flatMap(({builder:t,predicate:i})=>{let r=Jn(t,e);return i?r.map(({builder:o,predicates:a})=>({builder:o,predicates:[...a,i]})):r});if(n instanceof xe)return [...e!==Y&&n.children.has(Y)?[{builder:n.getChild(Y),predicates:[]}]:[],...n.children.has(e)?[{builder:n.getChild(e),predicates:[]}]:[]];throw new b(1909,false)}function Ui(n,e,t){let i=new se(e);if(n instanceof de){let r=n.all.map(({builder:o,predicate:a})=>new Ge(o,a?[...e,wt(a,t)]:e,t));for(let o of r)i.mergeIn(o.logic);}else if(n instanceof xe)i.mergeIn(n.logic);else throw new b(1909,false);return i}function wt(n,e){return B(H$1({},n),{depth:e})}var ei=Symbol("PATH"),H=class n{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,Gi);logicBuilder;constructor(e,t,i,r){this.keys=e,this.parent=i,this.keyInParent=r,this.root=t??this,i||(this.logicBuilder=de.newRoot());}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(e){return this.children.has(e)||this.children.set(e,new n([...this.keys,e],this.root,this,e)),this.children.get(e)}mergeIn(e,t){let i=e.compile();this.builder.mergeIn(i.builder,t);}static unwrapFieldPath(e){return e[ei]}static newRoot(){return new n([],void 0,void 0,void 0)}},Gi={get(n,e){return e===ei?n:n.getChild(e).fieldPathProxy}},je,ye=new Map,Ce=class n{schemaFn;constructor(e){this.schemaFn=e;}compile(){if(ye.has(this))return ye.get(this);let e=H.newRoot();ye.set(this,e);let t=je;try{je=e,this.schemaFn(e.fieldPathProxy);}finally{je=t;}return e}static create(e){return e instanceof n?e:new n(e)}static rootCompile(e){try{return ye.clear(),e===void 0?H.newRoot():e instanceof n?e.compile():new n(e).compile()}finally{ye.clear();}}};function Wi(n){return n instanceof Ce||typeof n=="function"}function Qe(n){if(je!==H.unwrapFieldPath(n).root)throw new b(1908,false)}function ce(n,e,t){return Qe(n),H.unwrapFieldPath(n).builder.addMetadataRule(e,t),e}var X={list(){return {reduce:(n,e)=>e===void 0?n:[...n,e],getInitial:()=>[]}},min(){return {reduce:(n,e)=>n===void 0||e===void 0?n??e:e<n?e:n,getInitial:()=>{}}},max(){return {reduce:(n,e)=>n===void 0||e===void 0?n??e:e>n?e:n,getInitial:()=>{}}},or(){return {reduce:(n,e)=>n||e,getInitial:()=>false}},and(){return {reduce:(n,e)=>n&&e,getInitial:()=>true}},override:$i};function $i(n){return {reduce:(e,t)=>t,getInitial:()=>n?.()}}var Ye=Symbol("IS_ASYNC_VALIDATION_RESOURCE"),Me=class{reducer;create;brand;[Ye];constructor(e,t){this.reducer=e,this.create=t;}};function U(n){return new Me(n??X.override())}function ti(n,e){return new Me(X.override(),n)}function Pt(){return U()}var Lt=U(X.or()),ni=Pt();var ii=Pt();var ri=U(X.max()),oi=U(X.min()),zt=U(X.list());function R(n,e){if(n===e)return  true;if(!n||!e||n.length!==e.length)return  false;for(let t=0;t<n.length;t++)if(!Object.is(n[t],e[t]))return  false;return  true}function Zi(n){return n.errors().length>0?"invalid":n.pending()?"unknown":"valid"}var St=class{node;constructor(e){this.node=e;}rawSyncTreeErrors=X$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:R});syncErrors=X$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),...Qi(this.node.submitState.submissionErrors())],{equal:R});syncValid=X$1(()=>this.shouldSkipValidation()?true:this.node.structure.reduceChildren(this.syncErrors().length===0,(e,t)=>t&&e.validationState.syncValid(),Ki));syncTreeErrors=X$1(()=>this.rawSyncTreeErrors().filter(e=>e.fieldTree===this.node.fieldTree),{equal:R});rawAsyncErrors=X$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:R});asyncErrors=X$1(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(e=>e==="pending"||e.fieldTree===this.node.fieldTree),{equal:R});parseErrors=X$1(()=>this.node.formFieldBindings().flatMap(e=>e.parseErrors()),{equal:R});errors=X$1(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(e=>e!=="pending")],{equal:R});errorSummary=X$1(()=>{let e=this.node.structure.reduceChildren(this.errors(),(t,i)=>[...i,...t.errorSummary()]);return J$1(()=>e.sort(Yi)),e},{equal:R});pending=X$1(()=>this.node.structure.reduceChildren(this.asyncErrors().includes("pending"),(e,t)=>t||e.validationState.asyncErrors().includes("pending")));status=X$1(()=>{if(this.shouldSkipValidation())return "valid";let e=Zi(this);return this.node.structure.reduceChildren(e,(t,i)=>i==="invalid"||t.validationState.status()==="invalid"?"invalid":i==="unknown"||t.validationState.status()==="unknown"?"unknown":"valid",t=>t==="invalid")});valid=X$1(()=>this.status()==="valid");invalid=X$1(()=>this.status()==="invalid");shouldSkipValidation=X$1(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function Qi(n){return n===void 0?[]:W(n)?n:[n]}function Xe(n,e){if(W(n))for(let t of n)t.fieldTree??=e;else n&&(n.fieldTree??=e);return n}function Yn(n){return n.formField?n.formField.element:n.fieldTree().formFieldBindings().reduce((e,t)=>!e||!t.element?e??t.element:e.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t.element:e,void 0)}function Yi(n,e){let t=Yn(n),i=Yn(e);return t===i?0:t===void 0||i===void 0?t===void 0?1:-1:t.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var Ft=U(),Rt=class{node;cache=new WeakMap;constructor(e){this.node=e,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this);}resolve(e){if(!this.cache.has(e)){let t=X$1(()=>{let i=H.unwrapFieldPath(e),r=this.node,o=qi();for(;o>0||!r.structure.logic.hasLogic(i.root.builder);)if(o--,r=r.structure.parent,r===void 0)throw new b(1900,false);for(let a of i.keys)if(r=r.structure.getChild(a),r===void 0)throw new b(1901,false);return r.fieldTree});this.cache.set(e,t);}return this.cache.get(e)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=X$1(()=>{let e=this.key();if(!W(J$1(this.node.structure.parent.value)))throw new b(1906,false);return Number(e)});fieldTreeOf(e){return this.resolve(e)}stateOf(e){return this.resolve(e)()}valueOf=e=>{let t=this.resolve(e)().value();if(t instanceof Z)throw new b(1907,false);return t}},Tt=class{node;metadata=new Map;constructor(e){this.node=e;}runMetadataCreateLifecycle(){this.node.logicNode.logic.hasMetadataKeys()&&J$1(()=>mo(this.node.structure.injector,()=>{for(let e of this.node.logicNode.logic.getMetadataKeys())if(e.create){let t=this.node.logicNode.logic.getMetadata(e),i=e.create(this.node,X$1(()=>t.compute(this.node.context)));this.metadata.set(e,i);}}));}get(e){if(this.has(e)&&!this.metadata.has(e)){if(e.create)throw new b(1912,false);let t=this.node.logicNode.logic.getMetadata(e);this.metadata.set(e,X$1(()=>t.compute(this.node.context)));}return this.metadata.get(e)}has(e){return this.node.logicNode.logic.hasMetadata(e)}},Xi={get(n,e,t){let i=n(),r=i.structure.getChild(e);if(r!==void 0)return r.fieldTree;let o=J$1(i.value);if(W(o)){if(e==="length")return i.value().length;if(e===Symbol.iterator)return ()=>(i.value(),Array.prototype[Symbol.iterator].apply(i.fieldTree))}if(qe(o)&&e===Symbol.iterator)return function*(){for(let a in t)yield [a,t[a]];}},getOwnPropertyDescriptor(n,e){let t=J$1(n().value),i=Reflect.getOwnPropertyDescriptor(t,e);return i&&!i.configurable&&(i.configurable=true),i},ownKeys(n){let e=J$1(n().value);return typeof e=="object"&&e!==null?Reflect.ownKeys(e):[]}};function Ji(n,e){let t=X$1(()=>n()[e()]);return t[F]=n[F],t.set=i=>{Object.is(J$1(t),i)||n.update(r=>er(r,i,e()));},t.update=i=>{t.set(i(J$1(t)));},t.asReadonly=()=>t,t}function er(n,e,t){if(W(n)){let i=[...n];return i[t]=e,i}else return B(H$1({},n),{[t]:e})}var ae=Symbol(""),ai=X$1(()=>false),We=class{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=re.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(e,t,i){this.logic=e,this.node=t,this.createChildNode=i;}children(){this.ensureChildrenMap();let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>J$1(t.reader))}materializedChildren(){let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>t.node)}_areChildrenMaterialized(){return J$1(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||J$1(()=>{this.childrenMap.update(e=>this.computeChildrenMap(this.value(),e,true));});}getChild(e){this.ensureChildrenMap();let t=e.toString(),i=J$1(this.childrenMap)?.byPropertyKey.get(t)?.reader;return i||(i=this.createReader(t)),i()}reduceChildren(e,t,i){let r=this.childrenMap();if(!r)return e;let o=e;for(let a of r.byPropertyKey.values()){if(i?.(o))break;o=t(J$1(a.reader),o);}return o}destroy(){this.injector.destroy();}createKeyOrOrphanSignals(e,t,i){if(e==="root")return {keyInParent:li,isOrphaned:ai};let r=this.parent,o=i,a=X$1(()=>{if(r.structure.isOrphaned())return ae;let h=r.structure.childrenMap();if(!h)return ae;let _=h.byPropertyKey.get(o);if(_&&_.node===this.node)return o;if(t===void 0)return ae;for(let[$,Re]of h.byPropertyKey)if(Re.node===this.node)return o=$;return ae}),d=X$1(()=>a()===ae);return {keyInParent:X$1(()=>{let h=a();if(h===ae)throw t===void 0?new b(-1902,false):new b(1904,false);return h}),isOrphaned:d}}createChildrenMap(){return Ti$1({source:this.value,computation:(e,t)=>this.computeChildrenMap(e,t?.value,false)})}computeChildrenMap(e,t,i){if(!qe(e)||!i&&t===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;t??={byPropertyKey:new Map};let r,o=W(e);t!==void 0&&(o?r=nr(t,e,this.identitySymbol):r=ir(t,e));for(let a of Object.keys(e)){let d,f=e[a];if(f===void 0){t.byPropertyKey.has(a)&&(r??=H$1({},t),r.byPropertyKey.delete(a));continue}o&&qe(f)&&!W(f)&&(d=f[this.identitySymbol]??=Symbol(""));let h;d&&(t.byTrackingKey?.has(d)||(r??=H$1({},t),r.byTrackingKey??=new Map,r.byTrackingKey.set(d,this.createChildNode(a,d,o))),h=(r??t).byTrackingKey.get(d));let _=t.byPropertyKey.get(a);_===void 0?(r??=H$1({},t),r.byPropertyKey.set(a,{reader:this.createReader(a),node:h??this.createChildNode(a,d,o)})):h&&h!==_.node&&(r??=H$1({},t),_.node=h);}return r??t}createReader(e){return X$1(()=>this.childrenMap()?.byPropertyKey.get(e)?.node)}},Nt=class extends We{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return tr}get keyInParent(){return li}isOrphaned=ai;childrenMap;constructor(e,t,i,r,o){super(t,e,o),this.fieldManager=i,this.value=r,this.childrenMap=this.createChildrenMap();}},Dt=class extends We{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(e,t,i,r,o,a){super(t,e,a),this.logic=t,this.parent=i,this.root=this.parent.structure.root;let d=this.createKeyOrOrphanSignals("child",r,o);this.isOrphaned=d.isOrphaned,this.keyInParent=d.keyInParent,this.pathKeys=X$1(()=>[...i.structure.pathKeys(),this.keyInParent()]),this.value=Ji(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this);}};var tr=X$1(()=>[]),li=X$1(()=>{throw new b(1905,false)});function nr(n,e,t){let i,r=new Set(n.byPropertyKey.keys()),o=new Set(n.byTrackingKey?.keys());for(let a=0;a<e.length;a++){let d=e[a];r.delete(a.toString()),qe(d)&&d.hasOwnProperty(t)&&o.delete(d[t]);}if(r.size>0){i??=H$1({},n);for(let a of r)i.byPropertyKey.delete(a);}if(o.size>0){i??=H$1({},n);for(let a of o)i.byTrackingKey?.delete(a);}return i}function ir(n,e){let t;for(let i of n.byPropertyKey.keys())e.hasOwnProperty(i)||(t??=H$1({},n),t.byPropertyKey.delete(i));return t}var At=class{node;selfSubmitting=it$1(false);submissionErrors;constructor(e){this.node=e,this.submissionErrors=Ti$1({source:this.node.structure.value,computation:()=>[]});}submitting=X$1(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??false))},Ee=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new Rt(this)}fieldProxy=new Proxy(()=>this,Xi);pathNode;constructor(e){this.pathNode=e.pathNode,this.fieldAdapter=e.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,e),this.validationState=this.fieldAdapter.createValidationState(this,e),this.nodeState=this.fieldAdapter.createNodeState(this,e),this.metadataState=new Tt(this),this.submitState=new At(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle();}focusBoundControl(e){this.getBindingForFocus()?.focus(e);}getBindingForFocus(){let e=this.formFieldBindings().filter(t=>t.focus!==void 0).reduce(Xn,void 0);return e||this.structure.children().map(t=>t.getBindingForFocus()).reduce(Xn,void 0)}pendingSync=Ti$1({source:()=>this.value(),computation:(e,t)=>{t?.value?.abort();}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let e=this.metadata(ii)?.();return e?this.metadata(e):void 0}get maxLength(){return this.metadata(oi)}get min(){let e=this.metadata(ni)?.();return e?this.metadata(e):void 0}get minLength(){return this.metadata(ri)}get pattern(){return this.metadata(zt)??rr}get required(){return this.metadata(Lt)??or}metadata(e){return this.metadataState.get(e)}getError(e){return this.errors().find(t=>t.kind===e)}hasMetadata(e){return this.metadataState.has(e)}markAsTouched(e){this.structure.isOrphaned()||J$1(()=>{this.markAsTouchedInternal(e),this.flushSync();});}markAsTouchedInternal(e){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!e?.skipDescendants))for(let t of this.structure.children())t.markAsTouchedInternal();}markAsDirty(){this.nodeState.markAsDirty();}markAsPristine(){this.nodeState.markAsPristine();}markAsUntouched(){this.nodeState.markAsUntouched();}reset(e){J$1(()=>this._reset(e));}_reset(e){this.pendingSync()?.abort(),e!==void 0&&this.value.set(e),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let t of this.formFieldBindings())t.reset();for(let t of this.structure.materializedChildren())t._reset();}reloadValidation(){J$1(()=>this._reloadValidation());}_reloadValidation(){let e=this.logicNode.logic.getMetadataKeys();for(let t of e)t[Ye]&&this.metadata(t).reload?.();for(let t of this.structure.children())t._reloadValidation();}controlValueSignal(){let e=Ti$1(this.value);e.rawSet=e.set,e.set=i=>{e.rawSet(i),this.markAsDirty(),this.debounceSync();};let t=e.update;return e.update=i=>{t(i),this.markAsDirty(),this.debounceSync();},e}sync(){this.value.set(this.controlValue());}flushSync(){let e=this.pendingSync();e&&!e.signal.aborted&&(e.abort(),this.sync());}debounceSync(){return Dr$1(this,null,function*(){let e=J$1(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(e){let t=new AbortController,i=e(t.signal);if(i&&(this.pendingSync.set(t),yield i,t.signal.aborted))return}this.structure.isOrphaned()||this.sync();})}static newRoot(e,t,i,r){return r.newRoot(e,t,i,r)}createStructure(e){return e.kind==="root"?new Nt(this,e.logic,e.fieldManager,e.value,this.newChild.bind(this)):new Dt(this,e.logic,e.parent,e.identityInParent,e.initialKeyInParent,this.newChild.bind(this))}newChild(e,t,i){let r,o;return i?(r=this.pathNode.getChild(Y),o=this.structure.logic.getChild(Y)):(r=this.pathNode.getChild(e),o=this.structure.logic.getChild(e)),this.fieldAdapter.newChild({kind:"child",parent:this,pathNode:r,logic:o,initialKeyInParent:e,identityInParent:t,fieldAdapter:this.fieldAdapter})}},rr=X$1(()=>[]),or=X$1(()=>false);function Xn(n,e){return n?e&&n.element.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e:n:e}var kt=class{node;selfTouched=it$1(false);selfDirty=it$1(false);markAsTouched(){this.selfTouched.set(true);}markAsDirty(){this.selfDirty.set(true);}markAsPristine(){this.selfDirty.set(false);}markAsUntouched(){this.selfTouched.set(false);}formFieldBindings=it$1([]);constructor(e){this.node=e;}dirty=X$1(()=>{let e=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,i)=>i||t.nodeState.dirty(),Zn)});touched=X$1(()=>{let e=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,i)=>i||t.nodeState.touched(),Zn)});disabledReasons=X$1(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:R});disabled=X$1(()=>!!this.disabledReasons().length);readonly=X$1(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??false);hidden=X$1(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??false);name=X$1(()=>{let e=this.node.structure.parent;return e?`${e.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=X$1(()=>{if(this.node.logicNode.logic.hasMetadata(Ft)){let t=this.node.logicNode.logic.getMetadata(Ft).compute(this.node.context);if(t)return i=>t(this.node.context,i)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=X$1(()=>this.hidden()||this.disabled()||this.readonly())},It=class{newRoot(e,t,i,r){return new Ee({kind:"root",fieldManager:e,value:t,pathNode:i,logic:i.builder.build(),fieldAdapter:r})}newChild(e){return new Ee(e)}createNodeState(e){return new kt(e)}createValidationState(e){return new St(e)}createStructure(e,t){return e.createStructure(t)}},Ot=class{injector;rootName;submitOptions;constructor(e,t,i){this.injector=e,this.rootName=t??`${this.injector.get(zs)}.form${ar++}`,this.submitOptions=i;}structures=new Set;createFieldManagementEffect(e){Ao(()=>{let t=new Set;this.markStructuresLive(e,t);for(let i of this.structures)t.has(i)||(this.structures.delete(i),J$1(()=>i.destroy()));},{injector:this.injector});}markStructuresLive(e,t){t.add(e);for(let i of e.children())this.markStructuresLive(i.structure,t);}},ar=0,si=new N("");function lr(n){let e,t,i;return n.length===3?[e,t,i]=n:n.length===2?Wi(n[1])?[e,t]=n:[e,i]=n:[e]=n,[e,t,i]}function Vt(...n){let[e,t,i]=lr(n),r=i?.injector??v(re),o=mo(r,()=>Ce.rootCompile(t)),a=new Ot(r,i?.name,i?.submission),d=i?.adapter??new It,f=Ee.newRoot(a,e,o,d);a.createFieldManagementEffect(f.structure);let{experimentalWebMcpTool:h}=i??{};if(h){let _=mo(r,()=>v(si,{optional:!0}));_&&mo(r,()=>_(f.fieldTree,{name:h.name,description:h.description}));}return f.fieldTree}function Bt(n){return Ce.create(n)}var $e=class{kind="compat";control;fieldTree;context;message;constructor({context:e,kind:t,control:i}){this.context=e,this.kind=t,this.control=i;}};function di(n){if(n.length===0)return null;let e={};for(let t of n)e[t.kind]=t instanceof $e?t.context:t;return e}function ci(n,e){return n===null?[]:Object.entries(n).map(([t,i])=>new $e({context:i,kind:t,control:e}))}var sr=new N("");function Je(n,e){return n instanceof Function?n(e):n}function pi(n){return typeof n=="number"?isNaN(n):n===""||n===false||n==null}function fi(n){return n===void 0?[]:Array.isArray(n)?n:[n]}function gi(n,e){Qe(n),H.unwrapFieldPath(n).builder.addSyncErrorRule(i=>Xe(e(i),i.fieldTree));}function dr(n){return new Ht(n)}function cr(n,e){return new jt(n,e)}var we=class{__brand=void 0;kind="";fieldTree;message;constructor(e){e&&Object.assign(this,e);}},Ht=class extends we{kind="required"};var jt=class extends we{pattern;kind="pattern";constructor(e,t){super(t),this.pattern=e;}};var et=class extends we{kind="parse"};function L(n,e,t){let i=ce(n,U(),r=>{return e instanceof RegExp?e:e(r)});ce(n,zt,({state:r})=>r.metadata(i)()),gi(n,r=>{if(pi(r.value()))return;let o=r.state.metadata(i)();if(o!==void 0&&!o.test(r.value()))return cr(o,{message:Je(t?.message,r)})});}function z(n,e){let t=ce(n,U(),i=>true);ce(n,Lt,({state:i})=>i.metadata(t)()),gi(n,i=>{if(i.state.metadata(t)()&&pi(i.value()))return dr({message:Je(e?.message,i)})});}function fr(n,e){Qe(n);let t=H.unwrapFieldPath(n),i=ti((r,o)=>{if(e.debounce!==void 0){let a=VP(()=>o(),e.debounce),d=X$1(()=>Rp(a));return e.factory(d)}return e.factory(o)});i[Ye]=true,ce(n,i,r=>{let a=r.stateOf(n).validationState;if(!(a.shouldSkipValidation()||!a.syncValid())&&!(e.when&&!e.when(r)))return e.params(r)}),t.builder.addAsyncErrorRule(r=>{let o=r.state.metadata(i),a;switch(o.status()){case "idle":return;case "loading":case "reloading":return "pending";case "resolved":case "local":return o.hasValue()?(a=e.onSuccess(o.value(),r),Xe(a,r.fieldTree)):void 0;case "error":return a=e.onError(o.error(),r),Xe(a,r.fieldTree)}});}function bi(n,e){fr(n,{params:e.request,debounce:e.debounce,factory:t=>St$1(t,e.options),onSuccess:e.onSuccess,onError:e.onError,when:e.when});}function mr(n,e,t){let i=Ti$1({source:n,computation:()=>[],equal:R}),r=a=>{let d=t(a);i.set(fi(d.error)),d.value!==void 0&&e(d.value),i.set(fi(d.error));},o=()=>{i.set([]);};return {errors:i.asReadonly(),setRawValue:r,reset:o}}var qt=class{field;constructor(e){this.field=e;}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return !this.field().disabled()}get errors(){return di(this.field().errors())}get pristine(){return !this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return !this.field().touched()}get status(){if(this.field().disabled())return "DISABLED";if(this.field().valid())return "VALID";if(this.field().invalid())return "INVALID";if(this.field().pending())return "PENDING";throw new b(1910,false)}valueAccessor=null;hasValidator(e){return e===ue.required?this.field().required():false}updateValueAndValidity(){}},Kt={disabled:"disabled",disabledReasons:"disabledReasons",dirty:"dirty",errors:"errors",hidden:"hidden",invalid:"invalid",max:"max",maxLength:"maxLength",min:"min",minLength:"minLength",name:"name",pattern:"pattern",pending:"pending",readonly:"readonly",required:"required",touched:"touched"},ur=(()=>{let n={};for(let e of Object.keys(Kt))n[Kt[e]]=e;return n})();function Ut(n,e){let t=ur[e];return n[t]?.()}var Gt=Object.values(Kt);function tt(){return {}}function J(n,e,t){return n[e]!==t?(n[e]=t,true):false}function hr(n,e,t){let i;if(_i(n)&&t.isBadInput(n))return {error:new et};switch(n.type){case "checkbox":return {value:n.checked};case "number":case "range":case "datetime-local":if(i=J$1(e),typeof i=="number"||i===null)return {value:n.value===""?null:n.valueAsNumber};break;case "date":case "month":case "time":case "week":if(i=J$1(e),i===null||i instanceof Date)return {value:n.valueAsDate};if(typeof i=="number")return {value:n.valueAsNumber};break}if(n.tagName==="INPUT"&&n.type==="text"&&(i??=J$1(e),typeof i=="number"||i===null)){if(n.value==="")return {value:null};let r=Number(n.value);return Number.isNaN(r)?{error:new et}:{value:r}}return {value:n.value}}function mi(n,e){switch(n.type){case "checkbox":n.checked=e;return;case "radio":n.checked=e===n.value;return;case "number":case "range":case "datetime-local":if(typeof e=="number"){ui(n,e);return}else if(e===null){n.value="";return}break;case "date":case "month":case "time":case "week":if(e===null||e instanceof Date){n.valueAsDate=e;return}else if(typeof e=="number"){ui(n,e);return}}if(n.tagName==="INPUT"&&n.type==="text"){if(typeof e=="number"){n.value=isNaN(e)?"":String(e);return}if(e===null){n.value="";return}}n.value=e;}function ui(n,e){isNaN(e)?n.value="":n.valueAsNumber=e;}function _i(n){return n.tagName==="INPUT"}function pr(n){return n.type==="date"||n.type==="datetime-local"||n.type==="month"||n.type==="time"||n.type==="week"}function gr(n,e){let t=n.getUTCFullYear(),i=String(n.getUTCMonth()+1).padStart(2,"0");if(e==="month")return `${t}-${i}`;let r=String(n.getUTCDate()).padStart(2,"0");return `${t}-${i}-${r}`}function yi(n,e,t){return e instanceof Date&&(n==="min"||n==="max")&&(t==="date"||t==="month")?gr(e,t):e}function br(n,e){n.listenToCustomControlModel(i=>e.state().controlValue.set(i)),n.listenToCustomControlOutput("touch",()=>e.state().markAsTouched()),e.registerAsBinding(n.customControl);let t=tt();return ()=>{let i=e.state(),r=i.controlValue();J(t,"controlValue",r)&&n.setCustomControlModelInput(r);for(let o of Gt){let a;if(o==="errors"?a=e.errors():a=Ut(i,o),J(t,o,a)&&(n.setInputOnDirectives(o,a),e.elementAcceptsNativeProperty(o)&&!n.customControlHasInput(o))){let d=yi(o,a,e.nativeFormElement.type);Mt$1(e.renderer,e.nativeFormElement,o,d);}}}}function _r(n){return typeof n=="object"&&n!==null}function yr(n,e){let t=tt();e.controlValueAccessor.registerOnChange(r=>{t.controlValue=r,e.state().controlValue.set(r);}),e.controlValueAccessor.registerOnTouched(()=>e.state().markAsTouched());let i=e.injector.get(ee,null,{optional:true,self:true});if(i){let r;for(let f of i)_r(f)&&f.registerOnValidatorChange&&(r??=it$1(0),f.registerOnValidatorChange(()=>{r.update(h=>h+1);}));let o=i.map(f=>typeof f=="function"?f:f.validate.bind(f)),a=ue.compose(o),d=X$1(()=>{r?.();let f=a?a(e.interopNgControl.control):null;return ci(f,e.interopNgControl.control)});e.parseErrorsSource.set(d);}return e.registerAsBinding({reset:()=>{let r=e.state().value();t.controlValue=r,J$1(()=>e.controlValueAccessor.writeValue(r));}}),()=>{let r=e.state(),o=r.value();J(t,"controlValue",o)&&J$1(()=>e.controlValueAccessor.writeValue(o));for(let a of Gt){let d=Ut(r,a);if(J(t,a,d)){let f=n.setInputOnDirectives(a,d);a==="disabled"&&e.controlValueAccessor.setDisabledState?J$1(()=>e.controlValueAccessor.setDisabledState(d)):!f&&e.elementAcceptsNativeProperty(a)&&Mt$1(e.renderer,e.nativeFormElement,a,d);}}}}function vr(n,e,t){if(typeof MutationObserver!="function")return;let i=new MutationObserver(r=>{r.some(o=>xr(o))&&e();});i.observe(n,{attributes:true,attributeFilter:["value"],characterData:true,childList:true,subtree:true}),t.onDestroy(()=>i.disconnect());}function xr(n){if(n.type==="childList"||n.type==="characterData"){if(n.target instanceof Comment)return  false;for(let e of n.addedNodes)if(!(e instanceof Comment))return  true;for(let e of n.removedNodes)if(!(e instanceof Comment))return  true;return  false}return n.type==="attributes"&&n.target instanceof HTMLOptionElement}function Cr(n,e,t,i){let r=false,o=e.nativeFormElement,a=mr(()=>e.state().value(),f=>e.state().controlValue.set(f),f=>hr(o,e.state().value,i));t.set(a.errors),e.onReset=()=>{a.reset();let f=e.state().value();d.controlValue=f,mi(o,f);},n.listenToDom("input",()=>a.setRawValue(void 0)),n.listenToDom("blur",()=>e.state().markAsTouched()),_i(o)&&pr(o)&&i.watchValidity(o,()=>a.setRawValue(void 0)),e.registerAsBinding(),o.tagName==="SELECT"&&vr(o,()=>{r&&(o.value=e.state().controlValue());},e.destroyRef);let d=tt();return ()=>{let f=e.state();for(let _ of Gt){let $=Ut(f,_);if(J(d,_,$)&&(n.setInputOnDirectives(_,$),e.elementAcceptsNativeProperty(_))){let Re=yi(_,$,o.type);Mt$1(e.renderer,o,_,Re);}}let h=f.controlValue();J(d,"controlValue",h)&&mi(o,h),r=true;}}var vi=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=oe({token:n,factory:t=>Mr.\u0275fac(t),providedIn:"root"})}return n})(),Mr=(()=>{class n extends vi{document=v(Zn$1);cspNonce=v(Tg,{optional:true});isBrowser=Kc(v(Dg));injectedStyles=new WeakMap;watchValidity(t,i){if(!this.isBrowser)return;let r=t.getRootNode();this.injectedStyles.has(r)||this.injectedStyles.set(r,this.createTransitionStyle(r)),t.addEventListener("animationstart",o=>{let a=o;(a.animationName==="ng-valid"||a.animationName==="ng-invalid")&&i();});}isBadInput(t){return t.validity?.badInput??false}createTransitionStyle(t){let i=this.document.createElement("style");return this.cspNonce&&(i.nonce=this.cspNonce),i.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,t.nodeType===9?t.head?.appendChild(i):t.appendChild(i),i}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove();}static \u0275fac=(()=>{let t;return function(r){return (t||(t=sm(n)))(r||n)}})();static \u0275prov=oe({token:n,factory:n.\u0275fac})}return n})(),Er=Symbol(),hi=new N(""),xi=(()=>{class n{field=MP.required({alias:"formField"});state=X$1(()=>this.field()());renderer=v(_v);destroyRef=v(Ie);injector=v(re);element=v(lr$1).nativeElement;elementIsNativeFormElement=At$1(this.element);elementAcceptsTextualValues=Vn$1(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=t=>this.element.focus(t);controlValueAccessors=v(j,{optional:true,self:true});config=v(sr,{optional:true});validityMonitor=v(vi);parseErrorsSource=it$1(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new qt(this.state)}parseErrors=X$1(()=>this.parseErrorsSource()?.().map(t=>B(H$1({},t),{fieldTree:J$1(this.state).fieldTree,formField:this}))??[],{equal:R});errors=X$1(()=>this.state().errors().filter(t=>!t.formField||t.formField===this),{equal:R});isFieldBinding=false;resetter=()=>{};parseErrorsResetCallback;setParseErrors(t){this.parseErrorsSource.set(t);}set onReset(t){this.parseErrorsResetCallback=t;}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return !this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:Tt$1(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let t=Object.entries(this.config?.classes??{}).map(([r,o])=>[r,X$1(()=>o(this))]);if(t.length===0)return;let i=tt();LP({write:()=>{for(let[r,o]of t){let a=o();J(i,r,a)&&(a?this.renderer.addClass(this.element,r):this.renderer.removeClass(this.element,r));}}},{injector:this.injector});}focus(t){this.focuser(t);}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value());}registerAsBinding(t){if(this.isFieldBinding)throw new b(1913,false);this.isFieldBinding=true,this.installClassBindingEffect(),t?.focus&&(this.focuser=i=>t.focus(i)),t?.reset&&(this.resetter=()=>t.reset()),Ao(i=>{let r=this.state();r.nodeState.formFieldBindings.update(o=>[...o,this]),i(()=>{r.nodeState.formFieldBindings.update(o=>o.filter(a=>a!==this));});},{injector:this.injector});}[Er];\u0275ngControlCreate(t){if(!t.hasPassThrough)if(this.controlValueAccessor)this.\u0275ngControlUpdate=yr(t,this);else if(t.customControl)this.\u0275ngControlUpdate=br(t,this);else if(this.elementIsNativeFormElement)this.\u0275ngControlUpdate=Cr(t,this,this.parseErrorsSource,this.validityMonitor);else throw new b(1914,false)}\u0275ngControlUpdate;elementAcceptsNativeProperty(t){if(!this.elementIsNativeFormElement)return  false;switch(t){case "min":case "max":return this._elementAcceptsMinMax??=Cn(this.element);case "minLength":case "maxLength":return this.elementAcceptsTextualValues;case "disabled":case "required":case "readonly":case "name":return  true;default:return  false}}static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n,selectors:[["","formField",""]],inputs:{field:[1,"formField","field"]},exportAs:["formField"],features:[VI([{provide:hi,useExisting:n},{provide:N$1,useFactory:()=>v(n).interopNgControl},{provide:wt$1,useFactory:()=>v(hi,{self:true})}]),SE("formField")]})}return n})();var Wt=class{_box;_destroyed=new te;_resizeSubject=new te;_resizeObserver;_elementObservables=new Map;constructor(e){this._box=e,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)));}observe(e){return this._elementObservables.has(e)||this._elementObservables.set(e,new x(t=>{let i=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(e,{box:this._box}),()=>{this._resizeObserver?.unobserve(e),i.unsubscribe(),this._elementObservables.delete(e);}}).pipe(On(t=>t.some(i=>i.target===e)),jh({bufferSize:1,refCount:true}),$h(this._destroyed))),this._elementObservables.get(e)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear();}},Ci=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=v(G$1);constructor(){}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.();}observe(t,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Wt(r)),this._observers.get(r).observe(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Vt$1({token:n,factory:n.\u0275fac})}return n})();var wr=["notch"],Sr=["*"],Mi=["iconPrefixContainer"],Ei=["textPrefixContainer"],wi=["iconSuffixContainer"],Si=["textSuffixContainer"],Fr=["textField"],Rr=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],Tr=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function Nr(n,e){n&1&&ep(0,"span",21);}function Dr(n,e){if(n&1&&(si$1(0,"label",20),oI(1,1),UE(2,Nr,1,0,"span",21),mc()),n&2){let t=tI(2);Xf("floating",t._shouldLabelFloat())("monitorResize",t._hasOutline())("id",t._labelId),Jf("for",t._control.disableAutomaticLabeling?null:t._control.id),vy(2),WE(!t.hideRequiredMarker&&t._control.required?2:-1);}}function Ar(n,e){if(n&1&&UE(0,Dr,3,5,"label",20),n&2){let t=tI();WE(t._hasFloatingLabel()?0:-1);}}function kr(n,e){n&1&&ep(0,"div",7);}function Ir(n,e){}function Or(n,e){if(n&1&&zf(0,Ir,0,0,"ng-template",13),n&2){tI(2);let t=lI(1);Xf("ngTemplateOutlet",t);}}function Pr(n,e){if(n&1&&(si$1(0,"div",9),UE(1,Or,1,1,null,13),mc()),n&2){let t=tI();Xf("matFormFieldNotchedOutlineOpen",t._shouldLabelFloat()),vy(),WE(t._forceDisplayInfixLabel()?-1:1);}}function Lr(n,e){n&1&&(si$1(0,"div",10,2),oI(2,2),mc());}function zr(n,e){n&1&&(si$1(0,"div",11,3),oI(2,3),mc());}function Vr(n,e){}function Br(n,e){if(n&1&&zf(0,Vr,0,0,"ng-template",13),n&2){tI();let t=lI(1);Xf("ngTemplateOutlet",t);}}function Hr(n,e){n&1&&(si$1(0,"div",14,4),oI(2,4),mc());}function jr(n,e){n&1&&(si$1(0,"div",15,5),oI(2,5),mc());}function qr(n,e){n&1&&ep(0,"div",16);}function Kr(n,e){n&1&&(si$1(0,"div",18),oI(1,6),mc());}function Ur(n,e){if(n&1&&(si$1(0,"mat-hint",22),AI(1),mc()),n&2){let t=tI(2);Xf("id",t._hintLabelId),vy(),wp(t.hintLabel);}}function Gr(n,e){if(n&1&&(si$1(0,"div",19),UE(1,Ur,2,2,"mat-hint",22),oI(2,7),ep(3,"div",23),oI(4,8),mc()),n&2){let t=tI();vy(),WE(t.hintLabel?1:-1);}}var Se=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n,selectors:[["mat-label"]]})}return n})(),Wr=new N("MatError");var $t=(()=>{class n{align="start";id=v(ie).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(op("id",r.id),Jf("align",null),gp("mat-mdc-form-field-hint-end",r.align==="end"));},inputs:{align:"align",id:"id"}})}return n})(),$r=new N("MatPrefix");var Zr=new N("MatSuffix");var ki=new N("FloatingLabelParent"),Fi=(()=>{class n{_elementRef=v(lr$1);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=v(Ci);_ngZone=v(G$1);_parent=v(ki);_resizeSubscription=new $;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return Qr(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&gp("mdc-floating-label--float-above",r.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return n})();function Qr(n){let e=n;if(e.offsetParent!==null)return e.scrollWidth;let t=e.cloneNode(true);t.style.setProperty("position","absolute"),t.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(t);let i=t.scrollWidth;return t.remove(),i}var Ri="mdc-line-ripple--active",nt="mdc-line-ripple--deactivating",Ti=(()=>{class n{_elementRef=v(lr$1);_cleanupTransitionEnd;constructor(){let t=v(G$1),i=v(_v);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let t=this._elementRef.nativeElement.classList;t.remove(nt),t.add(Ri);}deactivate(){this._elementRef.nativeElement.classList.add(nt);}_handleTransitionEnd=t=>{let i=this._elementRef.nativeElement.classList,r=i.contains(nt);t.propertyName==="opacity"&&r&&i.remove(Ri,nt);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return n})(),Ni=(()=>{class n{_elementRef=v(lr$1);_ngZone=v(G$1);open=false;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,i=t.querySelector(".mdc-floating-label");i?(t.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="");}))):t.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(t){let i=this._notch.nativeElement;!this.open||!t?i.style.width="":i.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(t){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${t}px)`);}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=DE({type:n,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&lp(wr,5),i&2){let o;sI(o=aI())&&(r._notch=o.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&gp("mdc-notched-outline--notched",r.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:Sr,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(rI(),tp(0,"div",1),yc(1,"div",2,0),oI(3),vc(),tp(4,"div",3));},encapsulation:2})}return n})(),Zt=(()=>{class n{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n})}return n})();var Qt=new N("MatFormField"),Yr=new N("MAT_FORM_FIELD_DEFAULT_OPTIONS"),Di="fill",Xr="auto",Ai="fixed",Jr="translateY(-50%)",it=(()=>{class n{_elementRef=v(lr$1);_changeDetectorRef=v(AP);_platform=v(_);_idGenerator=v(ie);_ngZone=v(G$1);_defaults=v(Yr,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=NP("iconPrefixContainer");_textPrefixContainerSignal=NP("textPrefixContainer");_iconSuffixContainerSignal=NP("iconSuffixContainer");_textSuffixContainerSignal=NP("textSuffixContainer");_prefixSuffixContainers=X$1(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=SP(Se);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=zi$1(t);}_hideRequiredMarker=false;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||Xr}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let i=t||this._defaults?.appearance||Di;this._appearanceSignal.set(i);}_appearanceSignal=it$1(Di);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Ai}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||Ai;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t;}_destroyed=new te;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ge$1();constructor(){let t=this._defaults,i=v(et$1);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),Ao(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=X$1(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(t){let i=this._control,r="mat-mdc-form-field-type-";t&&this._elementRef.nativeElement.classList.remove(r+t.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(Hh([void 0,void 0]),vt(()=>[i.errorState,i.userAriaDescribedBy]),Fh(),On(([[o,a],[d,f]])=>o!==d||a!==f)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe($h(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Nh(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){let t=this._control.focused;t&&!this._isFocused?(this._isFocused=true,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",t),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",t);}_syncOutlineLabelOffset(){LP({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=X$1(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(t){let i=this._control?this._control.ngControl:null;return i&&i[t]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&t.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(d=>d.align==="start"):null,a=this._hintChildren?this._hintChildren.find(d=>d.align==="end"):null;o?t.push(o.id):this._hintLabel&&t.push(this._hintLabelId),a&&t.push(a.id);}else this._errorChildren&&t.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||t;r=t.concat(i.filter(a=>a&&!o.includes(a)));}else r=t;this._control.setDescribedByIds(r),this._describedByIds=t;}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=t?.getBoundingClientRect().width??0,d=i?.getBoundingClientRect().width??0,f=r?.getBoundingClientRect().width??0,h=o?.getBoundingClientRect().width??0,_=this._currentDirection==="rtl"?"-1":"1",$=`${a+d}px`,Bi=`calc(${_} * (${$} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,Hi=`var(--mat-mdc-form-field-label-transform, ${Jr} translateX(${Bi}))`,ji=a+d+f+h;return [Hi,ji]}_writeOutlinedLabelStyles(t){if(t!==null){let[i,r]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r);}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let i=t.getRootNode();return i&&i!==t}return document.documentElement.contains(t)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=DE({type:n,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(up(o,r._labelChild,Se,5),cp(o,Zt,5)(o,$r,5)(o,Zr,5)(o,Wr,5)(o,$t,5)),i&2){cI();let a;sI(a=aI())&&(r._formFieldControl=a.first),sI(a=aI())&&(r._prefixChildren=a),sI(a=aI())&&(r._suffixChildren=a),sI(a=aI())&&(r._errorChildren=a),sI(a=aI())&&(r._hintChildren=a);}},viewQuery:function(i,r){if(i&1&&(dp(r._iconPrefixContainerSignal,Mi,5)(r._textPrefixContainerSignal,Ei,5)(r._iconSuffixContainerSignal,wi,5)(r._textSuffixContainerSignal,Si,5),lp(Fr,5)(Mi,5)(Ei,5)(wi,5)(Si,5)(Fi,5)(Ni,5)(Ti,5)),i&2){cI(4);let o;sI(o=aI())&&(r._textField=o.first),sI(o=aI())&&(r._iconPrefixContainer=o.first),sI(o=aI())&&(r._textPrefixContainer=o.first),sI(o=aI())&&(r._iconSuffixContainer=o.first),sI(o=aI())&&(r._textSuffixContainer=o.first),sI(o=aI())&&(r._floatingLabel=o.first),sI(o=aI())&&(r._notchedOutline=o.first),sI(o=aI())&&(r._lineRipple=o.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&gp("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[VI([{provide:Qt,useExisting:n},{provide:ki,useExisting:n}])],ngContentSelectors:Tr,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(rI(Rr),zf(0,Ar,1,1,"ng-template",null,0,WI),si$1(2,"div",6,1),sp("click",function(a){return r._control.onContainerClick(a)}),UE(4,kr,1,0,"div",7),si$1(5,"div",8),UE(6,Pr,2,2,"div",9),UE(7,Lr,3,0,"div",10),UE(8,zr,3,0,"div",11),si$1(9,"div",12),UE(10,Br,1,1,null,13),oI(11),mc(),UE(12,Hr,3,0,"div",14),UE(13,jr,3,0,"div",15),mc(),UE(14,qr,1,0,"div",16),mc(),si$1(15,"div",17),UE(16,Kr,2,0,"div",18)(17,Gr,5,1,"div",19),mc()),i&2){let o;vy(2),gp("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),vy(2),WE(!r._hasOutline()&&!r._control.disabled?4:-1),vy(2),WE(r._hasOutline()?6:-1),vy(),WE(r._hasIconPrefix?7:-1),vy(),WE(r._hasTextPrefix?8:-1),vy(2),WE(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),vy(2),WE(r._hasTextSuffix?12:-1),vy(),WE(r._hasIconSuffix?13:-1),vy(),WE(r._hasOutline()?-1:14),vy(),gp("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();vy(),WE((o=a)==="error"?16:o==="hint"?17:-1);}},dependencies:[Fi,Ni,Oo,Ti,$t],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})}return n})();var Fe=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=TE({type:n});static \u0275inj=Ml({imports:[li$1,it,Fe$1]})}return n})();var to=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=DE({type:n,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return n})(),no={passive:true},Ii=(()=>{class n{_platform=v(_);_ngZone=v(G$1);_renderer=v(ir$1).createRenderer(null,null);_styleLoader=v(q);_monitoredElements=new Map;monitor(t){if(!this._platform.isBrowser)return mt;this._styleLoader.load(to);let i=g(t),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new te,a="cdk-text-field-autofilled",d=h=>{h.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(a)?(i.classList.add(a),this._ngZone.run(()=>o.next({target:h.target,isAutofilled:true}))):h.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(a)&&(i.classList.remove(a),this._ngZone.run(()=>o.next({target:h.target,isAutofilled:false})));},f=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",d,no)));return this._monitoredElements.set(i,{subject:o,unlisten:f}),o}stopMonitoring(t){let i=g(t),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i));}ngOnDestroy(){this._monitoredElements.forEach((t,i)=>this.stopMonitoring(i));}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Vt$1({token:n,factory:n.\u0275fac})}return n})();var Oi=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=TE({type:n});static \u0275inj=Ml({})}return n})();var Pi=new N("MAT_INPUT_VALUE_ACCESSOR");var rt=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;constructor(e,t,i,r,o){this._defaultMatcher=e,this.ngControl=t,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o;}updateErrorState(){let e=this.errorState,t=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,t)??false;o!==e&&(this.errorState=o,this._stateChanges.next());}};var io=["button","checkbox","file","hidden","image","radio","range","reset","submit"],ro=new N("MAT_INPUT_CONFIG"),Li=(()=>{class n{_elementRef=v(lr$1);_platform=v(_);ngControl=v(N$1,{optional:true,self:true});_autofillMonitor=v(Ii);_ngZone=v(G$1);_formField=v(Qt,{optional:true});_renderer=v(_v);_uid=v(ie).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=v(ro,{optional:true});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=false;_isNativeSelect=false;_isTextarea=false;_isInFormField=false;focused=false;stateChanges=new te;controlType="mat-input";autofilled=false;get disabled(){return this._disabled}set disabled(t){this._disabled=zi$1(t),this.focused&&(this.focused=false,this.stateChanges.next());}_disabled=false;get id(){return this._id}set id(t){this._id=t||this._uid;}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(ue.required)??false}set required(t){this._required=zi$1(t);}_required;get type(){return this._type}set type(t){this._type=t||"text",this._validateType(),!this._isTextarea&&wt$2().has(this._type)&&(this._elementRef.nativeElement.type=this._type);}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(t){this._errorStateTracker.matcher=t;}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(t){t!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(t):this._inputValueAccessor.value=t,this.stateChanges.next());}get readonly(){return this._readonly}set readonly(t){this._readonly=zi$1(t);}_readonly=false;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(t){this._errorStateTracker.errorState=t;}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(t=>wt$2().has(t));constructor(){let t=v(Ut$1,{optional:true}),i=v(Xt,{optional:true}),r=v(a),o=v(Pi,{optional:true,self:true}),a$1=this._elementRef.nativeElement,d=a$1.nodeName.toLowerCase();o?dn(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a$1,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a$1,"keyup",this._iOSKeyupListener);}),this._errorStateTracker=new rt(r,this.ngControl,i,t,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=d==="select",this._isTextarea=d==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||false,this._isNativeSelect&&(this.controlType=a$1.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Ao(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next();});}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t=>{this.autofilled=t.isAutofilled,this.stateChanges.next();});}ngOnChanges(){this.stateChanges.next();}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.();}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder();}focus(t){this._elementRef.nativeElement.focus(t);}updateErrorState(){this._errorStateTracker.updateErrorState();}_focusChanged(t){if(t!==this.focused){if(!this._isNativeSelect&&t&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0);}this.focused=t,this.stateChanges.next();}}_onInput(){}_dirtyCheckNativeValue(){let t=this._elementRef.nativeElement.value;this._previousNativeValue!==t&&(this._previousNativeValue=t,this.stateChanges.next());}_dirtyCheckPlaceholder(){let t=this._getPlaceholder();if(t!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=t,t?i.setAttribute("placeholder",t):i.removeAttribute("placeholder");}}_getPlaceholder(){return this.placeholder||null}_validateType(){io.indexOf(this._type)>-1;}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let t=this._elementRef.nativeElement.validity;return t&&t.badInput}get empty(){return !this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let t=this._elementRef.nativeElement,i=t.options[0];return this.focused||t.multiple||!this.empty||!!(t.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(t){let i=this._elementRef.nativeElement;t.length?i.setAttribute("aria-describedby",t.join(" ")):i.removeAttribute("aria-describedby");}onContainerClick(){this.focused||this.focus();}_isInlineSelect(){let t=this._elementRef.nativeElement;return this._isNativeSelect&&(t.multiple||t.size>1)}_iOSKeyupListener=t=>{let i=t.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0));};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||n)};static \u0275dir=_E({type:n,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&sp("focus",function(){return r._focusChanged(true)})("blur",function(){return r._focusChanged(false)})("input",function(){return r._onInput()}),i&2&&(op("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),Jf("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),gp("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()));},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",OP]},exportAs:["matInput"],features:[VI([{provide:Zt,useExisting:n}]),$g]})}return n})(),zi=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=TE({type:n});static \u0275inj=Ml({imports:[Fe,Fe,Oi,Fe$1]})}return n})();var V=/^-?\d+(\.\d+)?$/,so=Bt(n=>{z(n.sphere),L(n.sphere,V),z(n.cylindre),L(n.cylindre,V),z(n.axe),L(n.axe,V),z(n.dhiv),L(n.dhiv,V),z(n.dvo),L(n.dvo,V),z(n.k1),L(n.k1,V),z(n.x),L(n.x,V),z(n.k2),L(n.k2,V),z(n.y),L(n.y,V),z(n.excentricite),L(n.excentricite,V),bi(n.k1,{when:e=>V.test(e.value()),debounce:500,request:e=>({url:"/api/calcul/validate",method:"POST",body:{k1:e.value()}}),onSuccess:e=>e?.valid===false?{kind:"server",message:"Valeur K1 rejet\xE9e par le serveur."}:null,onError:()=>null});}),ot=class n{nomFormulaire=MP.required();measure=MP.required();measureChange=_P();model=it$1({sphere:"0",cylindre:"0",axe:"0",dhiv:"0",dvo:"0",k1:"0",x:"0",k2:"0",y:"0",excentricite:"0"});eyeForm=Vt(this.model,so);isValid=X$1(()=>this.eyeForm().valid());debouncedMeasure=VP(()=>this.model(),300);constructor(){Ao(()=>{this.model.set(H$1({},this.measure()));}),Ao(()=>{this.debouncedMeasure.hasValue()&&this.measureChange.emit(H$1({},this.debouncedMeasure.value()));});}fillTest2(){this.model.set({sphere:"5",cylindre:"-1.25",axe:"100",dhiv:"12",dvo:"11",k1:"8.05",x:"100",k2:"7.8",y:"10",excentricite:"0.65"});}fillTest1(){this.model.set({sphere:"-8",cylindre:"-3",axe:"10",dhiv:"12",dvo:"11",k1:"7.8",x:"10",k2:"7.3",y:"100",excentricite:"0.3"});}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=DE({type:n,selectors:[["app-form-eye-size"]],inputs:{nomFormulaire:[1,"nomFormulaire"],measure:[1,"measure"]},outputs:{measureChange:"measureChange"},decls:52,vars:11,consts:[[1,"optix-card"],[1,"card-title-container"],[1,"mat-h2",2,"margin","0"],[1,"demo-buttons"],["mat-stroked-button","","color","primary","type","button",3,"click"],["mat-stroked-button","","color","tertiary","type","button",3,"click"],[1,"form-grid"],["appearance","outline",1,"w-full"],["matInput","","type","number","step","0.25","placeholder","0.00",3,"formField"],["matInput","","type","number","placeholder","0",3,"formField"],["matInput","","type","number","step","0.5","placeholder","0",3,"formField"],["matInput","","type","number","step","0.01","placeholder","0.00",3,"formField"],["matInput","","type","number","step","0.05","placeholder","0.00",3,"formField"]],template:function(t,i){t&1&&(si$1(0,"mat-card",0)(1,"mat-card-header")(2,"div",1)(3,"h2",2),AI(4),mc(),si$1(5,"div",3)(6,"button",4),sp("click",function(){return i.fillTest1()}),AI(7,"Demo 1"),mc(),si$1(8,"button",5),sp("click",function(){return i.fillTest2()}),AI(9,"Demo 2"),mc()()()(),si$1(10,"mat-card-content")(11,"form",6)(12,"mat-form-field",7)(13,"mat-label"),AI(14,"Sphere"),mc(),ep(15,"input",8),kv(),mc(),si$1(16,"mat-form-field",7)(17,"mat-label"),AI(18,"Cylindre"),mc(),ep(19,"input",8),kv(),mc(),si$1(20,"mat-form-field",7)(21,"mat-label"),AI(22,"Axe"),mc(),ep(23,"input",9),kv(),mc(),si$1(24,"mat-form-field",7)(25,"mat-label"),AI(26,"DVO"),mc(),ep(27,"input",10),kv(),mc(),si$1(28,"mat-form-field",7)(29,"mat-label"),AI(30,"DHIV"),mc(),ep(31,"input",9),kv(),mc(),si$1(32,"mat-form-field",7)(33,"mat-label"),AI(34,"K1"),mc(),ep(35,"input",11),kv(),mc(),si$1(36,"mat-form-field",7)(37,"mat-label"),AI(38,"K1 Axe"),mc(),ep(39,"input",9),kv(),mc(),si$1(40,"mat-form-field",7)(41,"mat-label"),AI(42,"K2"),mc(),ep(43,"input",11),kv(),mc(),si$1(44,"mat-form-field",7)(45,"mat-label"),AI(46,"K2 Axe"),mc(),ep(47,"input",9),kv(),mc(),si$1(48,"mat-form-field",7)(49,"mat-label"),AI(50,"Excentricit\xE9"),mc(),ep(51,"input",12),kv(),mc()()()()),t&2&&(vy(4),wp(i.nomFormulaire()),vy(11),Xf("formField",i.eyeForm.sphere),Ov(),vy(4),Xf("formField",i.eyeForm.cylindre),Ov(),vy(4),Xf("formField",i.eyeForm.axe),Ov(),vy(4),Xf("formField",i.eyeForm.dvo),Ov(),vy(4),Xf("formField",i.eyeForm.dhiv),Ov(),vy(4),Xf("formField",i.eyeForm.k1),Ov(),vy(4),Xf("formField",i.eyeForm.x),Ov(),vy(4),Xf("formField",i.eyeForm.k2),Ov(),vy(4),Xf("formField",i.eyeForm.y),Ov(),vy(4),Xf("formField",i.eyeForm.excentricite),Ov());},dependencies:[xi,rn,en,an,on,Fe,it,Se,zi,Li,Sn$1,An],styles:[".optix-card[_ngcontent-%COMP%]{margin:16px 0;box-shadow:0 4px 12px #00000014;border-radius:12px;background-color:#fff;padding:16px}.card-title-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;flex-wrap:wrap;gap:16px;margin-bottom:24px}.demo-buttons[_ngcontent-%COMP%]{display:flex;gap:8px}.form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:16px}@media(min-width:768px){.form-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}"],changeDetection:1})};function co(n,e){if(n&1){let t=XE();si$1(0,"app-form-eye-size",2),sp("measureChange",function(r){Xl(t);let o=tI();return eu(o.store.updateLeftEye(r))}),mc();}if(n&2){let t=tI();Xf("measure",t.store.gauche())("nomFormulaire","Biom\xE9trie Oeil Gauche");}}function fo(n,e){if(n&1){let t=XE();si$1(0,"button",7),sp("click",function(){Xl(t);let r=tI();return eu(r.store.duplicateRightForm())}),ep(1,"img",8),si$1(2,"span"),AI(3,"Ajouter l'Oeil Gauche"),mc()();}}var Vi=class n{store=v(Vn);static \u0275fac=function(t){return new(t||n)};static \u0275cmp=DE({type:n,selectors:[["app-form-size-eyes-page"]],decls:8,vars:3,consts:[[1,"flex-col","justify-center","w-full","h-full","p-4"],[1,"grid","grid-cols-2","gap-5"],[3,"measureChange","measure","nomFormulaire"],[3,"measure","nomFormulaire"],["mat-stroked-button","",2,"height","100%","min-height","200px","display","flex","flex-direction","column","justify-content","center","align-items","center","border-radius","12px","background-color","#ffffff","border","2px dashed #ccc"],[1,"flex","justify-center","mb-5","mt-4",2,"margin-top","24px","text-align","center"],["mat-raised-button","","color","primary","routerLink","/tears",2,"width","260px","height","48px","border-radius","24px","font-size","16px"],["mat-stroked-button","",2,"height","100%","min-height","200px","display","flex","flex-direction","column","justify-content","center","align-items","center","border-radius","12px","background-color","#ffffff","border","2px dashed #ccc",3,"click"],["src","assets/additem.svg","alt","Duplicate the form",2,"width","48px","height","48px","margin-bottom","12px"]],template:function(t,i){t&1&&(si$1(0,"div",0)(1,"div",1)(2,"app-form-eye-size",2),sp("measureChange",function(o){return i.store.updateRightEye(o)}),mc(),UE(3,co,1,2,"app-form-eye-size",3)(4,fo,4,0,"button",4),mc(),si$1(5,"div",5)(6,"button",6),AI(7," \xC9valuer les crit\xE8res "),mc()()()),t&2&&(vy(2),Xf("measure",i.store.droite())("nomFormulaire",i.store.isDuplicated()?"Biom\xE9trie Oeil Droit":"Biom\xE9trie Oeil Droit = Biom\xE9trie Oeil Gauche"),vy(),WE(i.store.isDuplicated()?3:4));},dependencies:[ot,Sn,Sn$1,An],encapsulation:2,changeDetection:1})};export{Vi as FormSizeEyesPageComponent};