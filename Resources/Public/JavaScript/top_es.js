(function() {
    const env = {"NODE_ENV":"development"};
    try {
        if (process) {
            process.env = Object.assign({}, process.env);
            Object.assign(process.env, env);
            return;
        }
    } catch (e) {} // avoid ReferenceError: process is not defined
    globalThis.process = { env:env };
})();

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ /**
 * True if the custom elements polyfill is in use.
 */const isCEPolyfill=typeof window!=='undefined'&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==undefined;/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */const reparentNodes=(container,start,end=null,before=null)=>{while(start!==end){const n=start.nextSibling;container.insertBefore(start,before);start=n;}};/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */const removeNodes=(container,start,end=null)=>{while(start!==end){const n=start.nextSibling;container.removeChild(start);start=n;}};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ /**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */const marker=`{{lit-${String(Math.random()).slice(2)}}}`;/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */const nodeMarker=`<!--${marker}-->`;const markerRegex=new RegExp(`${marker}|${nodeMarker}`);/**
 * Suffix appended to all bound attribute names.
 */const boundAttributeSuffix='$lit$';/**
 * An updatable Template that tracks the location of dynamic parts.
 */class Template{constructor(result,element){this.parts=[];this.element=element;const nodesToRemove=[];const stack=[];// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
const walker=document.createTreeWalker(element.content,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,false);// Keeps track of the last index associated with a part. We try to delete
// unnecessary nodes, but we never want to associate two different parts
// to the same index. They must have a constant node between.
let lastPartIndex=0;let index=-1;let partIndex=0;const{strings,values:{length}}=result;while(partIndex<length){const node=walker.nextNode();if(node===null){// We've exhausted the content inside a nested template element.
// Because we still have parts (the outer for-loop), we know:
// - There is a template in the stack
// - The walker will find a nextNode outside the template
walker.currentNode=stack.pop();continue;}index++;if(node.nodeType===1/* Node.ELEMENT_NODE */){if(node.hasAttributes()){const attributes=node.attributes;const{length}=attributes;// Per
// https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
// attributes are not guaranteed to be returned in document order.
// In particular, Edge/IE can return them out of order, so we cannot
// assume a correspondence between part index and attribute index.
let count=0;for(let i=0;i<length;i++){if(endsWith(attributes[i].name,boundAttributeSuffix)){count++;}}while(count-->0){// Get the template literal section leading up to the first
// expression in this attribute
const stringForPart=strings[partIndex];// Find the attribute name
const name=lastAttributeNameRegex.exec(stringForPart)[2];// Find the corresponding attribute
// All bound attributes have had a suffix added in
// TemplateResult#getHTML to opt out of special attribute
// handling. To look up the attribute value we also need to add
// the suffix.
const attributeLookupName=name.toLowerCase()+boundAttributeSuffix;const attributeValue=node.getAttribute(attributeLookupName);node.removeAttribute(attributeLookupName);const statics=attributeValue.split(markerRegex);this.parts.push({type:'attribute',index,name,strings:statics});partIndex+=statics.length-1;}}if(node.tagName==='TEMPLATE'){stack.push(node);walker.currentNode=node.content;}}else if(node.nodeType===3/* Node.TEXT_NODE */){const data=node.data;if(data.indexOf(marker)>=0){const parent=node.parentNode;const strings=data.split(markerRegex);const lastIndex=strings.length-1;// Generate a new text node for each literal section
// These nodes are also used as the markers for node parts
for(let i=0;i<lastIndex;i++){let insert;let s=strings[i];if(s===''){insert=createMarker();}else {const match=lastAttributeNameRegex.exec(s);if(match!==null&&endsWith(match[2],boundAttributeSuffix)){s=s.slice(0,match.index)+match[1]+match[2].slice(0,-boundAttributeSuffix.length)+match[3];}insert=document.createTextNode(s);}parent.insertBefore(insert,node);this.parts.push({type:'node',index:++index});}// If there's no text, we must insert a comment to mark our place.
// Else, we can trust it will stick around after cloning.
if(strings[lastIndex]===''){parent.insertBefore(createMarker(),node);nodesToRemove.push(node);}else {node.data=strings[lastIndex];}// We have a part for each match found
partIndex+=lastIndex;}}else if(node.nodeType===8/* Node.COMMENT_NODE */){if(node.data===marker){const parent=node.parentNode;// Add a new marker node to be the startNode of the Part if any of
// the following are true:
//  * We don't have a previousSibling
//  * The previousSibling is already the start of a previous part
if(node.previousSibling===null||index===lastPartIndex){index++;parent.insertBefore(createMarker(),node);}lastPartIndex=index;this.parts.push({type:'node',index});// If we don't have a nextSibling, keep this node so we have an end.
// Else, we can remove it to save future costs.
if(node.nextSibling===null){node.data='';}else {nodesToRemove.push(node);index--;}partIndex++;}else {let i=-1;while((i=node.data.indexOf(marker,i+1))!==-1){// Comment node has a binding marker inside, make an inactive part
// The binding won't work, but subsequent bindings will
// TODO (justinfagnani): consider whether it's even worth it to
// make bindings in comments work
this.parts.push({type:'node',index:-1});partIndex++;}}}}// Remove text binding nodes after the walk to not disturb the TreeWalker
for(const n of nodesToRemove){n.parentNode.removeChild(n);}}}const endsWith=(str,suffix)=>{const index=str.length-suffix.length;return index>=0&&str.slice(index)===suffix;};const isTemplatePartActive=part=>part.index!==-1;// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker=()=>document.createComment('');/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */const lastAttributeNameRegex=// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

const walkerNodeFilter=133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */function removeNodesFromTemplate(template,nodesToRemove){const{element:{content},parts}=template;const walker=document.createTreeWalker(content,walkerNodeFilter,null,false);let partIndex=nextActiveIndexInTemplateParts(parts);let part=parts[partIndex];let nodeIndex=-1;let removeCount=0;const nodesToRemoveInTemplate=[];let currentRemovingNode=null;while(walker.nextNode()){nodeIndex++;const node=walker.currentNode;// End removal if stepped past the removing node
if(node.previousSibling===currentRemovingNode){currentRemovingNode=null;}// A node to remove was found in the template
if(nodesToRemove.has(node)){nodesToRemoveInTemplate.push(node);// Track node we're removing
if(currentRemovingNode===null){currentRemovingNode=node;}}// When removing, increment count by which to adjust subsequent part indices
if(currentRemovingNode!==null){removeCount++;}while(part!==undefined&&part.index===nodeIndex){// If part is in a removed node deactivate it by setting index to -1 or
// adjust the index as needed.
part.index=currentRemovingNode!==null?-1:part.index-removeCount;// go to the next active part.
partIndex=nextActiveIndexInTemplateParts(parts,partIndex);part=parts[partIndex];}}nodesToRemoveInTemplate.forEach(n=>n.parentNode.removeChild(n));}const countNodes=node=>{let count=node.nodeType===11/* Node.DOCUMENT_FRAGMENT_NODE */?0:1;const walker=document.createTreeWalker(node,walkerNodeFilter,null,false);while(walker.nextNode()){count++;}return count;};const nextActiveIndexInTemplateParts=(parts,startIndex=-1)=>{for(let i=startIndex+1;i<parts.length;i++){const part=parts[i];if(isTemplatePartActive(part)){return i;}}return -1;};/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */function insertNodeIntoTemplate(template,node,refNode=null){const{element:{content},parts}=template;// If there's no refNode, then put node at end of template.
// No part indices need to be shifted in this case.
if(refNode===null||refNode===undefined){content.appendChild(node);return;}const walker=document.createTreeWalker(content,walkerNodeFilter,null,false);let partIndex=nextActiveIndexInTemplateParts(parts);let insertCount=0;let walkerIndex=-1;while(walker.nextNode()){walkerIndex++;const walkerNode=walker.currentNode;if(walkerNode===refNode){insertCount=countNodes(node);refNode.parentNode.insertBefore(node,refNode);}while(partIndex!==-1&&parts[partIndex].index===walkerIndex){// If we've inserted the node, simply adjust all subsequent parts
if(insertCount>0){while(partIndex!==-1){parts[partIndex].index+=insertCount;partIndex=nextActiveIndexInTemplateParts(parts,partIndex);}return;}partIndex=nextActiveIndexInTemplateParts(parts,partIndex);}}}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const directives=new WeakMap();/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */const directive=f=>(...args)=>{const d=f(...args);directives.set(d,true);return d;};const isDirective=o=>{return typeof o==='function'&&directives.has(o);};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */ /**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */const noChange={};/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */const nothing={};

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */class TemplateInstance{constructor(template,processor,options){this.__parts=[];this.template=template;this.processor=processor;this.options=options;}update(values){let i=0;for(const part of this.__parts){if(part!==undefined){part.setValue(values[i]);}i++;}for(const part of this.__parts){if(part!==undefined){part.commit();}}}_clone(){// There are a number of steps in the lifecycle of a template instance's
// DOM fragment:
//  1. Clone - create the instance fragment
//  2. Adopt - adopt into the main document
//  3. Process - find part markers and create parts
//  4. Upgrade - upgrade custom elements
//  5. Update - set node, attribute, property, etc., values
//  6. Connect - connect to the document. Optional and outside of this
//     method.
//
// We have a few constraints on the ordering of these steps:
//  * We need to upgrade before updating, so that property values will pass
//    through any property setters.
//  * We would like to process before upgrading so that we're sure that the
//    cloned fragment is inert and not disturbed by self-modifying DOM.
//  * We want custom elements to upgrade even in disconnected fragments.
//
// Given these constraints, with full custom elements support we would
// prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
//
// But Safari does not implement CustomElementRegistry#upgrade, so we
// can not implement that order and still have upgrade-before-update and
// upgrade disconnected fragments. So we instead sacrifice the
// process-before-upgrade constraint, since in Custom Elements v1 elements
// must not modify their light DOM in the constructor. We still have issues
// when co-existing with CEv0 elements like Polymer 1, and with polyfills
// that don't strictly adhere to the no-modification rule because shadow
// DOM, which may be created in the constructor, is emulated by being placed
// in the light DOM.
//
// The resulting order is on native is: Clone, Adopt, Upgrade, Process,
// Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
// in one step.
//
// The Custom Elements v1 polyfill supports upgrade(), so the order when
// polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
// Connect.
const fragment=isCEPolyfill?this.template.element.content.cloneNode(true):document.importNode(this.template.element.content,true);const stack=[];const parts=this.template.parts;// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
const walker=document.createTreeWalker(fragment,133/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,false);let partIndex=0;let nodeIndex=0;let part;let node=walker.nextNode();// Loop through all the nodes and parts of a template
while(partIndex<parts.length){part=parts[partIndex];if(!isTemplatePartActive(part)){this.__parts.push(undefined);partIndex++;continue;}// Progress the tree walker until we find our next part's node.
// Note that multiple parts may share the same node (attribute parts
// on a single element), so this loop may not run at all.
while(nodeIndex<part.index){nodeIndex++;if(node.nodeName==='TEMPLATE'){stack.push(node);walker.currentNode=node.content;}if((node=walker.nextNode())===null){// We've exhausted the content inside a nested template element.
// Because we still have parts (the outer for-loop), we know:
// - There is a template in the stack
// - The walker will find a nextNode outside the template
walker.currentNode=stack.pop();node=walker.nextNode();}}// We've arrived at our part's node.
if(part.type==='node'){const part=this.processor.handleTextExpression(this.options);part.insertAfterNode(node.previousSibling);this.__parts.push(part);}else {this.__parts.push(...this.processor.handleAttributeExpressions(node,part.name,part.strings,this.options));}partIndex++;}if(isCEPolyfill){document.adoptNode(fragment);customElements.upgrade(fragment);}return fragment;}}

/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */const policy=window.trustedTypes&&trustedTypes.createPolicy('lit-html',{createHTML:s=>s});const commentMarker=` ${marker} `;/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */class TemplateResult{constructor(strings,values,type,processor){this.strings=strings;this.values=values;this.type=type;this.processor=processor;}/**
     * Returns a string of HTML used to create a `<template>` element.
     */getHTML(){const l=this.strings.length-1;let html='';let isCommentBinding=false;for(let i=0;i<l;i++){const s=this.strings[i];// For each binding we want to determine the kind of marker to insert
// into the template source before it's parsed by the browser's HTML
// parser. The marker type is based on whether the expression is in an
// attribute, text, or comment position.
//   * For node-position bindings we insert a comment with the marker
//     sentinel as its text content, like <!--{{lit-guid}}-->.
//   * For attribute bindings we insert just the marker sentinel for the
//     first binding, so that we support unquoted attribute bindings.
//     Subsequent bindings can use a comment marker because multi-binding
//     attributes must be quoted.
//   * For comment bindings we insert just the marker sentinel so we don't
//     close the comment.
//
// The following code scans the template source, but is *not* an HTML
// parser. We don't need to track the tree structure of the HTML, only
// whether a binding is inside a comment, and if not, if it appears to be
// the first binding in an attribute.
const commentOpen=s.lastIndexOf('<!--');// We're in comment position if we have a comment open with no following
// comment close. Because <-- can appear in an attribute value there can
// be false positives.
isCommentBinding=(commentOpen>-1||isCommentBinding)&&s.indexOf('-->',commentOpen+1)===-1;// Check to see if we have an attribute-like sequence preceding the
// expression. This can match "name=value" like structures in text,
// comments, and attribute values, so there can be false-positives.
const attributeMatch=lastAttributeNameRegex.exec(s);if(attributeMatch===null){// We're only in this branch if we don't have a attribute-like
// preceding sequence. For comments, this guards against unusual
// attribute values like <div foo="<!--${'bar'}">. Cases like
// <!-- foo=${'bar'}--> are handled correctly in the attribute branch
// below.
html+=s+(isCommentBinding?commentMarker:nodeMarker);}else {// For attributes we use just a marker sentinel, and also append a
// $lit$ suffix to the name to opt-out of attribute-specific parsing
// that IE and Edge do for style and certain SVG attributes.
html+=s.substr(0,attributeMatch.index)+attributeMatch[1]+attributeMatch[2]+boundAttributeSuffix+attributeMatch[3]+marker;}}html+=this.strings[l];return html;}getTemplateElement(){const template=document.createElement('template');let value=this.getHTML();if(policy!==undefined){// this is secure because `this.strings` is a TemplateStringsArray.
// TODO: validate this when
// https://github.com/tc39/proposal-array-is-template-object is
// implemented.
value=policy.createHTML(value);}template.innerHTML=value;return template;}}/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */class SVGTemplateResult extends TemplateResult{getHTML(){return `<svg>${super.getHTML()}</svg>`;}getTemplateElement(){const template=super.getTemplateElement();const content=template.content;const svgElement=content.firstChild;content.removeChild(svgElement);reparentNodes(content,svgElement.firstChild);return template;}}

const isPrimitive=value=>{return value===null||!(typeof value==='object'||typeof value==='function');};const isIterable=value=>{return Array.isArray(value)||// eslint-disable-next-line @typescript-eslint/no-explicit-any
!!(value&&value[Symbol.iterator]);};/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */class AttributeCommitter{constructor(element,name,strings){this.dirty=true;this.element=element;this.name=name;this.strings=strings;this.parts=[];for(let i=0;i<strings.length-1;i++){this.parts[i]=this._createPart();}}/**
     * Creates a single part. Override this to create a differnt type of part.
     */_createPart(){return new AttributePart(this);}_getValue(){const strings=this.strings;const l=strings.length-1;const parts=this.parts;// If we're assigning an attribute via syntax like:
//    attr="${foo}"  or  attr=${foo}
// but not
//    attr="${foo} ${bar}" or attr="${foo} baz"
// then we don't want to coerce the attribute value into one long
// string. Instead we want to just return the value itself directly,
// so that sanitizeDOMValue can get the actual value rather than
// String(value)
// The exception is if v is an array, in which case we do want to smash
// it together into a string without calling String() on the array.
//
// This also allows trusted values (when using TrustedTypes) being
// assigned to DOM sinks without being stringified in the process.
if(l===1&&strings[0]===''&&strings[1]===''){const v=parts[0].value;if(typeof v==='symbol'){return String(v);}if(typeof v==='string'||!isIterable(v)){return v;}}let text='';for(let i=0;i<l;i++){text+=strings[i];const part=parts[i];if(part!==undefined){const v=part.value;if(isPrimitive(v)||!isIterable(v)){text+=typeof v==='string'?v:String(v);}else {for(const t of v){text+=typeof t==='string'?t:String(t);}}}}text+=strings[l];return text;}commit(){if(this.dirty){this.dirty=false;this.element.setAttribute(this.name,this._getValue());}}}/**
 * A Part that controls all or part of an attribute value.
 */class AttributePart{constructor(committer){this.value=undefined;this.committer=committer;}setValue(value){if(value!==noChange&&(!isPrimitive(value)||value!==this.value)){this.value=value;// If the value is a not a directive, dirty the committer so that it'll
// call setAttribute. If the value is a directive, it'll dirty the
// committer if it calls setValue().
if(!isDirective(value)){this.committer.dirty=true;}}}commit(){while(isDirective(this.value)){const directive=this.value;this.value=noChange;directive(this);}if(this.value===noChange){return;}this.committer.commit();}}/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */class NodePart{constructor(options){this.value=undefined;this.__pendingValue=undefined;this.options=options;}/**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */appendInto(container){this.startNode=container.appendChild(createMarker());this.endNode=container.appendChild(createMarker());}/**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */insertAfterNode(ref){this.startNode=ref;this.endNode=ref.nextSibling;}/**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */appendIntoPart(part){part.__insert(this.startNode=createMarker());part.__insert(this.endNode=createMarker());}/**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */insertAfterPart(ref){ref.__insert(this.startNode=createMarker());this.endNode=ref.endNode;ref.endNode=this.startNode;}setValue(value){this.__pendingValue=value;}commit(){if(this.startNode.parentNode===null){return;}while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this);}const value=this.__pendingValue;if(value===noChange){return;}if(isPrimitive(value)){if(value!==this.value){this.__commitText(value);}}else if(value instanceof TemplateResult){this.__commitTemplateResult(value);}else if(value instanceof Node){this.__commitNode(value);}else if(isIterable(value)){this.__commitIterable(value);}else if(value===nothing){this.value=nothing;this.clear();}else {// Fallback, will render the string representation
this.__commitText(value);}}__insert(node){this.endNode.parentNode.insertBefore(node,this.endNode);}__commitNode(value){if(this.value===value){return;}this.clear();this.__insert(value);this.value=value;}__commitText(value){const node=this.startNode.nextSibling;value=value==null?'':value;// If `value` isn't already a string, we explicitly convert it here in case
// it can't be implicitly converted - i.e. it's a symbol.
const valueAsString=typeof value==='string'?value:String(value);if(node===this.endNode.previousSibling&&node.nodeType===3/* Node.TEXT_NODE */){// If we only have a single text node between the markers, we can just
// set its value, rather than replacing it.
// TODO(justinfagnani): Can we just check if this.value is primitive?
node.data=valueAsString;}else {this.__commitNode(document.createTextNode(valueAsString));}this.value=value;}__commitTemplateResult(value){const template=this.options.templateFactory(value);if(this.value instanceof TemplateInstance&&this.value.template===template){this.value.update(value.values);}else {// Make sure we propagate the template processor from the TemplateResult
// so that we use its syntax extension, etc. The template factory comes
// from the render function options so that it can control template
// caching and preprocessing.
const instance=new TemplateInstance(template,value.processor,this.options);const fragment=instance._clone();instance.update(value.values);this.__commitNode(fragment);this.value=instance;}}__commitIterable(value){// For an Iterable, we create a new InstancePart per item, then set its
// value to the item. This is a little bit of overhead for every item in
// an Iterable, but it lets us recurse easily and efficiently update Arrays
// of TemplateResults that will be commonly returned from expressions like:
// array.map((i) => html`${i}`), by reusing existing TemplateInstances.
// If _value is an array, then the previous render was of an
// iterable and _value will contain the NodeParts from the previous
// render. If _value is not an array, clear this part and make a new
// array for NodeParts.
if(!Array.isArray(this.value)){this.value=[];this.clear();}// Lets us keep track of how many items we stamped so we can clear leftover
// items from a previous render
const itemParts=this.value;let partIndex=0;let itemPart;for(const item of value){// Try to reuse an existing part
itemPart=itemParts[partIndex];// If no existing part, create a new one
if(itemPart===undefined){itemPart=new NodePart(this.options);itemParts.push(itemPart);if(partIndex===0){itemPart.appendIntoPart(this);}else {itemPart.insertAfterPart(itemParts[partIndex-1]);}}itemPart.setValue(item);itemPart.commit();partIndex++;}if(partIndex<itemParts.length){// Truncate the parts array so _value reflects the current state
itemParts.length=partIndex;this.clear(itemPart&&itemPart.endNode);}}clear(startNode=this.startNode){removeNodes(this.startNode.parentNode,startNode.nextSibling,this.endNode);}}/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */class BooleanAttributePart{constructor(element,name,strings){this.value=undefined;this.__pendingValue=undefined;if(strings.length!==2||strings[0]!==''||strings[1]!==''){throw new Error('Boolean attributes can only contain a single expression');}this.element=element;this.name=name;this.strings=strings;}setValue(value){this.__pendingValue=value;}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this);}if(this.__pendingValue===noChange){return;}const value=!!this.__pendingValue;if(this.value!==value){if(value){this.element.setAttribute(this.name,'');}else {this.element.removeAttribute(this.name);}this.value=value;}this.__pendingValue=noChange;}}/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */class PropertyCommitter extends AttributeCommitter{constructor(element,name,strings){super(element,name,strings);this.single=strings.length===2&&strings[0]===''&&strings[1]==='';}_createPart(){return new PropertyPart(this);}_getValue(){if(this.single){return this.parts[0].value;}return super._getValue();}commit(){if(this.dirty){this.dirty=false;// eslint-disable-next-line @typescript-eslint/no-explicit-any
this.element[this.name]=this._getValue();}}}class PropertyPart extends AttributePart{}// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported=false;// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(()=>{try{const options={get capture(){eventOptionsSupported=true;return false;}};// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.addEventListener('test',options,options);// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.removeEventListener('test',options,options);}catch(_e){// event options not supported
}})();class EventPart{constructor(element,eventName,eventContext){this.value=undefined;this.__pendingValue=undefined;this.element=element;this.eventName=eventName;this.eventContext=eventContext;this.__boundHandleEvent=e=>this.handleEvent(e);}setValue(value){this.__pendingValue=value;}commit(){while(isDirective(this.__pendingValue)){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this);}if(this.__pendingValue===noChange){return;}const newListener=this.__pendingValue;const oldListener=this.value;const shouldRemoveListener=newListener==null||oldListener!=null&&(newListener.capture!==oldListener.capture||newListener.once!==oldListener.once||newListener.passive!==oldListener.passive);const shouldAddListener=newListener!=null&&(oldListener==null||shouldRemoveListener);if(shouldRemoveListener){this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options);}if(shouldAddListener){this.__options=getOptions(newListener);this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options);}this.value=newListener;this.__pendingValue=noChange;}handleEvent(event){if(typeof this.value==='function'){this.value.call(this.eventContext||this.element,event);}else {this.value.handleEvent(event);}}}// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions=o=>o&&(eventOptionsSupported?{capture:o.capture,passive:o.passive,once:o.once}:o.capture);

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */function templateFactory(result){let templateCache=templateCaches.get(result.type);if(templateCache===undefined){templateCache={stringsArray:new WeakMap(),keyString:new Map()};templateCaches.set(result.type,templateCache);}let template=templateCache.stringsArray.get(result.strings);if(template!==undefined){return template;}// If the TemplateStringsArray is new, generate a key from the strings
// This key is shared between all templates with identical content
const key=result.strings.join(marker);// Check if we already have a Template for this key
template=templateCache.keyString.get(key);if(template===undefined){// If we have not seen this key before, create a new Template
template=new Template(result,result.getTemplateElement());// Cache the Template for this key
templateCache.keyString.set(key,template);}// Cache all future queries for this TemplateStringsArray
templateCache.stringsArray.set(result.strings,template);return template;}const templateCaches=new Map();

const parts=new WeakMap();/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */const render=(result,container,options)=>{let part=parts.get(container);if(part===undefined){removeNodes(container,container.firstChild);parts.set(container,part=new NodePart(Object.assign({templateFactory},options)));part.appendInto(container);}part.setValue(result);part.commit();};

/**
 * Creates Parts when a template is instantiated.
 */class DefaultTemplateProcessor{/**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */handleAttributeExpressions(element,name,strings,options){const prefix=name[0];if(prefix==='.'){const committer=new PropertyCommitter(element,name.slice(1),strings);return committer.parts;}if(prefix==='@'){return [new EventPart(element,name.slice(1),options.eventContext)];}if(prefix==='?'){return [new BooleanAttributePart(element,name.slice(1),strings)];}const committer=new AttributeCommitter(element,name,strings);return committer.parts;}/**
     * Create parts for a text-position binding.
     * @param templateFactory
     */handleTextExpression(options){return new NodePart(options);}}const defaultTemplateProcessor=new DefaultTemplateProcessor();

// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if(typeof window!=='undefined'){(window['litHtmlVersions']||(window['litHtmlVersions']=[])).push('1.3.0');}/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */const html=(strings,...values)=>new TemplateResult(strings,values,'html',defaultTemplateProcessor);/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */const svg=(strings,...values)=>new SVGTemplateResult(strings,values,'svg',defaultTemplateProcessor);

const getTemplateCacheKey=(type,scopeName)=>`${type}--${scopeName}`;let compatibleShadyCSSVersion=true;if(typeof window.ShadyCSS==='undefined'){compatibleShadyCSSVersion=false;}else if(typeof window.ShadyCSS.prepareTemplateDom==='undefined'){console.warn(`Incompatible ShadyCSS version detected. `+`Please update to at least @webcomponents/webcomponentsjs@2.0.2 and `+`@webcomponents/shadycss@1.3.1.`);compatibleShadyCSSVersion=false;}/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */const shadyTemplateFactory=scopeName=>result=>{const cacheKey=getTemplateCacheKey(result.type,scopeName);let templateCache=templateCaches.get(cacheKey);if(templateCache===undefined){templateCache={stringsArray:new WeakMap(),keyString:new Map()};templateCaches.set(cacheKey,templateCache);}let template=templateCache.stringsArray.get(result.strings);if(template!==undefined){return template;}const key=result.strings.join(marker);template=templateCache.keyString.get(key);if(template===undefined){const element=result.getTemplateElement();if(compatibleShadyCSSVersion){window.ShadyCSS.prepareTemplateDom(element,scopeName);}template=new Template(result,element);templateCache.keyString.set(key,template);}templateCache.stringsArray.set(result.strings,template);return template;};const TEMPLATE_TYPES=['html','svg'];/**
 * Removes all style elements from Templates for the given scopeName.
 */const removeStylesFromLitTemplates=scopeName=>{TEMPLATE_TYPES.forEach(type=>{const templates=templateCaches.get(getTemplateCacheKey(type,scopeName));if(templates!==undefined){templates.keyString.forEach(template=>{const{element:{content}}=template;// IE 11 doesn't support the iterable param Set constructor
const styles=new Set();Array.from(content.querySelectorAll('style')).forEach(s=>{styles.add(s);});removeNodesFromTemplate(template,styles);});}});};const shadyRenderSet=new Set();/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */const prepareTemplateStyles=(scopeName,renderedDOM,template)=>{shadyRenderSet.add(scopeName);// If `renderedDOM` is stamped from a Template, then we need to edit that
// Template's underlying template element. Otherwise, we create one here
// to give to ShadyCSS, which still requires one while scoping.
const templateElement=!!template?template.element:document.createElement('template');// Move styles out of rendered DOM and store.
const styles=renderedDOM.querySelectorAll('style');const{length}=styles;// If there are no styles, skip unnecessary work
if(length===0){// Ensure prepareTemplateStyles is called to support adding
// styles via `prepareAdoptedCssText` since that requires that
// `prepareTemplateStyles` is called.
//
// ShadyCSS will only update styles containing @apply in the template
// given to `prepareTemplateStyles`. If no lit Template was given,
// ShadyCSS will not be able to update uses of @apply in any relevant
// template. However, this is not a problem because we only create the
// template for the purpose of supporting `prepareAdoptedCssText`,
// which doesn't support @apply at all.
window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);return;}const condensedStyle=document.createElement('style');// Collect styles into a single style. This helps us make sure ShadyCSS
// manipulations will not prevent us from being able to fix up template
// part indices.
// NOTE: collecting styles is inefficient for browsers but ShadyCSS
// currently does this anyway. When it does not, this should be changed.
for(let i=0;i<length;i++){const style=styles[i];style.parentNode.removeChild(style);condensedStyle.textContent+=style.textContent;}// Remove styles from nested templates in this scope.
removeStylesFromLitTemplates(scopeName);// And then put the condensed style into the "root" template passed in as
// `template`.
const content=templateElement.content;if(!!template){insertNodeIntoTemplate(template,condensedStyle,content.firstChild);}else {content.insertBefore(condensedStyle,content.firstChild);}// Note, it's important that ShadyCSS gets the template that `lit-html`
// will actually render so that it can update the style inside when
// needed (e.g. @apply native Shadow DOM case).
window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);const style=content.querySelector('style');if(window.ShadyCSS.nativeShadow&&style!==null){// When in native Shadow DOM, ensure the style created by ShadyCSS is
// included in initially rendered output (`renderedDOM`).
renderedDOM.insertBefore(style.cloneNode(true),renderedDOM.firstChild);}else if(!!template){// When no style is left in the template, parts will be broken as a
// result. To fix this, we put back the style node ShadyCSS removed
// and then tell lit to remove that node from the template.
// There can be no style in the template in 2 cases (1) when Shady DOM
// is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
// is in use ShadyCSS removes the style if it contains no content.
// NOTE, ShadyCSS creates its own style so we can safely add/remove
// `condensedStyle` here.
content.insertBefore(condensedStyle,content.firstChild);const removes=new Set();removes.add(condensedStyle);removeNodesFromTemplate(template,removes);}};/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */const render$1=(result,container,options)=>{if(!options||typeof options!=='object'||!options.scopeName){throw new Error('The `scopeName` option is required.');}const scopeName=options.scopeName;const hasRendered=parts.has(container);const needsScoping=compatibleShadyCSSVersion&&container.nodeType===11/* Node.DOCUMENT_FRAGMENT_NODE */&&!!container.host;// Handle first render to a scope specially...
const firstScopeRender=needsScoping&&!shadyRenderSet.has(scopeName);// On first scope render, render into a fragment; this cannot be a single
// fragment that is reused since nested renders can occur synchronously.
const renderContainer=firstScopeRender?document.createDocumentFragment():container;render(result,renderContainer,Object.assign({templateFactory:shadyTemplateFactory(scopeName)},options));// When performing first scope render,
// (1) We've rendered into a fragment so that there's a chance to
// `prepareTemplateStyles` before sub-elements hit the DOM
// (which might cause them to render based on a common pattern of
// rendering in a custom element's `connectedCallback`);
// (2) Scope the template with ShadyCSS one time only for this scope.
// (3) Render the fragment into the container and make sure the
// container knows its `part` is the one we just rendered. This ensures
// DOM will be re-used on subsequent renders.
if(firstScopeRender){const part=parts.get(renderContainer);parts.delete(renderContainer);// ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
// that should apply to `renderContainer` even if the rendered value is
// not a TemplateInstance. However, it will only insert scoped styles
// into the document if `prepareTemplateStyles` has already been called
// for the given scope name.
const template=part.value instanceof TemplateInstance?part.value.template:undefined;prepareTemplateStyles(scopeName,renderContainer,template);removeNodes(container,container.firstChild);container.appendChild(renderContainer);parts.set(container,part);}// After elements have hit the DOM, update styling if this is the
// initial render to this container.
// This is needed whenever dynamic changes are made so it would be
// safest to do every render; however, this would regress performance
// so we leave it up to the user to call `ShadyCSS.styleElement`
// for dynamic changes.
if(!hasRendered&&needsScoping){window.ShadyCSS.styleElement(container.host);}};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var _a;/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */ /*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */window.JSCompiler_renameProperty=(prop,_obj)=>prop;const defaultConverter={toAttribute(value,type){switch(type){case Boolean:return value?'':null;case Object:case Array:// if the value is `null` or `undefined` pass this through
// to allow removing/no change behavior.
return value==null?value:JSON.stringify(value);}return value;},fromAttribute(value,type){switch(type){case Boolean:return value!==null;case Number:return value===null?null:Number(value);case Object:case Array:return JSON.parse(value);}return value;}};/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */const notEqual=(value,old)=>{// This ensures (old==NaN, value==NaN) always returns false
return old!==value&&(old===old||value===value);};const defaultPropertyDeclaration={attribute:true,type:String,converter:defaultConverter,reflect:false,hasChanged:notEqual};const STATE_HAS_UPDATED=1;const STATE_UPDATE_REQUESTED=1<<2;const STATE_IS_REFLECTING_TO_ATTRIBUTE=1<<3;const STATE_IS_REFLECTING_TO_PROPERTY=1<<4;/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */const finalized='finalized';/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */class UpdatingElement extends HTMLElement{constructor(){super();this.initialize();}/**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */static get observedAttributes(){// note: piggy backing on this to ensure we're finalized.
this.finalize();const attributes=[];// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this._classProperties.forEach((v,p)=>{const attr=this._attributeNameForProperty(p,v);if(attr!==undefined){this._attributeToPropertyMap.set(attr,p);attributes.push(attr);}});return attributes;}/**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */ /** @nocollapse */static _ensureClassProperties(){// ensure private storage for property declarations.
if(!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties',this))){this._classProperties=new Map();// NOTE: Workaround IE11 not supporting Map constructor argument.
const superProperties=Object.getPrototypeOf(this)._classProperties;if(superProperties!==undefined){superProperties.forEach((v,k)=>this._classProperties.set(k,v));}}}/**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */static createProperty(name,options=defaultPropertyDeclaration){// Note, since this can be called by the `@property` decorator which
// is called before `finalize`, we ensure storage exists for property
// metadata.
this._ensureClassProperties();this._classProperties.set(name,options);// Do not generate an accessor if the prototype already has one, since
// it would be lost otherwise and that would never be the user's intention;
// Instead, we expect users to call `requestUpdate` themselves from
// user-defined accessors. Note that if the super has an accessor we will
// still overwrite it
if(options.noAccessor||this.prototype.hasOwnProperty(name)){return;}const key=typeof name==='symbol'?Symbol():`__${name}`;const descriptor=this.getPropertyDescriptor(name,key,options);if(descriptor!==undefined){Object.defineProperty(this.prototype,name,descriptor);}}/**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */static getPropertyDescriptor(name,key,options){return {// tslint:disable-next-line:no-any no symbol in index
get(){return this[key];},set(value){const oldValue=this[name];this[key]=value;this.requestUpdateInternal(name,oldValue,options);},configurable:true,enumerable:true};}/**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */static getPropertyOptions(name){return this._classProperties&&this._classProperties.get(name)||defaultPropertyDeclaration;}/**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */static finalize(){// finalize any superclasses
const superCtor=Object.getPrototypeOf(this);if(!superCtor.hasOwnProperty(finalized)){superCtor.finalize();}this[finalized]=true;this._ensureClassProperties();// initialize Map populated in observedAttributes
this._attributeToPropertyMap=new Map();// make any properties
// Note, only process "own" properties since this element will inherit
// any properties defined on the superClass, and finalization ensures
// the entire prototype chain is finalized.
if(this.hasOwnProperty(JSCompiler_renameProperty('properties',this))){const props=this.properties;// support symbols in properties (IE11 does not support this)
const propKeys=[...Object.getOwnPropertyNames(props),...(typeof Object.getOwnPropertySymbols==='function'?Object.getOwnPropertySymbols(props):[])];// This for/of is ok because propKeys is an array
for(const p of propKeys){// note, use of `any` is due to TypeSript lack of support for symbol in
// index types
// tslint:disable-next-line:no-any no symbol in index
this.createProperty(p,props[p]);}}}/**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */static _attributeNameForProperty(name,options){const attribute=options.attribute;return attribute===false?undefined:typeof attribute==='string'?attribute:typeof name==='string'?name.toLowerCase():undefined;}/**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */static _valueHasChanged(value,old,hasChanged=notEqual){return hasChanged(value,old);}/**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */static _propertyValueFromAttribute(value,options){const type=options.type;const converter=options.converter||defaultConverter;const fromAttribute=typeof converter==='function'?converter:converter.fromAttribute;return fromAttribute?fromAttribute(value,type):value;}/**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */static _propertyValueToAttribute(value,options){if(options.reflect===undefined){return;}const type=options.type;const converter=options.converter;const toAttribute=converter&&converter.toAttribute||defaultConverter.toAttribute;return toAttribute(value,type);}/**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */initialize(){this._updateState=0;this._updatePromise=new Promise(res=>this._enableUpdatingResolver=res);this._changedProperties=new Map();this._saveInstanceProperties();// ensures first update will be caught by an early access of
// `updateComplete`
this.requestUpdateInternal();}/**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */_saveInstanceProperties(){// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this.constructor._classProperties.forEach((_v,p)=>{if(this.hasOwnProperty(p)){const value=this[p];delete this[p];if(!this._instanceProperties){this._instanceProperties=new Map();}this._instanceProperties.set(p,value);}});}/**
     * Applies previously saved instance properties.
     */_applyInstanceProperties(){// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
// tslint:disable-next-line:no-any
this._instanceProperties.forEach((v,p)=>this[p]=v);this._instanceProperties=undefined;}connectedCallback(){// Ensure first connection completes an update. Updates cannot complete
// before connection.
this.enableUpdating();}enableUpdating(){if(this._enableUpdatingResolver!==undefined){this._enableUpdatingResolver();this._enableUpdatingResolver=undefined;}}/**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */disconnectedCallback(){}/**
     * Synchronizes property values when attributes change.
     */attributeChangedCallback(name,old,value){if(old!==value){this._attributeToProperty(name,value);}}_propertyToAttribute(name,value,options=defaultPropertyDeclaration){const ctor=this.constructor;const attr=ctor._attributeNameForProperty(name,options);if(attr!==undefined){const attrValue=ctor._propertyValueToAttribute(value,options);// an undefined value does not change the attribute.
if(attrValue===undefined){return;}// Track if the property is being reflected to avoid
// setting the property again via `attributeChangedCallback`. Note:
// 1. this takes advantage of the fact that the callback is synchronous.
// 2. will behave incorrectly if multiple attributes are in the reaction
// stack at time of calling. However, since we process attributes
// in `update` this should not be possible (or an extreme corner case
// that we'd like to discover).
// mark state reflecting
this._updateState=this._updateState|STATE_IS_REFLECTING_TO_ATTRIBUTE;if(attrValue==null){this.removeAttribute(attr);}else {this.setAttribute(attr,attrValue);}// mark state not reflecting
this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_ATTRIBUTE;}}_attributeToProperty(name,value){// Use tracking info to avoid deserializing attribute value if it was
// just set from a property setter.
if(this._updateState&STATE_IS_REFLECTING_TO_ATTRIBUTE){return;}const ctor=this.constructor;// Note, hint this as an `AttributeMap` so closure clearly understands
// the type; it has issues with tracking types through statics
// tslint:disable-next-line:no-unnecessary-type-assertion
const propName=ctor._attributeToPropertyMap.get(name);if(propName!==undefined){const options=ctor.getPropertyOptions(propName);// mark state reflecting
this._updateState=this._updateState|STATE_IS_REFLECTING_TO_PROPERTY;this[propName]=// tslint:disable-next-line:no-any
ctor._propertyValueFromAttribute(value,options);// mark state not reflecting
this._updateState=this._updateState&~STATE_IS_REFLECTING_TO_PROPERTY;}}/**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */requestUpdateInternal(name,oldValue,options){let shouldRequestUpdate=true;// If we have a property key, perform property update steps.
if(name!==undefined){const ctor=this.constructor;options=options||ctor.getPropertyOptions(name);if(ctor._valueHasChanged(this[name],oldValue,options.hasChanged)){if(!this._changedProperties.has(name)){this._changedProperties.set(name,oldValue);}// Add to reflecting properties set.
// Note, it's important that every change has a chance to add the
// property to `_reflectingProperties`. This ensures setting
// attribute + property reflects correctly.
if(options.reflect===true&&!(this._updateState&STATE_IS_REFLECTING_TO_PROPERTY)){if(this._reflectingProperties===undefined){this._reflectingProperties=new Map();}this._reflectingProperties.set(name,options);}}else {// Abort the request if the property should not be considered changed.
shouldRequestUpdate=false;}}if(!this._hasRequestedUpdate&&shouldRequestUpdate){this._updatePromise=this._enqueueUpdate();}}/**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */requestUpdate(name,oldValue){this.requestUpdateInternal(name,oldValue);return this.updateComplete;}/**
     * Sets up the element to asynchronously update.
     */async _enqueueUpdate(){this._updateState=this._updateState|STATE_UPDATE_REQUESTED;try{// Ensure any previous update has resolved before updating.
// This `await` also ensures that property changes are batched.
await this._updatePromise;}catch(e){// Ignore any previous errors. We only care that the previous cycle is
// done. Any error should have been handled in the previous update.
}const result=this.performUpdate();// If `performUpdate` returns a Promise, we await it. This is done to
// enable coordinating updates with a scheduler. Note, the result is
// checked to avoid delaying an additional microtask unless we need to.
if(result!=null){await result;}return !this._hasRequestedUpdate;}get _hasRequestedUpdate(){return this._updateState&STATE_UPDATE_REQUESTED;}get hasUpdated(){return this._updateState&STATE_HAS_UPDATED;}/**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */performUpdate(){// Abort any update if one is not pending when this is called.
// This can happen if `performUpdate` is called early to "flush"
// the update.
if(!this._hasRequestedUpdate){return;}// Mixin instance properties once, if they exist.
if(this._instanceProperties){this._applyInstanceProperties();}let shouldUpdate=false;const changedProperties=this._changedProperties;try{shouldUpdate=this.shouldUpdate(changedProperties);if(shouldUpdate){this.update(changedProperties);}else {this._markUpdated();}}catch(e){// Prevent `firstUpdated` and `updated` from running when there's an
// update exception.
shouldUpdate=false;// Ensure element can accept additional updates after an exception.
this._markUpdated();throw e;}if(shouldUpdate){if(!(this._updateState&STATE_HAS_UPDATED)){this._updateState=this._updateState|STATE_HAS_UPDATED;this.firstUpdated(changedProperties);}this.updated(changedProperties);}}_markUpdated(){this._changedProperties=new Map();this._updateState=this._updateState&~STATE_UPDATE_REQUESTED;}/**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */get updateComplete(){return this._getUpdateComplete();}/**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */_getUpdateComplete(){return this._updatePromise;}/**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */shouldUpdate(_changedProperties){return true;}/**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */update(_changedProperties){if(this._reflectingProperties!==undefined&&this._reflectingProperties.size>0){// Use forEach so this works even if for/of loops are compiled to for
// loops expecting arrays
this._reflectingProperties.forEach((v,k)=>this._propertyToAttribute(k,this[k],v));this._reflectingProperties=undefined;}this._markUpdated();}/**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */updated(_changedProperties){}/**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */firstUpdated(_changedProperties){}}_a=finalized;/**
 * Marks class as having finished creating properties.
 */UpdatingElement[_a]=true;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const legacyCustomElement=(tagName,clazz)=>{window.customElements.define(tagName,clazz);// Cast as any because TS doesn't recognize the return type as being a
// subtype of the decorated class when clazz is typed as
// `Constructor<HTMLElement>` for some reason.
// `Constructor<HTMLElement>` is helpful to make sure the decorator is
// applied to elements however.
// tslint:disable-next-line:no-any
return clazz;};const standardCustomElement=(tagName,descriptor)=>{const{kind,elements}=descriptor;return {kind,elements,// This callback is called once the class is otherwise fully defined
finisher(clazz){window.customElements.define(tagName,clazz);}};};/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */const customElement=tagName=>classOrDescriptor=>typeof classOrDescriptor==='function'?legacyCustomElement(tagName,classOrDescriptor):standardCustomElement(tagName,classOrDescriptor);const standardProperty=(options,element)=>{// When decorating an accessor, pass it through and add property metadata.
// Note, the `hasOwnProperty` check in `createProperty` ensures we don't
// stomp over the user's accessor.
if(element.kind==='method'&&element.descriptor&&!('value'in element.descriptor)){return Object.assign(Object.assign({},element),{finisher(clazz){clazz.createProperty(element.key,options);}});}else {// createProperty() takes care of defining the property, but we still
// must return some kind of descriptor, so return a descriptor for an
// unused prototype field. The finisher calls createProperty().
return {kind:'field',key:Symbol(),placement:'own',descriptor:{},// When @babel/plugin-proposal-decorators implements initializers,
// do this instead of the initializer below. See:
// https://github.com/babel/babel/issues/9260 extras: [
//   {
//     kind: 'initializer',
//     placement: 'own',
//     initializer: descriptor.initializer,
//   }
// ],
initializer(){if(typeof element.initializer==='function'){this[element.key]=element.initializer.call(this);}},finisher(clazz){clazz.createProperty(element.key,options);}};}};const legacyProperty=(options,proto,name)=>{proto.constructor.createProperty(name,options);};/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */function property(options){// tslint:disable-next-line:no-any decorator
return (protoOrDescriptor,name)=>name!==undefined?legacyProperty(options,protoOrDescriptor,name):standardProperty(options,protoOrDescriptor);}/**
 * Declares a private or protected property that still triggers updates to the
 * element when it changes.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */function internalProperty(options){return property({attribute:false,hasChanged:options===null||options===void 0?void 0:options.hasChanged});}/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 * once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */function query(selector,cache){return (protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){return this.renderRoot.querySelector(selector);},enumerable:true,configurable:true};if(cache){const key=typeof name==='symbol'?Symbol():`__${name}`;descriptor.get=function(){if(this[key]===undefined){this[key]=this.renderRoot.querySelector(selector);}return this[key];};}return name!==undefined?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor);};}// Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.
/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */function queryAsync(selector){return (protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={async get(){await this.updateComplete;return this.renderRoot.querySelector(selector);},enumerable:true,configurable:true};return name!==undefined?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor);};}/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAll('div')
 *   divs;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */function queryAll(selector){return (protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){return this.renderRoot.querySelectorAll(selector);},enumerable:true,configurable:true};return name!==undefined?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor);};}const legacyQuery=(descriptor,proto,name)=>{Object.defineProperty(proto,name,descriptor);};const standardQuery=(descriptor,element)=>({kind:'method',placement:'prototype',key:element.key,descriptor});const standardEventOptions=(options,element)=>{return Object.assign(Object.assign({},element),{finisher(clazz){Object.assign(clazz.prototype[element.key],options);}});};const legacyEventOptions=// tslint:disable-next-line:no-any legacy decorator
(options,proto,name)=>{Object.assign(proto[name],options);};/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}`>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */function eventOptions(options){// Return value typed as any to prevent TypeScript from complaining that
// standard decorator function signature does not match TypeScript decorator
// signature
// TODO(kschaaf): unclear why it was only failing on this decorator and not
// the others
return (protoOrDescriptor,name)=>name!==undefined?legacyEventOptions(options,protoOrDescriptor,name):standardEventOptions(options,protoOrDescriptor);}// x-browser support for matches
// tslint:disable-next-line:no-any
const ElementProto=Element.prototype;const legacyMatches=ElementProto.msMatchesSelector||ElementProto.webkitMatchesSelector;/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedNodes` of the given named `slot`. Note, the type of
 * this property should be annotated as `NodeListOf<HTMLElement>`.
 *
 * @param slotName A string name of the slot.
 * @param flatten A boolean which when true flattens the assigned nodes,
 * meaning any assigned nodes that are slot elements are replaced with their
 * assigned nodes.
 * @param selector A string which filters the results to elements that match
 * the given css selector.
 *
 * * @example
 * ```ts
 * class MyElement {
 *   @queryAssignedNodes('list', true, '.item')
 *   listItems;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */function queryAssignedNodes(slotName='',flatten=false,selector=''){return (protoOrDescriptor,// tslint:disable-next-line:no-any decorator
name)=>{const descriptor={get(){const slotSelector=`slot${slotName?`[name=${slotName}]`:':not([name])'}`;const slot=this.renderRoot.querySelector(slotSelector);let nodes=slot&&slot.assignedNodes({flatten});if(nodes&&selector){nodes=nodes.filter(node=>node.nodeType===Node.ELEMENT_NODE&&node.matches?node.matches(selector):legacyMatches.call(node,selector));}return nodes;},enumerable:true,configurable:true};return name!==undefined?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor);};}

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ /**
 * Whether the current browser supports `adoptedStyleSheets`.
 */const supportsAdoptingStyleSheets=window.ShadowRoot&&(window.ShadyCSS===undefined||window.ShadyCSS.nativeShadow)&&'adoptedStyleSheets'in Document.prototype&&'replace'in CSSStyleSheet.prototype;const constructionToken=Symbol();class CSSResult{constructor(cssText,safeToken){if(safeToken!==constructionToken){throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');}this.cssText=cssText;}// Note, this is a getter so that it's lazy. In practice, this means
// stylesheets are not created until the first element instance is made.
get styleSheet(){if(this._styleSheet===undefined){// Note, if `supportsAdoptingStyleSheets` is true then we assume
// CSSStyleSheet is constructable.
if(supportsAdoptingStyleSheets){this._styleSheet=new CSSStyleSheet();this._styleSheet.replaceSync(this.cssText);}else {this._styleSheet=null;}}return this._styleSheet;}toString(){return this.cssText;}}/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */const unsafeCSS=value=>{return new CSSResult(String(value),constructionToken);};const textFromCSSResult=value=>{if(value instanceof CSSResult){return value.cssText;}else if(typeof value==='number'){return value;}else {throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);}};/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */const css=(strings,...values)=>{const cssText=values.reduce((acc,v,idx)=>acc+textFromCSSResult(v)+strings[idx+1],strings[0]);return new CSSResult(cssText,constructionToken);};

// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions']||(window['litElementVersions']=[])).push('2.4.0');/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */const renderNotImplemented={};/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */class LitElement extends UpdatingElement{/**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */static getStyles(){return this.styles;}/** @nocollapse */static _getUniqueStyles(){// Only gather styles once per class
if(this.hasOwnProperty(JSCompiler_renameProperty('_styles',this))){return;}// Take care not to call `this.getStyles()` multiple times since this
// generates new CSSResults each time.
// TODO(sorvell): Since we do not cache CSSResults by input, any
// shared styles will generate new stylesheet objects, which is wasteful.
// This should be addressed when a browser ships constructable
// stylesheets.
const userStyles=this.getStyles();if(Array.isArray(userStyles)){// De-duplicate styles preserving the _last_ instance in the set.
// This is a performance optimization to avoid duplicated styles that can
// occur especially when composing via subclassing.
// The last item is kept to try to preserve the cascade order with the
// assumption that it's most important that last added styles override
// previous styles.
const addStyles=(styles,set)=>styles.reduceRight((set,s)=>// Note: On IE set.add() does not return the set
Array.isArray(s)?addStyles(s,set):(set.add(s),set),set);// Array.from does not work on Set in IE, otherwise return
// Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
const set=addStyles(userStyles,new Set());const styles=[];set.forEach(v=>styles.unshift(v));this._styles=styles;}else {this._styles=userStyles===undefined?[]:[userStyles];}// Ensure that there are no invalid CSSStyleSheet instances here. They are
// invalid in two conditions.
// (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
//     this is impossible to check except via .replaceSync or use
// (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
//     false)
this._styles=this._styles.map(s=>{if(s instanceof CSSStyleSheet&&!supportsAdoptingStyleSheets){// Flatten the cssText from the passed constructible stylesheet (or
// undetectable non-constructible stylesheet). The user might have
// expected to update their stylesheets over time, but the alternative
// is a crash.
const cssText=Array.prototype.slice.call(s.cssRules).reduce((css,rule)=>css+rule.cssText,'');return unsafeCSS(cssText);}return s;});}/**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */initialize(){super.initialize();this.constructor._getUniqueStyles();this.renderRoot=this.createRenderRoot();// Note, if renderRoot is not a shadowRoot, styles would/could apply to the
// element's getRootNode(). While this could be done, we're choosing not to
// support this now since it would require different logic around de-duping.
if(window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot){this.adoptStyles();}}/**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */createRenderRoot(){return this.attachShadow({mode:'open'});}/**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */adoptStyles(){const styles=this.constructor._styles;if(styles.length===0){return;}// There are three separate cases here based on Shadow DOM support.
// (1) shadowRoot polyfilled: use ShadyCSS
// (2) shadowRoot.adoptedStyleSheets available: use it
// (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
// rendering
if(window.ShadyCSS!==undefined&&!window.ShadyCSS.nativeShadow){window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s=>s.cssText),this.localName);}else if(supportsAdoptingStyleSheets){this.renderRoot.adoptedStyleSheets=styles.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);}else {// This must be done after rendering so the actual style insertion is done
// in `update`.
this._needsShimAdoptedStyleSheets=true;}}connectedCallback(){super.connectedCallback();// Note, first update/render handles styleElement so we only call this if
// connected after first update.
if(this.hasUpdated&&window.ShadyCSS!==undefined){window.ShadyCSS.styleElement(this);}}/**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */update(changedProperties){// Setting properties in `render` should not trigger an update. Since
// updates are allowed after super.update, it's important to call `render`
// before that.
const templateResult=this.render();super.update(changedProperties);// If render is not implemented by the component, don't call lit-html render
if(templateResult!==renderNotImplemented){this.constructor.render(templateResult,this.renderRoot,{scopeName:this.localName,eventContext:this});}// When native Shadow DOM is used but adoptedStyles are not supported,
// insert styling after rendering to ensure adoptedStyles have highest
// priority.
if(this._needsShimAdoptedStyleSheets){this._needsShimAdoptedStyleSheets=false;this.constructor._styles.forEach(s=>{const style=document.createElement('style');style.textContent=s.cssText;this.renderRoot.appendChild(style);});}}/**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */render(){return renderNotImplemented;}}/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */LitElement['finalized']=true;/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */LitElement.render=render$1;

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ /**
  This is a JavaScript mixin that you can use to connect a Custom Element base
  class to a Redux store. The `stateChanged(state)` method will be called when
  the state is updated.

  Example:

      import { connect } from 'pwa-helpers/connect-mixin.js';

      class MyElement extends connect(store)(HTMLElement) {
        stateChanged(state) {
          this.textContent = state.data.count.toString();
        }
      }
*/const connect=store=>baseElement=>class extends baseElement{connectedCallback(){if(super.connectedCallback){super.connectedCallback();}this._storeUnsubscribe=store.subscribe(()=>this.stateChanged(store.getState()));this.stateChanged(store.getState());}disconnectedCallback(){this._storeUnsubscribe();if(super.disconnectedCallback){super.disconnectedCallback();}}/**
     * The `stateChanged(state)` method will be called when the state is updated.
     */stateChanged(_state){}};

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ /**
  A Redux store enhancer that lets you lazy-install reducers after the store
  has booted up. Use this if your application lazy-loads routes that are connected
  to a Redux store.

  Example:

      import { combineReducers } from 'redux';
      import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
      import someReducer from './reducers/someReducer.js';

      export const store = createStore(
        (state, action) => state,
        compose(lazyReducerEnhancer(combineReducers))
      );

  Then, in your page/element, you can lazy load a specific reducer with:

      store.addReducers({
        someReducer
      });
*/const lazyReducerEnhancer=combineReducers=>{const enhancer=nextCreator=>{return (origReducer,preloadedState)=>{let lazyReducers={};const nextStore=nextCreator(origReducer,preloadedState);return Object.assign({},nextStore,{addReducers(newReducers){const combinedReducerMap=Object.assign({},lazyReducers,newReducers);this.replaceReducer(combineReducers(lazyReducers=combinedReducerMap));}});};};return enhancer;};

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ /**
  Utility method that calls a callback whenever a media-query matches in response
  to the viewport size changing. The callback should take a boolean parameter
  (with `true` meaning the media query is matched).

  Example:

      import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

      installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
        console.log(matches ? 'wide screen' : 'narrow sreen');
      });
*/const installMediaQueryWatcher=(mediaQuery,layoutChangedCallback)=>{let mql=window.matchMedia(mediaQuery);mql.addListener(e=>layoutChangedCallback(e.matches));layoutChangedCallback(mql.matches);};

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ /**
  Utility method that updates the page's open graph and Twitter card metadata.
  It takes an object as a parameter with the following properties:
  title | description | url | image.

  If the `url` is not specified, `window.location.href` will be used; for
  all other properties, if they aren't specified, then that metadata field will not
  be set.

  Example (in your top level element or document, or in the router callback):

      import { updateMetadata } from 'pwa-helpers/metadata.js';

      updateMetadata({
        title: 'My App - view 1',
        description: 'This is my sample app',
        url: window.location.href,
        image: '/assets/view1-hero.png'
      });

*/const updateMetadata=({title,description,url,image,imageAlt})=>{if(title){document.title=title;setMetaTag('property','og:title',title);}if(description){setMetaTag('name','description',description);setMetaTag('property','og:description',description);}if(image){setMetaTag('property','og:image',image);}if(imageAlt){setMetaTag('property','og:image:alt',imageAlt);}url=url||window.location.href;setMetaTag('property','og:url',url);};/**
  Utility method to create or update the content of a meta tag based on an
  attribute name/value pair.

  Example (in your top level element or document, or in the router callback):

      import { setMetaTag } from 'pwa-helpers/metadata.js';

      setMetaTag('name', 'twitter:card', 'summary');
      
  This would create the following meta tag in the head of the document (or
  update the content attribute if a meta tag with name="twitter:card" exists):

      <meta name="twitter:card" content="summary">

*/function setMetaTag(attrName,attrValue,content){let element=document.head.querySelector(`meta[${attrName}="${attrValue}"]`);if(!element){element=document.createElement('meta');element.setAttribute(attrName,attrValue);document.head.appendChild(element);}element.setAttribute('content',content||'');}

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ /**
  Utility method that calls a callback whenever the network connectivity of the app changes.
  The callback should take a boolean parameter (with `true` meaning
  the network is offline, and `false` meaning online)

  Example:

      import { installOfflineWatcher } from 'pwa-helpers/network.js';

      installOfflineWatcher((offline) => {
        console.log('You are ' + offline ? ' offline' : 'online');
      });
*/const installOfflineWatcher=offlineUpdatedCallback=>{window.addEventListener('online',()=>offlineUpdatedCallback(false));window.addEventListener('offline',()=>offlineUpdatedCallback(true));offlineUpdatedCallback(navigator.onLine===false);};

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ /**
  Basic router that calls a callback whenever the location is updated.

  Example:

      import { installRouter } from 'pwa-helpers/router.js';

      installRouter((location) => handleNavigation(location));

  For example, if you're using this router in a Redux-connected component,
  you could dispatch an action in the callback:

      import { installRouter } from 'pwa-helpers/router.js';
      import { navigate } from '../actions/app.js';

      installRouter((location) => store.dispatch(navigate(location)))

  If you need to force a navigation to a new location programmatically, you can
  do so by pushing a new state using the History API, and then manually
  calling the callback with the new location:

      window.history.pushState({}, '', '/new-route');
      handleNavigation(window.location);

  Optionally, you can use the second argument to read the event that caused the
  navigation. For example, you may want to scroll to top only after a link click.

      installRouter((location, event) => {
        // Only scroll to top on link clicks, not popstate events.
        if (event && event.type === 'click') {
          window.scrollTo(0, 0);
        }
        handleNavigation(location);
      });
*/const installRouter=locationUpdatedCallback=>{document.body.addEventListener('click',e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;const anchor=e.composedPath().filter(n=>n.tagName==='A')[0];if(!anchor||anchor.target||anchor.hasAttribute('download')||anchor.getAttribute('rel')==='external')return;const href=anchor.href;if(!href||href.indexOf('mailto:')!==-1)return;const location=window.location;const origin=location.origin||location.protocol+'//'+location.host;if(href.indexOf(origin)!==0)return;e.preventDefault();if(href!==location.href){window.history.pushState({},'',href);locationUpdatedCallback(location,e);}});window.addEventListener('popstate',e=>locationUpdatedCallback(window.location,e));locationUpdatedCallback(window.location,null/* event */);};

function symbolObservablePonyfill(root){var result;var Symbol=root.Symbol;if(typeof Symbol==='function'){if(Symbol.observable){result=Symbol.observable;}else {result=Symbol('observable');Symbol.observable=result;}}else {result='@@observable';}return result;};

var root;if(typeof self!=='undefined'){root=self;}else if(typeof window!=='undefined'){root=window;}else if(typeof global!=='undefined'){root=global;}else if(typeof module!=='undefined'){root=module;}else {root=Function('return this')();}var result=symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */var randomString=function randomString(){return Math.random().toString(36).substring(7).split('').join('.');};var ActionTypes={INIT:"@@redux/INIT"+randomString(),REPLACE:"@@redux/REPLACE"+randomString(),PROBE_UNKNOWN_ACTION:function PROBE_UNKNOWN_ACTION(){return "@@redux/PROBE_UNKNOWN_ACTION"+randomString();}};/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */function isPlainObject(obj){if(typeof obj!=='object'||obj===null)return false;var proto=obj;while(Object.getPrototypeOf(proto)!==null){proto=Object.getPrototypeOf(proto);}return Object.getPrototypeOf(obj)===proto;}/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */function createStore(reducer,preloadedState,enhancer){var _ref2;if(typeof preloadedState==='function'&&typeof enhancer==='function'||typeof enhancer==='function'&&typeof arguments[3]==='function'){throw new Error('It looks like you are passing several store enhancers to '+'createStore(). This is not supported. Instead, compose them '+'together to a single function.');}if(typeof preloadedState==='function'&&typeof enhancer==='undefined'){enhancer=preloadedState;preloadedState=undefined;}if(typeof enhancer!=='undefined'){if(typeof enhancer!=='function'){throw new Error('Expected the enhancer to be a function.');}return enhancer(createStore)(reducer,preloadedState);}if(typeof reducer!=='function'){throw new Error('Expected the reducer to be a function.');}var currentReducer=reducer;var currentState=preloadedState;var currentListeners=[];var nextListeners=currentListeners;var isDispatching=false;/**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */function ensureCanMutateNextListeners(){if(nextListeners===currentListeners){nextListeners=currentListeners.slice();}}/**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */function getState(){if(isDispatching){throw new Error('You may not call store.getState() while the reducer is executing. '+'The reducer has already received the state as an argument. '+'Pass it down from the top reducer instead of reading it from the store.');}return currentState;}/**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */function subscribe(listener){if(typeof listener!=='function'){throw new Error('Expected the listener to be a function.');}if(isDispatching){throw new Error('You may not call store.subscribe() while the reducer is executing. '+'If you would like to be notified after the store has been updated, subscribe from a '+'component and invoke store.getState() in the callback to access the latest state. '+'See https://redux.js.org/api-reference/store#subscribelistener for more details.');}var isSubscribed=true;ensureCanMutateNextListeners();nextListeners.push(listener);return function unsubscribe(){if(!isSubscribed){return;}if(isDispatching){throw new Error('You may not unsubscribe from a store listener while the reducer is executing. '+'See https://redux.js.org/api-reference/store#subscribelistener for more details.');}isSubscribed=false;ensureCanMutateNextListeners();var index=nextListeners.indexOf(listener);nextListeners.splice(index,1);currentListeners=null;};}/**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */function dispatch(action){if(!isPlainObject(action)){throw new Error('Actions must be plain objects. '+'Use custom middleware for async actions.');}if(typeof action.type==='undefined'){throw new Error('Actions may not have an undefined "type" property. '+'Have you misspelled a constant?');}if(isDispatching){throw new Error('Reducers may not dispatch actions.');}try{isDispatching=true;currentState=currentReducer(currentState,action);}finally{isDispatching=false;}var listeners=currentListeners=nextListeners;for(var i=0;i<listeners.length;i++){var listener=listeners[i];listener();}return action;}/**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */function replaceReducer(nextReducer){if(typeof nextReducer!=='function'){throw new Error('Expected the nextReducer to be a function.');}currentReducer=nextReducer;// This action has a similiar effect to ActionTypes.INIT.
// Any reducers that existed in both the new and old rootReducer
// will receive the previous state. This effectively populates
// the new state tree with any relevant data from the old one.
dispatch({type:ActionTypes.REPLACE});}/**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */function observable(){var _ref;var outerSubscribe=subscribe;return _ref={/**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */subscribe:function subscribe(observer){if(typeof observer!=='object'||observer===null){throw new TypeError('Expected the observer to be an object.');}function observeState(){if(observer.next){observer.next(getState());}}observeState();var unsubscribe=outerSubscribe(observeState);return {unsubscribe:unsubscribe};}},_ref[result]=function(){return this;},_ref;}// When a store is created, an "INIT" action is dispatched so that every
// reducer returns their initial state. This effectively populates
// the initial state tree.
dispatch({type:ActionTypes.INIT});return _ref2={dispatch:dispatch,subscribe:subscribe,getState:getState,replaceReducer:replaceReducer},_ref2[result]=observable,_ref2;}/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */function warning(message){/* eslint-disable no-console */if(typeof console!=='undefined'&&typeof console.error==='function'){console.error(message);}/* eslint-enable no-console */try{// This error was thrown as a convenience so that if you enable
// "break on all exceptions" in your console,
// it would pause the execution at this line.
throw new Error(message);}catch(e){}// eslint-disable-line no-empty
}function getUndefinedStateErrorMessage(key,action){var actionType=action&&action.type;var actionDescription=actionType&&"action \""+String(actionType)+"\""||'an action';return "Given "+actionDescription+", reducer \""+key+"\" returned undefined. "+"To ignore an action, you must explicitly return the previous state. "+"If you want this reducer to hold no value, you can return null instead of undefined.";}function getUnexpectedStateShapeWarningMessage(inputState,reducers,action,unexpectedKeyCache){var reducerKeys=Object.keys(reducers);var argumentName=action&&action.type===ActionTypes.INIT?'preloadedState argument passed to createStore':'previous state received by the reducer';if(reducerKeys.length===0){return 'Store does not have a valid reducer. Make sure the argument passed '+'to combineReducers is an object whose values are reducers.';}if(!isPlainObject(inputState)){return "The "+argumentName+" has unexpected type of \""+{}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1]+"\". Expected argument to be an object with the following "+("keys: \""+reducerKeys.join('", "')+"\"");}var unexpectedKeys=Object.keys(inputState).filter(function(key){return !reducers.hasOwnProperty(key)&&!unexpectedKeyCache[key];});unexpectedKeys.forEach(function(key){unexpectedKeyCache[key]=true;});if(action&&action.type===ActionTypes.REPLACE)return;if(unexpectedKeys.length>0){return "Unexpected "+(unexpectedKeys.length>1?'keys':'key')+" "+("\""+unexpectedKeys.join('", "')+"\" found in "+argumentName+". ")+"Expected to find one of the known reducer keys instead: "+("\""+reducerKeys.join('", "')+"\". Unexpected keys will be ignored.");}}function assertReducerShape(reducers){Object.keys(reducers).forEach(function(key){var reducer=reducers[key];var initialState=reducer(undefined,{type:ActionTypes.INIT});if(typeof initialState==='undefined'){throw new Error("Reducer \""+key+"\" returned undefined during initialization. "+"If the state passed to the reducer is undefined, you must "+"explicitly return the initial state. The initial state may "+"not be undefined. If you don't want to set a value for this reducer, "+"you can use null instead of undefined.");}if(typeof reducer(undefined,{type:ActionTypes.PROBE_UNKNOWN_ACTION()})==='undefined'){throw new Error("Reducer \""+key+"\" returned undefined when probed with a random type. "+("Don't try to handle "+ActionTypes.INIT+" or other actions in \"redux/*\" ")+"namespace. They are considered private. Instead, you must return the "+"current state for any unknown actions, unless it is undefined, "+"in which case you must return the initial state, regardless of the "+"action type. The initial state may not be undefined, but can be null.");}});}/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */function combineReducers(reducers){var reducerKeys=Object.keys(reducers);var finalReducers={};for(var i=0;i<reducerKeys.length;i++){var key=reducerKeys[i];if(process.env.NODE_ENV!=='production'){if(typeof reducers[key]==='undefined'){warning("No reducer provided for key \""+key+"\"");}}if(typeof reducers[key]==='function'){finalReducers[key]=reducers[key];}}var finalReducerKeys=Object.keys(finalReducers);// This is used to make sure we don't warn about the same
// keys multiple times.
var unexpectedKeyCache;if(process.env.NODE_ENV!=='production'){unexpectedKeyCache={};}var shapeAssertionError;try{assertReducerShape(finalReducers);}catch(e){shapeAssertionError=e;}return function combination(state,action){if(state===void 0){state={};}if(shapeAssertionError){throw shapeAssertionError;}if(process.env.NODE_ENV!=='production'){var warningMessage=getUnexpectedStateShapeWarningMessage(state,finalReducers,action,unexpectedKeyCache);if(warningMessage){warning(warningMessage);}}var hasChanged=false;var nextState={};for(var _i=0;_i<finalReducerKeys.length;_i++){var _key=finalReducerKeys[_i];var reducer=finalReducers[_key];var previousStateForKey=state[_key];var nextStateForKey=reducer(previousStateForKey,action);if(typeof nextStateForKey==='undefined'){var errorMessage=getUndefinedStateErrorMessage(_key,action);throw new Error(errorMessage);}nextState[_key]=nextStateForKey;hasChanged=hasChanged||nextStateForKey!==previousStateForKey;}hasChanged=hasChanged||finalReducerKeys.length!==Object.keys(state).length;return hasChanged?nextState:state;};}function bindActionCreator(actionCreator,dispatch){return function(){return dispatch(actionCreator.apply(this,arguments));};}/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */function bindActionCreators(actionCreators,dispatch){if(typeof actionCreators==='function'){return bindActionCreator(actionCreators,dispatch);}if(typeof actionCreators!=='object'||actionCreators===null){throw new Error("bindActionCreators expected an object or a function, instead received "+(actionCreators===null?'null':typeof actionCreators)+". "+"Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");}var boundActionCreators={};for(var key in actionCreators){var actionCreator=actionCreators[key];if(typeof actionCreator==='function'){boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);}}return boundActionCreators;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj;}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object));}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});return keys;}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else {ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */function compose(){for(var _len=arguments.length,funcs=new Array(_len),_key=0;_key<_len;_key++){funcs[_key]=arguments[_key];}if(funcs.length===0){return function(arg){return arg;};}if(funcs.length===1){return funcs[0];}return funcs.reduce(function(a,b){return function(){return a(b.apply(void 0,arguments));};});}/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */function applyMiddleware(){for(var _len=arguments.length,middlewares=new Array(_len),_key=0;_key<_len;_key++){middlewares[_key]=arguments[_key];}return function(createStore){return function(){var store=createStore.apply(void 0,arguments);var _dispatch=function dispatch(){throw new Error('Dispatching while constructing your middleware is not allowed. '+'Other middleware would not be applied to this dispatch.');};var middlewareAPI={getState:store.getState,dispatch:function dispatch(){return _dispatch.apply(void 0,arguments);}};var chain=middlewares.map(function(middleware){return middleware(middlewareAPI);});_dispatch=compose.apply(void 0,chain)(store.dispatch);return _objectSpread2({},store,{dispatch:_dispatch});};};}/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */function isCrushed(){}if(process.env.NODE_ENV!=='production'&&typeof isCrushed.name==='string'&&isCrushed.name!=='isCrushed'){warning('You are currently using minified code outside of NODE_ENV === "production". '+'This means that you are running a slower development build of Redux. '+'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify '+'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) '+'to ensure you have the correct code for your production build.');}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function isFunction(x){return typeof x==='function';}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var _enable_super_gross_mode_that_will_cause_bad_things=false;var config={Promise:undefined,set useDeprecatedSynchronousErrorHandling(value){if(value){var error=/*@__PURE__*/new Error();/*@__PURE__*/console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n'+error.stack);}else if(_enable_super_gross_mode_that_will_cause_bad_things){/*@__PURE__*/console.log('RxJS: Back to a better error behavior. Thank you. <3');}_enable_super_gross_mode_that_will_cause_bad_things=value;},get useDeprecatedSynchronousErrorHandling(){return _enable_super_gross_mode_that_will_cause_bad_things;}};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function hostReportError(err){setTimeout(function(){throw err;},0);}

var empty={closed:true,next:function(value){},error:function(err){if(config.useDeprecatedSynchronousErrorHandling){throw err;}else {hostReportError(err);}},complete:function(){}};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var isArray=/*@__PURE__*/function(){return Array.isArray||function(x){return x&&typeof x.length==='number';};}();

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function isObject(x){return x!==null&&typeof x==='object';}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var UnsubscriptionErrorImpl=/*@__PURE__*/function(){function UnsubscriptionErrorImpl(errors){Error.call(this);this.message=errors?errors.length+" errors occurred during unsubscription:\n"+errors.map(function(err,i){return i+1+") "+err.toString();}).join('\n  '):'';this.name='UnsubscriptionError';this.errors=errors;return this;}UnsubscriptionErrorImpl.prototype=/*@__PURE__*/Object.create(Error.prototype);return UnsubscriptionErrorImpl;}();var UnsubscriptionError=UnsubscriptionErrorImpl;

var Subscription=/*@__PURE__*/function(){function Subscription(unsubscribe){this.closed=false;this._parentOrParents=null;this._subscriptions=null;if(unsubscribe){this._ctorUnsubscribe=true;this._unsubscribe=unsubscribe;}}Subscription.prototype.unsubscribe=function(){var errors;if(this.closed){return;}var _a=this,_parentOrParents=_a._parentOrParents,_ctorUnsubscribe=_a._ctorUnsubscribe,_unsubscribe=_a._unsubscribe,_subscriptions=_a._subscriptions;this.closed=true;this._parentOrParents=null;this._subscriptions=null;if(_parentOrParents instanceof Subscription){_parentOrParents.remove(this);}else if(_parentOrParents!==null){for(var index=0;index<_parentOrParents.length;++index){var parent_1=_parentOrParents[index];parent_1.remove(this);}}if(isFunction(_unsubscribe)){if(_ctorUnsubscribe){this._unsubscribe=undefined;}try{_unsubscribe.call(this);}catch(e){errors=e instanceof UnsubscriptionError?flattenUnsubscriptionErrors(e.errors):[e];}}if(isArray(_subscriptions)){var index=-1;var len=_subscriptions.length;while(++index<len){var sub=_subscriptions[index];if(isObject(sub)){try{sub.unsubscribe();}catch(e){errors=errors||[];if(e instanceof UnsubscriptionError){errors=errors.concat(flattenUnsubscriptionErrors(e.errors));}else {errors.push(e);}}}}}if(errors){throw new UnsubscriptionError(errors);}};Subscription.prototype.add=function(teardown){var subscription=teardown;if(!teardown){return Subscription.EMPTY;}switch(typeof teardown){case'function':subscription=new Subscription(teardown);case'object':if(subscription===this||subscription.closed||typeof subscription.unsubscribe!=='function'){return subscription;}else if(this.closed){subscription.unsubscribe();return subscription;}else if(!(subscription instanceof Subscription)){var tmp=subscription;subscription=new Subscription();subscription._subscriptions=[tmp];}break;default:{throw new Error('unrecognized teardown '+teardown+' added to Subscription.');}}var _parentOrParents=subscription._parentOrParents;if(_parentOrParents===null){subscription._parentOrParents=this;}else if(_parentOrParents instanceof Subscription){if(_parentOrParents===this){return subscription;}subscription._parentOrParents=[_parentOrParents,this];}else if(_parentOrParents.indexOf(this)===-1){_parentOrParents.push(this);}else {return subscription;}var subscriptions=this._subscriptions;if(subscriptions===null){this._subscriptions=[subscription];}else {subscriptions.push(subscription);}return subscription;};Subscription.prototype.remove=function(subscription){var subscriptions=this._subscriptions;if(subscriptions){var subscriptionIndex=subscriptions.indexOf(subscription);if(subscriptionIndex!==-1){subscriptions.splice(subscriptionIndex,1);}}};Subscription.EMPTY=function(empty){empty.closed=true;return empty;}(new Subscription());return Subscription;}();function flattenUnsubscriptionErrors(errors){return errors.reduce(function(errs,err){return errs.concat(err instanceof UnsubscriptionError?err.errors:err);},[]);}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var rxSubscriber=/*@__PURE__*/function(){return typeof Symbol==='function'?/*@__PURE__*/Symbol('rxSubscriber'):'@@rxSubscriber_'+/*@__PURE__*/Math.random();}();var $$rxSubscriber=rxSubscriber;

var Subscriber=/*@__PURE__*/function(_super){__extends(Subscriber,_super);function Subscriber(destinationOrNext,error,complete){var _this=_super.call(this)||this;_this.syncErrorValue=null;_this.syncErrorThrown=false;_this.syncErrorThrowable=false;_this.isStopped=false;switch(arguments.length){case 0:_this.destination=empty;break;case 1:if(!destinationOrNext){_this.destination=empty;break;}if(typeof destinationOrNext==='object'){if(destinationOrNext instanceof Subscriber){_this.syncErrorThrowable=destinationOrNext.syncErrorThrowable;_this.destination=destinationOrNext;destinationOrNext.add(_this);}else {_this.syncErrorThrowable=true;_this.destination=new SafeSubscriber(_this,destinationOrNext);}break;}default:_this.syncErrorThrowable=true;_this.destination=new SafeSubscriber(_this,destinationOrNext,error,complete);break;}return _this;}Subscriber.prototype[rxSubscriber]=function(){return this;};Subscriber.create=function(next,error,complete){var subscriber=new Subscriber(next,error,complete);subscriber.syncErrorThrowable=false;return subscriber;};Subscriber.prototype.next=function(value){if(!this.isStopped){this._next(value);}};Subscriber.prototype.error=function(err){if(!this.isStopped){this.isStopped=true;this._error(err);}};Subscriber.prototype.complete=function(){if(!this.isStopped){this.isStopped=true;this._complete();}};Subscriber.prototype.unsubscribe=function(){if(this.closed){return;}this.isStopped=true;_super.prototype.unsubscribe.call(this);};Subscriber.prototype._next=function(value){this.destination.next(value);};Subscriber.prototype._error=function(err){this.destination.error(err);this.unsubscribe();};Subscriber.prototype._complete=function(){this.destination.complete();this.unsubscribe();};Subscriber.prototype._unsubscribeAndRecycle=function(){var _parentOrParents=this._parentOrParents;this._parentOrParents=null;this.unsubscribe();this.closed=false;this.isStopped=false;this._parentOrParents=_parentOrParents;return this;};return Subscriber;}(Subscription);var SafeSubscriber=/*@__PURE__*/function(_super){__extends(SafeSubscriber,_super);function SafeSubscriber(_parentSubscriber,observerOrNext,error,complete){var _this=_super.call(this)||this;_this._parentSubscriber=_parentSubscriber;var next;var context=_this;if(isFunction(observerOrNext)){next=observerOrNext;}else if(observerOrNext){next=observerOrNext.next;error=observerOrNext.error;complete=observerOrNext.complete;if(observerOrNext!==empty){context=Object.create(observerOrNext);if(isFunction(context.unsubscribe)){_this.add(context.unsubscribe.bind(context));}context.unsubscribe=_this.unsubscribe.bind(_this);}}_this._context=context;_this._next=next;_this._error=error;_this._complete=complete;return _this;}SafeSubscriber.prototype.next=function(value){if(!this.isStopped&&this._next){var _parentSubscriber=this._parentSubscriber;if(!config.useDeprecatedSynchronousErrorHandling||!_parentSubscriber.syncErrorThrowable){this.__tryOrUnsub(this._next,value);}else if(this.__tryOrSetError(_parentSubscriber,this._next,value)){this.unsubscribe();}}};SafeSubscriber.prototype.error=function(err){if(!this.isStopped){var _parentSubscriber=this._parentSubscriber;var useDeprecatedSynchronousErrorHandling=config.useDeprecatedSynchronousErrorHandling;if(this._error){if(!useDeprecatedSynchronousErrorHandling||!_parentSubscriber.syncErrorThrowable){this.__tryOrUnsub(this._error,err);this.unsubscribe();}else {this.__tryOrSetError(_parentSubscriber,this._error,err);this.unsubscribe();}}else if(!_parentSubscriber.syncErrorThrowable){this.unsubscribe();if(useDeprecatedSynchronousErrorHandling){throw err;}hostReportError(err);}else {if(useDeprecatedSynchronousErrorHandling){_parentSubscriber.syncErrorValue=err;_parentSubscriber.syncErrorThrown=true;}else {hostReportError(err);}this.unsubscribe();}}};SafeSubscriber.prototype.complete=function(){var _this=this;if(!this.isStopped){var _parentSubscriber=this._parentSubscriber;if(this._complete){var wrappedComplete=function(){return _this._complete.call(_this._context);};if(!config.useDeprecatedSynchronousErrorHandling||!_parentSubscriber.syncErrorThrowable){this.__tryOrUnsub(wrappedComplete);this.unsubscribe();}else {this.__tryOrSetError(_parentSubscriber,wrappedComplete);this.unsubscribe();}}else {this.unsubscribe();}}};SafeSubscriber.prototype.__tryOrUnsub=function(fn,value){try{fn.call(this._context,value);}catch(err){this.unsubscribe();if(config.useDeprecatedSynchronousErrorHandling){throw err;}else {hostReportError(err);}}};SafeSubscriber.prototype.__tryOrSetError=function(parent,fn,value){if(!config.useDeprecatedSynchronousErrorHandling){throw new Error('bad call');}try{fn.call(this._context,value);}catch(err){if(config.useDeprecatedSynchronousErrorHandling){parent.syncErrorValue=err;parent.syncErrorThrown=true;return true;}else {hostReportError(err);return true;}}return false;};SafeSubscriber.prototype._unsubscribe=function(){var _parentSubscriber=this._parentSubscriber;this._context=null;this._parentSubscriber=null;_parentSubscriber.unsubscribe();};return SafeSubscriber;}(Subscriber);

function canReportError(observer){while(observer){var _a=observer,closed_1=_a.closed,destination=_a.destination,isStopped=_a.isStopped;if(closed_1||isStopped){return false;}else if(destination&&destination instanceof Subscriber){observer=destination;}else {observer=null;}}return true;}

function toSubscriber(nextOrObserver,error,complete){if(nextOrObserver){if(nextOrObserver instanceof Subscriber){return nextOrObserver;}if(nextOrObserver[rxSubscriber]){return nextOrObserver[rxSubscriber]();}}if(!nextOrObserver&&!error&&!complete){return new Subscriber(empty);}return new Subscriber(nextOrObserver,error,complete);}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var observable=/*@__PURE__*/function(){return typeof Symbol==='function'&&Symbol.observable||'@@observable';}();

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function identity(x){return x;}

function pipe(){var fns=[];for(var _i=0;_i<arguments.length;_i++){fns[_i]=arguments[_i];}return pipeFromArray(fns);}function pipeFromArray(fns){if(fns.length===0){return identity;}if(fns.length===1){return fns[0];}return function piped(input){return fns.reduce(function(prev,fn){return fn(prev);},input);};}

var Observable=/*@__PURE__*/function(){function Observable(subscribe){this._isScalar=false;if(subscribe){this._subscribe=subscribe;}}Observable.prototype.lift=function(operator){var observable=new Observable();observable.source=this;observable.operator=operator;return observable;};Observable.prototype.subscribe=function(observerOrNext,error,complete){var operator=this.operator;var sink=toSubscriber(observerOrNext,error,complete);if(operator){sink.add(operator.call(sink,this.source));}else {sink.add(this.source||config.useDeprecatedSynchronousErrorHandling&&!sink.syncErrorThrowable?this._subscribe(sink):this._trySubscribe(sink));}if(config.useDeprecatedSynchronousErrorHandling){if(sink.syncErrorThrowable){sink.syncErrorThrowable=false;if(sink.syncErrorThrown){throw sink.syncErrorValue;}}}return sink;};Observable.prototype._trySubscribe=function(sink){try{return this._subscribe(sink);}catch(err){if(config.useDeprecatedSynchronousErrorHandling){sink.syncErrorThrown=true;sink.syncErrorValue=err;}if(canReportError(sink)){sink.error(err);}else {console.warn(err);}}};Observable.prototype.forEach=function(next,promiseCtor){var _this=this;promiseCtor=getPromiseCtor(promiseCtor);return new promiseCtor(function(resolve,reject){var subscription;subscription=_this.subscribe(function(value){try{next(value);}catch(err){reject(err);if(subscription){subscription.unsubscribe();}}},reject,resolve);});};Observable.prototype._subscribe=function(subscriber){var source=this.source;return source&&source.subscribe(subscriber);};Observable.prototype[observable]=function(){return this;};Observable.prototype.pipe=function(){var operations=[];for(var _i=0;_i<arguments.length;_i++){operations[_i]=arguments[_i];}if(operations.length===0){return this;}return pipeFromArray(operations)(this);};Observable.prototype.toPromise=function(promiseCtor){var _this=this;promiseCtor=getPromiseCtor(promiseCtor);return new promiseCtor(function(resolve,reject){var value;_this.subscribe(function(x){return value=x;},function(err){return reject(err);},function(){return resolve(value);});});};Observable.create=function(subscribe){return new Observable(subscribe);};return Observable;}();function getPromiseCtor(promiseCtor){if(!promiseCtor){promiseCtor=config.Promise||Promise;}if(!promiseCtor){throw new Error('no Promise impl found');}return promiseCtor;}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var ObjectUnsubscribedErrorImpl=/*@__PURE__*/function(){function ObjectUnsubscribedErrorImpl(){Error.call(this);this.message='object unsubscribed';this.name='ObjectUnsubscribedError';return this;}ObjectUnsubscribedErrorImpl.prototype=/*@__PURE__*/Object.create(Error.prototype);return ObjectUnsubscribedErrorImpl;}();var ObjectUnsubscribedError=ObjectUnsubscribedErrorImpl;

var SubjectSubscription=/*@__PURE__*/function(_super){__extends(SubjectSubscription,_super);function SubjectSubscription(subject,subscriber){var _this=_super.call(this)||this;_this.subject=subject;_this.subscriber=subscriber;_this.closed=false;return _this;}SubjectSubscription.prototype.unsubscribe=function(){if(this.closed){return;}this.closed=true;var subject=this.subject;var observers=subject.observers;this.subject=null;if(!observers||observers.length===0||subject.isStopped||subject.closed){return;}var subscriberIndex=observers.indexOf(this.subscriber);if(subscriberIndex!==-1){observers.splice(subscriberIndex,1);}};return SubjectSubscription;}(Subscription);

var SubjectSubscriber=/*@__PURE__*/function(_super){__extends(SubjectSubscriber,_super);function SubjectSubscriber(destination){var _this=_super.call(this,destination)||this;_this.destination=destination;return _this;}return SubjectSubscriber;}(Subscriber);var Subject=/*@__PURE__*/function(_super){__extends(Subject,_super);function Subject(){var _this=_super.call(this)||this;_this.observers=[];_this.closed=false;_this.isStopped=false;_this.hasError=false;_this.thrownError=null;return _this;}Subject.prototype[rxSubscriber]=function(){return new SubjectSubscriber(this);};Subject.prototype.lift=function(operator){var subject=new AnonymousSubject(this,this);subject.operator=operator;return subject;};Subject.prototype.next=function(value){if(this.closed){throw new ObjectUnsubscribedError();}if(!this.isStopped){var observers=this.observers;var len=observers.length;var copy=observers.slice();for(var i=0;i<len;i++){copy[i].next(value);}}};Subject.prototype.error=function(err){if(this.closed){throw new ObjectUnsubscribedError();}this.hasError=true;this.thrownError=err;this.isStopped=true;var observers=this.observers;var len=observers.length;var copy=observers.slice();for(var i=0;i<len;i++){copy[i].error(err);}this.observers.length=0;};Subject.prototype.complete=function(){if(this.closed){throw new ObjectUnsubscribedError();}this.isStopped=true;var observers=this.observers;var len=observers.length;var copy=observers.slice();for(var i=0;i<len;i++){copy[i].complete();}this.observers.length=0;};Subject.prototype.unsubscribe=function(){this.isStopped=true;this.closed=true;this.observers=null;};Subject.prototype._trySubscribe=function(subscriber){if(this.closed){throw new ObjectUnsubscribedError();}else {return _super.prototype._trySubscribe.call(this,subscriber);}};Subject.prototype._subscribe=function(subscriber){if(this.closed){throw new ObjectUnsubscribedError();}else if(this.hasError){subscriber.error(this.thrownError);return Subscription.EMPTY;}else if(this.isStopped){subscriber.complete();return Subscription.EMPTY;}else {this.observers.push(subscriber);return new SubjectSubscription(this,subscriber);}};Subject.prototype.asObservable=function(){var observable=new Observable();observable.source=this;return observable;};Subject.create=function(destination,source){return new AnonymousSubject(destination,source);};return Subject;}(Observable);var AnonymousSubject=/*@__PURE__*/function(_super){__extends(AnonymousSubject,_super);function AnonymousSubject(destination,source){var _this=_super.call(this)||this;_this.destination=destination;_this.source=source;return _this;}AnonymousSubject.prototype.next=function(value){var destination=this.destination;if(destination&&destination.next){destination.next(value);}};AnonymousSubject.prototype.error=function(err){var destination=this.destination;if(destination&&destination.error){this.destination.error(err);}};AnonymousSubject.prototype.complete=function(){var destination=this.destination;if(destination&&destination.complete){this.destination.complete();}};AnonymousSubject.prototype._subscribe=function(subscriber){var source=this.source;if(source){return this.source.subscribe(subscriber);}else {return Subscription.EMPTY;}};return AnonymousSubject;}(Subject);

function refCount(){return function refCountOperatorFunction(source){return source.lift(new RefCountOperator(source));};}var RefCountOperator=/*@__PURE__*/function(){function RefCountOperator(connectable){this.connectable=connectable;}RefCountOperator.prototype.call=function(subscriber,source){var connectable=this.connectable;connectable._refCount++;var refCounter=new RefCountSubscriber(subscriber,connectable);var subscription=source.subscribe(refCounter);if(!refCounter.closed){refCounter.connection=connectable.connect();}return subscription;};return RefCountOperator;}();var RefCountSubscriber=/*@__PURE__*/function(_super){__extends(RefCountSubscriber,_super);function RefCountSubscriber(destination,connectable){var _this=_super.call(this,destination)||this;_this.connectable=connectable;return _this;}RefCountSubscriber.prototype._unsubscribe=function(){var connectable=this.connectable;if(!connectable){this.connection=null;return;}this.connectable=null;var refCount=connectable._refCount;if(refCount<=0){this.connection=null;return;}connectable._refCount=refCount-1;if(refCount>1){this.connection=null;return;}var connection=this.connection;var sharedConnection=connectable._connection;this.connection=null;if(sharedConnection&&(!connection||sharedConnection===connection)){sharedConnection.unsubscribe();}};return RefCountSubscriber;}(Subscriber);

var ConnectableObservable=/*@__PURE__*/function(_super){__extends(ConnectableObservable,_super);function ConnectableObservable(source,subjectFactory){var _this=_super.call(this)||this;_this.source=source;_this.subjectFactory=subjectFactory;_this._refCount=0;_this._isComplete=false;return _this;}ConnectableObservable.prototype._subscribe=function(subscriber){return this.getSubject().subscribe(subscriber);};ConnectableObservable.prototype.getSubject=function(){var subject=this._subject;if(!subject||subject.isStopped){this._subject=this.subjectFactory();}return this._subject;};ConnectableObservable.prototype.connect=function(){var connection=this._connection;if(!connection){this._isComplete=false;connection=this._connection=new Subscription();connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(),this)));if(connection.closed){this._connection=null;connection=Subscription.EMPTY;}}return connection;};ConnectableObservable.prototype.refCount=function(){return refCount()(this);};return ConnectableObservable;}(Observable);var connectableObservableDescriptor=/*@__PURE__*/function(){var connectableProto=ConnectableObservable.prototype;return {operator:{value:null},_refCount:{value:0,writable:true},_subject:{value:null,writable:true},_connection:{value:null,writable:true},_subscribe:{value:connectableProto._subscribe},_isComplete:{value:connectableProto._isComplete,writable:true},getSubject:{value:connectableProto.getSubject},connect:{value:connectableProto.connect},refCount:{value:connectableProto.refCount}};}();var ConnectableSubscriber=/*@__PURE__*/function(_super){__extends(ConnectableSubscriber,_super);function ConnectableSubscriber(destination,connectable){var _this=_super.call(this,destination)||this;_this.connectable=connectable;return _this;}ConnectableSubscriber.prototype._error=function(err){this._unsubscribe();_super.prototype._error.call(this,err);};ConnectableSubscriber.prototype._complete=function(){this.connectable._isComplete=true;this._unsubscribe();_super.prototype._complete.call(this);};ConnectableSubscriber.prototype._unsubscribe=function(){var connectable=this.connectable;if(connectable){this.connectable=null;var connection=connectable._connection;connectable._refCount=0;connectable._subject=null;connectable._connection=null;if(connection){connection.unsubscribe();}}};return ConnectableSubscriber;}(SubjectSubscriber);var RefCountOperator$1=/*@__PURE__*/function(){function RefCountOperator(connectable){this.connectable=connectable;}RefCountOperator.prototype.call=function(subscriber,source){var connectable=this.connectable;connectable._refCount++;var refCounter=new RefCountSubscriber$1(subscriber,connectable);var subscription=source.subscribe(refCounter);if(!refCounter.closed){refCounter.connection=connectable.connect();}return subscription;};return RefCountOperator;}();var RefCountSubscriber$1=/*@__PURE__*/function(_super){__extends(RefCountSubscriber,_super);function RefCountSubscriber(destination,connectable){var _this=_super.call(this,destination)||this;_this.connectable=connectable;return _this;}RefCountSubscriber.prototype._unsubscribe=function(){var connectable=this.connectable;if(!connectable){this.connection=null;return;}this.connectable=null;var refCount=connectable._refCount;if(refCount<=0){this.connection=null;return;}connectable._refCount=refCount-1;if(refCount>1){this.connection=null;return;}var connection=this.connection;var sharedConnection=connectable._connection;this.connection=null;if(sharedConnection&&(!connection||sharedConnection===connection)){sharedConnection.unsubscribe();}};return RefCountSubscriber;}(Subscriber);

function groupBy(keySelector,elementSelector,durationSelector,subjectSelector){return function(source){return source.lift(new GroupByOperator(keySelector,elementSelector,durationSelector,subjectSelector));};}var GroupByOperator=/*@__PURE__*/function(){function GroupByOperator(keySelector,elementSelector,durationSelector,subjectSelector){this.keySelector=keySelector;this.elementSelector=elementSelector;this.durationSelector=durationSelector;this.subjectSelector=subjectSelector;}GroupByOperator.prototype.call=function(subscriber,source){return source.subscribe(new GroupBySubscriber(subscriber,this.keySelector,this.elementSelector,this.durationSelector,this.subjectSelector));};return GroupByOperator;}();var GroupBySubscriber=/*@__PURE__*/function(_super){__extends(GroupBySubscriber,_super);function GroupBySubscriber(destination,keySelector,elementSelector,durationSelector,subjectSelector){var _this=_super.call(this,destination)||this;_this.keySelector=keySelector;_this.elementSelector=elementSelector;_this.durationSelector=durationSelector;_this.subjectSelector=subjectSelector;_this.groups=null;_this.attemptedToUnsubscribe=false;_this.count=0;return _this;}GroupBySubscriber.prototype._next=function(value){var key;try{key=this.keySelector(value);}catch(err){this.error(err);return;}this._group(value,key);};GroupBySubscriber.prototype._group=function(value,key){var groups=this.groups;if(!groups){groups=this.groups=new Map();}var group=groups.get(key);var element;if(this.elementSelector){try{element=this.elementSelector(value);}catch(err){this.error(err);}}else {element=value;}if(!group){group=this.subjectSelector?this.subjectSelector():new Subject();groups.set(key,group);var groupedObservable=new GroupedObservable(key,group,this);this.destination.next(groupedObservable);if(this.durationSelector){var duration=void 0;try{duration=this.durationSelector(new GroupedObservable(key,group));}catch(err){this.error(err);return;}this.add(duration.subscribe(new GroupDurationSubscriber(key,group,this)));}}if(!group.closed){group.next(element);}};GroupBySubscriber.prototype._error=function(err){var groups=this.groups;if(groups){groups.forEach(function(group,key){group.error(err);});groups.clear();}this.destination.error(err);};GroupBySubscriber.prototype._complete=function(){var groups=this.groups;if(groups){groups.forEach(function(group,key){group.complete();});groups.clear();}this.destination.complete();};GroupBySubscriber.prototype.removeGroup=function(key){this.groups.delete(key);};GroupBySubscriber.prototype.unsubscribe=function(){if(!this.closed){this.attemptedToUnsubscribe=true;if(this.count===0){_super.prototype.unsubscribe.call(this);}}};return GroupBySubscriber;}(Subscriber);var GroupDurationSubscriber=/*@__PURE__*/function(_super){__extends(GroupDurationSubscriber,_super);function GroupDurationSubscriber(key,group,parent){var _this=_super.call(this,group)||this;_this.key=key;_this.group=group;_this.parent=parent;return _this;}GroupDurationSubscriber.prototype._next=function(value){this.complete();};GroupDurationSubscriber.prototype._unsubscribe=function(){var _a=this,parent=_a.parent,key=_a.key;this.key=this.parent=null;if(parent){parent.removeGroup(key);}};return GroupDurationSubscriber;}(Subscriber);var GroupedObservable=/*@__PURE__*/function(_super){__extends(GroupedObservable,_super);function GroupedObservable(key,groupSubject,refCountSubscription){var _this=_super.call(this)||this;_this.key=key;_this.groupSubject=groupSubject;_this.refCountSubscription=refCountSubscription;return _this;}GroupedObservable.prototype._subscribe=function(subscriber){var subscription=new Subscription();var _a=this,refCountSubscription=_a.refCountSubscription,groupSubject=_a.groupSubject;if(refCountSubscription&&!refCountSubscription.closed){subscription.add(new InnerRefCountSubscription(refCountSubscription));}subscription.add(groupSubject.subscribe(subscriber));return subscription;};return GroupedObservable;}(Observable);var InnerRefCountSubscription=/*@__PURE__*/function(_super){__extends(InnerRefCountSubscription,_super);function InnerRefCountSubscription(parent){var _this=_super.call(this)||this;_this.parent=parent;parent.count++;return _this;}InnerRefCountSubscription.prototype.unsubscribe=function(){var parent=this.parent;if(!parent.closed&&!this.closed){_super.prototype.unsubscribe.call(this);parent.count-=1;if(parent.count===0&&parent.attemptedToUnsubscribe){parent.unsubscribe();}}};return InnerRefCountSubscription;}(Subscription);

var BehaviorSubject=/*@__PURE__*/function(_super){__extends(BehaviorSubject,_super);function BehaviorSubject(_value){var _this=_super.call(this)||this;_this._value=_value;return _this;}Object.defineProperty(BehaviorSubject.prototype,"value",{get:function(){return this.getValue();},enumerable:true,configurable:true});BehaviorSubject.prototype._subscribe=function(subscriber){var subscription=_super.prototype._subscribe.call(this,subscriber);if(subscription&&!subscription.closed){subscriber.next(this._value);}return subscription;};BehaviorSubject.prototype.getValue=function(){if(this.hasError){throw this.thrownError;}else if(this.closed){throw new ObjectUnsubscribedError();}else {return this._value;}};BehaviorSubject.prototype.next=function(value){_super.prototype.next.call(this,this._value=value);};return BehaviorSubject;}(Subject);

var Action=/*@__PURE__*/function(_super){__extends(Action,_super);function Action(scheduler,work){return _super.call(this)||this;}Action.prototype.schedule=function(state,delay){if(delay===void 0){delay=0;}return this;};return Action;}(Subscription);

var AsyncAction=/*@__PURE__*/function(_super){__extends(AsyncAction,_super);function AsyncAction(scheduler,work){var _this=_super.call(this,scheduler,work)||this;_this.scheduler=scheduler;_this.work=work;_this.pending=false;return _this;}AsyncAction.prototype.schedule=function(state,delay){if(delay===void 0){delay=0;}if(this.closed){return this;}this.state=state;var id=this.id;var scheduler=this.scheduler;if(id!=null){this.id=this.recycleAsyncId(scheduler,id,delay);}this.pending=true;this.delay=delay;this.id=this.id||this.requestAsyncId(scheduler,this.id,delay);return this;};AsyncAction.prototype.requestAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}return setInterval(scheduler.flush.bind(scheduler,this),delay);};AsyncAction.prototype.recycleAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}if(delay!==null&&this.delay===delay&&this.pending===false){return id;}clearInterval(id);return undefined;};AsyncAction.prototype.execute=function(state,delay){if(this.closed){return new Error('executing a cancelled action');}this.pending=false;var error=this._execute(state,delay);if(error){return error;}else if(this.pending===false&&this.id!=null){this.id=this.recycleAsyncId(this.scheduler,this.id,null);}};AsyncAction.prototype._execute=function(state,delay){var errored=false;var errorValue=undefined;try{this.work(state);}catch(e){errored=true;errorValue=!!e&&e||new Error(e);}if(errored){this.unsubscribe();return errorValue;}};AsyncAction.prototype._unsubscribe=function(){var id=this.id;var scheduler=this.scheduler;var actions=scheduler.actions;var index=actions.indexOf(this);this.work=null;this.state=null;this.pending=false;this.scheduler=null;if(index!==-1){actions.splice(index,1);}if(id!=null){this.id=this.recycleAsyncId(scheduler,id,null);}this.delay=null;};return AsyncAction;}(Action);

var QueueAction=/*@__PURE__*/function(_super){__extends(QueueAction,_super);function QueueAction(scheduler,work){var _this=_super.call(this,scheduler,work)||this;_this.scheduler=scheduler;_this.work=work;return _this;}QueueAction.prototype.schedule=function(state,delay){if(delay===void 0){delay=0;}if(delay>0){return _super.prototype.schedule.call(this,state,delay);}this.delay=delay;this.state=state;this.scheduler.flush(this);return this;};QueueAction.prototype.execute=function(state,delay){return delay>0||this.closed?_super.prototype.execute.call(this,state,delay):this._execute(state,delay);};QueueAction.prototype.requestAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}if(delay!==null&&delay>0||delay===null&&this.delay>0){return _super.prototype.requestAsyncId.call(this,scheduler,id,delay);}return scheduler.flush(this);};return QueueAction;}(AsyncAction);

var Scheduler=/*@__PURE__*/function(){function Scheduler(SchedulerAction,now){if(now===void 0){now=Scheduler.now;}this.SchedulerAction=SchedulerAction;this.now=now;}Scheduler.prototype.schedule=function(work,delay,state){if(delay===void 0){delay=0;}return new this.SchedulerAction(this,work).schedule(state,delay);};Scheduler.now=function(){return Date.now();};return Scheduler;}();

var AsyncScheduler=/*@__PURE__*/function(_super){__extends(AsyncScheduler,_super);function AsyncScheduler(SchedulerAction,now){if(now===void 0){now=Scheduler.now;}var _this=_super.call(this,SchedulerAction,function(){if(AsyncScheduler.delegate&&AsyncScheduler.delegate!==_this){return AsyncScheduler.delegate.now();}else {return now();}})||this;_this.actions=[];_this.active=false;_this.scheduled=undefined;return _this;}AsyncScheduler.prototype.schedule=function(work,delay,state){if(delay===void 0){delay=0;}if(AsyncScheduler.delegate&&AsyncScheduler.delegate!==this){return AsyncScheduler.delegate.schedule(work,delay,state);}else {return _super.prototype.schedule.call(this,work,delay,state);}};AsyncScheduler.prototype.flush=function(action){var actions=this.actions;if(this.active){actions.push(action);return;}var error;this.active=true;do{if(error=action.execute(action.state,action.delay)){break;}}while(action=actions.shift());this.active=false;if(error){while(action=actions.shift()){action.unsubscribe();}throw error;}};return AsyncScheduler;}(Scheduler);

var QueueScheduler=/*@__PURE__*/function(_super){__extends(QueueScheduler,_super);function QueueScheduler(){return _super!==null&&_super.apply(this,arguments)||this;}return QueueScheduler;}(AsyncScheduler);

var queueScheduler=/*@__PURE__*/new QueueScheduler(QueueAction);var queue=queueScheduler;

var EMPTY=/*@__PURE__*/new Observable(function(subscriber){return subscriber.complete();});function empty$1(scheduler){return scheduler?emptyScheduled(scheduler):EMPTY;}function emptyScheduled(scheduler){return new Observable(function(subscriber){return scheduler.schedule(function(){return subscriber.complete();});});}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function isScheduler(value){return value&&typeof value.schedule==='function';}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var subscribeToArray=function(array){return function(subscriber){for(var i=0,len=array.length;i<len&&!subscriber.closed;i++){subscriber.next(array[i]);}subscriber.complete();};};

function scheduleArray(input,scheduler){return new Observable(function(subscriber){var sub=new Subscription();var i=0;sub.add(scheduler.schedule(function(){if(i===input.length){subscriber.complete();return;}subscriber.next(input[i++]);if(!subscriber.closed){sub.add(this.schedule());}}));return sub;});}

function fromArray(input,scheduler){if(!scheduler){return new Observable(subscribeToArray(input));}else {return scheduleArray(input,scheduler);}}

function of(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}var scheduler=args[args.length-1];if(isScheduler(scheduler)){args.pop();return scheduleArray(args,scheduler);}else {return fromArray(args);}}

function throwError(error,scheduler){if(!scheduler){return new Observable(function(subscriber){return subscriber.error(error);});}else {return new Observable(function(subscriber){return scheduler.schedule(dispatch,0,{error:error,subscriber:subscriber});});}}function dispatch(_a){var error=_a.error,subscriber=_a.subscriber;subscriber.error(error);}

var NotificationKind;/*@__PURE__*/(function(NotificationKind){NotificationKind["NEXT"]="N";NotificationKind["ERROR"]="E";NotificationKind["COMPLETE"]="C";})(NotificationKind||(NotificationKind={}));var Notification=/*@__PURE__*/function(){function Notification(kind,value,error){this.kind=kind;this.value=value;this.error=error;this.hasValue=kind==='N';}Notification.prototype.observe=function(observer){switch(this.kind){case'N':return observer.next&&observer.next(this.value);case'E':return observer.error&&observer.error(this.error);case'C':return observer.complete&&observer.complete();}};Notification.prototype.do=function(next,error,complete){var kind=this.kind;switch(kind){case'N':return next&&next(this.value);case'E':return error&&error(this.error);case'C':return complete&&complete();}};Notification.prototype.accept=function(nextOrObserver,error,complete){if(nextOrObserver&&typeof nextOrObserver.next==='function'){return this.observe(nextOrObserver);}else {return this.do(nextOrObserver,error,complete);}};Notification.prototype.toObservable=function(){var kind=this.kind;switch(kind){case'N':return of(this.value);case'E':return throwError(this.error);case'C':return empty$1();}throw new Error('unexpected notification kind value');};Notification.createNext=function(value){if(typeof value!=='undefined'){return new Notification('N',value);}return Notification.undefinedValueNotification;};Notification.createError=function(err){return new Notification('E',undefined,err);};Notification.createComplete=function(){return Notification.completeNotification;};Notification.completeNotification=new Notification('C');Notification.undefinedValueNotification=new Notification('N',undefined);return Notification;}();

function observeOn(scheduler,delay){if(delay===void 0){delay=0;}return function observeOnOperatorFunction(source){return source.lift(new ObserveOnOperator(scheduler,delay));};}var ObserveOnOperator=/*@__PURE__*/function(){function ObserveOnOperator(scheduler,delay){if(delay===void 0){delay=0;}this.scheduler=scheduler;this.delay=delay;}ObserveOnOperator.prototype.call=function(subscriber,source){return source.subscribe(new ObserveOnSubscriber(subscriber,this.scheduler,this.delay));};return ObserveOnOperator;}();var ObserveOnSubscriber=/*@__PURE__*/function(_super){__extends(ObserveOnSubscriber,_super);function ObserveOnSubscriber(destination,scheduler,delay){if(delay===void 0){delay=0;}var _this=_super.call(this,destination)||this;_this.scheduler=scheduler;_this.delay=delay;return _this;}ObserveOnSubscriber.dispatch=function(arg){var notification=arg.notification,destination=arg.destination;notification.observe(destination);this.unsubscribe();};ObserveOnSubscriber.prototype.scheduleMessage=function(notification){var destination=this.destination;destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch,this.delay,new ObserveOnMessage(notification,this.destination)));};ObserveOnSubscriber.prototype._next=function(value){this.scheduleMessage(Notification.createNext(value));};ObserveOnSubscriber.prototype._error=function(err){this.scheduleMessage(Notification.createError(err));this.unsubscribe();};ObserveOnSubscriber.prototype._complete=function(){this.scheduleMessage(Notification.createComplete());this.unsubscribe();};return ObserveOnSubscriber;}(Subscriber);var ObserveOnMessage=/*@__PURE__*/function(){function ObserveOnMessage(notification,destination){this.notification=notification;this.destination=destination;}return ObserveOnMessage;}();

var ReplaySubject=/*@__PURE__*/function(_super){__extends(ReplaySubject,_super);function ReplaySubject(bufferSize,windowTime,scheduler){if(bufferSize===void 0){bufferSize=Number.POSITIVE_INFINITY;}if(windowTime===void 0){windowTime=Number.POSITIVE_INFINITY;}var _this=_super.call(this)||this;_this.scheduler=scheduler;_this._events=[];_this._infiniteTimeWindow=false;_this._bufferSize=bufferSize<1?1:bufferSize;_this._windowTime=windowTime<1?1:windowTime;if(windowTime===Number.POSITIVE_INFINITY){_this._infiniteTimeWindow=true;_this.next=_this.nextInfiniteTimeWindow;}else {_this.next=_this.nextTimeWindow;}return _this;}ReplaySubject.prototype.nextInfiniteTimeWindow=function(value){if(!this.isStopped){var _events=this._events;_events.push(value);if(_events.length>this._bufferSize){_events.shift();}}_super.prototype.next.call(this,value);};ReplaySubject.prototype.nextTimeWindow=function(value){if(!this.isStopped){this._events.push(new ReplayEvent(this._getNow(),value));this._trimBufferThenGetEvents();}_super.prototype.next.call(this,value);};ReplaySubject.prototype._subscribe=function(subscriber){var _infiniteTimeWindow=this._infiniteTimeWindow;var _events=_infiniteTimeWindow?this._events:this._trimBufferThenGetEvents();var scheduler=this.scheduler;var len=_events.length;var subscription;if(this.closed){throw new ObjectUnsubscribedError();}else if(this.isStopped||this.hasError){subscription=Subscription.EMPTY;}else {this.observers.push(subscriber);subscription=new SubjectSubscription(this,subscriber);}if(scheduler){subscriber.add(subscriber=new ObserveOnSubscriber(subscriber,scheduler));}if(_infiniteTimeWindow){for(var i=0;i<len&&!subscriber.closed;i++){subscriber.next(_events[i]);}}else {for(var i=0;i<len&&!subscriber.closed;i++){subscriber.next(_events[i].value);}}if(this.hasError){subscriber.error(this.thrownError);}else if(this.isStopped){subscriber.complete();}return subscription;};ReplaySubject.prototype._getNow=function(){return (this.scheduler||queue).now();};ReplaySubject.prototype._trimBufferThenGetEvents=function(){var now=this._getNow();var _bufferSize=this._bufferSize;var _windowTime=this._windowTime;var _events=this._events;var eventsCount=_events.length;var spliceCount=0;while(spliceCount<eventsCount){if(now-_events[spliceCount].time<_windowTime){break;}spliceCount++;}if(eventsCount>_bufferSize){spliceCount=Math.max(spliceCount,eventsCount-_bufferSize);}if(spliceCount>0){_events.splice(0,spliceCount);}return _events;};return ReplaySubject;}(Subject);var ReplayEvent=/*@__PURE__*/function(){function ReplayEvent(time,value){this.time=time;this.value=value;}return ReplayEvent;}();

var AsyncSubject=/*@__PURE__*/function(_super){__extends(AsyncSubject,_super);function AsyncSubject(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.value=null;_this.hasNext=false;_this.hasCompleted=false;return _this;}AsyncSubject.prototype._subscribe=function(subscriber){if(this.hasError){subscriber.error(this.thrownError);return Subscription.EMPTY;}else if(this.hasCompleted&&this.hasNext){subscriber.next(this.value);subscriber.complete();return Subscription.EMPTY;}return _super.prototype._subscribe.call(this,subscriber);};AsyncSubject.prototype.next=function(value){if(!this.hasCompleted){this.value=value;this.hasNext=true;}};AsyncSubject.prototype.error=function(error){if(!this.hasCompleted){_super.prototype.error.call(this,error);}};AsyncSubject.prototype.complete=function(){this.hasCompleted=true;if(this.hasNext){_super.prototype.next.call(this,this.value);}_super.prototype.complete.call(this);};return AsyncSubject;}(Subject);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var nextHandle=1;var RESOLVED=/*@__PURE__*/function(){return/*@__PURE__*/Promise.resolve();}();var activeHandles={};function findAndClearHandle(handle){if(handle in activeHandles){delete activeHandles[handle];return true;}return false;}var Immediate={setImmediate:function(cb){var handle=nextHandle++;activeHandles[handle]=true;RESOLVED.then(function(){return findAndClearHandle(handle)&&cb();});return handle;},clearImmediate:function(handle){findAndClearHandle(handle);}};var TestTools={pending:function(){return Object.keys(activeHandles).length;}};

var AsapAction=/*@__PURE__*/function(_super){__extends(AsapAction,_super);function AsapAction(scheduler,work){var _this=_super.call(this,scheduler,work)||this;_this.scheduler=scheduler;_this.work=work;return _this;}AsapAction.prototype.requestAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}if(delay!==null&&delay>0){return _super.prototype.requestAsyncId.call(this,scheduler,id,delay);}scheduler.actions.push(this);return scheduler.scheduled||(scheduler.scheduled=Immediate.setImmediate(scheduler.flush.bind(scheduler,null)));};AsapAction.prototype.recycleAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}if(delay!==null&&delay>0||delay===null&&this.delay>0){return _super.prototype.recycleAsyncId.call(this,scheduler,id,delay);}if(scheduler.actions.length===0){Immediate.clearImmediate(id);scheduler.scheduled=undefined;}return undefined;};return AsapAction;}(AsyncAction);

var AsapScheduler=/*@__PURE__*/function(_super){__extends(AsapScheduler,_super);function AsapScheduler(){return _super!==null&&_super.apply(this,arguments)||this;}AsapScheduler.prototype.flush=function(action){this.active=true;this.scheduled=undefined;var actions=this.actions;var error;var index=-1;var count=actions.length;action=action||actions.shift();do{if(error=action.execute(action.state,action.delay)){break;}}while(++index<count&&(action=actions.shift()));this.active=false;if(error){while(++index<count&&(action=actions.shift())){action.unsubscribe();}throw error;}};return AsapScheduler;}(AsyncScheduler);

var asapScheduler=/*@__PURE__*/new AsapScheduler(AsapAction);var asap=asapScheduler;

var asyncScheduler=/*@__PURE__*/new AsyncScheduler(AsyncAction);var async=asyncScheduler;

var AnimationFrameAction=/*@__PURE__*/function(_super){__extends(AnimationFrameAction,_super);function AnimationFrameAction(scheduler,work){var _this=_super.call(this,scheduler,work)||this;_this.scheduler=scheduler;_this.work=work;return _this;}AnimationFrameAction.prototype.requestAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}if(delay!==null&&delay>0){return _super.prototype.requestAsyncId.call(this,scheduler,id,delay);}scheduler.actions.push(this);return scheduler.scheduled||(scheduler.scheduled=requestAnimationFrame(function(){return scheduler.flush(null);}));};AnimationFrameAction.prototype.recycleAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}if(delay!==null&&delay>0||delay===null&&this.delay>0){return _super.prototype.recycleAsyncId.call(this,scheduler,id,delay);}if(scheduler.actions.length===0){cancelAnimationFrame(id);scheduler.scheduled=undefined;}return undefined;};return AnimationFrameAction;}(AsyncAction);

var AnimationFrameScheduler=/*@__PURE__*/function(_super){__extends(AnimationFrameScheduler,_super);function AnimationFrameScheduler(){return _super!==null&&_super.apply(this,arguments)||this;}AnimationFrameScheduler.prototype.flush=function(action){this.active=true;this.scheduled=undefined;var actions=this.actions;var error;var index=-1;var count=actions.length;action=action||actions.shift();do{if(error=action.execute(action.state,action.delay)){break;}}while(++index<count&&(action=actions.shift()));this.active=false;if(error){while(++index<count&&(action=actions.shift())){action.unsubscribe();}throw error;}};return AnimationFrameScheduler;}(AsyncScheduler);

var animationFrameScheduler=/*@__PURE__*/new AnimationFrameScheduler(AnimationFrameAction);var animationFrame=animationFrameScheduler;

var VirtualTimeScheduler=/*@__PURE__*/function(_super){__extends(VirtualTimeScheduler,_super);function VirtualTimeScheduler(SchedulerAction,maxFrames){if(SchedulerAction===void 0){SchedulerAction=VirtualAction;}if(maxFrames===void 0){maxFrames=Number.POSITIVE_INFINITY;}var _this=_super.call(this,SchedulerAction,function(){return _this.frame;})||this;_this.maxFrames=maxFrames;_this.frame=0;_this.index=-1;return _this;}VirtualTimeScheduler.prototype.flush=function(){var _a=this,actions=_a.actions,maxFrames=_a.maxFrames;var error,action;while((action=actions[0])&&action.delay<=maxFrames){actions.shift();this.frame=action.delay;if(error=action.execute(action.state,action.delay)){break;}}if(error){while(action=actions.shift()){action.unsubscribe();}throw error;}};VirtualTimeScheduler.frameTimeFactor=10;return VirtualTimeScheduler;}(AsyncScheduler);var VirtualAction=/*@__PURE__*/function(_super){__extends(VirtualAction,_super);function VirtualAction(scheduler,work,index){if(index===void 0){index=scheduler.index+=1;}var _this=_super.call(this,scheduler,work)||this;_this.scheduler=scheduler;_this.work=work;_this.index=index;_this.active=true;_this.index=scheduler.index=index;return _this;}VirtualAction.prototype.schedule=function(state,delay){if(delay===void 0){delay=0;}if(!this.id){return _super.prototype.schedule.call(this,state,delay);}this.active=false;var action=new VirtualAction(this.scheduler,this.work);this.add(action);return action.schedule(state,delay);};VirtualAction.prototype.requestAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}this.delay=scheduler.frame+delay;var actions=scheduler.actions;actions.push(this);actions.sort(VirtualAction.sortActions);return true;};VirtualAction.prototype.recycleAsyncId=function(scheduler,id,delay){if(delay===void 0){delay=0;}return undefined;};VirtualAction.prototype._execute=function(state,delay){if(this.active===true){return _super.prototype._execute.call(this,state,delay);}};VirtualAction.sortActions=function(a,b){if(a.delay===b.delay){if(a.index===b.index){return 0;}else if(a.index>b.index){return 1;}else {return -1;}}else if(a.delay>b.delay){return 1;}else {return -1;}};return VirtualAction;}(AsyncAction);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function noop(){}

function isObservable(obj){return !!obj&&(obj instanceof Observable||typeof obj.lift==='function'&&typeof obj.subscribe==='function');}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var ArgumentOutOfRangeErrorImpl=/*@__PURE__*/function(){function ArgumentOutOfRangeErrorImpl(){Error.call(this);this.message='argument out of range';this.name='ArgumentOutOfRangeError';return this;}ArgumentOutOfRangeErrorImpl.prototype=/*@__PURE__*/Object.create(Error.prototype);return ArgumentOutOfRangeErrorImpl;}();var ArgumentOutOfRangeError=ArgumentOutOfRangeErrorImpl;

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var EmptyErrorImpl=/*@__PURE__*/function(){function EmptyErrorImpl(){Error.call(this);this.message='no elements in sequence';this.name='EmptyError';return this;}EmptyErrorImpl.prototype=/*@__PURE__*/Object.create(Error.prototype);return EmptyErrorImpl;}();var EmptyError=EmptyErrorImpl;

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var TimeoutErrorImpl=/*@__PURE__*/function(){function TimeoutErrorImpl(){Error.call(this);this.message='Timeout has occurred';this.name='TimeoutError';return this;}TimeoutErrorImpl.prototype=/*@__PURE__*/Object.create(Error.prototype);return TimeoutErrorImpl;}();var TimeoutError=TimeoutErrorImpl;

function map(project,thisArg){return function mapOperation(source){if(typeof project!=='function'){throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');}return source.lift(new MapOperator(project,thisArg));};}var MapOperator=/*@__PURE__*/function(){function MapOperator(project,thisArg){this.project=project;this.thisArg=thisArg;}MapOperator.prototype.call=function(subscriber,source){return source.subscribe(new MapSubscriber(subscriber,this.project,this.thisArg));};return MapOperator;}();var MapSubscriber=/*@__PURE__*/function(_super){__extends(MapSubscriber,_super);function MapSubscriber(destination,project,thisArg){var _this=_super.call(this,destination)||this;_this.project=project;_this.count=0;_this.thisArg=thisArg||_this;return _this;}MapSubscriber.prototype._next=function(value){var result;try{result=this.project.call(this.thisArg,value,this.count++);}catch(err){this.destination.error(err);return;}this.destination.next(result);};return MapSubscriber;}(Subscriber);

function bindCallback(callbackFunc,resultSelector,scheduler){if(resultSelector){if(isScheduler(resultSelector)){scheduler=resultSelector;}else {return function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}return bindCallback(callbackFunc,scheduler).apply(void 0,args).pipe(map(function(args){return isArray(args)?resultSelector.apply(void 0,args):resultSelector(args);}));};}}return function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}var context=this;var subject;var params={context:context,subject:subject,callbackFunc:callbackFunc,scheduler:scheduler};return new Observable(function(subscriber){if(!scheduler){if(!subject){subject=new AsyncSubject();var handler=function(){var innerArgs=[];for(var _i=0;_i<arguments.length;_i++){innerArgs[_i]=arguments[_i];}subject.next(innerArgs.length<=1?innerArgs[0]:innerArgs);subject.complete();};try{callbackFunc.apply(context,args.concat([handler]));}catch(err){if(canReportError(subject)){subject.error(err);}else {console.warn(err);}}}return subject.subscribe(subscriber);}else {var state={args:args,subscriber:subscriber,params:params};return scheduler.schedule(dispatch$1,0,state);}});};}function dispatch$1(state){var _this=this;var self=this;var args=state.args,subscriber=state.subscriber,params=state.params;var callbackFunc=params.callbackFunc,context=params.context,scheduler=params.scheduler;var subject=params.subject;if(!subject){subject=params.subject=new AsyncSubject();var handler=function(){var innerArgs=[];for(var _i=0;_i<arguments.length;_i++){innerArgs[_i]=arguments[_i];}var value=innerArgs.length<=1?innerArgs[0]:innerArgs;_this.add(scheduler.schedule(dispatchNext,0,{value:value,subject:subject}));};try{callbackFunc.apply(context,args.concat([handler]));}catch(err){subject.error(err);}}this.add(subject.subscribe(subscriber));}function dispatchNext(state){var value=state.value,subject=state.subject;subject.next(value);subject.complete();}function dispatchError(state){var err=state.err,subject=state.subject;subject.error(err);}

function bindNodeCallback(callbackFunc,resultSelector,scheduler){if(resultSelector){if(isScheduler(resultSelector)){scheduler=resultSelector;}else {return function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}return bindNodeCallback(callbackFunc,scheduler).apply(void 0,args).pipe(map(function(args){return isArray(args)?resultSelector.apply(void 0,args):resultSelector(args);}));};}}return function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}var params={subject:undefined,args:args,callbackFunc:callbackFunc,scheduler:scheduler,context:this};return new Observable(function(subscriber){var context=params.context;var subject=params.subject;if(!scheduler){if(!subject){subject=params.subject=new AsyncSubject();var handler=function(){var innerArgs=[];for(var _i=0;_i<arguments.length;_i++){innerArgs[_i]=arguments[_i];}var err=innerArgs.shift();if(err){subject.error(err);return;}subject.next(innerArgs.length<=1?innerArgs[0]:innerArgs);subject.complete();};try{callbackFunc.apply(context,args.concat([handler]));}catch(err){if(canReportError(subject)){subject.error(err);}else {console.warn(err);}}}return subject.subscribe(subscriber);}else {return scheduler.schedule(dispatch$2,0,{params:params,subscriber:subscriber,context:context});}});};}function dispatch$2(state){var _this=this;var params=state.params,subscriber=state.subscriber,context=state.context;var callbackFunc=params.callbackFunc,args=params.args,scheduler=params.scheduler;var subject=params.subject;if(!subject){subject=params.subject=new AsyncSubject();var handler=function(){var innerArgs=[];for(var _i=0;_i<arguments.length;_i++){innerArgs[_i]=arguments[_i];}var err=innerArgs.shift();if(err){_this.add(scheduler.schedule(dispatchError$1,0,{err:err,subject:subject}));}else {var value=innerArgs.length<=1?innerArgs[0]:innerArgs;_this.add(scheduler.schedule(dispatchNext$1,0,{value:value,subject:subject}));}};try{callbackFunc.apply(context,args.concat([handler]));}catch(err){this.add(scheduler.schedule(dispatchError$1,0,{err:err,subject:subject}));}}this.add(subject.subscribe(subscriber));}function dispatchNext$1(arg){var value=arg.value,subject=arg.subject;subject.next(value);subject.complete();}function dispatchError$1(arg){var err=arg.err,subject=arg.subject;subject.error(err);}

var OuterSubscriber=/*@__PURE__*/function(_super){__extends(OuterSubscriber,_super);function OuterSubscriber(){return _super!==null&&_super.apply(this,arguments)||this;}OuterSubscriber.prototype.notifyNext=function(outerValue,innerValue,outerIndex,innerIndex,innerSub){this.destination.next(innerValue);};OuterSubscriber.prototype.notifyError=function(error,innerSub){this.destination.error(error);};OuterSubscriber.prototype.notifyComplete=function(innerSub){this.destination.complete();};return OuterSubscriber;}(Subscriber);

var InnerSubscriber=/*@__PURE__*/function(_super){__extends(InnerSubscriber,_super);function InnerSubscriber(parent,outerValue,outerIndex){var _this=_super.call(this)||this;_this.parent=parent;_this.outerValue=outerValue;_this.outerIndex=outerIndex;_this.index=0;return _this;}InnerSubscriber.prototype._next=function(value){this.parent.notifyNext(this.outerValue,value,this.outerIndex,this.index++,this);};InnerSubscriber.prototype._error=function(error){this.parent.notifyError(error,this);this.unsubscribe();};InnerSubscriber.prototype._complete=function(){this.parent.notifyComplete(this);this.unsubscribe();};return InnerSubscriber;}(Subscriber);

var subscribeToPromise=function(promise){return function(subscriber){promise.then(function(value){if(!subscriber.closed){subscriber.next(value);subscriber.complete();}},function(err){return subscriber.error(err);}).then(null,hostReportError);return subscriber;};};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function getSymbolIterator(){if(typeof Symbol!=='function'||!Symbol.iterator){return '@@iterator';}return Symbol.iterator;}var iterator=/*@__PURE__*/getSymbolIterator();var $$iterator=iterator;

var subscribeToIterable=function(iterable){return function(subscriber){var iterator$1=iterable[iterator]();do{var item=void 0;try{item=iterator$1.next();}catch(err){subscriber.error(err);return subscriber;}if(item.done){subscriber.complete();break;}subscriber.next(item.value);if(subscriber.closed){break;}}while(true);if(typeof iterator$1.return==='function'){subscriber.add(function(){if(iterator$1.return){iterator$1.return();}});}return subscriber;};};

var subscribeToObservable=function(obj){return function(subscriber){var obs=obj[observable]();if(typeof obs.subscribe!=='function'){throw new TypeError('Provided object does not correctly implement Symbol.observable');}else {return obs.subscribe(subscriber);}};};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */var isArrayLike=function(x){return x&&typeof x.length==='number'&&typeof x!=='function';};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function isPromise(value){return !!value&&typeof value.subscribe!=='function'&&typeof value.then==='function';}

var subscribeTo=function(result){if(!!result&&typeof result[observable]==='function'){return subscribeToObservable(result);}else if(isArrayLike(result)){return subscribeToArray(result);}else if(isPromise(result)){return subscribeToPromise(result);}else if(!!result&&typeof result[iterator]==='function'){return subscribeToIterable(result);}else {var value=isObject(result)?'an invalid object':"'"+result+"'";var msg="You provided "+value+" where a stream was expected."+' You can provide an Observable, Promise, Array, or Iterable.';throw new TypeError(msg);}};

function subscribeToResult(outerSubscriber,result,outerValue,outerIndex,innerSubscriber){if(innerSubscriber===void 0){innerSubscriber=new InnerSubscriber(outerSubscriber,outerValue,outerIndex);}if(innerSubscriber.closed){return undefined;}if(result instanceof Observable){return result.subscribe(innerSubscriber);}return subscribeTo(result)(innerSubscriber);}

var NONE={};function combineLatest(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}var resultSelector=undefined;var scheduler=undefined;if(isScheduler(observables[observables.length-1])){scheduler=observables.pop();}if(typeof observables[observables.length-1]==='function'){resultSelector=observables.pop();}if(observables.length===1&&isArray(observables[0])){observables=observables[0];}return fromArray(observables,scheduler).lift(new CombineLatestOperator(resultSelector));}var CombineLatestOperator=/*@__PURE__*/function(){function CombineLatestOperator(resultSelector){this.resultSelector=resultSelector;}CombineLatestOperator.prototype.call=function(subscriber,source){return source.subscribe(new CombineLatestSubscriber(subscriber,this.resultSelector));};return CombineLatestOperator;}();var CombineLatestSubscriber=/*@__PURE__*/function(_super){__extends(CombineLatestSubscriber,_super);function CombineLatestSubscriber(destination,resultSelector){var _this=_super.call(this,destination)||this;_this.resultSelector=resultSelector;_this.active=0;_this.values=[];_this.observables=[];return _this;}CombineLatestSubscriber.prototype._next=function(observable){this.values.push(NONE);this.observables.push(observable);};CombineLatestSubscriber.prototype._complete=function(){var observables=this.observables;var len=observables.length;if(len===0){this.destination.complete();}else {this.active=len;this.toRespond=len;for(var i=0;i<len;i++){var observable=observables[i];this.add(subscribeToResult(this,observable,undefined,i));}}};CombineLatestSubscriber.prototype.notifyComplete=function(unused){if((this.active-=1)===0){this.destination.complete();}};CombineLatestSubscriber.prototype.notifyNext=function(_outerValue,innerValue,outerIndex){var values=this.values;var oldVal=values[outerIndex];var toRespond=!this.toRespond?0:oldVal===NONE?--this.toRespond:this.toRespond;values[outerIndex]=innerValue;if(toRespond===0){if(this.resultSelector){this._tryResultSelector(values);}else {this.destination.next(values.slice());}}};CombineLatestSubscriber.prototype._tryResultSelector=function(values){var result;try{result=this.resultSelector.apply(this,values);}catch(err){this.destination.error(err);return;}this.destination.next(result);};return CombineLatestSubscriber;}(OuterSubscriber);

function scheduleObservable(input,scheduler){return new Observable(function(subscriber){var sub=new Subscription();sub.add(scheduler.schedule(function(){var observable$1=input[observable]();sub.add(observable$1.subscribe({next:function(value){sub.add(scheduler.schedule(function(){return subscriber.next(value);}));},error:function(err){sub.add(scheduler.schedule(function(){return subscriber.error(err);}));},complete:function(){sub.add(scheduler.schedule(function(){return subscriber.complete();}));}}));}));return sub;});}

function schedulePromise(input,scheduler){return new Observable(function(subscriber){var sub=new Subscription();sub.add(scheduler.schedule(function(){return input.then(function(value){sub.add(scheduler.schedule(function(){subscriber.next(value);sub.add(scheduler.schedule(function(){return subscriber.complete();}));}));},function(err){sub.add(scheduler.schedule(function(){return subscriber.error(err);}));});}));return sub;});}

function scheduleIterable(input,scheduler){if(!input){throw new Error('Iterable cannot be null');}return new Observable(function(subscriber){var sub=new Subscription();var iterator$1;sub.add(function(){if(iterator$1&&typeof iterator$1.return==='function'){iterator$1.return();}});sub.add(scheduler.schedule(function(){iterator$1=input[iterator]();sub.add(scheduler.schedule(function(){if(subscriber.closed){return;}var value;var done;try{var result=iterator$1.next();value=result.value;done=result.done;}catch(err){subscriber.error(err);return;}if(done){subscriber.complete();}else {subscriber.next(value);this.schedule();}}));}));return sub;});}

function isInteropObservable(input){return input&&typeof input[observable]==='function';}

function isIterable$1(input){return input&&typeof input[iterator]==='function';}

function scheduled(input,scheduler){if(input!=null){if(isInteropObservable(input)){return scheduleObservable(input,scheduler);}else if(isPromise(input)){return schedulePromise(input,scheduler);}else if(isArrayLike(input)){return scheduleArray(input,scheduler);}else if(isIterable$1(input)||typeof input==='string'){return scheduleIterable(input,scheduler);}}throw new TypeError((input!==null&&typeof input||input)+' is not observable');}

function from(input,scheduler){if(!scheduler){if(input instanceof Observable){return input;}return new Observable(subscribeTo(input));}else {return scheduled(input,scheduler);}}

var SimpleInnerSubscriber=/*@__PURE__*/function(_super){__extends(SimpleInnerSubscriber,_super);function SimpleInnerSubscriber(parent){var _this=_super.call(this)||this;_this.parent=parent;return _this;}SimpleInnerSubscriber.prototype._next=function(value){this.parent.notifyNext(value);};SimpleInnerSubscriber.prototype._error=function(error){this.parent.notifyError(error);this.unsubscribe();};SimpleInnerSubscriber.prototype._complete=function(){this.parent.notifyComplete();this.unsubscribe();};return SimpleInnerSubscriber;}(Subscriber);var ComplexInnerSubscriber=/*@__PURE__*/function(_super){__extends(ComplexInnerSubscriber,_super);function ComplexInnerSubscriber(parent,outerValue,outerIndex){var _this=_super.call(this)||this;_this.parent=parent;_this.outerValue=outerValue;_this.outerIndex=outerIndex;return _this;}ComplexInnerSubscriber.prototype._next=function(value){this.parent.notifyNext(this.outerValue,value,this.outerIndex,this);};ComplexInnerSubscriber.prototype._error=function(error){this.parent.notifyError(error);this.unsubscribe();};ComplexInnerSubscriber.prototype._complete=function(){this.parent.notifyComplete(this);this.unsubscribe();};return ComplexInnerSubscriber;}(Subscriber);var SimpleOuterSubscriber=/*@__PURE__*/function(_super){__extends(SimpleOuterSubscriber,_super);function SimpleOuterSubscriber(){return _super!==null&&_super.apply(this,arguments)||this;}SimpleOuterSubscriber.prototype.notifyNext=function(innerValue){this.destination.next(innerValue);};SimpleOuterSubscriber.prototype.notifyError=function(err){this.destination.error(err);};SimpleOuterSubscriber.prototype.notifyComplete=function(){this.destination.complete();};return SimpleOuterSubscriber;}(Subscriber);var ComplexOuterSubscriber=/*@__PURE__*/function(_super){__extends(ComplexOuterSubscriber,_super);function ComplexOuterSubscriber(){return _super!==null&&_super.apply(this,arguments)||this;}ComplexOuterSubscriber.prototype.notifyNext=function(_outerValue,innerValue,_outerIndex,_innerSub){this.destination.next(innerValue);};ComplexOuterSubscriber.prototype.notifyError=function(error){this.destination.error(error);};ComplexOuterSubscriber.prototype.notifyComplete=function(_innerSub){this.destination.complete();};return ComplexOuterSubscriber;}(Subscriber);function innerSubscribe(result,innerSubscriber){if(innerSubscriber.closed){return undefined;}if(result instanceof Observable){return result.subscribe(innerSubscriber);}return subscribeTo(result)(innerSubscriber);}

function mergeMap(project,resultSelector,concurrent){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}if(typeof resultSelector==='function'){return function(source){return source.pipe(mergeMap(function(a,i){return from(project(a,i)).pipe(map(function(b,ii){return resultSelector(a,b,i,ii);}));},concurrent));};}else if(typeof resultSelector==='number'){concurrent=resultSelector;}return function(source){return source.lift(new MergeMapOperator(project,concurrent));};}var MergeMapOperator=/*@__PURE__*/function(){function MergeMapOperator(project,concurrent){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}this.project=project;this.concurrent=concurrent;}MergeMapOperator.prototype.call=function(observer,source){return source.subscribe(new MergeMapSubscriber(observer,this.project,this.concurrent));};return MergeMapOperator;}();var MergeMapSubscriber=/*@__PURE__*/function(_super){__extends(MergeMapSubscriber,_super);function MergeMapSubscriber(destination,project,concurrent){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}var _this=_super.call(this,destination)||this;_this.project=project;_this.concurrent=concurrent;_this.hasCompleted=false;_this.buffer=[];_this.active=0;_this.index=0;return _this;}MergeMapSubscriber.prototype._next=function(value){if(this.active<this.concurrent){this._tryNext(value);}else {this.buffer.push(value);}};MergeMapSubscriber.prototype._tryNext=function(value){var result;var index=this.index++;try{result=this.project(value,index);}catch(err){this.destination.error(err);return;}this.active++;this._innerSub(result);};MergeMapSubscriber.prototype._innerSub=function(ish){var innerSubscriber=new SimpleInnerSubscriber(this);var destination=this.destination;destination.add(innerSubscriber);var innerSubscription=innerSubscribe(ish,innerSubscriber);if(innerSubscription!==innerSubscriber){destination.add(innerSubscription);}};MergeMapSubscriber.prototype._complete=function(){this.hasCompleted=true;if(this.active===0&&this.buffer.length===0){this.destination.complete();}this.unsubscribe();};MergeMapSubscriber.prototype.notifyNext=function(innerValue){this.destination.next(innerValue);};MergeMapSubscriber.prototype.notifyComplete=function(){var buffer=this.buffer;this.active--;if(buffer.length>0){this._next(buffer.shift());}else if(this.active===0&&this.hasCompleted){this.destination.complete();}};return MergeMapSubscriber;}(SimpleOuterSubscriber);var flatMap=mergeMap;

function mergeAll(concurrent){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}return mergeMap(identity,concurrent);}

function concatAll(){return mergeAll(1);}

function concat(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}return concatAll()(of.apply(void 0,observables));}

function defer(observableFactory){return new Observable(function(subscriber){var input;try{input=observableFactory();}catch(err){subscriber.error(err);return undefined;}var source=input?from(input):empty$1();return source.subscribe(subscriber);});}

function forkJoin(){var sources=[];for(var _i=0;_i<arguments.length;_i++){sources[_i]=arguments[_i];}if(sources.length===1){var first_1=sources[0];if(isArray(first_1)){return forkJoinInternal(first_1,null);}if(isObject(first_1)&&Object.getPrototypeOf(first_1)===Object.prototype){var keys=Object.keys(first_1);return forkJoinInternal(keys.map(function(key){return first_1[key];}),keys);}}if(typeof sources[sources.length-1]==='function'){var resultSelector_1=sources.pop();sources=sources.length===1&&isArray(sources[0])?sources[0]:sources;return forkJoinInternal(sources,null).pipe(map(function(args){return resultSelector_1.apply(void 0,args);}));}return forkJoinInternal(sources,null);}function forkJoinInternal(sources,keys){return new Observable(function(subscriber){var len=sources.length;if(len===0){subscriber.complete();return;}var values=new Array(len);var completed=0;var emitted=0;var _loop_1=function(i){var source=from(sources[i]);var hasValue=false;subscriber.add(source.subscribe({next:function(value){if(!hasValue){hasValue=true;emitted++;}values[i]=value;},error:function(err){return subscriber.error(err);},complete:function(){completed++;if(completed===len||!hasValue){if(emitted===len){subscriber.next(keys?keys.reduce(function(result,key,i){return result[key]=values[i],result;},{}):values);}subscriber.complete();}}}));};for(var i=0;i<len;i++){_loop_1(i);}});}

var toString=/*@__PURE__*/function(){return Object.prototype.toString;}();function fromEvent(target,eventName,options,resultSelector){if(isFunction(options)){resultSelector=options;options=undefined;}if(resultSelector){return fromEvent(target,eventName,options).pipe(map(function(args){return isArray(args)?resultSelector.apply(void 0,args):resultSelector(args);}));}return new Observable(function(subscriber){function handler(e){if(arguments.length>1){subscriber.next(Array.prototype.slice.call(arguments));}else {subscriber.next(e);}}setupSubscription(target,eventName,handler,subscriber,options);});}function setupSubscription(sourceObj,eventName,handler,subscriber,options){var unsubscribe;if(isEventTarget(sourceObj)){var source_1=sourceObj;sourceObj.addEventListener(eventName,handler,options);unsubscribe=function(){return source_1.removeEventListener(eventName,handler,options);};}else if(isJQueryStyleEventEmitter(sourceObj)){var source_2=sourceObj;sourceObj.on(eventName,handler);unsubscribe=function(){return source_2.off(eventName,handler);};}else if(isNodeStyleEventEmitter(sourceObj)){var source_3=sourceObj;sourceObj.addListener(eventName,handler);unsubscribe=function(){return source_3.removeListener(eventName,handler);};}else if(sourceObj&&sourceObj.length){for(var i=0,len=sourceObj.length;i<len;i++){setupSubscription(sourceObj[i],eventName,handler,subscriber,options);}}else {throw new TypeError('Invalid event target');}subscriber.add(unsubscribe);}function isNodeStyleEventEmitter(sourceObj){return sourceObj&&typeof sourceObj.addListener==='function'&&typeof sourceObj.removeListener==='function';}function isJQueryStyleEventEmitter(sourceObj){return sourceObj&&typeof sourceObj.on==='function'&&typeof sourceObj.off==='function';}function isEventTarget(sourceObj){return sourceObj&&typeof sourceObj.addEventListener==='function'&&typeof sourceObj.removeEventListener==='function';}

function fromEventPattern(addHandler,removeHandler,resultSelector){if(resultSelector){return fromEventPattern(addHandler,removeHandler).pipe(map(function(args){return isArray(args)?resultSelector.apply(void 0,args):resultSelector(args);}));}return new Observable(function(subscriber){var handler=function(){var e=[];for(var _i=0;_i<arguments.length;_i++){e[_i]=arguments[_i];}return subscriber.next(e.length===1?e[0]:e);};var retValue;try{retValue=addHandler(handler);}catch(err){subscriber.error(err);return undefined;}if(!isFunction(removeHandler)){return undefined;}return function(){return removeHandler(handler,retValue);};});}

function generate(initialStateOrOptions,condition,iterate,resultSelectorOrObservable,scheduler){var resultSelector;var initialState;if(arguments.length==1){var options=initialStateOrOptions;initialState=options.initialState;condition=options.condition;iterate=options.iterate;resultSelector=options.resultSelector||identity;scheduler=options.scheduler;}else if(resultSelectorOrObservable===undefined||isScheduler(resultSelectorOrObservable)){initialState=initialStateOrOptions;resultSelector=identity;scheduler=resultSelectorOrObservable;}else {initialState=initialStateOrOptions;resultSelector=resultSelectorOrObservable;}return new Observable(function(subscriber){var state=initialState;if(scheduler){return scheduler.schedule(dispatch$3,0,{subscriber:subscriber,iterate:iterate,condition:condition,resultSelector:resultSelector,state:state});}do{if(condition){var conditionResult=void 0;try{conditionResult=condition(state);}catch(err){subscriber.error(err);return undefined;}if(!conditionResult){subscriber.complete();break;}}var value=void 0;try{value=resultSelector(state);}catch(err){subscriber.error(err);return undefined;}subscriber.next(value);if(subscriber.closed){break;}try{state=iterate(state);}catch(err){subscriber.error(err);return undefined;}}while(true);return undefined;});}function dispatch$3(state){var subscriber=state.subscriber,condition=state.condition;if(subscriber.closed){return undefined;}if(state.needIterate){try{state.state=state.iterate(state.state);}catch(err){subscriber.error(err);return undefined;}}else {state.needIterate=true;}if(condition){var conditionResult=void 0;try{conditionResult=condition(state.state);}catch(err){subscriber.error(err);return undefined;}if(!conditionResult){subscriber.complete();return undefined;}if(subscriber.closed){return undefined;}}var value;try{value=state.resultSelector(state.state);}catch(err){subscriber.error(err);return undefined;}if(subscriber.closed){return undefined;}subscriber.next(value);if(subscriber.closed){return undefined;}return this.schedule(state);}

function iif(condition,trueResult,falseResult){if(trueResult===void 0){trueResult=EMPTY;}if(falseResult===void 0){falseResult=EMPTY;}return defer(function(){return condition()?trueResult:falseResult;});}

function isNumeric(val){return !isArray(val)&&val-parseFloat(val)+1>=0;}

function interval(period,scheduler){if(period===void 0){period=0;}if(scheduler===void 0){scheduler=async;}if(!isNumeric(period)||period<0){period=0;}if(!scheduler||typeof scheduler.schedule!=='function'){scheduler=async;}return new Observable(function(subscriber){subscriber.add(scheduler.schedule(dispatch$4,period,{subscriber:subscriber,counter:0,period:period}));return subscriber;});}function dispatch$4(state){var subscriber=state.subscriber,counter=state.counter,period=state.period;subscriber.next(counter);this.schedule({subscriber:subscriber,counter:counter+1,period:period},period);}

function merge(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}var concurrent=Number.POSITIVE_INFINITY;var scheduler=null;var last=observables[observables.length-1];if(isScheduler(last)){scheduler=observables.pop();if(observables.length>1&&typeof observables[observables.length-1]==='number'){concurrent=observables.pop();}}else if(typeof last==='number'){concurrent=observables.pop();}if(scheduler===null&&observables.length===1&&observables[0]instanceof Observable){return observables[0];}return mergeAll(concurrent)(fromArray(observables,scheduler));}

var NEVER=/*@__PURE__*/new Observable(noop);function never(){return NEVER;}

function onErrorResumeNext(){var sources=[];for(var _i=0;_i<arguments.length;_i++){sources[_i]=arguments[_i];}if(sources.length===0){return EMPTY;}var first=sources[0],remainder=sources.slice(1);if(sources.length===1&&isArray(first)){return onErrorResumeNext.apply(void 0,first);}return new Observable(function(subscriber){var subNext=function(){return subscriber.add(onErrorResumeNext.apply(void 0,remainder).subscribe(subscriber));};return from(first).subscribe({next:function(value){subscriber.next(value);},error:subNext,complete:subNext});});}

function pairs(obj,scheduler){if(!scheduler){return new Observable(function(subscriber){var keys=Object.keys(obj);for(var i=0;i<keys.length&&!subscriber.closed;i++){var key=keys[i];if(obj.hasOwnProperty(key)){subscriber.next([key,obj[key]]);}}subscriber.complete();});}else {return new Observable(function(subscriber){var keys=Object.keys(obj);var subscription=new Subscription();subscription.add(scheduler.schedule(dispatch$5,0,{keys:keys,index:0,subscriber:subscriber,subscription:subscription,obj:obj}));return subscription;});}}function dispatch$5(state){var keys=state.keys,index=state.index,subscriber=state.subscriber,subscription=state.subscription,obj=state.obj;if(!subscriber.closed){if(index<keys.length){var key=keys[index];subscriber.next([key,obj[key]]);subscription.add(this.schedule({keys:keys,index:index+1,subscriber:subscriber,subscription:subscription,obj:obj}));}else {subscriber.complete();}}}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function not(pred,thisArg){function notPred(){return !notPred.pred.apply(notPred.thisArg,arguments);}notPred.pred=pred;notPred.thisArg=thisArg;return notPred;}

function filter(predicate,thisArg){return function filterOperatorFunction(source){return source.lift(new FilterOperator(predicate,thisArg));};}var FilterOperator=/*@__PURE__*/function(){function FilterOperator(predicate,thisArg){this.predicate=predicate;this.thisArg=thisArg;}FilterOperator.prototype.call=function(subscriber,source){return source.subscribe(new FilterSubscriber(subscriber,this.predicate,this.thisArg));};return FilterOperator;}();var FilterSubscriber=/*@__PURE__*/function(_super){__extends(FilterSubscriber,_super);function FilterSubscriber(destination,predicate,thisArg){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.thisArg=thisArg;_this.count=0;return _this;}FilterSubscriber.prototype._next=function(value){var result;try{result=this.predicate.call(this.thisArg,value,this.count++);}catch(err){this.destination.error(err);return;}if(result){this.destination.next(value);}};return FilterSubscriber;}(Subscriber);

function partition(source,predicate,thisArg){return [filter(predicate,thisArg)(new Observable(subscribeTo(source))),filter(not(predicate,thisArg))(new Observable(subscribeTo(source)))];}

function race(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}if(observables.length===1){if(isArray(observables[0])){observables=observables[0];}else {return observables[0];}}return fromArray(observables,undefined).lift(new RaceOperator());}var RaceOperator=/*@__PURE__*/function(){function RaceOperator(){}RaceOperator.prototype.call=function(subscriber,source){return source.subscribe(new RaceSubscriber(subscriber));};return RaceOperator;}();var RaceSubscriber=/*@__PURE__*/function(_super){__extends(RaceSubscriber,_super);function RaceSubscriber(destination){var _this=_super.call(this,destination)||this;_this.hasFirst=false;_this.observables=[];_this.subscriptions=[];return _this;}RaceSubscriber.prototype._next=function(observable){this.observables.push(observable);};RaceSubscriber.prototype._complete=function(){var observables=this.observables;var len=observables.length;if(len===0){this.destination.complete();}else {for(var i=0;i<len&&!this.hasFirst;i++){var observable=observables[i];var subscription=subscribeToResult(this,observable,undefined,i);if(this.subscriptions){this.subscriptions.push(subscription);}this.add(subscription);}this.observables=null;}};RaceSubscriber.prototype.notifyNext=function(_outerValue,innerValue,outerIndex){if(!this.hasFirst){this.hasFirst=true;for(var i=0;i<this.subscriptions.length;i++){if(i!==outerIndex){var subscription=this.subscriptions[i];subscription.unsubscribe();this.remove(subscription);}}this.subscriptions=null;}this.destination.next(innerValue);};return RaceSubscriber;}(OuterSubscriber);

function range(start,count,scheduler){if(start===void 0){start=0;}return new Observable(function(subscriber){if(count===undefined){count=start;start=0;}var index=0;var current=start;if(scheduler){return scheduler.schedule(dispatch$6,0,{index:index,count:count,start:start,subscriber:subscriber});}else {do{if(index++>=count){subscriber.complete();break;}subscriber.next(current++);if(subscriber.closed){break;}}while(true);}return undefined;});}function dispatch$6(state){var start=state.start,index=state.index,count=state.count,subscriber=state.subscriber;if(index>=count){subscriber.complete();return;}subscriber.next(start);if(subscriber.closed){return;}state.index=index+1;state.start=start+1;this.schedule(state);}

function timer(dueTime,periodOrScheduler,scheduler){if(dueTime===void 0){dueTime=0;}var period=-1;if(isNumeric(periodOrScheduler)){period=Number(periodOrScheduler)<1&&1||Number(periodOrScheduler);}else if(isScheduler(periodOrScheduler)){scheduler=periodOrScheduler;}if(!isScheduler(scheduler)){scheduler=async;}return new Observable(function(subscriber){var due=isNumeric(dueTime)?dueTime:+dueTime-scheduler.now();return scheduler.schedule(dispatch$7,due,{index:0,period:period,subscriber:subscriber});});}function dispatch$7(state){var index=state.index,period=state.period,subscriber=state.subscriber;subscriber.next(index);if(subscriber.closed){return;}else if(period===-1){return subscriber.complete();}state.index=index+1;this.schedule(state,period);}

function using(resourceFactory,observableFactory){return new Observable(function(subscriber){var resource;try{resource=resourceFactory();}catch(err){subscriber.error(err);return undefined;}var result;try{result=observableFactory(resource);}catch(err){subscriber.error(err);return undefined;}var source=result?from(result):EMPTY;var subscription=source.subscribe(subscriber);return function(){subscription.unsubscribe();if(resource){resource.unsubscribe();}};});}

function zip(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}var resultSelector=observables[observables.length-1];if(typeof resultSelector==='function'){observables.pop();}return fromArray(observables,undefined).lift(new ZipOperator(resultSelector));}var ZipOperator=/*@__PURE__*/function(){function ZipOperator(resultSelector){this.resultSelector=resultSelector;}ZipOperator.prototype.call=function(subscriber,source){return source.subscribe(new ZipSubscriber(subscriber,this.resultSelector));};return ZipOperator;}();var ZipSubscriber=/*@__PURE__*/function(_super){__extends(ZipSubscriber,_super);function ZipSubscriber(destination,resultSelector,values){if(values===void 0){values=Object.create(null);}var _this=_super.call(this,destination)||this;_this.resultSelector=resultSelector;_this.iterators=[];_this.active=0;_this.resultSelector=typeof resultSelector==='function'?resultSelector:undefined;return _this;}ZipSubscriber.prototype._next=function(value){var iterators=this.iterators;if(isArray(value)){iterators.push(new StaticArrayIterator(value));}else if(typeof value[iterator]==='function'){iterators.push(new StaticIterator(value[iterator]()));}else {iterators.push(new ZipBufferIterator(this.destination,this,value));}};ZipSubscriber.prototype._complete=function(){var iterators=this.iterators;var len=iterators.length;this.unsubscribe();if(len===0){this.destination.complete();return;}this.active=len;for(var i=0;i<len;i++){var iterator=iterators[i];if(iterator.stillUnsubscribed){var destination=this.destination;destination.add(iterator.subscribe());}else {this.active--;}}};ZipSubscriber.prototype.notifyInactive=function(){this.active--;if(this.active===0){this.destination.complete();}};ZipSubscriber.prototype.checkIterators=function(){var iterators=this.iterators;var len=iterators.length;var destination=this.destination;for(var i=0;i<len;i++){var iterator=iterators[i];if(typeof iterator.hasValue==='function'&&!iterator.hasValue()){return;}}var shouldComplete=false;var args=[];for(var i=0;i<len;i++){var iterator=iterators[i];var result=iterator.next();if(iterator.hasCompleted()){shouldComplete=true;}if(result.done){destination.complete();return;}args.push(result.value);}if(this.resultSelector){this._tryresultSelector(args);}else {destination.next(args);}if(shouldComplete){destination.complete();}};ZipSubscriber.prototype._tryresultSelector=function(args){var result;try{result=this.resultSelector.apply(this,args);}catch(err){this.destination.error(err);return;}this.destination.next(result);};return ZipSubscriber;}(Subscriber);var StaticIterator=/*@__PURE__*/function(){function StaticIterator(iterator){this.iterator=iterator;this.nextResult=iterator.next();}StaticIterator.prototype.hasValue=function(){return true;};StaticIterator.prototype.next=function(){var result=this.nextResult;this.nextResult=this.iterator.next();return result;};StaticIterator.prototype.hasCompleted=function(){var nextResult=this.nextResult;return Boolean(nextResult&&nextResult.done);};return StaticIterator;}();var StaticArrayIterator=/*@__PURE__*/function(){function StaticArrayIterator(array){this.array=array;this.index=0;this.length=0;this.length=array.length;}StaticArrayIterator.prototype[iterator]=function(){return this;};StaticArrayIterator.prototype.next=function(value){var i=this.index++;var array=this.array;return i<this.length?{value:array[i],done:false}:{value:null,done:true};};StaticArrayIterator.prototype.hasValue=function(){return this.array.length>this.index;};StaticArrayIterator.prototype.hasCompleted=function(){return this.array.length===this.index;};return StaticArrayIterator;}();var ZipBufferIterator=/*@__PURE__*/function(_super){__extends(ZipBufferIterator,_super);function ZipBufferIterator(destination,parent,observable){var _this=_super.call(this,destination)||this;_this.parent=parent;_this.observable=observable;_this.stillUnsubscribed=true;_this.buffer=[];_this.isComplete=false;return _this;}ZipBufferIterator.prototype[iterator]=function(){return this;};ZipBufferIterator.prototype.next=function(){var buffer=this.buffer;if(buffer.length===0&&this.isComplete){return {value:null,done:true};}else {return {value:buffer.shift(),done:false};}};ZipBufferIterator.prototype.hasValue=function(){return this.buffer.length>0;};ZipBufferIterator.prototype.hasCompleted=function(){return this.buffer.length===0&&this.isComplete;};ZipBufferIterator.prototype.notifyComplete=function(){if(this.buffer.length>0){this.isComplete=true;this.parent.notifyInactive();}else {this.destination.complete();}};ZipBufferIterator.prototype.notifyNext=function(innerValue){this.buffer.push(innerValue);this.parent.checkIterators();};ZipBufferIterator.prototype.subscribe=function(){return innerSubscribe(this.observable,new SimpleInnerSubscriber(this));};return ZipBufferIterator;}(SimpleOuterSubscriber);

function audit(durationSelector){return function auditOperatorFunction(source){return source.lift(new AuditOperator(durationSelector));};}var AuditOperator=/*@__PURE__*/function(){function AuditOperator(durationSelector){this.durationSelector=durationSelector;}AuditOperator.prototype.call=function(subscriber,source){return source.subscribe(new AuditSubscriber(subscriber,this.durationSelector));};return AuditOperator;}();var AuditSubscriber=/*@__PURE__*/function(_super){__extends(AuditSubscriber,_super);function AuditSubscriber(destination,durationSelector){var _this=_super.call(this,destination)||this;_this.durationSelector=durationSelector;_this.hasValue=false;return _this;}AuditSubscriber.prototype._next=function(value){this.value=value;this.hasValue=true;if(!this.throttled){var duration=void 0;try{var durationSelector=this.durationSelector;duration=durationSelector(value);}catch(err){return this.destination.error(err);}var innerSubscription=innerSubscribe(duration,new SimpleInnerSubscriber(this));if(!innerSubscription||innerSubscription.closed){this.clearThrottle();}else {this.add(this.throttled=innerSubscription);}}};AuditSubscriber.prototype.clearThrottle=function(){var _a=this,value=_a.value,hasValue=_a.hasValue,throttled=_a.throttled;if(throttled){this.remove(throttled);this.throttled=undefined;throttled.unsubscribe();}if(hasValue){this.value=undefined;this.hasValue=false;this.destination.next(value);}};AuditSubscriber.prototype.notifyNext=function(){this.clearThrottle();};AuditSubscriber.prototype.notifyComplete=function(){this.clearThrottle();};return AuditSubscriber;}(SimpleOuterSubscriber);

function auditTime(duration,scheduler){if(scheduler===void 0){scheduler=async;}return audit(function(){return timer(duration,scheduler);});}

function buffer(closingNotifier){return function bufferOperatorFunction(source){return source.lift(new BufferOperator(closingNotifier));};}var BufferOperator=/*@__PURE__*/function(){function BufferOperator(closingNotifier){this.closingNotifier=closingNotifier;}BufferOperator.prototype.call=function(subscriber,source){return source.subscribe(new BufferSubscriber(subscriber,this.closingNotifier));};return BufferOperator;}();var BufferSubscriber=/*@__PURE__*/function(_super){__extends(BufferSubscriber,_super);function BufferSubscriber(destination,closingNotifier){var _this=_super.call(this,destination)||this;_this.buffer=[];_this.add(innerSubscribe(closingNotifier,new SimpleInnerSubscriber(_this)));return _this;}BufferSubscriber.prototype._next=function(value){this.buffer.push(value);};BufferSubscriber.prototype.notifyNext=function(){var buffer=this.buffer;this.buffer=[];this.destination.next(buffer);};return BufferSubscriber;}(SimpleOuterSubscriber);

function bufferCount(bufferSize,startBufferEvery){if(startBufferEvery===void 0){startBufferEvery=null;}return function bufferCountOperatorFunction(source){return source.lift(new BufferCountOperator(bufferSize,startBufferEvery));};}var BufferCountOperator=/*@__PURE__*/function(){function BufferCountOperator(bufferSize,startBufferEvery){this.bufferSize=bufferSize;this.startBufferEvery=startBufferEvery;if(!startBufferEvery||bufferSize===startBufferEvery){this.subscriberClass=BufferCountSubscriber;}else {this.subscriberClass=BufferSkipCountSubscriber;}}BufferCountOperator.prototype.call=function(subscriber,source){return source.subscribe(new this.subscriberClass(subscriber,this.bufferSize,this.startBufferEvery));};return BufferCountOperator;}();var BufferCountSubscriber=/*@__PURE__*/function(_super){__extends(BufferCountSubscriber,_super);function BufferCountSubscriber(destination,bufferSize){var _this=_super.call(this,destination)||this;_this.bufferSize=bufferSize;_this.buffer=[];return _this;}BufferCountSubscriber.prototype._next=function(value){var buffer=this.buffer;buffer.push(value);if(buffer.length==this.bufferSize){this.destination.next(buffer);this.buffer=[];}};BufferCountSubscriber.prototype._complete=function(){var buffer=this.buffer;if(buffer.length>0){this.destination.next(buffer);}_super.prototype._complete.call(this);};return BufferCountSubscriber;}(Subscriber);var BufferSkipCountSubscriber=/*@__PURE__*/function(_super){__extends(BufferSkipCountSubscriber,_super);function BufferSkipCountSubscriber(destination,bufferSize,startBufferEvery){var _this=_super.call(this,destination)||this;_this.bufferSize=bufferSize;_this.startBufferEvery=startBufferEvery;_this.buffers=[];_this.count=0;return _this;}BufferSkipCountSubscriber.prototype._next=function(value){var _a=this,bufferSize=_a.bufferSize,startBufferEvery=_a.startBufferEvery,buffers=_a.buffers,count=_a.count;this.count++;if(count%startBufferEvery===0){buffers.push([]);}for(var i=buffers.length;i--;){var buffer=buffers[i];buffer.push(value);if(buffer.length===bufferSize){buffers.splice(i,1);this.destination.next(buffer);}}};BufferSkipCountSubscriber.prototype._complete=function(){var _a=this,buffers=_a.buffers,destination=_a.destination;while(buffers.length>0){var buffer=buffers.shift();if(buffer.length>0){destination.next(buffer);}}_super.prototype._complete.call(this);};return BufferSkipCountSubscriber;}(Subscriber);

function bufferTime(bufferTimeSpan){var length=arguments.length;var scheduler=async;if(isScheduler(arguments[arguments.length-1])){scheduler=arguments[arguments.length-1];length--;}var bufferCreationInterval=null;if(length>=2){bufferCreationInterval=arguments[1];}var maxBufferSize=Number.POSITIVE_INFINITY;if(length>=3){maxBufferSize=arguments[2];}return function bufferTimeOperatorFunction(source){return source.lift(new BufferTimeOperator(bufferTimeSpan,bufferCreationInterval,maxBufferSize,scheduler));};}var BufferTimeOperator=/*@__PURE__*/function(){function BufferTimeOperator(bufferTimeSpan,bufferCreationInterval,maxBufferSize,scheduler){this.bufferTimeSpan=bufferTimeSpan;this.bufferCreationInterval=bufferCreationInterval;this.maxBufferSize=maxBufferSize;this.scheduler=scheduler;}BufferTimeOperator.prototype.call=function(subscriber,source){return source.subscribe(new BufferTimeSubscriber(subscriber,this.bufferTimeSpan,this.bufferCreationInterval,this.maxBufferSize,this.scheduler));};return BufferTimeOperator;}();var Context=/*@__PURE__*/function(){function Context(){this.buffer=[];}return Context;}();var BufferTimeSubscriber=/*@__PURE__*/function(_super){__extends(BufferTimeSubscriber,_super);function BufferTimeSubscriber(destination,bufferTimeSpan,bufferCreationInterval,maxBufferSize,scheduler){var _this=_super.call(this,destination)||this;_this.bufferTimeSpan=bufferTimeSpan;_this.bufferCreationInterval=bufferCreationInterval;_this.maxBufferSize=maxBufferSize;_this.scheduler=scheduler;_this.contexts=[];var context=_this.openContext();_this.timespanOnly=bufferCreationInterval==null||bufferCreationInterval<0;if(_this.timespanOnly){var timeSpanOnlyState={subscriber:_this,context:context,bufferTimeSpan:bufferTimeSpan};_this.add(context.closeAction=scheduler.schedule(dispatchBufferTimeSpanOnly,bufferTimeSpan,timeSpanOnlyState));}else {var closeState={subscriber:_this,context:context};var creationState={bufferTimeSpan:bufferTimeSpan,bufferCreationInterval:bufferCreationInterval,subscriber:_this,scheduler:scheduler};_this.add(context.closeAction=scheduler.schedule(dispatchBufferClose,bufferTimeSpan,closeState));_this.add(scheduler.schedule(dispatchBufferCreation,bufferCreationInterval,creationState));}return _this;}BufferTimeSubscriber.prototype._next=function(value){var contexts=this.contexts;var len=contexts.length;var filledBufferContext;for(var i=0;i<len;i++){var context_1=contexts[i];var buffer=context_1.buffer;buffer.push(value);if(buffer.length==this.maxBufferSize){filledBufferContext=context_1;}}if(filledBufferContext){this.onBufferFull(filledBufferContext);}};BufferTimeSubscriber.prototype._error=function(err){this.contexts.length=0;_super.prototype._error.call(this,err);};BufferTimeSubscriber.prototype._complete=function(){var _a=this,contexts=_a.contexts,destination=_a.destination;while(contexts.length>0){var context_2=contexts.shift();destination.next(context_2.buffer);}_super.prototype._complete.call(this);};BufferTimeSubscriber.prototype._unsubscribe=function(){this.contexts=null;};BufferTimeSubscriber.prototype.onBufferFull=function(context){this.closeContext(context);var closeAction=context.closeAction;closeAction.unsubscribe();this.remove(closeAction);if(!this.closed&&this.timespanOnly){context=this.openContext();var bufferTimeSpan=this.bufferTimeSpan;var timeSpanOnlyState={subscriber:this,context:context,bufferTimeSpan:bufferTimeSpan};this.add(context.closeAction=this.scheduler.schedule(dispatchBufferTimeSpanOnly,bufferTimeSpan,timeSpanOnlyState));}};BufferTimeSubscriber.prototype.openContext=function(){var context=new Context();this.contexts.push(context);return context;};BufferTimeSubscriber.prototype.closeContext=function(context){this.destination.next(context.buffer);var contexts=this.contexts;var spliceIndex=contexts?contexts.indexOf(context):-1;if(spliceIndex>=0){contexts.splice(contexts.indexOf(context),1);}};return BufferTimeSubscriber;}(Subscriber);function dispatchBufferTimeSpanOnly(state){var subscriber=state.subscriber;var prevContext=state.context;if(prevContext){subscriber.closeContext(prevContext);}if(!subscriber.closed){state.context=subscriber.openContext();state.context.closeAction=this.schedule(state,state.bufferTimeSpan);}}function dispatchBufferCreation(state){var bufferCreationInterval=state.bufferCreationInterval,bufferTimeSpan=state.bufferTimeSpan,subscriber=state.subscriber,scheduler=state.scheduler;var context=subscriber.openContext();var action=this;if(!subscriber.closed){subscriber.add(context.closeAction=scheduler.schedule(dispatchBufferClose,bufferTimeSpan,{subscriber:subscriber,context:context}));action.schedule(state,bufferCreationInterval);}}function dispatchBufferClose(arg){var subscriber=arg.subscriber,context=arg.context;subscriber.closeContext(context);}

function bufferToggle(openings,closingSelector){return function bufferToggleOperatorFunction(source){return source.lift(new BufferToggleOperator(openings,closingSelector));};}var BufferToggleOperator=/*@__PURE__*/function(){function BufferToggleOperator(openings,closingSelector){this.openings=openings;this.closingSelector=closingSelector;}BufferToggleOperator.prototype.call=function(subscriber,source){return source.subscribe(new BufferToggleSubscriber(subscriber,this.openings,this.closingSelector));};return BufferToggleOperator;}();var BufferToggleSubscriber=/*@__PURE__*/function(_super){__extends(BufferToggleSubscriber,_super);function BufferToggleSubscriber(destination,openings,closingSelector){var _this=_super.call(this,destination)||this;_this.closingSelector=closingSelector;_this.contexts=[];_this.add(subscribeToResult(_this,openings));return _this;}BufferToggleSubscriber.prototype._next=function(value){var contexts=this.contexts;var len=contexts.length;for(var i=0;i<len;i++){contexts[i].buffer.push(value);}};BufferToggleSubscriber.prototype._error=function(err){var contexts=this.contexts;while(contexts.length>0){var context_1=contexts.shift();context_1.subscription.unsubscribe();context_1.buffer=null;context_1.subscription=null;}this.contexts=null;_super.prototype._error.call(this,err);};BufferToggleSubscriber.prototype._complete=function(){var contexts=this.contexts;while(contexts.length>0){var context_2=contexts.shift();this.destination.next(context_2.buffer);context_2.subscription.unsubscribe();context_2.buffer=null;context_2.subscription=null;}this.contexts=null;_super.prototype._complete.call(this);};BufferToggleSubscriber.prototype.notifyNext=function(outerValue,innerValue){outerValue?this.closeBuffer(outerValue):this.openBuffer(innerValue);};BufferToggleSubscriber.prototype.notifyComplete=function(innerSub){this.closeBuffer(innerSub.context);};BufferToggleSubscriber.prototype.openBuffer=function(value){try{var closingSelector=this.closingSelector;var closingNotifier=closingSelector.call(this,value);if(closingNotifier){this.trySubscribe(closingNotifier);}}catch(err){this._error(err);}};BufferToggleSubscriber.prototype.closeBuffer=function(context){var contexts=this.contexts;if(contexts&&context){var buffer=context.buffer,subscription=context.subscription;this.destination.next(buffer);contexts.splice(contexts.indexOf(context),1);this.remove(subscription);subscription.unsubscribe();}};BufferToggleSubscriber.prototype.trySubscribe=function(closingNotifier){var contexts=this.contexts;var buffer=[];var subscription=new Subscription();var context={buffer:buffer,subscription:subscription};contexts.push(context);var innerSubscription=subscribeToResult(this,closingNotifier,context);if(!innerSubscription||innerSubscription.closed){this.closeBuffer(context);}else {innerSubscription.context=context;this.add(innerSubscription);subscription.add(innerSubscription);}};return BufferToggleSubscriber;}(OuterSubscriber);

function bufferWhen(closingSelector){return function(source){return source.lift(new BufferWhenOperator(closingSelector));};}var BufferWhenOperator=/*@__PURE__*/function(){function BufferWhenOperator(closingSelector){this.closingSelector=closingSelector;}BufferWhenOperator.prototype.call=function(subscriber,source){return source.subscribe(new BufferWhenSubscriber(subscriber,this.closingSelector));};return BufferWhenOperator;}();var BufferWhenSubscriber=/*@__PURE__*/function(_super){__extends(BufferWhenSubscriber,_super);function BufferWhenSubscriber(destination,closingSelector){var _this=_super.call(this,destination)||this;_this.closingSelector=closingSelector;_this.subscribing=false;_this.openBuffer();return _this;}BufferWhenSubscriber.prototype._next=function(value){this.buffer.push(value);};BufferWhenSubscriber.prototype._complete=function(){var buffer=this.buffer;if(buffer){this.destination.next(buffer);}_super.prototype._complete.call(this);};BufferWhenSubscriber.prototype._unsubscribe=function(){this.buffer=undefined;this.subscribing=false;};BufferWhenSubscriber.prototype.notifyNext=function(){this.openBuffer();};BufferWhenSubscriber.prototype.notifyComplete=function(){if(this.subscribing){this.complete();}else {this.openBuffer();}};BufferWhenSubscriber.prototype.openBuffer=function(){var closingSubscription=this.closingSubscription;if(closingSubscription){this.remove(closingSubscription);closingSubscription.unsubscribe();}var buffer=this.buffer;if(this.buffer){this.destination.next(buffer);}this.buffer=[];var closingNotifier;try{var closingSelector=this.closingSelector;closingNotifier=closingSelector();}catch(err){return this.error(err);}closingSubscription=new Subscription();this.closingSubscription=closingSubscription;this.add(closingSubscription);this.subscribing=true;closingSubscription.add(innerSubscribe(closingNotifier,new SimpleInnerSubscriber(this)));this.subscribing=false;};return BufferWhenSubscriber;}(SimpleOuterSubscriber);

function catchError(selector){return function catchErrorOperatorFunction(source){var operator=new CatchOperator(selector);var caught=source.lift(operator);return operator.caught=caught;};}var CatchOperator=/*@__PURE__*/function(){function CatchOperator(selector){this.selector=selector;}CatchOperator.prototype.call=function(subscriber,source){return source.subscribe(new CatchSubscriber(subscriber,this.selector,this.caught));};return CatchOperator;}();var CatchSubscriber=/*@__PURE__*/function(_super){__extends(CatchSubscriber,_super);function CatchSubscriber(destination,selector,caught){var _this=_super.call(this,destination)||this;_this.selector=selector;_this.caught=caught;return _this;}CatchSubscriber.prototype.error=function(err){if(!this.isStopped){var result=void 0;try{result=this.selector(err,this.caught);}catch(err2){_super.prototype.error.call(this,err2);return;}this._unsubscribeAndRecycle();var innerSubscriber=new SimpleInnerSubscriber(this);this.add(innerSubscriber);var innerSubscription=innerSubscribe(result,innerSubscriber);if(innerSubscription!==innerSubscriber){this.add(innerSubscription);}}};return CatchSubscriber;}(SimpleOuterSubscriber);

function combineAll(project){return function(source){return source.lift(new CombineLatestOperator(project));};}

var none={};function combineLatest$1(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}var project=null;if(typeof observables[observables.length-1]==='function'){project=observables.pop();}if(observables.length===1&&isArray(observables[0])){observables=observables[0].slice();}return function(source){return source.lift.call(from([source].concat(observables)),new CombineLatestOperator(project));};}

function concat$1(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}return function(source){return source.lift.call(concat.apply(void 0,[source].concat(observables)));};}

function concatMap(project,resultSelector){return mergeMap(project,resultSelector,1);}

function concatMapTo(innerObservable,resultSelector){return concatMap(function(){return innerObservable;},resultSelector);}

function count(predicate){return function(source){return source.lift(new CountOperator(predicate,source));};}var CountOperator=/*@__PURE__*/function(){function CountOperator(predicate,source){this.predicate=predicate;this.source=source;}CountOperator.prototype.call=function(subscriber,source){return source.subscribe(new CountSubscriber(subscriber,this.predicate,this.source));};return CountOperator;}();var CountSubscriber=/*@__PURE__*/function(_super){__extends(CountSubscriber,_super);function CountSubscriber(destination,predicate,source){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.source=source;_this.count=0;_this.index=0;return _this;}CountSubscriber.prototype._next=function(value){if(this.predicate){this._tryPredicate(value);}else {this.count++;}};CountSubscriber.prototype._tryPredicate=function(value){var result;try{result=this.predicate(value,this.index++,this.source);}catch(err){this.destination.error(err);return;}if(result){this.count++;}};CountSubscriber.prototype._complete=function(){this.destination.next(this.count);this.destination.complete();};return CountSubscriber;}(Subscriber);

function debounce(durationSelector){return function(source){return source.lift(new DebounceOperator(durationSelector));};}var DebounceOperator=/*@__PURE__*/function(){function DebounceOperator(durationSelector){this.durationSelector=durationSelector;}DebounceOperator.prototype.call=function(subscriber,source){return source.subscribe(new DebounceSubscriber(subscriber,this.durationSelector));};return DebounceOperator;}();var DebounceSubscriber=/*@__PURE__*/function(_super){__extends(DebounceSubscriber,_super);function DebounceSubscriber(destination,durationSelector){var _this=_super.call(this,destination)||this;_this.durationSelector=durationSelector;_this.hasValue=false;return _this;}DebounceSubscriber.prototype._next=function(value){try{var result=this.durationSelector.call(this,value);if(result){this._tryNext(value,result);}}catch(err){this.destination.error(err);}};DebounceSubscriber.prototype._complete=function(){this.emitValue();this.destination.complete();};DebounceSubscriber.prototype._tryNext=function(value,duration){var subscription=this.durationSubscription;this.value=value;this.hasValue=true;if(subscription){subscription.unsubscribe();this.remove(subscription);}subscription=innerSubscribe(duration,new SimpleInnerSubscriber(this));if(subscription&&!subscription.closed){this.add(this.durationSubscription=subscription);}};DebounceSubscriber.prototype.notifyNext=function(){this.emitValue();};DebounceSubscriber.prototype.notifyComplete=function(){this.emitValue();};DebounceSubscriber.prototype.emitValue=function(){if(this.hasValue){var value=this.value;var subscription=this.durationSubscription;if(subscription){this.durationSubscription=undefined;subscription.unsubscribe();this.remove(subscription);}this.value=undefined;this.hasValue=false;_super.prototype._next.call(this,value);}};return DebounceSubscriber;}(SimpleOuterSubscriber);

function debounceTime(dueTime,scheduler){if(scheduler===void 0){scheduler=async;}return function(source){return source.lift(new DebounceTimeOperator(dueTime,scheduler));};}var DebounceTimeOperator=/*@__PURE__*/function(){function DebounceTimeOperator(dueTime,scheduler){this.dueTime=dueTime;this.scheduler=scheduler;}DebounceTimeOperator.prototype.call=function(subscriber,source){return source.subscribe(new DebounceTimeSubscriber(subscriber,this.dueTime,this.scheduler));};return DebounceTimeOperator;}();var DebounceTimeSubscriber=/*@__PURE__*/function(_super){__extends(DebounceTimeSubscriber,_super);function DebounceTimeSubscriber(destination,dueTime,scheduler){var _this=_super.call(this,destination)||this;_this.dueTime=dueTime;_this.scheduler=scheduler;_this.debouncedSubscription=null;_this.lastValue=null;_this.hasValue=false;return _this;}DebounceTimeSubscriber.prototype._next=function(value){this.clearDebounce();this.lastValue=value;this.hasValue=true;this.add(this.debouncedSubscription=this.scheduler.schedule(dispatchNext$2,this.dueTime,this));};DebounceTimeSubscriber.prototype._complete=function(){this.debouncedNext();this.destination.complete();};DebounceTimeSubscriber.prototype.debouncedNext=function(){this.clearDebounce();if(this.hasValue){var lastValue=this.lastValue;this.lastValue=null;this.hasValue=false;this.destination.next(lastValue);}};DebounceTimeSubscriber.prototype.clearDebounce=function(){var debouncedSubscription=this.debouncedSubscription;if(debouncedSubscription!==null){this.remove(debouncedSubscription);debouncedSubscription.unsubscribe();this.debouncedSubscription=null;}};return DebounceTimeSubscriber;}(Subscriber);function dispatchNext$2(subscriber){subscriber.debouncedNext();}

function defaultIfEmpty(defaultValue){if(defaultValue===void 0){defaultValue=null;}return function(source){return source.lift(new DefaultIfEmptyOperator(defaultValue));};}var DefaultIfEmptyOperator=/*@__PURE__*/function(){function DefaultIfEmptyOperator(defaultValue){this.defaultValue=defaultValue;}DefaultIfEmptyOperator.prototype.call=function(subscriber,source){return source.subscribe(new DefaultIfEmptySubscriber(subscriber,this.defaultValue));};return DefaultIfEmptyOperator;}();var DefaultIfEmptySubscriber=/*@__PURE__*/function(_super){__extends(DefaultIfEmptySubscriber,_super);function DefaultIfEmptySubscriber(destination,defaultValue){var _this=_super.call(this,destination)||this;_this.defaultValue=defaultValue;_this.isEmpty=true;return _this;}DefaultIfEmptySubscriber.prototype._next=function(value){this.isEmpty=false;this.destination.next(value);};DefaultIfEmptySubscriber.prototype._complete=function(){if(this.isEmpty){this.destination.next(this.defaultValue);}this.destination.complete();};return DefaultIfEmptySubscriber;}(Subscriber);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */function isDate(value){return value instanceof Date&&!isNaN(+value);}

function delay(delay,scheduler){if(scheduler===void 0){scheduler=async;}var absoluteDelay=isDate(delay);var delayFor=absoluteDelay?+delay-scheduler.now():Math.abs(delay);return function(source){return source.lift(new DelayOperator(delayFor,scheduler));};}var DelayOperator=/*@__PURE__*/function(){function DelayOperator(delay,scheduler){this.delay=delay;this.scheduler=scheduler;}DelayOperator.prototype.call=function(subscriber,source){return source.subscribe(new DelaySubscriber(subscriber,this.delay,this.scheduler));};return DelayOperator;}();var DelaySubscriber=/*@__PURE__*/function(_super){__extends(DelaySubscriber,_super);function DelaySubscriber(destination,delay,scheduler){var _this=_super.call(this,destination)||this;_this.delay=delay;_this.scheduler=scheduler;_this.queue=[];_this.active=false;_this.errored=false;return _this;}DelaySubscriber.dispatch=function(state){var source=state.source;var queue=source.queue;var scheduler=state.scheduler;var destination=state.destination;while(queue.length>0&&queue[0].time-scheduler.now()<=0){queue.shift().notification.observe(destination);}if(queue.length>0){var delay_1=Math.max(0,queue[0].time-scheduler.now());this.schedule(state,delay_1);}else {this.unsubscribe();source.active=false;}};DelaySubscriber.prototype._schedule=function(scheduler){this.active=true;var destination=this.destination;destination.add(scheduler.schedule(DelaySubscriber.dispatch,this.delay,{source:this,destination:this.destination,scheduler:scheduler}));};DelaySubscriber.prototype.scheduleNotification=function(notification){if(this.errored===true){return;}var scheduler=this.scheduler;var message=new DelayMessage(scheduler.now()+this.delay,notification);this.queue.push(message);if(this.active===false){this._schedule(scheduler);}};DelaySubscriber.prototype._next=function(value){this.scheduleNotification(Notification.createNext(value));};DelaySubscriber.prototype._error=function(err){this.errored=true;this.queue=[];this.destination.error(err);this.unsubscribe();};DelaySubscriber.prototype._complete=function(){this.scheduleNotification(Notification.createComplete());this.unsubscribe();};return DelaySubscriber;}(Subscriber);var DelayMessage=/*@__PURE__*/function(){function DelayMessage(time,notification){this.time=time;this.notification=notification;}return DelayMessage;}();

function delayWhen(delayDurationSelector,subscriptionDelay){if(subscriptionDelay){return function(source){return new SubscriptionDelayObservable(source,subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));};}return function(source){return source.lift(new DelayWhenOperator(delayDurationSelector));};}var DelayWhenOperator=/*@__PURE__*/function(){function DelayWhenOperator(delayDurationSelector){this.delayDurationSelector=delayDurationSelector;}DelayWhenOperator.prototype.call=function(subscriber,source){return source.subscribe(new DelayWhenSubscriber(subscriber,this.delayDurationSelector));};return DelayWhenOperator;}();var DelayWhenSubscriber=/*@__PURE__*/function(_super){__extends(DelayWhenSubscriber,_super);function DelayWhenSubscriber(destination,delayDurationSelector){var _this=_super.call(this,destination)||this;_this.delayDurationSelector=delayDurationSelector;_this.completed=false;_this.delayNotifierSubscriptions=[];_this.index=0;return _this;}DelayWhenSubscriber.prototype.notifyNext=function(outerValue,_innerValue,_outerIndex,_innerIndex,innerSub){this.destination.next(outerValue);this.removeSubscription(innerSub);this.tryComplete();};DelayWhenSubscriber.prototype.notifyError=function(error,innerSub){this._error(error);};DelayWhenSubscriber.prototype.notifyComplete=function(innerSub){var value=this.removeSubscription(innerSub);if(value){this.destination.next(value);}this.tryComplete();};DelayWhenSubscriber.prototype._next=function(value){var index=this.index++;try{var delayNotifier=this.delayDurationSelector(value,index);if(delayNotifier){this.tryDelay(delayNotifier,value);}}catch(err){this.destination.error(err);}};DelayWhenSubscriber.prototype._complete=function(){this.completed=true;this.tryComplete();this.unsubscribe();};DelayWhenSubscriber.prototype.removeSubscription=function(subscription){subscription.unsubscribe();var subscriptionIdx=this.delayNotifierSubscriptions.indexOf(subscription);if(subscriptionIdx!==-1){this.delayNotifierSubscriptions.splice(subscriptionIdx,1);}return subscription.outerValue;};DelayWhenSubscriber.prototype.tryDelay=function(delayNotifier,value){var notifierSubscription=subscribeToResult(this,delayNotifier,value);if(notifierSubscription&&!notifierSubscription.closed){var destination=this.destination;destination.add(notifierSubscription);this.delayNotifierSubscriptions.push(notifierSubscription);}};DelayWhenSubscriber.prototype.tryComplete=function(){if(this.completed&&this.delayNotifierSubscriptions.length===0){this.destination.complete();}};return DelayWhenSubscriber;}(OuterSubscriber);var SubscriptionDelayObservable=/*@__PURE__*/function(_super){__extends(SubscriptionDelayObservable,_super);function SubscriptionDelayObservable(source,subscriptionDelay){var _this=_super.call(this)||this;_this.source=source;_this.subscriptionDelay=subscriptionDelay;return _this;}SubscriptionDelayObservable.prototype._subscribe=function(subscriber){this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber,this.source));};return SubscriptionDelayObservable;}(Observable);var SubscriptionDelaySubscriber=/*@__PURE__*/function(_super){__extends(SubscriptionDelaySubscriber,_super);function SubscriptionDelaySubscriber(parent,source){var _this=_super.call(this)||this;_this.parent=parent;_this.source=source;_this.sourceSubscribed=false;return _this;}SubscriptionDelaySubscriber.prototype._next=function(unused){this.subscribeToSource();};SubscriptionDelaySubscriber.prototype._error=function(err){this.unsubscribe();this.parent.error(err);};SubscriptionDelaySubscriber.prototype._complete=function(){this.unsubscribe();this.subscribeToSource();};SubscriptionDelaySubscriber.prototype.subscribeToSource=function(){if(!this.sourceSubscribed){this.sourceSubscribed=true;this.unsubscribe();this.source.subscribe(this.parent);}};return SubscriptionDelaySubscriber;}(Subscriber);

function dematerialize(){return function dematerializeOperatorFunction(source){return source.lift(new DeMaterializeOperator());};}var DeMaterializeOperator=/*@__PURE__*/function(){function DeMaterializeOperator(){}DeMaterializeOperator.prototype.call=function(subscriber,source){return source.subscribe(new DeMaterializeSubscriber(subscriber));};return DeMaterializeOperator;}();var DeMaterializeSubscriber=/*@__PURE__*/function(_super){__extends(DeMaterializeSubscriber,_super);function DeMaterializeSubscriber(destination){return _super.call(this,destination)||this;}DeMaterializeSubscriber.prototype._next=function(value){value.observe(this.destination);};return DeMaterializeSubscriber;}(Subscriber);

function distinct(keySelector,flushes){return function(source){return source.lift(new DistinctOperator(keySelector,flushes));};}var DistinctOperator=/*@__PURE__*/function(){function DistinctOperator(keySelector,flushes){this.keySelector=keySelector;this.flushes=flushes;}DistinctOperator.prototype.call=function(subscriber,source){return source.subscribe(new DistinctSubscriber(subscriber,this.keySelector,this.flushes));};return DistinctOperator;}();var DistinctSubscriber=/*@__PURE__*/function(_super){__extends(DistinctSubscriber,_super);function DistinctSubscriber(destination,keySelector,flushes){var _this=_super.call(this,destination)||this;_this.keySelector=keySelector;_this.values=new Set();if(flushes){_this.add(innerSubscribe(flushes,new SimpleInnerSubscriber(_this)));}return _this;}DistinctSubscriber.prototype.notifyNext=function(){this.values.clear();};DistinctSubscriber.prototype.notifyError=function(error){this._error(error);};DistinctSubscriber.prototype._next=function(value){if(this.keySelector){this._useKeySelector(value);}else {this._finalizeNext(value,value);}};DistinctSubscriber.prototype._useKeySelector=function(value){var key;var destination=this.destination;try{key=this.keySelector(value);}catch(err){destination.error(err);return;}this._finalizeNext(key,value);};DistinctSubscriber.prototype._finalizeNext=function(key,value){var values=this.values;if(!values.has(key)){values.add(key);this.destination.next(value);}};return DistinctSubscriber;}(SimpleOuterSubscriber);

function distinctUntilChanged(compare,keySelector){return function(source){return source.lift(new DistinctUntilChangedOperator(compare,keySelector));};}var DistinctUntilChangedOperator=/*@__PURE__*/function(){function DistinctUntilChangedOperator(compare,keySelector){this.compare=compare;this.keySelector=keySelector;}DistinctUntilChangedOperator.prototype.call=function(subscriber,source){return source.subscribe(new DistinctUntilChangedSubscriber(subscriber,this.compare,this.keySelector));};return DistinctUntilChangedOperator;}();var DistinctUntilChangedSubscriber=/*@__PURE__*/function(_super){__extends(DistinctUntilChangedSubscriber,_super);function DistinctUntilChangedSubscriber(destination,compare,keySelector){var _this=_super.call(this,destination)||this;_this.keySelector=keySelector;_this.hasKey=false;if(typeof compare==='function'){_this.compare=compare;}return _this;}DistinctUntilChangedSubscriber.prototype.compare=function(x,y){return x===y;};DistinctUntilChangedSubscriber.prototype._next=function(value){var key;try{var keySelector=this.keySelector;key=keySelector?keySelector(value):value;}catch(err){return this.destination.error(err);}var result=false;if(this.hasKey){try{var compare=this.compare;result=compare(this.key,key);}catch(err){return this.destination.error(err);}}else {this.hasKey=true;}if(!result){this.key=key;this.destination.next(value);}};return DistinctUntilChangedSubscriber;}(Subscriber);

function distinctUntilKeyChanged(key,compare){return distinctUntilChanged(function(x,y){return compare?compare(x[key],y[key]):x[key]===y[key];});}

function throwIfEmpty(errorFactory){if(errorFactory===void 0){errorFactory=defaultErrorFactory;}return function(source){return source.lift(new ThrowIfEmptyOperator(errorFactory));};}var ThrowIfEmptyOperator=/*@__PURE__*/function(){function ThrowIfEmptyOperator(errorFactory){this.errorFactory=errorFactory;}ThrowIfEmptyOperator.prototype.call=function(subscriber,source){return source.subscribe(new ThrowIfEmptySubscriber(subscriber,this.errorFactory));};return ThrowIfEmptyOperator;}();var ThrowIfEmptySubscriber=/*@__PURE__*/function(_super){__extends(ThrowIfEmptySubscriber,_super);function ThrowIfEmptySubscriber(destination,errorFactory){var _this=_super.call(this,destination)||this;_this.errorFactory=errorFactory;_this.hasValue=false;return _this;}ThrowIfEmptySubscriber.prototype._next=function(value){this.hasValue=true;this.destination.next(value);};ThrowIfEmptySubscriber.prototype._complete=function(){if(!this.hasValue){var err=void 0;try{err=this.errorFactory();}catch(e){err=e;}this.destination.error(err);}else {return this.destination.complete();}};return ThrowIfEmptySubscriber;}(Subscriber);function defaultErrorFactory(){return new EmptyError();}

function take(count){return function(source){if(count===0){return empty$1();}else {return source.lift(new TakeOperator(count));}};}var TakeOperator=/*@__PURE__*/function(){function TakeOperator(total){this.total=total;if(this.total<0){throw new ArgumentOutOfRangeError();}}TakeOperator.prototype.call=function(subscriber,source){return source.subscribe(new TakeSubscriber(subscriber,this.total));};return TakeOperator;}();var TakeSubscriber=/*@__PURE__*/function(_super){__extends(TakeSubscriber,_super);function TakeSubscriber(destination,total){var _this=_super.call(this,destination)||this;_this.total=total;_this.count=0;return _this;}TakeSubscriber.prototype._next=function(value){var total=this.total;var count=++this.count;if(count<=total){this.destination.next(value);if(count===total){this.destination.complete();this.unsubscribe();}}};return TakeSubscriber;}(Subscriber);

function elementAt(index,defaultValue){if(index<0){throw new ArgumentOutOfRangeError();}var hasDefaultValue=arguments.length>=2;return function(source){return source.pipe(filter(function(v,i){return i===index;}),take(1),hasDefaultValue?defaultIfEmpty(defaultValue):throwIfEmpty(function(){return new ArgumentOutOfRangeError();}));};}

function endWith(){var array=[];for(var _i=0;_i<arguments.length;_i++){array[_i]=arguments[_i];}return function(source){return concat(source,of.apply(void 0,array));};}

function every(predicate,thisArg){return function(source){return source.lift(new EveryOperator(predicate,thisArg,source));};}var EveryOperator=/*@__PURE__*/function(){function EveryOperator(predicate,thisArg,source){this.predicate=predicate;this.thisArg=thisArg;this.source=source;}EveryOperator.prototype.call=function(observer,source){return source.subscribe(new EverySubscriber(observer,this.predicate,this.thisArg,this.source));};return EveryOperator;}();var EverySubscriber=/*@__PURE__*/function(_super){__extends(EverySubscriber,_super);function EverySubscriber(destination,predicate,thisArg,source){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.thisArg=thisArg;_this.source=source;_this.index=0;_this.thisArg=thisArg||_this;return _this;}EverySubscriber.prototype.notifyComplete=function(everyValueMatch){this.destination.next(everyValueMatch);this.destination.complete();};EverySubscriber.prototype._next=function(value){var result=false;try{result=this.predicate.call(this.thisArg,value,this.index++,this.source);}catch(err){this.destination.error(err);return;}if(!result){this.notifyComplete(false);}};EverySubscriber.prototype._complete=function(){this.notifyComplete(true);};return EverySubscriber;}(Subscriber);

function exhaust(){return function(source){return source.lift(new SwitchFirstOperator());};}var SwitchFirstOperator=/*@__PURE__*/function(){function SwitchFirstOperator(){}SwitchFirstOperator.prototype.call=function(subscriber,source){return source.subscribe(new SwitchFirstSubscriber(subscriber));};return SwitchFirstOperator;}();var SwitchFirstSubscriber=/*@__PURE__*/function(_super){__extends(SwitchFirstSubscriber,_super);function SwitchFirstSubscriber(destination){var _this=_super.call(this,destination)||this;_this.hasCompleted=false;_this.hasSubscription=false;return _this;}SwitchFirstSubscriber.prototype._next=function(value){if(!this.hasSubscription){this.hasSubscription=true;this.add(innerSubscribe(value,new SimpleInnerSubscriber(this)));}};SwitchFirstSubscriber.prototype._complete=function(){this.hasCompleted=true;if(!this.hasSubscription){this.destination.complete();}};SwitchFirstSubscriber.prototype.notifyComplete=function(){this.hasSubscription=false;if(this.hasCompleted){this.destination.complete();}};return SwitchFirstSubscriber;}(SimpleOuterSubscriber);

function exhaustMap(project,resultSelector){if(resultSelector){return function(source){return source.pipe(exhaustMap(function(a,i){return from(project(a,i)).pipe(map(function(b,ii){return resultSelector(a,b,i,ii);}));}));};}return function(source){return source.lift(new ExhaustMapOperator(project));};}var ExhaustMapOperator=/*@__PURE__*/function(){function ExhaustMapOperator(project){this.project=project;}ExhaustMapOperator.prototype.call=function(subscriber,source){return source.subscribe(new ExhaustMapSubscriber(subscriber,this.project));};return ExhaustMapOperator;}();var ExhaustMapSubscriber=/*@__PURE__*/function(_super){__extends(ExhaustMapSubscriber,_super);function ExhaustMapSubscriber(destination,project){var _this=_super.call(this,destination)||this;_this.project=project;_this.hasSubscription=false;_this.hasCompleted=false;_this.index=0;return _this;}ExhaustMapSubscriber.prototype._next=function(value){if(!this.hasSubscription){this.tryNext(value);}};ExhaustMapSubscriber.prototype.tryNext=function(value){var result;var index=this.index++;try{result=this.project(value,index);}catch(err){this.destination.error(err);return;}this.hasSubscription=true;this._innerSub(result);};ExhaustMapSubscriber.prototype._innerSub=function(result){var innerSubscriber=new SimpleInnerSubscriber(this);var destination=this.destination;destination.add(innerSubscriber);var innerSubscription=innerSubscribe(result,innerSubscriber);if(innerSubscription!==innerSubscriber){destination.add(innerSubscription);}};ExhaustMapSubscriber.prototype._complete=function(){this.hasCompleted=true;if(!this.hasSubscription){this.destination.complete();}this.unsubscribe();};ExhaustMapSubscriber.prototype.notifyNext=function(innerValue){this.destination.next(innerValue);};ExhaustMapSubscriber.prototype.notifyError=function(err){this.destination.error(err);};ExhaustMapSubscriber.prototype.notifyComplete=function(){this.hasSubscription=false;if(this.hasCompleted){this.destination.complete();}};return ExhaustMapSubscriber;}(SimpleOuterSubscriber);

function expand(project,concurrent,scheduler){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}concurrent=(concurrent||0)<1?Number.POSITIVE_INFINITY:concurrent;return function(source){return source.lift(new ExpandOperator(project,concurrent,scheduler));};}var ExpandOperator=/*@__PURE__*/function(){function ExpandOperator(project,concurrent,scheduler){this.project=project;this.concurrent=concurrent;this.scheduler=scheduler;}ExpandOperator.prototype.call=function(subscriber,source){return source.subscribe(new ExpandSubscriber(subscriber,this.project,this.concurrent,this.scheduler));};return ExpandOperator;}();var ExpandSubscriber=/*@__PURE__*/function(_super){__extends(ExpandSubscriber,_super);function ExpandSubscriber(destination,project,concurrent,scheduler){var _this=_super.call(this,destination)||this;_this.project=project;_this.concurrent=concurrent;_this.scheduler=scheduler;_this.index=0;_this.active=0;_this.hasCompleted=false;if(concurrent<Number.POSITIVE_INFINITY){_this.buffer=[];}return _this;}ExpandSubscriber.dispatch=function(arg){var subscriber=arg.subscriber,result=arg.result,value=arg.value,index=arg.index;subscriber.subscribeToProjection(result,value,index);};ExpandSubscriber.prototype._next=function(value){var destination=this.destination;if(destination.closed){this._complete();return;}var index=this.index++;if(this.active<this.concurrent){destination.next(value);try{var project=this.project;var result=project(value,index);if(!this.scheduler){this.subscribeToProjection(result,value,index);}else {var state={subscriber:this,result:result,value:value,index:index};var destination_1=this.destination;destination_1.add(this.scheduler.schedule(ExpandSubscriber.dispatch,0,state));}}catch(e){destination.error(e);}}else {this.buffer.push(value);}};ExpandSubscriber.prototype.subscribeToProjection=function(result,value,index){this.active++;var destination=this.destination;destination.add(innerSubscribe(result,new SimpleInnerSubscriber(this)));};ExpandSubscriber.prototype._complete=function(){this.hasCompleted=true;if(this.hasCompleted&&this.active===0){this.destination.complete();}this.unsubscribe();};ExpandSubscriber.prototype.notifyNext=function(innerValue){this._next(innerValue);};ExpandSubscriber.prototype.notifyComplete=function(){var buffer=this.buffer;this.active--;if(buffer&&buffer.length>0){this._next(buffer.shift());}if(this.hasCompleted&&this.active===0){this.destination.complete();}};return ExpandSubscriber;}(SimpleOuterSubscriber);

function finalize(callback){return function(source){return source.lift(new FinallyOperator(callback));};}var FinallyOperator=/*@__PURE__*/function(){function FinallyOperator(callback){this.callback=callback;}FinallyOperator.prototype.call=function(subscriber,source){return source.subscribe(new FinallySubscriber(subscriber,this.callback));};return FinallyOperator;}();var FinallySubscriber=/*@__PURE__*/function(_super){__extends(FinallySubscriber,_super);function FinallySubscriber(destination,callback){var _this=_super.call(this,destination)||this;_this.add(new Subscription(callback));return _this;}return FinallySubscriber;}(Subscriber);

function find(predicate,thisArg){if(typeof predicate!=='function'){throw new TypeError('predicate is not a function');}return function(source){return source.lift(new FindValueOperator(predicate,source,false,thisArg));};}var FindValueOperator=/*@__PURE__*/function(){function FindValueOperator(predicate,source,yieldIndex,thisArg){this.predicate=predicate;this.source=source;this.yieldIndex=yieldIndex;this.thisArg=thisArg;}FindValueOperator.prototype.call=function(observer,source){return source.subscribe(new FindValueSubscriber(observer,this.predicate,this.source,this.yieldIndex,this.thisArg));};return FindValueOperator;}();var FindValueSubscriber=/*@__PURE__*/function(_super){__extends(FindValueSubscriber,_super);function FindValueSubscriber(destination,predicate,source,yieldIndex,thisArg){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.source=source;_this.yieldIndex=yieldIndex;_this.thisArg=thisArg;_this.index=0;return _this;}FindValueSubscriber.prototype.notifyComplete=function(value){var destination=this.destination;destination.next(value);destination.complete();this.unsubscribe();};FindValueSubscriber.prototype._next=function(value){var _a=this,predicate=_a.predicate,thisArg=_a.thisArg;var index=this.index++;try{var result=predicate.call(thisArg||this,value,index,this.source);if(result){this.notifyComplete(this.yieldIndex?index:value);}}catch(err){this.destination.error(err);}};FindValueSubscriber.prototype._complete=function(){this.notifyComplete(this.yieldIndex?-1:undefined);};return FindValueSubscriber;}(Subscriber);

function findIndex(predicate,thisArg){return function(source){return source.lift(new FindValueOperator(predicate,source,true,thisArg));};}

function first(predicate,defaultValue){var hasDefaultValue=arguments.length>=2;return function(source){return source.pipe(predicate?filter(function(v,i){return predicate(v,i,source);}):identity,take(1),hasDefaultValue?defaultIfEmpty(defaultValue):throwIfEmpty(function(){return new EmptyError();}));};}

function ignoreElements(){return function ignoreElementsOperatorFunction(source){return source.lift(new IgnoreElementsOperator());};}var IgnoreElementsOperator=/*@__PURE__*/function(){function IgnoreElementsOperator(){}IgnoreElementsOperator.prototype.call=function(subscriber,source){return source.subscribe(new IgnoreElementsSubscriber(subscriber));};return IgnoreElementsOperator;}();var IgnoreElementsSubscriber=/*@__PURE__*/function(_super){__extends(IgnoreElementsSubscriber,_super);function IgnoreElementsSubscriber(){return _super!==null&&_super.apply(this,arguments)||this;}IgnoreElementsSubscriber.prototype._next=function(unused){};return IgnoreElementsSubscriber;}(Subscriber);

function isEmpty(){return function(source){return source.lift(new IsEmptyOperator());};}var IsEmptyOperator=/*@__PURE__*/function(){function IsEmptyOperator(){}IsEmptyOperator.prototype.call=function(observer,source){return source.subscribe(new IsEmptySubscriber(observer));};return IsEmptyOperator;}();var IsEmptySubscriber=/*@__PURE__*/function(_super){__extends(IsEmptySubscriber,_super);function IsEmptySubscriber(destination){return _super.call(this,destination)||this;}IsEmptySubscriber.prototype.notifyComplete=function(isEmpty){var destination=this.destination;destination.next(isEmpty);destination.complete();};IsEmptySubscriber.prototype._next=function(value){this.notifyComplete(false);};IsEmptySubscriber.prototype._complete=function(){this.notifyComplete(true);};return IsEmptySubscriber;}(Subscriber);

function takeLast(count){return function takeLastOperatorFunction(source){if(count===0){return empty$1();}else {return source.lift(new TakeLastOperator(count));}};}var TakeLastOperator=/*@__PURE__*/function(){function TakeLastOperator(total){this.total=total;if(this.total<0){throw new ArgumentOutOfRangeError();}}TakeLastOperator.prototype.call=function(subscriber,source){return source.subscribe(new TakeLastSubscriber(subscriber,this.total));};return TakeLastOperator;}();var TakeLastSubscriber=/*@__PURE__*/function(_super){__extends(TakeLastSubscriber,_super);function TakeLastSubscriber(destination,total){var _this=_super.call(this,destination)||this;_this.total=total;_this.ring=new Array();_this.count=0;return _this;}TakeLastSubscriber.prototype._next=function(value){var ring=this.ring;var total=this.total;var count=this.count++;if(ring.length<total){ring.push(value);}else {var index=count%total;ring[index]=value;}};TakeLastSubscriber.prototype._complete=function(){var destination=this.destination;var count=this.count;if(count>0){var total=this.count>=this.total?this.total:this.count;var ring=this.ring;for(var i=0;i<total;i++){var idx=count++%total;destination.next(ring[idx]);}}destination.complete();};return TakeLastSubscriber;}(Subscriber);

function last(predicate,defaultValue){var hasDefaultValue=arguments.length>=2;return function(source){return source.pipe(predicate?filter(function(v,i){return predicate(v,i,source);}):identity,takeLast(1),hasDefaultValue?defaultIfEmpty(defaultValue):throwIfEmpty(function(){return new EmptyError();}));};}

function mapTo(value){return function(source){return source.lift(new MapToOperator(value));};}var MapToOperator=/*@__PURE__*/function(){function MapToOperator(value){this.value=value;}MapToOperator.prototype.call=function(subscriber,source){return source.subscribe(new MapToSubscriber(subscriber,this.value));};return MapToOperator;}();var MapToSubscriber=/*@__PURE__*/function(_super){__extends(MapToSubscriber,_super);function MapToSubscriber(destination,value){var _this=_super.call(this,destination)||this;_this.value=value;return _this;}MapToSubscriber.prototype._next=function(x){this.destination.next(this.value);};return MapToSubscriber;}(Subscriber);

function materialize(){return function materializeOperatorFunction(source){return source.lift(new MaterializeOperator());};}var MaterializeOperator=/*@__PURE__*/function(){function MaterializeOperator(){}MaterializeOperator.prototype.call=function(subscriber,source){return source.subscribe(new MaterializeSubscriber(subscriber));};return MaterializeOperator;}();var MaterializeSubscriber=/*@__PURE__*/function(_super){__extends(MaterializeSubscriber,_super);function MaterializeSubscriber(destination){return _super.call(this,destination)||this;}MaterializeSubscriber.prototype._next=function(value){this.destination.next(Notification.createNext(value));};MaterializeSubscriber.prototype._error=function(err){var destination=this.destination;destination.next(Notification.createError(err));destination.complete();};MaterializeSubscriber.prototype._complete=function(){var destination=this.destination;destination.next(Notification.createComplete());destination.complete();};return MaterializeSubscriber;}(Subscriber);

function scan(accumulator,seed){var hasSeed=false;if(arguments.length>=2){hasSeed=true;}return function scanOperatorFunction(source){return source.lift(new ScanOperator(accumulator,seed,hasSeed));};}var ScanOperator=/*@__PURE__*/function(){function ScanOperator(accumulator,seed,hasSeed){if(hasSeed===void 0){hasSeed=false;}this.accumulator=accumulator;this.seed=seed;this.hasSeed=hasSeed;}ScanOperator.prototype.call=function(subscriber,source){return source.subscribe(new ScanSubscriber(subscriber,this.accumulator,this.seed,this.hasSeed));};return ScanOperator;}();var ScanSubscriber=/*@__PURE__*/function(_super){__extends(ScanSubscriber,_super);function ScanSubscriber(destination,accumulator,_seed,hasSeed){var _this=_super.call(this,destination)||this;_this.accumulator=accumulator;_this._seed=_seed;_this.hasSeed=hasSeed;_this.index=0;return _this;}Object.defineProperty(ScanSubscriber.prototype,"seed",{get:function(){return this._seed;},set:function(value){this.hasSeed=true;this._seed=value;},enumerable:true,configurable:true});ScanSubscriber.prototype._next=function(value){if(!this.hasSeed){this.seed=value;this.destination.next(value);}else {return this._tryNext(value);}};ScanSubscriber.prototype._tryNext=function(value){var index=this.index++;var result;try{result=this.accumulator(this.seed,value,index);}catch(err){this.destination.error(err);}this.seed=result;this.destination.next(result);};return ScanSubscriber;}(Subscriber);

function reduce(accumulator,seed){if(arguments.length>=2){return function reduceOperatorFunctionWithSeed(source){return pipe(scan(accumulator,seed),takeLast(1),defaultIfEmpty(seed))(source);};}return function reduceOperatorFunction(source){return pipe(scan(function(acc,value,index){return accumulator(acc,value,index+1);}),takeLast(1))(source);};}

function max(comparer){var max=typeof comparer==='function'?function(x,y){return comparer(x,y)>0?x:y;}:function(x,y){return x>y?x:y;};return reduce(max);}

function merge$1(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}return function(source){return source.lift.call(merge.apply(void 0,[source].concat(observables)));};}

function mergeMapTo(innerObservable,resultSelector,concurrent){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}if(typeof resultSelector==='function'){return mergeMap(function(){return innerObservable;},resultSelector,concurrent);}if(typeof resultSelector==='number'){concurrent=resultSelector;}return mergeMap(function(){return innerObservable;},concurrent);}

function mergeScan(accumulator,seed,concurrent){if(concurrent===void 0){concurrent=Number.POSITIVE_INFINITY;}return function(source){return source.lift(new MergeScanOperator(accumulator,seed,concurrent));};}var MergeScanOperator=/*@__PURE__*/function(){function MergeScanOperator(accumulator,seed,concurrent){this.accumulator=accumulator;this.seed=seed;this.concurrent=concurrent;}MergeScanOperator.prototype.call=function(subscriber,source){return source.subscribe(new MergeScanSubscriber(subscriber,this.accumulator,this.seed,this.concurrent));};return MergeScanOperator;}();var MergeScanSubscriber=/*@__PURE__*/function(_super){__extends(MergeScanSubscriber,_super);function MergeScanSubscriber(destination,accumulator,acc,concurrent){var _this=_super.call(this,destination)||this;_this.accumulator=accumulator;_this.acc=acc;_this.concurrent=concurrent;_this.hasValue=false;_this.hasCompleted=false;_this.buffer=[];_this.active=0;_this.index=0;return _this;}MergeScanSubscriber.prototype._next=function(value){if(this.active<this.concurrent){var index=this.index++;var destination=this.destination;var ish=void 0;try{var accumulator=this.accumulator;ish=accumulator(this.acc,value,index);}catch(e){return destination.error(e);}this.active++;this._innerSub(ish);}else {this.buffer.push(value);}};MergeScanSubscriber.prototype._innerSub=function(ish){var innerSubscriber=new SimpleInnerSubscriber(this);var destination=this.destination;destination.add(innerSubscriber);var innerSubscription=innerSubscribe(ish,innerSubscriber);if(innerSubscription!==innerSubscriber){destination.add(innerSubscription);}};MergeScanSubscriber.prototype._complete=function(){this.hasCompleted=true;if(this.active===0&&this.buffer.length===0){if(this.hasValue===false){this.destination.next(this.acc);}this.destination.complete();}this.unsubscribe();};MergeScanSubscriber.prototype.notifyNext=function(innerValue){var destination=this.destination;this.acc=innerValue;this.hasValue=true;destination.next(innerValue);};MergeScanSubscriber.prototype.notifyComplete=function(){var buffer=this.buffer;this.active--;if(buffer.length>0){this._next(buffer.shift());}else if(this.active===0&&this.hasCompleted){if(this.hasValue===false){this.destination.next(this.acc);}this.destination.complete();}};return MergeScanSubscriber;}(SimpleOuterSubscriber);

function min(comparer){var min=typeof comparer==='function'?function(x,y){return comparer(x,y)<0?x:y;}:function(x,y){return x<y?x:y;};return reduce(min);}

function multicast(subjectOrSubjectFactory,selector){return function multicastOperatorFunction(source){var subjectFactory;if(typeof subjectOrSubjectFactory==='function'){subjectFactory=subjectOrSubjectFactory;}else {subjectFactory=function subjectFactory(){return subjectOrSubjectFactory;};}if(typeof selector==='function'){return source.lift(new MulticastOperator(subjectFactory,selector));}var connectable=Object.create(source,connectableObservableDescriptor);connectable.source=source;connectable.subjectFactory=subjectFactory;return connectable;};}var MulticastOperator=/*@__PURE__*/function(){function MulticastOperator(subjectFactory,selector){this.subjectFactory=subjectFactory;this.selector=selector;}MulticastOperator.prototype.call=function(subscriber,source){var selector=this.selector;var subject=this.subjectFactory();var subscription=selector(subject).subscribe(subscriber);subscription.add(source.subscribe(subject));return subscription;};return MulticastOperator;}();

function onErrorResumeNext$1(){var nextSources=[];for(var _i=0;_i<arguments.length;_i++){nextSources[_i]=arguments[_i];}if(nextSources.length===1&&isArray(nextSources[0])){nextSources=nextSources[0];}return function(source){return source.lift(new OnErrorResumeNextOperator(nextSources));};}function onErrorResumeNextStatic(){var nextSources=[];for(var _i=0;_i<arguments.length;_i++){nextSources[_i]=arguments[_i];}var source=undefined;if(nextSources.length===1&&isArray(nextSources[0])){nextSources=nextSources[0];}source=nextSources.shift();return from(source).lift(new OnErrorResumeNextOperator(nextSources));}var OnErrorResumeNextOperator=/*@__PURE__*/function(){function OnErrorResumeNextOperator(nextSources){this.nextSources=nextSources;}OnErrorResumeNextOperator.prototype.call=function(subscriber,source){return source.subscribe(new OnErrorResumeNextSubscriber(subscriber,this.nextSources));};return OnErrorResumeNextOperator;}();var OnErrorResumeNextSubscriber=/*@__PURE__*/function(_super){__extends(OnErrorResumeNextSubscriber,_super);function OnErrorResumeNextSubscriber(destination,nextSources){var _this=_super.call(this,destination)||this;_this.destination=destination;_this.nextSources=nextSources;return _this;}OnErrorResumeNextSubscriber.prototype.notifyError=function(){this.subscribeToNextSource();};OnErrorResumeNextSubscriber.prototype.notifyComplete=function(){this.subscribeToNextSource();};OnErrorResumeNextSubscriber.prototype._error=function(err){this.subscribeToNextSource();this.unsubscribe();};OnErrorResumeNextSubscriber.prototype._complete=function(){this.subscribeToNextSource();this.unsubscribe();};OnErrorResumeNextSubscriber.prototype.subscribeToNextSource=function(){var next=this.nextSources.shift();if(!!next){var innerSubscriber=new SimpleInnerSubscriber(this);var destination=this.destination;destination.add(innerSubscriber);var innerSubscription=innerSubscribe(next,innerSubscriber);if(innerSubscription!==innerSubscriber){destination.add(innerSubscription);}}else {this.destination.complete();}};return OnErrorResumeNextSubscriber;}(SimpleOuterSubscriber);

function pairwise(){return function(source){return source.lift(new PairwiseOperator());};}var PairwiseOperator=/*@__PURE__*/function(){function PairwiseOperator(){}PairwiseOperator.prototype.call=function(subscriber,source){return source.subscribe(new PairwiseSubscriber(subscriber));};return PairwiseOperator;}();var PairwiseSubscriber=/*@__PURE__*/function(_super){__extends(PairwiseSubscriber,_super);function PairwiseSubscriber(destination){var _this=_super.call(this,destination)||this;_this.hasPrev=false;return _this;}PairwiseSubscriber.prototype._next=function(value){var pair;if(this.hasPrev){pair=[this.prev,value];}else {this.hasPrev=true;}this.prev=value;if(pair){this.destination.next(pair);}};return PairwiseSubscriber;}(Subscriber);

function partition$1(predicate,thisArg){return function(source){return [filter(predicate,thisArg)(source),filter(not(predicate,thisArg))(source)];};}

function pluck(){var properties=[];for(var _i=0;_i<arguments.length;_i++){properties[_i]=arguments[_i];}var length=properties.length;if(length===0){throw new Error('list of properties cannot be empty.');}return function(source){return map(plucker(properties,length))(source);};}function plucker(props,length){var mapper=function(x){var currentProp=x;for(var i=0;i<length;i++){var p=currentProp!=null?currentProp[props[i]]:undefined;if(p!==void 0){currentProp=p;}else {return undefined;}}return currentProp;};return mapper;}

function publish(selector){return selector?multicast(function(){return new Subject();},selector):multicast(new Subject());}

function publishBehavior(value){return function(source){return multicast(new BehaviorSubject(value))(source);};}

function publishLast(){return function(source){return multicast(new AsyncSubject())(source);};}

function publishReplay(bufferSize,windowTime,selectorOrScheduler,scheduler){if(selectorOrScheduler&&typeof selectorOrScheduler!=='function'){scheduler=selectorOrScheduler;}var selector=typeof selectorOrScheduler==='function'?selectorOrScheduler:undefined;var subject=new ReplaySubject(bufferSize,windowTime,scheduler);return function(source){return multicast(function(){return subject;},selector)(source);};}

function race$1(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}return function raceOperatorFunction(source){if(observables.length===1&&isArray(observables[0])){observables=observables[0];}return source.lift.call(race.apply(void 0,[source].concat(observables)));};}

function repeat(count){if(count===void 0){count=-1;}return function(source){if(count===0){return empty$1();}else if(count<0){return source.lift(new RepeatOperator(-1,source));}else {return source.lift(new RepeatOperator(count-1,source));}};}var RepeatOperator=/*@__PURE__*/function(){function RepeatOperator(count,source){this.count=count;this.source=source;}RepeatOperator.prototype.call=function(subscriber,source){return source.subscribe(new RepeatSubscriber(subscriber,this.count,this.source));};return RepeatOperator;}();var RepeatSubscriber=/*@__PURE__*/function(_super){__extends(RepeatSubscriber,_super);function RepeatSubscriber(destination,count,source){var _this=_super.call(this,destination)||this;_this.count=count;_this.source=source;return _this;}RepeatSubscriber.prototype.complete=function(){if(!this.isStopped){var _a=this,source=_a.source,count=_a.count;if(count===0){return _super.prototype.complete.call(this);}else if(count>-1){this.count=count-1;}source.subscribe(this._unsubscribeAndRecycle());}};return RepeatSubscriber;}(Subscriber);

function repeatWhen(notifier){return function(source){return source.lift(new RepeatWhenOperator(notifier));};}var RepeatWhenOperator=/*@__PURE__*/function(){function RepeatWhenOperator(notifier){this.notifier=notifier;}RepeatWhenOperator.prototype.call=function(subscriber,source){return source.subscribe(new RepeatWhenSubscriber(subscriber,this.notifier,source));};return RepeatWhenOperator;}();var RepeatWhenSubscriber=/*@__PURE__*/function(_super){__extends(RepeatWhenSubscriber,_super);function RepeatWhenSubscriber(destination,notifier,source){var _this=_super.call(this,destination)||this;_this.notifier=notifier;_this.source=source;_this.sourceIsBeingSubscribedTo=true;return _this;}RepeatWhenSubscriber.prototype.notifyNext=function(){this.sourceIsBeingSubscribedTo=true;this.source.subscribe(this);};RepeatWhenSubscriber.prototype.notifyComplete=function(){if(this.sourceIsBeingSubscribedTo===false){return _super.prototype.complete.call(this);}};RepeatWhenSubscriber.prototype.complete=function(){this.sourceIsBeingSubscribedTo=false;if(!this.isStopped){if(!this.retries){this.subscribeToRetries();}if(!this.retriesSubscription||this.retriesSubscription.closed){return _super.prototype.complete.call(this);}this._unsubscribeAndRecycle();this.notifications.next(undefined);}};RepeatWhenSubscriber.prototype._unsubscribe=function(){var _a=this,notifications=_a.notifications,retriesSubscription=_a.retriesSubscription;if(notifications){notifications.unsubscribe();this.notifications=undefined;}if(retriesSubscription){retriesSubscription.unsubscribe();this.retriesSubscription=undefined;}this.retries=undefined;};RepeatWhenSubscriber.prototype._unsubscribeAndRecycle=function(){var _unsubscribe=this._unsubscribe;this._unsubscribe=null;_super.prototype._unsubscribeAndRecycle.call(this);this._unsubscribe=_unsubscribe;return this;};RepeatWhenSubscriber.prototype.subscribeToRetries=function(){this.notifications=new Subject();var retries;try{var notifier=this.notifier;retries=notifier(this.notifications);}catch(e){return _super.prototype.complete.call(this);}this.retries=retries;this.retriesSubscription=innerSubscribe(retries,new SimpleInnerSubscriber(this));};return RepeatWhenSubscriber;}(SimpleOuterSubscriber);

function retry(count){if(count===void 0){count=-1;}return function(source){return source.lift(new RetryOperator(count,source));};}var RetryOperator=/*@__PURE__*/function(){function RetryOperator(count,source){this.count=count;this.source=source;}RetryOperator.prototype.call=function(subscriber,source){return source.subscribe(new RetrySubscriber(subscriber,this.count,this.source));};return RetryOperator;}();var RetrySubscriber=/*@__PURE__*/function(_super){__extends(RetrySubscriber,_super);function RetrySubscriber(destination,count,source){var _this=_super.call(this,destination)||this;_this.count=count;_this.source=source;return _this;}RetrySubscriber.prototype.error=function(err){if(!this.isStopped){var _a=this,source=_a.source,count=_a.count;if(count===0){return _super.prototype.error.call(this,err);}else if(count>-1){this.count=count-1;}source.subscribe(this._unsubscribeAndRecycle());}};return RetrySubscriber;}(Subscriber);

function retryWhen(notifier){return function(source){return source.lift(new RetryWhenOperator(notifier,source));};}var RetryWhenOperator=/*@__PURE__*/function(){function RetryWhenOperator(notifier,source){this.notifier=notifier;this.source=source;}RetryWhenOperator.prototype.call=function(subscriber,source){return source.subscribe(new RetryWhenSubscriber(subscriber,this.notifier,this.source));};return RetryWhenOperator;}();var RetryWhenSubscriber=/*@__PURE__*/function(_super){__extends(RetryWhenSubscriber,_super);function RetryWhenSubscriber(destination,notifier,source){var _this=_super.call(this,destination)||this;_this.notifier=notifier;_this.source=source;return _this;}RetryWhenSubscriber.prototype.error=function(err){if(!this.isStopped){var errors=this.errors;var retries=this.retries;var retriesSubscription=this.retriesSubscription;if(!retries){errors=new Subject();try{var notifier=this.notifier;retries=notifier(errors);}catch(e){return _super.prototype.error.call(this,e);}retriesSubscription=innerSubscribe(retries,new SimpleInnerSubscriber(this));}else {this.errors=undefined;this.retriesSubscription=undefined;}this._unsubscribeAndRecycle();this.errors=errors;this.retries=retries;this.retriesSubscription=retriesSubscription;errors.next(err);}};RetryWhenSubscriber.prototype._unsubscribe=function(){var _a=this,errors=_a.errors,retriesSubscription=_a.retriesSubscription;if(errors){errors.unsubscribe();this.errors=undefined;}if(retriesSubscription){retriesSubscription.unsubscribe();this.retriesSubscription=undefined;}this.retries=undefined;};RetryWhenSubscriber.prototype.notifyNext=function(){var _unsubscribe=this._unsubscribe;this._unsubscribe=null;this._unsubscribeAndRecycle();this._unsubscribe=_unsubscribe;this.source.subscribe(this);};return RetryWhenSubscriber;}(SimpleOuterSubscriber);

function sample(notifier){return function(source){return source.lift(new SampleOperator(notifier));};}var SampleOperator=/*@__PURE__*/function(){function SampleOperator(notifier){this.notifier=notifier;}SampleOperator.prototype.call=function(subscriber,source){var sampleSubscriber=new SampleSubscriber(subscriber);var subscription=source.subscribe(sampleSubscriber);subscription.add(innerSubscribe(this.notifier,new SimpleInnerSubscriber(sampleSubscriber)));return subscription;};return SampleOperator;}();var SampleSubscriber=/*@__PURE__*/function(_super){__extends(SampleSubscriber,_super);function SampleSubscriber(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.hasValue=false;return _this;}SampleSubscriber.prototype._next=function(value){this.value=value;this.hasValue=true;};SampleSubscriber.prototype.notifyNext=function(){this.emitValue();};SampleSubscriber.prototype.notifyComplete=function(){this.emitValue();};SampleSubscriber.prototype.emitValue=function(){if(this.hasValue){this.hasValue=false;this.destination.next(this.value);}};return SampleSubscriber;}(SimpleOuterSubscriber);

function sampleTime(period,scheduler){if(scheduler===void 0){scheduler=async;}return function(source){return source.lift(new SampleTimeOperator(period,scheduler));};}var SampleTimeOperator=/*@__PURE__*/function(){function SampleTimeOperator(period,scheduler){this.period=period;this.scheduler=scheduler;}SampleTimeOperator.prototype.call=function(subscriber,source){return source.subscribe(new SampleTimeSubscriber(subscriber,this.period,this.scheduler));};return SampleTimeOperator;}();var SampleTimeSubscriber=/*@__PURE__*/function(_super){__extends(SampleTimeSubscriber,_super);function SampleTimeSubscriber(destination,period,scheduler){var _this=_super.call(this,destination)||this;_this.period=period;_this.scheduler=scheduler;_this.hasValue=false;_this.add(scheduler.schedule(dispatchNotification,period,{subscriber:_this,period:period}));return _this;}SampleTimeSubscriber.prototype._next=function(value){this.lastValue=value;this.hasValue=true;};SampleTimeSubscriber.prototype.notifyNext=function(){if(this.hasValue){this.hasValue=false;this.destination.next(this.lastValue);}};return SampleTimeSubscriber;}(Subscriber);function dispatchNotification(state){var subscriber=state.subscriber,period=state.period;subscriber.notifyNext();this.schedule(state,period);}

function sequenceEqual(compareTo,comparator){return function(source){return source.lift(new SequenceEqualOperator(compareTo,comparator));};}var SequenceEqualOperator=/*@__PURE__*/function(){function SequenceEqualOperator(compareTo,comparator){this.compareTo=compareTo;this.comparator=comparator;}SequenceEqualOperator.prototype.call=function(subscriber,source){return source.subscribe(new SequenceEqualSubscriber(subscriber,this.compareTo,this.comparator));};return SequenceEqualOperator;}();var SequenceEqualSubscriber=/*@__PURE__*/function(_super){__extends(SequenceEqualSubscriber,_super);function SequenceEqualSubscriber(destination,compareTo,comparator){var _this=_super.call(this,destination)||this;_this.compareTo=compareTo;_this.comparator=comparator;_this._a=[];_this._b=[];_this._oneComplete=false;_this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination,_this)));return _this;}SequenceEqualSubscriber.prototype._next=function(value){if(this._oneComplete&&this._b.length===0){this.emit(false);}else {this._a.push(value);this.checkValues();}};SequenceEqualSubscriber.prototype._complete=function(){if(this._oneComplete){this.emit(this._a.length===0&&this._b.length===0);}else {this._oneComplete=true;}this.unsubscribe();};SequenceEqualSubscriber.prototype.checkValues=function(){var _c=this,_a=_c._a,_b=_c._b,comparator=_c.comparator;while(_a.length>0&&_b.length>0){var a=_a.shift();var b=_b.shift();var areEqual=false;try{areEqual=comparator?comparator(a,b):a===b;}catch(e){this.destination.error(e);}if(!areEqual){this.emit(false);}}};SequenceEqualSubscriber.prototype.emit=function(value){var destination=this.destination;destination.next(value);destination.complete();};SequenceEqualSubscriber.prototype.nextB=function(value){if(this._oneComplete&&this._a.length===0){this.emit(false);}else {this._b.push(value);this.checkValues();}};SequenceEqualSubscriber.prototype.completeB=function(){if(this._oneComplete){this.emit(this._a.length===0&&this._b.length===0);}else {this._oneComplete=true;}};return SequenceEqualSubscriber;}(Subscriber);var SequenceEqualCompareToSubscriber=/*@__PURE__*/function(_super){__extends(SequenceEqualCompareToSubscriber,_super);function SequenceEqualCompareToSubscriber(destination,parent){var _this=_super.call(this,destination)||this;_this.parent=parent;return _this;}SequenceEqualCompareToSubscriber.prototype._next=function(value){this.parent.nextB(value);};SequenceEqualCompareToSubscriber.prototype._error=function(err){this.parent.error(err);this.unsubscribe();};SequenceEqualCompareToSubscriber.prototype._complete=function(){this.parent.completeB();this.unsubscribe();};return SequenceEqualCompareToSubscriber;}(Subscriber);

function shareSubjectFactory(){return new Subject();}function share(){return function(source){return refCount()(multicast(shareSubjectFactory)(source));};}

function shareReplay(configOrBufferSize,windowTime,scheduler){var config;if(configOrBufferSize&&typeof configOrBufferSize==='object'){config=configOrBufferSize;}else {config={bufferSize:configOrBufferSize,windowTime:windowTime,refCount:false,scheduler:scheduler};}return function(source){return source.lift(shareReplayOperator(config));};}function shareReplayOperator(_a){var _b=_a.bufferSize,bufferSize=_b===void 0?Number.POSITIVE_INFINITY:_b,_c=_a.windowTime,windowTime=_c===void 0?Number.POSITIVE_INFINITY:_c,useRefCount=_a.refCount,scheduler=_a.scheduler;var subject;var refCount=0;var subscription;var hasError=false;var isComplete=false;return function shareReplayOperation(source){refCount++;var innerSub;if(!subject||hasError){hasError=false;subject=new ReplaySubject(bufferSize,windowTime,scheduler);innerSub=subject.subscribe(this);subscription=source.subscribe({next:function(value){subject.next(value);},error:function(err){hasError=true;subject.error(err);},complete:function(){isComplete=true;subscription=undefined;subject.complete();}});}else {innerSub=subject.subscribe(this);}this.add(function(){refCount--;innerSub.unsubscribe();if(subscription&&!isComplete&&useRefCount&&refCount===0){subscription.unsubscribe();subscription=undefined;subject=undefined;}});};}

function single(predicate){return function(source){return source.lift(new SingleOperator(predicate,source));};}var SingleOperator=/*@__PURE__*/function(){function SingleOperator(predicate,source){this.predicate=predicate;this.source=source;}SingleOperator.prototype.call=function(subscriber,source){return source.subscribe(new SingleSubscriber(subscriber,this.predicate,this.source));};return SingleOperator;}();var SingleSubscriber=/*@__PURE__*/function(_super){__extends(SingleSubscriber,_super);function SingleSubscriber(destination,predicate,source){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.source=source;_this.seenValue=false;_this.index=0;return _this;}SingleSubscriber.prototype.applySingleValue=function(value){if(this.seenValue){this.destination.error('Sequence contains more than one element');}else {this.seenValue=true;this.singleValue=value;}};SingleSubscriber.prototype._next=function(value){var index=this.index++;if(this.predicate){this.tryNext(value,index);}else {this.applySingleValue(value);}};SingleSubscriber.prototype.tryNext=function(value,index){try{if(this.predicate(value,index,this.source)){this.applySingleValue(value);}}catch(err){this.destination.error(err);}};SingleSubscriber.prototype._complete=function(){var destination=this.destination;if(this.index>0){destination.next(this.seenValue?this.singleValue:undefined);destination.complete();}else {destination.error(new EmptyError());}};return SingleSubscriber;}(Subscriber);

function skip(count){return function(source){return source.lift(new SkipOperator(count));};}var SkipOperator=/*@__PURE__*/function(){function SkipOperator(total){this.total=total;}SkipOperator.prototype.call=function(subscriber,source){return source.subscribe(new SkipSubscriber(subscriber,this.total));};return SkipOperator;}();var SkipSubscriber=/*@__PURE__*/function(_super){__extends(SkipSubscriber,_super);function SkipSubscriber(destination,total){var _this=_super.call(this,destination)||this;_this.total=total;_this.count=0;return _this;}SkipSubscriber.prototype._next=function(x){if(++this.count>this.total){this.destination.next(x);}};return SkipSubscriber;}(Subscriber);

function skipLast(count){return function(source){return source.lift(new SkipLastOperator(count));};}var SkipLastOperator=/*@__PURE__*/function(){function SkipLastOperator(_skipCount){this._skipCount=_skipCount;if(this._skipCount<0){throw new ArgumentOutOfRangeError();}}SkipLastOperator.prototype.call=function(subscriber,source){if(this._skipCount===0){return source.subscribe(new Subscriber(subscriber));}else {return source.subscribe(new SkipLastSubscriber(subscriber,this._skipCount));}};return SkipLastOperator;}();var SkipLastSubscriber=/*@__PURE__*/function(_super){__extends(SkipLastSubscriber,_super);function SkipLastSubscriber(destination,_skipCount){var _this=_super.call(this,destination)||this;_this._skipCount=_skipCount;_this._count=0;_this._ring=new Array(_skipCount);return _this;}SkipLastSubscriber.prototype._next=function(value){var skipCount=this._skipCount;var count=this._count++;if(count<skipCount){this._ring[count]=value;}else {var currentIndex=count%skipCount;var ring=this._ring;var oldValue=ring[currentIndex];ring[currentIndex]=value;this.destination.next(oldValue);}};return SkipLastSubscriber;}(Subscriber);

function skipUntil(notifier){return function(source){return source.lift(new SkipUntilOperator(notifier));};}var SkipUntilOperator=/*@__PURE__*/function(){function SkipUntilOperator(notifier){this.notifier=notifier;}SkipUntilOperator.prototype.call=function(destination,source){return source.subscribe(new SkipUntilSubscriber(destination,this.notifier));};return SkipUntilOperator;}();var SkipUntilSubscriber=/*@__PURE__*/function(_super){__extends(SkipUntilSubscriber,_super);function SkipUntilSubscriber(destination,notifier){var _this=_super.call(this,destination)||this;_this.hasValue=false;var innerSubscriber=new SimpleInnerSubscriber(_this);_this.add(innerSubscriber);_this.innerSubscription=innerSubscriber;var innerSubscription=innerSubscribe(notifier,innerSubscriber);if(innerSubscription!==innerSubscriber){_this.add(innerSubscription);_this.innerSubscription=innerSubscription;}return _this;}SkipUntilSubscriber.prototype._next=function(value){if(this.hasValue){_super.prototype._next.call(this,value);}};SkipUntilSubscriber.prototype.notifyNext=function(){this.hasValue=true;if(this.innerSubscription){this.innerSubscription.unsubscribe();}};SkipUntilSubscriber.prototype.notifyComplete=function(){};return SkipUntilSubscriber;}(SimpleOuterSubscriber);

function skipWhile(predicate){return function(source){return source.lift(new SkipWhileOperator(predicate));};}var SkipWhileOperator=/*@__PURE__*/function(){function SkipWhileOperator(predicate){this.predicate=predicate;}SkipWhileOperator.prototype.call=function(subscriber,source){return source.subscribe(new SkipWhileSubscriber(subscriber,this.predicate));};return SkipWhileOperator;}();var SkipWhileSubscriber=/*@__PURE__*/function(_super){__extends(SkipWhileSubscriber,_super);function SkipWhileSubscriber(destination,predicate){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.skipping=true;_this.index=0;return _this;}SkipWhileSubscriber.prototype._next=function(value){var destination=this.destination;if(this.skipping){this.tryCallPredicate(value);}if(!this.skipping){destination.next(value);}};SkipWhileSubscriber.prototype.tryCallPredicate=function(value){try{var result=this.predicate(value,this.index++);this.skipping=Boolean(result);}catch(err){this.destination.error(err);}};return SkipWhileSubscriber;}(Subscriber);

function startWith(){var array=[];for(var _i=0;_i<arguments.length;_i++){array[_i]=arguments[_i];}var scheduler=array[array.length-1];if(isScheduler(scheduler)){array.pop();return function(source){return concat(array,source,scheduler);};}else {return function(source){return concat(array,source);};}}

var SubscribeOnObservable=/*@__PURE__*/function(_super){__extends(SubscribeOnObservable,_super);function SubscribeOnObservable(source,delayTime,scheduler){if(delayTime===void 0){delayTime=0;}if(scheduler===void 0){scheduler=asap;}var _this=_super.call(this)||this;_this.source=source;_this.delayTime=delayTime;_this.scheduler=scheduler;if(!isNumeric(delayTime)||delayTime<0){_this.delayTime=0;}if(!scheduler||typeof scheduler.schedule!=='function'){_this.scheduler=asap;}return _this;}SubscribeOnObservable.create=function(source,delay,scheduler){if(delay===void 0){delay=0;}if(scheduler===void 0){scheduler=asap;}return new SubscribeOnObservable(source,delay,scheduler);};SubscribeOnObservable.dispatch=function(arg){var source=arg.source,subscriber=arg.subscriber;return this.add(source.subscribe(subscriber));};SubscribeOnObservable.prototype._subscribe=function(subscriber){var delay=this.delayTime;var source=this.source;var scheduler=this.scheduler;return scheduler.schedule(SubscribeOnObservable.dispatch,delay,{source:source,subscriber:subscriber});};return SubscribeOnObservable;}(Observable);

function subscribeOn(scheduler,delay){if(delay===void 0){delay=0;}return function subscribeOnOperatorFunction(source){return source.lift(new SubscribeOnOperator(scheduler,delay));};}var SubscribeOnOperator=/*@__PURE__*/function(){function SubscribeOnOperator(scheduler,delay){this.scheduler=scheduler;this.delay=delay;}SubscribeOnOperator.prototype.call=function(subscriber,source){return new SubscribeOnObservable(source,this.delay,this.scheduler).subscribe(subscriber);};return SubscribeOnOperator;}();

function switchMap(project,resultSelector){if(typeof resultSelector==='function'){return function(source){return source.pipe(switchMap(function(a,i){return from(project(a,i)).pipe(map(function(b,ii){return resultSelector(a,b,i,ii);}));}));};}return function(source){return source.lift(new SwitchMapOperator(project));};}var SwitchMapOperator=/*@__PURE__*/function(){function SwitchMapOperator(project){this.project=project;}SwitchMapOperator.prototype.call=function(subscriber,source){return source.subscribe(new SwitchMapSubscriber(subscriber,this.project));};return SwitchMapOperator;}();var SwitchMapSubscriber=/*@__PURE__*/function(_super){__extends(SwitchMapSubscriber,_super);function SwitchMapSubscriber(destination,project){var _this=_super.call(this,destination)||this;_this.project=project;_this.index=0;return _this;}SwitchMapSubscriber.prototype._next=function(value){var result;var index=this.index++;try{result=this.project(value,index);}catch(error){this.destination.error(error);return;}this._innerSub(result);};SwitchMapSubscriber.prototype._innerSub=function(result){var innerSubscription=this.innerSubscription;if(innerSubscription){innerSubscription.unsubscribe();}var innerSubscriber=new SimpleInnerSubscriber(this);var destination=this.destination;destination.add(innerSubscriber);this.innerSubscription=innerSubscribe(result,innerSubscriber);if(this.innerSubscription!==innerSubscriber){destination.add(this.innerSubscription);}};SwitchMapSubscriber.prototype._complete=function(){var innerSubscription=this.innerSubscription;if(!innerSubscription||innerSubscription.closed){_super.prototype._complete.call(this);}this.unsubscribe();};SwitchMapSubscriber.prototype._unsubscribe=function(){this.innerSubscription=undefined;};SwitchMapSubscriber.prototype.notifyComplete=function(){this.innerSubscription=undefined;if(this.isStopped){_super.prototype._complete.call(this);}};SwitchMapSubscriber.prototype.notifyNext=function(innerValue){this.destination.next(innerValue);};return SwitchMapSubscriber;}(SimpleOuterSubscriber);

function switchAll(){return switchMap(identity);}

function switchMapTo(innerObservable,resultSelector){return resultSelector?switchMap(function(){return innerObservable;},resultSelector):switchMap(function(){return innerObservable;});}

function takeUntil(notifier){return function(source){return source.lift(new TakeUntilOperator(notifier));};}var TakeUntilOperator=/*@__PURE__*/function(){function TakeUntilOperator(notifier){this.notifier=notifier;}TakeUntilOperator.prototype.call=function(subscriber,source){var takeUntilSubscriber=new TakeUntilSubscriber(subscriber);var notifierSubscription=innerSubscribe(this.notifier,new SimpleInnerSubscriber(takeUntilSubscriber));if(notifierSubscription&&!takeUntilSubscriber.seenValue){takeUntilSubscriber.add(notifierSubscription);return source.subscribe(takeUntilSubscriber);}return takeUntilSubscriber;};return TakeUntilOperator;}();var TakeUntilSubscriber=/*@__PURE__*/function(_super){__extends(TakeUntilSubscriber,_super);function TakeUntilSubscriber(destination){var _this=_super.call(this,destination)||this;_this.seenValue=false;return _this;}TakeUntilSubscriber.prototype.notifyNext=function(){this.seenValue=true;this.complete();};TakeUntilSubscriber.prototype.notifyComplete=function(){};return TakeUntilSubscriber;}(SimpleOuterSubscriber);

function takeWhile(predicate,inclusive){if(inclusive===void 0){inclusive=false;}return function(source){return source.lift(new TakeWhileOperator(predicate,inclusive));};}var TakeWhileOperator=/*@__PURE__*/function(){function TakeWhileOperator(predicate,inclusive){this.predicate=predicate;this.inclusive=inclusive;}TakeWhileOperator.prototype.call=function(subscriber,source){return source.subscribe(new TakeWhileSubscriber(subscriber,this.predicate,this.inclusive));};return TakeWhileOperator;}();var TakeWhileSubscriber=/*@__PURE__*/function(_super){__extends(TakeWhileSubscriber,_super);function TakeWhileSubscriber(destination,predicate,inclusive){var _this=_super.call(this,destination)||this;_this.predicate=predicate;_this.inclusive=inclusive;_this.index=0;return _this;}TakeWhileSubscriber.prototype._next=function(value){var destination=this.destination;var result;try{result=this.predicate(value,this.index++);}catch(err){destination.error(err);return;}this.nextOrComplete(value,result);};TakeWhileSubscriber.prototype.nextOrComplete=function(value,predicateResult){var destination=this.destination;if(Boolean(predicateResult)){destination.next(value);}else {if(this.inclusive){destination.next(value);}destination.complete();}};return TakeWhileSubscriber;}(Subscriber);

function tap(nextOrObserver,error,complete){return function tapOperatorFunction(source){return source.lift(new DoOperator(nextOrObserver,error,complete));};}var DoOperator=/*@__PURE__*/function(){function DoOperator(nextOrObserver,error,complete){this.nextOrObserver=nextOrObserver;this.error=error;this.complete=complete;}DoOperator.prototype.call=function(subscriber,source){return source.subscribe(new TapSubscriber(subscriber,this.nextOrObserver,this.error,this.complete));};return DoOperator;}();var TapSubscriber=/*@__PURE__*/function(_super){__extends(TapSubscriber,_super);function TapSubscriber(destination,observerOrNext,error,complete){var _this=_super.call(this,destination)||this;_this._tapNext=noop;_this._tapError=noop;_this._tapComplete=noop;_this._tapError=error||noop;_this._tapComplete=complete||noop;if(isFunction(observerOrNext)){_this._context=_this;_this._tapNext=observerOrNext;}else if(observerOrNext){_this._context=observerOrNext;_this._tapNext=observerOrNext.next||noop;_this._tapError=observerOrNext.error||noop;_this._tapComplete=observerOrNext.complete||noop;}return _this;}TapSubscriber.prototype._next=function(value){try{this._tapNext.call(this._context,value);}catch(err){this.destination.error(err);return;}this.destination.next(value);};TapSubscriber.prototype._error=function(err){try{this._tapError.call(this._context,err);}catch(err){this.destination.error(err);return;}this.destination.error(err);};TapSubscriber.prototype._complete=function(){try{this._tapComplete.call(this._context);}catch(err){this.destination.error(err);return;}return this.destination.complete();};return TapSubscriber;}(Subscriber);

var defaultThrottleConfig={leading:true,trailing:false};function throttle(durationSelector,config){if(config===void 0){config=defaultThrottleConfig;}return function(source){return source.lift(new ThrottleOperator(durationSelector,!!config.leading,!!config.trailing));};}var ThrottleOperator=/*@__PURE__*/function(){function ThrottleOperator(durationSelector,leading,trailing){this.durationSelector=durationSelector;this.leading=leading;this.trailing=trailing;}ThrottleOperator.prototype.call=function(subscriber,source){return source.subscribe(new ThrottleSubscriber(subscriber,this.durationSelector,this.leading,this.trailing));};return ThrottleOperator;}();var ThrottleSubscriber=/*@__PURE__*/function(_super){__extends(ThrottleSubscriber,_super);function ThrottleSubscriber(destination,durationSelector,_leading,_trailing){var _this=_super.call(this,destination)||this;_this.destination=destination;_this.durationSelector=durationSelector;_this._leading=_leading;_this._trailing=_trailing;_this._hasValue=false;return _this;}ThrottleSubscriber.prototype._next=function(value){this._hasValue=true;this._sendValue=value;if(!this._throttled){if(this._leading){this.send();}else {this.throttle(value);}}};ThrottleSubscriber.prototype.send=function(){var _a=this,_hasValue=_a._hasValue,_sendValue=_a._sendValue;if(_hasValue){this.destination.next(_sendValue);this.throttle(_sendValue);}this._hasValue=false;this._sendValue=undefined;};ThrottleSubscriber.prototype.throttle=function(value){var duration=this.tryDurationSelector(value);if(!!duration){this.add(this._throttled=innerSubscribe(duration,new SimpleInnerSubscriber(this)));}};ThrottleSubscriber.prototype.tryDurationSelector=function(value){try{return this.durationSelector(value);}catch(err){this.destination.error(err);return null;}};ThrottleSubscriber.prototype.throttlingDone=function(){var _a=this,_throttled=_a._throttled,_trailing=_a._trailing;if(_throttled){_throttled.unsubscribe();}this._throttled=undefined;if(_trailing){this.send();}};ThrottleSubscriber.prototype.notifyNext=function(){this.throttlingDone();};ThrottleSubscriber.prototype.notifyComplete=function(){this.throttlingDone();};return ThrottleSubscriber;}(SimpleOuterSubscriber);

function throttleTime(duration,scheduler,config){if(scheduler===void 0){scheduler=async;}if(config===void 0){config=defaultThrottleConfig;}return function(source){return source.lift(new ThrottleTimeOperator(duration,scheduler,config.leading,config.trailing));};}var ThrottleTimeOperator=/*@__PURE__*/function(){function ThrottleTimeOperator(duration,scheduler,leading,trailing){this.duration=duration;this.scheduler=scheduler;this.leading=leading;this.trailing=trailing;}ThrottleTimeOperator.prototype.call=function(subscriber,source){return source.subscribe(new ThrottleTimeSubscriber(subscriber,this.duration,this.scheduler,this.leading,this.trailing));};return ThrottleTimeOperator;}();var ThrottleTimeSubscriber=/*@__PURE__*/function(_super){__extends(ThrottleTimeSubscriber,_super);function ThrottleTimeSubscriber(destination,duration,scheduler,leading,trailing){var _this=_super.call(this,destination)||this;_this.duration=duration;_this.scheduler=scheduler;_this.leading=leading;_this.trailing=trailing;_this._hasTrailingValue=false;_this._trailingValue=null;return _this;}ThrottleTimeSubscriber.prototype._next=function(value){if(this.throttled){if(this.trailing){this._trailingValue=value;this._hasTrailingValue=true;}}else {this.add(this.throttled=this.scheduler.schedule(dispatchNext$3,this.duration,{subscriber:this}));if(this.leading){this.destination.next(value);}else if(this.trailing){this._trailingValue=value;this._hasTrailingValue=true;}}};ThrottleTimeSubscriber.prototype._complete=function(){if(this._hasTrailingValue){this.destination.next(this._trailingValue);this.destination.complete();}else {this.destination.complete();}};ThrottleTimeSubscriber.prototype.clearThrottle=function(){var throttled=this.throttled;if(throttled){if(this.trailing&&this._hasTrailingValue){this.destination.next(this._trailingValue);this._trailingValue=null;this._hasTrailingValue=false;}throttled.unsubscribe();this.remove(throttled);this.throttled=null;}};return ThrottleTimeSubscriber;}(Subscriber);function dispatchNext$3(arg){var subscriber=arg.subscriber;subscriber.clearThrottle();}

function timeInterval(scheduler){if(scheduler===void 0){scheduler=async;}return function(source){return defer(function(){return source.pipe(scan(function(_a,value){var current=_a.current;return {value:value,current:scheduler.now(),last:current};},{current:scheduler.now(),value:undefined,last:undefined}),map(function(_a){var current=_a.current,last=_a.last,value=_a.value;return new TimeInterval(value,current-last);}));});};}var TimeInterval=/*@__PURE__*/function(){function TimeInterval(value,interval){this.value=value;this.interval=interval;}return TimeInterval;}();

function timeoutWith(due,withObservable,scheduler){if(scheduler===void 0){scheduler=async;}return function(source){var absoluteTimeout=isDate(due);var waitFor=absoluteTimeout?+due-scheduler.now():Math.abs(due);return source.lift(new TimeoutWithOperator(waitFor,absoluteTimeout,withObservable,scheduler));};}var TimeoutWithOperator=/*@__PURE__*/function(){function TimeoutWithOperator(waitFor,absoluteTimeout,withObservable,scheduler){this.waitFor=waitFor;this.absoluteTimeout=absoluteTimeout;this.withObservable=withObservable;this.scheduler=scheduler;}TimeoutWithOperator.prototype.call=function(subscriber,source){return source.subscribe(new TimeoutWithSubscriber(subscriber,this.absoluteTimeout,this.waitFor,this.withObservable,this.scheduler));};return TimeoutWithOperator;}();var TimeoutWithSubscriber=/*@__PURE__*/function(_super){__extends(TimeoutWithSubscriber,_super);function TimeoutWithSubscriber(destination,absoluteTimeout,waitFor,withObservable,scheduler){var _this=_super.call(this,destination)||this;_this.absoluteTimeout=absoluteTimeout;_this.waitFor=waitFor;_this.withObservable=withObservable;_this.scheduler=scheduler;_this.scheduleTimeout();return _this;}TimeoutWithSubscriber.dispatchTimeout=function(subscriber){var withObservable=subscriber.withObservable;subscriber._unsubscribeAndRecycle();subscriber.add(innerSubscribe(withObservable,new SimpleInnerSubscriber(subscriber)));};TimeoutWithSubscriber.prototype.scheduleTimeout=function(){var action=this.action;if(action){this.action=action.schedule(this,this.waitFor);}else {this.add(this.action=this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout,this.waitFor,this));}};TimeoutWithSubscriber.prototype._next=function(value){if(!this.absoluteTimeout){this.scheduleTimeout();}_super.prototype._next.call(this,value);};TimeoutWithSubscriber.prototype._unsubscribe=function(){this.action=undefined;this.scheduler=null;this.withObservable=null;};return TimeoutWithSubscriber;}(SimpleOuterSubscriber);

function timeout(due,scheduler){if(scheduler===void 0){scheduler=async;}return timeoutWith(due,throwError(new TimeoutError()),scheduler);}

function timestamp(scheduler){if(scheduler===void 0){scheduler=async;}return map(function(value){return new Timestamp(value,scheduler.now());});}var Timestamp=/*@__PURE__*/function(){function Timestamp(value,timestamp){this.value=value;this.timestamp=timestamp;}return Timestamp;}();

function toArrayReducer(arr,item,index){if(index===0){return [item];}arr.push(item);return arr;}function toArray(){return reduce(toArrayReducer,[]);}

function window$1(windowBoundaries){return function windowOperatorFunction(source){return source.lift(new WindowOperator(windowBoundaries));};}var WindowOperator=/*@__PURE__*/function(){function WindowOperator(windowBoundaries){this.windowBoundaries=windowBoundaries;}WindowOperator.prototype.call=function(subscriber,source){var windowSubscriber=new WindowSubscriber(subscriber);var sourceSubscription=source.subscribe(windowSubscriber);if(!sourceSubscription.closed){windowSubscriber.add(innerSubscribe(this.windowBoundaries,new SimpleInnerSubscriber(windowSubscriber)));}return sourceSubscription;};return WindowOperator;}();var WindowSubscriber=/*@__PURE__*/function(_super){__extends(WindowSubscriber,_super);function WindowSubscriber(destination){var _this=_super.call(this,destination)||this;_this.window=new Subject();destination.next(_this.window);return _this;}WindowSubscriber.prototype.notifyNext=function(){this.openWindow();};WindowSubscriber.prototype.notifyError=function(error){this._error(error);};WindowSubscriber.prototype.notifyComplete=function(){this._complete();};WindowSubscriber.prototype._next=function(value){this.window.next(value);};WindowSubscriber.prototype._error=function(err){this.window.error(err);this.destination.error(err);};WindowSubscriber.prototype._complete=function(){this.window.complete();this.destination.complete();};WindowSubscriber.prototype._unsubscribe=function(){this.window=null;};WindowSubscriber.prototype.openWindow=function(){var prevWindow=this.window;if(prevWindow){prevWindow.complete();}var destination=this.destination;var newWindow=this.window=new Subject();destination.next(newWindow);};return WindowSubscriber;}(SimpleOuterSubscriber);

function windowCount(windowSize,startWindowEvery){if(startWindowEvery===void 0){startWindowEvery=0;}return function windowCountOperatorFunction(source){return source.lift(new WindowCountOperator(windowSize,startWindowEvery));};}var WindowCountOperator=/*@__PURE__*/function(){function WindowCountOperator(windowSize,startWindowEvery){this.windowSize=windowSize;this.startWindowEvery=startWindowEvery;}WindowCountOperator.prototype.call=function(subscriber,source){return source.subscribe(new WindowCountSubscriber(subscriber,this.windowSize,this.startWindowEvery));};return WindowCountOperator;}();var WindowCountSubscriber=/*@__PURE__*/function(_super){__extends(WindowCountSubscriber,_super);function WindowCountSubscriber(destination,windowSize,startWindowEvery){var _this=_super.call(this,destination)||this;_this.destination=destination;_this.windowSize=windowSize;_this.startWindowEvery=startWindowEvery;_this.windows=[new Subject()];_this.count=0;destination.next(_this.windows[0]);return _this;}WindowCountSubscriber.prototype._next=function(value){var startWindowEvery=this.startWindowEvery>0?this.startWindowEvery:this.windowSize;var destination=this.destination;var windowSize=this.windowSize;var windows=this.windows;var len=windows.length;for(var i=0;i<len&&!this.closed;i++){windows[i].next(value);}var c=this.count-windowSize+1;if(c>=0&&c%startWindowEvery===0&&!this.closed){windows.shift().complete();}if(++this.count%startWindowEvery===0&&!this.closed){var window_1=new Subject();windows.push(window_1);destination.next(window_1);}};WindowCountSubscriber.prototype._error=function(err){var windows=this.windows;if(windows){while(windows.length>0&&!this.closed){windows.shift().error(err);}}this.destination.error(err);};WindowCountSubscriber.prototype._complete=function(){var windows=this.windows;if(windows){while(windows.length>0&&!this.closed){windows.shift().complete();}}this.destination.complete();};WindowCountSubscriber.prototype._unsubscribe=function(){this.count=0;this.windows=null;};return WindowCountSubscriber;}(Subscriber);

function windowTime(windowTimeSpan){var scheduler=async;var windowCreationInterval=null;var maxWindowSize=Number.POSITIVE_INFINITY;if(isScheduler(arguments[3])){scheduler=arguments[3];}if(isScheduler(arguments[2])){scheduler=arguments[2];}else if(isNumeric(arguments[2])){maxWindowSize=Number(arguments[2]);}if(isScheduler(arguments[1])){scheduler=arguments[1];}else if(isNumeric(arguments[1])){windowCreationInterval=Number(arguments[1]);}return function windowTimeOperatorFunction(source){return source.lift(new WindowTimeOperator(windowTimeSpan,windowCreationInterval,maxWindowSize,scheduler));};}var WindowTimeOperator=/*@__PURE__*/function(){function WindowTimeOperator(windowTimeSpan,windowCreationInterval,maxWindowSize,scheduler){this.windowTimeSpan=windowTimeSpan;this.windowCreationInterval=windowCreationInterval;this.maxWindowSize=maxWindowSize;this.scheduler=scheduler;}WindowTimeOperator.prototype.call=function(subscriber,source){return source.subscribe(new WindowTimeSubscriber(subscriber,this.windowTimeSpan,this.windowCreationInterval,this.maxWindowSize,this.scheduler));};return WindowTimeOperator;}();var CountedSubject=/*@__PURE__*/function(_super){__extends(CountedSubject,_super);function CountedSubject(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this._numberOfNextedValues=0;return _this;}CountedSubject.prototype.next=function(value){this._numberOfNextedValues++;_super.prototype.next.call(this,value);};Object.defineProperty(CountedSubject.prototype,"numberOfNextedValues",{get:function(){return this._numberOfNextedValues;},enumerable:true,configurable:true});return CountedSubject;}(Subject);var WindowTimeSubscriber=/*@__PURE__*/function(_super){__extends(WindowTimeSubscriber,_super);function WindowTimeSubscriber(destination,windowTimeSpan,windowCreationInterval,maxWindowSize,scheduler){var _this=_super.call(this,destination)||this;_this.destination=destination;_this.windowTimeSpan=windowTimeSpan;_this.windowCreationInterval=windowCreationInterval;_this.maxWindowSize=maxWindowSize;_this.scheduler=scheduler;_this.windows=[];var window=_this.openWindow();if(windowCreationInterval!==null&&windowCreationInterval>=0){var closeState={subscriber:_this,window:window,context:null};var creationState={windowTimeSpan:windowTimeSpan,windowCreationInterval:windowCreationInterval,subscriber:_this,scheduler:scheduler};_this.add(scheduler.schedule(dispatchWindowClose,windowTimeSpan,closeState));_this.add(scheduler.schedule(dispatchWindowCreation,windowCreationInterval,creationState));}else {var timeSpanOnlyState={subscriber:_this,window:window,windowTimeSpan:windowTimeSpan};_this.add(scheduler.schedule(dispatchWindowTimeSpanOnly,windowTimeSpan,timeSpanOnlyState));}return _this;}WindowTimeSubscriber.prototype._next=function(value){var windows=this.windows;var len=windows.length;for(var i=0;i<len;i++){var window_1=windows[i];if(!window_1.closed){window_1.next(value);if(window_1.numberOfNextedValues>=this.maxWindowSize){this.closeWindow(window_1);}}}};WindowTimeSubscriber.prototype._error=function(err){var windows=this.windows;while(windows.length>0){windows.shift().error(err);}this.destination.error(err);};WindowTimeSubscriber.prototype._complete=function(){var windows=this.windows;while(windows.length>0){var window_2=windows.shift();if(!window_2.closed){window_2.complete();}}this.destination.complete();};WindowTimeSubscriber.prototype.openWindow=function(){var window=new CountedSubject();this.windows.push(window);var destination=this.destination;destination.next(window);return window;};WindowTimeSubscriber.prototype.closeWindow=function(window){window.complete();var windows=this.windows;windows.splice(windows.indexOf(window),1);};return WindowTimeSubscriber;}(Subscriber);function dispatchWindowTimeSpanOnly(state){var subscriber=state.subscriber,windowTimeSpan=state.windowTimeSpan,window=state.window;if(window){subscriber.closeWindow(window);}state.window=subscriber.openWindow();this.schedule(state,windowTimeSpan);}function dispatchWindowCreation(state){var windowTimeSpan=state.windowTimeSpan,subscriber=state.subscriber,scheduler=state.scheduler,windowCreationInterval=state.windowCreationInterval;var window=subscriber.openWindow();var action=this;var context={action:action,subscription:null};var timeSpanState={subscriber:subscriber,window:window,context:context};context.subscription=scheduler.schedule(dispatchWindowClose,windowTimeSpan,timeSpanState);action.add(context.subscription);action.schedule(state,windowCreationInterval);}function dispatchWindowClose(state){var subscriber=state.subscriber,window=state.window,context=state.context;if(context&&context.action&&context.subscription){context.action.remove(context.subscription);}subscriber.closeWindow(window);}

function windowToggle(openings,closingSelector){return function(source){return source.lift(new WindowToggleOperator(openings,closingSelector));};}var WindowToggleOperator=/*@__PURE__*/function(){function WindowToggleOperator(openings,closingSelector){this.openings=openings;this.closingSelector=closingSelector;}WindowToggleOperator.prototype.call=function(subscriber,source){return source.subscribe(new WindowToggleSubscriber(subscriber,this.openings,this.closingSelector));};return WindowToggleOperator;}();var WindowToggleSubscriber=/*@__PURE__*/function(_super){__extends(WindowToggleSubscriber,_super);function WindowToggleSubscriber(destination,openings,closingSelector){var _this=_super.call(this,destination)||this;_this.openings=openings;_this.closingSelector=closingSelector;_this.contexts=[];_this.add(_this.openSubscription=subscribeToResult(_this,openings,openings));return _this;}WindowToggleSubscriber.prototype._next=function(value){var contexts=this.contexts;if(contexts){var len=contexts.length;for(var i=0;i<len;i++){contexts[i].window.next(value);}}};WindowToggleSubscriber.prototype._error=function(err){var contexts=this.contexts;this.contexts=null;if(contexts){var len=contexts.length;var index=-1;while(++index<len){var context_1=contexts[index];context_1.window.error(err);context_1.subscription.unsubscribe();}}_super.prototype._error.call(this,err);};WindowToggleSubscriber.prototype._complete=function(){var contexts=this.contexts;this.contexts=null;if(contexts){var len=contexts.length;var index=-1;while(++index<len){var context_2=contexts[index];context_2.window.complete();context_2.subscription.unsubscribe();}}_super.prototype._complete.call(this);};WindowToggleSubscriber.prototype._unsubscribe=function(){var contexts=this.contexts;this.contexts=null;if(contexts){var len=contexts.length;var index=-1;while(++index<len){var context_3=contexts[index];context_3.window.unsubscribe();context_3.subscription.unsubscribe();}}};WindowToggleSubscriber.prototype.notifyNext=function(outerValue,innerValue,outerIndex,innerIndex,innerSub){if(outerValue===this.openings){var closingNotifier=void 0;try{var closingSelector=this.closingSelector;closingNotifier=closingSelector(innerValue);}catch(e){return this.error(e);}var window_1=new Subject();var subscription=new Subscription();var context_4={window:window_1,subscription:subscription};this.contexts.push(context_4);var innerSubscription=subscribeToResult(this,closingNotifier,context_4);if(innerSubscription.closed){this.closeWindow(this.contexts.length-1);}else {innerSubscription.context=context_4;subscription.add(innerSubscription);}this.destination.next(window_1);}else {this.closeWindow(this.contexts.indexOf(outerValue));}};WindowToggleSubscriber.prototype.notifyError=function(err){this.error(err);};WindowToggleSubscriber.prototype.notifyComplete=function(inner){if(inner!==this.openSubscription){this.closeWindow(this.contexts.indexOf(inner.context));}};WindowToggleSubscriber.prototype.closeWindow=function(index){if(index===-1){return;}var contexts=this.contexts;var context=contexts[index];var window=context.window,subscription=context.subscription;contexts.splice(index,1);window.complete();subscription.unsubscribe();};return WindowToggleSubscriber;}(OuterSubscriber);

function windowWhen(closingSelector){return function windowWhenOperatorFunction(source){return source.lift(new WindowOperator$1(closingSelector));};}var WindowOperator$1=/*@__PURE__*/function(){function WindowOperator(closingSelector){this.closingSelector=closingSelector;}WindowOperator.prototype.call=function(subscriber,source){return source.subscribe(new WindowSubscriber$1(subscriber,this.closingSelector));};return WindowOperator;}();var WindowSubscriber$1=/*@__PURE__*/function(_super){__extends(WindowSubscriber,_super);function WindowSubscriber(destination,closingSelector){var _this=_super.call(this,destination)||this;_this.destination=destination;_this.closingSelector=closingSelector;_this.openWindow();return _this;}WindowSubscriber.prototype.notifyNext=function(_outerValue,_innerValue,_outerIndex,_innerIndex,innerSub){this.openWindow(innerSub);};WindowSubscriber.prototype.notifyError=function(error){this._error(error);};WindowSubscriber.prototype.notifyComplete=function(innerSub){this.openWindow(innerSub);};WindowSubscriber.prototype._next=function(value){this.window.next(value);};WindowSubscriber.prototype._error=function(err){this.window.error(err);this.destination.error(err);this.unsubscribeClosingNotification();};WindowSubscriber.prototype._complete=function(){this.window.complete();this.destination.complete();this.unsubscribeClosingNotification();};WindowSubscriber.prototype.unsubscribeClosingNotification=function(){if(this.closingNotification){this.closingNotification.unsubscribe();}};WindowSubscriber.prototype.openWindow=function(innerSub){if(innerSub===void 0){innerSub=null;}if(innerSub){this.remove(innerSub);innerSub.unsubscribe();}var prevWindow=this.window;if(prevWindow){prevWindow.complete();}var window=this.window=new Subject();this.destination.next(window);var closingNotifier;try{var closingSelector=this.closingSelector;closingNotifier=closingSelector();}catch(e){this.destination.error(e);this.window.error(e);return;}this.add(this.closingNotification=subscribeToResult(this,closingNotifier));};return WindowSubscriber;}(OuterSubscriber);

function withLatestFrom(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}return function(source){var project;if(typeof args[args.length-1]==='function'){project=args.pop();}var observables=args;return source.lift(new WithLatestFromOperator(observables,project));};}var WithLatestFromOperator=/*@__PURE__*/function(){function WithLatestFromOperator(observables,project){this.observables=observables;this.project=project;}WithLatestFromOperator.prototype.call=function(subscriber,source){return source.subscribe(new WithLatestFromSubscriber(subscriber,this.observables,this.project));};return WithLatestFromOperator;}();var WithLatestFromSubscriber=/*@__PURE__*/function(_super){__extends(WithLatestFromSubscriber,_super);function WithLatestFromSubscriber(destination,observables,project){var _this=_super.call(this,destination)||this;_this.observables=observables;_this.project=project;_this.toRespond=[];var len=observables.length;_this.values=new Array(len);for(var i=0;i<len;i++){_this.toRespond.push(i);}for(var i=0;i<len;i++){var observable=observables[i];_this.add(subscribeToResult(_this,observable,undefined,i));}return _this;}WithLatestFromSubscriber.prototype.notifyNext=function(_outerValue,innerValue,outerIndex){this.values[outerIndex]=innerValue;var toRespond=this.toRespond;if(toRespond.length>0){var found=toRespond.indexOf(outerIndex);if(found!==-1){toRespond.splice(found,1);}}};WithLatestFromSubscriber.prototype.notifyComplete=function(){};WithLatestFromSubscriber.prototype._next=function(value){if(this.toRespond.length===0){var args=[value].concat(this.values);if(this.project){this._tryProject(args);}else {this.destination.next(args);}}};WithLatestFromSubscriber.prototype._tryProject=function(args){var result;try{result=this.project.apply(this,args);}catch(err){this.destination.error(err);return;}this.destination.next(result);};return WithLatestFromSubscriber;}(OuterSubscriber);

function zip$1(){var observables=[];for(var _i=0;_i<arguments.length;_i++){observables[_i]=arguments[_i];}return function zipOperatorFunction(source){return source.lift.call(zip.apply(void 0,[source].concat(observables)));};}

function zipAll(project){return function(source){return source.lift(new ZipOperator(project));};}

var keyHasType=function keyHasType(type,key){return type===key||typeof key==='function'&&type===key.toString();};var ofType=function ofType(){for(var _len=arguments.length,keys=Array(_len),_key=0;_key<_len;_key++){keys[_key]=arguments[_key];}return function(source){return source.pipe(filter(function(_ref){var type=_ref.type;var len=keys.length;if(len===1){return keyHasType(type,keys[0]);}else {for(var i=0;i<len;i++){if(keyHasType(type,keys[i])){return true;}}}return false;}));};};

var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ActionsObservable=function(_Observable){_inherits(ActionsObservable,_Observable);_createClass(ActionsObservable,null,[{key:'of',value:function of$1(){return new this(of.apply(undefined,arguments));}},{key:'from',value:function from$1(actions,scheduler){return new this(from(actions,scheduler));}}]);function ActionsObservable(actionsSubject){_classCallCheck(this,ActionsObservable);var _this=_possibleConstructorReturn(this,(ActionsObservable.__proto__||Object.getPrototypeOf(ActionsObservable)).call(this));_this.source=actionsSubject;return _this;}_createClass(ActionsObservable,[{key:'lift',value:function lift(operator){var observable=new ActionsObservable(this);observable.operator=operator;return observable;}},{key:'ofType',value:function ofType$1(){return ofType.apply(undefined,arguments)(this);}}]);return ActionsObservable;}(Observable);

function _classCallCheck$1(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn$1(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits$1(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var StateObservable=function(_Observable){_inherits$1(StateObservable,_Observable);function StateObservable(stateSubject,initialState){_classCallCheck$1(this,StateObservable);var _this=_possibleConstructorReturn$1(this,(StateObservable.__proto__||Object.getPrototypeOf(StateObservable)).call(this,function(subscriber){var subscription=_this.__notifier.subscribe(subscriber);if(subscription&&!subscription.closed){subscriber.next(_this.value);}return subscription;}));_this.value=initialState;_this.__notifier=new Subject();_this.__subscription=stateSubject.subscribe(function(value){// We only want to update state$ if it has actually changed since
// redux requires reducers use immutability patterns.
// This is basically what distinctUntilChanged() does but it's so simple
// we don't need to pull that code in
if(value!==_this.value){_this.value=value;_this.__notifier.next(value);}});return _this;}return StateObservable;}(Observable);

var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var deprecationsSeen={};var resetDeprecationsSeen=function resetDeprecationsSeen(){deprecationsSeen={};};var consoleWarn=(typeof console==='undefined'?'undefined':_typeof(console))==='object'&&typeof console.warn==='function'?function(){var _console;return (_console=console).warn.apply(_console,arguments);}:function(){};var deprecate=function deprecate(msg){if(!deprecationsSeen[msg]){deprecationsSeen[msg]=true;consoleWarn('redux-observable | DEPRECATION: '+msg);}};var warn=function warn(msg){consoleWarn('redux-observable | WARNING: '+msg);};

function createEpicMiddleware(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};// This isn't great. RxJS doesn't publicly export the constructor for
// QueueScheduler nor QueueAction, so we reach in. We need to do this because
// we don't want our internal queuing mechanism to be on the same queue as any
// other RxJS code outside of redux-observable internals.
var QueueScheduler=queueScheduler.constructor;var uniqueQueueScheduler=new QueueScheduler(queueScheduler.SchedulerAction);if(process.env.NODE_ENV!=='production'&&typeof options==='function'){throw new TypeError('Providing your root Epic to `createEpicMiddleware(rootEpic)` is no longer supported, instead use `epicMiddleware.run(rootEpic)`\n\nLearn more: https://redux-observable.js.org/MIGRATION.html#setting-up-the-middleware');}var epic$=new Subject();var store=void 0;var epicMiddleware=function epicMiddleware(_store){if(process.env.NODE_ENV!=='production'&&store){// https://github.com/redux-observable/redux-observable/issues/389
warn('this middleware is already associated with a store. createEpicMiddleware should be called for every store.\n\nLearn more: https://goo.gl/2GQ7Da');}store=_store;var actionSubject$=new Subject().pipe(observeOn(uniqueQueueScheduler));var stateSubject$=new Subject().pipe(observeOn(uniqueQueueScheduler));var action$=new ActionsObservable(actionSubject$);var state$=new StateObservable(stateSubject$,store.getState());var result$=epic$.pipe(map(function(epic){var output$='dependencies'in options?epic(action$,state$,options.dependencies):epic(action$,state$);if(!output$){throw new TypeError('Your root Epic "'+(epic.name||'<anonymous>')+'" does not return a stream. Double check you\'re not missing a return statement!');}return output$;}),mergeMap(function(output$){return from(output$).pipe(subscribeOn(uniqueQueueScheduler),observeOn(uniqueQueueScheduler));}));result$.subscribe(store.dispatch);return function(next){return function(action){// Downstream middleware gets the action first,
// which includes their reducers, so state is
// updated before epics receive the action
var result=next(action);// It's important to update the state$ before we emit
// the action because otherwise it would be stale
stateSubject$.next(store.getState());actionSubject$.next(action);return result;};};};epicMiddleware.run=function(rootEpic){if(process.env.NODE_ENV!=='production'&&!store){warn('epicMiddleware.run(rootEpic) called before the middleware has been setup by redux. Provide the epicMiddleware instance to createStore() first.');}epic$.next(rootEpic);};return epicMiddleware;}

function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}/**
  Merges all epics into a single one.
 */var combineEpics=function combineEpics(){for(var _len=arguments.length,epics=Array(_len),_key=0;_key<_len;_key++){epics[_key]=arguments[_key];}var merger=function merger(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}return merge.apply(undefined,_toConsumableArray(epics.map(function(epic){var output$=epic.apply(undefined,args);if(!output$){throw new TypeError('combineEpics: one of the provided Epics "'+(epic.name||'<anonymous>')+'" does not return a stream. Double check you\'re not missing a return statement!');}return output$;})));};// Technically the `name` property on Function's are supposed to be read-only.
// While some JS runtimes allow it anyway (so this is useful in debugging)
// some actually throw an exception when you attempt to do so.
try{Object.defineProperty(merger,'name',{value:'combineEpics('+epics.map(function(epic){return epic.name||'<anonymous>';}).join(', ')+')'});}catch(e){}return merger;};

function defaultEqualityCheck(a,b){return a===b;}function areArgumentsShallowlyEqual(equalityCheck,prev,next){if(prev===null||next===null||prev.length!==next.length){return false;}// Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
var length=prev.length;for(var i=0;i<length;i++){if(!equalityCheck(prev[i],next[i])){return false;}}return true;}function defaultMemoize(func){var equalityCheck=arguments.length>1&&arguments[1]!==undefined?arguments[1]:defaultEqualityCheck;var lastArgs=null;var lastResult=null;// we reference arguments instead of spreading them for performance reasons
return function(){if(!areArgumentsShallowlyEqual(equalityCheck,lastArgs,arguments)){// apply arguments instead of spreading for performance.
lastResult=func.apply(null,arguments);}lastArgs=arguments;return lastResult;};}function getDependencies(funcs){var dependencies=Array.isArray(funcs[0])?funcs[0]:funcs;if(!dependencies.every(function(dep){return typeof dep==='function';})){var dependencyTypes=dependencies.map(function(dep){return typeof dep;}).join(', ');throw new Error('Selector creators expect all input-selectors to be functions, '+('instead received the following types: ['+dependencyTypes+']'));}return dependencies;}function createSelectorCreator(memoize){for(var _len=arguments.length,memoizeOptions=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){memoizeOptions[_key-1]=arguments[_key];}return function(){for(var _len2=arguments.length,funcs=Array(_len2),_key2=0;_key2<_len2;_key2++){funcs[_key2]=arguments[_key2];}var recomputations=0;var resultFunc=funcs.pop();var dependencies=getDependencies(funcs);var memoizedResultFunc=memoize.apply(undefined,[function(){recomputations++;// apply arguments instead of spreading for performance.
return resultFunc.apply(null,arguments);}].concat(memoizeOptions));// If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
var selector=memoize(function(){var params=[];var length=dependencies.length;for(var i=0;i<length;i++){// apply arguments instead of spreading and mutate a local list of params for performance.
params.push(dependencies[i].apply(null,arguments));}// apply arguments instead of spreading for performance.
return memoizedResultFunc.apply(null,params);});selector.resultFunc=resultFunc;selector.dependencies=dependencies;selector.recomputations=function(){return recomputations;};selector.resetRecomputations=function(){return recomputations=0;};return selector;};}var createSelector=createSelectorCreator(defaultMemoize);function createStructuredSelector(selectors){var selectorCreator=arguments.length>1&&arguments[1]!==undefined?arguments[1]:createSelector;if(typeof selectors!=='object'){throw new Error('createStructuredSelector expects first argument to be an object '+('where each property is a selector, instead received a '+typeof selectors));}var objectKeys=Object.keys(selectors);return selectorCreator(objectKeys.map(function(key){return selectors[key];}),function(){for(var _len3=arguments.length,values=Array(_len3),_key3=0;_key3<_len3;_key3++){values[_key3]=arguments[_key3];}return values.reduce(function(composition,value,index){composition[objectKeys[index]]=value;return composition;},{});});}

const SHOW_MODAL = '[MODAL] SHOW';
const CLOSE_MODAL = '[MODAL] CLOSE';
const MODAL_ACTION = '[MODAL] ACTION';
const initialState = {
    open: false,
};
const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                data: action.data,
                open: true,
            };
        case CLOSE_MODAL:
        case MODAL_ACTION:
            return {
                ...state,
                open: false,
                data: undefined,
            };
        default:
            return state;
    }
};
class ShowModal {
    constructor(data) {
        this.data = data;
        this.type = SHOW_MODAL;
    }
}
class CloseModal {
    constructor() {
        this.action = 'close';
        this.data = {};
        this.type = CLOSE_MODAL;
    }
}
class ModalAction {
    constructor(action, data) {
        this.action = action;
        this.data = data;
        this.type = MODAL_ACTION;
    }
}
const modalSelector = (state) => state.modal;
const getModalData = createSelector(modalSelector, modal => { var _a; return (_a = modal.data) !== null && _a !== void 0 ? _a : null; });
const getActionButtons = createSelector(getModalData, modalData => { var _a; return (_a = modalData === null || modalData === void 0 ? void 0 : modalData.modalButtons) !== null && _a !== void 0 ? _a : []; });

const rootReducer = combineReducers({
    modal: modalReducer,
});

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
class IframeHelper {
    static getContentIframe() {
        const iframeElement = top.document.getElementById('typo3-contentIframe');
        return iframeElement
            ? iframeElement.contentWindow
            : null;
    }
    static getModalIframe() {
        const iframeElements = top.document.getElementsByClassName('modal-iframe');
        return iframeElements.length > 0
            ? iframeElements.item(0).contentWindow
            : null;
    }
}

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
const MODAL_CLOSED_MESSAGE_TYPE = 'typo3-modal-closed';
class CloseModalMessage {
    constructor(actionName, actionData) {
        this.actionName = actionName;
        this.actionData = actionData;
        this.type = MODAL_CLOSED_MESSAGE_TYPE;
    }
}

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
class MessageHandler {
    static sendPostMessage(targets, message) {
        targets
            .filter(target => null !== target)
            .map(target => target)
            .forEach(target => target.postMessage(message, target.origin));
    }
}

const closeModal = (action$) => {
    return action$.ofType(CLOSE_MODAL, MODAL_ACTION).pipe(tap(action => {
        const messageData = new CloseModalMessage(action.action, action.data);
        MessageHandler.sendPostMessage([IframeHelper.getContentIframe(), IframeHelper.getModalIframe()], messageData);
    }), ignoreElements());
};

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
const SHOW_SNACKBAR = '[SNACKBAR] SHOW';
const SNACKBAR_ACTION = '[SNACKBAR] ACTION';
class ShowSnackbar {
    constructor(data) {
        this.data = data;
        this.type = SHOW_SNACKBAR;
    }
}
class SnackbarAction {
    constructor(action, data) {
        this.action = action;
        this.data = data;
        this.type = SNACKBAR_ACTION;
    }
}

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
const SNACKBAR_ACTION_MESSAGE_TYPE = 'typo3-snackbar-action';
class SnackbarActionMessage {
    constructor(actionName, actionData) {
        this.actionName = actionName;
        this.actionData = actionData;
        this.type = SNACKBAR_ACTION_MESSAGE_TYPE;
    }
}

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
class AbstractAction {
}
class ImmediateAction extends AbstractAction {
    constructor(callback) {
        super();
        this.callback = callback;
        this.callback = callback;
    }
    execute() {
        return this.executeCallback();
    }
    async executeCallback() {
        return Promise.resolve(this.callback());
    }
}

const snackbarAction = (action$) => {
    return action$.ofType(SNACKBAR_ACTION).pipe(tap(action => {
        const messageData = new SnackbarActionMessage(action.action, action.data);
        MessageHandler.sendPostMessage([IframeHelper.getContentIframe(), IframeHelper.getModalIframe()], messageData);
    }), ignoreElements());
};
const showSnackbar = (action$) => {
    return action$.ofType(SHOW_SNACKBAR).pipe(tap(action => {
        var _a;
        const notificationButtons = ((_a = action.data.buttons) !== null && _a !== void 0 ? _a : []).map(button => {
            const callback = () => {
                store.dispatch(new SnackbarAction(button.action, button));
            };
            return {
                label: button.label,
                action: new ImmediateAction(callback),
            };
        });
        // @ts-ignore
        window.TYPO3.Notification.showMessage(action.data.title, action.data.message, action.data.severity, action.data.duration, notificationButtons);
    }), ignoreElements());
};
const snackbarActions = [showSnackbar, snackbarAction];

const rootEpic = combineEpics(closeModal, ...snackbarActions);

const allowCustomActionObjectsMiddleWare = () => next => (action) => {
    next({ ...action });
};
const epicMiddleware = createEpicMiddleware();
const enhancer = [];
if (process.env.NODE_ENV === 'development' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enhancer.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = createStore(rootReducer, compose(applyMiddleware(allowCustomActionObjectsMiddleWare, epicMiddleware), ...enhancer));
epicMiddleware.run(rootEpic);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
const SHOW_MODAL_MESSAGE_TYPE = 'typo3-show-modal';

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var ModalType;
(function (ModalType) {
    ModalType["CONFIRM"] = "confirm";
    ModalType["HTML"] = "html";
})(ModalType || (ModalType = {}));

// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues=new WeakMap();/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */const unsafeHTML=directive(value=>part=>{if(!(part instanceof NodePart)){throw new Error('unsafeHTML can only be used in text bindings');}const previousValue=previousValues.get(part);if(previousValue!==undefined&&isPrimitive(value)&&value===previousValue.value&&part.value===previousValue.fragment){return;}const template=document.createElement('template');template.innerHTML=value;// innerHTML casts to string internally
const fragment=document.importNode(template.content,true);part.setValue(fragment);previousValues.set(part,{value,fragment});});

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
const SHOW_SNACKBAR_MESSAGE_TYPE = 'typo3-show-snackbar';
class ShowSnackbarMessage {
    constructor(data) {
        this.data = data;
        this.type = SHOW_SNACKBAR_MESSAGE_TYPE;
    }
}

let Typo3TopContainer = class Typo3TopContainer extends connect(store)(LitElement) {
    constructor() {
        super(...arguments);
        this._handlePostMessage = (event) => {
            switch (event.data.type) {
                case SHOW_MODAL_MESSAGE_TYPE:
                    store.dispatch(new ShowModal(event.data.data));
                    break;
                case SHOW_SNACKBAR_MESSAGE_TYPE:
                    store.dispatch(new ShowSnackbar(event.data.data));
                    break;
            }
        };
    }
    createRenderRoot() {
        return this;
    }
    stateChanged(state) {
        this.state = state;
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('message', this._handlePostMessage);
    }
    disconnectedCallback() {
        window.removeEventListener('message', this._handlePostMessage);
        super.disconnectedCallback();
    }
    _onModalClose() {
        store.dispatch(new CloseModal());
    }
    _onModalAction(action) {
        var _a;
        const obj = {};
        if ((_a = getModalData(this.state)) === null || _a === void 0 ? void 0 : _a.isForm) {
            const formElement = this.modal.querySelector('form');
            const formData = new FormData(formElement);
            formData.forEach((value, key) => (obj[key] = value));
        }
        store.dispatch(new ModalAction(action, obj));
    }
    render() {
        var _a, _b, _c;
        return html `<typo3-modal ?open="${this.state.modal.open}" @typo3-modal-close="${this._onModalClose}" headline="${(_a = this.state.modal.data) === null || _a === void 0 ? void 0 : _a.headline}" variant="${(_b = this.state.modal.data) === null || _b === void 0 ? void 0 : _b.variant}" ?dismissible="${(_c = this.state.modal.data) === null || _c === void 0 ? void 0 : _c.dismissible}">${this.renderModalContent} ${this.renderModalButtons}</typo3-modal>`;
    }
    get renderModalContent() {
        const modalData = getModalData(this.state);
        switch (modalData === null || modalData === void 0 ? void 0 : modalData.type) {
            case ModalType.HTML:
                return html `${unsafeHTML(modalData === null || modalData === void 0 ? void 0 : modalData.content)}`;
            case ModalType.CONFIRM:
                return html `<p>${modalData === null || modalData === void 0 ? void 0 : modalData.content}</p>`;
            default:
                return html ``;
        }
    }
    get renderModalButtons() {
        return getActionButtons(this.state).map(buttonData => {
            return html `<typo3-button slot="footer" color="${buttonData.color}" @click="${() => this._onModalAction(buttonData.action)}">${buttonData.label}</typo3-button>`;
        });
    }
};
__decorate([
    internalProperty()
], Typo3TopContainer.prototype, "state", void 0);
__decorate([
    query('typo3-modal')
], Typo3TopContainer.prototype, "modal", void 0);
Typo3TopContainer = __decorate([
    customElement('typo3-top-container')
], Typo3TopContainer);

var css_248z = css`:host{display:block}#alert{display:flex;padding:var(--typo3-alert-padding-y,.75rem) var(--typo3-alert-padding-y,1.25rem);margin-bottom:var(--typo3-alert-margin-bottom,1rem);border:var(--typo3-global-alert-border-width) solid transparent;border-radius:var(--typo3-global-alert-border-radius);align-items:center}#message{flex:1}#btn-close{font-size:var(--typo3-alert-close-btn-font-size,var(--typo3-global-close-btn-font-size));font-weight:var(--typo3-alert-close-btn-font-weight,var(--typo3-global-close-btn-font-weight));line-height:var(--typo3-alert-close-btn-line-height,var(--typo3-global-close-btn-line-height));color:var(--typo3-alert-close-btn-color,var(--typo3-global-close-btn-color));opacity:var(--typo3-alert-close-btn-color,.5);text-shadow:0 1px 0 #fff;background-color:transparent;border:none;cursor:pointer;:hover{text-decoration:none;opacity:var(--typo3-alert-close-btn-color-hover,.75)}}:host([color=success]) #alert{color:var(--typo3-alert-success-color,var(--typo3-global-alert-success-color));background-color:var(--typo3-alert-success-background-color,var(--typo3-global-alert-success-bg));border-color:var(--typo3-alert-success-border-color,var(--typo3-global-alert-success-border))}:host([color=info]) #alert{color:var(--typo3-alert-info-color,var(--typo3-global-alert-info-color));background-color:var(--typo3-alert-info-background-color,var(--typo3-global-alert-info-bg));border-color:var(--typo3-alert-info-border-color,var(--typo3-global-alert-info-border))}:host([color=warning]) #alert{color:var(--typo3-alert-warning-color,var(--typo3-global-alert-warning-color));background-color:var(--typo3-alert-warning-background-color,var(--typo3-global-alert-warning-bg));border-color:var(--typo3-alert-warning-border-color,var(--typo3-global-alert-warning-border))}:host([color=danger]) #alert{color:var(--typo3-alert-danger-color,var(--typo3-global-alert-danger-color));background-color:var(--typo3-alert-danger-background-color,var(--typo3-global-alert-danger-bg));border-color:var(--typo3-alert-danger-border-color,var(--typo3-global-alert-danger-border))}`;
var stylesheet=":host{display:block}#alert{display:flex;padding:var(--typo3-alert-padding-y,.75rem) var(--typo3-alert-padding-y,1.25rem);margin-bottom:var(--typo3-alert-margin-bottom,1rem);border:var(--typo3-global-alert-border-width) solid transparent;border-radius:var(--typo3-global-alert-border-radius);align-items:center}#message{flex:1}#btn-close{font-size:var(--typo3-alert-close-btn-font-size,var(--typo3-global-close-btn-font-size));font-weight:var(--typo3-alert-close-btn-font-weight,var(--typo3-global-close-btn-font-weight));line-height:var(--typo3-alert-close-btn-line-height,var(--typo3-global-close-btn-line-height));color:var(--typo3-alert-close-btn-color,var(--typo3-global-close-btn-color));opacity:var(--typo3-alert-close-btn-color,.5);text-shadow:0 1px 0 #fff;background-color:transparent;border:none;cursor:pointer;:hover{text-decoration:none;opacity:var(--typo3-alert-close-btn-color-hover,.75)}}:host([color=success]) #alert{color:var(--typo3-alert-success-color,var(--typo3-global-alert-success-color));background-color:var(--typo3-alert-success-background-color,var(--typo3-global-alert-success-bg));border-color:var(--typo3-alert-success-border-color,var(--typo3-global-alert-success-border))}:host([color=info]) #alert{color:var(--typo3-alert-info-color,var(--typo3-global-alert-info-color));background-color:var(--typo3-alert-info-background-color,var(--typo3-global-alert-info-bg));border-color:var(--typo3-alert-info-border-color,var(--typo3-global-alert-info-border))}:host([color=warning]) #alert{color:var(--typo3-alert-warning-color,var(--typo3-global-alert-warning-color));background-color:var(--typo3-alert-warning-background-color,var(--typo3-global-alert-warning-bg));border-color:var(--typo3-alert-warning-border-color,var(--typo3-global-alert-warning-border))}:host([color=danger]) #alert{color:var(--typo3-alert-danger-color,var(--typo3-global-alert-danger-color));background-color:var(--typo3-alert-danger-background-color,var(--typo3-global-alert-danger-bg));border-color:var(--typo3-alert-danger-border-color,var(--typo3-global-alert-danger-border))}";

var css_248z$1 = css`:host{--typo3-global-font-family-base:Verdana,Arial,Helvetica,sans-serif;--typo3-global-font-size-default:0.75rem;--typo3-global-font-weight-medium:700;--typo3-global-gray-base:#000;--typo3-global-gray-darker:#222;--typo3-global-gray-dark:#333;--typo3-global-gray:#555;--typo3-global-gray-light:#777;--typo3-global-gray-lighter:#eee;--typo3-global-brand-primary:#0078e6;--typo3-global-brand-primary-text-color:#fff;--typo3-global-brand-primary-hover:#005db3;--typo3-global-brand-primary-border-color:#006bcc;--typo3-global-brand-primary-border-color-active:#004b8f;--typo3-global-brand-primary-border-color-hover:#004b8f;--typo3-global-brand-secondary:#6c757d;--typo3-global-brand-secondary-text-color:#fff;--typo3-global-brand-secondary-hover:#545b62;--typo3-global-brand-secondary-border-color:var(--typo3-global-brand-secondary);--typo3-global-brand-secondary-border-color-active:#50565c;--typo3-global-brand-secondary-border-color-hover:#50565c;--typo3-global-brand-warning:#e8a33d;--typo3-global-brand-warning-text-color:#fff;--typo3-global-brand-warning-hover:#d88b1a;--typo3-global-brand-warning-border-color:#e59826;--typo3-global-brand-warning-border-color-active:#b87716;--typo3-global-brand-warning-border-color-hover:#b87716;--typo3-global-brand-success:#79a548;--typo3-global-brand-success-text-color:#fff;--typo3-global-brand-success-hover:#5f8139;--typo3-global-brand-success-border-color-hover:#4d682d;--typo3-global-brand-success-border-color-active:#8bb759;--typo3-global-brand-success-border-color:#6c9340;--typo3-global-brand-danger:#c83c3c;--typo3-global-brand-danger-text-color:#fff;--typo3-global-brand-danger-hover:#a32e2e;--typo3-global-brand-danger-border-color:#b73434;--typo3-global-brand-danger-border-color-active:#872626;--typo3-global-brand-danger-border-color-hover:#872626;--typo3-global-brand-info:#6daae0;--typo3-global-brand-info-text-color:#fff;--typo3-global-brand-info-hover:#4391d7;--typo3-global-brand-info-border-color:#589edc;--typo3-global-brand-info-border-color-active:#2b80cc;--typo3-global-brand-info-border-color-hover:#2b80cc;--typo3-global-brand-default-text-color:var(--typo3-global-gray-dark);--typo3-global-brand-default:var(--typo3-global-gray-lighter);--typo3-global-brand-default-hover:#d4d4d4;--typo3-global-brand-default-border-color:#bbb;--typo3-global-brand-default-border-color-hover:#9c9c9c;--typo3-global-brand-default-border-color-active:#9c9c9c;--typo3-global-default-border-radius:0.125rem;--typo3-global-default-border-width:0.0625rem;--typo3-global-animation-duration:0.5s;--typo3-global-default-gap:0.25rem;--typo3-global-btn-border-radius:var(--typo3-global-default-border-color-radius);--typo3-global-btn-font-size:var(--typo3-global-font-size-default);--typo3-global-btn-line-height:1.4;--typo3-global-btn-padding:0.375rem;--typo3-global-btn-border-width:var(--typo3-global-default-border-width);--typo3-global-btn-icon-size:1rem;--typo3-global-btn-disabled-opacity:0.65;--typo3-global-close-btn-font-size:1.3125rem;--typo3-global-close-btn-font-weight:var(--typo3-global-font-weight-medium);--typo3-global-close-btn-line-height:0.75;--typo3-global-close-btn-color:#000;--typo3-global-close-btn-opacity:0.5;--typo3-global-badge-padding:0.25em 0.4em;--typo3-global-badge-font-weight:500;--typo3-global-badge-border-radius:50%;--typo3-global-badge-size:1.375rem;--typo3-global-badge-font-size:var(--typo3-global-font-size-default);--typo3-global-badge-default-color:var(--typo3-global-brand-default-text-color);--typo3-global-badge-default-bg:var(--typo3-global-brand-default);--typo3-global-badge-primary-color:var(--typo3-global-brand-primary-text-color);--typo3-global-badge-primary-bg:var(--typo3-global-brand-primary);--typo3-global-badge-success-color:var(--typo3-global-brand-success-text-color);--typo3-global-badge-success-bg:var(--typo3-global-brand-success);--typo3-global-badge-info-color:var(--typo3-global-brand-info-text-color);--typo3-global-badge-info-bg:var(--typo3-global-brand-info);--typo3-global-badge-warning-color:var(--typo3-global-brand-warning-text-color);--typo3-global-badge-warning-bg:var(--typo3-global-brand-warning);--typo3-global-badge-danger-color:var(--typo3-global-brand-danger-text-color);--typo3-global-badge-danger-bg:var(--typo3-global-brand-danger);--typo3-global-splitpane-splitter-bg:var(--typo3-global-gray-lighter);--typo3-global-splitpane-splitter-size:var(--typo3-global-default-border-width);--typo3-global-splitpane-handle-width:0.125rem;--typo3-global-splitpane-handle-height:1.5rem;--typo3-global-tooltip-font-size:var(--typo3-global-font-size-default);--typo3-global-tooltip-line-height:1;--typo3-global-tooltip-bg:var(--typo3-global-gray-dark);--typo3-global-tooltip-color:#fff;--typo3-global-tooltip-padding:0.5rem;--typo3-global-tooltip-border-radius:var(--typo3-global-default-border-radius);--typo3-global-tooltip-max-width:15rem;--typo3-global-tooltip-transition:opacity var(--typo3-global-animation-duration) ease-in-out;--typo3-global-alert-border-radius:var(--typo3-global-default-border-radius);--typo3-global-alert-border-width:var(--typo3-global-default-border-width);--typo3-global-alert-success-color:#3c763d;--typo3-global-alert-success-bg:#dff0d8;--typo3-global-alert-success-border:transparent;--typo3-global-alert-info-color:#31708f;--typo3-global-alert-info-bg:#d9edf7;--typo3-global-alert-info-border:transparent;--typo3-global-alert-warning-color:#8a6d3b;--typo3-global-alert-warning-bg:#fcf8e3;--typo3-global-alert-warning-border:transparent;--typo3-global-alert-danger-color:#a94442;--typo3-global-alert-danger-bg:#f2dede;--typo3-global-alert-danger-border:transparent;--typo3-global-modal-bg:#fff;--typo3-global-modal-font-size:var(--typo3-global-font-size-default);--typo3-global-modal-padding:.625rem 1rem;--typo3-global-modal-border-color:rgba(0,0,0,0.2);--typo3-global-modal-border-width:var(--typo3-global-default-border-width);--typo3-global-modal-border-radius:var(--typo3-global-default-border-radius);--typo3-global-modal-close-btn-font-size:0.625rem;--typo3-global-modal-close-btn-line-height:1.2rem;--typo3-global-modal-close-btn-color:#000;--typo3-global-modal-close-btn-opacity:0.5;--typo3-global-list-item-icon-size:var(--typo3-global-btn-icon-size);--typo3-global-list-item-padding-x:1rem;--typo3-global-list-item-padding-y:0.25rem;--typo3-global-list-item-icon-gap:var(--typo3-global-default-gap);--typo3-global-list-item-color:rgba(0,0,0,0.87);--typo3-global-list-item-bg-hover:#f8f9fa;--typo3-global-list-item-color-hover:#16181b;--typo3-global-datagrid-border-color:var(--typo3-global-gray-lighter);--typo3-global-datagrid-cell-color:var(--typo3-global-gray-dark);--typo3-global-datagrid-order-arrow-color:var(--typo3-global-gray);--typo3-global-datagrid-font:12px Verdana;--typo3-global-datagrid-cell-height:30;--typo3-global-datagrid-cell-border-width:1;--typo3-global-breadcrumb-item-color:var(--typo3-global-brand-secondary);--typo3-global-breadcrumb-item-color-active:rgba(0,0,0,0.87);font-family:var(--typo3-theme--typo3-global-font-family,var(--typo3-global-font-family-base));font-size:var(--typo3-global-font-size-default)}`;
var stylesheet$1=":host{--typo3-global-font-family-base:Verdana,Arial,Helvetica,sans-serif;--typo3-global-font-size-default:0.75rem;--typo3-global-font-weight-medium:700;--typo3-global-gray-base:#000;--typo3-global-gray-darker:#222;--typo3-global-gray-dark:#333;--typo3-global-gray:#555;--typo3-global-gray-light:#777;--typo3-global-gray-lighter:#eee;--typo3-global-brand-primary:#0078e6;--typo3-global-brand-primary-text-color:#fff;--typo3-global-brand-primary-hover:#005db3;--typo3-global-brand-primary-border-color:#006bcc;--typo3-global-brand-primary-border-color-active:#004b8f;--typo3-global-brand-primary-border-color-hover:#004b8f;--typo3-global-brand-secondary:#6c757d;--typo3-global-brand-secondary-text-color:#fff;--typo3-global-brand-secondary-hover:#545b62;--typo3-global-brand-secondary-border-color:var(--typo3-global-brand-secondary);--typo3-global-brand-secondary-border-color-active:#50565c;--typo3-global-brand-secondary-border-color-hover:#50565c;--typo3-global-brand-warning:#e8a33d;--typo3-global-brand-warning-text-color:#fff;--typo3-global-brand-warning-hover:#d88b1a;--typo3-global-brand-warning-border-color:#e59826;--typo3-global-brand-warning-border-color-active:#b87716;--typo3-global-brand-warning-border-color-hover:#b87716;--typo3-global-brand-success:#79a548;--typo3-global-brand-success-text-color:#fff;--typo3-global-brand-success-hover:#5f8139;--typo3-global-brand-success-border-color-hover:#4d682d;--typo3-global-brand-success-border-color-active:#8bb759;--typo3-global-brand-success-border-color:#6c9340;--typo3-global-brand-danger:#c83c3c;--typo3-global-brand-danger-text-color:#fff;--typo3-global-brand-danger-hover:#a32e2e;--typo3-global-brand-danger-border-color:#b73434;--typo3-global-brand-danger-border-color-active:#872626;--typo3-global-brand-danger-border-color-hover:#872626;--typo3-global-brand-info:#6daae0;--typo3-global-brand-info-text-color:#fff;--typo3-global-brand-info-hover:#4391d7;--typo3-global-brand-info-border-color:#589edc;--typo3-global-brand-info-border-color-active:#2b80cc;--typo3-global-brand-info-border-color-hover:#2b80cc;--typo3-global-brand-default-text-color:var(--typo3-global-gray-dark);--typo3-global-brand-default:var(--typo3-global-gray-lighter);--typo3-global-brand-default-hover:#d4d4d4;--typo3-global-brand-default-border-color:#bbb;--typo3-global-brand-default-border-color-hover:#9c9c9c;--typo3-global-brand-default-border-color-active:#9c9c9c;--typo3-global-default-border-radius:0.125rem;--typo3-global-default-border-width:0.0625rem;--typo3-global-animation-duration:0.5s;--typo3-global-default-gap:0.25rem;--typo3-global-btn-border-radius:var(--typo3-global-default-border-color-radius);--typo3-global-btn-font-size:var(--typo3-global-font-size-default);--typo3-global-btn-line-height:1.4;--typo3-global-btn-padding:0.375rem;--typo3-global-btn-border-width:var(--typo3-global-default-border-width);--typo3-global-btn-icon-size:1rem;--typo3-global-btn-disabled-opacity:0.65;--typo3-global-close-btn-font-size:1.3125rem;--typo3-global-close-btn-font-weight:var(--typo3-global-font-weight-medium);--typo3-global-close-btn-line-height:0.75;--typo3-global-close-btn-color:#000;--typo3-global-close-btn-opacity:0.5;--typo3-global-badge-padding:0.25em 0.4em;--typo3-global-badge-font-weight:500;--typo3-global-badge-border-radius:50%;--typo3-global-badge-size:1.375rem;--typo3-global-badge-font-size:var(--typo3-global-font-size-default);--typo3-global-badge-default-color:var(--typo3-global-brand-default-text-color);--typo3-global-badge-default-bg:var(--typo3-global-brand-default);--typo3-global-badge-primary-color:var(--typo3-global-brand-primary-text-color);--typo3-global-badge-primary-bg:var(--typo3-global-brand-primary);--typo3-global-badge-success-color:var(--typo3-global-brand-success-text-color);--typo3-global-badge-success-bg:var(--typo3-global-brand-success);--typo3-global-badge-info-color:var(--typo3-global-brand-info-text-color);--typo3-global-badge-info-bg:var(--typo3-global-brand-info);--typo3-global-badge-warning-color:var(--typo3-global-brand-warning-text-color);--typo3-global-badge-warning-bg:var(--typo3-global-brand-warning);--typo3-global-badge-danger-color:var(--typo3-global-brand-danger-text-color);--typo3-global-badge-danger-bg:var(--typo3-global-brand-danger);--typo3-global-splitpane-splitter-bg:var(--typo3-global-gray-lighter);--typo3-global-splitpane-splitter-size:var(--typo3-global-default-border-width);--typo3-global-splitpane-handle-width:0.125rem;--typo3-global-splitpane-handle-height:1.5rem;--typo3-global-tooltip-font-size:var(--typo3-global-font-size-default);--typo3-global-tooltip-line-height:1;--typo3-global-tooltip-bg:var(--typo3-global-gray-dark);--typo3-global-tooltip-color:#fff;--typo3-global-tooltip-padding:0.5rem;--typo3-global-tooltip-border-radius:var(--typo3-global-default-border-radius);--typo3-global-tooltip-max-width:15rem;--typo3-global-tooltip-transition:opacity var(--typo3-global-animation-duration) ease-in-out;--typo3-global-alert-border-radius:var(--typo3-global-default-border-radius);--typo3-global-alert-border-width:var(--typo3-global-default-border-width);--typo3-global-alert-success-color:#3c763d;--typo3-global-alert-success-bg:#dff0d8;--typo3-global-alert-success-border:transparent;--typo3-global-alert-info-color:#31708f;--typo3-global-alert-info-bg:#d9edf7;--typo3-global-alert-info-border:transparent;--typo3-global-alert-warning-color:#8a6d3b;--typo3-global-alert-warning-bg:#fcf8e3;--typo3-global-alert-warning-border:transparent;--typo3-global-alert-danger-color:#a94442;--typo3-global-alert-danger-bg:#f2dede;--typo3-global-alert-danger-border:transparent;--typo3-global-modal-bg:#fff;--typo3-global-modal-font-size:var(--typo3-global-font-size-default);--typo3-global-modal-padding:.625rem 1rem;--typo3-global-modal-border-color:rgba(0,0,0,0.2);--typo3-global-modal-border-width:var(--typo3-global-default-border-width);--typo3-global-modal-border-radius:var(--typo3-global-default-border-radius);--typo3-global-modal-close-btn-font-size:0.625rem;--typo3-global-modal-close-btn-line-height:1.2rem;--typo3-global-modal-close-btn-color:#000;--typo3-global-modal-close-btn-opacity:0.5;--typo3-global-list-item-icon-size:var(--typo3-global-btn-icon-size);--typo3-global-list-item-padding-x:1rem;--typo3-global-list-item-padding-y:0.25rem;--typo3-global-list-item-icon-gap:var(--typo3-global-default-gap);--typo3-global-list-item-color:rgba(0,0,0,0.87);--typo3-global-list-item-bg-hover:#f8f9fa;--typo3-global-list-item-color-hover:#16181b;--typo3-global-datagrid-border-color:var(--typo3-global-gray-lighter);--typo3-global-datagrid-cell-color:var(--typo3-global-gray-dark);--typo3-global-datagrid-order-arrow-color:var(--typo3-global-gray);--typo3-global-datagrid-font:12px Verdana;--typo3-global-datagrid-cell-height:30;--typo3-global-datagrid-cell-border-width:1;--typo3-global-breadcrumb-item-color:var(--typo3-global-brand-secondary);--typo3-global-breadcrumb-item-color-active:rgba(0,0,0,0.87);font-family:var(--typo3-theme--typo3-global-font-family,var(--typo3-global-font-family-base));font-size:var(--typo3-global-font-size-default)}";

/**
 * @fires typo3-alert-close - Dispatched when dismissible alert is closed
 * @slot - Default content placed in message div of this element
 *
 * @cssprop --typo3-alert-padding-y
 * @cssprop --typo3-alert-padding-x
 * @cssprop --typo3-alert-margin-bottom
 *
 * @cssprop --typo3-alert-success-color
 * @cssprop --typo3-alert-success-background-color
 * @cssprop --typo3-alert-success-border-color
 *
 * @cssprop --typo3-alert-info-color
 * @cssprop --typo3-alert-info-background-color
 * @cssprop --typo3-alert-info-border-color
 *
 * @cssprop --typo3-alert-warning-color
 * @cssprop --typo3-alert-warning-background-color
 * @cssprop --typo3-alert-warning-border-color
 *
 * @cssprop --typo3-alert-danger-color
 * @cssprop --typo3-alert-danger-background-color
 * @cssprop --typo3-alert-danger-border-color
 *
 * @cssprop --typo3-alert-close-btn-font-size
 * @cssprop --typo3-alert-close-btn-font-weight
 * @cssprop --typo3-alert-close-btn-line-height
 * @cssprop --typo3-alert-close-btn-color
 * @cssprop --typo3-alert-close-btn-color-hover
 */
let Typo3Alert = class Typo3Alert extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * @attr
         * @type String
         */
        this.color = 'default';
        /**
         * @attr
         * @type Boolean
         */
        this.dismissible = false;
        this.isHidden = false;
    }
    render() {
        return html `${!this.isHidden
            ? html `<div id="alert"><div id="message"><slot></slot></div>${this.dismissible
                ? html `<button id="btn-close" @click="${this.close}">×</button>`
                : ''}</div>`
            : ''}`;
    }
    close() {
        if (this.dismissible) {
            this.isHidden = true;
            this.dispatchEvent(new CustomEvent('typo3-alert-close'));
        }
    }
};
Typo3Alert.styles = [css_248z$1, css_248z];
__decorate([
    property({ type: String, reflect: true })
], Typo3Alert.prototype, "color", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Typo3Alert.prototype, "dismissible", void 0);
__decorate([
    internalProperty()
], Typo3Alert.prototype, "isHidden", void 0);
Typo3Alert = __decorate([
    customElement('typo3-alert')
], Typo3Alert);

var css_248z$2 = css`:host{display:inline-flex;flex-direction:row;vertical-align:top}.button #label{white-space:nowrap}.button #label+::slotted([slot=icon]),.button slot[name=icon]+#label{margin-left:var(--typo3-btn-text-icon-gap,var(--typo3-global-default-gap))}.button{display:flex;flex:1 1 auto;cursor:pointer;padding:var(--typo3-global-btn-padding);outline:none;justify-content:center;align-items:center;border:var(--typo3-btn-border-width,var(--typo3-global-btn-border-width)) solid transparent;font-size:var(--typo3-btn-font-size,var(--typo3-global-btn-font-size));line-height:var(--typo3-btn-line-height,var(--typo3-global-btn-line-height));border-radius:var(--typo3-btn-border-radius,var(--typo3-global-btn-border-radius))}:host([color=default]) .button{color:var(--typo3-btn-default-color,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color,var(--typo3-global-brand-default));border-color:var(--typo3-btn-default-border-color,var(--typo3-global-brand-default-border-color))}:host([color=default]) .button:focus{color:var(--typo3-btn-default-color-focus,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color-focus,var(--typo3-global-brand-default-hover));border-color:var(--typo3-btn-default-border-color-focus,var(--typo3-global-brand-default-border-color-active))}:host([color=default]) .button:hover{color:var(--typo3-btn-default-color-hover,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color-hover,var(--typo3-global-brand-default-hover));border-color:var(--typo3-btn-default-border-color-hover,var(--typo3-global-brand-default-border-color-hover))}:host([color=default]) .button:active{color:var(--typo3-btn-default-color-active,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color-active,var(--typo3-global-brand-default-hover));border-color:var(--typo3-btn-default-border-color-active,var(--typo3-global-brand-default-hover))}:host([color=default][disabled]) .button:focus,:host([color=default][disabled]) .button:hover{color:var(--typo3-btn-default-color,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color,var(--typo3-global-brand-default))}:host([color=primary]) .button{color:var(--typo3-btn-primary-color,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color,var(--typo3-global-brand-primary));border-color:var(--typo3-btn-primary-border-color,var(--typo3-global-brand-primary-border-color))}:host([color=primary]) .button:focus{color:var(--typo3-btn-primary-color-focus,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color-focus,var(--typo3-global-brand-primary-hover));border-color:var(--typo3-btn-primary-border-color-focus,var(--typo3-global-brand-primary-border-color-active))}:host([color=primary]) .button:hover{color:var(--typo3-btn-primary-color-hover,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color-hover,var(--typo3-global-brand-primary-hover));border-color:var(--typo3-btn-primary-border-color-hover,var(--typo3-global-brand-primary-border-color-hover))}:host([color=primary]) .button:active{color:var(--typo3-btn-primary-color-active,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color-active,var(--typo3-global-brand-primary-hover));border-color:var(--typo3-btn-primary-border-color-active,var(--typo3-global-brand-primary-hover))}:host([color=primary][disabled]) .button:focus,:host([color=primary][disabled]) .button:hover{color:var(--typo3-btn-primary-color,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color,var(--typo3-global-brand-primary))}:host([color=secondary]) .button{color:var(--typo3-btn-secondary-color,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color,var(--typo3-global-brand-secondary));border-color:var(--typo3-btn-secondary-border-color,var(--typo3-global-brand-secondary-border-color))}:host([color=secondary]) .button:focus{color:var(--typo3-btn-secondary-color-focus,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color-focus,var(--typo3-global-brand-secondary-hover));border-color:var(--typo3-btn-secondary-border-color-focus,var(--typo3-global-brand-secondary-border-color-active))}:host([color=secondary]) .button:hover{color:var(--typo3-btn-secondary-color-hover,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color-hover,var(--typo3-global-brand-secondary-hover));border-color:var(--typo3-btn-secondary-border-color-hover,var(--typo3-global-brand-secondary-border-color-hover))}:host([color=secondary]) .button:active{color:var(--typo3-btn-secondary-color-active,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color-active,var(--typo3-global-brand-secondary-hover));border-color:var(--typo3-btn-secondary-border-color-active,var(--typo3-global-brand-secondary-hover))}:host([color=secondary][disabled]) .button:focus,:host([color=secondary][disabled]) .button:hover{color:var(--typo3-btn-secondary-color,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color,var(--typo3-global-brand-secondary))}:host([color=success]) .button{color:var(--typo3-btn-success-color,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color,var(--typo3-global-brand-success));border-color:var(--typo3-btn-success-border-color,var(--typo3-global-brand-success-border-color))}:host([color=success]) .button:focus{color:var(--typo3-btn-success-color-focus,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color-focus,var(--typo3-global-brand-success-hover));border-color:var(--typo3-btn-success-border-color-focus,var(--typo3-global-brand-success-border-color-active))}:host([color=success]) .button:hover{color:var(--typo3-btn-success-color-hover,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color-hover,var(--typo3-global-brand-success-hover));border-color:var(--typo3-btn-success-border-color-hover,var(--typo3-global-brand-success-border-color-hover))}:host([color=success]) .button:active{color:var(--typo3-btn-success-color-active,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color-active,var(--typo3-global-brand-success-hover));border-color:var(--typo3-btn-success-border-color-active,var(--typo3-global-brand-success-hover))}:host([color=success][disabled]) .button:focus,:host([color=success][disabled]) .button:hover{color:var(--typo3-btn-success-color,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color,var(--typo3-global-brand-success))}:host([color=info]) .button{color:var(--typo3-btn-info-color,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color,var(--typo3-global-brand-info));border-color:var(--typo3-btn-info-border-color,var(--typo3-global-brand-info-border-color))}:host([color=info]) .button:focus{color:var(--typo3-btn-info-color-focus,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color-focus,var(--typo3-global-brand-info-hover));border-color:var(--typo3-btn-info-border-color-focus,var(--typo3-global-brand-info-border-color-active))}:host([color=info]) .button:hover{color:var(--typo3-btn-info-color-hover,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color-hover,var(--typo3-global-brand-info-hover));border-color:var(--typo3-btn-info-border-color-hover,var(--typo3-global-brand-info-border-color-hover))}:host([color=info]) .button:active{color:var(--typo3-btn-info-color-active,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color-active,var(--typo3-global-brand-info-hover));border-color:var(--typo3-btn-info-border-color-active,var(--typo3-global-brand-info-hover))}:host([color=info][disabled]) .button:focus,:host([color=info][disabled]) .button:hover{color:var(--typo3-btn-info-color,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color,var(--typo3-global-brand-info))}:host([color=warning]) .button{color:var(--typo3-btn-warning-color,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color,var(--typo3-global-brand-warning));border-color:var(--typo3-btn-warning-border-color,var(--typo3-global-brand-warning-border-color))}:host([color=warning]) .button:focus{color:var(--typo3-btn-warning-color-focus,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color-focus,var(--typo3-global-brand-warning-hover));border-color:var(--typo3-btn-warning-border-color-focus,var(--typo3-global-brand-warning-border-color-active))}:host([color=warning]) .button:hover{color:var(--typo3-btn-warning-color-hover,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color-hover,var(--typo3-global-brand-warning-hover));border-color:var(--typo3-btn-warning-border-color-hover,var(--typo3-global-brand-warning-border-color-hover))}:host([color=warning]) .button:active{color:var(--typo3-btn-warning-color-active,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color-active,var(--typo3-global-brand-warning-hover));border-color:var(--typo3-btn-warning-border-color-active,var(--typo3-global-brand-warning-hover))}:host([color=warning][disabled]) .button:focus,:host([color=warning][disabled]) .button:hover{color:var(--typo3-btn-warning-color,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color,var(--typo3-global-brand-warning))}:host([color=danger]) .button{color:var(--typo3-btn-danger-color,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color,var(--typo3-global-brand-danger));border-color:var(--typo3-btn-danger-border-color,var(--typo3-global-brand-danger-border-color))}:host([color=danger]) .button:focus{color:var(--typo3-btn-danger-color-focus,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color-focus,var(--typo3-global-brand-danger-hover));border-color:var(--typo3-btn-danger-border-color-focus,var(--typo3-global-brand-danger-border-color-active))}:host([color=danger]) .button:hover{color:var(--typo3-btn-danger-color-hover,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color-hover,var(--typo3-global-brand-danger-hover));border-color:var(--typo3-btn-danger-border-color-hover,var(--typo3-global-brand-danger-border-color-hover))}:host([color=danger]) .button:active{color:var(--typo3-btn-danger-color-active,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color-active,var(--typo3-global-brand-danger-hover));border-color:var(--typo3-btn-danger-border-color-active,var(--typo3-global-brand-danger-hover))}:host([color=danger][disabled]) .button:focus,:host([color=danger][disabled]) .button:hover{color:var(--typo3-btn-danger-color,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color,var(--typo3-global-brand-danger))}:host([disabled]) .button{cursor:not-allowed;opacity:var(--typo3-global-btn-disabled-opacity)}slot[name=icon]::slotted(*){fill:currentColor;width:var(--typo3-btn-icon-size,var(--typo3-global-btn-icon-size));height:var(--typo3-btn-icon-size,var(--typo3-global-btn-icon-size))}:host([only-icon]) #button{border-color:transparent;background:none}`;
var stylesheet$2=":host{display:inline-flex;flex-direction:row;vertical-align:top}.button #label{white-space:nowrap}.button #label+::slotted([slot=icon]),.button slot[name=icon]+#label{margin-left:var(--typo3-btn-text-icon-gap,var(--typo3-global-default-gap))}.button{display:flex;flex:1 1 auto;cursor:pointer;padding:var(--typo3-global-btn-padding);outline:none;justify-content:center;align-items:center;border:var(--typo3-btn-border-width,var(--typo3-global-btn-border-width)) solid transparent;font-size:var(--typo3-btn-font-size,var(--typo3-global-btn-font-size));line-height:var(--typo3-btn-line-height,var(--typo3-global-btn-line-height));border-radius:var(--typo3-btn-border-radius,var(--typo3-global-btn-border-radius))}:host([color=default]) .button{color:var(--typo3-btn-default-color,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color,var(--typo3-global-brand-default));border-color:var(--typo3-btn-default-border-color,var(--typo3-global-brand-default-border-color))}:host([color=default]) .button:focus{color:var(--typo3-btn-default-color-focus,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color-focus,var(--typo3-global-brand-default-hover));border-color:var(--typo3-btn-default-border-color-focus,var(--typo3-global-brand-default-border-color-active))}:host([color=default]) .button:hover{color:var(--typo3-btn-default-color-hover,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color-hover,var(--typo3-global-brand-default-hover));border-color:var(--typo3-btn-default-border-color-hover,var(--typo3-global-brand-default-border-color-hover))}:host([color=default]) .button:active{color:var(--typo3-btn-default-color-active,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color-active,var(--typo3-global-brand-default-hover));border-color:var(--typo3-btn-default-border-color-active,var(--typo3-global-brand-default-hover))}:host([color=default][disabled]) .button:focus,:host([color=default][disabled]) .button:hover{color:var(--typo3-btn-default-color,var(--typo3-global-brand-default-text-color));background-color:var(--typo3-btn-default-background-color,var(--typo3-global-brand-default))}:host([color=primary]) .button{color:var(--typo3-btn-primary-color,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color,var(--typo3-global-brand-primary));border-color:var(--typo3-btn-primary-border-color,var(--typo3-global-brand-primary-border-color))}:host([color=primary]) .button:focus{color:var(--typo3-btn-primary-color-focus,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color-focus,var(--typo3-global-brand-primary-hover));border-color:var(--typo3-btn-primary-border-color-focus,var(--typo3-global-brand-primary-border-color-active))}:host([color=primary]) .button:hover{color:var(--typo3-btn-primary-color-hover,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color-hover,var(--typo3-global-brand-primary-hover));border-color:var(--typo3-btn-primary-border-color-hover,var(--typo3-global-brand-primary-border-color-hover))}:host([color=primary]) .button:active{color:var(--typo3-btn-primary-color-active,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color-active,var(--typo3-global-brand-primary-hover));border-color:var(--typo3-btn-primary-border-color-active,var(--typo3-global-brand-primary-hover))}:host([color=primary][disabled]) .button:focus,:host([color=primary][disabled]) .button:hover{color:var(--typo3-btn-primary-color,var(--typo3-global-brand-primary-text-color));background-color:var(--typo3-btn-primary-background-color,var(--typo3-global-brand-primary))}:host([color=secondary]) .button{color:var(--typo3-btn-secondary-color,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color,var(--typo3-global-brand-secondary));border-color:var(--typo3-btn-secondary-border-color,var(--typo3-global-brand-secondary-border-color))}:host([color=secondary]) .button:focus{color:var(--typo3-btn-secondary-color-focus,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color-focus,var(--typo3-global-brand-secondary-hover));border-color:var(--typo3-btn-secondary-border-color-focus,var(--typo3-global-brand-secondary-border-color-active))}:host([color=secondary]) .button:hover{color:var(--typo3-btn-secondary-color-hover,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color-hover,var(--typo3-global-brand-secondary-hover));border-color:var(--typo3-btn-secondary-border-color-hover,var(--typo3-global-brand-secondary-border-color-hover))}:host([color=secondary]) .button:active{color:var(--typo3-btn-secondary-color-active,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color-active,var(--typo3-global-brand-secondary-hover));border-color:var(--typo3-btn-secondary-border-color-active,var(--typo3-global-brand-secondary-hover))}:host([color=secondary][disabled]) .button:focus,:host([color=secondary][disabled]) .button:hover{color:var(--typo3-btn-secondary-color,var(--typo3-global-brand-secondary-text-color));background-color:var(--typo3-btn-secondary-background-color,var(--typo3-global-brand-secondary))}:host([color=success]) .button{color:var(--typo3-btn-success-color,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color,var(--typo3-global-brand-success));border-color:var(--typo3-btn-success-border-color,var(--typo3-global-brand-success-border-color))}:host([color=success]) .button:focus{color:var(--typo3-btn-success-color-focus,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color-focus,var(--typo3-global-brand-success-hover));border-color:var(--typo3-btn-success-border-color-focus,var(--typo3-global-brand-success-border-color-active))}:host([color=success]) .button:hover{color:var(--typo3-btn-success-color-hover,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color-hover,var(--typo3-global-brand-success-hover));border-color:var(--typo3-btn-success-border-color-hover,var(--typo3-global-brand-success-border-color-hover))}:host([color=success]) .button:active{color:var(--typo3-btn-success-color-active,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color-active,var(--typo3-global-brand-success-hover));border-color:var(--typo3-btn-success-border-color-active,var(--typo3-global-brand-success-hover))}:host([color=success][disabled]) .button:focus,:host([color=success][disabled]) .button:hover{color:var(--typo3-btn-success-color,var(--typo3-global-brand-success-text-color));background-color:var(--typo3-btn-success-background-color,var(--typo3-global-brand-success))}:host([color=info]) .button{color:var(--typo3-btn-info-color,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color,var(--typo3-global-brand-info));border-color:var(--typo3-btn-info-border-color,var(--typo3-global-brand-info-border-color))}:host([color=info]) .button:focus{color:var(--typo3-btn-info-color-focus,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color-focus,var(--typo3-global-brand-info-hover));border-color:var(--typo3-btn-info-border-color-focus,var(--typo3-global-brand-info-border-color-active))}:host([color=info]) .button:hover{color:var(--typo3-btn-info-color-hover,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color-hover,var(--typo3-global-brand-info-hover));border-color:var(--typo3-btn-info-border-color-hover,var(--typo3-global-brand-info-border-color-hover))}:host([color=info]) .button:active{color:var(--typo3-btn-info-color-active,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color-active,var(--typo3-global-brand-info-hover));border-color:var(--typo3-btn-info-border-color-active,var(--typo3-global-brand-info-hover))}:host([color=info][disabled]) .button:focus,:host([color=info][disabled]) .button:hover{color:var(--typo3-btn-info-color,var(--typo3-global-brand-info-text-color));background-color:var(--typo3-btn-info-background-color,var(--typo3-global-brand-info))}:host([color=warning]) .button{color:var(--typo3-btn-warning-color,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color,var(--typo3-global-brand-warning));border-color:var(--typo3-btn-warning-border-color,var(--typo3-global-brand-warning-border-color))}:host([color=warning]) .button:focus{color:var(--typo3-btn-warning-color-focus,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color-focus,var(--typo3-global-brand-warning-hover));border-color:var(--typo3-btn-warning-border-color-focus,var(--typo3-global-brand-warning-border-color-active))}:host([color=warning]) .button:hover{color:var(--typo3-btn-warning-color-hover,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color-hover,var(--typo3-global-brand-warning-hover));border-color:var(--typo3-btn-warning-border-color-hover,var(--typo3-global-brand-warning-border-color-hover))}:host([color=warning]) .button:active{color:var(--typo3-btn-warning-color-active,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color-active,var(--typo3-global-brand-warning-hover));border-color:var(--typo3-btn-warning-border-color-active,var(--typo3-global-brand-warning-hover))}:host([color=warning][disabled]) .button:focus,:host([color=warning][disabled]) .button:hover{color:var(--typo3-btn-warning-color,var(--typo3-global-brand-warning-text-color));background-color:var(--typo3-btn-warning-background-color,var(--typo3-global-brand-warning))}:host([color=danger]) .button{color:var(--typo3-btn-danger-color,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color,var(--typo3-global-brand-danger));border-color:var(--typo3-btn-danger-border-color,var(--typo3-global-brand-danger-border-color))}:host([color=danger]) .button:focus{color:var(--typo3-btn-danger-color-focus,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color-focus,var(--typo3-global-brand-danger-hover));border-color:var(--typo3-btn-danger-border-color-focus,var(--typo3-global-brand-danger-border-color-active))}:host([color=danger]) .button:hover{color:var(--typo3-btn-danger-color-hover,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color-hover,var(--typo3-global-brand-danger-hover));border-color:var(--typo3-btn-danger-border-color-hover,var(--typo3-global-brand-danger-border-color-hover))}:host([color=danger]) .button:active{color:var(--typo3-btn-danger-color-active,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color-active,var(--typo3-global-brand-danger-hover));border-color:var(--typo3-btn-danger-border-color-active,var(--typo3-global-brand-danger-hover))}:host([color=danger][disabled]) .button:focus,:host([color=danger][disabled]) .button:hover{color:var(--typo3-btn-danger-color,var(--typo3-global-brand-danger-text-color));background-color:var(--typo3-btn-danger-background-color,var(--typo3-global-brand-danger))}:host([disabled]) .button{cursor:not-allowed;opacity:var(--typo3-global-btn-disabled-opacity)}slot[name=icon]::slotted(*){fill:currentColor;width:var(--typo3-btn-icon-size,var(--typo3-global-btn-icon-size));height:var(--typo3-btn-icon-size,var(--typo3-global-btn-icon-size))}:host([only-icon]) #button{border-color:transparent;background:none}";

class Typo3BaseButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.label = '';
        this.iconRight = false;
        this.onlyicon = false;
        this.color = 'default';
    }
    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot.addEventListener('click', (event) => {
            if (this.disabled) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }, true);
    }
    render() {
        return html `<button id="button" class="button" .disabled="${this.disabled}" aria-label="${this.label}">${this.buttonContent}</button>`;
    }
    get buttonContent() {
        const icon = html `<slot name="icon"></slot>`;
        const label = html `<div id="label"><slot></slot></div>`;
        const content = [];
        if (this.hasText) {
            content.push(label);
        }
        if (this.hasIcon) {
            this.iconRight ? content.push(icon) : content.unshift(icon);
        }
        return content;
    }
    get hasText() {
        return this.textContent ? this.textContent.trim() !== '' : false;
    }
    get hasIcon() {
        return !!this.querySelector('[slot="icon"]');
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], Typo3BaseButton.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], Typo3BaseButton.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'icon-right' })
], Typo3BaseButton.prototype, "iconRight", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'only-icon' })
], Typo3BaseButton.prototype, "onlyicon", void 0);
__decorate([
    property({ type: String, reflect: true })
], Typo3BaseButton.prototype, "color", void 0);

let Typo3Button = class Typo3Button extends Typo3BaseButton {
};
Typo3Button.styles = [css_248z$1, css_248z$2];
Typo3Button = __decorate([
    customElement('typo3-button')
], Typo3Button);

var css_248z$3 = css`.form-field,:host{display:inline-flex}.form-field{width:100%;vertical-align:middle;line-height:var(--typo3-formfield-line-height,1.25rem);padding:var(--typo3-formfield-padding,.375rem 0);gap:var(--typo3-formfield-label-input-gap,var(--typo3-global-default-gap))}::slotted(*){display:block;padding:var(--typo3-formfield-input-padding,.375rem .75rem);color:var(--typo3-formfield-input-color,var(--typo3-global-gray-dark));border:var(--typo3-formfield-input-border-width,var(--typo3-global-default-border-width)) solid var(--typo3-formfield-input-border-color,var(--typo3-global-brand-default-border-color));border-radius:var(--typo3-formfield-input-border-radius,var(--typo3-global-default-border-radius));outline:none}:host([label-align=top]) .form-field{flex-direction:column}:host([label-align=right]) .form-field{flex-direction:row-reverse}`;
var stylesheet$3=".form-field,:host{display:inline-flex}.form-field{width:100%;vertical-align:middle;line-height:var(--typo3-formfield-line-height,1.25rem);padding:var(--typo3-formfield-padding,.375rem 0);gap:var(--typo3-formfield-label-input-gap,var(--typo3-global-default-gap))}::slotted(*){display:block;padding:var(--typo3-formfield-input-padding,.375rem .75rem);color:var(--typo3-formfield-input-color,var(--typo3-global-gray-dark));border:var(--typo3-formfield-input-border-width,var(--typo3-global-default-border-width)) solid var(--typo3-formfield-input-border-color,var(--typo3-global-brand-default-border-color));border-radius:var(--typo3-formfield-input-border-radius,var(--typo3-global-default-border-radius));outline:none}:host([label-align=top]) .form-field{flex-direction:column}:host([label-align=right]) .form-field{flex-direction:row-reverse}";

/**
 * @cssprop --typo3-formfield-line-height
 * @cssprop --typo3-formfield-padding
 * @cssprop --typo3-formfield-label-input-gap
 * @cssprop --typo3-formfield-input-padding
 * @cssprop --typo3-formfield-input-color
 * @cssprop --typo3-formfield-input-border-width
 * @cssprop --typo3-formfield-input-border-color
 * @cssprop --typo3-formfield-input-border-radius
 *
 * @slot - Form element
 */
let Typo3Formfield = class Typo3Formfield extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.labelAlign = 'top';
    }
    render() {
        return html `<div class="form-field"><label class="form-field__label" @click="${this._onLabelClick}">${this.label}</label><slot></slot></div>`;
    }
    _onLabelClick() {
        var _a, _b;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.focus();
        (_b = this.input) === null || _b === void 0 ? void 0 : _b.click();
    }
    get input() {
        var _a;
        const firstNode = this.slotEl
            .assignedNodes({ flatten: true })
            .find(node => node.nodeType === Node.ELEMENT_NODE);
        return (_a = firstNode) !== null && _a !== void 0 ? _a : null;
    }
};
Typo3Formfield.styles = [css_248z$1, css_248z$3];
__decorate([
    property({ type: String })
], Typo3Formfield.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: 'label-align', reflect: true })
], Typo3Formfield.prototype, "labelAlign", void 0);
__decorate([
    query('slot')
], Typo3Formfield.prototype, "slotEl", void 0);
Typo3Formfield = __decorate([
    customElement('typo3-formfield')
], Typo3Formfield);

var css_248z$4 = css`.wrapper{opacity:0;transition:visibility 0s,opacity .25s ease-in}.wrapper:not(.open){visibility:hidden}.wrapper.open{align-items:center;display:flex;justify-content:center;height:100vh;position:fixed;top:0;left:0;right:0;bottom:0;opacity:1;visibility:visible;z-index:5001}.modal{width:var(--typo3-modal-width,37.5rem);max-height:calc(100vh - 2.5rem);max-width:calc(100vw - 2.5rem);position:relative;display:flex;flex-direction:column;pointer-events:auto;background-color:var(--typo3-modal-background-color,var(--typo3-global-modal-bg));background-clip:padding-box;border:var(--typo3-modal-border-width,var(--typo3-global-modal-border-width)) solid var(--typo3-modal-border-color,var(--typo3-global-modal-border-color));border-radius:var(--typo3-modal-border-radius,var(--typo3-global-modal-border-radius));outline:0;font-size:var(--typo3-modal-font-size,var(--typo3-global-modal-font-size));z-index:5002;transition:transform .3s ease-out;transform:translateY(-3.125rem)}.wrapper.open .modal{transform:none}.btn-close{background:none;border:none;color:inherit;padding:0;margin:0;text-shadow:rgba(0,0,0,.5) 0 0 .1875rem;opacity:.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.btn-close:hover{box-shadow:none;outline:0;background:0 0;opacity:1}.btn-close .icon-actions-close{height:1rem;width:1rem;line-height:1rem;position:relative;display:inline-block;overflow:hidden;vertical-align:-22%}.btn-close .icon-actions-close svg{display:block;height:100%;width:100%;transform:translateZ(0);fill:currentColor}.btn-close:hover{text-decoration:none;opacity:var(--typo3-modal-close-btn-color-hover,.75)}.header{display:flex;justify-content:space-between;flex-shrink:0;align-items:center;padding:var(--typo3-modal-header-padding,var(--typo3-global-modal-padding));background-color:var(--typo3-global-gray-lighter);border-bottom:var(--typo3-global-modal-border-width) solid var(--typo3-global-gray-lighter);color:var(--typo3-modal-header-color,#fff)}.modal-title{font-size:.9375rem;margin:0;line-height:1.5;font-weight:500}.content{position:relative;flex:1 1 auto;padding:var(--typo3-modal-content-padding,var(--typo3-global-modal-padding))}.footer{display:flex;align-items:center;flex-wrap:wrap;gap:var(--typo3-global-default-gap);flex-grow:1;justify-content:flex-end;border-top:1px solid #d7d7d7;border-bottom-right-radius:calc(.125rem - 1px);border-bottom-left-radius:calc(.125rem - 1px)}.footer,.header{padding:var(--typo3-modal-header-padding,var(--typo3-global-modal-padding))}:host([variant=warning]) .header{background-color:var(--typo3-modal-header-warning-background-color,var(--typo3-global-brand-warning));border-bottom-color:var(--typo3-modal-header-warning-border-color,var(--typo3-global-brand-warning-border-color));color:var(--typo3-modal-header-warning-text-color,var(--typo3-global-brand-warning-text-color))}:host([variant=danger]) .header{background-color:var(--typo3-modal-header-danger-background-color,var(--typo3-global-brand-danger));border-bottom-color:var(--typo3-modal-header-danger-border-color,var(--typo3-global-brand-danger-border-color));color:var(--typo3-modal-header-danger-text-color,var(--typo3-global-brand-danger-text-color))}:host([variant=info]) .header{background-color:var(--typo3-modal-header-info-background-color,var(--typo3-global-brand-info));border-bottom-color:var(--typo3-modal-header-info-border-color,var(--typo3-global-brand-info-border-color));color:var(--typo3-modal-header-info-text-color,var(--typo3-global-brand-info-text-color))}`;
var stylesheet$4=".wrapper{opacity:0;transition:visibility 0s,opacity .25s ease-in}.wrapper:not(.open){visibility:hidden}.wrapper.open{align-items:center;display:flex;justify-content:center;height:100vh;position:fixed;top:0;left:0;right:0;bottom:0;opacity:1;visibility:visible;z-index:5001}.modal{width:var(--typo3-modal-width,37.5rem);max-height:calc(100vh - 2.5rem);max-width:calc(100vw - 2.5rem);position:relative;display:flex;flex-direction:column;pointer-events:auto;background-color:var(--typo3-modal-background-color,var(--typo3-global-modal-bg));background-clip:padding-box;border:var(--typo3-modal-border-width,var(--typo3-global-modal-border-width)) solid var(--typo3-modal-border-color,var(--typo3-global-modal-border-color));border-radius:var(--typo3-modal-border-radius,var(--typo3-global-modal-border-radius));outline:0;font-size:var(--typo3-modal-font-size,var(--typo3-global-modal-font-size));z-index:5002;transition:transform .3s ease-out;transform:translateY(-3.125rem)}.wrapper.open .modal{transform:none}.btn-close{background:none;border:none;color:inherit;padding:0;margin:0;text-shadow:rgba(0,0,0,.5) 0 0 .1875rem;opacity:.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.btn-close:hover{box-shadow:none;outline:0;background:0 0;opacity:1}.btn-close .icon-actions-close{height:1rem;width:1rem;line-height:1rem;position:relative;display:inline-block;overflow:hidden;vertical-align:-22%}.btn-close .icon-actions-close svg{display:block;height:100%;width:100%;transform:translateZ(0);fill:currentColor}.btn-close:hover{text-decoration:none;opacity:var(--typo3-modal-close-btn-color-hover,.75)}.header{display:flex;justify-content:space-between;flex-shrink:0;align-items:center;padding:var(--typo3-modal-header-padding,var(--typo3-global-modal-padding));background-color:var(--typo3-global-gray-lighter);border-bottom:var(--typo3-global-modal-border-width) solid var(--typo3-global-gray-lighter);color:var(--typo3-modal-header-color,#fff)}.modal-title{font-size:.9375rem;margin:0;line-height:1.5;font-weight:500}.content{position:relative;flex:1 1 auto;padding:var(--typo3-modal-content-padding,var(--typo3-global-modal-padding))}.footer{display:flex;align-items:center;flex-wrap:wrap;gap:var(--typo3-global-default-gap);flex-grow:1;justify-content:flex-end;border-top:1px solid #d7d7d7;border-bottom-right-radius:calc(.125rem - 1px);border-bottom-left-radius:calc(.125rem - 1px)}.footer,.header{padding:var(--typo3-modal-header-padding,var(--typo3-global-modal-padding))}:host([variant=warning]) .header{background-color:var(--typo3-modal-header-warning-background-color,var(--typo3-global-brand-warning));border-bottom-color:var(--typo3-modal-header-warning-border-color,var(--typo3-global-brand-warning-border-color));color:var(--typo3-modal-header-warning-text-color,var(--typo3-global-brand-warning-text-color))}:host([variant=danger]) .header{background-color:var(--typo3-modal-header-danger-background-color,var(--typo3-global-brand-danger));border-bottom-color:var(--typo3-modal-header-danger-border-color,var(--typo3-global-brand-danger-border-color));color:var(--typo3-modal-header-danger-text-color,var(--typo3-global-brand-danger-text-color))}:host([variant=info]) .header{background-color:var(--typo3-modal-header-info-background-color,var(--typo3-global-brand-info));border-bottom-color:var(--typo3-modal-header-info-border-color,var(--typo3-global-brand-info-border-color));color:var(--typo3-modal-header-info-text-color,var(--typo3-global-brand-info-text-color))}";

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var ModalVariant;
(function (ModalVariant) {
    ModalVariant["warning"] = "warning";
    ModalVariant["error"] = "error";
    ModalVariant["info"] = "info";
})(ModalVariant || (ModalVariant = {}));

/**
 * @fires typo3-modal-open - Dispatched when modal is opened
 * @fires typo3-modal-close - Dispatched when modal is closed
 *
 * @slot - Default modal content
 * @slot footer - Modal footer
 *
 * @cssprop --typo3-modal-background-color
 * @cssprop --typo3-modal-width
 * @cssprop --typo3-modal-border-width
 * @cssprop --typo3-modal-border-color
 * @cssprop --typo3-modal-border-radius
 * @cssprop --typo3-modal-font-size
 * @cssprop --typo3-modal-header-padding
 * @cssprop --typo3-modal-content-padding
 * @cssprop --typo3-modal-footer-padding
 * @cssprop --typo3-modal-overlay-opacity
 *
 */
let Typo3Modal = class Typo3Modal extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * @type String
         */
        this.variant = ModalVariant.info;
        /**
         * @type Boolean
         */
        this.open = false;
        /**
         * @type String
         */
        this.headline = '';
        /**
         * @type Boolean
         */
        this.dismissible = false;
    }
    render() {
        return html `<div class="wrapper ${this.open ? 'open' : ''}" aria-hidden="${!this.open}"><typo3-overlay fixed @click="${this.close}"></typo3-overlay><div id="modal" class="modal" tabindex="-1">${this.headerContent}<div id="content" class="content">${this.messageContent}</div><div id="footer" class="footer">${this.footerContent}</div></div></div>`;
    }
    get headerContent() {
        if ('' === this.headline && !this.dismissible) {
            return html ``;
        }
        return html `<div class="header">${this.headline
            ? html `<h4 class="modal-title" slot="headline">${this.headline}</h4>`
            : html ``} ${this.dismissible
            ? html `<button class="btn-close" aria-label="Close" @click="${this.close}"><span class="icon-actions-close" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.9 5.5L9.4 8l2.5 2.5c.2.2.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0L8 9.4l-2.5 2.5c-.2.2-.5.2-.7 0l-.7-.7c-.2-.2-.2-.5 0-.7L6.6 8 4.1 5.5c-.2-.2-.2-.5 0-.7l.7-.7c.2-.2.5-.2.7 0L8 6.6l2.5-2.5c.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7z"></path></svg></span></button>`
            : html ``}</div>`;
    }
    get messageContent() {
        return html `<slot></slot>`;
    }
    get footerContent() {
        return html `<slot name="footer"></slot>`;
    }
    show() {
        const closeEvent = new CustomEvent('typo3-modal-open');
        this.dispatchEvent(closeEvent);
        this.open = true;
        setTimeout(() => this.modal.focus(), 2);
        window.addEventListener('keydown', event => this._onKeyDown(event));
    }
    close() {
        window.removeEventListener('keydown', event => this._onKeyDown(event));
        this.open = false;
        const closeEvent = new CustomEvent('typo3-modal-close');
        this.dispatchEvent(closeEvent);
    }
    _onKeyDown(event) {
        if (this.dismissible && 'Escape' === event.key) {
            this.close();
        }
    }
};
Typo3Modal.styles = [css_248z$1, css_248z$4];
__decorate([
    property({ type: String, reflect: true })
], Typo3Modal.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Typo3Modal.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], Typo3Modal.prototype, "headline", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Typo3Modal.prototype, "dismissible", void 0);
__decorate([
    query('#modal')
], Typo3Modal.prototype, "modal", void 0);
Typo3Modal = __decorate([
    customElement('typo3-modal')
], Typo3Modal);

var css_248z$5 = css`:host{background:var(--typo3-modal-overlay-color,#000);opacity:var(--typo3-modal-overlay-opacity,.5);height:100%;position:absolute;top:0;right:0;bottom:0;left:0;width:100%;z-index:100}:host([fixed]){position:fixed}`;
var stylesheet$5=":host{background:var(--typo3-modal-overlay-color,#000);opacity:var(--typo3-modal-overlay-opacity,.5);height:100%;position:absolute;top:0;right:0;bottom:0;left:0;width:100%;z-index:100}:host([fixed]){position:fixed}";

/**
 * @cssprop --typo3-modal-overlay-opacity
 * @cssprop --typo3-modal-overlay-color
 */
let Typo3Overlay = class Typo3Overlay extends LitElement {
    constructor() {
        super(...arguments);
        this.fixed = false;
    }
    render() {
        return html ``;
    }
};
Typo3Overlay.styles = [css_248z$1, css_248z$5];
__decorate([
    property({ type: Boolean, reflect: true })
], Typo3Overlay.prototype, "fixed", void 0);
Typo3Overlay = __decorate([
    customElement('typo3-overlay')
], Typo3Overlay);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
class FileSizeHelper {
    static formatFileSize(size) {
        const sizeKB = size / 1024;
        let str = '';
        if (sizeKB > 1024) {
            str = (sizeKB / 1024).toFixed(1) + ' MB';
        }
        else {
            str = sizeKB.toFixed(1) + ' KB';
        }
        return str;
    }
}

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
class DateHelper {
    static formatDate(milliseconds) {
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hours = `${date.getHours()}`.padStart(2, '0');
        const minutes = `${date.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}

let Typo3FilesOverrideModalContent = class Typo3FilesOverrideModalContent extends LitElement {
    constructor() {
        super(...arguments);
        this.isBulkAction = false;
        this.files = [];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `<form><div><p>${this.trans('file_upload.existingfiles.description')}</p><table class="table"><thead><tr><th></th><th>${this.trans('file_upload.header.originalFile')}</th><th>${this.trans('file_upload.header.uploadedFile')}</th><th>${this.trans('file_upload.header.action')}</th></tr></thead><tbody>${this.renderFilesTableRows}</tbody></table></div><typo3-formfield style="width:100%" label="${this.trans('file_upload.actions.all.label')}"><select class="form-control t3js-actions-all" name="data[all]" @change="${this.onBulkActionChange}"><option value="">${this.trans('file_upload.actions.all.empty')}</option><option value="cancel">${this.trans('file_upload.actions.all.skip')}</option><option value="rename">${this.trans('file_upload.actions.all.rename')}</option><option value="replace">${this.trans('file_upload.actions.all.override')}</option></select></typo3-formfield></form>`;
    }
    get renderFilesTableRows() {
        return this.files.map(file => html `<tr><td><img src="${file.original.thumbUrl}" style="height:40px"></td><td>${file.original.name} (${FileSizeHelper.formatFileSize(file.original.size)})<br>${DateHelper.formatDate(file.original.mtime * 1000)}</td><td>${file.data.name} (${FileSizeHelper.formatFileSize(file.data.size)})<br>${DateHelper.formatDate(file.data.lastModified)}</td><td><typo3-formfield><select class="form-control t3js-actions" ?disabled="${this.isBulkAction}" name="data[file][${file.data.name}]"><option value="cancel">${this.trans('file_upload.actions.skip')}</option><option value="rename">${this.trans('file_upload.actions.rename')}</option><option value="replace">${this.trans('file_upload.actions.override')}</option></select></typo3-formfield></td></tr>`);
    }
    onBulkActionChange(event) {
        const inputElement = event.target;
        const bulkActionValue = inputElement.value;
        if (bulkActionValue === '') {
            this.isBulkAction = false;
            return;
        }
        this.isBulkAction = true;
        this.querySelectorAll('.t3js-actions').forEach(element => (element.value = bulkActionValue));
    }
    trans(key) {
        // @ts-ignore
        return '' + window.TYPO3.lang[key];
    }
};
__decorate([
    internalProperty()
], Typo3FilesOverrideModalContent.prototype, "isBulkAction", void 0);
__decorate([
    property({ type: Object })
], Typo3FilesOverrideModalContent.prototype, "files", void 0);
Typo3FilesOverrideModalContent = __decorate([
    customElement('typo3-files-override-modal-content')
], Typo3FilesOverrideModalContent);
