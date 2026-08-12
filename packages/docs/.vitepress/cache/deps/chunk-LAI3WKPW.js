import {
  Command,
  Menu,
  phrases,
  redo,
  undo
} from "./chunk-T6WCVZGX.js";
import {
  GardSelection,
  GardState,
  Transaction
} from "./chunk-AO66DKIJ.js";
import {
  ChangeSet
} from "./chunk-BD4QBBG3.js";
import {
  __publicField
} from "./chunk-XGM4GKIC.js";

// ../../node_modules/.pnpm/wordgard@0.3.1/node_modules/wordgard/dist/history.js
var fromHistory = Transaction.Annotation.define();
var historyConfig = GardState.Facet.define({
  combine(configs) {
    return GardState.Facet.combineConfig(configs, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (_t, isAdjacent2) => isAdjacent2
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (a, b) => (tr, adj) => a(tr, adj) || b(tr, adj)
    });
  }
});
var historyField_ = GardState.Field.define({
  create() {
    return new HistoryState(null, null);
  },
  update(state, tr) {
    let config = tr.state.facet(historyConfig);
    let fromHist = tr.annotation(fromHistory);
    if (fromHist) {
      let from = fromHist.side, event2 = eventFromTransaction(tr);
      let other = from == 0 ? state.undone : state.done;
      if (event2)
        other = new Branch(event2.changes, event2.effects, null, tr.startState.selection, other);
      return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
    }
    let isolate = tr.annotation(history.isolate);
    if (isolate == true || isolate == "before")
      state = state.isolate();
    if (tr.annotation(Transaction.addToHistory) === false)
      return tr.changes.empty ? state : new HistoryState(state.done && state.done.addMapping(tr.changes, tr.startState.doc), state.undone && state.undone.addMapping(tr.changes, tr.startState.doc), state.prevTime, state.prevUserEvent);
    let event = eventFromTransaction(tr);
    let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
    if (event)
      state = state.addChanges(event, time, userEvent, config, tr);
    if (isolate == true || isolate == "after")
      state = state.isolate();
    return state.clip(config.minDepth);
  },
  toJSON(value, state) {
    let mkJSON = (value2) => {
      let events = [];
      for (let cur = value2; cur; cur = cur.next)
        events.push({ changes: cur.changes.toJSON(), selection: cur.startSelection.toJSON(state) });
      return events;
    };
    return {
      done: mkJSON(value.done = value.done && value.done.resolveFully(state.config)),
      undone: mkJSON(value.undone = value.undone && value.undone.resolveFully(state.config))
    };
  },
  fromJSON(json, state) {
    if (!json || !Array.isArray(json.done) || !Array.isArray(json.undone))
      throw new RangeError("Invalid history JSON");
    let buildBranch = (json2) => {
      let result = null;
      for (let i = json2.length - 1; i >= 0; i--)
        result = new Branch(ChangeSet.fromJSON(state.schema, json2[i].changes), none, null, GardSelection.fromJSON(state, json2[i].selection), result);
      return result;
    };
    return new HistoryState(buildBranch(json.done), buildBranch(json.undone));
  }
});
function history(config = {}) {
  return [
    historyField_,
    historyConfig.of(config),
    Command.handler(undo, undo2),
    Command.handler(redo, redo2),
    undoButton,
    redoButton
  ];
}
history = function(history2) {
  history2.field = historyField_;
  history2.isolate = Transaction.Annotation.define();
  history2.invertedEffects = GardState.Facet.define();
  ;
  return history2;
}(history);
var undo2 = ({ state }) => {
  let historyState = state.field(historyField_, false);
  if (state.readOnly || !historyState)
    return false;
  return historyState.pop(0, state);
};
var redo2 = ({ state }) => {
  let historyState = state.field(historyField_, false);
  if (state.readOnly || !historyState)
    return false;
  return historyState.pop(1, state);
};
function depth(branch) {
  return branch ? branch.depth : 0;
}
var undoDepth = (state) => {
  var _a;
  return depth((_a = state.field(historyField_, false)) == null ? void 0 : _a.done);
};
var redoDepth = (state) => {
  var _a;
  return depth((_a = state.field(historyField_, false)) == null ? void 0 : _a.undone);
};
var Branch = class _Branch {
  constructor(changes, effects, mapped, startSelection, next) {
    __publicField(this, "changes");
    __publicField(this, "effects");
    __publicField(this, "mapped");
    __publicField(this, "startSelection");
    __publicField(this, "next");
    __publicField(this, "depth");
    this.changes = changes;
    this.effects = effects;
    this.mapped = mapped;
    this.startSelection = startSelection;
    this.next = next;
    this.depth = depth(next) + 1;
  }
  addChanges(changes, effects) {
    return new _Branch(changes.compose(this.changes), conc(Transaction.Effect.mapEffects(effects, this.changes), this.effects), null, this.startSelection, this.next);
  }
  resolve(config) {
    if (!this.mapped)
      return this;
    let { mapped: { change, doc }, next } = this;
    let { a: mappedMapping, b: mappedChanges } = ChangeSet.transform(doc, change, this.changes);
    if (next)
      next = next.addMapping(mappedMapping, next.mapped ? null : this.changes.apply(doc));
    if (mappedChanges.empty && !this.effects.length)
      return next && next.resolve(config);
    let selDoc, selCx = {
      get doc() {
        return selDoc || (selDoc = mappedChanges.apply(change.apply(doc)));
      },
      config
    };
    return new _Branch(mappedChanges, Transaction.Effect.mapEffects(this.effects, change), null, this.startSelection.map(mappedMapping, selCx), next);
  }
  resolveFully(config) {
    let stack = [];
    for (let head = this; head; head = head.next) {
      head = head.resolve(config);
      if (!head)
        break;
      stack.push(head);
    }
    let result = null;
    for (let i = stack.length - 1; i >= 0; i--) {
      let next = stack[i];
      if (next.next == result)
        result = next;
      else
        result = new _Branch(next.changes, next.effects, null, next.startSelection, result);
    }
    return result;
  }
  addMapping(change, startDoc) {
    return new _Branch(this.changes, this.effects, this.mapped ? { change: this.mapped.change.compose(change), doc: this.mapped.doc } : { change, doc: startDoc }, this.startSelection, this.next);
  }
  clip(depth2) {
    let stack = [];
    for (let i = 0, cur = this; i < depth2 && cur; i++, cur = cur.next)
      stack.push(cur);
    let result = null;
    for (let i = stack.length - 1; i >= 0; i--) {
      let event = stack[i];
      result = new _Branch(event.changes, event.effects, event.mapped, event.startSelection, result);
    }
    return result;
  }
};
function eventFromTransaction(tr) {
  let effects = none;
  for (let invert of tr.startState.facet(history.invertedEffects)) {
    let result = invert(tr);
    if (result.length)
      effects = effects.concat(result);
  }
  if (!effects.length && tr.changes.empty)
    return null;
  return { changes: tr.changes.invert(tr.startState.doc), effects };
}
function isAdjacent(a, b) {
  let ranges = [], isAdjacent2 = false;
  a.iterChangedRanges((f, t) => ranges.push(f, t));
  b.iterChangedRanges((_f, _t, f, t) => {
    for (let i = 0; i < ranges.length; ) {
      let from = ranges[i++], to = ranges[i++];
      if (t >= from && f <= to)
        isAdjacent2 = true;
    }
  });
  return isAdjacent2;
}
function conc(a, b) {
  return !a.length ? b : !b.length ? a : a.concat(b);
}
var none = [];
var joinableUserEvent = /^(input\.type|delete)($|\.)/;
var HistoryState = class _HistoryState {
  constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
    __publicField(this, "done");
    __publicField(this, "undone");
    __publicField(this, "prevTime");
    __publicField(this, "prevUserEvent");
    this.done = done;
    this.undone = undone;
    this.prevTime = prevTime;
    this.prevUserEvent = prevUserEvent;
  }
  isolate() {
    return this.prevTime ? new _HistoryState(this.done, this.undone) : this;
  }
  addChanges(event, time, userEvent, config, tr) {
    let done = this.done && this.done.resolve(tr.startState.config);
    if (done && !done.changes.empty && (!userEvent || joinableUserEvent.test(userEvent) || tr.annotation(Transaction.appended)) && (time - this.prevTime < config.newGroupDelay && config.joinToEvent(tr, isAdjacent(done.changes, event.changes)) || userEvent == "input.type.compose")) {
      done = done.addChanges(event.changes, event.effects);
    } else {
      done = new Branch(event.changes, event.effects, null, tr.startState.selection, done);
    }
    return new _HistoryState(done, null, time, userEvent);
  }
  pop(side, state) {
    let branch = side == 0 ? this.done : this.undone;
    if (!branch || !(branch = branch.resolve(state.config)))
      return false;
    return {
      changes: branch.changes,
      selection: branch.startSelection,
      effects: branch.effects,
      annotations: fromHistory.of({ side, rest: branch.next }),
      userEvent: side == 0 ? "undo" : "redo",
      scrollIntoView: true
    };
  }
  clip(minDepth) {
    let max = minDepth * 1.3;
    let done = depth(this.done) > max ? this.done.clip(minDepth) : this.done;
    let undone = depth(this.undone) > max ? this.undone.clip(minDepth) : this.undone;
    if (done != this.done || undone != this.undone)
      return new _HistoryState(done, undone, this.prevTime, this.prevUserEvent);
    return this;
  }
};
var undoButton = (() => Menu.Button.define({
  run: undo2,
  label: {
    icon: "M69 90c9-16 10-41-24-40v20l-30-30 30-30v19c42-1 46 37 24 61z"
  },
  description: phrases.ref("undo"),
  enable: (s) => !s.readOnly && undoDepth(s) > 0,
  parent: Menu.Group.commands,
  rank: 10
}))();
var redoButton = (() => Menu.Button.define({
  run: redo2,
  label: {
    icon: "M55 29v-19l30 30-30 30v-20c-35-1-33 24-24 40-22-24-17-62 24-61z"
  },
  description: phrases.ref("redo"),
  enable: (s) => !s.readOnly && redoDepth(s) > 0,
  parent: Menu.Group.commands,
  rank: 20
}))();

export {
  history,
  undo2 as undo,
  redo2 as redo,
  undoDepth,
  redoDepth,
  undoButton,
  redoButton
};
//# sourceMappingURL=chunk-LAI3WKPW.js.map
