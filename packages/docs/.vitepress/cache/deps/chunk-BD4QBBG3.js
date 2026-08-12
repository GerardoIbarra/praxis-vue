import {
  __publicField
} from "./chunk-XGM4GKIC.js";

// ../../node_modules/.pnpm/wordgard@0.3.1/node_modules/wordgard/dist/doc.js
var TextOutput = class {
  constructor(blockSep, leafText) {
    __publicField(this, "blockSep");
    __publicField(this, "leafText");
    __publicField(this, "text", "");
    __publicField(this, "started", false);
    this.blockSep = blockSep;
    this.leafText = leafText;
  }
  serialize(node) {
    let nodeText = node.isPlot ? null : node.isText ? node.param : node.type.spec.toText ? node.type.spec.toText(node) : this.leafText ? this.leafText(node) : "";
    if (node.isLeaf ? node.type.isBlock && nodeText : node.isTextblock)
      this.openBlock();
    if (nodeText != null) {
      this.text += nodeText;
      this.started = true;
    }
    return nodeText != null;
  }
  openBlock() {
    if (this.started)
      this.text += this.blockSep;
    else
      this.started = true;
  }
};
var SchemaError = class extends Error {
};
var ValidationError = class extends Error {
};
var Token = function(Token2) {
  (function(Type) {
    Type[Type["Open"] = 0] = "Open";
    Type[Type["Close"] = 1] = "Close";
    Type[Type["Node"] = 2] = "Node";
  })(Token2.Type || (Token2.Type = {}));
  Token2.End = {
    tokenType: Token2.Type.Close,
    toString() {
      return "[end]";
    }
  };
  ;
  return Token2;
}({});
var _Slice = class _Slice {
  constructor(content) {
    __publicField(this, "content");
    __publicField(this, "length");
    this.content = content;
    this.length = content.reduce((l, e) => l + (e.tokenType == Token.Type.Node ? e.length : 1), 0);
  }
  static of(content) {
    return new _Slice(content);
  }
  eq(other) {
    if (other.content.length != this.content.length)
      return false;
    for (let i = 0; i < this.content.length; i++) {
      let a = this.content[i], b = other.content[i];
      if (a == Token.End) {
        if (b != Token.End)
          return false;
      } else if (a.tokenType == Token.Type.Node) {
        if (!(b.tokenType == Token.Type.Node && a.eq(b)))
          return false;
      } else if (a.tokenType == Token.Type.Open) {
        if (!(b.tokenType == Token.Type.Open && a.eq(b)))
          return false;
      }
    }
    return true;
  }
  run(track, startPos = 0) {
    let pos = startPos;
    for (let elt of this.content) {
      if (elt.tokenType == Token.Type.Open)
        track.open(elt, pos++);
      else if (elt.tokenType == Token.Type.Node) {
        track.node(elt, pos);
        pos += elt.length;
      } else
        track.close(pos++);
    }
  }
  slice(from, to = this.length) {
    if (from == to)
      return _Slice.empty;
    let result = [], off = 0;
    for (let elt of this.content) {
      let start = off;
      off += elt.tokenType == Token.Type.Node ? elt.length : 1;
      if (off <= from)
        continue;
      if (start < from || off > to) {
        let inner = elt.sliceInner(Math.max(0, from - start), Math.min(elt.length, to - start));
        for (let elt2 of inner.content)
          result.push(elt2);
      } else {
        result.push(elt);
      }
      if (off >= to)
        break;
    }
    return new _Slice(result);
  }
  concat(other) {
    let content = this.content.slice();
    let i = 0;
    if (content.length && other.content.length && other.content[0].tokenType == Token.Type.Node && content[content.length - 1].tokenType == Token.Type.Node) {
      other.content[0].pushTo(content);
      i = 1;
    }
    for (; i < other.content.length; i++)
      content.push(other.content[i]);
    return new _Slice(content);
  }
  textContent(options = {}) {
    let { blockSeparator = "\n", leafText } = options;
    let out = new TextOutput(blockSeparator, leafText == null ? void 0 : typeof leafText == "string" ? () => leafText : leafText);
    for (let tok of this.content) {
      if (tok.tokenType == Token.Type.Open) {
        if (tok.isTextblock)
          out.openBlock();
      } else if (tok.tokenType == Token.Type.Node) {
        if (tok.isLeaf)
          out.serialize(tok);
        else
          tok.iterate((node) => !out.serialize(node));
      }
    }
    return out.text;
  }
  toString() {
    return `<${this.content.join()}>`;
  }
  toJSON() {
    return this.content.map((e) => e.tokenType == Token.Type.Close ? "." : e.toJSON());
  }
  static fromJSON(schema, json) {
    if (!Array.isArray(json))
      throw new ValidationError("Invalid slice JSON");
    return new _Slice(json.map((value) => {
      if (value === ".")
        return Token.End;
      if (!value || typeof value.type != "string")
        throw new ValidationError("Invalid slice JSON");
      let type = schema.getNode(value.type);
      return (type == null ? void 0 : type.isLeaf) || "content" in value ? schema.nodeFromJSON(value) : schema.tagFromJSON(value);
    }));
  }
};
__publicField(_Slice, "empty", (() => new _Slice([]))());
var Slice = _Slice;
var noChildren = [];
var _Elt = class _Elt {
  constructor(tagName, attrs, children) {
    __publicField(this, "tagName");
    __publicField(this, "attrs");
    __publicField(this, "children");
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children;
  }
  static create(tagName, attrs, children) {
    return new _Elt(tagName, attrs, children);
  }
  static mk(name, arg1, arg2) {
    let [attrs, children] = arg2 ? [Attributes.read(arg1), arg2] : !arg1 ? [Attributes.none, noChildren] : Array.isArray(arg1) ? [Attributes.none, arg1] : [Attributes.read(arg1), noChildren];
    if (children.length == 1 && children[0] === 0)
      children = _Elt.hole;
    return new _Elt(name, attrs, children);
  }
  get hasContent() {
    return this.children.some((ch) => ch === 0 || ch instanceof _Elt && ch.hasContent);
  }
  eqTag(elt) {
    return elt.tagName == this.tagName && Attributes.eq(this.attrs, elt.attrs);
  }
  eqChildren(elt) {
    if (elt.children == this.children)
      return true;
    if (this.children.length != elt.children.length)
      return false;
    for (let i = 0; i < this.children.length; i++) {
      let a = this.children[i], b = elt.children[i];
      if (a !== b && (!a || !b || typeof a != "object" || typeof b != "object" || a.constructor != b.constructor || !a.eq || !a.eq(b)))
        return false;
    }
    return true;
  }
  eq(other) {
    return other instanceof _Elt && this.eqTag(other) && this.eqChildren(other);
  }
  outerDOM(doc = document) {
    let { tagName: name, attrs } = this;
    let dom = /^svg:/.test(name) ? doc.createElementNS("http://www.w3.org/2000/svg", name.slice(4)) : /^math:/.test(name) ? doc.createElementNS("http://www.w3.org/1998/Math/MathML", name.slice(5)) : doc.createElement(name);
    for (let i = 0; i < attrs.length; )
      dom.setAttribute(attrs[i++], attrs[i++]);
    return dom;
  }
  wrap(wrapper, target) {
    if (target) {
      let added = this.modifyBySelector(wrapper, target);
      if (added)
        return added;
    }
    return wrapper.fill([this]);
  }
  addAttrs(attrs, target) {
    if (target) {
      let added = this.modifyBySelector(attrs, target);
      if (added)
        return added;
    }
    return _Elt.create(this.tagName, Attributes.merge(this.attrs, attrs), this.children);
  }
  fill(content) {
    let children = [];
    for (let ch of this.children) {
      if (ch === 0) {
        for (let c of content)
          children.push(c);
      } else if (ch instanceof _Elt && ch.hasContent) {
        children.push(ch.fill(content));
      } else {
        children.push(ch);
      }
    }
    return new _Elt(this.tagName, this.attrs, children);
  }
  modifyBySelector(mod, target) {
    if (target.match(this))
      return mod instanceof _Elt ? mod.fill([this]) : this.addAttrs(mod);
    for (let i = 0; i < this.children.length; i++) {
      let ch = this.children[i], matched;
      if (ch instanceof _Elt && (matched = ch.modifyBySelector(mod, target))) {
        let copy = this.children.slice();
        copy[i] = matched;
        return _Elt.create(this.tagName, this.attrs, copy);
      }
    }
    return null;
  }
  toHTML() {
    return toHTML(this);
  }
  toDOM(doc) {
    return toDOM(this, doc);
  }
};
__publicField(_Elt, "empty", []);
__publicField(_Elt, "hole", [0]);
var Elt = _Elt;
var selfClosing = /* @__PURE__ */ (() => /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  "menuitem"
]))();
Elt = function(Elt2) {
  class Fragment {
    constructor(content) {
      __publicField(this, "content");
      this.content = content;
    }
    static create(content) {
      return new Fragment(content);
    }
    toHTML() {
      return toHTML(this);
    }
    toDOM(doc) {
      let frag = getDoc(doc).createDocumentFragment();
      for (let ch of this.content)
        frag.appendChild(toDOM(ch, doc));
      return frag;
    }
  }
  Elt2.Fragment = Fragment;
  class Selector {
    constructor(tag, classes) {
      __publicField(this, "tag");
      __publicField(this, "classes");
      this.tag = tag;
      this.classes = classes;
    }
    eq(other) {
      return other.tag == this.tag && this.classes.length == other.classes.length && this.classes.every((c, i) => c == other.classes[i]);
    }
    match(elt) {
      if (this.tag && elt.tagName != this.tag)
        return false;
      if (this.classes.length) {
        let tagCls = Attributes.get(elt.attrs, "class");
        if (!tagCls)
          return false;
        let pieces = tagCls.split(/ +/);
        for (let cls of this.classes)
          if (!pieces.includes(cls))
            return false;
      }
      return true;
    }
    static parse(selector) {
      let m, tag = null, classes = [], txt = selector;
      if (m = /^[\w\d\-_\u0c00-\uffff]+/.exec(txt)) {
        tag = m[0];
        txt = txt.slice(m[0].length);
      }
      while (m = /^\.[\w\d\-_\u0c00-\uffff]+/.exec(txt)) {
        classes.push(m[0].slice(1));
        txt = txt.slice(m[0].length);
      }
      if (txt)
        throw new Error("Invalid element selector " + selector);
      return new Selector(tag, classes);
    }
  }
  Elt2.Selector = Selector;
  ;
  return Elt2;
}(Elt);
function toHTML(content) {
  let html = "";
  function scan(elt) {
    if (typeof elt == "string") {
      html += elt.replace(/[<&]/g, (ch) => ch == "<" ? "&lt;" : "&amp;");
      return;
    } else if (elt === 0) {
      return;
    }
    let { tagName: name, attrs } = elt, svg, math;
    if (svg = /^svg:/.test(name))
      name = name.slice(4);
    if (math = /^math:/.test(name))
      name = name.slice(5);
    if (svg && name == "svg")
      html += `<svg xmlns="http://www.w3.org/2000/svg"`;
    if (math && name == "math")
      html += `<math xmlns="http://www.w3.org/1998/Math/MathML"`;
    else
      html += `<${name}`;
    for (let i = 0; i < attrs.length; ) {
      let name2 = attrs[i++], val = attrs[i++];
      html += ` ${name2}="${val.replace(/["&]/g, (ch) => ch == '"' ? "&quot;" : "&amp;")}"`;
    }
    if ((math || svg) && !elt.children.length) {
      html += "/>";
    } else if (!math && !svg && selfClosing.has(name)) {
      html += ">";
    } else {
      html += ">";
      for (let ch of elt.children)
        scan(ch);
      html += `</${name}>`;
    }
  }
  if (content instanceof Elt.Fragment)
    for (let elt of content.content)
      scan(elt);
  else
    scan(content);
  return html;
}
function getDoc(doc) {
  if (doc)
    return doc;
  if (typeof document != "object" || !document.createElement)
    throw new Error("No document available");
  return document;
}
function toDOM(elt, doc) {
  doc = getDoc(doc);
  if (typeof elt == "string") {
    return doc.createTextNode(elt);
  } else {
    let dom = elt.outerDOM(doc);
    for (let ch of elt.children)
      if (ch !== 0)
        dom.appendChild(toDOM(ch, doc));
    return dom;
  }
}
var Attributes = function(Attributes2) {
  Attributes2.none = [];
  function eq(a, b) {
    if (a == b)
      return true;
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (a[i] != b[i])
        return false;
    return true;
  }
  Attributes2.eq = eq;
  function compare(a, b) {
    for (let iA = 0, iB = 0, score = 0; ; ) {
      if (iA < a.length && iB < b.length && a[iA] == b[iB]) {
        if (a[iA + 1] != b[iB + 1])
          score--;
        iA += 2;
        iB += 2;
      } else if (iA < a.length && (iB == b.length || a[iA] < b[iB])) {
        score--;
        iA += 2;
      } else if (iB < b.length && iA < a.length) {
        score--;
        iB += 2;
      } else {
        return score;
      }
    }
  }
  Attributes2.compare = compare;
  function merge(a, b) {
    if (!a.length)
      return b;
    if (!b.length)
      return a;
    let result = [];
    for (let iA = 0, iB = 0; ; ) {
      let kA = iA < a.length ? a[iA] : null, kB = iB < b.length ? b[iB] : null;
      if (kA == kB) {
        if (kA == null)
          return result;
        let value = b[iB + 1];
        if (kA == "class")
          value = a[iA + 1] + " " + value;
        else if (kA == "style")
          value = a[iA + 1] + ";" + value;
        result.push(kA, value);
        iA += 2;
        iB += 2;
      } else if (kA != null && (kB == null || kA < kB)) {
        result.push(kA, a[iA + 1]);
        iA += 2;
      } else {
        result.push(kB, b[iB + 1]);
        iB += 2;
      }
    }
  }
  Attributes2.merge = merge;
  function push(a, name, value) {
    let i = 0;
    while (i < a.length && a[i] < name)
      i += 2;
    if (i < a.length && a[i] == name) {
      if (name == "class")
        a[i + 1] += " " + value;
      else if (name == "style")
        a[i + 1] += ";" + value;
      else
        a[i + 1] = value;
    } else {
      a.splice(i, 0, name, value);
    }
  }
  Attributes2.push = push;
  function read(obj) {
    let result = [];
    for (let prop in obj)
      if (prop != "_") {
        let value = obj[prop];
        if (value != null) {
          if (/^style\//.test(prop)) {
            value = prop.slice(6) + ": " + value;
            prop = "style";
          }
          Attributes2.push(result, prop, value);
        }
      }
    return result.length ? result : Attributes2.none;
  }
  Attributes2.read = read;
  function get(attrs, name) {
    for (let i = 0; i < attrs.length; i += 2)
      if (attrs[i] == name)
        return attrs[i + 1];
    return null;
  }
  Attributes2.get = get;
  ;
  return Attributes2;
}({});
var NodeShape = class _NodeShape {
  constructor(atom, create) {
    __publicField(this, "atom");
    __publicField(this, "create");
    this.atom = atom;
    this.create = create;
  }
  static from(name, leaf, spec) {
    let atom = spec.atom, create;
    if ("element" in spec) {
      if (atom == null)
        atom = leaf;
      let { element, attributes } = spec;
      if (typeof attributes == "function") {
        create = (param) => Elt.create(element, Attributes.read(attributes(param)), atom ? Elt.empty : Elt.hole);
      } else {
        let elt = Elt.create(element, attributes ? Attributes.read(attributes) : Attributes.none, atom ? Elt.empty : Elt.hole);
        create = () => elt;
      }
    } else {
      if (leaf)
        atom = true;
      let { structure } = spec;
      if (typeof structure == "function") {
        if (atom == null)
          throw new Error(`Dynamic structure for tag ${name} must define an \`atom\` field`);
        create = structure;
      } else {
        if (atom == null)
          atom = !structure.hasContent;
        else if (atom != !structure.hasContent)
          throw new Error(`Disagreement between \`atom\` field and structure for tag ${name}`);
        create = () => structure;
      }
    }
    if (atom == false && leaf)
      throw new Error(`Leaf tag ${name}'s shape must be atomic`);
    return new _NodeShape(atom, create);
  }
};
var none = [];
function compareDeep(a, b) {
  if (a === b)
    return true;
  if (!a || !b || typeof a != "object" || typeof b != "object")
    return false;
  let array = Array.isArray(a);
  if (Array.isArray(b) != array)
    return false;
  if (array) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!compareDeep(a[i], b[i]))
        return false;
  } else {
    for (let p in a)
      if (!(p in b) || !compareDeep(a[p], b[p]))
        return false;
    for (let p in b)
      if (!(p in a))
        return false;
  }
  return true;
}
function eqArray(a, b) {
  if (a == b)
    return true;
  if (a.length != b.length)
    return false;
  for (let i = 0; i < a.length; i++)
    if (!a[i].eq(b[i]))
      return false;
  return true;
}
function validate(validator, value) {
  if (typeof validator == "string") {
    let types = validator.split("|");
    let name = value === null ? "null" : typeof value;
    if (types.indexOf(name) < 0)
      throw new RangeError(`Expected value of type ${validator} got ${name}`);
  } else if (validator) {
    validator(value);
  }
  return value;
}
function remove(arr, index) {
  return arr.length == 1 ? none : arr.filter((_, i) => i != index);
}
function addSet(a, b, compare) {
  let result = [];
  for (let i = 0, j = 0; ; ) {
    if (i == a.length) {
      if (j == b.length)
        return result;
      result.push(b[j++]);
    } else if (j == b.length) {
      result.push(a[i++]);
    } else {
      let cmp = compare(a[i], b[j]);
      if (cmp == 0)
        i++;
      else if (cmp < 0)
        result.push(a[i++]);
      else
        result.push(b[j++]);
    }
  }
}
function subtractSet(a, b, compare) {
  let result = [];
  for (let i = 0, j = 0; ; ) {
    if (i == a.length)
      return result;
    if (j == b.length) {
      result.push(a[i++]);
    } else {
      let cmp = compare(a[i], b[j]);
      if (cmp == 0)
        i++;
      else if (cmp < 0)
        result.push(a[i++]);
      else
        j++;
    }
  }
}
var _Mark = class _Mark {
  constructor(type, value) {
    __publicField(this, "type");
    __publicField(this, "value");
    this.type = type;
    this.value = value;
  }
  static create(type, value) {
    return new _Mark(type, value);
  }
  eq(other) {
    return this.type == other.type && compareDeep(this.value, other.value);
  }
  get name() {
    return this.type.name;
  }
  get rank() {
    return this.type.rank;
  }
  get spanning() {
    return this.type.spanning;
  }
  toString() {
    return this.value == null ? this.name : `${this.name}=${JSON.stringify(this.value)}`;
  }
  static define(name, spec) {
    return _Mark.Type.define(name, spec, true).default;
  }
  addToSet(set) {
    let placed = null, copy = [];
    for (let i = 0; i < set.length; i++) {
      let other = set[i];
      if (this.eq(other))
        return set;
      if (other.type != this.type) {
        if (!placed && this.type.compareRank(other.type) < 0)
          copy.push(placed = this);
        copy.push(other);
      } else if (this.type.set) {
        copy.push(placed = new _Mark(this.type, addSet(other.value, this.value, this.type.set)));
      }
    }
    if (!placed)
      copy.push(this);
    return copy;
  }
  removeFromSet(set) {
    let type = this.type;
    for (var i = 0; i < set.length; i++)
      if (set[i].type == type) {
        let val = set[i], newSet;
        if (type.set) {
          let rest = subtractSet(val.value, this.value, type.set);
          if (!rest.length) {
            newSet = remove(set, i);
          } else {
            newSet = set.slice();
            newSet[i] = new _Mark(type, rest);
          }
        } else if (!val.eq(this)) {
          continue;
        } else {
          newSet = remove(set, i);
        }
        return newSet;
      }
    return set;
  }
  isInSet(set) {
    for (let v of set)
      if (v.eq(this))
        return v;
    return null;
  }
  static sameSet(a, b) {
    return eqArray(a, b);
  }
};
__publicField(_Mark, "none", none);
var Mark = _Mark;
Mark = function(Mark2) {
  class Type {
    constructor(name, spec, isFlag) {
      __publicField(this, "name");
      __publicField(this, "rank");
      __publicField(this, "set");
      __publicField(this, "default");
      __publicField(this, "inclusive");
      __publicField(this, "element", null);
      __publicField(this, "attribute", null);
      __publicField(this, "spanning");
      __publicField(this, "spec");
      this.name = name;
      this.spec = spec;
      this.rank = Math.max(0, Math.min(spec.rank ?? 100, 100));
      this.set = spec.set ? spec.set.compare : null;
      this.default = isFlag || "defaultParam" in spec ? Mark2.create(this, isFlag ? null : spec.defaultParam) : null;
      this.inclusive = spec.inclusive !== false;
      if ("element" in spec.shape)
        this.element = new ElementShape(spec.shape);
      else
        this.attribute = new AttributeShape(spec.shape, this);
      this.spanning = this.element ? spec.spanning !== false : !!spec.spanning;
    }
    of(value) {
      return Mark2.create(this, value);
    }
    compareRank(other) {
      return this.rank - other.rank || (other.name < this.name ? 1 : -1);
    }
    removeFromSet(set) {
      for (var i = 0; i < set.length; i++)
        if (set[i].type == this)
          return remove(set, i);
      return set;
    }
    isInSet(set) {
      for (let v of set)
        if (v.type == this)
          return v;
      return null;
    }
    get isElement() {
      return !!this.element;
    }
    static define(name, spec, isFlag = false) {
      return new Mark2.Type(name, spec, isFlag);
    }
  }
  Mark2.Type = Type;
  ;
  return Mark2;
}(Mark);
var ElementShape = class {
  constructor(spec) {
    __publicField(this, "name");
    __publicField(this, "attrs");
    this.name = spec.element;
    const { attributes } = spec;
    if (typeof attributes == "function") {
      this.attrs = (value) => Attributes.read(attributes(value));
    } else {
      let attrs = attributes ? Attributes.read(attributes) : Attributes.none;
      this.attrs = () => attrs;
    }
  }
};
var AttributeShape = class {
  constructor(spec, type) {
    __publicField(this, "get");
    __publicField(this, "target");
    if ("attribute" in spec) {
      const { value, attribute } = spec, style = /^style\//.test(attribute) ? attribute.slice(6) + ": " : null;
      if (value === 0) {
        if (type.default)
          throw new SchemaError("Attribute shapes for parameter-less marks cannot use 0 as value");
        if (style)
          this.get = (param) => ["style", style + param];
        else
          this.get = (param) => [attribute, String(param)];
      } else if (typeof value == "function") {
        if (style)
          this.get = (param) => {
            let val = value(param);
            return val == null ? Attributes.none : ["style", style + val];
          };
        else
          this.get = (param) => {
            let val = value(param);
            return val == null ? Attributes.none : [attribute, val];
          };
      } else {
        let attrs = style ? ["style", style + value] : [attribute, value];
        this.get = () => attrs;
      }
    } else {
      const { attributes } = spec;
      if (typeof attributes == "function") {
        this.get = (param) => Attributes.read(attributes(param));
      } else {
        let attrs = Attributes.read(attributes);
        this.get = () => attrs;
      }
    }
    this.target = spec.preferTarget ? Elt.Selector.parse(spec.preferTarget) : null;
  }
};
var Pos = class _Pos {
  constructor(parent, pos, index, inText) {
    __publicField(this, "parent");
    __publicField(this, "pos");
    __publicField(this, "index");
    __publicField(this, "inText");
    this.parent = parent;
    this.pos = pos;
    this.index = index;
    this.inText = inText;
  }
  static create(parent, pos, index, inText) {
    return new _Pos(parent, pos, index, inText);
  }
  matchingParent(pred) {
    for (let { parent } = this; ; ) {
      if (pred(parent.node))
        return parent;
      if (!parent.parent)
        return null;
      ({ parent } = parent);
    }
  }
  advance(distance, walk) {
    return distance ? advancePos(distance, this.parent, this.pos, this.index, this.inText, walk) : this;
  }
  walk(distance, walk) {
    return distance ? advancePos(distance, this.parent, this.pos, this.index, this.inText, walk, true) : this;
  }
  get nodeAfter() {
    if (this.index == this.parent.node.content.length)
      return null;
    let node = this.parent.node.content[this.index];
    return this.inText ? node.sliceText(this.inText) : node;
  }
  get nodeBefore() {
    if (this.inText)
      return this.parent.node.content[this.index].sliceText(0, this.inText);
    return this.index ? this.parent.node.content[this.index - 1] : null;
  }
  get textblockParent() {
    for (let p = this.parent; ; p = p.parent) {
      if (!p || !p.node.inlineContent)
        return null;
      if (p.node.isTextblock)
        return p;
    }
  }
  get depth() {
    return this.parent.depth;
  }
  parentAt(depth) {
    let d = this.depth;
    if (depth > d)
      throw new RangeError("Asking for parent deeper than position depth");
    for (let d2 = this.depth, p = this.parent; ; p = p.parent)
      if (d2 == depth)
        return p;
  }
  isAtStart(parent) {
    if (this.inText)
      return false;
    for (let p = this.parent, index = this.index; ; index = p.index, p = p.parent) {
      if (!p || index)
        return false;
      if (p.pos == parent.pos)
        return true;
    }
  }
  isAtEnd(parent) {
    if (this.inText)
      return false;
    for (let p = this.parent, index = this.index; ; index = p.index + 1, p = p.parent) {
      if (!p || index < p.node.content.length)
        return false;
      if (p.pos == parent.pos)
        return true;
    }
  }
  get doc() {
    return this.parent.doc;
  }
  marks(across) {
    if (this.inText && (!across || across.pos == this.pos))
      return this.parent.node.content[this.index].tag.marks;
    let [from, to] = !across ? [this, this] : across.pos > this.pos ? [this, across] : [across, this];
    if (!from.parent.node.inlineContent || !to.parent.node.inlineContent)
      return Mark.none;
    let before = from.nodeBefore, after = to.nodeAfter;
    let [main, sec] = before ? [before.tag.marks, after ? after.tag.marks : none] : [after ? after.tag.marks : none, none];
    return main.filter((p) => p.spanning && (p.type.inclusive || p.isInSet(sec)));
  }
  static resolve(doc, pos) {
    if (pos < 0 || pos > doc.length)
      throw new RangeError(`Resolving invalid position ${pos}`);
    let { top, cache } = cacheFor(doc), nearest, nearestDist = 0, result;
    if (pos == 0)
      return _Pos.create(top, 0, 0, 0);
    for (let elt of cache) {
      if (elt.pos == pos)
        return elt;
      let dist = Math.abs(elt.pos - pos);
      if (!nearest || dist < nearestDist) {
        nearest = elt;
        nearestDist = dist;
      }
    }
    if (nearest) {
      let { parent } = nearest;
      while (parent.start > pos || parent.end < pos)
        parent = parent.parent;
      result = advancePos(pos - parent.start, parent, parent.start, 0, 0);
    } else {
      result = advancePos(pos, top, 0, 0, 0);
    }
    return cache[cache.length < cacheSize ? cache.length : cachePos = (cachePos + 1) % cacheSize] = result;
  }
  static resolveNode(doc, pos) {
    let base = this.resolve(doc, pos);
    if (base.inText)
      return null;
    let after = base.nodeAfter;
    return !after || after.isText ? null : after.isLeaf ? _Pos.Node.create(base.parent, after, pos, base.index) : _Pos.Plot.create(base.parent, after, pos, base.index);
  }
};
Pos = function(Pos2) {
  class Node2 {
    constructor(parent, node, pos, index) {
      __publicField(this, "parent");
      __publicField(this, "node");
      __publicField(this, "pos");
      __publicField(this, "index");
      this.parent = parent;
      this.node = node;
      this.pos = pos;
      this.index = index;
    }
    static create(parent, node, pos, index) {
      return new Node2(parent, node, pos, index);
    }
    get before() {
      if (this.pos < 0)
        throw new RangeError("Accessing `before` on the top level node");
      return this.pos;
    }
    get after() {
      if (this.pos < 0)
        throw new RangeError("Accessing `after` on the top level node");
      return this.pos + this.node.length;
    }
    get depth() {
      let d = 0;
      for (let n = this; n.parent; n = n.parent)
        d++;
      return d;
    }
    get doc() {
      let n = this;
      while (n.parent)
        n = n.parent;
      if (!n.node.isDoc)
        throw new Error("Outer parent not a document");
      return n.node;
    }
    get isFirst() {
      return !this.parent || this.index == 0;
    }
    get isLast() {
      return !this.parent || this.index == this.parent.node.content.length - 1;
    }
    get nextSibling() {
      return this.isLast ? null : this.parent.node.content[this.index + 1];
    }
    get previousSibling() {
      return this.isFirst ? null : this.parent.node.content[this.index - 1];
    }
  }
  Pos2.Node = Node2;
  class Plot2 extends Pos2.Node {
    constructor(parent, node, pos, index) {
      super(parent, node, pos, index);
    }
    static create(parent, node, pos, index) {
      return new Plot2(parent, node, pos, index);
    }
    get start() {
      return this.pos + 1;
    }
    get end() {
      return this.pos + 1 + this.node.contentLength;
    }
  }
  Pos2.Plot = Plot2;
  ;
  return Pos2;
}(Pos);
var posCache = /* @__PURE__ */ (() => /* @__PURE__ */ new Map())();
var cacheSize = 8;
var cachePos = 0;
function cacheFor(doc) {
  let found = posCache.get(doc);
  if (!found)
    posCache.set(doc, found = { top: Pos.Plot.create(null, doc, -1, 0), cache: [] });
  return found;
}
function advancePos(distance, parent, pos, index, inText, walk, full = false) {
  let target = pos + distance, { node } = parent;
  if (inText) {
    let text = node.content[index];
    let textStart = pos - inText, textEnd = textStart + text.length;
    if (walk)
      walk.skip(text.sliceText(inText, Math.min(text.length, target - textStart)), pos, parent, index);
    if (target < textEnd)
      return Pos.create(parent, target, index, target - textStart);
    pos = textEnd;
    index++;
  }
  while (pos < target) {
    if (index == node.content.length) {
      if (!parent.parent)
        throw new Error("Moving past end of document");
      if (walk)
        walk.leavePlot(node.tag, pos, parent.parent, parent.index);
      ({ index, parent } = parent);
      node = parent.node;
      index++;
      pos++;
    } else {
      let next = node.content[index], end = pos + next.length;
      if (next.isLeaf) {
        if (next.isText && target < end) {
          if (walk)
            walk.skip(next.sliceText(0, target - pos), pos, parent, index);
          return Pos.create(parent, target, index, target - pos);
        } else {
          if (walk)
            walk.skip(next, pos, parent, index);
          pos = end;
          index++;
        }
      } else {
        let enter = full || target < end;
        if (walk) {
          if (!enter)
            walk.skip(next, pos, parent, index);
          else if (walk.enterPlot(next, pos, parent, index) === false && target >= end)
            enter = false;
        }
        if (enter) {
          parent = Pos.Plot.create(parent, next, pos, index);
          pos++;
          node = next;
          index = 0;
        } else {
          pos = end;
          index++;
        }
      }
    }
  }
  return Pos.create(parent, pos, index, 0);
}
var BaseType = class {
  constructor(name, flags, spec, shape) {
    __publicField(this, "name");
    __publicField(this, "flags");
    __publicField(this, "shape");
    __publicField(this, "roles", /* @__PURE__ */ new Set());
    this.name = name;
    this.flags = flags;
    this.shape = shape;
    if (spec.role instanceof Node.Role)
      this.roles.add(spec.role);
    else if (spec.role)
      for (let role of spec.role)
        this.roles.add(role);
    if (this.shape.atom)
      this.flags |= 4;
  }
  hasRole(role) {
    return this.roles.has(role);
  }
  get isInline() {
    return (this.flags & 1) > 0;
  }
  get isBlock() {
    return (this.flags & 1) == 0;
  }
  get isAtom() {
    return (this.flags & 4) > 0;
  }
  get isSelectable() {
    return (this.flags & 32) > 0;
  }
};
var BaseTag = class {
  constructor(param, marks) {
    __publicField(this, "param");
    __publicField(this, "marks");
    this.param = param;
    this.marks = marks;
  }
  mark(mark) {
    for (let v of this.marks)
      if (v.type == mark)
        return v.value;
    return void 0;
  }
  get name() {
    return this.type.name;
  }
  get isText() {
    return this.type == Leaf.Text;
  }
  is(type) {
    return this.type == type;
  }
  toJSON() {
    let result = { type: this.name };
    if (this != this.type.default)
      result.param = this.param;
    if (this.marks.length) {
      result.marks = /* @__PURE__ */ Object.create(null);
      for (let { name, value } of this.marks)
        result.marks[name] = value;
    }
    return result;
  }
};
var Node = function(Node2) {
  (function(Type) {
    function get(ref) {
      return ref instanceof BaseType ? ref : ref.type;
    }
    Type.get = get;
  })(Node2.Type || (Node2.Type = {}));
  const _Group = class _Group {
    constructor(parent) {
      __publicField(this, "parent");
      this.parent = parent;
    }
    static define(parent) {
      return new _Group(parent);
    }
  };
  __publicField(_Group, "All", _Group.define());
  __publicField(_Group, "Inline", _Group.define());
  __publicField(_Group, "Block", _Group.define());
  __publicField(_Group, "Leaf", _Group.define());
  __publicField(_Group, "Plot", _Group.define());
  __publicField(_Group, "Textblock", _Group.define());
  __publicField(_Group, "Content", _Group.define());
  __publicField(_Group, "TableCell", _Group.define());
  __publicField(_Group, "ListItem", _Group.define());
  __publicField(_Group, "builtin", [_Group.All, _Group.Inline, _Group.Block, _Group.Leaf, _Group.Plot, _Group.Textblock]);
  let Group = _Group;
  Node2.Group = Group;
  const _Role = class _Role {
    constructor() {
    }
    static define() {
      return new _Role();
    }
  };
  __publicField(_Role, "Code", _Role.define());
  __publicField(_Role, "List", _Role.define());
  __publicField(_Role, "LineBreak", _Role.define());
  let Role = _Role;
  Node2.Role = Role;
  ;
  return Node2;
}({});
var Leaf = class _Leaf extends BaseTag {
  constructor(type, param, marks) {
    super(param, marks);
    __publicField(this, "type");
    this.type = type;
  }
  static new(type, param, marks) {
    return new _Leaf(type, param, marks);
  }
  get tag() {
    return this;
  }
  eq(other) {
    return this == other || other.isLeaf && this.type == other.type && compareDeep(this.param, other.param) && Mark.sameSet(this.marks, other.marks);
  }
  static define(name, spec) {
    return _Leaf.Type.new(name, flagsFor(spec) | 16, spec).default;
  }
  withMarks(marks) {
    return Mark.sameSet(this.marks, marks) ? this : this.type.of(this.param, marks);
  }
  get tokenType() {
    return Token.Type.Node;
  }
  get isLeaf() {
    return true;
  }
  get isPlot() {
    return false;
  }
  get length() {
    return this.is(_Leaf.Text) ? this.param.length : 1;
  }
  pushTo(nodes) {
    if (this.is(_Leaf.Text)) {
      let prevI = nodes.length - 1, prev = prevI >= 0 ? nodes[prevI] : null;
      if (prev && prev.is(_Leaf.Text) && Mark.sameSet(prev.marks, this.marks)) {
        nodes[prevI] = _Leaf.text(prev.param + this.param, this.marks);
        return;
      }
    }
    nodes.push(this);
  }
  sliceInner(from, to) {
    return from == to ? Slice.empty : Slice.of([this.is(_Leaf.Text) ? this.sliceText(from, to) : this]);
  }
  sliceText(from, to) {
    if (!this.is(_Leaf.Text))
      throw new Error("Calling sliceText on a non-text node");
    if (to == null)
      to = this.param.length;
    if (!from && to == this.param.length)
      return this;
    return _Leaf.Text.of(this.param.slice(Math.max(from, 0), Math.max(0, to)), this.marks);
  }
  static text(text, marks = Mark.none) {
    return _Leaf.Text.of(text, marks);
  }
  toString() {
    return (this.is(_Leaf.Text) ? JSON.stringify(this.param) : this.name) + markString(this.marks);
  }
};
Leaf = function(Leaf2) {
  class Type extends BaseType {
    constructor(name, flags, spec) {
      super(name, flags, spec, NodeShape.from(name, true, spec.shape));
      __publicField(this, "default");
      __publicField(this, "spec");
      this.spec = spec;
      this.default = "defaultParam" in spec ? Leaf2.new(this, spec.defaultParam, none) : flags & 16 ? Leaf2.new(this, null, none) : null;
    }
    static new(name, flags, spec) {
      return new Type(name, flags, spec);
    }
    static define(name, spec) {
      return new Leaf2.Type(name, flagsFor(spec), spec);
    }
    of(param, marks = Mark.none) {
      if (!marks.length && this.default && compareDeep(this.default.param, param))
        return this.default;
      return Leaf2.new(this, param, marks);
    }
    get isLeaf() {
      return true;
    }
    get isPlot() {
      return false;
    }
  }
  Leaf2.Type = Type;
  Leaf2.Text = Leaf2.Type.new("Text", 1, {
    shape: { element: "" }
  });
  ;
  return Leaf2;
}(Leaf);
var Plot = class _Plot {
  constructor(tag, content) {
    __publicField(this, "tag");
    __publicField(this, "content");
    __publicField(this, "contentLength");
    this.tag = tag;
    this.content = content;
    this.tag = tag;
    this.contentLength = content.reduce((s, c) => s + c.length, 0);
  }
  static create(tag, content) {
    return new _Plot(tag, content);
  }
  get name() {
    return this.tag.name;
  }
  get type() {
    return this.tag.type;
  }
  get marks() {
    return this.tag.marks;
  }
  get length() {
    return 2 + this.contentLength;
  }
  eq(other) {
    return this == other || other instanceof _Plot && this.tag.eq(other.tag) && this.contentEq(other);
  }
  contentEq(other) {
    return eqArray(this.content, other.content);
  }
  sliceInner(from, to) {
    if (from == to)
      return Slice.empty;
    let content = [];
    this.slicePlot(content, from, to);
    return Slice.of(content);
  }
  slicePlot(out, from, to) {
    if (from <= 0) {
      if (to >= this.length) {
        out.push(this);
        return;
      }
      out.push(this.tag);
    }
    sliceContent(out, this.content, from - 1, to - 1);
    if (to >= this.length)
      out.push(_Plot.End);
  }
  is(type) {
    return false;
  }
  get isText() {
    return false;
  }
  get inlineContent() {
    return this.type.inlineContent;
  }
  get isTextblock() {
    return this.type.isTextblock;
  }
  get isLeaf() {
    return false;
  }
  get isPlot() {
    return true;
  }
  get isDoc() {
    return this.type.isDoc;
  }
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  get lastChild() {
    let last = this.content.length - 1;
    return last < 0 ? null : this.content[last];
  }
  iterate(a, b, c) {
    let [from, to, f] = typeof a == "number" ? [a, b, c] : [0, this.length, a];
    if (this.isDoc || f(this, 0, null, 0) !== false)
      this.iterInner(0, from, to, f);
  }
  nodeAt(pos) {
    for (let node of this.content) {
      if (pos == 0)
        return node.isText ? null : node;
      if (pos < node.length)
        return node.isLeaf ? null : node.nodeAt(pos - 1);
      pos -= node.length;
    }
    return null;
  }
  plotAt(pos) {
    let node = this.nodeAt(pos);
    return node instanceof _Plot ? node : null;
  }
  textContent(options = {}) {
    let { from = 0, to = this.length, blockSeparator = "\n", leafText } = options;
    let out = new TextOutput(blockSeparator, leafText == null ? void 0 : typeof leafText == "string" ? () => leafText : leafText);
    this.iterate(from, to, (node, pos) => {
      return !out.serialize(node.is(Leaf.Text) ? node.sliceText(Math.max(0, from - pos), Math.min(node.length, to - pos)) : node);
    });
    return out.text;
  }
  iterInner(contentStart, from, to, f) {
    for (let pos = contentStart, i = 0; i < this.content.length; i++) {
      if (pos >= to)
        break;
      let node = this.content[i], start = pos;
      pos += node.length;
      if (pos <= from)
        continue;
      if (f(node, start, this, i) !== false && node.isPlot)
        node.iterInner(start + 1, from, to, f);
    }
  }
  toString() {
    return this.name + markString(this.tag.marks) + "(" + this.content.join() + ")";
  }
  toJSON() {
    let result = this.tag.toJSON();
    result.content = this.content.map((c) => c.toJSON());
    return result;
  }
  mark(mark) {
    return this.tag.mark(mark);
  }
  pushTo(nodes) {
    nodes.push(this);
  }
  withMarks(marks) {
    return Mark.sameSet(this.tag.marks, marks) ? this : this.tag.withMarks(marks).create(this.content);
  }
  get tokenType() {
    return Token.Type.Node;
  }
  static define(name, spec) {
    return _Plot.Type.new(name, flagsFor(spec) | 16, spec).default;
  }
  static defineDoc(spec) {
    if (!spec.inlineContent && !spec.blockContent)
      throw new SchemaError("Doc nodes must allow content");
    let flags = 16 | 8 | 16;
    if (spec.inlineContent)
      flags |= 2;
    if (spec.inlineContent || spec.canBeEmpty)
      flags |= 64;
    return _Plot.Type.new("Doc", flags, {
      ...spec,
      shape: { element: "" }
    });
  }
};
Plot = function(Plot2) {
  Plot2.End = Token.End;
  class Tag extends BaseTag {
    constructor(type, param, marks) {
      super(param, marks);
      __publicField(this, "type");
      this.type = type;
    }
    static new(type, param, marks) {
      return new Tag(type, param, marks);
    }
    eq(other) {
      return this == other || other instanceof Plot2.Tag && this.type == other.type && compareDeep(this.param, other.param) && Mark.sameSet(this.marks, other.marks);
    }
    create(content) {
      if (this.isDoc)
        throw new Error("Document nodes must be created with schema.doc()");
      return Plot2.create(this, content ? joinText(content) : none);
    }
    withMarks(marks) {
      return Mark.sameSet(this.marks, marks) ? this : this.type.of(this.param, marks);
    }
    split(atEnd) {
      return this.marks.length ? this.withMarks(this.marks.filter((p) => {
        let { keepOnSplit } = p.type.spec;
        return keepOnSplit && (keepOnSplit === true || keepOnSplit(this, atEnd));
      })) : this;
    }
    get tokenType() {
      return Token.Type.Open;
    }
    get inlineContent() {
      return this.type.inlineContent;
    }
    get isTextblock() {
      return this.type.isTextblock;
    }
    get isLeaf() {
      return false;
    }
    get isPlot() {
      return true;
    }
    get isDoc() {
      return this.type.isDoc;
    }
    toString() {
      return this.type.name + markString(this.marks);
    }
  }
  Plot2.Tag = Tag;
  class Type extends BaseType {
    constructor(name, flags, spec) {
      super(name, flags, spec, NodeShape.from(name, false, spec.shape));
      __publicField(this, "default");
      __publicField(this, "isolating");
      __publicField(this, "defining");
      __publicField(this, "neutral");
      __publicField(this, "preserveWhitespace");
      __publicField(this, "orientation");
      __publicField(this, "spec");
      this.spec = spec;
      if (!spec.inlineContent && !spec.blockContent)
        throw new SchemaError("Plot definitions must specify either inlineContent or blockContent");
      this.isolating = !!spec.isolating;
      this.defining = !!spec.defining;
      this.neutral = spec.neutral ?? !this.defining;
      this.preserveWhitespace = spec.preserveWhitespace ?? !!this.hasRole(Node.Role.Code);
      this.orientation = flags & 2 ? "row" : spec.orientation || "column";
      this.default = "defaultParam" in spec ? Plot2.Tag.new(this, spec.defaultParam, none) : flags & 16 ? Plot2.Tag.new(this, null, none) : null;
      if (!this.shape.atom && this.isInline && !this.inlineContent)
        throw new SchemaError("Inline tags with block content must be marked as atoms");
    }
    static new(name, flags, spec) {
      return new Type(name, flags, spec);
    }
    static define(name, spec) {
      return new Plot2.Type(name, flagsFor(spec), spec);
    }
    of(param, marks = Mark.none) {
      if (!marks.length && this.default && compareDeep(this.default.param, param))
        return this.default;
      return Plot2.Tag.new(this, param, marks);
    }
    get inlineContent() {
      return (this.flags & 2) > 0;
    }
    get isTextblock() {
      return this.isBlock && this.inlineContent;
    }
    get isDoc() {
      return (this.flags & 8) > 0;
    }
    get isLeaf() {
      return false;
    }
    get isPlot() {
      return true;
    }
    get canBeEmpty() {
      return (this.flags & 64) > 0;
    }
  }
  Plot2.Type = Type;
  let validate2 = true;
  class Doc extends Plot2 {
    constructor(schema, children) {
      super(schema.docTag, children);
      __publicField(this, "schema");
      this.schema = schema;
      if (validate2)
        schema.validate(this);
    }
    static new(schema, children) {
      return new Doc(schema, children);
    }
    get length() {
      return this.contentLength;
    }
    slicePlot(content, from, to) {
      sliceContent(content, this.content, from, to);
    }
    resolve(pos) {
      return Pos.resolve(this, pos);
    }
    resolveNode(pos) {
      return Pos.resolveNode(this, pos);
    }
    resolvePlot(pos) {
      let r = this.resolveNode(pos);
      return r instanceof Pos.Plot ? r : null;
    }
    contextAt(pos, maxDepth) {
      for (let { parent } = this.resolve(pos), context = []; ; ) {
        if (!parent.parent || maxDepth != null && context.length == maxDepth)
          return context;
        context.push(parent.node.tag);
        parent = parent.parent;
      }
    }
    slice(from, to = this.length) {
      return this.sliceInner(from, to);
    }
    static noValidate(f) {
      let prev = validate2;
      validate2 = false;
      try {
        return f();
      } finally {
        validate2 = prev;
      }
    }
  }
  Plot2.Doc = Doc;
  ;
  return Plot2;
}(Plot);
function flagsFor(spec) {
  let flags = spec.inline ? 1 : 0;
  if (spec.inlineContent && spec.blockContent)
    throw new SchemaError("A tag cannot have both block and inline content");
  if (spec.inlineContent)
    flags |= 2;
  if (spec.inlineContent || spec.canBeEmpty)
    flags |= 64;
  if (spec.selectable)
    flags |= 32;
  return flags;
}
function markString(marks) {
  let values = [];
  for (let mark of marks) {
    if (mark.type.default == mark)
      values.push(mark.type.name);
    else
      values.push(`${mark.type.name}=${mark.value}`);
  }
  return values.length ? `[${values.join()}]` : "";
}
function sliceContent(out, content, from, to) {
  let off = 0;
  for (let child of content) {
    if (off >= to)
      break;
    let start = off;
    off += child.length;
    if (off <= from)
      continue;
    if (child.isPlot) {
      child.slicePlot(out, from - start, to - start);
    } else if (child.isText) {
      out.push(child.sliceText(from - start, to - start));
    } else {
      out.push(child);
    }
  }
}
function joinText(nodes) {
  if (!nodes.length || nodes[0].type.isBlock)
    return nodes;
  let joined;
  for (let i = 0, last = null; i < nodes.length; i++) {
    let node = nodes[i];
    if (node.is(Leaf.Text)) {
      if (last && Mark.sameSet(last.marks, node.marks)) {
        if (!joined)
          joined = nodes.slice(0, i);
        last = joined[joined.length - 1] = Leaf.text(last.param + node.param, node.marks);
        continue;
      } else {
        last = node;
      }
    } else {
      last = null;
    }
    if (joined)
      joined.push(node);
  }
  return joined || nodes;
}
var Schema = class _Schema {
  constructor(elements, nodes, marks, plotContent, markTarget, nodeGroup, docTag, lineBreak) {
    __publicField(this, "elements");
    __publicField(this, "nodes");
    __publicField(this, "marks");
    __publicField(this, "plotContent");
    __publicField(this, "markTarget");
    __publicField(this, "nodeGroup");
    __publicField(this, "docTag");
    __publicField(this, "lineBreak");
    __publicField(this, "nodesByName", /* @__PURE__ */ Object.create(null));
    __publicField(this, "marksByName", /* @__PURE__ */ Object.create(null));
    __publicField(this, "wrappingCache", /* @__PURE__ */ Object.create(null));
    __publicField(this, "validated", /* @__PURE__ */ new WeakSet());
    this.elements = elements;
    this.nodes = nodes;
    this.marks = marks;
    this.plotContent = plotContent;
    this.markTarget = markTarget;
    this.nodeGroup = nodeGroup;
    this.docTag = docTag;
    this.lineBreak = lineBreak;
    for (let tag of nodes)
      this.nodesByName[tag.name] = tag;
    for (let mark of marks)
      this.marksByName[mark.name] = mark;
  }
  doc(children) {
    return Plot.Doc.new(this, children);
  }
  validate(node) {
    if (this.validated.has(node))
      return;
    if (node.isLeaf) {
      this.validateTag(node);
    } else {
      this.validateTag(node.tag);
      if (!node.type.canBeEmpty && node.content.length == 0)
        throw new ValidationError(`Node ${node.name} with block content may not be empty`);
      for (let ch of node.content) {
        if (!this.canContain(node.type, ch.type) || node.inlineContent != ch.type.isInline)
          throw new ValidationError(`Node type ${node.name} cannot contain child ${ch.name}`);
        this.validate(ch);
      }
    }
    this.validated.add(node);
  }
  validateTag(tag) {
    if (this.nodesByName[tag.name] != tag.type)
      throw new ValidationError(`Tag type ${tag.name} not in schema`);
    for (let mark of tag.marks)
      this.validateMark(mark, tag.type);
  }
  validateMark(mark, node) {
    if (this.marksByName[mark.name] != mark.type)
      throw new ValidationError(`Mark type ${mark.name} not in schema`);
    if (!this.markAllowed(mark.type, node))
      throw new ValidationError(`Mark type ${mark.name} cannot target node ${node.name}`);
  }
  has(elt) {
    if (elt instanceof Mark || elt instanceof BaseTag)
      elt = elt.type;
    return (elt instanceof Mark.Type ? this.marksByName : this.nodesByName)[elt.name] == elt;
  }
  matchNode(node, q) {
    if (q instanceof Node.Group) {
      let groups = this.nodeGroup.get(node);
      return groups ? groups.has(q) : false;
    }
    if (q instanceof BaseType)
      return q == node;
    if (q instanceof BaseTag)
      return q.type == node;
    if ("and" in q)
      return q.and.every((q2) => this.matchNode(node, q2));
    return q.some((q2) => this.matchNode(node, q2));
  }
  markAllowed(mark, node) {
    let target = this.markTarget.get(mark);
    return target ? this.matchNode(node, target) : false;
  }
  sharesContent(a, b) {
    for (let tp of this.nodes)
      if (this.canContain(a, tp) && this.canContain(b, tp))
        return true;
    return false;
  }
  withMarksFrom(from, to) {
    if (!from.marks.length)
      return to;
    let marks = to.marks;
    for (let mark of from.marks)
      if (this.markAllowed(mark.type, to.type) && (mark.type.set || !mark.isInSet(marks))) {
        let { keepOnTypeChange } = mark.type.spec;
        if (keepOnTypeChange && (keepOnTypeChange === true || keepOnTypeChange(from, to)))
          marks = mark.addToSet(marks);
      }
    return to.withMarks(marks);
  }
  canContain(parent, child) {
    if (child.isPlot && child.isDoc)
      return false;
    let content = this.plotContent.get(parent);
    return content ? this.matchNode(child, content) : false;
  }
  defaultContentTag(parent) {
    for (let tag of this.nodes)
      if (tag.default && this.canContain(parent, tag))
        return tag.default;
    return null;
  }
  defaultContentPlot(parent) {
    for (let tag of this.nodes)
      if (tag.default && tag.isPlot && this.canContain(parent, tag))
        return tag.default;
    return null;
  }
  createDefault(parent) {
    let child = this.defaultContentTag(parent);
    if (!child)
      throw new Error(`No defaultable child node for ${parent.name}`);
    return this.createAndFill(child);
  }
  createAndFill(parent) {
    if (parent.isLeaf)
      return parent;
    return parent.create(parent.type.canBeEmpty ? [] : [this.createDefault(parent.type)]);
  }
  findWrapping(parent, child) {
    let key = `${parent.name}-${child.name}`, cached = this.wrappingCache[key];
    if (cached !== void 0)
      return cached;
    return this.wrappingCache[key] = this.findWrappingInner(parent, child);
  }
  findWrappingInner(parent, child) {
    let seen = /* @__PURE__ */ new Set(), work = [[]];
    for (let i = 0; i < work.length; i++) {
      let path = work[i], at = path.length ? path[path.length - 1].type : parent;
      for (let tag of this.nodes)
        if (this.canContain(at, tag)) {
          if (tag == child)
            return path;
          if (!seen.has(tag) && !tag.isLeaf && tag.default) {
            seen.add(tag);
            work.push(path.concat(tag.default));
          }
        }
    }
    return null;
  }
  getMark(name) {
    return this.marksByName[name];
  }
  getNode(name) {
    return this.nodesByName[name];
  }
  static define(spec) {
    let cached = findCachedSchema(spec);
    if (cached)
      return cached;
    let tags = [Leaf.Text], marks = [];
    let defaultI = 0;
    let tagNames = /* @__PURE__ */ new Set(), markNames = /* @__PURE__ */ new Set();
    let plotContent = /* @__PURE__ */ new Map();
    let markTarget = /* @__PURE__ */ new Map();
    let nodeGroup = /* @__PURE__ */ new Map();
    nodeGroup.set(Leaf.Text, /* @__PURE__ */ new Set([Node.Group.Inline, Node.Group.Leaf, Node.Group.All]));
    let overrides = spec.filter((e) => e instanceof _Schema.Override).reverse();
    let elements = [];
    for (let e of spec) {
      let elt = normalizeElt(e);
      elements.push(elt);
      if (elt instanceof Plot.Type || elt instanceof Leaf.Type) {
        if (tags.includes(elt))
          continue;
        if (tagNames.has(elt.name))
          throw new SchemaError(`Duplicate use of tag name ${elt.name} in schema`);
        tagNames.add(elt.name);
        if (elt.isPlot) {
          let content = elt.spec.inlineContent === true ? Node.Group.Inline : elt.spec.inlineContent || elt.spec.blockContent;
          for (let o of overrides)
            if (o.type == elt && o.content)
              content = o.content(content);
          plotContent.set(elt, content);
        }
        if (elt.isPlot && elt.spec.defaultBlock)
          tags.splice(defaultI++, 0, elt);
        else
          tags.push(elt);
        let groups = /* @__PURE__ */ new Set();
        groups.add(Node.Group.All);
        groups.add(elt.isInline ? Node.Group.Inline : Node.Group.Block);
        groups.add(elt.isLeaf ? Node.Group.Leaf : Node.Group.Plot);
        if (elt.isPlot && elt.isBlock && elt.inlineContent)
          groups.add(Node.Group.Textblock);
        let given = elt.spec.group instanceof Node.Group ? [elt.spec.group] : elt.spec.group;
        for (let o of overrides)
          if (o.type == elt && o.group)
            given = o.group;
        if (given)
          for (let g of given)
            for (let cur = g; cur; cur = cur.parent) {
              if (!Node.Group.builtin.includes(cur))
                groups.add(cur);
            }
        nodeGroup.set(elt, groups);
      } else if (elt instanceof Mark.Type) {
        if (marks.includes(elt))
          continue;
        if (markNames.has(elt.name))
          throw new SchemaError(`Duplicate use of mark name ${elt.name} in schema`);
        let target = elt.spec.target || { and: [Node.Group.Inline, Node.Group.Leaf] };
        for (let o of overrides)
          if (o.type == elt && o.target)
            target = o.target(target);
        markTarget.set(elt, target);
        markNames.add(elt.name);
        marks.push(elt);
      } else if (!(elt instanceof _Schema.Override)) {
        throw new SchemaError("Unexpected schema element type. You may have multiple versions of @wordgard/doc loaded");
      }
    }
    let docType = null;
    let lineBreak = null;
    for (let tag of tags) {
      if (tag.isLeaf) {
        if (tag.hasRole(Node.Role.LineBreak)) {
          if (tag.isBlock || !tag.default)
            throw new SchemaError("Line break tags must be inline leaves with a default param");
          if (lineBreak)
            throw new SchemaError("Multiple line break tags provided");
          lineBreak = tag.default;
        }
      } else {
        if (tag.isDoc) {
          if (docType)
            throw new SchemaError("Multiple document types specified");
          docType = tag;
        }
      }
    }
    if (!docType)
      throw new SchemaError("A schema must define a document type");
    let schema = new _Schema(elements, tags, marks, plotContent, markTarget, nodeGroup, docType.default, lineBreak);
    for (let tag of tags)
      if (tag.isPlot) {
        let sawDefaultable = false;
        for (let child of tags)
          if (schema.canContain(tag, child)) {
            if (child.default)
              sawDefaultable = true;
            if (child.isInline != tag.inlineContent)
              throw new SchemaError(`Node type ${tag.name} has ${tag.inlineContent ? "block" : "inline"} content, but allows ${child.name} as a child`);
          }
        if (!tag.canBeEmpty && !sawDefaultable)
          throw new SchemaError(`Node ${tag.name} has required content, but all possible children require non-default parameters`);
      }
    schemaCache.set(spec, new WeakRef(schema));
    return schema;
  }
  nodeFromJSON(json) {
    let tag = this.tagFromJSON(json), children = none;
    if (tag.isLeaf)
      return tag;
    if (json.content && Array.isArray(json.content))
      children = json.content.map((c) => this.nodeFromJSON(c));
    if (tag.type.isDoc)
      return this.doc(children);
    return tag.create(children);
  }
  tagFromJSON(json) {
    if (!json || typeof json != "object" || !(json.type in this.nodesByName))
      throw new ValidationError("Invalid tag JSON");
    let type = this.nodesByName[json.type];
    let marks = json.marks ? this.marksFromJSON(json.marks) : none;
    let tag = "param" in json ? type.of(validate(type.spec.validate, json.param), marks) : !type.default ? null : marks.length ? type.of(type.default.param, marks) : type.default;
    if (!tag)
      throw new ValidationError(`Missing param for tag type ${type.name}`);
    return tag;
  }
  marksFromJSON(json) {
    if (!json || typeof json != "object")
      throw new ValidationError("Invalid mark JSON");
    let marks = none;
    for (let name in json) {
      let mark = this.marksByName[name];
      if (!mark)
        throw new ValidationError(`Unrecognized mark ${name} in JSON`);
      marks = mark.of(validate(mark.spec.validate, json[name])).addToSet(marks);
    }
    return marks;
  }
  docFromJSON(json) {
    if (!json || json.type != this.docTag.name)
      throw new ValidationError("Invalid document JSON");
    return this.nodeFromJSON(json);
  }
};
var schemaCache = /* @__PURE__ */ (() => /* @__PURE__ */ new Map())();
function findCachedSchema(spec) {
  search: for (let [elts, ref] of schemaCache) {
    let active = ref.deref();
    if (!active) {
      schemaCache.delete(elts);
    } else if (elts.length == spec.length) {
      for (let i = 0; i < spec.length; i++) {
        let a = normalizeElt(spec[i]), b = normalizeElt(elts[i]);
        if (a != b && !(a instanceof Schema.Override && b instanceof Schema.Override && a.eq(b)))
          continue search;
      }
      return active;
    }
  }
}
function normalizeElt(elt) {
  return elt instanceof Plot.Tag || elt instanceof Leaf || elt instanceof Mark ? elt.type : elt;
}
Schema = function(Schema2) {
  class Override {
    constructor(type, target, content, group) {
      __publicField(this, "type");
      __publicField(this, "target");
      __publicField(this, "content");
      __publicField(this, "group");
      this.type = type;
      this.target = target;
      this.content = content;
      this.group = group;
    }
    eq(other) {
      return this == other || this.type == other.type && this.target == other.target && this.content == other.content && this.group == other.group;
    }
    static markTarget(mark, target) {
      return new Schema2.Override(mark instanceof Mark.Type ? mark : mark.type, typeof target == "function" ? target : () => target);
    }
    static plotContent(plot, content) {
      return new Schema2.Override(plot instanceof Plot.Tag ? plot.type : plot, void 0, typeof content == "function" ? content : () => content);
    }
    static nodeGroup(node, group) {
      return new Schema2.Override(node instanceof BaseTag ? node.type : node, void 0, void 0, group instanceof Node.Group ? [group] : group);
    }
  }
  Schema2.Override = Override;
  ;
  return Schema2;
}(Schema);
var BuildContext = class {
  constructor(tag, parent) {
    __publicField(this, "tag");
    __publicField(this, "parent");
    __publicField(this, "children", []);
    this.tag = tag;
    this.parent = parent;
  }
};
var Builder = class {
  constructor(doc) {
    __publicField(this, "stack");
    __publicField(this, "modifications", null);
    __publicField(this, "schema");
    this.schema = doc.schema;
    this.stack = new BuildContext(doc.tag, null);
  }
  add(node) {
    if (this.modifications) {
      if (node.isPlot)
        throw new ValidationError("Invalid modification on non-leaf node");
      node = node.withMarks(applyModifications(this.modifications, node.marks, node.type));
    }
    node.pushTo(this.stack.children);
  }
  enterPlot(plot) {
    this.open(plot.tag);
  }
  leavePlot() {
    if (this.modifications)
      throw new ValidationError("Invalid modification on close token");
    if (!this.stack.parent)
      throw new ValidationError("Surplus close token after " + this.stack.children);
    let top = this.stack;
    this.stack = this.stack.parent;
    this.add(top.tag.create(top.children));
  }
  skip(node) {
    this.add(node);
  }
  open(tag) {
    if (this.modifications)
      tag = tag.withMarks(applyModifications(this.modifications, tag.marks, tag.type));
    this.stack = new BuildContext(tag, this.stack);
  }
  close() {
    this.leavePlot();
  }
  node(node) {
    this.skip(node);
  }
  finish() {
    if (this.stack.parent)
      throw new ValidationError("Invalid change");
    return this.schema.doc(this.stack.children);
  }
};
function isAdd(m) {
  return !!m.add;
}
function isRemove(m) {
  return !!m.remove;
}
function applyModifications(modifications, marks, type) {
  for (const m of modifications) {
    if (isAdd(m)) {
      marks = m.add.addToSet(marks);
    } else {
      marks = m.remove.removeFromSet(marks);
    }
  }
  return marks;
}
function modificationToJSON(m) {
  return isAdd(m) ? { add: m.add.name, value: m.add.value } : { remove: m.remove.name, value: m.remove.value };
}
function modificationFromJSON(schema, json) {
  let { add, remove: remove2 } = json;
  if (typeof add == "string" || typeof remove2 == "string") {
    let mark = schema.getMark(add || remove2);
    if (!mark)
      throw new ValidationError(`Unknown mark ${add || remove2}`);
    let value = mark.of(validate(mark.spec.validate, json.value));
    if (mark)
      return add ? { add: value } : { remove: value };
  }
  throw new ValidationError("Invalid modification JSON");
}
function compareModifications(a, b) {
  if (a == b)
    return true;
  if (a.length != b.length)
    return false;
  for (let i = 0; i < a.length; i++)
    if (!compareModification(a[i], b[i]))
      return false;
  return true;
}
function compareModification(a, b) {
  return isAdd(a) ? isAdd(b) && a.add.eq(b.add) : isRemove(b) && a.remove.eq(b.remove);
}
function isNatNum(value) {
  return typeof value == "number" && Math.floor(value) == value && value >= 0;
}
var applyCache = /* @__PURE__ */ (() => /* @__PURE__ */ new WeakMap())();
var ChangeSet = class _ChangeSet {
  constructor(sections, data) {
    __publicField(this, "sections");
    __publicField(this, "data");
    __publicField(this, "_length", -1);
    __publicField(this, "_newLength", -1);
    this.sections = sections;
    this.data = data;
  }
  static new(sections, data) {
    return new _ChangeSet(sections, data);
  }
  get length() {
    if (this._length < 0) {
      this._length = 0;
      for (let i = 0; i < this.sections.length; i += 2)
        this._length += this.sections[i];
    }
    return this._length;
  }
  get newLength() {
    if (this._newLength < 0) {
      this._newLength = 0;
      for (let i = 0; i < this.sections.length; i += 2) {
        let ins = this.sections[i + 1];
        this._newLength += ins < 0 ? this.sections[i] : ins;
      }
    }
    return this._newLength;
  }
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  eq(other) {
    if (other.sections.length != this.sections.length)
      return false;
    for (let i = 0; i < this.sections.length; i++)
      if (this.sections[i] != other.sections[i])
        return false;
    for (let i = 0; i < this.data.length; i++) {
      let a = this.data[i], b = other.data[i];
      if (a && !(this.sections[(i << 1) + 1] < 0 ? compareModifications(a, b) : a.eq(b)))
        return false;
    }
    return true;
  }
  apply(doc) {
    if (this.length != doc.length)
      throw new ValidationError(`Trying to apply change of length ${this.length} to doc of length ${doc.length}`);
    if (this.empty)
      return doc;
    let cached = applyCache.get(this);
    if (cached && doc.eq(cached.a))
      return cached.b;
    let builder = new Builder(doc);
    let cursor = doc.resolve(0);
    for (let i = 0, iS = 0; i < this.data.length; i++) {
      let lenA = this.sections[iS++], lenB = this.sections[iS++];
      if (lenB < 0) {
        builder.modifications = this.data[i];
        cursor = cursor.advance(lenA, builder);
        builder.modifications = null;
      } else {
        cursor = cursor.advance(lenA);
        this.data[i].run(builder);
      }
    }
    if (cursor.pos != doc.length)
      throw new ValidationError("Change doesn't cover the entire document");
    let newDoc = builder.finish();
    applyCache.set(this, { a: doc, b: newDoc });
    return newDoc;
  }
  toJSON() {
    let result = [];
    for (let i = 0; i < this.data.length; i++) {
      let len = this.sections[i << 1], ins = this.sections[(i << 1) + 1];
      if (ins == -1)
        result.push(len);
      else if (ins == -2)
        result.push([len, this.data[i].map(modificationToJSON)]);
      else
        result.push([len, this.data[i].toJSON()]);
    }
    return result;
  }
  static fromJSON(schema, json) {
    if (!Array.isArray(json))
      throw new ValidationError("Invalid ChangeSet JSON");
    let sections = [], data = [];
    for (let elt of json) {
      if (isNatNum(elt)) {
        sections.push(elt, -1);
        data.push(null);
      } else {
        if (!Array.isArray(elt) || elt.length != 2 || !isNatNum(elt[0]) || !Array.isArray(elt[1]))
          throw new ValidationError("Invalid ChangeSet JSON");
        let [len, val] = elt;
        if (val.length && typeof val[0] == "object" && ("add" in val[0] || "remove" in val[0])) {
          sections.push(len, -2);
          data.push(val.map((m) => modificationFromJSON(schema, m)));
        } else {
          let slice = Slice.fromJSON(schema, val);
          sections.push(len, slice.length);
          data.push(slice);
        }
      }
    }
    return new _ChangeSet(sections, data);
  }
  transform(doc, other, before = false) {
    let { set, fix } = transform(this, other, doc, before, true);
    return fix ? set.compose(fix) : set;
  }
  compose(other) {
    let { sections, data } = compose(this.sections, other.sections, this.data, other.data);
    return new _ChangeSet(sections, data);
  }
  invert(doc) {
    let sections = [], data = [];
    for (let i = 0, iS = 0, pos = 0; iS < this.sections.length; iS += 2, i++) {
      let len = this.sections[iS], ins = this.sections[iS + 1];
      if (ins >= 0) {
        addSection(sections, data, ins, len, doc.slice(pos, pos + len));
      } else {
        let mods = this.data[i];
        let at = pos, end = pos + len;
        if (mods)
          doc.iterate(pos, end, (node, nodePos) => {
            if (node.isLeaf || nodePos >= pos && nodePos < end) {
              let [from, to] = node.isText ? [Math.max(at, nodePos), Math.min(end, nodePos + node.length)] : [nodePos, nodePos + 1];
              if (at < from)
                addSection(sections, data, from - at, -1, null);
              addSection(sections, data, to - from, -2, invertMods(mods, node.tag));
              at = to;
            }
          });
        if (at < end)
          addSection(sections, data, end - at, -1, null);
      }
      pos += len;
    }
    return new _ChangeSet(sections, data);
  }
  correct(doc, local = false) {
    let fitter = new ChangeFitter(doc, local);
    for (let i = 0, iS = 0, pos = 0; i < this.data.length; i++) {
      let len = this.sections[iS++], ins = this.sections[iS++];
      if (ins < 0)
        fitter.preserved(pos, pos += len);
      else
        fitter.replaced(this.data[i], pos, pos += len);
    }
    let fit = fitter.finish();
    return fit ? this.compose(fit) : this;
  }
  mapPos(pos, assoc = -1, track) {
    let posA = 0, posB = 0;
    for (let i = 0; i < this.sections.length; ) {
      let len = this.sections[i++], type = this.sections[i++], endA = posA + len;
      if (type < 0) {
        if (endA > pos)
          return posB + (pos - posA);
        posB += len;
      } else {
        if (track && endA >= pos && (track == "around" && posA < pos && endA > pos || track == "before" && posA < pos || track == "after" && endA > pos))
          return null;
        if (endA > pos || endA == pos && assoc < 0 && !len)
          return pos == posA || assoc < 0 ? posB : posB + type;
        posB += type;
      }
      posA = endA;
    }
    if (pos > posA)
      throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);
    return posB;
  }
  findInserted(pred) {
    let found = null;
    this.iterChanges((_f, _t, pos, _to, inserted) => {
      if (found != null)
        return;
      for (let tok of inserted.content) {
        if (tok.tokenType == Token.Type.Node) {
          if (pred(tok.tag))
            return found = pos;
          pos += tok.length;
        } else {
          if (tok.tokenType == Token.Type.Open && pred(tok))
            return found = pos;
          pos++;
        }
      }
    });
    return found;
  }
  touchesRange(from, to) {
    for (let i = 0, pos = 0; i < this.sections.length && pos <= to; ) {
      let len = this.sections[i++], ins = this.sections[i++], end = pos + len;
      if (ins >= 0 && pos <= to && end >= from)
        return pos < from && end > to ? "cover" : true;
      pos = end;
    }
    return false;
  }
  iterChanges(replaced, preserved) {
    for (let posA = 0, posB = 0, i = 0, iS = 0; i < this.data.length; ) {
      let len = this.sections[iS++], ins = this.sections[iS++], data = this.data[i++];
      if (ins < 0) {
        if (preserved)
          preserved(posA, posA + len, posB, posB + len, data);
        posA += len;
        posB += len;
      } else {
        replaced(posA, posA += len, posB, posB += ins, data);
      }
    }
  }
  iterGaps(gap, change) {
    for (let i = 0, posA = 0, posB = 0; i < this.sections.length; ) {
      let len = this.sections[i++], ins = this.sections[i++];
      if (ins < 0) {
        while (i < this.sections.length && this.sections[i + 1] < 0) {
          len += this.sections[i];
          i += 2;
        }
        gap(posA, posA + len, posB, posB + len);
        posB += len;
      } else {
        while (i < this.sections.length && this.sections[i + 1] >= 0) {
          len += this.sections[i++];
          ins += this.sections[i++];
        }
        if (change)
          change(posA, posA + len, posB, posB + ins);
        posB += ins;
      }
      posA += len;
    }
  }
  iterChangedRanges(range) {
    for (let i = 0, posA = 0, posB = 0; i < this.sections.length; ) {
      let len = this.sections[i++], ins = this.sections[i++];
      if (ins == -1) {
        posB += len;
      } else {
        if (ins == -2)
          ins = len;
        while (i < this.sections.length && this.sections[i + 1] != -1) {
          let addLen = this.sections[i++], addIns = this.sections[i++];
          len += addLen;
          ins += addIns == -2 ? addLen : addIns;
        }
        range(posA, posA + len, posB, posB + ins);
        posB += ins;
      }
      posA += len;
    }
  }
  pad(before, after) {
    if (this.empty)
      return _ChangeSet.empty(this.length + before + after);
    let sections = this.sections.slice(), data = this.data.slice();
    if (before) {
      if (sections[1] == -1) {
        sections[0] += before;
      } else {
        sections.splice(0, 0, before, -1);
        data.splice(0, 0, null);
      }
    }
    if (after) {
      if (sections[sections.length - 1] == -1) {
        sections[sections.length - 2] += after;
      } else {
        sections.push(after, -1);
        data.push(null);
      }
    }
    return new _ChangeSet(sections, data);
  }
  clip(from, to) {
    let sections = [], data = [];
    for (let i = 0, pos = 0; i < this.sections.length && pos <= to; ) {
      let value = this.data[i >> 1], len = this.sections[i++], ins = this.sections[i++];
      let end = pos + len;
      if (ins > 0) {
        if (pos >= from && end <= to)
          addSection(sections, data, end - pos, ins, value);
        else if (end > from && pos < from)
          return null;
      } else if (pos < to && end > from) {
        addSection(sections, data, Math.min(end, to) - Math.max(pos, from), ins, value);
      }
      pos = end;
    }
    return new _ChangeSet(sections, data);
  }
  static create(doc, spec) {
    return createChangeSet(doc, spec);
  }
  static empty(length) {
    return length ? new _ChangeSet([length, -1], [null]) : new _ChangeSet([], []);
  }
  toString() {
    let result = "";
    for (let i = 0, iS = 0, pos = 0; i < this.data.length; i++) {
      let len = this.sections[iS++], ins = this.sections[iS++], data = this.data[i];
      let text = "";
      if (ins >= 0) {
        text += data;
      } else if (data) {
        text += `[${data.map((mod) => {
          return `${isAdd(mod) ? "+" + mod.add : "-" + mod.remove}`;
        })}]`;
      }
      if (text)
        result += `${result ? "," : ""}${pos}${len ? `-${pos + len}` : ""}${text}`;
      pos += len;
    }
    return result;
  }
  static composeSections(a, b) {
    return compose(a, b).sections;
  }
  static transform(doc, a, b) {
    let { set: mA, fix } = transform(a, b, doc, true, true);
    let mB = transform(b, a, doc, false, false).set;
    return fix ? { a: mA.compose(fix), b: mB.compose(fix) } : { a: mA, b: mB };
  }
};
var ChangeSetBuilder = class {
  constructor(docLen) {
    __publicField(this, "docLen");
    __publicField(this, "sections", []);
    __publicField(this, "data", []);
    __publicField(this, "pos", 0);
    this.docLen = docLen;
  }
};
function createChangeSet(doc, spec, mayCorrect = true) {
  let cur = null;
  let accum = null;
  let doCorrect = false;
  let flush = () => {
    if (cur) {
      if (cur.pos < cur.docLen)
        addSection(cur.sections, cur.data, cur.docLen - cur.pos, -1, null);
      push(ChangeSet.new(cur.sections, cur.data));
      cur = null;
    }
  };
  let push = (set) => {
    accum = accum ? accum.compose(transform(set, accum, doc, false, false).set) : set;
  };
  let section = (from, to, ins, value) => {
    if (!cur || from < cur.pos) {
      flush();
      cur = new ChangeSetBuilder(doc.length);
    }
    if (from > cur.pos)
      addSection(cur.sections, cur.data, from - cur.pos, -1, null);
    addSection(cur.sections, cur.data, to - from, ins, value);
    cur.pos = to;
  };
  let build = (spec2) => {
    if (Array.isArray(spec2)) {
      for (let elt of spec2)
        build(elt);
    } else if (spec2 instanceof ChangeSet) {
      flush();
      push(spec2);
    } else if ("correct" in spec2) {
      flush();
      let { correct, local } = spec2;
      let inner = createChangeSet(doc, correct, false);
      push(mayCorrect || local ? inner.correct(doc, local) : inner);
    } else {
      let { from, to, add, remove: remove2, insert, fit } = spec2;
      let modifies = add || remove2;
      if (modifies) {
        if (insert)
          throw new ValidationError(`A Change object cannot both ${add ? "add" : "remove"} a mark and replace a range`);
        if (to == null)
          to = from + 1;
        if (add) {
          let mods = [{ add }];
          markableSections(doc, from, to, add.type.spanning, (node, from2, to2) => {
            if (!doc.schema.markAllowed(add.type, node.type))
              return false;
            let has = add.type.isInSet(node.tag.marks);
            if (add.type.set) {
              let modsHere = mods;
              if (has) {
                let left = subtractSet(add.value, has.value, add.type.set);
                if (!left.length)
                  return false;
                modsHere = [{ add: add.type.of(left) }];
              }
              section(from2, to2, -2, modsHere);
            } else if (!has || !has.eq(add)) {
              section(from2, to2, -2, mods);
            }
            return true;
          });
        }
        if (remove2) {
          let mods = [{ remove: remove2 }];
          markableSections(doc, from, to, remove2.type.spanning, (node, from2, to2) => {
            const has = remove2.isInSet(node.tag.marks);
            if (!has || !doc.schema.markAllowed(remove2.type, node.type))
              return false;
            let modsHere = mods;
            if (remove2.type.set) {
              let left = subtractSet(remove2.value, has.value, remove2.type.set);
              if (!left.length)
                return false;
              modsHere = [{ remove: remove2.type.of(left) }];
            }
            section(from2, to2, -2, modsHere);
            return true;
          });
        }
      } else {
        if (to == null)
          to = from;
        insert = !insert ? Slice.empty : Array.isArray(insert) ? Slice.of(insert) : insert;
        if (to <= from)
          to = from;
        if (fit) {
          doCorrect = true;
          ({ from, to, slice: insert } = fitReplacement(doc, doc.resolve(from), doc.resolve(to), insert, fit === true ? [] : fit));
        }
        if (insert.length || to != from)
          section(from, to, insert.length, insert);
      }
    }
  };
  build(spec);
  flush();
  return !accum ? ChangeSet.empty(doc.length) : doCorrect && mayCorrect ? accum.correct(doc) : accum;
}
function transform(setA, setB, doc, before, fit) {
  if (setA.length != doc.length || setB.length != doc.length)
    throw new ValidationError("Transforming a change that doesn't match the start document");
  let sections = [], data = [];
  let fitter = fit ? new ChangeFitter(doc, false) : null;
  let a = new SectionIter(setA.sections, setA.data), b = new SectionIter(setB.sections, setB.data), pos = 0;
  for (let inserted = -1; ; ) {
    if (a.keep && b.keep) {
      let len = Math.min(a.len, b.len);
      let mods = before ? a.mods : filterMods(a.mods, b.mods);
      addSection(sections, data, len, mods ? -2 : -1, mods);
      a.forward(len);
      b.forward(len);
      if (fitter)
        fitter.preserved(pos, pos + len);
      pos += len;
    } else if (b.ins >= 0 && (a.ins < 0 || inserted == a.i || a.off == 0 && (b.len < a.len || b.len == a.len && !before))) {
      let end = pos + b.len;
      addSection(sections, data, b.ins, -1, null);
      if (fitter)
        fitter.replaced(b.slice, pos, end, true);
      while (pos < end) {
        if (a.done)
          throw new ValidationError("Mismatched change sets");
        let piece = Math.min(a.len, end - pos);
        if (a.ins >= 0 && inserted < a.i && a.len <= piece) {
          addSection(sections, data, 0, a.ins, a.slice);
          if (fitter)
            fitter.replaced(a.slice, pos - a.off, pos + a.len);
          inserted = a.i;
        }
        a.forward(piece);
        pos += piece;
      }
      b.next();
    } else if (a.ins >= 0) {
      let start = pos, end = pos + a.len, len = 0;
      while (pos < end) {
        if (b.keep) {
          let piece = Math.min(end - pos, b.len);
          pos += piece;
          len += piece;
          b.forward(piece);
        } else if (b.ins == 0 && pos + b.len < end) {
          if (fitter)
            fitter.replaced(b.slice, pos, pos + b.len, true);
          pos += b.len;
          b.next();
        } else {
          break;
        }
      }
      if (inserted < a.i) {
        addSection(sections, data, len, a.ins, a.slice);
        if (fitter)
          fitter.replaced(a.slice, start - a.off, start + a.len);
        inserted = a.i;
      } else {
        addSection(sections, data, len, 0, Slice.empty);
      }
      a.forward(pos - start);
    } else {
      return {
        set: ChangeSet.new(sections, data),
        fix: fitter && fitter.finish()
      };
    }
  }
}
function compose(sectionsA, sectionsB, dataA, dataB) {
  let sections = [], data = dataA ? [] : null;
  let a = new SectionIter(sectionsA, dataA), b = new SectionIter(sectionsB, dataB);
  for (let open = false; ; ) {
    if (a.done && b.done) {
      return { sections, data };
    } else if (a.ins == 0) {
      addSection(sections, data, a.len, 0, a.slice, open);
      a.next();
    } else if (b.len == 0 && !b.done) {
      addSection(sections, data, 0, b.ins, b.slice, open);
      b.next();
    } else if (a.done || b.done) {
      throw new ValidationError("Mismatched change set lengths");
    } else {
      let len = Math.min(a.len2, b.len), sectionLen = sections.length;
      if (a.keep && b.keep) {
        let mods = combineMods(a.mods, b.mods);
        addSection(sections, data, len, (data ? mods : a.ins == -2 || b.ins == -2) ? -2 : -1, mods, open);
      } else if (a.keep) {
        addSection(sections, data, len, b.off ? 0 : b.ins, b.off ? Slice.empty : b.slice, open);
      } else if (b.keep) {
        addSection(sections, data, a.off ? 0 : a.len, len, data ? applyModsToSlice(a.slicePart(len), b.mods) : null, open);
      } else {
        addSection(sections, data, a.off ? 0 : a.len, b.off ? 0 : b.ins, b.off ? Slice.empty : b.slice, open);
      }
      open = (a.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
      a.forward2(len);
      b.forward(len);
    }
  }
}
function combineMods(a, b) {
  return !a ? b : !b ? a : a.concat(b);
}
function filterMods(mods, against) {
  if (!mods || !against)
    return mods;
  return mods.filter((m) => !against.some((a) => modCancels(a, m)));
}
function modCancels(mod, other) {
  if (isAdd(other)) {
    return isAdd(mod) ? mod.add.type == other.add.type && !mod.add.type.set : mod.remove.eq(other.add);
  } else {
    return isAdd(mod) && mod.add.eq(isAdd(other) ? other.add : other.remove);
  }
}
function invertMods(mods, target) {
  return mods.map((mod) => {
    if (isRemove(mod))
      return { add: mod.remove };
    if (!mod.add.type.set) {
      let existed = mod.add.type.isInSet(target.marks);
      if (existed)
        return { add: existed };
    }
    return { remove: mod.add };
  });
}
function applyModsToSlice(slice, mods) {
  if (!mods)
    return slice;
  let content = [];
  for (let tok of slice.content) {
    if (tok.tokenType == Token.Type.Open) {
      content.push(tok.withMarks(applyModifications(mods, tok.marks, tok.type)));
    } else if (tok.tokenType == Token.Type.Node) {
      let node = tok.withMarks(applyModifications(mods, tok.marks, tok.type));
      if (content.length && content[content.length - 1].tokenType == Token.Type.Node)
        node.pushTo(content);
      else
        content.push(node);
    } else {
      content.push(tok);
    }
  }
  return Slice.of(content);
}
var FitLevel = class {
  constructor(tag, next) {
    __publicField(this, "tag");
    __publicField(this, "next");
    __publicField(this, "flags", 0);
    this.tag = tag;
    this.next = next;
    if (!this.tag.type.canBeEmpty)
      this.flags |= 1;
  }
};
var counter = {
  count: 0,
  skip() {
  },
  enterPlot() {
    this.count++;
  },
  leavePlot() {
    this.count--;
  },
  countDelta(pos, distance) {
    this.count = 0;
    return pos.advance(distance, this);
  }
};
var ChangeFitter = class {
  constructor(doc, local) {
    __publicField(this, "local");
    __publicField(this, "stack");
    __publicField(this, "inputPos");
    __publicField(this, "delInputPos");
    __publicField(this, "pos", 0);
    __publicField(this, "patches", []);
    __publicField(this, "stackDelta", 0);
    __publicField(this, "inputDelta", 0);
    __publicField(this, "inserting", false);
    __publicField(this, "activeContext", null);
    __publicField(this, "activeContextPos", -1);
    __publicField(this, "nextSync", -1);
    __publicField(this, "schema");
    __publicField(this, "lastCoverFrom", -1);
    __publicField(this, "lastCoverTo", -1);
    __publicField(this, "doubleDeleteDelta", 0);
    this.local = local;
    this.schema = doc.schema;
    this.stack = new FitLevel(doc.tag, null);
    this.inputPos = this.delInputPos = doc.resolve(0);
  }
  getPos(at) {
    let { inputPos, delInputPos } = this;
    if (inputPos.pos == at)
      return inputPos;
    if (delInputPos.pos == at)
      return delInputPos;
    return inputPos.advance(at - inputPos.pos);
  }
  preserved(from, to) {
    let { nextSync } = this;
    if (nextSync >= from && nextSync <= to) {
      this.stackDelta = 0;
      this.nextSync = -1;
      if (nextSync > from)
        this.preserved(from, nextSync);
      this.syncToContext(this.inputPos);
      if (to > nextSync)
        this.preserved(nextSync, to);
      return;
    }
    let inputPos = this.getPos(from);
    if (!this.inputDelta && this.stackDelta) {
      this.syncToContext(inputPos);
      this.stackDelta = 0;
    }
    this.activeContext = inputPos;
    this.activeContextPos = this.pos;
    this.inputPos = inputPos.advance(to - from, this);
  }
  replaced(slice, from, to, covering = false) {
    this.doubleDeleteDelta = 0;
    if (covering) {
      this.lastCoverFrom = from;
      this.lastCoverTo = to;
    } else if (slice.length) {
      let overlapFrom = Math.max(from, this.lastCoverFrom);
      let overlapTo = Math.min(to, this.lastCoverTo);
      if (overlapFrom < overlapTo) {
        counter.countDelta(this.getPos(overlapFrom), overlapTo - overlapFrom);
        this.doubleDeleteDelta = counter.count;
      }
    }
    if (from != to) {
      this.delInputPos = counter.countDelta(this.getPos(from), to - from);
      this.inputDelta -= counter.count;
    }
    this.inserting = true;
    slice.run(this, this.pos);
    this.inserting = false;
    if (this.local)
      this.nextSync = Math.max(this.nextSync, localSyncPosAfter(this.inputPos = this.getPos(to)));
  }
  fit(tag) {
    var _a;
    if (this.schema.canContain(this.stack.tag.type, tag.type))
      return true;
    let fix = null;
    let dDelta = this.stackDelta - this.inputDelta;
    for (let level = this.stack, leave = 0, leaveCost = 0; level; level = level.next, leave++) {
      if (fix && leaveCost > fix.cost)
        break;
      let enter = this.schema.findWrapping(level.tag.type, tag.type);
      if (enter) {
        let cost = leaveCost + enter.length * 2 - Math.max(0, Math.min(-dDelta, enter.length));
        if (!fix || fix.cost > cost && !fix.context)
          fix = { leave, enter, cost, context: false };
      }
      if (this.activeContextPos == this.pos) {
        let top = ((_a = this.activeContext) == null ? void 0 : _a.parent) || null;
        for (let cx = top, i = 1; cx; cx = cx.parent, i++) {
          if (this.schema.canContain(level.tag.type, cx.node.type)) {
            let cost = leaveCost + i * 2 - Math.max(0, Math.min(-dDelta, i));
            if (!fix || fix.cost > cost || !fix.context) {
              let enter2 = [];
              for (let scan = top; ; scan = scan.parent) {
                enter2.unshift(scan.node.tag);
                if (scan == cx)
                  break;
              }
              fix = { leave, enter: enter2, cost, context: true };
            }
            break;
          }
        }
      }
      leaveCost += level.flags & 2 ? 0 : dDelta > leave ? 1 : 2;
    }
    if (!fix)
      return false;
    for (let i = 0; i < fix.leave; i++) {
      this.insertClose();
      this.stackDelta--;
    }
    for (let wrapper of fix.enter) {
      this.patch(0, wrapper);
      this.stack.flags &= -2;
      this.stack = new FitLevel(wrapper, this.stack);
      this.stack.flags |= 2;
      this.stackDelta++;
    }
    return true;
  }
  syncToContext(context) {
    let cur = [], sync = [];
    for (let l = this.stack; l; l = l.next)
      cur.push(l);
    cur.reverse();
    for (let level = context.parent; level; level = level.parent)
      sync.push(level.node.tag);
    sync.reverse();
    while (cur.length > sync.length) {
      this.insertClose();
      cur.pop();
    }
    for (let d = 1; d < Math.min(sync.length, cur.length); d++) {
      if (!this.schema.sharesContent(sync[d].type, cur[d].tag.type)) {
        while (cur.length > d) {
          this.insertClose();
          cur.pop();
        }
        break;
      }
    }
    for (let i = cur.length; i < sync.length; i++) {
      let tag = sync[i];
      this.stack = new FitLevel(tag, this.stack);
      this.patch(0, tag);
    }
  }
  insertClose() {
    if (this.stack.flags & 1)
      this.patch(0, this.schema.createDefault(this.stack.tag.type), Plot.End);
    else
      this.patch(0, Plot.End);
    this.stack = this.stack.next;
  }
  patch(length, ...insert) {
    let prev = this.patches.length ? this.patches[this.patches.length - 1] : null;
    if (prev && prev.to == this.pos) {
      prev.to += length;
      for (let tok of insert)
        prev.insert.push(tok);
    } else {
      this.patches.push({ from: this.pos, to: this.pos + length, insert });
    }
  }
  open(tag) {
    this.enter(tag);
  }
  close() {
    this.leavePlot();
  }
  node(node) {
    this.skip(node);
  }
  skip(node) {
    if (this.fit(node.tag))
      this.stack.flags &= -2;
    else
      this.patch(node.length);
    this.pos += node.length;
  }
  enterPlot(node) {
    this.enter(node.tag);
  }
  enter(tag) {
    if (this.inserting)
      this.inputDelta++;
    if (this.doubleDeleteDelta > 0) {
      this.doubleDeleteDelta--;
      this.patch(1);
    } else if (this.fit(tag)) {
      this.stack.flags &= -2;
      this.stack = new FitLevel(tag, this.stack);
      if (this.inserting)
        this.stackDelta++;
    } else {
      this.patch(1);
    }
    this.pos++;
  }
  leavePlot() {
    if (this.inserting)
      this.inputDelta--;
    if (this.doubleDeleteDelta < 0) {
      this.doubleDeleteDelta++;
      this.patch(1);
    } else if (this.stack.next) {
      if (this.stack.flags & 1)
        this.patch(0, this.schema.createDefault(this.stack.tag.type));
      this.stack = this.stack.next;
      if (this.inserting)
        this.stackDelta++;
    } else {
      this.patch(1);
    }
    this.pos++;
  }
  finish() {
    while (this.stack.next || this.stack.flags && 1) {
      if (this.stack.flags & 1) {
        this.patch(0, this.schema.createDefault(this.stack.tag.type));
        this.stack.flags &= -2;
      } else {
        this.patch(0, Plot.End);
        this.stack = this.stack.next;
      }
    }
    if (!this.patches.length)
      return null;
    let sections = [], data = [], pos = 0;
    for (let { from, to, insert } of this.patches) {
      addSection(sections, data, from - pos, -1, null);
      let slice = Slice.of(insert);
      addSection(sections, data, to - from, slice.length, slice);
      pos = to;
    }
    addSection(sections, data, this.pos - pos, -1, null);
    return ChangeSet.new(sections, data);
  }
};
function localSyncPosAfter(pos) {
  let found = pos.pos;
  for (let cx = pos.parent, index = pos.index; ; index = cx.index, cx = cx.parent) {
    if (!cx.parent || !cx.node.inlineContent && index != cx.node.content.length - 1)
      break;
    found = cx.after;
  }
  return found;
}
function markableSections(doc, from, to, spanning, f) {
  doc.iterate(from, to, (node, pos) => {
    if (pos >= from && pos + (spanning ? node.length : 1) <= to || node.isText) {
      if (node.isText ? f(node, Math.max(pos, from), Math.min(pos + node.length, to)) : f(node, pos, pos + 1))
        return false;
    }
  });
}
var SectionIter = class {
  constructor(sections, data) {
    __publicField(this, "sections");
    __publicField(this, "data");
    __publicField(this, "i", 0);
    __publicField(this, "len");
    __publicField(this, "off");
    __publicField(this, "ins");
    this.sections = sections;
    this.data = data;
    this.next();
  }
  next() {
    let { sections } = this;
    if (this.i < sections.length) {
      this.len = sections[this.i++];
      this.ins = sections[this.i++];
    } else {
      this.len = 0;
      this.ins = -3;
    }
    this.off = 0;
  }
  get keep() {
    return this.ins == -1 || this.ins == -2;
  }
  get done() {
    return this.ins == -3;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get mods() {
    return this.data ? this.data[this.i - 2 >> 1] : null;
  }
  get slice() {
    return this.data ? this.data[this.i - 2 >> 1] : Slice.empty;
  }
  slicePart(len) {
    return this.slice.slice(this.off, len == null ? void 0 : this.off + len);
  }
  forward(len) {
    if (len == this.len)
      this.next();
    else {
      this.len -= len;
      this.off += len;
    }
  }
  forward2(len) {
    if (this.keep)
      this.forward(len);
    else if (len == this.ins)
      this.next();
    else {
      this.ins -= len;
      this.off += len;
    }
  }
};
function addSection(sections, data, len, ins, value, forceJoin = false) {
  if (len == 0 && ins <= 0)
    return;
  let last = sections.length - 2;
  if (last >= 0 && ins <= 0 && ins == sections[last + 1]) {
    let lastValue = data ? data[data.length - 1] : null;
    let match = ins == 0 ? true : value ? lastValue && compareModifications(lastValue, value) : !lastValue;
    if (match) {
      sections[last] += len;
      return;
    }
  }
  if (forceJoin || last >= 0 && len == 0 && sections[last] == 0) {
    sections[last] += len;
    sections[last + 1] += ins;
    if (data)
      data[data.length - 1] = data[data.length - 1].concat(value);
  } else {
    sections.push(len, ins);
    if (data)
      data.push(value);
  }
}
function finishCx(cx, schema) {
  return cx.tag.create(cx.children.length || cx.tag.type.canBeEmpty ? cx.children : [schema.createDefault(cx.tag.type)]);
}
function closeSlice(schema, slice, context, depth, closeEnd = false) {
  let top = [], stack = null;
  for (let i = depth - 1; i >= 0; i--)
    stack = new BuildContext(context[i], stack);
  for (let token of slice.content) {
    if (token.tokenType == Token.Type.Close) {
      if (stack) {
        let node = finishCx(stack, schema);
        stack = stack.parent;
        (stack ? stack.children : top).push(node);
      } else {
        top.push(token);
      }
    } else if (token.tokenType == Token.Type.Open) {
      stack = new BuildContext(token, stack);
    } else {
      (stack ? stack.children : top).push(token);
    }
  }
  if (closeEnd)
    while (stack) {
      let node = finishCx(stack, schema);
      stack = stack.parent;
      (stack ? stack.children : top).push(node);
    }
  if (stack)
    splatContext(top, stack);
  return Slice.of(top);
}
function splatContext(top, cx) {
  if (cx.parent)
    splatContext(top, cx.parent);
  top.push(cx.tag);
  for (let ch of cx.children)
    top.push(ch);
}
function fitReplacement(doc, from, to, slice, context) {
  if (!slice.length)
    return fitDeletion(doc, from, to);
  let preferredContext = -1;
  for (let i = 0; i < context.length; i++) {
    let next = context[i];
    if (next.type.defining)
      preferredContext = i;
    else if (!next.isTextblock)
      break;
  }
  let firstType = null, closeCount = 0;
  for (let i = 0, opened = 0; i < slice.content.length; i++) {
    let tok = slice.content[i];
    if (tok.tokenType == Token.Type.Close) {
      if (opened)
        opened--;
      else
        closeCount++;
    } else {
      if (!i)
        firstType = tok.type;
      if (tok.tokenType == Token.Type.Open)
        opened++;
    }
  }
  let found, foundCost = 1e8;
  let neutral = true, toEnd = true;
  scan: for (let cxFrom = from.parent, cxTo = to.parent, fromDepth = from.depth, toDepth = to.depth, start = from.pos, end = to.pos; cxFrom.parent; cxFrom = cxFrom.parent, start--, fromDepth--) {
    if (cxFrom.start != start || cxFrom.node.type.isolating)
      break;
    while (toDepth > fromDepth) {
      if (cxTo.node.type.isolating)
        break scan;
      cxTo = cxTo.parent;
      toDepth--;
      end++;
    }
    if (cxTo.end != end) {
      if (!closeCount)
        break;
      toEnd = false;
    }
    if (!cxFrom.node.type.neutral)
      neutral = false;
    if (fromDepth == toDepth)
      for (let i = -1, type; i < context.length; i++) {
        if (i >= 0)
          type = context[i].type;
        else if (!firstType)
          continue;
        else
          type = firstType;
        if (doc.schema.canContain(cxFrom.parent.node.type, type)) {
          let cost = (neutral ? 0 : 2) + (i < preferredContext ? context.length - i : i - preferredContext) + (toEnd ? 0 : 1e7);
          if (foundCost > cost) {
            found = {
              from: cxFrom.before,
              to: toEnd ? cxTo.after : to.pos,
              slice: i >= 0 ? closeSlice(doc.schema, slice, context, i + 1, toEnd) : slice
            };
            foundCost = cost;
          }
        }
      }
  }
  if (found)
    return found;
  if (from.pos == to.pos && !from.inText) {
    let cx = from.parent, before = from.pos, after = from.pos;
    for (; cx.parent && !cx.node.type.isolating && (before == cx.start || after == cx.end); cx = cx.parent, before--, after++) {
      for (let i = -1; i < context.length; i++) {
        let type = i >= 0 ? context[i].type : firstType;
        if (!type)
          continue;
        if (doc.schema.canContain(cx.parent.node.type, type)) {
          let pos = before == cx.start ? cx.before : cx.after;
          return { from: pos, to: pos, slice: i >= 0 ? closeSlice(doc.schema, slice, context, i + 1, true) : slice };
        }
      }
    }
  }
  for (let i = 0; i < context.length; i++) {
    if (doc.schema.canContain(from.parent.node.type, context[i].type)) {
      slice = closeSlice(doc.schema, slice, context, i + 1, true);
      break;
    }
  }
  return { from: from.pos, to: to.pos, slice };
}
function fitDeletion(doc, from, to) {
  let toDepth = to.depth;
  let covered;
  for (let cx = from.parent, cxTo = to.parent, depth = from.depth, start = from.pos, end = to.pos; cx.parent; start--, cx = cx.parent, depth--) {
    if (cx.start != start || cx.node.type.isolating)
      break;
    while (toDepth > depth) {
      cxTo = cxTo.parent;
      toDepth--;
      end++;
    }
    let toAtEnd = toDepth == depth && cxTo.end == end;
    if (cx.end < to.pos && cx.parent.end > to.pos && !toAtEnd)
      return { from: cx.before, to: to.pos, slice: Slice.empty };
    if (!cx.node.inlineContent && toAtEnd && cx.parent.start == cxTo.parent.start && !(from.parent.start == to.parent.start && from.parent.node.inlineContent))
      covered = { from: cx.before, to: cxTo.after, slice: Slice.empty };
  }
  return covered || { from: from.pos, to: to.pos, slice: Slice.empty };
}
function parse(schema, doc, options = {}) {
  let top = new NodeContext(schema.docTag, 4, null);
  let cx = new ParseContext(schema, options, top);
  cx.parseChildren(doc, [], false);
  cx.sync(top);
  return cx.finishNode(cx.top);
}
parse = function(parse2) {
  function slice(schema, doc, options = {}) {
    let top = new NodeContext(guessParent(doc, schema), 4 | 1 | 2, null);
    let cx = new ParseContext(schema, options, top);
    cx.parseChildren(doc, [], true);
    cx.sync(top);
    let tokens = [], context = [];
    let emitTokens = (children, openStart, openEnd) => {
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (openStart && i == 0 && child.isPlot && (cx.open.get(child) || 0) & 1) {
          if (children.length == 1 && openEnd && (cx.open.get(child) || 0) & 2) {
            emitTokens(child.content, true, true);
          } else {
            emitTokens(child.content, true, false);
            tokens.push(Plot.End);
          }
          context.push(child.tag);
        } else if (openEnd && i == children.length - 1 && child.isPlot && (cx.open.get(child) || 0) & 2) {
          tokens.push(child.tag);
          emitTokens(child.content, false, true);
        } else {
          tokens.push(child);
        }
      }
    };
    emitTokens(top.children, true, true);
    return { slice: Slice.of(tokens), context };
  }
  parse2.slice = slice;
  (function(Rule) {
    const schemaCache2 = /* @__PURE__ */ new WeakMap();
    function addByPrec(array, value) {
      let prec = value.precedence ?? 0, i = array.length;
      while (i > 0 && prec > (array[i - 1].precedence ?? 0))
        i--;
      array.splice(i, 0, value);
    }
    class Set2 {
      constructor(rules) {
        __publicField(this, "rules");
        __publicField(this, "elementRules", []);
        __publicField(this, "attributeRules", []);
        this.rules = rules;
        for (let rule of rules)
          addByPrec("selector" in rule ? this.elementRules : this.attributeRules, rule);
      }
      static of(rules) {
        return new Set2(rules);
      }
      static fromSchema(schema) {
        let cached = schemaCache2.get(schema);
        if (cached)
          return cached;
        let rules = [];
        for (let tag of schema.nodes) {
          let { spec: { shape, parseRules } } = tag;
          if ("element" in shape && shape.element && (shape.readElement || tag.default))
            rules.push({
              selector: shape.selector || shape.element,
              readElement: shape.readElement,
              tag
            });
          if (parseRules)
            for (let rule of parseRules)
              rules.push({
                ...rule,
                tag: rule.tag || tag
              });
        }
        for (let mark of schema.marks) {
          let { shape, parseRules } = mark.spec;
          if (parseRules)
            for (let rule of parseRules)
              rules.push({ ...rule, mark: rule.mark || mark });
          if ("element" in shape && (shape.readElement || mark.default)) {
            rules.push({
              selector: shape.selector || shape.element,
              readElement: shape.readElement,
              mark
            });
          } else if ("attribute" in shape) {
            if (shape.readAttribute) {
              rules.push({
                attribute: shape.attribute,
                readAttribute: shape.readAttribute,
                mark
              });
            } else if (typeof shape.value == "string") {
              rules.push({
                attribute: shape.attribute,
                value: shape.value,
                mark
              });
            } else if (shape.value === 0) {
              rules.push({
                attribute: shape.attribute,
                readAttribute: (param) => param,
                mark
              });
            }
          }
        }
        let result = new Rule.Set(rules);
        schemaCache2.set(schema, result);
        return result;
      }
      matchElement(elt) {
        for (let rule of this.elementRules) {
          if (elt.matches(rule.selector)) {
            if (!rule.readElement)
              return Object.prototype.hasOwnProperty.call(rule, "param") ? { rule, value: rule.param } : { rule };
            let result = rule.readElement(elt);
            if (result === parse2.Reject)
              continue;
            return { rule, value: result };
          }
        }
        return null;
      }
    }
    Rule.Set = Set2;
  })(parse2.Rule || (parse2.Rule = {}));
  parse2.Reject = Symbol("reject");
  ;
  return parse2;
}(parse);
var ParseContext = class {
  constructor(schema, options, top) {
    __publicField(this, "schema");
    __publicField(this, "options");
    __publicField(this, "top");
    __publicField(this, "rules");
    __publicField(this, "open", /* @__PURE__ */ new Map());
    this.schema = schema;
    this.options = options;
    this.top = top;
    this.rules = options.ruleSet || parse.Rule.Set.fromSchema(schema);
  }
  parseChildren(parent, marks, endOfSlice, ignore) {
    for (let ch = parent.firstChild; ch; ch = ch.nextSibling) {
      if (ch.nodeType == 1)
        this.parseElement(ch, marks, endOfSlice && !ch.nextSibling);
      else if (ch.nodeType == 3 && !(ignore && (typeof ignore == "string" ? ch.matches(ignore) : ignore(ch))))
        this.parseTextNode(ch, marks);
    }
  }
  ignoreElement(elt, marks) {
    if (elt.nodeName == "BR" && !this.top.tag.inlineContent)
      this.findPlace(Leaf.Text.of("-"), marks, false);
  }
  parseElement(elt, marks, endOfSlice) {
    let name = elt.nodeName.toLowerCase();
    if (name in normalizers)
      normalizers[name](elt);
    let match = this.rules.matchElement(elt);
    if (match ? match.rule.ignore === true : ignoreTags.has(name)) {
      this.ignoreElement(elt, marks);
    } else if (!match || match.rule.ignore === "skip") {
      let sync, top = this.top;
      if (blockTags.has(name)) {
        if (top.children.length && top.children[0].type.isInline)
          this.close();
        sync = true;
      }
      let innerMarks = match && match.rule.ignore ? marks : this.parseAttributes(elt, marks);
      if (innerMarks)
        this.parseChildren(elt, innerMarks, endOfSlice);
      if (sync)
        this.sync(top);
    } else {
      let innerMarks = this.parseAttributes(elt, marks);
      if (innerMarks && match.rule.marksFrom) {
        let inner = elt.querySelector(match.rule.marksFrom);
        if (inner)
          innerMarks = this.parseAttributes(inner, innerMarks);
      }
      if (innerMarks)
        this.parseElementByRule(elt, match, innerMarks, endOfSlice);
    }
  }
  parseElementByRule(elt, match, marks, endOfSlice) {
    let sync, isLeaf = false, { rule } = match, hasValue = Object.prototype.hasOwnProperty.call(match, "value");
    if (rule.tag) {
      let tag = rule.tag instanceof BaseTag ? rule.tag : hasValue ? rule.tag.of(match.value) : rule.tag.default;
      if (!tag)
        throw new SchemaError(`Parse rule for ${rule.selector} is missing a parameter`);
      if (tag.isPlot) {
        let innerMarks = this.enter(tag, marks, endOfSlice, elt);
        if (innerMarks) {
          sync = true;
          marks = innerMarks;
        }
      } else {
        this.insertNode(tag, marks);
        isLeaf = true;
      }
    } else {
      let mark = rule.mark instanceof Mark ? rule.mark : rule.mark instanceof Mark.Type ? hasValue ? rule.mark.of(match.value) : rule.mark.default : null;
      if (!mark)
        throw new Error(`Parse rule for ${rule.selector} does not produce a mark`);
      marks = marks.concat(mark);
    }
    let startIn = this.top;
    if (!isLeaf) {
      let content = elt;
      if (typeof rule.contentElement == "string")
        content = elt.querySelector(rule.contentElement) || elt;
      else if (typeof rule.contentElement == "function")
        content = rule.contentElement(elt);
      this.parseChildren(content, marks, endOfSlice, rule.ignoreContent);
    }
    if (sync && this.sync(startIn))
      this.close();
  }
  parseTextNode(dom, marks) {
    let text = dom.nodeValue;
    if (!this.top.tag.type.preserveWhitespace && this.options.collapseWhiteSpace !== false) {
      if (!this.top.tag.inlineContent && !/[^ \t\r\n\u000c]/.test(text))
        return;
      text = text.replace(/[ \t\r\n\u000c]+/g, " ");
      if (/^ /.test(text)) {
        let nodeBefore = this.top.children[this.top.children.length - 1];
        if (nodeBefore ? nodeBefore == this.schema.lineBreak || nodeBefore.is(Leaf.Text) && / $/.test(nodeBefore.param) : !(this.top.flags & 1))
          text = text.slice(1);
      }
      if (text)
        this.insertNode(Leaf.text(text), marks);
    } else if (this.top.tag.type.preserveWhitespace && this.schema.lineBreak) {
      let lines = text.split(/\r?\n|\r/g);
      for (let i = 0; i < lines.length; i++) {
        if (i)
          this.insertNode(this.schema.lineBreak, marks);
        if (lines[i])
          this.insertNode(Leaf.text(lines[i]), marks);
      }
    } else {
      text = text.replace(/\r?\n|\r/g, " ");
      if (text)
        this.insertNode(Leaf.text(text), marks);
    }
  }
  parseAttributes(elt, marks) {
    let matched = /* @__PURE__ */ new Set(), style = elt.style, hasStyles = style && style.length > 0;
    for (let rule of this.rules.attributeRules)
      if (!matched.has(rule.attribute)) {
        let isStyle = /^style\//.test(rule.attribute);
        let value = !isStyle ? elt.getAttribute(rule.attribute) : hasStyles ? style.getPropertyValue(rule.attribute.slice(6)) : "";
        if (!value)
          continue;
        let hasParam = Object.prototype.hasOwnProperty.call(rule, "param"), param = rule.param;
        if (rule.readAttribute) {
          param = rule.readAttribute(value);
          hasParam = true;
          if (param == parse.Reject)
            continue;
        } else if (rule.value != null && rule.value != value) {
          continue;
        }
        if (rule.ignore)
          return null;
        if (rule.consuming !== false)
          matched.add(rule.attribute);
        if (rule.clearMark) {
          marks = marks.filter((p) => !rule.clearMark(p));
        } else {
          let mark = rule.mark instanceof Mark ? rule.mark : rule.mark instanceof Mark.Type ? hasParam ? rule.mark.of(param) : rule.mark.default : null;
          if (!mark)
            throw new Error(`Parse rule for ${rule.attribute} does not produce a mark (or have ignore/clearMark properties)`);
          marks = marks.concat(mark);
        }
      }
    return marks;
  }
  insertNode(node, marks) {
    let innerMarks = this.findPlace(node.tag, marks, false);
    if (innerMarks) {
      let top = this.top;
      for (let p of innerMarks)
        if (this.schema.markAllowed(p.type, node.type))
          node = node.withMarks(p.addToSet(node.marks));
      for (let p of node.tag.marks)
        node = node.withMarks(p.addToSet(node.marks));
      node.pushTo(top.children);
      return true;
    }
    return false;
  }
  findPlace(tag, marks, endOfSlice) {
    let route, under;
    for (let cx = this.top; ; cx = cx.parent) {
      let found = this.schema.findWrapping(cx.tag.type, tag.type);
      if (found && (!route || route.length > found.length)) {
        route = found;
        under = cx;
        if (!found.length)
          break;
      }
      if (cx.flags & 4)
        break;
    }
    if (!route)
      return null;
    this.sync(under);
    for (let i = 0; i < route.length; i++)
      marks = this.enterInner(route[i], marks, endOfSlice, null);
    return marks;
  }
  enter(tag, marks, endOfSlice, elt) {
    let innerMarks = this.findPlace(tag, marks, endOfSlice);
    if (innerMarks)
      innerMarks = this.enterInner(tag, marks, endOfSlice, elt);
    return innerMarks;
  }
  enterInner(tag, marks, endOfSlice, element) {
    marks = marks.filter((p) => {
      if (!this.schema.markAllowed(p.type, tag.type))
        return true;
      tag = tag.withMarks(p.addToSet(tag.marks));
      return false;
    });
    let test, open = (this.top.children.length ? 0 : this.top.flags & 1) | (endOfSlice ? this.top.flags & 2 : 0);
    if (open && element && this.options.isOpen && (test = this.options.isOpen(element))) {
      open &= -4;
      if (test == "start")
        open |= 1;
      else if (test == "end")
        open |= 2;
      else if (test == "start end")
        open |= 1 | 2;
    }
    this.top = new NodeContext(tag, (element ? 4 : 0) | open, this.top);
    return marks;
  }
  sync(to) {
    if (!this.top.isIn(to))
      return false;
    while (this.top != to)
      this.close();
    return true;
  }
  close() {
    let parent = this.top.parent;
    parent.children.push(this.finishNode(this.top));
    this.top = parent;
  }
  finishNode(cx) {
    if (!(cx.flags & 2) && cx.children.length && !cx.tag.type.preserveWhitespace && this.options.collapseWhiteSpace !== false) {
      let last = cx.children[cx.children.length - 1].tag, m;
      if (last.is(Leaf.Text) && (m = /[ \t\r\n\u000c]+$/.exec(last.param))) {
        let len = last.length - m[0].length;
        if (!len)
          cx.children.pop();
        else
          cx.children[cx.children.length - 1] = last.sliceText(0, len);
      }
    }
    let open = cx.flags & (2 | 1);
    if (!open && !cx.tag.type.canBeEmpty && cx.tag.isPlot && !cx.children.length)
      cx.children.push(this.schema.createDefault(cx.tag.type));
    let node = cx.tag.isDoc ? this.schema.doc(cx.children) : cx.tag.create(cx.children);
    if (open)
      this.open.set(node, open);
    return node;
  }
};
var NodeContext = class {
  constructor(tag, flags, parent) {
    __publicField(this, "tag");
    __publicField(this, "flags");
    __publicField(this, "parent");
    __publicField(this, "children", []);
    this.tag = tag;
    this.flags = flags;
    this.parent = parent;
  }
  isIn(parent) {
    for (let cx = this; cx; cx = cx.parent)
      if (cx == parent)
        return true;
    return false;
  }
};
function normalizeList(dom) {
  for (let child = dom.firstChild, prevItem = null; child; child = child.nextSibling) {
    if (child.nodeType != 1)
      continue;
    let name = child.nodeName.toLowerCase();
    if (prevItem && (name == "ol" || name == "ul")) {
      prevItem.appendChild(child);
      child = prevItem;
    } else {
      prevItem = name == "li" ? child : null;
    }
  }
}
var normalizers = { ol: normalizeList, ul: normalizeList };
var ignoreTags = /* @__PURE__ */ (() => /* @__PURE__ */ new Set(["head", "noscript", "object", "script", "style", "title"]))();
var blockTags = /* @__PURE__ */ (() => /* @__PURE__ */ new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "canvas",
  "dd",
  "div",
  "dl",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "li",
  "noscript",
  "ol",
  "output",
  "p",
  "pre",
  "section",
  "table",
  "tfoot",
  "ul"
]))();
function guessParent(content, schema) {
  let rules = parse.Rule.Set.fromSchema(schema);
  let tags = [];
  let explore = (node) => {
    if (node.nodeType == 3) {
      tags.push(Leaf.Text);
    } else if (node.nodeType == 1) {
      let match = rules.matchElement(node);
      if (match && match.rule.tag) {
        tags.push(Node.Type.get(match.rule.tag));
      } else if (!(match && match.rule.ignore)) {
        for (let ch = node.firstChild; ch; ch = ch.nextSibling)
          explore(ch);
      }
    }
  };
  explore(content);
  let best, bestCost = 0;
  for (let parent of schema.nodes)
    if (parent.isPlot && parent.default) {
      let cost = parent.isDoc ? -1 : 0;
      for (let child of tags) {
        let fit = schema.findWrapping(parent, child);
        cost += fit ? fit.length * 2 : 1e3;
      }
      if (!best || bestCost > cost) {
        best = parent.default;
        bestCost = cost;
      }
    }
  return best;
}
var SerializeContext = class {
  constructor(options, openAttr) {
    __publicField(this, "openAttr");
    __publicField(this, "emitNewlines");
    __publicField(this, "override");
    this.openAttr = openAttr;
    this.emitNewlines = options.emitNewlines !== false;
    this.override = options.override;
  }
};
function serialize(doc, options = {}) {
  return Elt.Fragment.create(serializeChildren(doc.content, new SerializeContext(options)));
}
serialize = function(serialize2) {
  function node(node2, options) {
    return serializeChildren([node2], new SerializeContext(options))[0];
  }
  serialize2.node = node;
  function slice(slice2, options) {
    return Elt.Fragment.create(serializeChildren(flattenSlice(slice2.content, options.context || [], options.includeContext || 0, !!options.openAttr), new SerializeContext(options, options.openAttr)));
  }
  serialize2.slice = slice;
  ;
  return serialize2;
}(serialize);
var genericTag = (() => Plot.define("generic", {
  blockContent: Node.Group.All,
  shape: { element: "div" }
}))();
var openMark = (() => Mark.Type.define("Open", {
  shape: { attribute: "wg-open", value: 0 },
  target: Node.Group.All
}))();
function flattenSlice(content, context, includeContext, markOpen) {
  let depth = 0, i = 0, scan = (inner) => {
    let result2 = [];
    for (; i < content.length; ) {
      let tok = content[i++];
      if (tok.tokenType == Token.Type.Close) {
        if (inner)
          break;
        let tag = depth < context.length ? context[depth++] : genericTag;
        if (markOpen)
          tag = tag.withMarks(openMark.of("start").addToSet(tag.marks));
        result2 = [tag.create(result2)];
      } else if (tok.tokenType == Token.Type.Open) {
        let content2 = scan(true), tag = tok;
        if (markOpen)
          tag = tag.withMarks(openMark.of("end").addToSet(tag.marks));
        result2.push(tag.create(content2));
      } else {
        result2.push(tok);
      }
    }
    return result2;
  };
  let result = scan(false);
  while (depth < includeContext && depth < context.length) {
    let tag = context[depth++];
    if (markOpen)
      tag = tag.withMarks(openMark.of("start end").addToSet(tag.marks));
    result = [tag.create(result)];
  }
  return result;
}
function serializeNodeInner(node, cx) {
  let markAttrs = Attributes.none, targeted;
  for (let mark of node.tag.marks)
    if (mark.type.attribute) {
      if (mark.type == openMark) {
        markAttrs = Attributes.merge(markAttrs, [cx.openAttr, mark.value]);
      } else {
        let { target, get } = mark.type.attribute, attrs = get(mark.value);
        if (target && !node.isText) {
          (targeted || (targeted = [])).push({ attrs, target });
        } else if (!node.isText || mark.spanning) {
          markAttrs = Attributes.merge(markAttrs, attrs);
        }
      }
    }
  if (node.is(Leaf.Text))
    return markAttrs.length ? Elt.create("span", markAttrs, [node.param]) : node.param;
  let children;
  if (node.isLeaf) {
    children = [];
  } else {
    let { content } = node;
    if (cx.emitNewlines && node.type.preserveWhitespace)
      content = lineBreaksToNewlines(content);
    children = serializeChildren(content, cx);
  }
  let elt = cx.override && cx.override(node.tag) || node.type.shape.create(node.tag.param);
  if (markAttrs.length)
    elt = elt.addAttrs(markAttrs);
  if (targeted)
    for (let { attrs, target } of targeted)
      elt = elt.addAttrs(attrs, target);
  return elt.hasContent ? withContent(elt, children) : elt;
}
function withContent(elt, content) {
  let children = [];
  for (let ch of elt.children) {
    if (ch === 0)
      for (let inner of content)
        children.push(inner);
    else if (typeof ch == "string")
      children.push(ch);
    else
      children.push(withContent(ch, content));
  }
  return Elt.create(elt.tagName, elt.attrs, children);
}
function lineBreaksToNewlines(nodes) {
  if (!nodes.some((n) => n.type.hasRole(Node.Role.LineBreak)))
    return nodes;
  let result = [], lastText = false;
  for (let node of nodes) {
    let next = node.type.hasRole(Node.Role.LineBreak) ? Leaf.text("\n", node.marks) : node;
    if (lastText && next instanceof Plot)
      next.pushTo(result);
    else
      result.push(next);
    lastText = next.isText;
  }
  return result;
}
var EltCx = class {
  constructor(tagName, attrs, parent) {
    __publicField(this, "tagName");
    __publicField(this, "attrs");
    __publicField(this, "parent");
    __publicField(this, "children", []);
    this.tagName = tagName;
    this.attrs = attrs;
    this.parent = parent;
  }
  pop() {
    let repr = Elt.create(this.tagName, this.attrs, this.children);
    let parent = this.parent;
    parent.children.push(repr);
    return parent;
  }
};
function serializeChildren(children, cx) {
  let active = [], top = new EltCx("", Attributes.none, null);
  for (let child of children) {
    if (active.length || child.marks.some((p) => p.type.element)) {
      let keep = 0, rendered = 0, eltMarks = [];
      for (let mark of child.marks)
        if (mark.type.element)
          eltMarks.push(mark);
      while (keep < active.length && rendered < eltMarks.length) {
        let next = eltMarks[rendered];
        if (!next.eq(active[keep]) || !next.type.spanning)
          break;
        keep++;
        rendered++;
      }
      while (keep < active.length) {
        top = top.pop();
        active.pop();
      }
      while (rendered < eltMarks.length) {
        let add = eltMarks[rendered++];
        let repr = add.type.element;
        top = new EltCx(repr.name, repr.attrs(add.value), top);
        active.push(add);
      }
    }
    top.children.push(serializeNodeInner(child, cx));
  }
  for (let i = 0; i < active.length; i++)
    top = top.pop();
  return top.children;
}

export {
  SchemaError,
  ValidationError,
  Token,
  Slice,
  Elt,
  Attributes,
  Mark,
  Pos,
  Node,
  Leaf,
  Plot,
  Schema,
  ChangeSet,
  parse,
  serialize
};
//# sourceMappingURL=chunk-BD4QBBG3.js.map
