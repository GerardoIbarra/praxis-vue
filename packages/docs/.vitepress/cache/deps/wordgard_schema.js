import {
  Decoration,
  Dialog,
  InputRule,
  KeyBinding,
  Panel,
  PointSet,
  Tooltip,
  Wordgard
} from "./chunk-3FUMU73E.js";
import {
  history
} from "./chunk-KBQBG4XP.js";
import {
  Alignment,
  BackgroundColor,
  Blockquote,
  BulletList,
  CaptionedFigure,
  Code,
  CodeBlock,
  Color,
  Command,
  Direction,
  Doc,
  Emphasis,
  Figure,
  Heading,
  HorizontalRule,
  Image,
  ImageAlt,
  ImageSize,
  InlineDoc,
  InlineListItem,
  LineBreak,
  Link,
  ListItem,
  Menu,
  OrderedList,
  Paragraph,
  Strikethrough,
  Strong,
  Subscript,
  Superscript,
  Underline,
  colorNames,
  imagePhrases,
  listIsActive,
  phrases,
  setAlignment,
  setDirection,
  setTextblockType,
  toggleBlock,
  toggleList,
  toggleMark
} from "./chunk-PEBEQJNN.js";
import {
  BidiSpan,
  GardSelection,
  GardState,
  Transaction
} from "./chunk-WECCLQBO.js";
import {
  ChangeSet,
  Elt,
  Leaf,
  Plot
} from "./chunk-PIE5HL65.js";
import {
  __publicField
} from "./chunk-V6TY7KAL.js";

// ../../node_modules/.pnpm/crelt@1.0.7/node_modules/crelt/index.js
function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string") elt = document.createElement(elt);
  var i = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next) if (Object.prototype.hasOwnProperty.call(next, name)) {
      var value = next[name];
      if (typeof value == "string") elt.setAttribute(name, value);
      else if (value != null) elt[name] = value;
    }
    i++;
  }
  for (; i < arguments.length; i++) add(elt, arguments[i]);
  return elt;
}
function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i = 0; i < child.length; i++) add(elt, child[i]);
  } else {
    throw new RangeError("Unsupported child node: " + child);
  }
}

// ../../node_modules/.pnpm/wordgard@0.3.1/node_modules/wordgard/dist/schema.js
function blockDoc() {
  return GardState.schemaElement.of(Doc);
}
function inlineDoc() {
  return GardState.schemaElement.of(InlineDoc);
}
function selectionInType(tag) {
  return (state) => {
    var _a;
    let { sel } = state, block = sel.head.textblockParent;
    return !!block && block.start == ((_a = sel.anchor.textblockParent) == null ? void 0 : _a.start) && block.node.tag.eq(tag);
  };
}
function paragraph() {
  return [GardState.schemaElement.of(Paragraph), paragraph.button, paragraph.keyBinding];
}
paragraph = function(paragraph2) {
  paragraph2.keyBinding = KeyBinding.of({
    key: "Ctrl-Shift-0",
    run: Command.bind(setTextblockType, Paragraph)
  });
  paragraph2.button = Menu.Button.define({
    run: Command.bind(setTextblockType, Paragraph),
    active: selectionInType(Paragraph),
    label: phrases.ref("paragraph"),
    enable: (s) => !s.readOnly,
    parent: Menu.Submenu.textblockStyle,
    rank: 10
  });
  ;
  return paragraph2;
}(paragraph);
function heading() {
  return [
    GardState.schemaElement.of(Heading),
    heading.button1,
    heading.button2,
    heading.button3,
    heading.keyBindings,
    heading.createOnHash
  ];
}
heading = function(heading2) {
  heading2.keyBindings = [
    KeyBinding.of({ key: "Ctrl-Shift-1", run: Command.bind(setTextblockType, Heading.of(1)) }),
    KeyBinding.of({ key: "Ctrl-Shift-2", run: Command.bind(setTextblockType, Heading.of(2)) }),
    KeyBinding.of({ key: "Ctrl-Shift-3", run: Command.bind(setTextblockType, Heading.of(3)) }),
    KeyBinding.of({ key: "Ctrl-Shift-4", run: Command.bind(setTextblockType, Heading.of(4)) }),
    KeyBinding.of({ key: "Ctrl-Shift-5", run: Command.bind(setTextblockType, Heading.of(5)) }),
    KeyBinding.of({ key: "Ctrl-Shift-6", run: Command.bind(setTextblockType, Heading.of(6)) })
  ];
  heading2.button1 = Menu.Button.define({
    run: Command.bind(setTextblockType, Heading.of(1)),
    active: selectionInType(Heading.of(1)),
    label: phrases.ref("heading_1"),
    enable: (s) => !s.readOnly,
    parent: Menu.Submenu.textblockStyle,
    rank: 50
  });
  heading2.button2 = Menu.Button.define({
    run: Command.bind(setTextblockType, Heading.of(2)),
    active: selectionInType(Heading.of(2)),
    label: phrases.ref("heading_2"),
    enable: (s) => !s.readOnly,
    parent: Menu.Submenu.textblockStyle,
    rank: 51
  });
  heading2.button3 = Menu.Button.define({
    run: Command.bind(setTextblockType, Heading.of(3)),
    active: selectionInType(Heading.of(3)),
    label: phrases.ref("heading_3"),
    enable: (s) => !s.readOnly,
    parent: Menu.Submenu.textblockStyle,
    rank: 52
  });
  heading2.createOnHash = InputRule.textblockType(/^(#{1,6}) $/, (m) => Heading.of(m[1].to.pos - m[1].from.pos), true);
  ;
  return heading2;
}(heading);
function codeBlock() {
  return [
    GardState.schemaElement.of(CodeBlock),
    codeBlock.button,
    codeBlock.keyBinding,
    codeBlock.createOnBackticks
  ];
}
codeBlock = function(codeBlock2) {
  codeBlock2.keyBinding = KeyBinding.of({
    key: "Ctrl-Shift-\\",
    run: Command.bind(setTextblockType, CodeBlock)
  });
  codeBlock2.button = Menu.Button.define({
    run: Command.bind(setTextblockType, CodeBlock),
    active: selectionInType(CodeBlock),
    label: phrases.ref("code_block"),
    enable: (s) => !s.readOnly,
    parent: Menu.Submenu.textblockStyle,
    rank: 30
  });
  codeBlock2.createOnBackticks = InputRule.textblockType(/^```$/, CodeBlock);
  ;
  return codeBlock2;
}(codeBlock);
function alignment() {
  return [GardState.schemaElement.of(Alignment), alignment.button, alignment.keyBindings];
}
function alignmentAtCursor(state) {
  let block = state.sel.head.textblockParent;
  return block && block.node.tag.mark(Alignment) || null;
}
alignment = function(alignment2) {
  alignment2.keyBindings = [
    KeyBinding.of({ key: "Mod-Shift-l", run: Command.bind(setAlignment, "left") }),
    KeyBinding.of({ key: "Mod-Shift-r", run: Command.bind(setAlignment, "right") }),
    KeyBinding.of({ key: "Mod-Shift-e", run: Command.bind(setAlignment, "center") })
  ];
  alignment2.buttonStart = Menu.Button.define({
    run: Command.bind(setAlignment, null),
    active: (state) => alignmentAtCursor(state) == null,
    label: {
      icon: "M16 81a3 3 0 0 1 0-6h44a3 3 0 0 1 0 6h-44m0-19a3 3 0 0 1 0-6h69a3 3 0 0 1 0 6h-69m0-19a3 3 0 0 1 0-6h44a3 3 0 0 1 0 6h-44m0-19a3 3 0 0 1 0-6h69a3 3 0 0 1 0 6h-69",
      directional: true
    },
    description: phrases.ref("align_start")
  });
  alignment2.buttonEnd = Menu.Button.define({
    run: Command.bind(setAlignment, "end"),
    active: (state) => alignmentAtCursor(state) == "end",
    label: {
      icon: "M41 81a3 3 0 0 1 0-6h44a3 3 0 0 1 0 6h-44m-25-19a3 3 0 0 1 0-6h69a3 3 0 0 1 0 6h-69m25-19a3 3 0 0 1 0-6h44a3 3 0 0 1 0 6h-44m-25-19a3 3 0 0 1 0-6h69a3 3 0 0 1 0 6h-69",
      directional: true
    },
    description: phrases.ref("align_end")
  });
  alignment2.buttonCenter = Menu.Button.define({
    run: Command.bind(setAlignment, "center"),
    active: (state) => alignmentAtCursor(state) == "center",
    label: {
      icon: "M29 81a3 3 0 0 1 0-6h44a3 3 0 0 1 0 6h-44m-13-19a3 3 0 0 1 0-6h69a3 3 0 0 1 0 6h-69m13-19a3 3 0 0 1 0-6h44a3 3 0 0 1 0 6h-44m-13-19a3 3 0 0 1 0-6h69a3 3 0 0 1 0 6h-69"
    },
    description: phrases.ref("align_center")
  });
  alignment2.button = Menu.Submenu.define({
    description: phrases.ref("alignment"),
    parent: Menu.Group.block,
    arrow: false,
    enable: (s) => !s.readOnly,
    rank: 10,
    content: [alignment2.buttonStart, alignment2.buttonEnd, alignment2.buttonCenter]
  });
  ;
  return alignment2;
}(alignment);
function direction() {
  return [GardState.schemaElement.of(Direction), direction.textblockDir, direction.button];
}
function autoDir(plot) {
  for (let ch of plot.content)
    if (ch.is(Leaf.Text)) {
      for (let i = 0; i < ch.param.length; i++) {
        let dir = BidiSpan.strongDir(ch.param.charCodeAt(i));
        if (dir != null)
          return dir;
      }
    }
  return null;
}
function directionAtCursor(state) {
  let block = state.sel.head.textblockParent;
  return block && block.node.mark(Direction) || (state.textLTR ? "ltr" : "rtl");
}
direction = function(direction2) {
  direction2.textblockDir = GardState.textblockLTR.of((plot) => {
    let dir = plot.mark(Direction);
    return !dir ? null : dir == "auto" ? autoDir(plot) : dir == "ltr";
  });
  direction2.buttonLTR = Menu.Button.define({
    run: Command.bind(setDirection, "ltr"),
    active: (state) => directionAtCursor(state) == "ltr",
    label: {
      icon: "M70 35l20 15l-20 15l0-30M45 83v-63h-5v63a3 3 0 0 1-6 0v-28h-4a20 20 0 1 1 0-40h28a3 3 0 0 1 0 6h-7v62a3 3 0 0 1-6 0"
    },
    description: phrases.ref("text_dir_ltr")
  });
  direction2.buttonRTL = Menu.Button.define({
    run: Command.bind(setDirection, "rtl"),
    active: (state) => directionAtCursor(state) == "rtl",
    label: {
      icon: "M30 35l-20 15l20 15l0-30M75 83v-63h-5v63a3 3 0 0 1-6 0v-28h-4a20 20 0 1 1 0-40h28a3 3 0 0 1 0 6h-7v62a3 3 0 0 1-6 0"
    },
    description: phrases.ref("text_dir_rtl")
  });
  direction2.buttonAuto = Menu.Button.define({
    run: Command.bind(setDirection, "auto"),
    active: (state) => directionAtCursor(state) == "auto",
    label: {
      icon: "M35 30l-23 20l23 20l0-40M60 30l23 20l-23 20l0-40"
    },
    description: phrases.ref("text_dir_auto")
  });
  direction2.button = Menu.Submenu.define({
    description: phrases.ref("text_dir"),
    parent: Menu.Group.block,
    arrow: false,
    enable: (s) => !s.readOnly,
    rank: 20,
    content: [direction2.buttonLTR, direction2.buttonRTL, direction2.buttonAuto]
  });
  ;
  return direction2;
}(direction);
function blockquote() {
  return [GardState.schemaElement.of(Blockquote), blockquote.button, blockquote.createOnGT, blockquote.theme];
}
blockquote = function(blockquote2) {
  blockquote2.button = Menu.Button.define({
    run: Command.bind(toggleBlock, Blockquote),
    active: (state) => {
      for (let cur = state.sel.head.parent; cur; cur = cur.parent)
        if (cur.node.type == Blockquote.type)
          return true;
      return false;
    },
    label: {
      icon: "M75 75a6 6 0 0 0 6-6V53a6 6 0 0 0-6-6h-9q0-3 0-7 1-3 2-6t3-4q2-2 5-2V19q-5 0-9 2a21 21 0 0 0-7 6 31 31 0 0 0-4 9A48 48 0 0 0 56 47V69a5 5 0 0 0 6 6zm-37 0a6 6 0 0 0 6-6V53a6 6 0 0 0-6-6H29q0-3 0-7 1-3 2-6 1-3 3-4 2-2 5-2V19q-5 0-9 2a21 21 0 0 0-7 6 31 31 0 0 0-4 9A48 48 0 0 0 19 47V69a6 6 0 0 0 6 6z"
    },
    description: phrases.ref("toggle_quote"),
    enable: (s) => !s.readOnly,
    parent: Menu.Group.block,
    rank: 40
  });
  blockquote2.createOnGT = InputRule.wrapping(/^> $/, Blockquote, true);
  blockquote2.theme = Wordgard.theme({
    blockquote: {
      marginInline: "3px",
      paddingInlineStart: "12px",
      borderInlineStart: "4px solid silver"
    }
  });
  ;
  return blockquote2;
}(blockquote);
function horizontalRule() {
  return [GardState.schemaElement.of(HorizontalRule), horizontalRule.createOnDashes];
}
horizontalRule = function(horizontalRule2) {
  horizontalRule2.createOnDashes = InputRule.define({
    expr: /^---$/,
    lookahead: /^$/,
    apply: (state, m) => {
      let changes = ChangeSet.create(state.doc, {
        from: m[0].from.pos,
        to: m[0].to.pos,
        insert: [HorizontalRule],
        fit: true
      });
      let hr = changes.findInserted((t) => t == HorizontalRule);
      if (hr == null)
        return null;
      return {
        changes,
        selection: (cx) => GardSelection.near(cx, hr + 1, 1),
        annotations: history.isolate.of(true),
        userEvent: "insert.horizontalrule"
      };
    }
  });
  ;
  return horizontalRule2;
}(horizontalRule);
function bulletList(config = {}) {
  return [
    GardState.schemaElement.of(BulletList),
    GardState.schemaElement.of(config.blockItems == false ? InlineListItem : ListItem),
    bulletList.toggleButton,
    bulletList.createOnDash
  ];
}
bulletList = function(bulletList2) {
  bulletList2.createOnDash = InputRule.wrapping(/^ ?- $/, BulletList, true);
  bulletList2.toggleButton = Menu.Button.define({
    run: Command.bind(toggleList, BulletList),
    active: listIsActive(BulletList),
    label: {
      icon: "M34 75a3 3 0 0 1 0-6h56a3 3 0 0 1 0 6h-56m0-25a3 3 0 0 1 0-6h56a3 3 0 0 1 0 6h-56m0-25a3 3 0 0 1 0-6h56a3 3 0 0 1 0 6h-56m-22 3a6 6 0 1 0 0-12 6 6 0 0 0 0 12m0 25a6 6 0 1 0 0-12 6 6 0 0 0 0 12m0 25a6 6 0 1 0 0-12 6 6 0 0 0 0 12",
      directional: true
    },
    description: phrases.ref("toggle_bullet_list"),
    enable: (s) => !s.readOnly,
    parent: Menu.Group.block,
    rank: 20
  });
  ;
  return bulletList2;
}(bulletList);
function orderedList(config = {}) {
  return [
    GardState.schemaElement.of(OrderedList),
    GardState.schemaElement.of(config.blockItems == false ? InlineListItem : ListItem),
    orderedList.toggleButton,
    orderedList.createOnNumber
  ];
}
orderedList = function(orderedList2) {
  orderedList2.createOnNumber = InputRule.wrapping(/^ ?(\d+)\. $/, (match) => OrderedList.of(+match[1].text), true);
  orderedList2.toggleButton = Menu.Button.define({
    run: Command.bind(toggleList, OrderedList.default),
    active: listIsActive(OrderedList.default),
    label: {
      icon: "M34 75a3 3 0 0 1 0-6h56a3 3 0 0 1 0 6h-56m0-25a3 3 0 0 1 0-6h56a3 3 0 0 1 0 6h-56m0-25a3 3 0 0 1 0-6h56a3 3 0 0 1 0 6h-56M11 74v-3H13c1 0 2-1 2-2 0-1-1-2-2-2-1 0-2 1-2 2h-4c0-3 2-5 6-5 4 0 6 2 6 4a4 4 0 0 1-3 4v0a4 4 0 0 1 4 4c0 3-3 5-7 5-4 0-6-2-6-5h4c0 1 1 2 3 2 2 0 3-1 3-2 0-1-1-2-3-2h-2zm0-29h-4v0c0-3 2-5 6-5 4 0 6 2 6 5 0 2-2 4-3 5l-3 4h7V57H7v-3l6-6c1-1 2-2 2-3 0-1-1-2-2-2a2 2 0 0 0-2 2zM16 31h-4V18h0l-4 3v-4l4-3h4z",
      directional: true
    },
    description: phrases.ref("toggle_ordered_list"),
    enable: (s) => !s.readOnly,
    parent: Menu.Group.block,
    rank: 30
  });
  ;
  return orderedList2;
}(orderedList);
function strong() {
  return [GardState.schemaElement.of(Strong), strong.button, strong.keyBinding];
}
strong = function(strong2) {
  strong2.keyBinding = KeyBinding.of({
    key: "Mod-b",
    run: Command.bind(toggleMark, Strong)
  });
  strong2.button = Menu.Button.toggleMark({
    mark: Strong,
    parent: Menu.Group.inline,
    rank: 10,
    description: phrases.ref("toggle_strong"),
    label: {
      icon: "M51 81c13 0 21-7 21-18 0-8-6-14-14-15v0a14 14 0 0 0 12-13c0-9-7-15-19-15H24V81zM37 29h11c6 0 10 3 10 8 0 5-4 8-11 8H37V29zm0 42V54h11c8 0 12 3 12 9 0 6-4 9-11 9H37z"
    }
  });
  ;
  return strong2;
}(strong);
function emphasis() {
  return [GardState.schemaElement.of(Emphasis), emphasis.button, emphasis.keyBinding];
}
emphasis = function(emphasis2) {
  emphasis2.keyBinding = KeyBinding.of({
    key: "Mod-i",
    run: Command.bind(toggleMark, Emphasis)
  });
  emphasis2.button = Menu.Button.toggleMark({
    mark: Emphasis,
    parent: Menu.Group.inline,
    rank: 15,
    description: phrases.ref("toggle_em"),
    label: {
      icon: "M50 73 60 28c1-4 2-4 8-5l1-3H45l-1 3c7 1 7 1 6 5L41 73c-1 4-2 4-8 5l-1 3h24l1-3c-7-1-7-1-7-5z"
    }
  });
  ;
  return emphasis2;
}(emphasis);
function code() {
  return [GardState.schemaElement.of(Code), code.button, code.keyBinding];
}
code = function(code2) {
  code2.keyBinding = KeyBinding.of({
    key: "Mod-`",
    run: Command.bind(toggleMark, Code)
  });
  code2.button = Menu.Button.toggleMark({
    mark: Code,
    parent: Menu.Group.inline,
    rank: 30,
    description: phrases.ref("toggle_code"),
    label: {
      icon: "M37 30a2 2 0 1 0-4-4l-22 22a3 3 0 0 0 0 4l22 22a2 2 0 0 0 4-4L17 50zm27 0a2 2 0 0 1 4-4l22 22a3 3 0 0 1 0 4l-22 22a2 2 0 0 1-4-4L83 50z"
    }
  });
  ;
  return code2;
}(code);
function underline() {
  return [GardState.schemaElement.of(Underline), underline.button, underline.keyBinding];
}
underline = function(underline2) {
  underline2.keyBinding = KeyBinding.of({
    key: "Mod-u",
    run: Command.bind(toggleMark, Underline)
  });
  underline2.button = Menu.Button.toggleMark({
    mark: Underline,
    parent: Menu.Group.inline,
    rank: 60,
    description: phrases.ref("toggle_underline"),
    label: {
      icon: "M33 20h-8V60c0 13 9 23 24 23s24-9 24-23V20h-8v40c0 9-6 16-17 16s-15-7-15-16M78 94h-56v-6h56z"
    }
  });
  ;
  return underline2;
}(underline);
function strikethrough() {
  return [GardState.schemaElement.of(Strikethrough), strikethrough.button, strikethrough.keyBinding];
}
strikethrough = function(strikethrough2) {
  strikethrough2.keyBinding = KeyBinding.of({
    key: "Mod-/",
    run: Command.bind(toggleMark, Strikethrough)
  });
  strikethrough2.button = Menu.Button.toggleMark({
    mark: Strikethrough,
    parent: Menu.Group.inline,
    rank: 65,
    description: phrases.ref("toggle_strikethrough"),
    label: {
      icon: "M38 37c0 2 0 3 2 5H31a17 17 0 0 1-1-5c0-10 9-16 21-16 12 0 20 7 20 17h-7c-1-6-6-10-13-10-7 0-13 4-13 10zm13 44c-13 0-21-7-22-17h7c1 6 7 10 15 10c8 0 14-4 14-10c0-5-3-8-11-10L48 53h20c3 3 4 6 4 10 0 11-9 18-22 18M11 50v-6h75v6H11"
    }
  });
  ;
  return strikethrough2;
}(strikethrough);
function superscript() {
  return [GardState.schemaElement.of(Superscript), superscript.button, superscript.keyBinding];
}
superscript = function(superscript2) {
  superscript2.keyBinding = KeyBinding.of({
    key: "Mod-.",
    run: Command.bind(toggleMark, Superscript)
  });
  superscript2.button = Menu.Button.toggleMark({
    mark: Superscript,
    parent: Menu.Group.inline,
    rank: 70,
    description: phrases.ref("toggle_super"),
    label: {
      icon: "m27 78 6-18H55l6 18H69L48 19H40L19 78zm17-50 9 26h-18l9-26zm32-11v0c4 -10 12 0 5 6l-11 11V38h22v-6h-12v0l6-6c3-3 5-5 5-10 0-5-4-9-11-9C72 6 69 11 69 16v0z"
    }
  });
  ;
  return superscript2;
}(superscript);
function subscript() {
  return [GardState.schemaElement.of(Subscript), subscript.button, subscript.keyBinding];
}
subscript = function(subscript2) {
  subscript2.keyBinding = KeyBinding.of({
    key: "Mod-,",
    run: Command.bind(toggleMark, Subscript)
  });
  subscript2.button = Menu.Button.toggleMark({
    mark: Subscript,
    parent: Menu.Group.inline,
    rank: 75,
    description: phrases.ref("toggle_sub"),
    label: {
      icon: "m21 78 6-18H49l6 18H63L41 19H34L13 78zm17-50 9 26h-18l9-26zm38 45v0c4 -10 12 0 5 6l-11 11V94h22v-6h-12v0l6-6c3-3 5-5 5-10 0-5-4-9-11-9-8 0-11 5-11 10v0z"
    }
  });
  ;
  return subscript2;
}(subscript);
var imageUploader = GardState.Facet.define();
var imageTypes = [Image, Figure, CaptionedFigure];
function activeImage(sel) {
  if (sel.selection instanceof GardSelection.Node && imageTypes.includes(sel.selection.node.type))
    return sel.selection.node.tag;
  if (sel.head.parent.start == sel.anchor.parent.start && sel.head.parent.node.type == CaptionedFigure)
    return sel.head.parent.node.tag;
  return null;
}
var svg = "http://www.w3.org/2000/svg";
function rect(x, y, w, h, cls) {
  let elt = document.createElementNS(svg, "rect");
  elt.setAttribute("x", String(x));
  elt.setAttribute("y", String(y));
  elt.setAttribute("width", String(w));
  elt.setAttribute("height", String(h));
  elt.setAttribute("class", cls);
  return elt;
}
function imageTypeButtons(state, active) {
  let hasImg = state.schema.has(Image), hasFig = state.schema.has(Figure), hasCap = state.schema.has(CaptionedFigure);
  let align = (hasFig || hasCap) && state.schema.markAllowed(Alignment, hasFig ? Figure : CaptionedFigure);
  if (!align && !(hasImg && (hasFig || hasCap)))
    return null;
  let buttons = [];
  function button(type, label, active2) {
    let labelText = imagePhrases.get(state, label);
    let icon = document.createElementNS(svg, "svg");
    icon.setAttribute("viewbox", "0 0 24 22");
    icon.setAttribute("width", "24");
    icon.setAttribute("height", "22");
    icon.appendChild(rect(1, 1, 22, 3, "wg-img-icon-text"));
    let flip = !state.textLTR;
    icon.appendChild(rect(type == "start" ? flip ? 12 : 2 : type == "end" ? flip ? 2 : 12 : 7, 6, 10, 10, "wg-img-icon-image"));
    if (type == "inline") {
      icon.appendChild(rect(1, 12, 5, 3, "wg-img-icon-text"));
      icon.appendChild(rect(18, 12, 5, 3, "wg-img-icon-text"));
    }
    icon.appendChild(rect(1, 18, 22, 3, "wg-img-icon-text"));
    return crelt("label", { class: "wg-img-radio", title: labelText }, crelt("input", {
      type: "radio",
      "aria-label": labelText,
      name: "type",
      value: type,
      checked: active2 ? "checked" : null
    }), icon);
  }
  let aligned = !active || active.type == Image ? null : active.mark(Alignment) || "start";
  if (hasImg)
    buttons.push(button("inline", "inline", aligned == null));
  buttons.push(button("start", "figure", aligned == "start"));
  if (align) {
    buttons.push(button("center", "figure_center", aligned == "center"));
    buttons.push(button("end", "figure_end", aligned == "end"));
  }
  if (hasFig && hasCap) {
    let caption = crelt("label", " ", crelt("input", {
      type: "checkbox",
      name: "caption",
      checked: active && active.type == CaptionedFigure ? "checked" : null
    }), " ", imagePhrases.get(state, "captioned"));
    if (hasImg) {
      let imageRadio = buttons[0].querySelector("input");
      for (let b of buttons)
        b.querySelector("input").addEventListener("change", () => {
          caption.style.display = imageRadio.checked ? "none" : "";
        });
      if (!aligned)
        caption.style.display = "none";
    }
    buttons.push(caption);
  }
  return [crelt("span", { class: "wg-label" }, imagePhrases.get(state, "image_style"), ":"), crelt("span", buttons)];
}
var setImageDialog = Transaction.Effect.define();
var createImagePanel = (wg) => {
  let dom = buildImagePanel(wg), mustFocus = true;
  return {
    top: true,
    dom,
    connect() {
      if (mustFocus) {
        mustFocus = false;
        let target = dom.querySelector("input[name=src]");
        if (target)
          target.focus();
      }
    }
  };
};
function startUpload(wg, file, set) {
  var _a;
  let imageFile = (_a = file.files) == null ? void 0 : _a[0], handler = wg.state.facet(imageUploader)[0];
  if (!imageFile || !handler)
    return;
  let promise = handler(imageFile, wg, (percent) => {
    progress.lastChild.textContent = Math.round(percent) + "%";
  });
  let progress = crelt("span", { class: "wg-img-upload", style: `width: ${file.offsetWidth}px` }, imagePhrases.get(wg.state, "uploading"), " ", crelt("span"));
  file.parentNode.replaceChild(progress, file);
  function reset() {
    if (progress.parentNode)
      progress.parentNode.replaceChild(file, progress);
  }
  promise.then((url) => {
    reset();
    set(url);
  }, (err) => {
    reset();
    Dialog.show(wg, { label: imagePhrases.get(wg.state, "upload_failed") + ": " + err });
  });
}
function buildImagePanel(wg) {
  let { state } = wg;
  let sel = (state.field(imageDialog) || state.selection).resolve(state.doc);
  let active = activeImage(sel);
  let size = !wg.state.schema.has(ImageSize) ? null : [
    crelt("label", { for: "wg-img-size" }, imagePhrases.get(state, "width"), ":"),
    crelt("input", {
      type: "number",
      id: "wg-img-size",
      name: "size",
      value: active && active.mark(ImageSize) || "",
      placeholder: imagePhrases.get(state, "auto")
    })
  ];
  let src = crelt("input", {
    type: "text",
    id: "wg-img-src",
    name: "src",
    required: "required",
    value: active ? active.param : "",
    placeholder: "https://..."
  });
  let file = null;
  if (wg.state.facet(imageUploader).length) {
    file = crelt("input", {
      type: "file",
      id: "wg-img-file",
      name: "file",
      "aria-label": imagePhrases.get(state, "upload_image"),
      onchange: (e) => startUpload(wg, e.target, (url) => src.value = url)
    });
  }
  let form = crelt("form", { class: "wg-img-form", onkeydown }, crelt("div", { class: "wg-dialog-title" }, imagePhrases.get(state, active ? "update_image" : "insert_image")), crelt("label", { for: "wg-img-src" }, imagePhrases.get(state, "image_source"), ":"), crelt("span", { class: "wg-img-src-line" }, src, file), crelt("label", { for: "wg-img-alt" }, imagePhrases.get(state, "alt_text"), ":"), crelt("input", {
    type: "text",
    id: "wg-img-alt",
    name: "alt",
    value: active && active.mark(ImageAlt) || "",
    placeholder: imagePhrases.get(state, "describe_image")
  }), imageTypeButtons(state, active), size, crelt("div", { class: "wg-img-buttons" }, crelt("button", { type: "submit", class: "wg-dialog-button" }, imagePhrases.get(state, active ? "update" : "insert")), " ", crelt("button", { type: "button", class: "wg-dialog-button", onclick: close }, imagePhrases.get(state, "cancel"))));
  function onsubmit(e) {
    e.preventDefault();
    let { state: state2 } = wg, sel2 = (state2.field(imageDialog) || state2.selection).resolve(state2.doc);
    let data = new FormData(form);
    let src2 = data.get("src");
    if (!src2)
      return;
    let type = data.get("type") ?? (state2.schema.has(Image) ? "inline" : "start");
    let cap = !!data.get("caption") || !state2.schema.has(Figure);
    let marks = [];
    if (type == "center" || type == "end")
      marks = Alignment.of(type).addToSet(marks);
    if (data.get("alt"))
      marks = ImageAlt.of(data.get("alt")).addToSet(marks);
    if (data.get("size"))
      marks = ImageSize.of(Number(data.get("size"))).addToSet(marks);
    let tag = type == "inline" ? Image.of(src2, marks) : cap ? CaptionedFigure.of(src2, marks) : Figure.of(src2, marks);
    let change;
    if (sel2.from.parent.node.type == CaptionedFigure && sel2.to.parent.start == sel2.from.parent.start) {
      let from = sel2.from.parent.before;
      if (tag instanceof Plot.Tag)
        change = { from, to: from + 1, insert: [tag] };
      else
        change = { from, to: sel2.from.parent.after, insert: [tag], fit: true };
    } else {
      change = { from: sel2.from.pos, to: sel2.to.pos, insert: [tag instanceof Plot.Tag ? tag.create() : tag], fit: true };
    }
    wg.focus();
    let changes = ChangeSet.create(state2.doc, change), pos = changes.findInserted((t) => t == tag) ?? change.from;
    wg.dispatch({
      changes: change,
      effects: setImageDialog.of(false),
      userEvent: "insert.image",
      selection: tag instanceof Plot.Tag ? { anchor: pos + 1 } : GardSelection.node(pos, tag)
    });
  }
  function close() {
    wg.focus();
    wg.dispatch({ effects: setImageDialog.of(false) });
  }
  function onkeydown(e) {
    if (e.key == "Escape") {
      e.preventDefault();
      close();
    }
  }
  return crelt("wg-dialog", { class: "wg-img-dialog", onsubmit }, form);
}
var insertImage = (wg) => {
  let val = wg.state.field(imageDialog, false);
  if (val) {
    wg.dispatch({ effects: setImageDialog.of(false) });
  } else {
    let effects = [setImageDialog.of(true)];
    if (val === void 0)
      effects.push(GardState.appendConfig.of(imageDialog));
    wg.dispatch({ effects });
  }
  return true;
};
var imageDialogTheme = Wordgard.styles({
  ".wg-img-dialog": {
    borderBottom: "1px solid var(--wg-border-color)"
  },
  ".wg-img-form": {
    padding: "5px 3px",
    display: "grid",
    gap: "8px",
    alignItems: "center",
    gridTemplateColumns: "max-content auto",
    "& label, & .wg-label": {
      textAlign: "right"
    }
  },
  ".wg-dialog-title": {
    gridColumn: "span 2",
    fontSize: "90%",
    fontWeight: "bold",
    textAlign: "center"
  },
  ".wg-img-buttons": {
    gridColumn: "2"
  },
  ".wg-img-src-line": {
    display: "flex",
    gap: "7px",
    "& [type=text]": {
      flex: "1"
    }
  },
  ".wg-img-radio": {
    display: "inline-block",
    verticalAlign: "middle",
    "& input[type=radio]": {
      opacity: "0",
      position: "absolute",
      pointerEvents: "none"
    },
    "& svg": {
      marginRight: "6px",
      width: "24px",
      "& .wg-img-icon-text": { fill: "#bbb" },
      "& .wg-img-icon-image": { fill: "#888" }
    },
    "& input:checked + svg .wg-img-icon-image": {
      fill: "var(--wg-highlight-color)"
    },
    "& input:focus + svg": {
      borderRadius: "2px",
      outline: "2px solid var(--wg-highlight-color)"
    }
  },
  ".wg-img-upload": {
    boxSizing: "border-box",
    padding: "4px",
    fontSize: "80%"
  }
});
var imageDialog = GardState.Field.define({
  create: () => null,
  update(value, tr) {
    for (let e of tr.effects)
      if (e.is(setImageDialog))
        return e.value ? tr.state.selection : null;
    return value && value.map(tr.changes, tr.state);
  },
  provide: (f) => [
    GardState.prec.lowest(Panel.show.from(f, (val) => val && createImagePanel)),
    imageDialogTheme
  ]
});
function baseSupport() {
  return [GardState.schemaElement.of(ImageAlt), image.button, imageDialog, image.keyBinding, image.dropHandler];
}
function image() {
  return [GardState.schemaElement.of(Image), baseSupport()];
}
function figure(conf = {}) {
  return [GardState.schemaElement.of(Figure), (conf == null ? void 0 : conf.captioned) ? [GardState.schemaElement.of(CaptionedFigure)] : [], baseSupport()];
}
function imageResizing() {
  return [GardState.schemaElement.of(ImageSize), imageResizing.keyBindings, imageResizing.dragHandle];
}
var resizeTheme = Wordgard.theme({
  ".wg-resize-hover": {
    display: "inline-block",
    lineHeight: "0.1",
    position: "relative"
  },
  ".wg-resize-handle": {
    position: "absolute",
    right: "1px",
    bottom: "1px",
    width: "min(60%, 20px)",
    height: "min(60%, 20px)"
  },
  ".wg-resize-handle-active": {
    cursor: "nwse-resize"
  }
});
var setResizing = Transaction.Effect.define({
  map: (value, mapping) => {
    let newPos = mapping.mapPos(value.target, 1, "after");
    return newPos == null ? void 0 : { target: newPos, resizing: value.resizing };
  }
});
var handleElt = (() => Elt.mk("svg:svg", { class: "wg-resize-handle", viewBox: "0 0 20 20" }, [
  Elt.mk("svg:path", { d: "M20 0L0 20M20 5L5 20M20 10L10 20", stroke: "#000000aa", "stroke-width": "1.5" }),
  Elt.mk("svg:polygon", { points: "0,20 20,20 20,0", fill: "transparent", class: "wg-resize-handle-active" })
]))();
var resizeWrapper = (() => Decoration.Point.wrapper(Elt.mk("span", { class: "wg-resize-hover" }, [handleElt, 0]), { target: "img" }))();
var resizeState = GardState.Field.define({
  create: () => ({ target: -1, resizing: -1, deco: PointSet.empty }),
  update: (value, tr) => {
    for (let e of tr.effects) {
      if (e.is(setResizing)) {
        let { target, resizing } = e.value;
        if (target < 0)
          return { target: -1, resizing: -1, deco: PointSet.empty };
        let deco = [[target, resizeWrapper]];
        if (resizing > -1)
          deco.push([target, Decoration.Point.attributes({ style: `width: ${resizing}px` }, { target: "img" })]);
        return { target, resizing, deco: PointSet.create(deco) };
      }
    }
    return value.target < 0 || !tr.docChanged ? value : { target: value.target, resizing: value.resizing, deco: value.deco.map(tr.changes) };
  }
});
var MIN_SIZE = 10;
function imageNode(wg, pos) {
  let dom = wg.nodeDOM(pos);
  return dom.nodeName == "IMG" ? dom : dom.querySelector("img[src]");
}
var resizeHandlers = (() => [
  Wordgard.domEventHandler("mousedown", (event, wg) => {
    let resizing = wg.state.field(resizeState);
    if (resizing.target < 0)
      return;
    for (let dom = event.target; ; ) {
      if (dom.classList.contains("wg-resize-handle-active"))
        break;
      let next = dom.parentNode;
      if (!next || next == wg.contentDOM)
        return;
      dom = next;
    }
    let node = wg.state.doc.nodeAt(resizing.target);
    let width = node.tag.mark(ImageSize) ?? imageNode(wg, resizing.target).getBoundingClientRect().width;
    wg.dispatch({ effects: setResizing.of({ target: resizing.target, resizing: width }) });
    event.preventDefault();
  }),
  Wordgard.domEventHandler("mousemove", (event, wg) => {
    let resizing = wg.state.field(resizeState);
    if (resizing.resizing > -1) {
      let dom = imageNode(wg, resizing.target);
      let width = event.clientX - dom.getBoundingClientRect().left;
      if (width >= MIN_SIZE && Math.abs(width - resizing.resizing) >= 1)
        wg.dispatch({ effects: setResizing.of({ target: resizing.target, resizing: width }) });
    } else {
      let elt = event.target.closest("img, .wg-resize-handle");
      let node = elt && wg.nodeFromDOM(elt);
      let target = node && wg.state.schema.markAllowed(ImageSize, node.node.type) ? node.pos : -1;
      if (target != resizing.target)
        wg.dispatch({ effects: setResizing.of({ target, resizing: -1 }) });
    }
  }),
  Wordgard.domEventHandler("mouseup", (event, wg) => {
    let resizing = wg.state.field(resizeState);
    if (resizing.resizing < 0)
      return;
    wg.dispatch({
      effects: setResizing.of({ target: resizing.target, resizing: -1 }),
      changes: { from: resizing.target, add: ImageSize.of(Math.round(resizing.resizing)) }
    });
  })
])();
imageResizing = function(imageResizing2) {
  imageResizing2.resizeCommand = (by, relative = false) => (wg) => {
    let { selection } = wg.state;
    if (selection instanceof GardSelection.Node && wg.state.schema.markAllowed(ImageSize, selection.node.type)) {
      let curWidth = selection.node.mark(ImageSize) ?? imageNode(wg, wg.state.selection.from).getBoundingClientRect().width;
      let newWidth = Math.max(MIN_SIZE, relative ? curWidth * by : curWidth + by);
      if (newWidth != curWidth) {
        wg.dispatch({
          changes: { from: wg.state.selection.from, add: ImageSize.of(newWidth) },
          userEvent: "image.resize"
        });
        return true;
      }
    }
    return false;
  };
  imageResizing2.keyBindings = [
    KeyBinding.of({ key: "Ctrl-Alt-l", mac: "Ctrl-Cmd-l", run: imageResizing2.resizeCommand(1.1, true) }),
    KeyBinding.of({ key: "Ctrl-Alt-k", mac: "Ctrl-Cmd-k", run: imageResizing2.resizeCommand(0.9091, true) })
  ];
  imageResizing2.dragHandle = [
    GardState.prec.high(resizeHandlers),
    resizeState,
    Decoration.Point.source.of((s) => s.field(resizeState).deco),
    resizeTheme
  ];
  ;
  return imageResizing2;
}(imageResizing);
image = function(image2) {
  image2.keyBinding = KeyBinding.of({ key: "Ctrl-Alt-i", mac: "Ctrl-Cmd-i", run: insertImage });
  image2.button = Menu.Button.define({
    run: insertImage,
    active: (state) => !!activeImage(state.sel),
    label: {
      icon: "M38 34a9 9 0 1 1-19 0 9 9 0 0 1 19 0M9 13A9 9 0 0 0 0 22v56A9 9 0 0 0 9 88h81a9 9 0 0 0 9-9v-56A9 9 0 0 0 91 13zm81 6a3 3 0 0 1 3 3v38l-24-12a3 3 0 0 0-4 1l-23 23-17-11a3 3 0 0 0-4 0L6 75v3L6 78v-56a3 3 0 0 1 3-3z"
    },
    description: imagePhrases.ref("insert_image"),
    enable: (s) => !s.readOnly,
    parent: Menu.Group.insert,
    rank: 30
  });
  image2.dropHandler = GardState.prec.lowest(Wordgard.domEventHandler("drop", (event, wg) => {
    let { state } = wg, upload = state.facet(imageUploader)[0];
    const type = state.schema.has(Image) ? Image : state.schema.has(Figure) ? Figure : null;
    if (state.readOnly || !type || !upload || !event.dataTransfer)
      return false;
    let files = event.dataTransfer.files, uploads = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (/^image\//.test(file.type))
        uploads.push(upload(file, wg, () => {
        }));
    }
    if (!uploads.length)
      return false;
    let dropPos = { x: event.clientX, y: event.clientY };
    Promise.all(uploads).then((urls) => {
      wg.dispatch({
        changes: { from: wg.posAtCoords(dropPos).pos, insert: urls.map((u) => type.of(u)), fit: true },
        userEvent: "drop.image"
      });
    }, (err) => {
      Wordgard.logException(state, err, "Dropped image upload");
    });
    return true;
  }));
  image2.insert = insertImage;
  image2.uploader = imageUploader;
  ;
  return image2;
}(image);
function setColor(wg, mark, value) {
  let { state } = wg, { selection } = state;
  if (state.readOnly)
    return;
  if (selection instanceof GardSelection.Text && selection.empty) {
    let selMarks = selection.marks || state.sel.head.marks();
    let newMarks = value ? mark.of(value).addToSet(selMarks) : mark.removeFromSet(selMarks);
    wg.dispatch({
      selection: GardSelection.Text.create({
        anchor: selection.anchor,
        headSide: selection.headSide,
        goalColumn: selection.goalColumn,
        marks: newMarks
      }),
      userEvent: value ? "mark.add" : "mark.remove"
    });
  } else if (value) {
    wg.dispatch({
      changes: selection.ranges.map((r) => ({ from: r.from, to: r.to, add: mark.of(value) })),
      userEvent: "mark.add"
    });
  } else {
    let changes = [];
    for (let { from, to } of selection.ranges) {
      state.doc.iterate(from, to, (node, pos) => {
        let has = mark.isInSet(node.marks);
        if (has)
          changes.push({ from: Math.max(from, pos), to: Math.min(to, pos + node.length), remove: has });
      });
    }
    wg.dispatch({ changes, userEvent: "mark.remove" });
  }
}
var ColorPicker = class _ColorPicker {
  constructor(wg, finish) {
    __publicField(this, "wg");
    __publicField(this, "finish");
    __publicField(this, "dom");
    __publicField(this, "width");
    __publicField(this, "selPos", 0);
    __publicField(this, "options");
    this.wg = wg;
    this.finish = finish;
    this.width = wg.state.facet(_ColorPicker.width);
    this.dom = document.createElement("wg-color-picker");
    this.dom.role = "listbox";
    this.dom.style.gridTemplateColumns = `repeat(${this.width}, max-content)`;
    this.options = wg.state.facet(_ColorPicker.options).map(({ name, detail, value }, i) => {
      let option = this.dom.appendChild(document.createElement("wg-color-picker-color"));
      let label = name(wg.state);
      if (detail)
        label += ` (${detail(wg.state)})`;
      option.role = "option";
      option.setAttribute("aria-label", label);
      option.title = label;
      if (i == this.selPos)
        option.setAttribute("aria-selected", "true");
      if (value)
        option.style.backgroundColor = value;
      else
        option.className = "wg-no-color";
      option.setAttribute("data-value", value);
      return option;
    });
    this.dom.addEventListener("mousedown", (e) => {
      if (e.button == 0) {
        let target = e.target.closest("wg-color-picker-color");
        if (target)
          this.finish(target.getAttribute("data-value"));
      }
    });
    this.dom.addEventListener("keydown", (e) => {
      let ltr = this.wg.state.textLTR;
      if (e.key == (ltr ? "ArrowLeft" : "ArrowRight") && this.selPos > 0) {
        this.move(this.selPos - 1);
      } else if (e.key == (ltr ? "ArrowRight" : "ArrowLeft") && this.selPos < this.options.length - 1) {
        this.move(this.selPos + 1);
      } else if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        let next = e.key == "ArrowUp" ? this.selPos - this.width : this.selPos + this.width;
        if (next < 0 || next >= this.options.length - 1) {
          let col = this.selPos % this.width;
          if (next < 0)
            next = (Math.ceil(this.options.length / this.width) - 1) * this.width + col - 1;
          else
            next = col + 1;
        }
        this.move(Math.max(0, Math.min(this.options.length - 1, next)));
      } else if (e.key == " " || e.key == "Enter") {
        this.finish(this.options[this.selPos].getAttribute("data-value"));
      } else {
        return;
      }
      e.preventDefault();
    });
  }
  static create(wg, finish) {
    return new _ColorPicker(wg, finish);
  }
  move(selPos) {
    if (selPos != this.selPos) {
      let prev = this.options[this.selPos];
      let cur = this.options[this.selPos = selPos];
      prev.removeAttribute("aria-selected");
      cur.setAttribute("aria-selected", "true");
    }
  }
};
ColorPicker = function(ColorPicker2) {
  function col(rgb, name, mod) {
    let detail = mod == 3 ? colorNames.ref("lightest") : mod == 2 ? colorNames.ref("lighter") : mod == 1 ? colorNames.ref("light") : mod == -1 ? colorNames.ref("dark") : mod == -2 ? colorNames.ref("darker") : mod ? colorNames.ref("darkest") : void 0;
    return { name: colorNames.ref(name), detail, value: rgb };
  }
  function defaultColors() {
    return [
      col("", "none"),
      col("#000000", "black"),
      col("#434343", "grey", -3),
      col("#666666", "grey", -2),
      col("#999999", "grey", -1),
      col("#cccccc", "grey"),
      col("#d9d9d9", "grey", 1),
      col("#efefef", "grey", 2),
      col("#f3f3f3", "grey", 3),
      col("#ffffff", "white"),
      col("#980000", "red_berry"),
      col("#ff0000", "red"),
      col("#ff9900", "orange"),
      col("#ffff00", "yellow"),
      col("#00ff00", "green"),
      col("#00ffff", "cyan"),
      col("#4a86e8", "cornflower"),
      col("#0000ff", "blue"),
      col("#9900ff", "purple"),
      col("#ff00ff", "magenta"),
      col("#e6b8af", "red_berry", 3),
      col("#f4cccc", "red", 3),
      col("#fce5cd", "orange", 3),
      col("#fff2cc", "yellow", 3),
      col("#d9ead3", "green", 3),
      col("#d0e0e3", "cyan", 3),
      col("#c9daf8", "cornflower", 3),
      col("#cfe2f3", "blue", 3),
      col("#d9d2e9", "purple", 3),
      col("#ead1dc", "magenta", 3),
      col("#dd7e6b", "red_berry", 2),
      col("#ea9999", "red", 2),
      col("#f9cb9c", "orange", 2),
      col("#ffe599", "yellow", 2),
      col("#b6d7a8", "green", 2),
      col("#a2c4c9", "cyan", 2),
      col("#a4c2f4", "cornflower", 2),
      col("#9fc5e8", "blue", 2),
      col("#b4a7d6", "purple", 2),
      col("#d5a6bd", "magenta", 2),
      col("#cc4125", "red_berry", 1),
      col("#e06666", "red", 1),
      col("#f6b26b", "orange", 1),
      col("#ffd966", "yellow", 1),
      col("#93c47d", "green", 1),
      col("#76a5af", "cyan", 1),
      col("#6d9eeb", "cornflower", 1),
      col("#6fa8dc", "blue", 1),
      col("#8e7cc3", "purple", 1),
      col("#c27ba0", "magenta", 1),
      col("#a61c00", "red_berry", -1),
      col("#cc0000", "red", -1),
      col("#e69138", "orange", -1),
      col("#f1c232", "yellow", -1),
      col("#6aa84f", "green", -1),
      col("#45818e", "cyan", -1),
      col("#3c78d8", "cornflower", -1),
      col("#3d85c6", "blue", -1),
      col("#674ea7", "purple", -1),
      col("#a64d79", "magenta", -1),
      col("#85200c", "red_berry", -2),
      col("#990000", "red", -2),
      col("#b45f06", "orange", -2),
      col("#bf9000", "yellow", -2),
      col("#38761d", "green", -2),
      col("#134f5c", "cyan", -2),
      col("#1155cc", "cornflower", -2),
      col("#0b5394", "blue", -2),
      col("#351c75", "purple", -2),
      col("#741b47", "magenta", -2),
      col("#5b0f00", "red_berry", -3),
      col("#660000", "red", -3),
      col("#783f04", "orange", -3),
      col("#7f6000", "yellow", -3),
      col("#274e13", "green", -3),
      col("#0c343d", "cyan", -3),
      col("#1c4587", "cornflower", -3),
      col("#073763", "blue", -3),
      col("#20124d", "purple", -3),
      col("#4c1130", "magenta", -3)
    ];
  }
  ColorPicker2.width = GardState.Facet.define({
    combine: (values) => values.length ? values[0] : 10
  });
  ColorPicker2.options = GardState.Facet.define({
    combine: (values) => values.length ? values[0] : defaultColors()
  });
  ColorPicker2.theme = Wordgard.styles({
    "wg-color-picker": {
      display: "grid",
      gap: "4px",
      padding: "3px"
    },
    "wg-color-picker-color": {
      borderRadius: "50%",
      border: "1px solid var(--wg-border-color)",
      width: "12px",
      height: "12px",
      "wg-color-picker:focus &[aria-selected], &:hover": {
        outline: "2px solid var(--wg-highlight-color)"
      },
      "&.wg-no-color": {
        border: "none",
        background: `${crossGradient(45)}, ${crossGradient(135)}`
      }
    }
  });
  ;
  return ColorPicker2;
}(ColorPicker);
function crossGradient(angle) {
  return `linear-gradient(${angle}deg, transparent, transparent 44%, currentColor 44%, currentColor 56%, transparent 56%)`;
}
var colorPicker = Menu.CustomControl.define({
  render(wg, done) {
    return ColorPicker.create(wg, (color2) => {
      done();
      setColor(wg, Color, color2);
      wg.focus();
    });
  }
});
function color() {
  return [GardState.schemaElement.of(Color), color.button, ColorPicker.theme];
}
color = function(color2) {
  color2.button = Menu.Submenu.define({
    label: {
      icon: "M5 8A3 3 0 0 1 8 5h28a3 3 0 0 1 3 3v30l23-23a3 3 0 0 1 4 0l20 20a3 3 0 0 1 0 4L63 61H92a3 3 0 0 1 3 3v28a3 3 0 0 1-3 3H22a17 17 0 0 1-12-5A17 17 0 0 1 5 78m34-1 41-41-16-16L39 45zM30 78a8 8 0 1 0-17 0 8 8 0 0 0 17 0M89 89v-22H57l-23 23zM5 8v70zm0 70V78z"
    },
    description: phrases.ref("text_color"),
    arrow: false,
    parent: Menu.Group.inline,
    enable: (s) => !s.readOnly,
    rank: 80,
    content: [colorPicker]
  });
  ;
  return color2;
}(color);
function backgroundColor() {
  return [GardState.schemaElement.of(BackgroundColor), backgroundColor.button, ColorPicker.theme];
}
var backgroundPicker = Menu.CustomControl.define({
  render(wg, done) {
    return ColorPicker.create(wg, (color2) => {
      done();
      setColor(wg, BackgroundColor, color2);
      wg.focus();
    });
  }
});
backgroundColor = function(backgroundColor2) {
  backgroundColor2.button = Menu.Submenu.define({
    label: {
      icon: "M67 9a11 11 0 0 1 16 0l8 8a11 11 0 0 1 0 16l-2 2-45 51a3 3 0 0 1-2 1h-17a3 3 0 0 1-1 0l-2 2A3 3 0 0 1 19 89h-11a3 3 0 0 1-2-5l8-8A3 3 0 0 1 13 75v-17a3 3 0 0 1 1-2l51-45zm-1 8L20 59l21 21 42-46zm20 12 0 0a6 6 0 0 0 0-8L79 13a6 6 0 0 0-8 0l0 0zM35 81 19 65v9L26 81z"
    },
    description: phrases.ref("background_color"),
    arrow: false,
    parent: Menu.Group.inline,
    enable: (s) => !s.readOnly,
    rank: 85,
    content: [backgroundPicker]
  });
  ;
  return backgroundColor2;
}(backgroundColor);
function toggleLink(wg) {
  if (wg.state.readOnly)
    return false;
  let open = Dialog.get(wg, "wg-link-dialog");
  if (open) {
    if (open.dom.contains(wg.contentDOM.ownerDocument.activeElement))
      wg.focus();
    Dialog.close(wg, "wg-link-dialog");
    return true;
  }
  let { selection, doc } = wg.state;
  if (selection.empty)
    return false;
  let remove = [];
  for (let { from, to } of selection.ranges)
    doc.iterate(from, to, (node, pos) => {
      let has = Link.isInSet(node.marks);
      if (has)
        remove.push({ from: pos, to: pos + node.length, remove: has });
    });
  if (remove.length) {
    wg.dispatch({ changes: remove, userEvent: "mark.remove" });
  } else {
    Dialog.show(wg, {
      label: phrases.get(wg.state, "link_target"),
      input: { type: "text", name: "url" },
      submitLabel: phrases.get(wg.state, "create_link"),
      class: "wg-link-dialog",
      focus: true
    }).result.then((form) => {
      var _a;
      wg.focus();
      let url = form && ((_a = form.elements.namedItem("url")) == null ? void 0 : _a.value);
      if (url)
        wg.dispatch({
          changes: selection.ranges.map((r) => ({ from: r.from, to: r.to, add: Link.of(url) })),
          userEvent: "mark.add"
        });
    });
  }
  return true;
}
function computeLinkTooltip(state) {
  if (!state.selection.isCursor)
    return null;
  let { head } = state.sel, before = head.nodeBefore, link2 = before && Link.isInSet(before.marks);
  if (!link2)
    return null;
  let start = head.pos - before.length, end = head.pos, siblings = head.parent.node.content;
  for (let index = head.index - 1; index > 0 && link2.isInSet(siblings[index - 1].marks); )
    start -= siblings[--index].length;
  for (let index = head.index; index < siblings.length && link2.isInSet(siblings[index].marks); )
    end += siblings[index++].length;
  return {
    pos: start,
    end,
    above: false,
    create: () => renderLinkTooltip(link2.value)
  };
}
var closeLinkTooltip = Transaction.Effect.define();
var linkTooltipField = GardState.Field.define({
  create: computeLinkTooltip,
  update(value, tr) {
    if (tr.effects.some((e) => e.is(closeLinkTooltip)))
      return null;
    let sel = tr.selection;
    if (!tr.docChanged && (!sel || value && sel.isCursor && sel.head >= value.pos && sel.head <= value.end))
      return value;
    return computeLinkTooltip(tr.state);
  },
  provide: (f) => Tooltip.show.from(f)
});
function renderLinkTooltip(target) {
  let dom = document.createElement("wg-link-tooltip");
  let link2 = dom.appendChild(document.createElement("a"));
  link2.href = target;
  link2.textContent = target;
  return { dom };
}
var linkTooltipTheme = Wordgard.styles({
  "wg-link-tooltip": {
    maxWidth: "30em",
    fontSize: "90%",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
    overflow: "hidden",
    borderRadius: "3px",
    padding: "2px 5px",
    marginTop: "1px",
    "& a": {
      textDecoration: "none",
      color: "inherit"
    }
  }
});
function link() {
  return [GardState.schemaElement.of(Link), link.button, link.keyBinding, link.tooltip, link.pasteOver];
}
link = function(link_1) {
  link_1.keyBinding = KeyBinding.of({
    key: "Mod-k",
    run: toggleLink
  });
  link_1.button = Menu.Button.define({
    run: toggleLink,
    active(state) {
      let { selection, doc } = state, found = false;
      if (!selection.empty)
        for (let { from, to } of selection.ranges)
          doc.iterate(from, to, (node) => {
            if (found)
              return false;
            if (Link.isInSet(node.marks))
              found = true;
          });
      return found;
    },
    enable(state) {
      return !state.readOnly && !state.selection.empty;
    },
    label: {
      icon: "M29 41 21 49a19 19 0 1 0 27 27l11-11A19 19 0 0 0 54 34L50 38a6 6 0 0 0-1 1 13 13 0 0 1 5 22L43 72a12 12 0 1 1-18-18l5-5a25 25 0 0 1-1-8zM41 29A19 19 0 0 0 46 59l5-5a13 13 0 0 1-6-21L57 22a12 12 0 1 1 18 18l-5 5c1 3 1 5 1 8l9-9a19 19 0 1 0-27-27z"
    },
    description: phrases.ref("create_link"),
    parent: Menu.Group.inline,
    rank: 50
  });
  link_1.tooltip = [
    linkTooltipField,
    GardState.prec.low(KeyBinding.of({
      key: "Escape",
      run: (wg) => {
        if (!wg.state.field(linkTooltipField))
          return false;
        wg.dispatch({ effects: closeLinkTooltip.of(null) });
        return true;
      }
    })),
    linkTooltipTheme
  ];
  link_1.pasteOver = Wordgard.pasteHandler.of((wg, event) => {
    let { selection } = wg.state, data = event.clipboardData;
    if (!data || selection.empty)
      return false;
    let text = data.getData("text/plain") || data.getData("Text") || data.getData("text/uri-list");
    if (!text || !/^(https?|mailto|xmpp|data):[^ ]+$/.test(text))
      return false;
    let link2 = Link.of(text);
    let changes = ChangeSet.create(wg.state.doc, { from: selection.from, to: selection.to, add: link2 });
    if (changes.empty)
      return false;
    wg.dispatch({
      changes,
      userEvent: "paste.link",
      scrollIntoView: true
    });
    return true;
  });
  ;
  return link;
}(link);
function lineBreak() {
  return GardState.schemaElement.of(LineBreak);
}
function basicMarks() {
  return [strong(), emphasis(), link()];
}
function inlineMarks() {
  return [basicMarks(), code(), underline(), strikethrough(), superscript(), subscript(), color(), backgroundColor()];
}
function basicSchema() {
  return [blockDoc(), basicMarks(), paragraph(), heading(), lineBreak()];
}
function inlineSchema() {
  return [inlineDoc(), basicMarks(), image(), lineBreak()];
}
function fullSchema() {
  return [
    blockDoc(),
    paragraph(),
    heading(),
    lineBreak(),
    codeBlock(),
    alignment(),
    direction(),
    blockquote(),
    horizontalRule(),
    bulletList(),
    orderedList(),
    inlineMarks(),
    image(),
    figure(),
    imageResizing()
  ];
}
export {
  ColorPicker,
  alignment,
  backgroundColor,
  basicMarks,
  basicSchema,
  blockDoc,
  blockquote,
  bulletList,
  code,
  codeBlock,
  color,
  direction,
  emphasis,
  figure,
  fullSchema,
  heading,
  horizontalRule,
  image,
  imageResizing,
  inlineDoc,
  inlineMarks,
  inlineSchema,
  lineBreak,
  link,
  orderedList,
  paragraph,
  strikethrough,
  strong,
  subscript,
  superscript,
  underline
};
//# sourceMappingURL=wordgard_schema.js.map
